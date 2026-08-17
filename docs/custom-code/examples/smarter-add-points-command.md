---
sidebar_position: 7
title: Smarter add points command
---

# Smarter add points command

A plain `!addpoints` chatbot command usually looks like this, with everything in the Chatbot reply:

```
{{add_points={{arg=1}},{{arg=2}}}} {{arg=1}} now has {{get_user_loyalty_points={{arg=1}}}} {{loyalty_currency_name}}.
```

That works when the mod types `!addpoints lumiacove 100`, and breaks on everything else:

- `!addpoints 100 lumiacove` — the arguments are the wrong way round
- `!addpoints @lumiacove 100` — the `@` is part of the username, so the lookup misses
- `!addpoints notarealuser 100` — nothing tells anyone the viewer doesn't exist

Custom code fixes all three. This example is also a good tour of the two mistakes that are easiest to make in Lumia custom code, so read the next section before the code.

## Two things not to do

**Don't call a command you're inventing.** It is tempting to write the parsing in code and then hand off with something like `callChatbotCommand({ name: 'addpoints_apply' })`. `callChatbotCommand` only re-triggers a chatbot command the streamer has **already created**; if no command has that name it resolves to `false` and does nothing — no error, no toast, no log — so the command appears to work and silently never awards a point. Add the points directly with `addLoyaltyPoints` instead.

**Don't reach for `done({ shouldStop: true })` by reflex.** That cancels the *entire* command — lights, overlays, TTS and actions included — which is right when the input was bad and wrong when you just want your own reply to replace the built-in one. To silence one part, pass `shouldStop: true` **and** `actionsToStop` together; `actionsToStop` on its own is ignored.

## Approach 1: let the code fix the input, let the command do the work (recommended)

`{{arg=N}}` reads its tokens from `{{message}}`, and `done({ variables: ... })` overwrites variables for everything that runs after the code. So the code only has to normalize the input and rewrite `{{message}}` — the Chatbot reply you already have keeps working, unchanged, and still reports the running total.

Leave the Chatbot reply exactly as it is, and add this on the Custom Javascript tab:

```js
async function() {
	const isNumber = (value) => /^[+-]?\d+$/.test(value);
	const parts = "{{message}}".trim().split(/\s+/).filter(Boolean);

	let target = "";
	let amount = "";

	// Take the first number as the amount and the first non-number as the username, in any order
	for (const part of parts) {
		if (!amount && isNumber(part)) {
			amount = part;
		} else if (!target && !isNumber(part)) {
			target = part.replace(/^@+/, "");
		}
	}

	if (!target || !amount) {
		chatbot({ message: "Usage: !addpoints <username> <amount> — for example: !addpoints @lumiacove 100" });
		done({ shouldStop: true });
		return;
	}

	const viewer = await getLoyaltyUser({ username: target });
	if (!viewer) {
		chatbot({ message: `I haven't seen anyone called ${target} in chat yet, so no points were changed.` });
		done({ shouldStop: true });
		return;
	}

	// Rewriting {{message}} is what makes {{arg=1}} and {{arg=2}} in the Chatbot reply resolve to the cleaned values
	done({ variables: { message: `${viewer.username} ${amount}` } });
}
```

`getLoyaltyUser` also gives you the stored spelling, so `@LumiaCove` becomes `lumiacove` without a second lookup.

`!addpoints 100 @LumiaCove` now replies `Added 100 points to lumiacove lumiacove now has 2483 cove points.`, and a bad username gets a real answer instead of silence.

## Approach 2: do everything in the code

If you'd rather not keep a Chatbot reply on the command at all, add the points yourself and send your own message. `addLoyaltyPoints` resolves to the viewer's **new** balance, so this version can report the running total too — a negative amount subtracts, and `setLoyaltyPoints` sets an exact balance instead.

```js
async function() {
	const isNumber = (value) => /^[+-]?\d+$/.test(value);
	const parts = "{{message}}".trim().split(/\s+/).filter(Boolean);

	let target = "";
	let amount = "";

	for (const part of parts) {
		if (!amount && isNumber(part)) {
			amount = part;
		} else if (!target && !isNumber(part)) {
			target = part.replace(/^@+/, "");
		}
	}

	if (!target || !amount) {
		chatbot({ message: "Usage: !addpoints <username> <amount> — for example: !addpoints @lumiacove 100" });
		done({ shouldStop: true });
		return;
	}

	const viewer = await getLoyaltyUser({ username: target });
	if (!viewer) {
		chatbot({ message: `I haven't seen anyone called ${target} in chat yet, so no points were changed.` });
		done({ shouldStop: true });
		return;
	}

	const { currencyName } = await getLoyaltySettings();
	const balance = await addLoyaltyPoints({ username: viewer.username, points: Number(amount) });
	chatbot({ message: `Added ${amount} ${currencyName} to ${viewer.username} — they now have ${balance}.` });

	// The command keeps running (lights, overlays, actions) — only its built-in Chatbot reply is skipped
	done({ shouldStop: true, actionsToStop: ['chatbot'] });
}
```

:::note Use the helpers here, not `{{…}}` tokens

Don't reach for `{{get_user_loyalty_points=…}}` inside custom code. It's a variable function, so it resolves **before** your JavaScript runs: it can't see the cleaned `target`, and it would report the balance from before the points were added. `getLoyaltyPoints({ username })` and `addLoyaltyPoints({ username, points })` run when you call them, so they take a name your code worked out and always reflect the current total.

:::

:::caution A brand-new viewer is also "unknown"

`getLoyaltyUser` returns `null` both for a typo'd name and for a real viewer who has simply never earned a point, so this check will refuse a legitimate first-time award. `addLoyaltyPoints` creates a viewer Lumia hasn't seen, so if you'd rather always pay out, drop the `getLoyaltyUser` guard and accept that a typo silently creates a viewer.

:::

:::tip

**code blocks** like the ones above 👆 have a copy button on the **top right corner** click it then paste in Lumia stream

:::
