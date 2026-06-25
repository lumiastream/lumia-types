---
sidebar_position: 2
title: Helper functions
description: Helper functions are a premade code that helps you build your custom scripts
---

These helper functions are premade code that we setup that you can use to help you build your custom code. You will find `use case examples` in the each section as well.

### Done

`done({ shouldStop?: boolean; actionsToStop?: Array<string>; variables?: {[key: string]: string | number }}?)`: Done tell Lumia Stream that the script is complete and that the thread is safe to close now. You can also stop the command/alert in it's track by passing shouldStop true into the parameters.
If you would like to modify/add variables that other actions could use, you can return them in the variables parameter.

You can also choose to only stop some actions rather than stopping the whole command by using actionsToStop.
The different actionsToStop keys relate to the action. The keys are:
`devices, tts, chatbot, hfx, lumia, overlay, api, commandRunner, inputEvent, actions, voicemod, streamerbot, obs, slobs, midi, osc, mqtt, serial, broadlink, websocket, twitter, twitch, spotify, vlc, artnet`

```js
// Basic done
async function() {
    done();
}
// Should stop
async function() {
    done({ shouldStop: true, actionsToStop: [] });
}
// Should stop certain actions like tts and chatbot
async function() {
    done({ shouldStop: true, actionsToStop: ['tts', 'chatbot'] });
}
// Passing variables
async function() {
    done({ variables: { message: "Message changed" } });
}
```

:::tip

**code blocks** like the one above 👆 have a copy button on the **top right corner** click it then paste in Lumia stream

:::

### Add Log to both Toast and Dashboard

`log(message: any)`: The best way to log what's going on is to either use `log` or `console.log`. These will show a toast as well as add a log to the dashboard in case you need to reference it later.

```js
async function() {
    log({ data: "my data" });
    // Or using console.log
    console.log({ data: "my data" });
}
```

### Show Toast

`showToast({ message: string; time?: number })`: Show toast will show a popup message notification in Lumia. The time for how long it shows is in milliseconds. Leave it 0 to show forever

```js
async function() {
	// shows a message popup saying command used for 200 milliseconds and the popup will close
    showToast({ message: "command used", time: 200 });

	// doing the same as the above but the popup does not close automatically
    showToast({ message: "command used", time: 0 });

	// you can also just send the message which by default the popup does not close automatically
    showToast({ message: "command used" });
}
```

### Add Log to Dashboard

`addLog(message: string)`: Show a log in the dashboard to keep track of things

```js
async function() {
	//shows in the logs section when this command is executed
    addLog('log this command used');
}
```

### Delay

`delay(time: number)`: You can delay your code with our helper function that returns a promise. The time is in milliseconds.

```js
async function() {
    // Waits for 2 seconds
    await delay(2000);
}
```

### Get Variable

`getVariable(name: string)`: Retrieve a variables value based on it's name

```js
async function() {
	//so if you have a variable named "my variable" in the variable page this code will get it's value. Notice that you need to await the result since getVariable returns a promise
    const myVar = await getVariable('my variable');
}
```

### Set Variable

`setVariable({ name: string; value: string | number })`: Creates/Updates a variable with name and value provided. If the variable doesn't exist it will create it

```js
async function() {
	// This creates a variable named "coins" with the value of 3
    setVariable({ name: 'coins', value: 3 });
}
```

### Delete Variable

`deleteVariable(name: string | Array<string>)`: Delete a variable or multiple variables. If the variable doesn't exist it will still return as successful

```js
async function() {
    deleteVariable('coins');
    // Or you can pass in an array of variables
    deleteVariable(['coins', 'myVar', 'other variable']);
}
```

### Get All Variables

`getAllVariables()`: Ability to get all local and global variables with one easy call

```js
async function() {
    let variables = await getAllVariables();
    showToast({ message: JSON.stringify(variables) , time: 10000});

    // always make sure this is the last line in the code otherwise your computer may get slower due to memory leaks
    done();
}
```

### Get Persisted Store

`getStore()`: Retrieves the complete custom code store. This store is a persisted storage throughout all of your custom code and can assign any data type like string, numbers, arrays, and objects

```js
async function() {
	//Notice that you need to await the result since getStore returns a promise
    const store = await getStore();
}
```

### Get Persisted Store Item

`getStoreItem(name: string)`: Get's one item from the custom code store

```js
async function() {
	//Notice that you need to await the result since getStoreItem returns a promise
    const users = await getStoreItem('users');
}
```

### Remove Persisted Store Item

`removeStoreItem(name: string)`: Removes a single item from the custom code store by its name. The rest of the store is left untouched

```js
async function() {
    await removeStoreItem('users');
    done();
}
```

### Set Persisted Store Item

`setStore({ name: string; value: any })`: Sets an item in the store. You can use any data type as your value

```js
async function() {
    await setStore({ name: 'users', value: [] });
}
```

### Reset Persisted Store

`resetStore()`: Resets the store removing all items inside of it

```js
async function() {
	//Notice that you need to await the result since resetStore returns a promise
    await resetStore();
}
```

### Get Lights

`getLights()`: Get the list of lights the streamer has along with it's type and id. The type and id is required to send color or power to specific lights

```js
async function() {
    const lights = await getLights()
}
```

### Send Color To Lights

`sendColor({ color?: string | { r: number; g: number; b: number }; power?: boolean; brightness?: number; transition?: number; lights?: Array<{ id: string | number; type: string }> })`: Send a color or power to either all lights or a set of lights. Do not send the `lights` array when you want to target every lights. Every parameter is optional. The type and id is required to send color or power to specific lights

```js
async function() {
    // Send hex color to all lights
    sendColor({ color: "#FF4076", brightness: 100 });

    // Send rgb color to all lights
    sendColor({ color: { r: 0, g: 0, b: 255 }, brightness: 100 });

    // Send power to all lights
    sendColor({ power: true });

    // Send to specific lights
    sendColor({ color: "#FF4076", brightness: 100, transition: 0, lights: [{ type: "hue", id: "1" }, { type: "lifx", id: "abc" }] });

    // For Nanoleaf lights, ensure id values are integers without quotation marks (e.g., 14608). Quoted string IDs will not work for Nanoleaf.
    sendColor({ color: "#FF4076", brightness: 100, transition: 0, lights: [{ type: "nanoleaf", id: 14608 }] });


    // Send to an overlay virtual light
    sendColor({ color: "#FF4076", brightness: 100, lights: [{ type: "virtuallights", id: "abc-123-520" }] });
}
```

### Hex To RGB

`hexToRgb(value: string)`: Helper that converts a hex color string into an `{ r, g, b }` object. Useful when an integration expects an rgb object instead of a hex string

```js
async function() {
    const rgb = await hexToRgb('#FF4076');
    // rgb is { r: 255, g: 64, b: 118 }
    done();
}
```

### Get API Options

`getApiOptions()`: Contains information like commands, types, connections, and more

```js
async function() {
    const lights = await getApiOptions()
}
```

### Get Commands

`getCommands({ formatted?: boolean; onlyOn?: boolean; onlyUser?: boolean })`: Returns the list of chat command names. Pass `onlyOn: true` to only include commands that are enabled and shown in the commands list, `onlyUser: true` to only include commands the current user has access to (based on their user levels), and `formatted: true` to get a single comma separated string instead of an array

```js
async function() {
    // Array of command names the chatter is allowed to use, only the ones that are turned on
    const commands = await getCommands({ onlyOn: true, onlyUser: true });
    // Or get a ready to print string for a !commands message
    const list = await getCommands({ formatted: true, onlyOn: true });
    chatbot({ message: `Commands: ${list}` });
    done();
}
```

### Get All Commands

`getAllCommands({ onlyOn?: boolean })`: Returns an object containing the names of every command type: `commands`, `chatbotCommands`, `twitchPointsCommands`, `twitchExtensionsCommands`, `kickPointsCommands`, `chatMatch`, and `folders`. Pass `onlyOn: true` to only include enabled entries

```js
async function() {
    const all = await getAllCommands({ onlyOn: true });
    log(all.chatbotCommands);
    done();
}
```

### Call Alert

`callAlert({ name: string; variation?: string; variableValues?: {[key: string]: string|number } })`: Call an alert based on your conditions. You can also call a variation given it's name. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

The `name` must be one of the valid alert keys (the `LumiaAlertValues` list). This is the full current list, grouped by platform:

```
// Lumia Stream
lumiastream-donation, lumiastream-lumiaOpened, lumiastream-lumiaClosed, lumiastream-streammodeOn, lumiastream-streammodeOff, lumiastream-raffleStart, lumiastream-raffleStop, lumiastream-raffleWinner, lumiastream-tournamentStart, lumiastream-tournamentEnd, lumiastream-tournamentWinner, lumiastream-spinwheelWinner, lumiastream-pollStarted, lumiastream-pollProgressed, lumiastream-pollEnded, lumiastream-viewerqueueStarted, lumiastream-viewerqueueEnded, lumiastream-viewerAchievement, lumiastream-variableChanged, lumiastream-rouletteWinner, lumiastream-slotsWinner

// Twitch
twitch-extension, twitch-points, twitch-streamLive, twitch-streamOffline, twitch-firstChatter, twitch-entrance, twitch-follower, twitch-sessionFollowers, twitch-subscriber, twitch-sessionSubs, twitch-giftSubscription, twitch-sessionGiftSubscriptions, twitch-raid, twitch-raidOut, twitch-bits, twitch-bitsCombo, twitch-sessionBits, twitch-redemption, twitch-hypetrainStarted, twitch-hypetrainProgressed, twitch-hypetrainLevelProgressed, twitch-hypetrainEnded, twitch-pollStarted, twitch-pollProgressed, twitch-pollEnded, twitch-predictionStarted, twitch-predictionProgressed, twitch-predictionLocked, twitch-predictionEnded, twitch-goalStarted, twitch-goalProgressed, twitch-goalEnded, twitch-charityDonation, twitch-charityCampaignStarted, twitch-charityCampaignProgressed, twitch-charityCampaignStopped, twitch-categoryChanged, twitch-clip, twitch-channelJoin, twitch-channelLeave, twitch-banned, twitch-timeout, twitch-timeoutOver, twitch-shoutoutReceive, twitch-warned, twitch-suspiciousUserMessage, twitch-suspiciousUserUpdated, twitch-shieldModeStarted, twitch-shieldModeEnded, twitch-adStarted, twitch-adStopped, twitch-watchStreak, twitch-powerups

// YouTube
youtube-streamLive, youtube-streamOffline, youtube-firstChatter, youtube-entrance, youtube-subscriber, youtube-sessionSubs, youtube-member, youtube-sessionMembers, youtube-giftMembers, youtube-sessionGiftMembers, youtube-superchat, youtube-sessionSuperchats, youtube-supersticker, youtube-sessionSuperstickers, youtube-gifts, youtube-sessionGifts, youtube-like, youtube-viewers

// Facebook
facebook-streamLive, facebook-streamOffline, facebook-firstChatter, facebook-entrance, facebook-follower, facebook-reaction, facebook-star, facebook-support, facebook-subscriptionGift, facebook-share, facebook-fan

// TikTok
tiktok-firstChatter, tiktok-entrance, tiktok-follower, tiktok-like, tiktok-totalLikes, tiktok-gift, tiktok-superFan, tiktok-superFanBox, tiktok-treasureChest, tiktok-question, tiktok-poll, tiktok-shopPurchase, tiktok-pinMessage, tiktok-battleStart, tiktok-battleProgress, tiktok-battleEnd, tiktok-share, tiktok-streamEnd, tiktok-newVideo

// Kick
kick-points, kick-firstChatter, kick-entrance, kick-follower, kick-sessionFollowers, kick-subscriber, kick-sessionSubs, kick-subscriptionGift, kick-sessionGiftSubscriptions, kick-kicks, kick-sessionKicks, kick-host, kick-banned, kick-unbanned

// Discord
discord-firstChatter, discord-entrance

// Donations & monetization
streamlabs-donation, streamlabs-charity, streamlabs-merch, streamlabs-redemption, streamlabs-primegift, streamelements-donation, extralife-donation, donordrive-donation, tiltify-campaignDonation, throne-giftPurchase, throne-contributionPurchase, throne-giftCrowdfunded, tipeeestream-donation, treatstream-treat, patreon-campaignPledge, kofi-donation, kofi-subscription, kofi-commission, kofi-shopOrder, fourthwall-shopOrder, fourthwall-donation, fourthwall-subscription, fourthwall-subscriptionChanged, fourthwall-subscriptionExpired, fourthwall-giftpurchase, fourthwall-giveawayStarted, fourthwall-giveawayEnded, fourthwall-thankyouSent, fourthwall-newsletterSubscribed, woocommerce-order

// OBS Studio
obs-switchProfile, obs-switchScene, obs-sceneItemVisibility, obs-sceneItemHidden, obs-switchTransition, obs-transitionBegin, obs-transitionEnd, obs-streamStarting, obs-streamStopping, obs-recordingStarting, obs-recordingStopping, obs-mediaInputPlaybackStarted, obs-mediaInputPlaybackEnded, obs-virtualcamStateChanged, obs-screenshotSaved, obs-replayBufferSaved, obs-verticalBacktrackSaved, obs-vendorEvent

// Streamlabs Desktop (SLOBS)
slobs-switchSceneCollection, slobs-switchScene, slobs-sceneItemVisibility, slobs-sceneItemHidden

// Meld Studio
meld-streamStarting, meld-streamStopping, meld-recordingStarting, meld-recordingStopping, meld-switchScene, meld-switchVerticalScene

// Music players
spotify-switchSong, spotify-songPlayed, spotify-songPaused, youtubemusic-switchSong, youtubemusic-songPlayed, youtubemusic-songPaused, nowplaying-switchSong, nowplaying-songPlayed, nowplaying-songPaused, vlc-switchSong, vlc-songPlayed, vlc-songPaused

// VTube Studio
vtubestudio-hotkeyTriggered, vtubestudio-modelLoaded, vtubestudio-animationStart, vtubestudio-animationEnd, vtubestudio-itemAdded, vtubestudio-itemRemoved, vtubestudio-backgroundChanged

// Other
pulse-heartrate, pulse-calories, twitter-follower, twitter-like, twitter-retweet, streamerbot-action, crowdcontrol-effect
```

```js
async function() {
	// This will call alert 'twitch-subscriber' and call the variation of it named 'gift3' and change the variable named siren to 3
    callAlert({ name: 'twitch-subscriber', variation: 'gift3', variableValues: {'message': 'Big gift' } })
}
```

### Call Command

`callCommand({ name: string; variableValues?: {[key: string]: string|number } })`: Call a command based on your conditions. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

```js
async function() {
	// This will call command called 'cheers' and change the variable named "message" to the value "you are awesome"
    callCommand({ name: 'cheers', variableValues: {'message': 'you are awesome' } })
}
```

### Call Chatbot Command

`callChatbotCommand({ name: string; variableValues?: {[key: string]: string|number } })`: Call a chatbot command based on your conditions. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

```js
async function() {
	// This will call chatbot command called 'welcome' and change the variable named "message" to the value "you are awesome"
    callChatbotCommand({ name: 'welcome', variableValues: {'message': 'you are awesome' } })
}
```

### Call Twitch Point Command

`callTwitchPoint({ name: string; variableValues?: {[key: string]: string|number } })`: Call a twitch point command based on your conditions. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

```js
async function() {
	// This will call Twitch Point called 'point' and change the variable named "message" to the value "you are awesome"
    callTwitchPoint({ name: 'point', variableValues: {'message': "you are awesome" } });
}
```

### Call Twitch Extension Command

`callTwitchExtension({ name: string; variableValues?: {[key: string]: string|number } })`: Call a twitch extension command based on your conditions. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

```js
async function() {
	// This will call Twitch Extension called 'point' and change the variable named "message" to the value "you are awesome"
    callTwitchExtension({ name: 'point', variableValues: {'message': "you are awesome" } });
}
```

### Call Kick Point Command

`callKickPoint({ name: string; variableValues?: {[key: string]: string|number } })`: Call a kick point command based on your conditions. When calling an alert/command from custom code the variableValues will be inherited from the parent, but you can also override variable values by passing it in to the call function.

```js
async function() {
	// This will call Kick Point called 'point' and change the variable named "message" to the value "you are awesome"
    callKickPoint({ name: 'point', variableValues: {'message': "you are awesome" } });
}
```

### Read File

`readFile(path: string)`: Read from a file on your local computer to get the contents of it to be displayed in your code. This is useful for other Apps that write and read to files so you can combine the usage of them in Lumia. To keep things consistent, try to use an absolute file path

```js
async function() {
	// This will read the file from this path. Returns a promise so await is needed
    const fileText = await readFile('C:\\Documents\\Lumiastream\\helper.txt');
}
```

### Write File

`writeFile({ path: string; message: string | number; append?: boolean })`: Write to a file on your local computer to update the contents of it. This is useful for other Apps that write and read to files so you can combine the usage of them in Lumia. OBS Text source is a great exmaple of this. You can optionally pass in an `append` to append to a text file instead of overwriting the whole file. When using append you can create a new line by starting with a blank line

```js
async function() {
	// This will create a new file in the 'C:\Documents\Lumiastream\' named helper.txt and add the text "text inside this file" inside that file
	await writeFile({ path: 'C:\\Documents\\Lumiastream\\helper.txt', message: 'text inside this file', append: true });
}
```

### Text To Speech (TTS)

`tts({ message: string; voice?: string; volume?: number })`: You can trigger Text To Speech directly inside of your code. You can even choose the voice and set the volume optionally

```js
async function() {
	// This will read the message with text to speach using the voice that you added with the volume 60%
    tts({ message: 'Lumia stream loves you',voice: 'Brian', volume: 60 });
}
```

### Chat Bot

`chatbot({ message: string; site?: 'twitch' | 'youtube' | 'facebook'; color?: string; chatAsSelf?: boolean })`: You can trigger a Chat bot directly inside of your code. You can even change the color of the message, whether to chat as your self or the bot, and the ability to change the site. Site can now be an array or a regular string.

```js
async function() {
	//this will send a custom chatbot message "hello from Lumia Stream" to twitch colored with this hex code "#F57FAE" shown in the chat as your self
    chatbot({ message: 'hello from Lumia Stream', site: "twitch", color:"#F57FAE", chatAsSelf:true });

    // Send to multiple sites at once
    chatbot({ message: 'hello from Lumia Stream', site: ["twitch", "youtube", "facebook"], color:"#F57FAE",chatAsSelf:true });
}
```

### Play Audio

`playAudio({ path: string | string[]; volume?: number; waitForAudioToStop?: boolean })`: You can play an audio file from either a URL or from a local path on your computer inside of your code. You can even wait for the audio to stop playing before the code continues by setting an await before while also setting waitForAudioToStop to true. You can also allow Lumia Stream to randomly play an audio file from a selection by passing an array of strings to path. `playSound` is an alias of `playAudio` and takes the exact same parameters

```js
async function() {
	playAudio({ path: "C:\\Documents\\Lumiastream\\lumiajam.mp3", volume: 100, waitForAudioToStop: false });

    // Or you can await the sound to stop playing first
    await playAudio({ path: "C:\\Documents\\Lumiastream\\lumiajam.mp3", volume: 100, waitForAudioToStop: true });

    // You can also play multiple files by passing an array to path
    await playAudio({ path: ["C:\\Documents\\Lumiastream\\lumiajam.mp3", "C:\\Documents\\Lumiastream\\lumiasecond.mp3"], volume: 100 });
}
```

### Send Raw OBS JSON

`sendRawObsJson(value: { request-type: string; sceneName?: string; inputName?: string; sceneItemId?: number; [key: string]: any })`: You can send raw JSON to OBS that will automatically handle the context id. Just send the request type and your other parameters and Lumia Stream will take care of the rest. This is the simplest way to drive OBS from custom code — you do not need to build a separate OBS command or alert and call it by id.

```js
async function() {
    // Change the active scene
    sendRawObsJson({ "request-type": "SetCurrentProgramScene", "sceneName": "My Scene" });

    // Show a source by its name. Lumia resolves the scene item id from the name for you, so no numeric id is needed
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": "My Scene", "inputName": "My Source", "sceneItemEnabled": true });

    // Hide that same source again by passing false
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": "My Scene", "inputName": "My Source", "sceneItemEnabled": false });

    // You can still target a source by its numeric sceneItemId if you already know it
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": "Scene 1", "sceneItemId": 1, "sceneItemEnabled": true });
}
```

### Execute Shell Command

`execShellCommand(command: string)`: You can execute shell commands and wait for their return value. It will send the stdout if successfull or the stderr if it fails. It will not reject the promise though

```js
async function() {
    await execShellCommand("say wow");
}
```

### Get Token

`getToken(connection: "twitch" | "twitchChatbot" | "youtube" | "facebook" | "streamlabs" | "streamelements" | "treatstream" | "tipeeestream" | "tiltify" | "patreon" | "woocommerce" | "discord" | "twitter" | "spotify" | "pulsoid" | "wyze" | "homeassistant" | "govee" | "wled" )`: When you need to call a request that we don't directly support you can get the access token from Lumia before making the call. This is helpful for things where you need to call for instance the Twitch API, but you don't want to handle tokens and refreshing inside of your scripts. More examples of this below

```js
async function() {
	// This will get the access token for your user on Twitch
    const token = await getToken('twitch');
}
```

### Get Client ID For Twitch

`getClientId(connection: "twitch")`: When calling requests with Twitch's API you will need to pass in a Client-ID to the headers. We provide a Client ID that you can use to call the different api's with the permissions the user has selected. Check out [Twitch's developers docs](https://dev.twitch.tv/docs/api/reference) to learn what you can do

```js
async function() {
	// This will get the client id for Twitch
    const token = await getClientId('twitch');
}
```

## Overlay Actions

Note: When using layers you can call them by the layers name. But if you have multiple layers named the same thing in different overlays it may not trigger on the correct overlay. Make sure you give your layers a unique name so that you do not have any issues triggering the correct layer. We do not check for unique Overlay names and unique Layer names at this time since under the hood we use ID's

### Overlay Alert Trigger

`overlayAlertTrigger({ layer: string, firstMessage: string" })`: You can trigger a generic alert layer that you've created on your overlays. This will only trigger the generic alert though. To fire an alert that isn't the generic one you will need to use `callAlert`.
`firstMessage` is the message that will show for the alert

```js
async function() {
    overlayAlertTrigger({ layer: "my unique layer name", firstMessage: "{{message}}" });
}
```

### Overlay Set Visibility

`overlaySetVisibility({ overlay: string, on: boolean })`: You can set the visibility of the full overlay using this function. You should make sure all of your overlays have unique names. We do not check for unique names since under the hood we use ID's

```js
async function() {
    overlaySetVisibility({ overlay: "my cool overlay", on: false });
}
```

### Overlay Set Layer Visibility

`overlaySetLayerVisibility({ layer: string, on: boolean })`: You can set the visibility of an overlay layer using this function. You should make sure all of your layers have unique names. We do not check for unique names since under the hood we use ID's

```js
async function() {
    overlaySetLayerVisibility({ layer: "My layer", on: false });
}
```

### Overlay Set Layer Position (X and Y)

`overlaySetLayerPosition({ layer: string, content: string })`: You can set the x and y position of an overlay layer using this function. `content` is just a string that will correspond to the x and y position separated by a comma. Our overlay is also fast enough to handle interpolation in case you want to move things in a smooth way.

```js
async function() {
    overlaySetLayerPosition({ layer: "My layer", content: "100,100" });
}
```

### Overlay Set Layer Size (Width and Height)

`overlaySetLayerSize({ layer: string, content: string })`: You can set the width and height of an overlay layer using this function. `content` is a string with the width and height separated by a comma. Like position, the overlay can interpolate so the resize can animate smoothly.

```js
async function() {
    overlaySetLayerSize({ layer: "My layer", content: "640,360" });
}
```

### Overlay Set Text Content

`overlaySetTextContent({ layer: string, content: string })`: You can set the text content of a text layer using this function. `content` is just a string that will correspond to the text that you want to set it to.

```js
async function() {
    overlaySetTextContent({ layer: "My layer", content: "" });
}
```

### Overlay Set Image Content

`overlaySetImageContent({ layer: string, content: string })`: You can set the image content of an image layer using this function. `content` is just a string that will correspond to the image name or url that you want to set it to. If you use a name it will try to find the name of an asset that you have in your overlay library. So if you have an asset named `lumia_logo.gif` you can set the content to the exact name with or without the file extension. This can be useful to allow chat to change the media using a `{{message}}` variable. After the content is changed it will automatically make the layer visibile and start playing

```js
async function() {
    overlaySetImageContent({ layer: "My layer", content: "lumia_logo.gif" });
    // Without file extension
    overlaySetImageContent({ layer: "My layer", content: "lumia_logo" });
    // Or using a url
    overlaySetImageContent({ layer: "My layer", content: "https://lumiastream.com/favicon.ico" });
}
```

### Overlay Set Video Content

`overlaySetVideoContent({ layer: string, content: string })`: You can set the video content of an video layer using this function. `content` is just a string that will correspond to the video name or url that you want to set it to. If you use a name it will try to find the name of an asset that you have in your overlay library. So if you have an asset named `lumia_video.webm` you can set the content to the exact name with or without the file extension. This can be useful to allow chat to change the media using a `{{message}}` variable. After the content is changed it will automatically make the layer visibile and start playing

```js
async function() {
    overlaySetVideoContent({ layer: "My layer", content: "lumia_video.webm" });
    // Without file extension
    overlaySetVideoContent({ layer: "My layer", content: "lumia_video" });
    // Or using a url
    overlaySetVideoContent({ layer: "My layer", content: "https://lumiastream.com/video.webm" });
}
```

### Overlay Set Audio Content

`overlaySetAudioContent({ layer: string, content: string })`: You can set the audio content of an audio layer using this function. `content` is just a string that will correspond to the audio name or url that you want to set it to. If you use a name it will try to find the name of an asset that you have in your overlay library. So if you have an asset named `lumia_land.mp3` you can set the content to the exact name with or without the file extension. This can be useful to allow chat to change the media using a `{{message}}` variable. After the content is changed it will automatically make the layer visibile and start playing

```js
async function() {
    overlaySetAudioContent({ layer: "My layer", content: "lumia_land.mp3" });
    // Without file extension
    overlaySetAudioContent({ layer: "My layer", content: "lumia_land" });
    // Or using a url
    overlaySetAudioContent({ layer: "My layer", content: "https://lumiastream.com/lumia_land.mp3" });
}
```

### Overlay Set Media Volume

`overlaySetVolume({ layer: string, volume: number })`: You can set the volume of a media layer using this function. `volume` is a number between 0 and 1 that will correspond to the volume url that you want to set it to. 1 is equal to 100, 0.5 is equal to 50%, and 0 is equal to 0%.

```js
async function() {
    overlaySetVolume({ layer: "My layer", volume: .5 });
}
```

### Overlay Play/Pause Media

`overlayPlayPauseMedia({ layer: string, volume: number })`: You can play/pause a media layer using this function. `on` is a boolean that will correspond to the state of the media. `true` plays the media and `false` pauses the media.

```js
async function() {
    overlayPlayPauseMedia({ layer: "My layer", on: false });
}
```

### Overlay Send HFX

`overlaySendHfx({ content: string, playAudio: boolean })`: You can directly trigger a HFX as well as play the audio or not using this function. No layer is needed here since HFX is always meant to have only one layer per overlay and will trigger any and all HFX video layers. `content` is a string that will correspond to the HFX name that you want to trigger. To see the list of names, please visit the HUDFX tab in the sidebar of Lumia Stream. Since these are updated weekly we will not store them in the documentation.

```js
async function() {
    overlaySendHfx({ content: "ghost-talk", playAudio: true });
}
```

### Overlay Set Timer

`overlayTimer({ layer: string, content: string })`: You can update a timer layer using this function. `content` is a string that will correspond to the time to set the timer to. After the timer is changed it will automatically make the layer visibile and start playing. You can use math here and short wording. The operators can all be used: `(+, -, /, *)` followed by the number and then the unit of time `(s, m, h, d)`.
You can also combine multiple values as well. Like `+1m10s` would increase the timer by 1 minute and 10 seconds. `=5m` would set the timer exactly at 5 minutes and will start running immediately.

```js
async function() {
    overlayTimer({ layer: "My layer", content: "+5s" });
}
```

### Overlay Shoutout

`overlayShoutout({ layer: string, clipType: "clipFromTarget" | "clipFromSender" | "clipFromStreamer", clipRandom: boolean, clipLimit: number, clipMaxTime: string })`: You can send a shoutout directly to a shoutout layer using this function. `clipType` has three types. `clipFromTarget` will take a clip from the user who was tagged in the `{{message}}` variable. So you can use @lumiastream in the message and it will take a clip from that channel. `clipFromSender` will take a clip from the person who triggered the command. This normally corresponds to the `{{user}}` variable. `clipFromStreamer` will take a clip from your channel and send it over. You can decide to take a random clip by setting `clipRandom` to true. Or if you would like to take the first clip that matched the `clipMaxTime` given in milliseconds then you can set `clipRandom` to false. `clipLimit` will determing how many of the newest clips should be brought in to determine which clip should be selected. After a clip is selected it will start running immediately

```js
async function() {
    // A random clip from the person who was tagged in the message that has a max clip time of 60 seconds and will only take in the newest 100 clips
    overlayShoutout({ layer: "My layer", clipType: "clipFromTarget", clipRandom: true, clipLimit: 100, clipMaxTime: "60000" });

    // The newest clip from the person who was tagged in the message that is under 20 seconds and will only take in the newest 20 clips
    overlayShoutout({ layer: "My layer", clipType: "clipFromTarget", clipRandom: false, clipLimit: 20, clipMaxTime: "20000" });

    // The newest clip from the person who triggered the command that is under 20 seconds and will only take in the newest 20 clips
    overlayShoutout({ layer: "My layer", clipType: "clipFromSender", clipRandom: false, clipLimit: 20, clipMaxTime: "20000" });
}
```

### Overlay Send To Custom Overlay

`overlaySendCustomContent({ codeId: string, content: string, layer?: string })`: You can send a content directly to custom overlays. `codeId` is the id of the code that created the custom overlay and will only send to overlays with this codeId. `content` is a string, but you can also pass in strigified json and then parse it in the custom overlay js code.
This function is useful for sending messages from a command or alert to your custom overlay without needing to rely on listening to events like chat and alerts. `layer` is not requred nor is it recommended to use if you will be sharing this command with your custom code.

```js
async function() {
    // A regular string message that can be sent to your custom overlay
    overlaySendCustomContent({ codeId: "myoverlay", content: "blue" });

    // A strigified json string that can then be parsed on the custom overlay js side. Add a key to your json so you konw this data belongs to your overlay
    overlaySendCustomContent({ codeId: "myoverlay", content: '{"key": "myoverlay", "color":"blue","age":5,"name":"user"}' });
}
```
