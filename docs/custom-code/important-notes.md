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
