---
sidebar_position: 3
title: Roll dice
---

# Roll a dice with Text To Speech

You can use Javascript to randomly pick a number and if it lands on your chosen number the user will get a special Text To Speech shoutout

```js
async function() {
	const diceRoll = Math.ceil(Math.random()*6);

	if (diceRoll === 3) {
			tts({ message: "Congratulations {{username}}! You rolled a 3", voice: "default", volume: 100 })
			// you can switch between all the tts option that we support
			// tts({ message: "Congratulations {{username}}! You rolled a 3", voice: "Brian", volume: 100 })
	}

	// always make sure this is the last line in the code otherwise your computer may get slower due to memory leaks
	done();
}
```

:::tip

**code blocks** like the one above 👆 have a copy button on the **top right corner** click it then paste in Lumia stream

:::

## Show an OBS source and play a sound

You can drive OBS and audio straight from the code with the built-in helpers — there is no need to make a separate command and call it by an id. This rolls a dice, shows the matching `Dice1`–`Dice6` source in your scene, plays a sound on a 6, then hides the source again.

```js
async function() {
    const roll = Math.ceil(Math.random() * 6);
    const sceneName = "IN-GAME ACTION";
    const sourceName = "Dice" + roll;

    chatbot({ message: "{{username}} rolled a " + roll + "!" });

    // Show the matching dice source. Lumia finds the source's id from its name for you
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": sceneName, "inputName": sourceName, "sceneItemEnabled": true });

    // Play a celebration sound only on a 6
    if (roll === 6) {
        playAudio({ path: "C:\\sounds\\gold.mp3", volume: 100 });
    }

    // Leave it on screen for 6 seconds, then hide it again
    await delay(6000);
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": sceneName, "inputName": sourceName, "sceneItemEnabled": false });

    done();
}
```
