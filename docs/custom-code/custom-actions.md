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

> Note: the canonical system bases are `lumia` and `overlay`. The older spellings `lumiaActions` and `overlayActions` still run but are **deprecated** — prefer `lumia` / `overlay`. The input base is `inputEvents` (plural).

**Integration bases** — every connected integration is also a valid base. These include (and more are added over time):
`twitch, youtube, facebook, tiktok, kick, discord, obs, slobs, meld, spotify, youtubemusic, nowplaying, vlc, voicemod, streamerbot, vtubestudio, midi, osc, artnet, mqtt, serial, websocket, broadlink, hue, lifx, nanoleaf, govee, wled, wiz, tplink, tuya, yeelight, elgato, streamdeck, touchportal, loupedeck, homeassistant, switchbot` plus any installed plugin (use the plugin's id as the base).

`type`: Every base has different action types. For instance, the base `lumia` has `chatbot, tts, setStreamMode, toggleStreamMode` and many more. The full type lists for the system bases are below; integration and plugin types vary per integration — the easiest way to discover the exact `base`, `type`, and `value` for an integration action is to configure that action once in Lumia's normal Action editor.

`value`: can sometimes be an object and sometimes a string, it all depends on the `base` and `type`

`variables`: allows you to send in different variables for each action. But do note that the variables that are already on the command/alert will also be spread on to this variables object. Variables are not required

To pause between actions, insert a dedicated **delay step**: an entry whose `type` is `"delay"` with the milliseconds in `delay` (e.g. `{ type: "delay", delay: 1000 }`). It can carry any `base` and runs in order with the rest of the list. (An inline `delay` on a non-delay action is **not** applied by the runner — use a delay step.)

#### Where actions live: the unified `actions` lane

Inside a Lumia **command** or **alert**, every action — whatever its `base` (a `lumia` system action, an `overlay` action, a `twitch` action, an integration, a plugin) — lives together in one ordered list on the command:

```json
{
  "actions": {
    "before": [{ "base": "lumia", "type": "tts", "value": { "message": "Hi" } }],
    "after": [{ "base": "twitch", "type": "clip", "value": { "title": "Clutch!", "duration": 30 } }],
    "waitForActions": true
  }
}
```

- **`before`** runs before the command/alert's main effect (its light / overlay reaction); **`after`** runs after it.
- **`waitForActions`** (optional): when `true`, each action is awaited so the list runs in strict order before the command continues; when omitted or `false`, the list fires without waiting.
- Every entry is one action object of the shape `{ base, type, value?, delay?, args? }` — the same object you pass to the custom-code `actions()` helper. `delay` holds the milliseconds for a `type: "delay"` step; `args` carries the extra payload used by imported Streamer.bot actions.

This unified `actions` lane is the current model, and the one the AI action creator and the Streamer.bot / Mix It Up importers target. It **replaces** the older per-source command fields (`lumiaActions`, `overlayActions`, `api`, `commandRunner`, `inputEvents`) and the per-integration lanes (`command.<integration>.before/after` — e.g. `command.wavelink`, `command.streamfog`, whose entries have no `base`), all of which are **deprecated** — within the unified lane the source is simply each entry's `base`.

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

**`base: "inputEvents"`** — `keyboard, mouse, delay`. The key/mouse data is **flat on the action**, not under `value`:
> - `keyboard`: `{ base: "inputEvents", type: "keyboard", keyboardValue: { value: "ctrl+j", valueType: "combination" } }` — `valueType` is `combination` (a hotkey like `ctrl+shift+f5`) or `input` (type the literal `value` as text); optional `longPress`, `cpm`.
> - `mouse`: `{ base: "inputEvents", type: "mouse", mouseValue: { x: 0, y: 100, clickEvent: "left", moveType: "set" } }` — `clickEvent` is `left` / `right` / `none`; optional `x1`, `y1`, `doubleClick`, `mouseSpeed`.

**delay step** — an entry with `type: "delay"` pauses the list; put the milliseconds in `delay` (e.g. `{ type: "delay", delay: 1000 }`). `duration` is accepted in place of `delay`, and the step runs under any `base`.

**custom code step** — `{ base: "lumia", type: "code", value: { value: "<js source>" } }` runs a JavaScript [custom-code](helper-functions.md) step **in sequence** within the list (it's a Lumia action type — "Custom Code" in the editor's Lumia actions; a bare top-level string `value` also runs, for back-compat). It shares variables with the steps around it: it reads `{{tokens}}` / `getVariable` set by earlier actions, its `done({ variables })` flow to the later actions, and `done({ shouldStop: true })` stops the rest of the list. Use it to interleave real logic (loops, conditionals, computed values) between native actions — it runs in its exact position, unlike the older separate code lane.

> Tip: most of the `lumia` and `overlay` actions already have dedicated helper functions (`tts`, `chatbot`, `overlaySetTextContent`, etc.) in `helper-functions.md`. Reach for `actions()` mainly when you need an integration action that does not have a helper yet.

### Common `lumia` action examples

Most `lumia` actions have a dedicated helper already (`chatbot`, `tts`, `playAudio`, `setVariable`, etc.) — prefer those. Reach for `actions()` for the engagement / system features that have no helper. The `value` fields are not uniform across types, so if you need a type not shown here, set that action up once in the normal action editor to read off its fields. Verified examples:

```js
async function() {
    // Song requests
    await actions([{ base: "lumia", type: "addSongRequest", value: { value: "never gonna give you up" } }]); // a search term or url
    await actions([{ base: "lumia", type: "skipSongRequest" }]);

    // Raffle (ends_after is in seconds; raffleStop / raffleEnd take no value)
    await actions([{ base: "lumia", type: "raffleStart", value: { title: "My Raffle", auto_end: true, ends_after: 120 } }]);

    // Viewer queue
    await actions([{ base: "lumia", type: "viewerQueueEntry", value: { value: "{{username}}" } }]);

    // Stream mode and connections
    await actions([{ base: "lumia", type: "setStreamMode", value: { on: true } }]);
    await actions([{ base: "lumia", type: "setConnection", value: { value: "obs", on: true } }]); // on:true enables, false disables

    // Counter (operator is one of + - * /)
    await actions([{ base: "lumia", type: "updateCounter", value: { value: "deaths", message: "1", operator: "+" } }]);
    done();
}
```

### Engagement & system `lumia` actions

These `lumia` actions drive Lumia's engagement features (raffles, tournaments, viewer queue, song requests) and system controls. None of them has a dedicated helper, so call them through `actions()`. The action shape is `{ base: "lumia", type: "<type>", value: { ... } }` — the fields in the tables below go **inside the inner `value` object**. Text fields accept template tokens like `{{username}}`.

#### Enable / disable commands, alerts, folders & automations

`on: true` enables, `on: false` disables.

| type | `value` | targets |
| --- | --- | --- |
| `setCommand` | `{ value: "<command name>", on: true }` | a chat command |
| `setChatbotCommand` | `{ value: "<command name>", on: true }` | a chatbot command |
| `setTwitchPointsCommand` | `{ value: "<command name>", on: true }` | a Twitch channel-points reward command |
| `setTwitchExtensionCommand` | `{ value: "<command name>", on: true }` | a Twitch extension command |
| `setKickPointsCommand` | `{ value: "<command name>", on: true }` | a Kick points command |
| `setChatMatchCommand` | `{ value: "<chat-match id>", on: true }` | a chat-match command (by id) |
| `setAlert` | `{ value: "<alert key>", on: true }` | an alert (its `pathKey`) |
| `setAlertVariation` | `{ value: "<alert key>", variation: "<variation id>", on: true }` | one variation of an alert |
| `setFolder` | `{ value: "<folder id>", on: true }` | a command/alert folder |
| `setAutomation` | `{ value: "<automation name>", on: true }` | an automation/timer (matched by name) |
| `setVoicecommands` | `{ on: true }` | the voice-commands input as a whole |
| `setFuzeAudioSensitivity` | `{ value: 50 }` | Fuze audio sensitivity (number) |

#### Variables, local storage & files

| type | `value` | notes |
| --- | --- | --- |
| `appendToVariable` | `{ value: "<variable name>", message: "<item>", unique: true }` | append an item to a list variable; `unique` skips it if already present |
| `unappendFromVariable` | `{ value: "<variable name>", message: "<item>" }` | remove an item from a list variable |
| `saveLocal` | `{ value: "<key>", message: "<value>" }` | persist a value (same store as the `{{save_local}}` / `{{load_local}}` chat functions) |
| `writeToFile` | `{ value: "<file path>", message: "<content>", on: true }` | write text to a file; `on: true` appends instead of overwriting |

> For plain variables prefer the `setVariable` / `getVariable` / `deleteVariable` helpers in `helper-functions.md`.

#### Userlevels & restrictions

| type | `value` | notes |
| --- | --- | --- |
| `addToUserlevel` | `{ value: "<userlevel id>", message: "<username>" }` | add a user to a userlevel |
| `removeFromUserlevel` | `{ value: "<userlevel id>", message: "<username>" }` | remove a user from a userlevel |
| `addToRestrictionsList` | `{ message: "<username>" }` | restrict a user (no `value`) |
| `removeFromRestrictionsList` | `{ message: "<username>" }` | unrestrict a user |

#### Raffles

| type | `value` | notes |
| --- | --- | --- |
| `raffleStart` | `{ title: "<title>", preset: "<raffle id>", auto_end: true, ends_after: 5 }` | all optional; `preset` seeds from a saved raffle, `ends_after` is in **minutes** (default 30), `auto_end` turns on the timer |
| `raffleEntry` | `{ value: "<username>" }` | needs a started raffle |
| `raffleRemoveEntry` | `{ value: "<username>" }` | |
| `raffleStop` | `{}` | stop accepting entries |
| `raffleGetWinner` | `{}` | pick a winner (raffle must be stopped first) |
| `raffleEnd` | `{}` | end the raffle |

#### Tournaments

| type | `value` | notes |
| --- | --- | --- |
| `tournamentStart` | `{ preset: "<tournament id>" }` | start from a preset, or a new tournament if omitted |
| `tournamentEntry` | `{ message: "<username>", value: "<avatar url>", extra: "<team>", platform: "twitch" }` | `message` is the username; needs a running tournament with signups open |
| `tournamentRemoveEntry` | `{ message: "<username>", platform: "twitch" }` | |
| `tournamentUpdatePoints` | `{ message: "<username>", points: "+100" }` | `points` uses the modifier syntax (`+ - * / =`); defaults to `=` (set) when no modifier |
| `tournamentEnd` | `{}` | |

#### Viewer queue

| type | `value` | notes |
| --- | --- | --- |
| `viewerQueueEntry` | `{ value: "<username>" }` | needs a started queue |
| `viewerQueueLeave` | `{ value: "<username>" }` | |
| `viewerQueuePickPlayer` | `{ value: 1, mode: "single" }` | pick N players; `mode` is `single`, `bulkfirst`, or `bulkrandom` (default `single`, 1 player) |
| `viewerQueuePlayPause` | `{ on: true }` | `true` plays, `false` pauses |
| `viewerQueueEndQueue` | `{}` | |

#### Song requests

| type | `value` | notes |
| --- | --- | --- |
| `addSongRequest` | `{ value: "<search term or url>", requesterUsername: "{{username}}", skipApproval: true }` | `skipApproval` (or `forceApprove`) bypasses the approval queue |
| `skipSongRequest` | `{}` | |
| `clearSongRequestQueue` | `{}` | |

#### Queue, cooldowns & session (no `value` needed)

| type | what it does |
| --- | --- |
| `pauseQueue` / `resumeQueue` | pause / resume the action queue |
| `removeCurrentQueueItem` | drop the item currently running |
| `runLastQueueItem` | re-run the last completed queue item |
| `clearQueue` | empty the queue |
| `clearCooldowns` | clear all command cooldowns |
| `resetSession` | reset session variables (session counts) |
| `cleanAll` | clear queue + cooldowns and send lights to default |
| `backToDefault` | send lights back to their default |
| `refreshSettings` | hard-refresh Lumia's settings |
| `replayLastEventListEvent` | replay the most recent event-list event |

Call these with no inner value, e.g. `await actions([{ base: "lumia", type: "clearQueue" }]);`

#### Other command calls & webhooks

| type | `value` | notes |
| --- | --- | --- |
| `callRandomCommand` | `{ options: ["cmdA", "cmdB", "cmdC"], addToEndOfQueue: false }` | run one of the listed commands at random |
| `toggleStreamMode` | `{}` | flip stream mode on/off (use `setStreamMode { on }` to set it explicitly) |
| `sendToWebhook` | `{ value: "<url>", message: "<json string>" }` | `message` must be valid JSON — it is parsed and POSTed as the request body |
| `sendToDiscordWebhook` | `{ value: "<discord webhook url>", message: "<text>" }` | posts text to a Discord webhook |
| `sendToDiscordWithMediaWebhook` | `{ value: "<discord webhook url>", message: "<text>", file: "<local file path>" }` | posts text + an uploaded file |
| `sendToPrinter` | `{ value: "<IP:port or usb://vendor:product>", type: "image", message: "<image path>" }` | `type` is `image` (default) or `text`; for `text`, `message` is the text to print |

```js
async function() {
    // Start a 5-minute raffle, then enter the running viewer
    await actions([
        { base: "lumia", type: "raffleStart", value: { title: "Giveaway", auto_end: true, ends_after: 5 } },
        { base: "lumia", type: "raffleEntry", value: { value: "{{username}}" } },
    ]);

    // Disable a command and clear the queue
    await actions([
        { base: "lumia", type: "setCommand", value: { value: "!hug", on: false } },
        { base: "lumia", type: "clearQueue" },
    ]);
    done();
}
```

### Points, loyalty & currency actions

Several `lumia` actions change a point value, and they all share the same **modifier** syntax on the amount you pass in:

| You pass | Result |
| --- | --- |
| `+100` | add 100 |
| `-100` | subtract 100 |
| `*2` | multiply by 2 |
| `/2` | divide by 2 |
| `=300` | set the exact value to 300 |

A bare number with **no** modifier falls back to each action's own default (noted per action below). The same `+ - * / =` modifiers also work on the `updateCounter` and `updateVariable` actions.

#### `setUserLoyaltyPoint` — change a viewer's loyalty balance

| Field | Meaning |
| --- | --- |
| `value.value` | the amount (with optional modifier) |
| `value.message` | the username to target — defaults to the command's own `{{username}}` |
| `value.platform` | optional; defaults to the event's platform, then `twitch` |

**Default modifier: `+`** — a bare number *adds* points.

```js
async function() {
    // Give the viewer who triggered this 100 points
    await actions([{ base: "lumia", type: "setUserLoyaltyPoint", value: { value: "100", message: "{{username}}" } }]);

    // Take 50 points from a specific user on YouTube
    await actions([{ base: "lumia", type: "setUserLoyaltyPoint", value: { value: "-50", message: "someviewer", platform: "youtube" } }]);

    // Set an exact balance of 500
    await actions([{ base: "lumia", type: "setUserLoyaltyPoint", value: { value: "=500", message: "{{username}}" } }]);
    done();
}
```

#### `setLoyaltyPointValue` — change the loyalty-points **cost** of one of your commands

| Field | Meaning |
| --- | --- |
| `value.value` | the command name whose cost you are changing |
| `value.points` | the new cost (with optional modifier) |

**Default modifier: `=`** — a bare number *sets* the cost.

```js
async function() {
    await actions([{ base: "lumia", type: "setLoyaltyPointValue", value: { value: "myredeem", points: "250" } }]); // cost becomes 250
    await actions([{ base: "lumia", type: "setLoyaltyPointValue", value: { value: "myredeem", points: "+50" } }]);  // cost goes up by 50
    done();
}
```

#### `setTwitchPointValue` / `setTwitchExtensionBitsValue` — change a Twitch reward's cost

Both take the same `{ value: "<commandName>", points: "<amount>" }` shape as `setLoyaltyPointValue` and also **default to `=`**. `setTwitchPointValue` updates a channel-points reward's cost; `setTwitchExtensionBitsValue` updates a Twitch-extension command's Bits cost.

```js
async function() {
    await actions([{ base: "lumia", type: "setTwitchPointValue", value: { value: "myreward", points: "1000" } }]);
    await actions([{ base: "lumia", type: "setTwitchExtensionBitsValue", value: { value: "myextcommand", points: "100" } }]);
    done();
}
```

### Overlay actions without a helper

These `base: "overlay"` actions don't have a dedicated helper yet. Their inner `value` targets a layer with `layer` (add `overlay: "<overlay name>"` to disambiguate which overlay the layer belongs to). `content` fields accept template tokens.

#### Spin wheel

| type | `value` | notes |
| --- | --- | --- |
| `spinwheelAddItem` | `{ layer: "<layer>", content: "<item title>", image: "<image url>" }` | adds an item (max 60); `image` is optional |
| `spinwheelRemoveItem` | `{ layer: "<layer>", content: "<item title>" }` | removes a matching item |
| `spinwheelReset` | `{ layer: "<layer>", removeItems: true }` | `removeItems: true` wipes all items; otherwise it just resets the wheel |

#### Polls / trigger games

| type | `value` | notes |
| --- | --- | --- |
| `pollStart` | `{ layer: "<layer>" }` | start the poll |
| `pollTrigger` | `{ layer: "<layer>" }` | trigger using the caller's username/message |
| `pollAddItem` | `{ layer: "<layer>", content: "<option title>", trigger: "<keyword>" }` | `trigger` defaults to the next option number |
| `pollRemoveItem` | `{ layer: "<layer>", content: "<option title>" }` | |
| `pollResetVotes` | `{ layer: "<layer>" }` | |
| `pollSetTimer` | `{ layer: "<layer>", content: "30" }` | `content` is the timer duration in seconds |

#### Game overlays, content & screenshots

| type | `value` | notes |
| --- | --- | --- |
| `sendGameTrigger` | `{ layer: "<layer>", content: "<value>" }` | targets the player from the caller's context |
| `sendGameUpdate` | `{ layer: "<layer>", content: "<value>" }` | |
| `setContent` | `{ layer: "<layer>", content: "<text>" }` | same as the `overlaySetTextContent` helper |
| `alertEvent` | `{ value: "<alert id>", variation: "<variation>", duration: 5000 }` | fire an overlay alert event; `duration` in ms |
| `takeScreenshot` | `{ value: "<overlay id>", format: "png", conversion: "original" }` | `format` is `png` or `jpeg`; `conversion` is `original`, `thermal`, `grayscale`, `invert`, or `binary`; resolves to the saved image path |

#### HUD

| type | `value` | notes |
| --- | --- | --- |
| `hudToggle` | `{}` | toggle the HUD |
| `hudOverlayChange` | `{ value: "<overlay>" }` | switch the HUD overlay |
| `hudVolumeSet` | `{ volume: 50 }` | set HUD volume |
| `hudOpacitySet` | `{ volume: 80 }` | set HUD opacity — note the value goes in the `volume` field |

### OBS (v5) actions

OBS has a dedicated helper, so you do **not** need `actions()` for it: pass any OBS websocket v5 request to `sendRawObsJson({ "request-type": "...", ...params })` (see `helper-functions.md`). The `request-type` and fields are exactly the same ones Lumia's OBS action editor uses. Common ones:

```js
async function() {
    // Scenes
    sendRawObsJson({ "request-type": "SetCurrentProgramScene", "sceneName": "My Scene" });
    sendRawObsJson({ "request-type": "SetCurrentPreviewScene", "sceneName": "My Scene" });

    // Source visibility (by name — Lumia resolves the scene item id for you)
    sendRawObsJson({ "request-type": "SetSceneItemEnabled", "sceneName": "My Scene", "inputName": "My Source", "sceneItemEnabled": true });
    sendRawObsJson({ "request-type": "SetSourceFilterEnabled", "sourceName": "My Source", "filterName": "My Filter", "filterEnabled": true });

    // Audio
    sendRawObsJson({ "request-type": "SetInputMute", "inputName": "Mic/Aux", "inputMuted": true });
    sendRawObsJson({ "request-type": "ToggleInputMute", "inputName": "Mic/Aux" });
    sendRawObsJson({ "request-type": "SetInputVolume", "inputName": "Mic/Aux", "inputVolumeMul": 1 });

    // Source settings (url / text / file / image / media)
    sendRawObsJson({ "request-type": "SetInputSettings", "inputName": "Browser", "inputSettings": { "url": "https://lumiastream.com" } });

    // Media, transitions, screenshot
    sendRawObsJson({ "request-type": "TriggerMediaInputAction", "inputName": "My Video", "mediaAction": "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART" });
    sendRawObsJson({ "request-type": "SetCurrentSceneTransition", "transitionName": "Fade" });

    // Recording / streaming / replay buffer / virtual cam (no params)
    sendRawObsJson({ "request-type": "StartRecord" });
    sendRawObsJson({ "request-type": "ToggleStream" });
    sendRawObsJson({ "request-type": "SaveReplayBuffer" });
    sendRawObsJson({ "request-type": "StartVirtualCam" });
    done();
}
```

Other available request-types include `SetCurrentProfile`, `SetCurrentSceneCollection`, `CreateInput`, `RemoveInput`, `SetSceneItemTransform`, `SetSceneItemBlendMode`, `SetInputAudioMonitorType`, `TriggerHotkeyByName`, `SetStudioModeEnabled`, `SendStreamCaption`, and the `Start/Stop/Toggle` variants for recording, streaming, replay buffer and virtual cam — the same list as the OBS action editor.

### Integration actions

Every connected integration is also a valid `base` (`spotify`, `discord`, `vtubestudio`, `midi`, `osc`, and the rest listed at the top). An integration action only runs if that integration is **connected and enabled** — otherwise it is silently skipped. The exact `type` and `value` vary per integration; the common ones are below. To find anything not listed, set the action up once in the normal action editor and read off its fields.

**Wrapper styles differ per integration** — each subsection states which it uses:

- **`value` object** — `{ base, type, value: { ... } }`: Discord, VTube Studio, Twitch, YouTube, Kick, TikTok, Meld, SwitchBot, Wave Link, Camera Hub, StreamFog.
- **scalar `value`** — `{ base, type, value: "..." }`: Spotify, VLC, YouTube Music, Voicemod, Streamer.bot.
- **flat fields** — `{ base, type, ...fields }` with no `value` wrapper: MIDI, OSC, OBS, MQTT, WebSocket, Serial, Art-Net, Broadlink (SLOBS is a special case, noted below).

Every integration also supports a delay step: `{ base: "<integration>", type: "delay", delay: <ms> }`. String fields generally resolve `{{template}}` tokens (Art-Net is the exception).

> **Lights** (Hue, LIFX, Govee, Nanoleaf, WLED, Elgato key lights, etc.) have **no** action `base` — control them with the `sendColor` helper (see `helper-functions.md`), not through `actions()`.

#### Spotify (`base: "spotify"`)

Spotify actions take a single scalar `value` (not an object). Playback control needs an active Spotify device.

| type | `value` | notes |
| --- | --- | --- |
| `setPlayState` | `"play"` / `"pause"` / `"toggle"` | |
| `skipToNext` / `skipToPrevious` | — | no value needed |
| `setVolume` | `0`–`100` | percent |
| `seek` | `<milliseconds>` | |
| `setShuffle` | `"true"` / `"false"` / `"toggle"` | |
| `setRepeat` | `"track"` / `"context"` / `"off"` | |
| `searchAndPlay` | `"<query or track url>"` | queues the match then skips to it |
| `searchAndPlayImmediately` | `"<query or track url>"` | plays it right away |
| `searchAndAddToQueue` | `"<query or track url>"` | adds to the queue |
| `searchAndAddToPlaylist` | `"<query or track url>"` + top-level `target: "<playlist id>"` | |

```js
async function() {
    await actions([{ base: "spotify", type: "setVolume", value: 40 }]);
    await actions([{ base: "spotify", type: "searchAndAddToQueue", value: "never gonna give you up" }]);
    await actions([{ base: "spotify", type: "searchAndAddToPlaylist", value: "yesterday", target: "37i9dQZF1DXcBWIGoYBM5M" }]);
    done();
}
```

#### Discord (`base: "discord"`)

Discord actions take a `value` object and post through your connected Discord.

| type | `value` | notes |
| --- | --- | --- |
| `sendMessage` | `{ value: "<message>", target: "<channel id>", file: "<local path>", embeds: "<json string>", on: false }` | the message text is `value.value`; `target` defaults to your primary channel; `on: true` sends it as TTS; `embeds` is a JSON-array string |
| `addMemberRole` | `{ value: "<username>", target: "<role id>" }` | |
| `removeMemberRole` | `{ value: "<username>", target: "<role id>" }` | |
| `kickMember` | `{ value: "<username>" }` | |

```js
async function() {
    await actions([{ base: "discord", type: "sendMessage", value: { value: "Stream is live! {{twitch_channel_title}}" } }]);
    done();
}
```

#### VTube Studio (`base: "vtubestudio"`)

VTube Studio actions take a `value` object; the identifier (model / hotkey / expression) goes in the inner `value.value`.

| type | `value` | notes |
| --- | --- | --- |
| `loadModel` | `{ value: "<model name or id>" }` | |
| `hotkeyTrigger` | `{ value: "<hotkey id>" }` | |
| `expressionTrigger` | `{ value: "<expression name>", on: true }` | `on` activates / deactivates |
| `moveModel` | `{ positionX: "0", positionY: "0.5", rotation: "0", timeInSeconds: 1, valuesAreRelativeToModel: false }` | position/rotation are numbers or numeric strings |
| `resizeModel` | `{ size: "-22.5", timeInSeconds: 1, valuesAreRelativeToModel: false }` | `size` ranges -100 (smallest) to 100 (biggest); applied through MoveModelRequest |

```js
async function() {
    await actions([{ base: "vtubestudio", type: "hotkeyTrigger", value: { value: "MyHotkey" } }]);
    done();
}
```

#### MIDI (`base: "midi"`) and OSC (`base: "osc"`)

MIDI and OSC read their fields **flat on the action object** — there is no `value` wrapper.

```js
async function() {
    // MIDI: send a note (channel 1-16, note name like "C3", velocity 0-127)
    await actions([{ base: "midi", type: "note-on", port: 0, channel: 1, note: "C3", velocity: 127 }]);

    // OSC: send a typed message. type is "s" (string), "f" (float), or "i" (int).
    await actions([{ base: "osc", type: "f", name: "/track/1/volume", sendPort: "9000", value: 0.8 }]);
    done();
}
```

> MIDI device targeting: `port` (the device's port number) is the simplest selector and is required. On a multi-device setup — where ports can shift between sessions — also pass the optional `deviceId` and/or `deviceName`; Lumia resolves the target by `deviceId`, then `deviceName`, then `port`. `type` is `note-on`, `note-off`, or `delay` (a `delay` entry just waits its `delay` ms).

#### Twitch (`base: "twitch"`)

Twitch actions take a `value` object. Most string inputs — usernames, message ids, comma-separated option lists — go in `value.message`. Each action needs the matching Twitch permission to be granted on your connection.

Stream & engagement:

| type | `value` | notes |
| --- | --- | --- |
| `changeStreamTitle` | `{ message: "<title>" }` | |
| `changeCurrentCategory` | `{ message: "<game/category>" }` | matched by name |
| `clip` | `{ title: "<title>", duration: 30 }` | `duration` 5–60s; sets `{{twitch_last_clip_url}}` |
| `createStreamMarker` | `{ message: "<description>" }` | |
| `runCommercial` | `{ duration: 60 }` | one of 30/60/90/120/150/180 |
| `changeUserColor` | `{ color: "blue" }` | named color (Prime/Turbo can use hex) |
| `shoutout` | `{ message: "<username>" }` | runs your shoutout command |
| `raid` | `{ message: "<channel>" }` | |
| `sendAnnouncement` | `{ message: "<text>", color: "primary" }` | color: primary/blue/green/orange/purple |
| `createPoll` | `{ title: "<title>", message: "opt1,opt2", duration: 60 }` | options comma-separated; `duration` seconds |
| `endPoll` | `{ reason: "ARCHIVED" }` | `ARCHIVED` or `TERMINATED` |
| `createPrediction` | `{ title: "<title>", message: "outcome1,outcome2", duration: 60 }` | |
| `endPrediction` | `{ reason: "RESOLVED", message: "<winning outcome>" }` | `RESOLVED`/`CANCELED`/`LOCKED`; `message` is the winning outcome text |
| `updateRedemptionStatus` | `{ status: "FULFILLED" }` | `FULFILLED` or `CANCELED`; applies to pending redemptions |

Chat modes (`on: true` enables):

| type | `value` |
| --- | --- |
| `setSubscriberMode` / `setEmotesMode` / `setUniqueChatMode` | `{ on: true }` |
| `setFollowMode` | `{ on: true, duration: 0 }` (`duration` in **minutes**) |
| `setSlowMode` | `{ on: true, duration: 30 }` (`duration` in **seconds**) |
| `clearChat` | `{}` |

Moderation:

| type | `value` | notes |
| --- | --- | --- |
| `banUser` | `{ message: "<username>", reason: "" }` | |
| `unbanUser` | `{ message: "<username>" }` | |
| `timeoutUser` | `{ message: "<username>", duration: 600, reason: "" }` | `duration` in seconds |
| `deleteMessage` | `{ message: "<message id>" }` | |
| `pinMessage` | `{ message: "<text>", duration: 0 }` | sends then pins; `duration` 0 = no expiry, else 30–1800s |
| `unpinMessage` | `{}` | |
| `addModerator` / `removeModerator` / `addVip` / `removeVip` | `{ message: "<username>" }` | |
| `warnUser` | `{ message: "<username>", reason: "" }` | |
| `blockUser` / `unblockUser` | `{ message: "<username>" }` | |
| `addBlockedWord` / `removeBlockedWord` | `{ message: "<word>" }` | |
| `shieldModeOn` / `shieldModeOff` | `{}` | |
| `setSuspiciousUserStatus` | `{ message: "<username>", status: "ACTIVE_MONITORING" }` | `ACTIVE_MONITORING` or `RESTRICTED` |
| `removeSuspiciousUserStatus` | `{ message: "<username>" }` | |

```js
async function() {
    await actions([{ base: "twitch", type: "clip", value: { title: "Clutch!", duration: 30 } }]);
    await actions([{ base: "twitch", type: "sendAnnouncement", value: { message: "Raid incoming!", color: "purple" } }]);
    done();
}
```

#### YouTube (`base: "youtube"`)

`value` object. Usernames go in `value.message`.

| type | `value` | notes |
| --- | --- | --- |
| `changeStreamTitle` | `{ title: "<title>", message: "<description>" }` | note: `message` is the **description** |
| `banUser` | `{ message: "<username>" }` | permanent |
| `unbanUser` | `{ message: "<username>" }` | |
| `timeoutUser` | `{ message: "<username>", duration: 300 }` | `duration` in seconds |
| `deleteMessage` | `{ message: "<message id>" }` | |
| `shoutout` | `{ message: "<username>" }` | |

#### Kick (`base: "kick"`)

`value` object. Usernames and the stream title both go in `value.message`. No poll or send-message action (chat goes through the chatbot).

| type | `value` | notes |
| --- | --- | --- |
| `changeStreamTitle` | `{ message: "<title>" }` | |
| `changeCurrentCategory` | `{ message: "<category>" }` | matched by name |
| `shoutout` | `{ message: "<username>" }` | |
| `banUser` | `{ message: "<username>", reason: "" }` | |
| `unbanUser` | `{ message: "<username>" }` | |
| `timeoutUser` | `{ message: "<username>", duration: 600, reason: "" }` | `duration` in seconds |

#### TikTok (`base: "tiktok"`)

`value` object. TikTok actions are **video upload only** (everything else is inbound events).

| type | `value` | notes |
| --- | --- | --- |
| `uploadDraftVideo` | `{ media: "<local file path>" }` | uploads to your TikTok inbox to finish/publish manually |
| `uploadAndPublishVideo` | `{ media: "<local file path>", title: "<title>", privacy_level: "PUBLIC_TO_EVERYONE", disable_comment: false, disable_duet: false, disable_stitch: false }` | `privacy_level`: `PUBLIC_TO_EVERYONE` / `MUTUAL_FOLLOW_FRIENDS` / `SELF_ONLY` |

#### OBS (`base: "obs"`)

For OBS, prefer the **`sendRawObsJson`** helper documented above — the `actions()` OBS path uses the same OBS-websocket-v5 `request-type` values and fields. Reach for `base: "obs"` only to batch OBS in one ordered `actions([...])` array with other bases, or to use Lumia's convenience source types.

OBS fields are **flat** on the action object (the type key is `request-type`, hyphenated):

```js
async function() {
    await actions([
        { base: "obs", "request-type": "SetCurrentProgramScene", sceneName: "Starting Soon" },
        { base: "obs", "request-type": "SetInputMute", inputName: "Mic/Aux", inputMuted: true },
    ]);
    done();
}
```

Common direct request-types (flat fields, verified against real setups):

| `request-type` | fields |
| --- | --- |
| `SetCurrentProgramScene` | `{ sceneName }` |
| `SetSceneItemEnabled` | `{ sceneName, inputName, sceneItemEnabled }` — Lumia resolves `inputName` → the scene-item id |
| `SetSourceFilterEnabled` | `{ sourceName, filterName, filterEnabled }` |
| `SaveSourceScreenshot` | `{ sourceName, imageFormat, imageFilePath }` |
| `StartStream` / `StopStream` / `StartRecord` / `StopRecord` | no extra fields |

Convenience source types let you set a source's content without hand-building `inputSettings`, but they only work if you **also** pass `lumiaOrigin: "SetInputSettings"` — Lumia rewrites the request into a real `SetInputSettings` call using it. Without `lumiaOrigin` the alias is sent verbatim and OBS rejects it. The aliases: `SetSourceText` (`{ inputName, text }`), `SetGenericUrlSource` / `SetSourceUrl` (`{ inputName, url }`), `SetGenericFileSource` / `SetImageFileSource` / `SetMediaFileSource` (`{ inputName, file }`):

```js
{ base: "obs", "request-type": "SetMediaFileSource", lumiaOrigin: "SetInputSettings", inputName: "Replay", file: "{{get_latest_file_from_folder=G:/Replays}}" }
```

For custom code it's usually simpler to skip the alias and call `sendRawObsJson({ "request-type": "SetInputSettings", inputName: "Replay", inputSettings: { local_file: "..." } })` directly. All other request-types match the OBS v5 API exactly.

#### Streamlabs Desktop (`base: "slobs"`)

SLOBS uses JSON-RPC, so an action carries both a `type` (for delay routing) and an RPC `method` + `params`. Only a few types are exposed:

| type | shape | notes |
| --- | --- | --- |
| `SetCurrentScene` | `{ base: "slobs", type: "SetCurrentScene", method: "makeSceneActive", params: { resource: "ScenesService", args: ["<sceneId>"] } }` | switch scene |
| `SetCurrentSceneCollection` | `{ ..., type: "SetCurrentSceneCollection", method: "load", params: { resource: "SceneCollectionsService", args: ["<collectionId>"] } }` | |
| `SetSourceRender` | `{ ..., type: "SetSourceRender", method: "setVisibility", params: { resource: "<sceneItemId>", args: [true] } }` | scene-item visibility |

#### Meld Studio (`base: "meld"`)

`value` object; scene/layer/track/effect targets accept the friendly name or id.

| type | `value` | notes |
| --- | --- | --- |
| `SetScene` | `{ value: "<scene>" }` | show a scene |
| `SetStagedScene` | `{ value: "<scene>" }` | set the staged (preview) scene |
| `ShowStagedScene` | `{}` | promote staged to live |
| `SetLayerVisibility` | `{ value: "<layer>", on: true }` | |
| `SetLayerEffect` | `{ parent: "<layer>", value: "<effect>", on: true }` | |
| `SetAudioTrackMute` | `{ value: "<track>", on: true }` | `on: true` = muted |
| `StartRecord` / `StopRecord` / `StartStream` / `StopStream` | `{}` | |
| `Clip` / `Screenshot` | `{}` | |
| `SendCommand` | `{ value: "meld.<command>" }` | raw command, e.g. `meld.toggleStreamingAction` |

#### VLC (`base: "vlc"`)

Scalar `value`.

| type | `value` | notes |
| --- | --- | --- |
| `setPlayState` | `"play"` / `"pause"` / `"toggle"` | |
| `playlistNext` / `playlistPrevious` | — | |
| `setVolume` | `0`–`125` | percent |
| `seek` | `"+30"` / `"-30"` / `"50%"` / `"120"` | VLC seek syntax |
| `setShuffle` / `setRepeat` / `setLoop` | `"true"` / `"false"` / `"toggle"` | |
| `addToQueueAndPlay` | `"<uri or path>"` | |
| `addToQueue` | `"<uri or path>"` | |
| `playlistEmpty` | — | clears the playlist |

#### YouTube Music (`base: "youtubemusic"`)

Scalar `value`; most types take no value.

| type | `value` | notes |
| --- | --- | --- |
| `setPlayState` | `"play"` / `"pause"` / `"toggle"` | |
| `skipToNext` / `skipToPrevious` | — | |
| `toggleShuffle` / `toggleRepeat` | — | |
| `thumbsUp` / `thumbsDown` | — | |
| `setVolumeUp` / `setVolumeDown` | — | |
| `searchAndPlayImmediately` | `"<url, videoId, or playlistId>"` | YTMDesktop app only |

#### Voicemod (`base: "voicemod"`)

Scalar `value` (voice/sound name) for the lookups; the on/off toggles take no value.

| type | `value` | notes |
| --- | --- | --- |
| `voice` | `"<voice name>"` | load a specific voice |
| `random_voice` / `random_voice_favorite` | — | random voice (favorites only for the latter) |
| `sound` / `soundboard` | `"<sound name>"` | play a meme sound |
| `random_sound` / `random_soundboard` | — | random sound |
| `stop_all_sounds` | — | |
| `on` / `off` / `on_off` | — | voice changer on / off / toggle |
| `hear_my_voice_on` / `hear_my_voice_off` / `hear_my_voice_on_off` | — | |
| `background_on_off` / `mic_on_off` | — | toggle background effects / mute mic |

#### Streamer.bot (`base: "streamerbot"`)

Scalar `value` is the action name; `args` is a flat top-level JSON string.

```js
async function() {
    await actions([{ base: "streamerbot", type: "action", value: "My SB Action", args: '{"user":"{{username}}","amount":5}' }]);
    done();
}
```

#### Protocols — MQTT, WebSocket, Serial, Art-Net, Broadlink

These read their fields **flat** on the action object (no `value` wrapper).

```js
async function() {
    // MQTT: publish to a topic. host is the broker URL — mqtt://<host>:<port>
    await actions([{ base: "mqtt", type: "send", host: "mqtt://192.168.1.50:1883", topic: "home/light", value: "ON" }]);

    // WebSocket: send to one configured connection by its id
    await actions([{ base: "websocket", type: "data", device: "<websocketId>", value: "hello" }]);

    // Serial: write raw data to a port (COM3 on Windows, /dev/tty.* on macOS)
    await actions([{ base: "serial", type: "write", port: "COM3", value: "L1\n" }]);

    // Art-Net: set DMX channels on a universe (channel 1-512, value 0-255). universe is a string
    await actions([{ base: "artnet", type: "artnet", universe: "0", values: [{ channel: 1, value: 255 }, { channel: 2, value: 128 }] }]);

    // Broadlink: send a learned IR/RF code by its library id to a device
    await actions([{ base: "broadlink", type: "ir", device: "<deviceId>", value: "<codeId>" }]);
    done();
}
```

#### Devices — SwitchBot, Wave Link, Camera Hub, StreamFog

All take a `value` object.

| base | type | `value` | notes |
| --- | --- | --- | --- |
| `switchbot` | `turnOn` / `turnOff` / `toggle` | `{ deviceId: "<id>" }` | |
| `wavelink` | `FILTER_SET` | `{ filterId: "<uuid>", isEnabled: true, inputId: "Wave Link Mic In 1" }` | enable/disable an input's filter; `filterId: "ALL_EFFECTS"` targets every effect on that input |
| `wavelink` | `SET_INPUT_VOLUME` | `{ inputId: "<id>", volume: 50, mixerID: "com.elgato.mix.local" }` | volume 0–100; mixer `local`/`stream`/`all` |
| `wavelink` | `MUTE_INPUT` | `{ inputId: "<id>", muted: true, mixerID: "com.elgato.mix.local" }` | |
| `wavelink` | `SET_OUTPUT_VOLUME` / `MUTE_OUTPUT` | `{ volume: 50, mixerID: "com.elgato.mix.local" }` | |
| `wavelink3` | same types as `wavelink` | same shapes | Wave Link 3.0 uses base `wavelink3`; some legacy filter/mic types are unsupported on v3 |
| `camerahub` | `SET_WEBCAM_PROPERTY` | `{ propertyID: "Brightness", propertyValue: 60 }` | all camerahub types share one property-bag `value` (`deviceID, propertyID, propertyValue, intensity, isEnabled, …`) — set only the fields the type uses. Also `SELECT_DEVICE`, `SET_NVIDIA_VIDEO_EFFECT`, `SET_LUT_EFFECT` (`intensity`), `SET_PROMPTER_PROPERTY` |
| `streamfog` | `activateLens` | `{ lensId: "<id or name>", duration: 10 }` | `lensId: "random"` picks one; also `activateOutfit` (`{ outfit, duration }`) and `disableLens` (`{}`) |

#### Plugin actions (`base: "<pluginId>"`)

Every installed plugin is also a valid base — use the plugin's id as the `base`, plus the plugin's own action `type` and a `value` object of that plugin's fields. The exact `type` and `value` come from the plugin's manifest, so the reliable way to discover them is to add the action once in the editor and read it back; the shape is always `{ base: "<pluginId>", type: "<action type>", value: { ...plugin fields } }`. Verified examples:

```js
async function() {
    // Tapo smart plug — target is the device IP, or "IP|deviceId"
    await actions([{ base: "tapo_plugin", type: "tapo_turn_on", value: { target: "192.168.50.169" } }]);

    // Steam — look up a game
    await actions([{ base: "steam", type: "fetch_game", value: { game: "Sonic" } }]);

    // ClickUp — create a task (assigneeId is comma-separated)
    await actions([{ base: "clickup", type: "create_task", value: { name: "{{message}}", assigneeId: "14928785,14928776" } }]);

    // ElevenLabs TTS
    await actions([{ base: "elevenlabs_tts", type: "speak", value: { message: "{{message}}", voiceId: "hpp4J3VqNfWAUOO0d1Us", modelId: "eleven_multilingual_v2", volume: 100 } }]);
    done();
}
```

A plugin action is silently skipped unless its plugin is installed, connected, and enabled.

This documentation can get extremely broad for every integration, so if you get stuck please visit our [**Discord**](https://discord.gg/R8rCaKb) to ask us any questions.
