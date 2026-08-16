---
sidebar_position: 4
title: Important notes
---

# Important notes

- You can use variables inside of your script that are replaced with the variables before the script is even ran. So if you do `tts({ message: "{{username}}" })`, it will replace the `"{{username}}"` with whoever is calling the command before the script is even ran. Take note that the variable is wrapped in quotes to be used as a string since when it is replaced it does not automatically add the quotes.

- By default variable values from the command/alert will be passed to the command/alert that you call. You can bypass those values as well as add new ones by passing in `variableValues` into the command. e.g: `callCommand({ value: 'cool-people', variableValues: { 'username': 'lumia' }})`

- If you are attempting to use this inside of Chat Command, Twitch Points, or Twitch Extension we expose a new variable called `{{userLevelsRaw}}`. This variable will contain an object with the different userlevels this user has.
  The different options are: `isSelf, mod, vip, tier3, tier2, tier1, subscriber, follower`.
  In your code you should use `const levels = await getVariable('userLevelsRaw');` and then you can check a level with `if (levels.subscriber) {}` since these are all booleans

## Variable functions inside custom code

Before the worker starts, Lumia runs your **entire code string** through the same template engine that powers command replies. That replaces plain tokens like `{{username}}` and `{{message}}`, and it also **executes variable functions** — `{{arg=1}}`, `{{get_user_loyalty_points=…}}`, `{{ai=…}}`, `{{twitch_followage=…}}`, `{{add_points=…}}` and the rest. Each one is swapped for its result *text*.

Four consequences that trip people up:

**1. They run once, before any of your JavaScript.** Position in the file means nothing. A variable function inside an `if` that never runs, inside a function you never call, or even inside a `//` comment still executes.

**2. Side-effecting ones fire immediately — so don't use them here.** `{{add_points=…}}`, `{{set_points=…}}`, `{{give_points=…}}` and friends change real state the moment the code loads, before a single line of your logic has had a chance to validate anything. Use the matching action instead:

| Instead of | Use |
| --- | --- |
| `{{add_points=user,100}}` | `addLoyaltyPoints({ username: 'user', points: 100 })` |
| `{{set_points=user,500}}` | `setLoyaltyPoints({ username: 'user', points: 500 })` |
| `{{give_points=user,50}}` | `transferLoyaltyPoints({ from: 'sender', to: 'user', points: 50 })` |
| `{{get_user_loyalty_points=user}}` | `getLoyaltyPoints({ username: 'user' })` |
| `{{toggle_automation=name}}` | `actions([{ base: 'lumia', type: 'setAutomation', value: { value: 'name', on: true } }])` |

**3. You cannot pass a computed value into a `{{…}}` token.** By the time your code has a `target` variable, template replacement is long finished. This does **not** work:

```js
// ✗ Broken — `target` does not exist when the token is replaced
const points = "{{get_user_loyalty_points=" + target + "}}";
```

Call a helper instead. Helpers run when you call them, so the argument can be anything your code produced:

```js
// ✓ Runs at call time, so `target` can come from a loop, an API, anywhere
const points = await getLoyaltyPoints({ username: target });
```

For a variable function with no helper of its own, `resolveVariables` runs the template engine at runtime:

```js
// ✓ resolveVariables is called by your code, so the argument is already known
const followage = await resolveVariables(`{{twitch_followage=${target}}}`);
```

**4. The replacement is raw text.** It is not quoted and not escaped, so always wrap it yourself — `"{{username}}"`, not `{{username}}` — and run it through `Number(...)` before doing math. When you want the untouched value (an object, or a number without quoting games) read it with `await getVariable('name')` instead.

## Reading chat arguments

`{{message}}` is everything the viewer typed after the command, and `{{arg=N}}` is the Nth whitespace-separated word of it (`{{arg=1}}` is the first). `{{arg=N,word}}` blanks the result unless the token is a plain word, and `{{arg=N,emote}}` blanks it unless the token is one of the channel's emotes.

Both are just text when they land in your code, so validate them like any other user input — a viewer can type the arguments in any order, add an `@`, or leave them out entirely.

```js
async function() {
    const first = "{{arg=1}}".trim();
    const second = "{{arg=2}}".trim();
    done();
}
```

:::warning `{{message}}` and `{{prompt}}` are stripped before your code sees them

So a viewer can't break out of your string and run their own code, Lumia removes every `"`, `'`, `` ` `` and the accented characters `áéíóúñü` from `{{message}}` and `{{prompt}}` before substituting them. This applies to `{{arg=N}}` too (it reads from `{{message}}`) and to `await getVariable('message')`.

Do not build your own quoting or escaping on top of that, and don't rely on chat text keeping its punctuation or accents.

:::

## Runtime environment

Your code runs inside a sandboxed browser Web Worker, not Node.js. That means:

- **`fetch` is available** — you can call any HTTP/REST API directly (see the Random Twitch Clip example). `Promise`, `async/await`, `JSON`, `Math`, `Date`, `setTimeout`, etc. all work.
- **Node.js APIs are NOT available** — there is no `require`, `import`, `fs`, `process`, `Buffer`, or `__dirname`. To read/write local files use the `readFile` / `writeFile` helpers, and to run a shell command use `execShellCommand`.
- **You must call `done()`.** Lumia will refuse to run any code that does not contain a `done(` call, and the worker stays alive (leaking memory) until `done()` is reached, so always call it exactly once as the last thing your code does.
- All the helper functions in `helper-functions.md` are injected as globals — you do not import them. Most return a Promise, so `await` them.

## Origin and queue type variables

We expose `{{originType}}` and `{{queueType}}` so custom code can tell where an activity came from and what kind of queued activity is running.

Use `originType` when you want to branch by the source of the activity. Use `queueType` when you need the specific command category that Lumia is executing.

| Variable | What it means | Common values |
| --- | --- | --- |
| `originType` | Where the activity came from. This controls queue priority and groups similar sources together. | `alert`, `chat`, `chatbot`, `twitch-points`, `twitch-extension`, `kick-points`, `system`, `api`, `streamdeck`, `touchportal`, `loupedeck`, `avermedia`, `lumiastreamlink` |
| `queueType` | The specific queued command/activity type. This is the best value to check when you need to distinguish a normal chat command from a chat match. | `alert`, `chat-command`, `chatbot-command`, `chat-match`, `twitch-points`, `twitch-points-output`, `twitch-extension`, `twitch-extension-hfx`, `kick-points` |

Important: "commands" are not a single `originType`. A normal chat command uses `originType: "chat"` and `queueType: "chat-command"`, while a chat match also uses `originType: "chat"` but uses `queueType: "chat-match"`.

```js
async function() {
	const originType = await getVariable('originType');
	const queueType = await getVariable('queueType');

	if (queueType === 'chat-match') {
		log('This ran from a chat match.');
		done();
		return;
	}

	if (queueType === 'chat-command') {
		log('This ran from a normal chat command.');
		done();
		return;
	}

	if (originType === 'alert') {
		log('This ran from an alert.');
		done();
		return;
	}

	log(`Skipping custom code for originType=${originType}, queueType=${queueType}`);
	done();
}
```

- To quickly log out information for easier debugging, use `log("")`. You can also use `console.log` which will do the same thing. This will popup a toast message with what you are trying to log as well as add it to the logs in the dashboard

- Everything ran is in a safe JavaScript worker thread away from the Lumia Stream thread so no need to worry about scripts slowing down the app. Make sure you do avoid memory leaks by calling `done()` when you're done with your script

**Share your code** with our community in [**Discord**](https://discord.gg/R8rCaKb) and help **extending Lumia's functionality**

**Checkout the use case examples in the next section**
