# Lumia Stream Custom Overlay – Assistant Training Kit

---

## 1. API Cheat‑Sheet (one line per member)

### `window.Overlay` interface

| Signature                                                                                                               | Purpose                                                               |     |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --- |
| `on(event: 'chat'\|'alert'\|'hfx'\|'virtuallight'\|'overlaycontent', handler: (ev: CustomEvent<OverlayEvent>) => void)` | Subscribe to real‑time overlay events.                                |     |
| `callCommand(command: string, extraSettings?: Record<string,string \| number>): void`                                   | Trigger a Lumia Stream command, optionally passing local variables.   |     |
| `chatbot({ message, platform?, chatAsSelf? }): Promise<void>`                                                           | Send a chat message as the bot or streamer on the chosen platform(s). |     |
| `addLoyaltyPoints({ value, username, platform }): Promise<number>`                                                      | Add or subtract loyalty points for a user and get the new balance.    |     |
| `getLoyaltyPoints({ username, platform }): Promise<number>`                                                             | Retrieve a user's current loyalty‑points total.                       |     |
| `setVariable(name: string, value: unknown): void`                                                                       | Create or update a global Lumia variable.                             |     |
| `getVariable(name: string): unknown`                                                                                    | Read a global Lumia variable (**must be a string literal key**).      |     |
| `saveStorage(key: string, value: string): void`                                                                         | Persist data scoped to this overlay’s `codeId`.                       |     |
| `getStorage(key: string): string`                                                                                       | Load a value previously saved with `saveStorage`.                     |     |
| `removeStorage(key: string): void`                                                                                      | Delete a saved storage item.                                          |     |

**Global helpers**

`toast(message: string, type?: 'info'\|'success'\|'warning'\|'error')` • `log(...args)` (alias of `console.log`)

### Overlay events & payload helpers

```js
type OverlayListener = 'chat' | 'alert' | 'hfx' | 'virtuallight' | 'overlaycontent';
interface ChatEvent {
	username: string;
	message: string /* … */;
}
interface AlertEvent {
	alert: LumiaAlertValues;
	dynamic: { value: number | string } /* … */;
}
// hfx, virtuallight, overlaycontent follow similar shapes – see typings for full details.
```

## 2. Generic Alert Helpers

```js
interface BaseAlert<A extends string,D,E> {
  alert: A;            // discriminant
  dynamic: D;          // event‑specific mutable numbers/strings
  extraSettings: E & Timing & { site:string; timestamp:string };
  fromLumia: true;
}

// Convenience helpers:
//   type AlertDynamic<'twitch-subscriber'> = { … }
//   type AlertExtra<'twitch-subscriber'>  = { … }
```

Include these two helper aliases in your embeddings so the model can quickly map `alert` → concrete `dynamic` / `extraSettings`.

## 3. JSON Schema – Configs Tab

```json
{
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	"title": "Custom Overlay Configs",
	"type": "object",
	"patternProperties": {
		"^[a-zA-Z0-9_-]+$": {
			"type": "object",
			"required": ["type", "label"],
			"properties": {
				"type": {
					"enum": ["input", "number", "checkbox", "dropdown", "multiselect", "colorpicker", "fontpicker", "slider"]
				},
				"label": { "type": "string" },
				"value": {},
				"options": {
					"type": ["object", "array"],
					"nullable": true,
					"properties": {
						"step": { "type": ["number", "integer"] },
						"min": { "type": ["number", "integer"] },
						"max": { "type": ["number", "integer"] },
						"prefix": { "type": "string" },
						"suffix": { "type": "string" }
					},
					"additionalProperties": true
				},
				"order": { "type": "integer" },
				"placeholder": { "type": "string" },
				"enableVariables": { "type": "boolean" },
				"allowedVariables": { "type": "array", "items": { "type": "string" } },
				"min": { "type": "number" },
				"max": { "type": "number" },
				"visibleIf": {
					"type": "object",
					"required": ["key", "equals"],
					"properties": {
						"key": { "type": "string" },
						"equals": {}
					}
				},
				"hidden": { "type": "boolean" }
			},
			"additionalProperties": false
		}
	},
	"additionalProperties": false
}
```

## 4. Config Examples

### Variable‑enabled text input

```json
{
	"title": {
		"type": "input",
		"label": "Title",
		"enableVariables": true,
		"allowedVariables": ["username", "message"],
		"placeholder": "Enter title or insert variables"
	}
}
```

### Slider

```json
{
	"fontSize": {
		"type": "slider",
		"label": "Font Size:",
		"options": { "step": 10, "min": 0, "max": 200, "prefix": "", "suffix": "px" },
		"value": 40
	}
}
```

## 5. Behavioural Examples

### Variable‑enabled Config Input

```json
{
  "title": {
    "type": "input",
    "label": "Title",
    "enableVariables": true,
    "allowedVariables": ["username", "message"],
    "placeholder": "Enter title or insert variables"
  }
}
```

### Positive – Chat listener

```js
Overlay.on('chat', (ev) => {
	const { username, message } = ev.detail;
	toast(`${username}: ${message}`);
});
```

### Negative → Fixed – Static variable keys

```js
// ❌ Wrong – variable key is not a string literal; model cannot statically extract it
const key = 'score';
Overlay.getVariable(key);

// ✅ Correct
Overlay.getVariable('score');
```

### Positive – Chatbot helper

```js
Overlay.chatbot({ message: 'My message' });
```

### Negative → Fixed – Chatbot call signature

```js
// ❌ Wrong – chatbot takes an object
Overlay.chatbot('This message');

// ✅ Correct
Overlay.chatbot({ message: 'This message' });
```

### Positive – Alert listener using `data.alert`

```js
Overlay.on('alert', (data) => {
	const alert = data.alert;
	const message = data.extraSettings?.message || '';

	/* Bits */
	if (alert === 'twitch-bits' && cfg.allowBits) {
		const bits = data.dynamic.value ?? 0;
		if (bits >= (cfg.minBits ?? 1)) {
			processCommands(message);
		}
		return;
	}

	/* Twitch Channel Points */
	if (alert === 'twitch-points' && cfg.allowTwitchPoints) {
		const trig = cfg.twitchPointsCommand?.toLowerCase() || '';
		const content = message.toLowerCase();
		if (!trig || trig === data.extraSettings.command) processCommands(content);
		return;
	}

	/* Kick Points */
	if (alert === 'kick-points' && cfg.allowKickPoints) {
		const trig = cfg.kickPointsCommand?.toLowerCase() || '';
		const content = message.toLowerCase();
		if (!trig || trig === data.extraSettings.command) processCommands(content);
		return;
	}
});
```

### Negative → Fixed – Using `type` and `platform` (avoid)

```js
// ❌ Wrong – 'type' and 'platform' are not reliable for differentiating alerts
Overlay.on('alert', (a) => {
	const type = (a.type || '').toLowerCase();
	const plat = (a.platform || '').toLowerCase();

	/* Bits */
	if (cfg.allowBits && (type === 'bits' || type === 'cheer')) {
		const bits = a.value ?? a.amount ?? a.bits ?? 0;
		if (bits >= (cfg.minBits ?? 1)) {
			processCommands(a.message || a.meta?.message || '');
		}
		return;
	}

	/* Twitch Channel Points */
	if (cfg.allowTwitchPoints && type === 'points' && plat === 'twitch') {
		const trig = cfg.twitchPointsCommand?.toLowerCase() || '';
		const content = (a.message || a.meta?.message || '').toLowerCase();
		if (!trig || content.includes(trig)) processCommands(content);
		return;
	}

	/* Kick Points */
	if (cfg.allowKickPoints && type === 'points' && plat === 'kick') {
		const trig = cfg.kickPointsCommand?.toLowerCase() || '';
		const content = (a.message || a.meta?.message || '').toLowerCase();
		if (!trig || content.includes(trig)) processCommands(content);
	}
});
```

### Positive – User‑level check

```js
// ✅ Correct – concise moderator/self check
const isModOrBroad = evt.userLevels?.mod || evt.userLevels?.isSelf;
```

### Negative → Fixed – Verbose user‑level check

```js
// ❌ Wrong – unnecessary extra properties that aren't present on all platforms
const isModOrBroad = evt.userLevels?.mod || evt.userLevels?.broadcaster || evt.userLevels?.owner;
```
