---
sidebar_position: 3
title: Custom actions
description: Custom Actions allow you to tap into how Lumia Stream calls actions from the inside
---

`Custom Actions` allow you to tap into how Lumia Stream calls actions from the inside.
`Custom Actions` are mainly meant for things that we haven't added as a `Helper function` yet. For instance, actions for Spotify, Twitch, Streamer.Bot etc are all actions that we do not have a have helper functions for. This is where an action will step in.

You can use actions by just passing in one object, or an array of objects.
If you pass in an array of actions then any action that can be awaited will be wait until the promise has been resolved.

This documentation for every action we use in Lumia can get extremely broad, so we will give examples for different actions, but if you get stuck please visit our [**Discord**](https://discord.gg/R8rCaKb) to ask us any questions.

Let's get started:

### Generic Action

`actions([ { base: "lumia", type: "tts", value: { message: "Hello" }, variables: {} } ]);`:

#### Before we begin, let's dissect this.

`base`: will be the base of actions that can be used with Custom Code. There are two groups of bases.

**System bases** (built into Lumia):
`delay, lumia, overlay, api, commandRunner, inputEvents`

> Note: `lumia` and `overlay` also accept the aliases `lumiaActions` and `overlayActions`, and the input base is `inputEvents` (plural).

**Integration bases** — every connected integration is also a valid base. These include (and more are added over time):
`twitch, youtube, facebook, tiktok, kick, discord, obs, slobs, meld, spotify, youtubemusic, nowplaying, vlc, voicemod, streamerbot, vtubestudio, midi, osc, artnet, mqtt, serial, websocket, broadlink, hue, lifx, nanoleaf, govee, wled, wiz, tplink, tuya, yeelight, elgato, streamdeck, touchportal, loupedeck, homeassistant, switchbot` plus any installed plugin (use the plugin's id as the base).

`type`: Every base has different action types. For instance, the base `lumia` has `chatbot, tts, setStreamMode, toggleStreamMode` and many more. The full type lists for the system bases are below; integration and plugin types vary per integration — the easiest way to discover the exact `base`, `type`, and `value` for an integration action is to configure that action once in Lumia's normal Action editor.

`value`: can sometimes be an object and sometimes a string, it all depends on the `base` and `type`

`variables`: allows you to send in different variables for each action. But do note that the variables that are already on the command/alert will also be spread on to this variables object. Variables are not required

There are more fields that are sometimes used in actions. `delay` (a number in milliseconds) can be added to any action to wait before running it.

### Passing an array of actions

```js
async function() {
    // Runs the TTS, then sends a chatbot message
    await actions([
        { base: "lumia", type: "tts", value: { message: "Hello {{username}}" } },
        { base: "lumia", type: "chatbot", value: { message: "Welcome {{username}}" } }
    ]);
    done();
}
```

### System base type reference

These are the built-in `type` values for each system base.

**`base: "lumia"`** — `callCommand, callRandomCommand, chatbot, tts, setStreamMode, toggleStreamMode, setFuzeAudioSensitivity, playAudio, writeToFile, setConnection, updateVariable, updateCounter, appendToVariable, unappendFromVariable, saveLocal, addToUserlevel, removeFromUserlevel, addToRestrictionsList, removeFromRestrictionsList, setFolder, setAlert, setAlertVariation, setCommand, setChatbotCommand, setTwitchPointsCommand, setTwitchExtensionCommand, setKickPointsCommand, setChatMatchCommand, setTwitchPointValue, setLoyaltyPointValue, setUserLoyaltyPoint, setTwitchExtensionBitsValue, setAutomation, setVoicecommands, sendToDiscordWebhook, sendToDiscordWithMediaWebhook, sendToWebhook, sendToPrinter, raffleEntry, raffleRemoveEntry, raffleGetWinner, raffleStart, raffleStop, raffleEnd, viewerQueueEntry, viewerQueueLeave, tournamentEntry, tournamentRemoveEntry, tournamentUpdatePoints, tournamentStart, tournamentEnd, viewerQueuePlayPause, viewerQueueEndQueue, viewerQueuePickPlayer, backToDefault, replayLastEventListEvent, runLastQueueItem, resumeQueue, pauseQueue, removeCurrentQueueItem, clearQueue, clearCooldowns, resetSession, cleanAll, refreshSettings, addSongRequest, skipSongRequest, clearSongRequestQueue, delay`

**`base: "overlay"`** — `alertTrigger, alertEvent, setOverlayVisibility, setLayerVisibility, setLayerPosition, setLayerSize, setTextContent, setImageContent, setVideoContent, setAudioContent, setLayerVolume, playPauseMedia, setContent, sendShoutout, sendCustomOverlayContent, sendGameTrigger, sendGameUpdate, takeScreenshot, spinwheelReset, spinwheelAddItem, spinwheelRemoveItem, sendHfx, hudOverlayChange, hudToggle, hudVolumeSet, hudOpacitySet, timerIncrement, pollTrigger, pollStart, pollResetVotes, pollSetTimer, pollAddItem, pollRemoveItem, delay`

**`base: "api"`** — `get, put, post, patch, delete, delay`

**`base: "commandRunner"`** — `app/file, shell command, delay`

**`base: "inputEvents"`** — `keyboard, mouse, delay`

**`base: "delay"`** — no `type`; pass the millisecond delay directly as the value, e.g. `{ base: "delay", value: 1000 }`.

> Tip: most of the `lumia` and `overlay` actions already have dedicated helper functions (`tts`, `chatbot`, `overlaySetTextContent`, etc.) in `helper-functions.md`. Reach for `actions()` mainly when you need an integration action that does not have a helper yet.

This documentation can get extremely broad for every integration, so if you get stuck please visit our [**Discord**](https://discord.gg/R8rCaKb) to ask us any questions.
