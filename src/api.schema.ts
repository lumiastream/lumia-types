export type ApiParamType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any';

export interface ApiParamSpec {
	type: ApiParamType;
	required: boolean;
	description: string;
	enum?: readonly string[];
}

export interface ApiCommandSpec {
	type: string;
	title: string;
	execution: 'direct' | 'queue';
	params: Record<string, ApiParamSpec>;
	platforms?: readonly string[];
	responds: 'boolean' | 'value';
	documented: boolean;
	notes?: string;
}

export const API_ENVELOPE_PARAMS: Record<string, ApiParamSpec> = {
	skipQueue: {
		type: 'boolean',
		required: false,
		description: 'Queue-execution types only: bypass the activity queue and run immediately.',
	},
	bypassQueue: {
		type: 'boolean',
		required: false,
		description: 'Alias of skipQueue (skipQueue wins when both are set).',
	},
	hold: {
		type: 'boolean',
		required: false,
		description: 'Queue-execution types only: instead of executing, capture the payload as the new default state (used by SDK buttons held >2s).',
	},
	extraSettings: {
		type: 'object',
		required: false,
		description: 'Free-form key/value bag merged into the queued activity. Used to pass template variables to commands, alert variables/variation overrides to alerts, etc.',
	},
};

export const API_TRANSPORT_NOTES: readonly string[] = [
	"The wire `type` must be the kebab-case LumiaActivityCommandTypes VALUE (e.g. 'chat-command'). Sending an enum KEY (e.g. 'CHAT_COMMAND') is rejected with 'Api has different type'.",
	"`required: true` means the runtime guards the param (request errors without it). Params that are functionally mandatory but unguarded are `required: false` with a note; omitting them silently resolves success while doing nothing.",
	"Every handler resolves HTTP 200 with value `true` unless its case explicitly throws. Failures that happen later (queue execution, platform API rejections, missing permissions) are NOT reflected in the response.",
	'GET-style requests deliver params as a string: it must survive JSON.parse applied twice (double-encoded JSON). extraSettings, skipQueue and bypassQueue are read BEFORE that parse, so they are silently lost for string params; hold is read after and survives.',
	'Numeric params generally tolerate numeric strings (parseInt/JS coercion downstream); boolean params are generally evaluated by JS truthiness, so the string "false" counts as true — EXCEPT the Twitch chat-mode toggles (set-slow-mode/set-subscriber-mode/set-follow-mode/set-emotes-mode), which parse the strings "false", "off", "0" and "" as false.',
	"Platform-gated commands silently resolve `true` for a missing, unknown or unsupported platform (the lone exceptions are pin-message/unpin-message which resolve `false`). The `platforms` array reflects the integration managers actually invoked, not the docs.",
	"`responds: 'value'` types resolve a meaningful value (variable value, points balance); every other type resolves the literal `true`.",
];

export const API_COMMANDS: Record<string, ApiCommandSpec> = {
	'start-lumia': {
		type: 'start-lumia',
		title: 'Start Lumia (lights on)',
		execution: 'direct',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired power state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'start-lumia, stop-lumia and set-lumia share one handler that ignores which of the three types was sent: only params.value and the current power state matter. A provided value is evaluated by JS truthiness (string "false" turns Lumia ON); omitting value toggles.',
	},
	'stop-lumia': {
		type: 'stop-lumia',
		title: 'Stop Lumia (lights off)',
		execution: 'direct',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired power state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Shares the start-lumia handler; the type itself is ignored, so stop-lumia without a value TOGGLES rather than stops. Send value: false to guarantee off.',
	},
	'set-lumia': {
		type: 'set-lumia',
		title: 'Set Lumia power state',
		execution: 'direct',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired power state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Shares the start-lumia handler. Truthiness quirk applies: string "false" counts as ON.',
	},
	'to-default': {
		type: 'to-default',
		title: 'Set lights to default state',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: true,
	},
	'resume-queue': {
		type: 'resume-queue',
		title: 'Resume activity queue',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: true,
	},
	'pause-queue': {
		type: 'pause-queue',
		title: 'Pause activity queue',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: true,
	},
	'clear-queue': {
		type: 'clear-queue',
		title: 'Clear activity queue',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: true,
	},
	'clear-cooldowns': {
		type: 'clear-cooldowns',
		title: 'Clear all command cooldowns',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: true,
		notes: 'Resets every cooldown (global and per-user) via CooldownManager.reset(true).',
	},
	'song-request': {
		type: 'song-request',
		title: 'Control song requests',
		execution: 'direct',
		params: {
			action: {
				type: 'string',
				required: false,
				description: "What to do. Defaults to 'add'; any unrecognized action also falls through to 'add'.",
				enum: ['add', 'skip', 'next', 'play', 'pause', 'playpause', 'remove', 'clear'],
			},
			value: {
				type: 'string',
				required: false,
				description: "Search query or URL for action 'add'. Not guarded: an empty query still attempts an add.",
			},
			username: {
				type: 'string',
				required: false,
				description: "Requester username recorded on the request (action 'add').",
			},
			platform: {
				type: 'string',
				required: false,
				description: "Requester platform recorded on the request (action 'add').",
			},
			songRequestId: {
				type: 'string',
				required: false,
				description: "Id of the request to remove (action 'remove'). Omitted: removes the most recent request.",
			},
			play: {
				type: 'boolean',
				required: false,
				description: "Explicit play state for action 'playpause'. Omitted: toggles.",
			},
		},
		responds: 'boolean',
		documented: false,
		notes: "Requests are added with source STREAMER. 'play'/'pause'/'playpause' drive Spotify playback. In Spotify-native queue mode, remove/clear cannot touch songs already handed to Spotify's own queue.",
	},
	'send-spotify-command': {
		type: 'send-spotify-command',
		title: 'Send Spotify action',
		execution: 'direct',
		params: {
			type: {
				type: 'string',
				required: false,
				description: 'Spotify action type to run. Not guarded: a missing/unknown type silently does nothing.',
				enum: [
					'setPlayState',
					'seek',
					'skipToNext',
					'skipToPrevious',
					'setShuffle',
					'setVolume',
					'setRepeat',
					'shuffleAndPlay',
					'searchAndPlay',
					'searchAndPlayImmediately',
					'searchAndAddToQueue',
					'searchAndAddToPlaylist',
					'searchPublichPlaylistAndPlay',
					'searchPrivatePlaylistAndPlay',
				],
			},
			value: {
				type: 'any',
				required: false,
				description: "Action payload (query, volume, position...). Defaults to ''.",
			},
		},
		responds: 'boolean',
		documented: false,
		notes: "Wraps the Spotify action pipeline (HandleActions base 'spotify'). The enum value 'searchPublichPlaylistAndPlay' (typo included) is the real wire value.",
	},
	'modqueue-decision': {
		type: 'modqueue-decision',
		title: 'Approve/deny mod queue item',
		execution: 'direct',
		params: {
			modQueueId: {
				type: 'string',
				required: false,
				description: 'Id of the pending mod-queue item. Not guarded: a missing/unknown id silently does nothing.',
			},
			approved: {
				type: 'boolean',
				required: false,
				description: "Approve (true) or deny. Accepts boolean true or the string 'true'; anything else counts as deny.",
			},
		},
		responds: 'boolean',
		documented: false,
		notes: 'Not a member of LumiaActivityCommandTypes (string-cast locally in ExternalApiHelper).',
	},
	'toggle-stream-mode': {
		type: 'toggle-stream-mode',
		title: 'Toggle stream mode',
		execution: 'direct',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired stream-mode state. Omitted: toggles.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Provided value is used by JS truthiness (string "false" turns stream mode ON).',
	},
	'set-command-state': {
		type: 'set-command-state',
		title: 'Enable/disable a command',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Command name.',
			},
			value: {
				type: 'boolean',
				required: true,
				description: 'Enabled state. Guarded with isNully, so false is accepted.',
			},
			kind: {
				type: 'string',
				required: false,
				description: 'Which command list the name belongs to. Defaults to chat.',
				enum: ['chat', 'chatbot', 'twitch-points', 'kick-points', 'twitch-extension'],
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Rebuilds the chat command matcher (SetupCommands) after dispatch. On newer Lumia, unknown names 404 (validated per kind) and twitch-points/kick-points also sync the platform reward state while twitch-extension recompiles the extension config; older versions only handled kind chat and silently no-opped unknown names.',
	},
	'create-chatbot-command': {
		type: 'create-chatbot-command',
		title: 'Create a chatbot command',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Command name without the chat prefix; slugified (lowercase, spaces to dashes).',
			},
			message: {
				type: 'string',
				required: true,
				description: 'The chatbot reply text. Supports {{variables}}.',
			},
			description: { type: 'string', required: false, description: 'Internal description.' },
			alias: { type: 'array', required: false, description: 'Alternate trigger names, slugified.' },
			showInCommandsList: { type: 'boolean', required: false, description: 'Show on the public commands page. Defaults to false.' },
			on: { type: 'boolean', required: false, description: 'Enabled state. Defaults to true.' },
			cooldownDuration: { type: 'number', required: false, description: 'Cooldown in milliseconds. Defaults to 5000.' },
		},
		responds: 'value',
		documented: true,
		notes: 'Newer Lumia only. Built from the base chatbot command; 409 already_exists on case-insensitive name collision; chatbot commands are unlimited on all plans. Runs SetupCommands and schedules a state persist.',
	},
	'update-chatbot-command': {
		type: 'update-chatbot-command',
		title: 'Update a chatbot command',
		execution: 'direct',
		params: {
			name: { type: 'string', required: true, description: 'Existing command name (case-insensitive).' },
			message: { type: 'string', required: false, description: 'New reply text.' },
			newName: { type: 'string', required: false, description: 'Rename to this (refused for system commands).' },
			description: { type: 'string', required: false, description: 'New description.' },
			alias: { type: 'array', required: false, description: 'Replacement alias list.' },
			showInCommandsList: { type: 'boolean', required: false, description: 'Public list visibility.' },
			on: { type: 'boolean', required: false, description: 'Enabled state.' },
			cooldownDuration: { type: 'number', required: false, description: 'Cooldown in milliseconds.' },
		},
		responds: 'value',
		documented: true,
		notes: 'Newer Lumia only. Merges onto the existing command; 404 not_found when missing, 409 on rename collision, 403 system_command when renaming system commands.',
	},
	'delete-chatbot-command': {
		type: 'delete-chatbot-command',
		title: 'Delete a chatbot command',
		execution: 'direct',
		params: {
			name: { type: 'string', required: true, description: 'Existing command name (case-insensitive).' },
		},
		responds: 'value',
		documented: true,
		notes: 'Newer Lumia only. 404 not_found when missing; 403 system_command for built-in system commands (the reducer itself has no such guard).',
	},
	'set-folder-state': {
		type: 'set-folder-state',
		title: 'Enable/disable a command folder',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Folder name (folder ids equal their names).',
			},
			value: {
				type: 'boolean',
				required: true,
				description: 'Enabled state. Guarded with isNully, so false is accepted.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Unknown folder silently no-ops. Also reconciles Twitch extension commands and Twitch channel-point rewards contained in the folder.',
	},
	'update-variable-value': {
		type: 'update-variable-value',
		title: 'Update variable value',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Variable name.',
			},
			value: {
				type: 'any',
				required: true,
				description: "New value (string/number/boolean/object). Guarded with isNully, so 0/''/false are accepted.",
			},
		},
		responds: 'boolean',
		documented: true,
		notes: "Creates the variable (non-system) if missing. Counter variables run the value through CalculateCounter ('+N'/'-N'/'=N'/bare number); a counter whose current value is empty increments by 1 regardless of the sent value. Values exceeding the size cap are dropped with a warning toast.",
	},
	'set-counter-value': {
		type: 'set-counter-value',
		title: 'Set counter to absolute value',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Counter variable name.',
			},
			value: {
				type: 'number',
				required: true,
				description: 'Absolute value to set. Guarded with isNully, so 0 is accepted.',
			},
		},
		responds: 'boolean',
		documented: false,
		notes: "Creates the variable and flags it as a counter if needed, then applies '=' + value for an absolute set (bypassing counter add semantics).",
	},
	'get-variable-value': {
		type: 'get-variable-value',
		title: 'Get variable value',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: true,
				description: 'Variable name.',
			},
		},
		responds: 'value',
		documented: true,
		notes: 'Resolves the raw stored value. An unknown variable resolves undefined (not an error).',
	},
	'start-fuze': {
		type: 'start-fuze',
		title: 'Start Fuze',
		execution: 'queue',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired Fuze state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'start-fuze, stop-fuze and toggle-fuze share one handler that ignores the requested type: a provided value (JS truthiness) picks start/stop, an omitted value toggles. Executed via the activity queue.',
	},
	'stop-fuze': {
		type: 'stop-fuze',
		title: 'Stop Fuze',
		execution: 'queue',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired Fuze state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Shares the start-fuze handler; stop-fuze without a value TOGGLES rather than stops. Send value: false to guarantee off.',
	},
	'toggle-fuze': {
		type: 'toggle-fuze',
		title: 'Toggle Fuze',
		execution: 'queue',
		params: {
			value: {
				type: 'boolean',
				required: false,
				description: 'Desired Fuze state. Omitted: toggles the current state.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Shares the start-fuze handler.',
	},
	'fuze-audio-sensitivity': {
		type: 'fuze-audio-sensitivity',
		title: 'Set Fuze audio sensitivity',
		execution: 'queue',
		params: {
			value: {
				type: 'number',
				required: false,
				description: 'Sensitivity value. Not guarded: a missing value queues an activity with undefined sensitivity.',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	chat: {
		type: 'chat',
		title: 'Inject chat message',
		execution: 'queue',
		params: {
			value: {
				type: 'any',
				required: true,
				description: 'Either the message string (site taken from the platform param) or an object { site, message, user?, tiers?, extraSettings?, id?, userId?, avatar?, createdTime?, bridgeHeartbeat? }. Guarded: throws unless both site and message resolve (bridgeHeartbeat exempts facebook).',
			},
			platform: {
				type: 'string',
				required: false,
				description: 'Fallback site when value is a plain string or the object omits site.',
			},
			username: {
				type: 'string',
				required: false,
				description: 'Fallback username when the value object omits user/username.',
			},
		},
		responds: 'boolean',
		documented: false,
		notes: "Simulates an INCOMING chat message run through the full chat pipeline (CheckMessage), so it can trigger chat commands and moderation. The default user is the broadcaster with every tier flag true (mod/sub/follower/member) unless overridden via value.tiers. site 'facebook' bypasses the queue and injects directly into the chatbox (chrome-extension bridge; bridgeHeartbeat only marks the bridge alive). Any connected chat platform key is accepted as site.",
	},
	'chat-command': {
		type: 'chat-command',
		title: 'Trigger chat command',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Command name to trigger. Not guarded: a missing/unknown command fails later inside the queue processor while the API has already resolved success.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'The command name is mirrored into extraSettings.command. Pass template variables (username, message, ...) through extraSettings.',
	},
	'chatbot-command': {
		type: 'chatbot-command',
		title: 'Trigger chatbot command',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Chatbot command name to trigger. Not guarded (see chat-command).',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Same handler as chat-command; extraSettings passes template variables.',
	},
	'twitch-points': {
		type: 'twitch-points',
		title: 'Trigger Twitch channel points command',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Name of the Lumia Twitch points command to trigger. Not guarded (see chat-command).',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Triggers the Lumia command configured for the reward; it does not redeem anything on Twitch itself.',
	},
	'twitch-extension': {
		type: 'twitch-extension',
		title: 'Trigger Twitch extension command',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Name of the Lumia Twitch extension command to trigger. Not guarded (see chat-command).',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'kick-points': {
		type: 'kick-points',
		title: 'Trigger Kick points command',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Name of the Lumia Kick points command to trigger. Not guarded (see chat-command).',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'studio-scene': {
		type: 'studio-scene',
		title: 'Trigger studio scene',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Scene name (matched case-insensitively). Not guarded: an unknown scene errors during queue execution, after the API already resolved success.',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'How long the scene holds before reverting to default, in milliseconds. Omitted: the scene stays (no reset).',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'studio-theme': {
		type: 'studio-theme',
		title: 'Trigger studio theme',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Theme name (matched case-insensitively). Not guarded (see studio-scene).',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'How long the theme holds before reverting to default, in milliseconds. Omitted: stays active.',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'studio-animation': {
		type: 'studio-animation',
		title: 'Trigger studio animation',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Animation name (matched case-insensitively). The params OBJECT itself is guarded (throws when params is missing/not an object), the value key is not.',
			},
			cycles: {
				type: 'number',
				required: false,
				description: 'Requested number of cycles. Currently IGNORED due to a runtime bug (see notes); effectively always 1 cycle.',
			},
		},
		responds: 'boolean',
		documented: true,
		notes: "Runtime bug: cycles is computed as `isTruly(cycles) || 1`, which yields true or 1 — the requested count never reaches the engine, so every request runs 1 effective cycle. Timing is forced to CYCLE with reset. The REST docs advertise a `duration` param for studio-animation that the handler never reads.",
	},
	'chatbot-message': {
		type: 'chatbot-message',
		title: 'Send chatbot message',
		execution: 'direct',
		params: {
			value: {
				type: 'string',
				required: true,
				description: 'Message to send. Template variables ({{...}}) are resolved before sending.',
			},
			platform: {
				type: 'string',
				required: false,
				description: "Target platform. Omitted (or 'lumiastream'/'lumia'): broadcasts to every connected chatbot client, including plugin chatbots.",
			},
			userToChatAs: {
				type: 'string',
				required: false,
				description: "Which account sends the message (e.g. 'bot' or 'self').",
			},
			replyParentMessageId: {
				type: 'string',
				required: false,
				description: 'Message id to reply to (threaded reply, Twitch). Forwarded as extraSettings.messageId.',
			},
		},
		platforms: ['twitch', 'youtube', 'kick', 'facebook', 'discord'],
		responds: 'boolean',
		documented: true,
		notes: 'Requires the chatbot connection to be on; otherwise it silently no-ops. A site without a native client is routed to a connected plugin chatbot when available. The REST docs list only twitch/youtube/facebook — stale versus the runtime.',
	},
	tts: {
		type: 'tts',
		title: 'Text to speech',
		execution: 'direct',
		params: {
			value: {
				type: 'string',
				required: true,
				description: 'Text to speak.',
			},
			voice: {
				type: 'string',
				required: false,
				description: 'Voice name. Omitted: the default voice.',
			},
			volume: {
				type: 'number',
				required: false,
				description: 'Volume 0-100 (parseInt applied). Defaults to 100.',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'hex-color': {
		type: 'hex-color',
		title: 'Send hex color to lights',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: false,
				description: "Hex color (e.g. '#0000ff'). The params OBJECT itself is guarded, the value key is not.",
			},
			brightness: {
				type: 'number',
				required: false,
				description: 'Brightness 0-100.',
			},
			transition: {
				type: 'number',
				required: false,
				description: 'Fade/transition time in milliseconds.',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'How long the color holds before reverting to default, in milliseconds.',
			},
			lights: {
				type: 'array',
				required: false,
				description: "Target lights: [{ type: '<integration key, e.g. hue>', value: '<light id>' }]. The id may also be sent under an `id` key. Omitted: all default lights.",
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Entries in lights missing a type are dropped; an empty/omitted array targets the default lights (mapper returns null).',
	},
	'rgb-color': {
		type: 'rgb-color',
		title: 'Send RGB color to lights',
		execution: 'queue',
		params: {
			value: {
				type: 'array',
				required: false,
				description: 'RGB triple [r, g, b], each 0-255. The params OBJECT itself is guarded, the value key is not.',
			},
			brightness: {
				type: 'number',
				required: false,
				description: 'Brightness 0-100.',
			},
			transition: {
				type: 'number',
				required: false,
				description: 'Fade/transition time in milliseconds.',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'How long the color holds before reverting to default, in milliseconds.',
			},
			lights: {
				type: 'array',
				required: false,
				description: 'Target lights; same shape as hex-color.',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	alert: {
		type: 'alert',
		title: 'Trigger alert',
		execution: 'queue',
		params: {
			value: {
				type: 'string',
				required: true,
				description: "Alert key, e.g. 'twitch-follower' (LumiaAlertValues).",
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'Use extraSettings to supply alert variables (username, amount, message, ...) and to force a specific variation.',
	},
	'overlay-set-visibility': {
		type: 'overlay-set-visibility',
		title: 'Set overlay visibility',
		execution: 'direct',
		params: {
			layer: {
				type: 'string',
				required: false,
				description: 'The OVERLAY to target (overlay name or uuid), despite the param being called layer. Not guarded.',
			},
			value: {
				type: 'boolean',
				required: false,
				description: 'Visible state (coerced with !!, so a missing value hides).',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'overlay-set-layer-visibility': {
		type: 'overlay-set-layer-visibility',
		title: 'Set overlay layer visibility',
		execution: 'direct',
		params: {
			layer: {
				type: 'string',
				required: false,
				description: 'Layer id (from the layer settings sidebar). Not guarded.',
			},
			value: {
				type: 'boolean',
				required: false,
				description: 'Visible state (coerced with !!).',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'overlay-set-layer-position': {
		type: 'overlay-set-layer-position',
		title: 'Set overlay layer position',
		execution: 'direct',
		params: {
			layer: {
				type: 'string',
				required: false,
				description: 'Layer id. Not guarded.',
			},
			x: {
				type: 'number',
				required: false,
				description: 'X position (number or numeric string).',
			},
			y: {
				type: 'number',
				required: false,
				description: 'Y position (number or numeric string).',
			},
			transitionTime: {
				type: 'number',
				required: false,
				description: 'Transition duration in milliseconds.',
			},
			transitionInterpolation: {
				type: 'string',
				required: false,
				description: 'Transition easing.',
				enum: ['none', 'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier'],
			},
			transitionCubicBezier: {
				type: 'string',
				required: false,
				description: "Cubic-bezier control points when transitionInterpolation is 'cubic-bezier'.",
			},
		},
		responds: 'boolean',
		documented: true,
		notes: 'x/y are template-interpolated into "x,y"; omitting either produces the literal string "undefined" in the payload.',
	},
	'overlay-set-layer-size': {
		type: 'overlay-set-layer-size',
		title: 'Set overlay layer size',
		execution: 'direct',
		params: {
			layer: {
				type: 'string',
				required: false,
				description: 'Layer id. Not guarded.',
			},
			width: {
				type: 'number',
				required: false,
				description: 'Width (number or numeric string). Omitted: empty string is sent (keeps the current width).',
			},
			height: {
				type: 'number',
				required: false,
				description: 'Height (number or numeric string). Omitted: empty string is sent (keeps the current height).',
			},
			transitionTime: {
				type: 'number',
				required: false,
				description: 'Transition duration in milliseconds.',
			},
			transitionInterpolation: {
				type: 'string',
				required: false,
				description: 'Transition easing.',
				enum: ['none', 'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier'],
			},
			transitionCubicBezier: {
				type: 'string',
				required: false,
				description: "Cubic-bezier control points when transitionInterpolation is 'cubic-bezier'.",
			},
		},
		responds: 'boolean',
		documented: false,
		notes: 'Unlike position, missing dimensions default to empty strings rather than "undefined". Absent from the REST docs (control-overlays.md covers visibility/position/content only).',
	},
	'overlay-set-content': {
		type: 'overlay-set-content',
		title: 'Set overlay layer content',
		execution: 'direct',
		params: {
			layer: {
				type: 'string',
				required: false,
				description: 'Layer id. Not guarded.',
			},
			content: {
				type: 'string',
				required: false,
				description: 'New text content for the layer.',
			},
		},
		responds: 'boolean',
		documented: true,
	},
	'hud-toggle': {
		type: 'hud-toggle',
		title: 'Toggle HUD',
		execution: 'direct',
		params: {},
		responds: 'boolean',
		documented: false,
	},
	'hud-volume-set': {
		type: 'hud-volume-set',
		title: 'Set HUD volume',
		execution: 'direct',
		params: {
			value: {
				type: 'number',
				required: false,
				description: 'Volume level. Not guarded.',
			},
		},
		responds: 'boolean',
		documented: false,
	},
	'hud-opacity-set': {
		type: 'hud-opacity-set',
		title: 'Set HUD opacity',
		execution: 'direct',
		params: {
			value: {
				type: 'number',
				required: false,
				description: 'Opacity level. Not guarded.',
			},
		},
		responds: 'boolean',
		documented: false,
		notes: 'Internally the opacity value travels under the `volume` key of the overlay action payload.',
	},
	'hud-overlay-change': {
		type: 'hud-overlay-change',
		title: 'Change HUD overlay',
		execution: 'direct',
		params: {
			value: {
				type: 'string',
				required: false,
				description: 'Overlay name or id to display in the HUD. Not guarded.',
			},
		},
		responds: 'boolean',
		documented: false,
	},
	'change-stream-title': {
		type: 'change-stream-title',
		title: 'Change stream title',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded: missing/other platforms silently resolve true.',
				enum: ['twitch', 'youtube', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'New stream title. Template variables are resolved (extraSettings supplies values).',
			},
		},
		platforms: ['twitch', 'youtube', 'kick'],
		responds: 'boolean',
		documented: false,
		notes: 'On YouTube the value updates the live broadcast title (the description is left untouched).',
	},
	'change-current-category': {
		type: 'change-current-category',
		title: 'Change stream category/game',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded.',
				enum: ['twitch', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Category/game name (searched on the platform).',
			},
		},
		platforms: ['twitch', 'kick'],
		responds: 'boolean',
		documented: false,
		notes: 'YouTube is NOT supported (silently resolves true).',
	},
	'create-stream-marker': {
		type: 'create-stream-marker',
		title: 'Create stream marker',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Marker description.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires channel:manage:broadcast; Twitch rejects markers while the channel is offline (failure invisible to the caller).',
	},
	'run-commercial': {
		type: 'run-commercial',
		title: 'Run commercial',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Commercial length in seconds (Twitch accepts 30–180). Falls back to params.value when omitted.',
			},
			value: {
				type: 'number',
				required: false,
				description: 'Fallback for duration (used only when params.duration is absent).',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Functionally requires a duration (params.duration or params.value): without one Helix rejects the request for a missing length while the API still resolves true. Requires channel:edit:commercial.',
	},
	'set-slow-mode': {
		type: 'set-slow-mode',
		title: 'Set slow mode',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'boolean',
				required: false,
				description: "Enable/disable slow mode. Strings 'false', 'off' and '0' count as false; omitted counts as false (disables).",
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Wait time between messages in seconds (Twitch accepts 3–120). Defaults to 30 in the manager.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_settings. extraSettings is used solely for variable resolution, not settings.',
	},
	'set-subscriber-mode': {
		type: 'set-subscriber-mode',
		title: 'Set subscriber-only mode',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'boolean',
				required: false,
				description: "Enable/disable subscriber-only mode. Strings 'false', 'off' and '0' count as false; omitted counts as false (disables).",
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_settings.',
	},
	'set-follow-mode': {
		type: 'set-follow-mode',
		title: 'Set follower-only mode',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'boolean',
				required: false,
				description: "Enable/disable follower-only mode. Strings 'false', 'off' and '0' count as false; omitted counts as false (disables).",
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Minimum follow age in MINUTES (Twitch accepts 0–129600). Omitted: Twitch defaults to 0 (any follower).',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_settings.',
	},
	'set-emotes-mode': {
		type: 'set-emotes-mode',
		title: 'Set emote-only mode',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'boolean',
				required: false,
				description: "Enable/disable emote-only mode. Strings 'false', 'off' and '0' count as false; omitted counts as false (disables).",
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_settings.',
	},
	'send-announcement': {
		type: 'send-announcement',
		title: 'Send chat announcement',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Announcement text (template variables resolved).',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: "Announcement color is read from the manager's value.color, which the API layer never sets — always defaults to 'primary'. Requires moderator:manage:announcements.",
	},
	clip: {
		type: 'clip',
		title: 'Create clip',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Forwarded as message but IGNORED by the clip handler.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Creates a clip with default settings; the manager supports title/duration but the API layer never plumbs them. The resulting id/url/thumbnail are stored in the twitch_last_clip_id / twitch_last_clip_url / twitch_last_clip_thumbnail_url variables — the response itself carries nothing. Requires clips:edit.',
	},
	'create-poll': {
		type: 'create-poll',
		title: 'Create Twitch poll',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			name: {
				type: 'string',
				required: false,
				description: 'Poll title.',
			},
			value: {
				type: 'string',
				required: false,
				description: 'Comma-separated choice titles (NOT trimmed — spaces after commas are kept).',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Poll duration in seconds (Twitch accepts 15–1800). Functionally mandatory: Helix rejects the poll without it.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'When creation succeeds the poll id is stored in the twitch_current_poll_id variable. Requires channel:manage:polls.',
	},
	'end-poll': {
		type: 'end-poll',
		title: 'End Twitch poll',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			name: {
				type: 'string',
				required: false,
				description: "Poll status: 'ARCHIVED' (default) or 'TERMINATED'.",
				enum: ['ARCHIVED', 'TERMINATED'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Forwarded as message but IGNORED by the end-poll handler.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Ends the poll whose id is stored in the twitch_current_poll_id variable (i.e. the last poll created through Lumia). Requires channel:manage:polls.',
	},
	'create-prediction': {
		type: 'create-prediction',
		title: 'Create Twitch prediction',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			name: {
				type: 'string',
				required: false,
				description: 'Prediction title.',
			},
			value: {
				type: 'string',
				required: false,
				description: 'Comma-separated outcome titles (trimmed).',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Prediction window in seconds (Twitch accepts 30–1800). Functionally mandatory: Helix rejects the prediction without it.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'On success the id and outcomes are cached (twitch_current_prediction_id) for end-prediction matching. Requires channel:manage:predictions.',
	},
	'end-prediction': {
		type: 'end-prediction',
		title: 'End Twitch prediction',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			name: {
				type: 'string',
				required: false,
				description: "Prediction status: 'RESOLVED' (default) or 'CANCELED'.",
				enum: ['RESOLVED', 'CANCELED'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Winning outcome TITLE, matched case-insensitively against the outcomes cached at creation time. Required when resolving; ignored when canceling.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Ends the prediction stored in twitch_current_prediction_id. A non-matching outcome title aborts in the manager (toast) while the API resolves true; RESOLVED without a winning outcome id is rejected by Helix. Requires channel:manage:predictions.',
	},
	'clear-chat': {
		type: 'clear-chat',
		title: 'Clear chat',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Forwarded as message but IGNORED by the clear-chat handler.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Deletes all chat messages via Helix. Requires chat:edit.',
	},
	'add-loyalty-points': {
		type: 'add-loyalty-points',
		title: 'Add loyalty points',
		execution: 'direct',
		params: {
			username: {
				type: 'string',
				required: true,
				description: 'Viewer username.',
			},
			platform: {
				type: 'string',
				required: true,
				description: 'Platform namespace the username belongs to (any chat platform key).',
			},
			value: {
				type: 'number',
				required: true,
				description: 'Points to add. Negative values subtract. Guarded with a falsy check, so 0 is REJECTED.',
			},
		},
		responds: 'value',
		documented: true,
		notes: "Recorded as a 'manual' points event. Resolves the user's new points balance (0 when the user cannot be loaded).",
	},
	'get-loyalty-points': {
		type: 'get-loyalty-points',
		title: 'Get loyalty points',
		execution: 'direct',
		params: {
			username: {
				type: 'string',
				required: true,
				description: 'Viewer username.',
			},
			platform: {
				type: 'string',
				required: true,
				description: 'Platform namespace the username belongs to.',
			},
		},
		responds: 'value',
		documented: false,
		notes: 'Resolves the points balance; unknown users resolve 0.',
	},
	'delete-message': {
		type: 'delete-message',
		title: 'Delete chat message',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Platform the message lives on. Not guarded: unknown/missing platform silently resolves true.',
				enum: ['twitch', 'youtube', 'kick', 'facebook', 'tiktok', 'discord'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Message id to delete.',
			},
		},
		platforms: ['twitch', 'youtube', 'kick', 'facebook', 'tiktok', 'discord'],
		responds: 'boolean',
		documented: true,
		notes: "Only twitch and youtube delete the message on the platform; kick, facebook, tiktok and discord merely remove it from Lumia's local chatbox log.",
	},
	'pin-message': {
		type: 'pin-message',
		title: 'Pin chat message',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: "Must be 'twitch'. Any other platform makes the request resolve the value false (still HTTP 200) — the only commands that do this.",
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Twitch message id to pin. Missing id warns in-app and no-ops while the API resolves true.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_messages. Uses a locally cast activity type (present in current LumiaActivityCommandTypes as PIN_MESSAGE).',
	},
	'unpin-message': {
		type: 'unpin-message',
		title: 'Unpin chat message',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: "Must be 'twitch'. Any other platform resolves the value false (still HTTP 200).",
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Twitch message id to unpin. Omitted: looks up the currently pinned message and unpins it.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires moderator:manage:chat_messages.',
	},
	'translate-message': {
		type: 'translate-message',
		title: 'Translate chat message',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Platform whose chatbot posts the translation. Not guarded.',
				enum: ['twitch', 'youtube', 'kick', 'facebook', 'tiktok', 'discord'],
			},
			username: {
				type: 'string',
				required: false,
				description: 'Author credited in the translated output.',
			},
			value: {
				type: 'string',
				required: false,
				description: 'Message text to translate.',
			},
			userToChatAs: {
				type: 'string',
				required: false,
				description: "Account that posts the translation (defaults to 'bot').",
			},
			language: {
				type: 'string',
				required: false,
				description: "Target language code. Defaults to the app language (fallback 'en').",
			},
		},
		platforms: ['twitch', 'youtube', 'kick', 'facebook', 'tiktok', 'discord'],
		responds: 'boolean',
		documented: true,
		notes: 'The translation is posted to chat as "Translation from @username: ..." via the chatbot; nothing is returned in the API response.',
	},
	shoutout: {
		type: 'shoutout',
		title: 'Shoutout user',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded: unsupported platforms silently resolve true.',
				enum: ['twitch', 'youtube', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to shout out (forwarded as both message and username).',
			},
			userToChatAs: {
				type: 'string',
				required: false,
				description: "Account that posts the shoutout (defaults to 'bot').",
			},
		},
		platforms: ['twitch', 'youtube', 'kick'],
		responds: 'boolean',
		documented: true,
		notes: 'Runs the configured shoutout system command (clip retrieval, chat template, optional native Twitch shoutout). Fails with an in-app warning when no shoutout command exists.',
	},
	'add-moderator': {
		type: 'add-moderator',
		title: 'Add moderator',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to mod.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Fire-and-forget: the call is NOT awaited (unlike remove-moderator), so even the platform round-trip has not started when the API resolves. Requires channel:manage:moderators.',
	},
	'remove-moderator': {
		type: 'remove-moderator',
		title: 'Remove moderator',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to unmod.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: false,
		notes: 'Requires channel:manage:moderators.',
	},
	'add-vip': {
		type: 'add-vip',
		title: 'Add VIP',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true (the docs imply broader support).',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to VIP.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: true,
		notes: 'Fire-and-forget: NOT awaited (unlike remove-vip). Requires channel:manage:vips.',
	},
	'remove-vip': {
		type: 'remove-vip',
		title: 'Remove VIP',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Must be twitch; anything else silently resolves true.',
				enum: ['twitch'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to remove VIP from.',
			},
		},
		platforms: ['twitch'],
		responds: 'boolean',
		documented: true,
		notes: 'Requires channel:manage:vips.',
	},
	'ban-user': {
		type: 'ban-user',
		title: 'Ban user',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded: unsupported platforms silently resolve true.',
				enum: ['twitch', 'youtube', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to ban.',
			},
			cleanupOnBan: {
				type: 'boolean',
				required: false,
				description: "Also clean up the user's recent messages. Accepts boolean true or the string 'true'; everything else is false.",
			},
		},
		platforms: ['twitch', 'youtube', 'kick'],
		responds: 'boolean',
		documented: true,
		notes: 'No ban reason can be passed from the API layer (the managers accept one, but it is not plumbed). Twitch/Kick require moderation scopes; failures are invisible to the caller.',
	},
	'unban-user': {
		type: 'unban-user',
		title: 'Unban user',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded.',
				enum: ['twitch', 'youtube', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to unban.',
			},
		},
		platforms: ['twitch', 'youtube', 'kick'],
		responds: 'boolean',
		documented: true,
	},
	'timeout-user': {
		type: 'timeout-user',
		title: 'Timeout user',
		execution: 'direct',
		params: {
			platform: {
				type: 'string',
				required: false,
				description: 'Target platform. Not guarded.',
				enum: ['twitch', 'youtube', 'kick'],
			},
			value: {
				type: 'string',
				required: false,
				description: 'Username to time out.',
			},
			duration: {
				type: 'number',
				required: false,
				description: 'Timeout length. UNIT MISMATCH: the REST docs say minutes, but the value is passed raw — Twitch and YouTube interpret it as SECONDS; only Kick treats it as minutes.',
			},
			name: {
				type: 'string',
				required: false,
				description: "Timeout reason (yes, it travels in the `name` param). Defaults to 'Time out'.",
			},
		},
		platforms: ['twitch', 'youtube', 'kick'],
		responds: 'boolean',
		documented: true,
		notes: "Dead default: duration is computed as `parseInt(duration) ?? 10` — parseInt yields NaN (never null) for a missing value, so the 10 fallback is unreachable and NaN is sent to the platform. Always pass duration explicitly.",
	},
	'overlay-screenshot': {
		type: 'overlay-screenshot',
		title: 'Capture overlay screenshot',
		execution: 'direct',
		params: {
			name: {
				type: 'string',
				required: false,
				description: 'Overlay name or uuid (also accepts overlay:layer quick-find syntax). Missing name warns in-app and no-ops while the API resolves true.',
			},
		},
		responds: 'boolean',
		documented: false,
		notes: 'Waits up to 6s for a connected overlay (OBS/HUD, visible) to answer. The PNG is saved to disk and the path is stored in the last_overlay_screenshot_path variable — the API response is always true and never carries the path. Format is fixed to png/original from this entry point.',
	},
	'overlay-screenshot-response': {
		type: 'overlay-screenshot-response',
		title: 'Overlay screenshot response (internal)',
		execution: 'direct',
		params: {
			requestId: {
				type: 'string',
				required: false,
				description: 'Id of the pending screenshot request (eventId also accepted).',
			},
			filePath: {
				type: 'string',
				required: false,
				description: 'Saved screenshot path; also written to the last_overlay_screenshot_path variable.',
			},
			error: {
				type: 'string',
				required: false,
				description: 'Error message that rejects the pending request.',
			},
		},
		responds: 'boolean',
		documented: false,
		notes: 'Internal reply channel used by overlay clients to fulfil overlay-screenshot. Not intended for external callers; unknown/missing requestId silently no-ops.',
	},
};
