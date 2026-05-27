// -----------------------------------------------------------------------------
//  Lumia Stream - Custom Overlay typings
// -----------------------------------------------------------------------------

/**
 * Available tabs in the custom overlay editor interface
 */
export enum CustomTabs {
	/** HTML content tab */
	HTML = 'html',
	/** JavaScript code tab */
	JS = 'js',
	/** CSS styling tab */
	CSS = 'css',
	/** Configuration settings tab */
	CONFIGS = 'configs',
	/** Data storage tab */
	DATA = 'data',
}

/**
 * Field types available for the overlay configuration tab.
 * These determine the UI controls shown for each config option.
 */
export enum ConfigsFieldType {
	/** Text input field */
	INPUT = 'input',
	/** Multi-line text area for long-form content. */
	TEXTAREA = 'textarea',
	/** Numeric input field */
	NUMBER = 'number',
	/** Boolean checkbox */
	CHECKBOX = 'checkbox',
	/** Single-select dropdown menu */
	DROPDOWN = 'dropdown',
	/** Multi-select dropdown menu */
	MULTISELECT = 'multiselect',
	/** Color picker widget */
	COLORPICKER = 'colorpicker',
	/** Font selection widget */
	FONTPICKER = 'fontpicker',
	/** Number Slider widget */
	SLIDER = 'slider',
	/** Image upload picker. Value is the uploaded asset URL. */
	IMAGEUPLOAD = 'imageupload',
	/** Audio upload picker. Value is the uploaded asset URL. */
	SOUNDUPLOAD = 'soundupload',
	/** Video upload picker. Value is the uploaded asset URL. */
	VIDEOUPLOAD = 'videoupload',
	/** Action trigger button. No persisted value; renders a clickable
	 *  control that custom JS can bind to via `Overlay.on('configAction', …)`. */
	ACTIONBUTTON = 'actionbutton',
}

/**
 * Conditional render rule for a config field.
 * The field is shown only when `Overlay.data[key]` strictly equals one of `equals`
 * (scalar) or intersects with `equals` (when either side is an array).
 *
 * @example
 * { key: 'mode', equals: 'advanced' }
 * { key: 'platform', equals: ['twitch', 'kick'] }
 */
export interface ConfigVisibleIf {
	/** Key of another config field to read from `Overlay.data`. */
	key: string;
	/** Value (or list of values) that triggers visibility. */
	equals: string | number | boolean | Array<string | number | boolean>;
}

/** Properties common to every config field, regardless of `type`. */
export interface BaseConfigField {
	/** Human-readable name shown next to the control in the Configs sidebar. */
	label: string;
	/**
	 * Display order priority. Lower numbers appear first.
	 * Fields without `order` render after ordered fields, sorted alphabetically by key.
	 */
	order?: number;
	/**
	 * Conditional render rule. When set, the field renders only when
	 * `Overlay.data[visibleIf.key]` matches `visibleIf.equals`.
	 */
	visibleIf?: ConfigVisibleIf;
	/**
	 * Hard-hide rule. When `true`, the field is never displayed in the Configs
	 * sidebar, but its `value` still flows into `Overlay.data` for internal use.
	 * Useful for locking event subscriptions or advanced settings.
	 */
	hidden?: boolean;
}

/** Single-line text input. Supports Lumia variable insertion. */
export interface InputConfigField extends BaseConfigField {
	type: ConfigsFieldType.INPUT | 'input';
	/** Default text value. Omit to leave blank on first load. */
	value?: string;
	/** Placeholder text shown when the input is empty. */
	placeholder?: string;
	/**
	 * When `true`, renders a variable-enabled input. Users can insert Lumia
	 * variables (e.g. `{{username}}`) via a picker triggered by a `{}` adornment.
	 */
	enableVariables?: boolean;
	/**
	 * Curated variable list to surface at the top of the picker.
	 * System/function variables remain available below. Has no effect unless
	 * `enableVariables` is also `true`.
	 */
	allowedVariables?: string[];
}

/** Numeric input spinner. */
export interface NumberConfigField extends BaseConfigField {
	type: ConfigsFieldType.NUMBER | 'number';
	/** Default numeric value. */
	value?: number;
}

/** Checkbox toggle. */
export interface CheckboxConfigField extends BaseConfigField {
	type: ConfigsFieldType.CHECKBOX | 'checkbox';
	/** Default checked state. */
	value?: boolean;
}

/** Single-select dropdown menu. */
export interface DropdownConfigField extends BaseConfigField {
	type: ConfigsFieldType.DROPDOWN | 'dropdown';
	/** Default selected option key. */
	value?: string;
	/** Map of option keys to display labels. */
	options: Record<string, string>;
}

/** Multi-select dropdown. */
export interface MultiselectConfigField extends BaseConfigField {
	type: ConfigsFieldType.MULTISELECT | 'multiselect';
	/** Default selected option keys. */
	value?: string[];
	/** Map of option keys to display labels. */
	options: Record<string, string>;
}

/** Color picker widget. Value is a hex/rgba string. */
export interface ColorpickerConfigField extends BaseConfigField {
	type: ConfigsFieldType.COLORPICKER | 'colorpicker';
	/** Default color (hex like `#ff4076` or rgba). */
	value?: string;
}

/** Font picker that loads Google fonts on demand. Value is the font family name. */
export interface FontpickerConfigField extends BaseConfigField {
	type: ConfigsFieldType.FONTPICKER | 'fontpicker';
	/** Default font family name (e.g. `Roboto`). */
	value?: string;
}

/** Slider numeric-range options. */
export interface SliderOptions {
	/** Minimum value. */
	min?: number;
	/** Maximum value. */
	max?: number;
	/** Step increment between values. */
	step?: number;
	/** String prefixed to the displayed value (e.g. `$`). */
	prefix?: string;
	/** String suffixed to the displayed value (e.g. `px`). */
	suffix?: string;
}

/** Number slider with min/max/step and optional value adornments. */
export interface SliderConfigField extends BaseConfigField {
	type: ConfigsFieldType.SLIDER | 'slider';
	/** Default numeric value. */
	value?: number;
	/** Range and adornment options. */
	options: SliderOptions;
}

/** Multi-line textarea for long-form text input. Supports variables. */
export interface TextareaConfigField extends BaseConfigField {
	type: ConfigsFieldType.TEXTAREA | 'textarea';
	/** Default text value. Omit to leave blank on first load. */
	value?: string;
	/** Placeholder text shown when the textarea is empty. */
	placeholder?: string;
	/** Visible row count for the textarea. Defaults to 4 in the renderer. */
	rows?: number;
	/**
	 * When `true`, renders a variable-enabled textarea. Users can insert Lumia
	 * variables (e.g. `{{username}}`) via a picker triggered by a `{}` adornment.
	 */
	enableVariables?: boolean;
	/**
	 * Curated variable list to surface at the top of the picker. Has no effect
	 * unless `enableVariables` is also `true`.
	 */
	allowedVariables?: string[];
}

/** Image upload picker. Value is the uploaded asset's URL. */
export interface ImageuploadConfigField extends BaseConfigField {
	type: ConfigsFieldType.IMAGEUPLOAD | 'imageupload';
	/** Default image URL. */
	value?: string;
	/** Optional comma-separated accept hint, e.g. `image/png,image/jpeg`. */
	accept?: string;
}

/** Audio clip upload picker. Value is the uploaded asset's URL. */
export interface SounduploadConfigField extends BaseConfigField {
	type: ConfigsFieldType.SOUNDUPLOAD | 'soundupload';
	/** Default audio URL. */
	value?: string;
	/** Optional comma-separated accept hint, e.g. `audio/mpeg,audio/ogg`. */
	accept?: string;
}

/** Video upload picker. Value is the uploaded asset's URL. */
export interface VideouploadConfigField extends BaseConfigField {
	type: ConfigsFieldType.VIDEOUPLOAD | 'videoupload';
	/** Default video URL. */
	value?: string;
	/** Optional comma-separated accept hint, e.g. `video/mp4,video/webm`. */
	accept?: string;
}

/**
 * Action trigger button. The control surface is a labelled button; clicking it
 * dispatches an event the overlay's custom JS can subscribe to via
 * `Overlay.on('configAction', ({ key }) => …)`. No persisted value.
 */
export interface ActionbuttonConfigField extends BaseConfigField {
	type: ConfigsFieldType.ACTIONBUTTON | 'actionbutton';
	/** Optional button-text override. Defaults to the field `label`. */
	buttonLabel?: string;
}

/**
 * Discriminated union of every config-field shape the renderer accepts.
 * Use this when typing the `configs` map for a Lumia custom overlay.
 *
 * @example
 * const configs: ConfigsSchema = {
 *   font: { type: 'fontpicker', label: 'Font', value: 'Roboto' },
 *   size: {
 *     type: 'slider',
 *     label: 'Font size',
 *     value: 48,
 *     options: { min: 10, max: 120, step: 2, suffix: 'px' },
 *   },
 * };
 */
export type ConfigField =
	| InputConfigField
	| TextareaConfigField
	| NumberConfigField
	| CheckboxConfigField
	| DropdownConfigField
	| MultiselectConfigField
	| ColorpickerConfigField
	| FontpickerConfigField
	| SliderConfigField
	| ImageuploadConfigField
	| SounduploadConfigField
	| VideouploadConfigField
	| ActionbuttonConfigField;

/**
 * The configs map a custom overlay declares in its Configs tab.
 * Keys become accessible at runtime as `Overlay.data[key]`.
 */
export type ConfigsSchema = Record<string, ConfigField>;

/**
 * Core event types that overlays can listen to.
 * Used as discriminants for the overlay event system.
 */
export type OverlayListener = 'chat' | 'alert' | 'hfx' | 'virtuallight' | 'overlaycontent';

export type ChatUserLevelKey = 'isSelf' | 'broadcaster' | 'mod' | 'vip' | 'tier3' | 'tier2' | 'subscriber' | 'regular' | 'follower' | 'anyone';

export type ChatUserLevels = Record<ChatUserLevelKey, boolean>;

export interface ChatReply {
	/** Username of the message being replied to */
	username: string;
	/** Body of the message being replied to */
	body: string;
}

export interface ChatSharedMessage {
	/** Avatar for the source user/channel of the shared message */
	avatar: string;
	/** Display name for the source user/channel of the shared message */
	displayname: string;
	/** User ID for the source user/channel of the shared message */
	userId: string;
}

/**
 * Chat message event data structure.
 * Fired when a chat message is received from any connected platform.
 */
export interface ChatEvent {
	/** Platform origin (e.g., "twitch", "kick", "youtube", "tiktok") */
	origin: string;
	/** Unique message identifier when the platform provides one */
	id?: string;
	/** User's account username/login */
	username?: string;
	/** User's display name (may differ from username) */
	displayname?: string;
	/** Channel name where the message was sent */
	channel?: string;
	/** URL to the user's avatar image */
	avatar?: string | null;
	/** The chat message content */
	message?: string;
	/** User's chat color as hex code (e.g., "#00FF7F") */
	color?: string;
	/** Badge identifiers or badge image URLs */
	badges?: string[];
	/** Lookup map used by some platforms to resolve badge identifiers to image URLs */
	badgesLookup?: Record<string, string>;
	/** Raw badge data string (e.g., "broadcaster/1,subscriber/12,vip/1") */
	badgesRaw?: string;
	/** Raw emotes data string from the platform */
	emotesRaw?: string;
	/** Emote pack data structure; shape varies by platform */
	emotesPack?: Record<string, unknown>;
	/** Whether the message contains a cheer/bits event */
	isCheer?: boolean;
	/** Reply data if this message is a reply to another */
	reply?: ChatReply | null;
	/** Whether this is a Twitch Power-up message */
	isPowerup?: boolean;
	/** Twitch Power-up message type */
	powerupType?: 'animated-message' | 'gigantified-emote-message' | string | false;
	/** Twitch Power-up animation name */
	powerupName?: 'simmer' | 'rainbow-eclipse' | 'cosmic-abyss' | string | false;
	/** Shared chat source metadata when Twitch shared chat provides it */
	sharedMessage?: ChatSharedMessage;
	/** Lumia-specific user level identifiers */
	lumiauserlevels?: number[];
	/** User permission levels and roles */
	userLevels?: ChatUserLevels;
	/** Local HH:mm:ss time string generated by Lumia */
	time?: string;
	/** Millisecond timestamp generated by Lumia */
	timestamp?: number;
}

/**
 * Alert event data structure.
 * Fired when stream alerts occur (follows, subs, donations, etc).
 */
export interface AlertEvent {
	/** Type of alert from LumiaAlertValues enum */
	alert: LumiaAlertValues;
	/** Dynamic value associated with the alert (e.g., donation amount, sub months) */
	dynamic: { value: number | string };
	/** Additional metadata about the alert */
	extraSettings: {
		/** Username of the person triggering the alert */
		username: string;
		/** Display name of the person triggering the alert */
		displayname: string;
		/** User's unique identifier */
		userId: number;
		/** URL to the user's avatar image (if available) */
		avatar: string | null;
		/** ISO timestamp when the alert occurred */
		timestamp: string;
		/** Platform where the alert originated */
		site: 'twitch' | 'kick' | 'youtube' | 'tiktok' | 'facebook' | string;
		/** Lumia queue/activity origin type (e.g., "alert", "chat", "chatbot", "system") */
		originType?: 'system' | 'alert' | 'chat' | 'chatbot' | 'twitch-points' | 'twitch-extension' | 'kick-points' | 'api' | 'lumiastreamlink' | 'streamdeck' | 'touchportal' | 'avermedia' | 'loupedeck' | string;
		/** Whether timing type should be checked */
		checkTimingType: boolean;
		/** Type of timing for the alert */
		timingType: string;
		/** Alert display duration in milliseconds */
		duration: number;
	};
	/** Whether this alert was triggered from Lumia itself */
	fromLumia: boolean;
}

/**
 * HFX (Heads-up Effects) event data structure.
 * Fired when visual/audio effects are triggered.
 */
export interface HfxEvent {
	/** Effect layer identifier */
	layer: string;
	/** Asset UUID for the effect content */
	content: string;
	/** Command that triggered the effect */
	command: string;
	/** Origin of the effect (e.g., "hudfx", "command") */
	origin: string;
	/** Whether to play audio with the effect */
	playAudio: boolean;
	/** Audio volume (0-1 range) */
	volume: number;
	/** Effect duration in milliseconds */
	duration: number;
	/** Username of the person who triggered the effect */
	username: string;
	/** Associated message (if any) */
	message: string;
	/** URL to the user's avatar image */
	avatar: string;
	/** Command duration in milliseconds (usually same as duration) */
	commandDuration: number;
}

/**
 * Virtual light control event data structure.
 * Fired when smart lights are controlled through Lumia.
 */
export interface VirtualLightEvent {
	/** Unique identifier for the light */
	uuid: string;
	/** Brightness level (0-100) */
	brightness: number;
	/** RGB color values */
	color: {
		/** Red component (0-255) */
		r: number;
		/** Green component (0-255) */
		g: number;
		/** Blue component (0-255) */
		b: number;
	};
	/** Power state (true = on, false = off) */
	power?: boolean;
	/** Transition time in milliseconds */
	transition: number;
	/** Delay before applying changes in milliseconds */
	delay: number;
	/** How long to maintain the state in milliseconds */
	duration: number;
}

/**
 * Custom overlay content event data structure.
 * Used for sending custom data to specific overlays.
 */
export interface CustomOverlayContentEvent {
	/** Identifier for the target overlay */
	codeId: string;
	/** Arbitrary JSON/string payload for the overlay */
	content: string;
}

/**
 * Union type of all possible overlay events
 */
export type OverlayEvent = ChatEvent | AlertEvent | HfxEvent | VirtualLightEvent | CustomOverlayContentEvent;

/**
 * Type definition for overlay event handlers.
 * @example
 * const handler: OverlayEventHandler = (data) => {
 *   console.log('Event received:', data);
 * };
 */
export type OverlayEventHandler = (data: OverlayEvent) => void;

/**
 * Main Overlay API interface.
 * Available globally as `window.Overlay` in custom overlays.
 */
export interface Overlay {
	/**
	 * Register an event listener for chat messages
	 * @param event - Event type "chat"
	 * @param handler - Callback function to handle chat events
	 * @example
	 * window.Overlay.on('chat', (data) => {
	 *   console.log(`${data.displayname}: ${data.message}`);
	 * });
	 */
	on(event: 'chat', handler: (data: ChatEvent) => void): void;

	/**
	 * Register an event listener for alerts
	 * @param event - Event type "alert"
	 * @param handler - Callback function to handle alert events
	 * @example
	 * window.Overlay.on('alert', (data) => {
	 *   if (data.alert === LumiaAlertValues.TWITCH_FOLLOWER) {
	 *     console.log(`New follower: ${data.extraSettings.username}`);
	 *   }
	 * });
	 */
	on(event: 'alert', handler: (data: AlertEvent) => void): void;

	/**
	 * Register an event listener for HFX effects
	 * @param event - Event type "hfx"
	 * @param handler - Callback function to handle HFX events
	 */
	on(event: 'hfx', handler: (data: HfxEvent) => void): void;

	/**
	 * Register an event listener for virtual light controls
	 * @param event - Event type "virtuallight"
	 * @param handler - Callback function to handle virtual light events
	 */
	on(event: 'virtuallight', handler: (data: VirtualLightEvent) => void): void;

	/**
	 * Register an event listener for custom overlay content
	 * @param event - Event type "overlaycontent"
	 * @param handler - Callback function to handle custom content events
	 */
	on(event: 'overlaycontent', handler: (data: CustomOverlayContentEvent) => void): void;

	/**
	 * Execute a Lumia Stream command
	 * @param command - Name of the command to execute
	 * @param extraSettings - Optional parameters for the command
	 * @example
	 * await window.Overlay.callCommand('lights-on', { brightness: 75 });
	 */
	callCommand(command: string, extraSettings?: Record<string, unknown>): Promise<unknown>;

	/**
	 * Send a message to chat through the bot
	 * @param args - Chat message configuration
	 * @returns Promise that resolves when the message is sent
	 * @example
	 * await window.Overlay.chatbot({
	 *   message: 'Thanks for the follow!',
	 *   platform: 'twitch',
	 *   chatAsSelf: false
	 * });
	 */
	chatbot(args: {
		/** The message to send */
		message: string;
		/** Target platform (optional) */
		platform?: string;
		/** Whether to send as the streamer (true) or bot (false) */
		chatAsSelf?: boolean;
	}): Promise<void>;

	/**
	 * Add loyalty points to a user
	 * @param args - User and points configuration
	 * @returns Promise resolving to the user's new total points
	 * @example
	 * const newTotal = await window.Overlay.addLoyaltyPoints({
	 *   value: 100,
	 *   username: 'viewer123',
	 *   platform: 'twitch'
	 * });
	 */
	addLoyaltyPoints(args: {
		/** Number of points to add */
		value: number;
		/** Target username */
		username: string;
		/** User's platform */
		platform: string;
	}): Promise<number>;

	/**
	 * Get a user's current loyalty points balance
	 * @param args - User identification
	 * @returns Promise resolving to the user's current points
	 * @example
	 * const points = await window.Overlay.getLoyaltyPoints({
	 *   username: 'viewer123',
	 *   platform: 'twitch'
	 * });
	 */
	getLoyaltyPoints(args: {
		/** Target username */
		username: string;
		/** User's platform */
		platform: string;
	}): Promise<number>;

	/**
	 * Set a Lumia variable value
	 * @param variable - Variable name
	 * @param value - Value to set
	 * @example
	 * await window.Overlay.setVariable('alertCount', 42);
	 */
	setVariable(variable: string, value: unknown): Promise<unknown>;

	/**
	 * Get a Lumia variable value
	 * @param variable - Variable name
	 * @returns The variable value or undefined if not set
	 * @example
	 * const count = await window.Overlay.getVariable('alertCount');
	 */
	getVariable(variable: string): Promise<unknown | undefined>;

	/**
	 * Save data to persistent overlay storage scoped to this overlay's codeId
	 * @param key - Storage key
	 * @param value - Value to store (will be stringified)
	 * @example
	 * await window.Overlay.saveStorage('theme', 'dark');
	 */
	saveStorage(key: string, value: unknown): Promise<unknown>;

	/**
	 * Retrieve data from persistent overlay storage scoped to this overlay's codeId
	 * @param key - Storage key
	 * @returns The stored value or null if not found
	 * @example
	 * const theme = await window.Overlay.getStorage('theme');
	 */
	getStorage(key: string): Promise<unknown | null>;

	/**
	 * Delete data from persistent overlay storage scoped to this overlay's codeId
	 * @param key - Storage key to remove
	 * @example
	 * await window.Overlay.deleteStorage('theme');
	 */
	deleteStorage(key: string): Promise<unknown>;
}

// -----------------------------------------------------------------------------
// Comprehensive enum of all Lumia alert types.
// Used to identify specific events in AlertEvent.alert field.
// -----------------------------------------------------------------------------

// <auto-generated-start name="LumiaAlertValues" />
export declare enum LumiaAlertValues {
    /** Lumia Stream donation received */
    LUMIASTREAM_DONATION = "lumiastream-donation",
    /** Lumia application opened */
    LUMIASTREAM_LUMIA_OPENED = "lumiastream-lumiaOpened",
    /** Lumia application closed */
    LUMIASTREAM_LUMIA_CLOSED = "lumiastream-lumiaClosed",
    /** Stream mode activated */
    LUMIASTREAM_STREAMMODE_ON = "lumiastream-streammodeOn",
    /** Stream mode deactivated */
    LUMIASTREAM_STREAMMODE_OFF = "lumiastream-streammodeOff",
    /** Raffle started */
    LUMIASTREAM_RAFFLE_START = "lumiastream-raffleStart",
    /** Raffle stopped */
    LUMIASTREAM_RAFFLE_STOP = "lumiastream-raffleStop",
    /** Raffle winner selected */
    LUMIASTREAM_RAFFLE_WINNER = "lumiastream-raffleWinner",
    /** Tournament started */
    LUMIASTREAM_TOURNAMENT_START = "lumiastream-tournamentStart",
    /** Tournament ended */
    LUMIASTREAM_TOURNAMENT_END = "lumiastream-tournamentEnd",
    /** Tournament winner selected */
    LUMIASTREAM_TOURNAMENT_WINNER = "lumiastream-tournamentWinner",
    /** Spin wheel winner selected */
    LUMIASTREAM_SPINWHEEL_WINNER = "lumiastream-spinwheelWinner",
    /** Poll started */
    LUMIASTREAM_POLL_STARTED = "lumiastream-pollStarted",
    /** Poll progress update */
    LUMIASTREAM_POLL_PROGRESSED = "lumiastream-pollProgressed",
    /** Poll ended */
    LUMIASTREAM_POLL_ENDED = "lumiastream-pollEnded",
    /** Viewer queue started */
    LUMIASTREAM_VIEWERQUEUE_STARTED = "lumiastream-viewerqueueStarted",
    /** Viewer queue ended */
    LUMIASTREAM_VIEWERQUEUE_ENDED = "lumiastream-viewerqueueEnded",
    /** Viewer achievement unlocked */
    LUMIASTREAM_VIEWER_ACHIEVEMENT = "lumiastream-viewerAchievement",
    /** Template variable value changed */
    LUMIASTREAM_VARIABLE_CHANGED = "lumiastream-variableChanged",
    /** Roulette winner selected */
    LUMIASTREAM_ROULETTE_WINNER = "lumiastream-rouletteWinner",
    /** Slots winner */
    LUMIASTREAM_SLOTS_WINNER = "lumiastream-slotsWinner",
    /** Twitch extension interaction */
    TWITCH_EXTENSION = "twitch-extension",
    /** Twitch channel points redemption */
    TWITCH_POINTS = "twitch-points",
    /** Twitch stream went live */
    TWITCH_STREAM_LIVE = "twitch-streamLive",
    /** Twitch stream went offline */
    TWITCH_STREAM_OFFLINE = "twitch-streamOffline",
    /** First chat message in stream */
    TWITCH_FIRST_CHATTER = "twitch-firstChatter",
    /** User entered the stream */
    TWITCH_ENTRANCE = "twitch-entrance",
    /** New follower */
    TWITCH_FOLLOWER = "twitch-follower",
    /** Total Session followers count */
    TWITCH_SESSION_FOLLOWERS = "twitch-sessionFollowers",
    /** New subscription */
    TWITCH_SUBSCRIBER = "twitch-subscriber",
    /** Total Session subs count */
    TWITCH_SESSION_SUBS = "twitch-sessionSubs",
    /** Gift subscription given */
    TWITCH_GIFT_SUBSCRIPTION = "twitch-giftSubscription",
    /** Total Session gifts count */
    TWITCH_SESSION_GIFT_SUBSCRIPTIONS = "twitch-sessionGiftSubscriptions",
    /** Incoming raid */
    TWITCH_RAID = "twitch-raid",
    /** Outgoing raid */
    TWITCH_RAID_OUT = "twitch-raidOut",
    /** Bits cheered */
    TWITCH_BITS = "twitch-bits",
    /** Bits combo completed */
    TWITCH_BITS_COMBO = "twitch-bitsCombo",
    /** Total Session bits count */
    TWITCH_SESSION_BITS = "twitch-sessionBits",
    /** Channel points redemption */
    TWITCH_REDEMPTION = "twitch-redemption",
    /** Hype train started */
    TWITCH_HYPETRAIN_STARTED = "twitch-hypetrainStarted",
    /** Hype train progress */
    TWITCH_HYPETRAIN_PROGRESSED = "twitch-hypetrainProgressed",
    /** Hype train level increased */
    TWITCH_HYPETRAIN_LEVEL_PROGRESSED = "twitch-hypetrainLevelProgressed",
    /** Hype train ended */
    TWITCH_HYPETRAIN_ENDED = "twitch-hypetrainEnded",
    /** Poll started */
    TWITCH_POLL_STARTED = "twitch-pollStarted",
    /** Poll progress update */
    TWITCH_POLL_PROGRESSED = "twitch-pollProgressed",
    /** Poll ended */
    TWITCH_POLL_ENDED = "twitch-pollEnded",
    /** Prediction started */
    TWITCH_PREDICTION_STARTED = "twitch-predictionStarted",
    /** Prediction progress update */
    TWITCH_PREDICTION_PROGRESSED = "twitch-predictionProgressed",
    /** Prediction locked */
    TWITCH_PREDICTION_LOCKED = "twitch-predictionLocked",
    /** Prediction ended */
    TWITCH_PREDICTION_ENDED = "twitch-predictionEnded",
    /** Goal started */
    TWITCH_GOAL_STARTED = "twitch-goalStarted",
    /** Goal progress update */
    TWITCH_GOAL_PROGRESSED = "twitch-goalProgressed",
    /** Goal completed */
    TWITCH_GOAL_ENDED = "twitch-goalEnded",
    /** Charity donation */
    TWITCH_CHARITY_DONATION = "twitch-charityDonation",
    /** Charity campaign started */
    TWITCH_CHARITY_CAMPAIGN_STARTED = "twitch-charityCampaignStarted",
    /** Charity campaign progress */
    TWITCH_CHARITY_CAMPAIGN_PROGRESSED = "twitch-charityCampaignProgressed",
    /** Charity campaign stopped */
    TWITCH_CHARITY_CAMPAIGN_STOPPED = "twitch-charityCampaignStopped",
    /** Stream category changed */
    TWITCH_CATEGORY = "twitch-categoryChanged",
    /** Clip created */
    TWITCH_CLIP = "twitch-clip",
    /** User joined channel */
    TWITCH_CHANNEL_JOIN = "twitch-channelJoin",
    /** User left channel */
    TWITCH_CHANNEL_LEAVE = "twitch-channelLeave",
    /** User banned */
    TWITCH_BANNED = "twitch-banned",
    /** User timed out */
    TWITCH_TIMEOUT = "twitch-timeout",
    /** User timeout expired */
    TWITCH_TIMEOUT_OVER = "twitch-timeoutOver",
    /** Shoutout received */
    TWITCH_SHOUTOUT_RECEIVE = "twitch-shoutoutReceive",
    /** Ad break started */
    TWITCH_AD_STARTED = "twitch-adStarted",
    /** Ad break ended */
    TWITCH_AD_STOPPED = "twitch-adStopped",
    /** Watch streak milestone */
    TWITCH_WATCH_STREAK = "twitch-watchStreak",
    /** Power-ups used */
    TWITCH_POWERUPS = "twitch-powerups",
    /** YouTube stream went live */
    YOUTUBE_STREAM_LIVE = "youtube-streamLive",
    /** YouTube stream went offline */
    YOUTUBE_STREAM_OFFLINE = "youtube-streamOffline",
    /** First YouTube chat message */
    YOUTUBE_FIRST_CHATTER = "youtube-firstChatter",
    /** YouTube user entrance */
    YOUTUBE_ENTRANCE = "youtube-entrance",
    /** YouTube new subscriber */
    YOUTUBE_SUBSCRIBER = "youtube-subscriber",
    /** YouTube session subscribers */
    YOUTUBE_SESSION_SUBS = "youtube-sessionSubs",
    /** YouTube channel membership */
    YOUTUBE_MEMBER = "youtube-member",
    /** YouTube session members */
    YOUTUBE_SESSION_MEMBERS = "youtube-sessionMembers",
    /** YouTube gift members */
    YOUTUBE_GIFT_MEMBERS = "youtube-giftMembers",
    /** YouTube session gift members */
    YOUTUBE_SESSION_GIFT_MEMBERS = "youtube-sessionGiftMembers",
    /** YouTube Super Chat */
    YOUTUBE_SUPERCHAT = "youtube-superchat",
    /** YouTube session superchats */
    YOUTUBE_SESSION_SUPERCHATS = "youtube-sessionSuperchats",
    /** YouTube Super Sticker */
    YOUTUBE_SUPERSTICKER = "youtube-supersticker",
    /** YouTube session superstickers */
    YOUTUBE_SESSION_SUPERSTICKERS = "youtube-sessionSuperstickers",
    /** YouTube gift event (jewel-based) */
    YOUTUBE_GIFTS = "youtube-gifts",
    /** YouTube session gifts */
    YOUTUBE_SESSION_GIFTS = "youtube-sessionGifts",
    /** YouTube total likes */
    YOUTUBE_LIKE = "youtube-like",
    /** YouTube total views */
    YOUTUBE_VIEWERS = "youtube-viewers",
    /** Facebook stream went live */
    FACEBOOK_STREAM_LIVE = "facebook-streamLive",
    /** Facebook stream went offline */
    FACEBOOK_STREAM_OFFLINE = "facebook-streamOffline",
    /** First Facebook chat message */
    FACEBOOK_FIRST_CHATTER = "facebook-firstChatter",
    /** Facebook user entrance */
    FACEBOOK_ENTRANCE = "facebook-entrance",
    /** Facebook new follower */
    FACEBOOK_FOLLOWER = "facebook-follower",
    /** Facebook reaction */
    FACEBOOK_REACTION = "facebook-reaction",
    /** Facebook stars received */
    FACEBOOK_STAR = "facebook-star",
    /** Facebook support */
    FACEBOOK_SUPPORT = "facebook-support",
    /** Facebook gift subscription */
    FACEBOOK_GIFT_SUBSCRIPTION = "facebook-subscriptionGift",
    /** Facebook share */
    FACEBOOK_SHARE = "facebook-share",
    /** Facebook fan */
    FACEBOOK_FAN = "facebook-fan",
    /** First TikTok chat message */
    TIKTOK_FIRST_CHATTER = "tiktok-firstChatter",
    /** TikTok user entrance */
    TIKTOK_ENTRANCE = "tiktok-entrance",
    /** TikTok new follower */
    TIKTOK_FOLLOWER = "tiktok-follower",
    /** TikTok like received */
    TIKTOK_LIKE = "tiktok-like",
    /** TikTok total likes */
    TIKTOK_TOTAL_LIKES = "tiktok-totalLikes",
    /** TikTok gift received */
    TIKTOK_GIFT = "tiktok-gift",
    /** TikTok paid LIVE-only Super Fan membership event */
    TIKTOK_SUPER_FAN = "tiktok-superFan",
    /** TikTok Super Fan Box event, separate from becoming a Super Fan */
    TIKTOK_SUPER_FAN_BOX = "tiktok-superFanBox",
    /** TikTok treasure chest / envelope event */
    TIKTOK_TREASURE_CHEST = "tiktok-treasureChest",
    /** TikTok question */
    TIKTOK_QUESTION = "tiktok-question",
    /** TikTok LIVE poll event */
    TIKTOK_POLL = "tiktok-poll",
    /** TikTok LIVE shopping / shop purchase event */
    TIKTOK_SHOP_PURCHASE = "tiktok-shopPurchase",
    /** TikTok pinned message */
    TIKTOK_PIN_MESSAGE = "tiktok-pinMessage",
    /** TikTok LIVE battle started */
    TIKTOK_BATTLE_START = "tiktok-battleStart",
    /** TikTok LIVE battle progress update */
    TIKTOK_BATTLE_PROGRESS = "tiktok-battleProgress",
    /** TikTok LIVE battle finished with a final result */
    TIKTOK_BATTLE_END = "tiktok-battleEnd",
    /** TikTok share */
    TIKTOK_SHARE = "tiktok-share",
    /** TikTok stream ended */
    TIKTOK_STREAM_END = "tiktok-streamEnd",
    /** New TikTok video posted */
    TIKTOK_NEW_VIDEO = "tiktok-newVideo",
    /** Kick points earned */
    KICK_POINTS = "kick-points",
    /** First Kick chat message */
    KICK_FIRST_CHATTER = "kick-firstChatter",
    /** Kick user entrance */
    KICK_ENTRANCE = "kick-entrance",
    /** Kick new follower */
    KICK_FOLLOWER = "kick-follower",
    /** Total Session followers count */
    KICK_SESSION_FOLLOWERS = "kick-sessionFollowers",
    /** Kick new subscriber */
    KICK_SUBSCRIBER = "kick-subscriber",
    /** Total Session subs count */
    KICK_SESSION_SUBS = "kick-sessionSubs",
    /** Kick gift subscription */
    KICK_GIFT_SUBSCRIPTION = "kick-subscriptionGift",
    /** Total Session gifts count */
    KICK_SESSION_GIFT_SUBSCRIPTIONS = "kick-sessionGiftSubscriptions",
    /** Kick kicks */
    KICK_KICKS = "kick-kicks",
    /** Kick Session kicks */
    KICK_SESSION_KICKS = "kick-sessionKicks",
    /** Kick host */
    KICK_HOST = "kick-host",
    /** Kick user banned */
    KICK_BANNED = "kick-banned",
    /** Kick user unbanned */
    KICK_UNBANNED = "kick-unbanned",
    /** First Discord message */
    DISCORD_FIRST_CHATTER = "discord-firstChatter",
    /** Discord user entrance */
    DISCORD_ENTRANCE = "discord-entrance",
    /** Streamlabs donation */
    STREAMLABS_DONATION = "streamlabs-donation",
    /** Streamlabs charity donation */
    STREAMLABS_CHARITY = "streamlabs-charity",
    /** Streamlabs merchandise purchase */
    STREAMLABS_MERCH = "streamlabs-merch",
    /** Streamlabs redemption */
    STREAMLABS_REDEMPTION = "streamlabs-redemption",
    /** Streamlabs Prime gift */
    STREAMLABS_PRIMEGIFT = "streamlabs-primegift",
    /** StreamElements donation */
    STREAMELEMENTS_DONATION = "streamelements-donation",
    /** Extra Life donation */
    EXTRALIFE_DONATION = "extralife-donation",
    /** DonorDrive donation */
    DONORDRIVE_DONATION = "donordrive-donation",
    /** Tiltify campaign donation */
    TILTIFY_DONATION = "tiltify-campaignDonation",
    /** Throne gift purchase */
    THRONE_GIFT_PURCHASE = "throne-giftPurchase",
    /** Throne contribution purchase */
    THRONE_CONTRIBUTION_PURCHASE = "throne-contributionPurchase",
    /** Throne gift crowdfunded */
    THRONE_GIFT_CROWDFUNDED = "throne-giftCrowdfunded",
    /** TipeeeStream donation */
    TIPEEESTREAM_DONATION = "tipeeestream-donation",
    /** TreatStream treat */
    TREATSTREAM_TREAT = "treatstream-treat",
    /** Patreon pledge */
    PATREON_PLEDGE = "patreon-campaignPledge",
    /** Ko-fi donation */
    KOFI_DONATION = "kofi-donation",
    /** Ko-fi subscription */
    KOFI_SUBSCRIPTION = "kofi-subscription",
    /** Ko-fi commission */
    KOFI_COMMISSION = "kofi-commission",
    /** Ko-fi shop order */
    KOFI_SHOPORDER = "kofi-shopOrder",
    /** Fourthwall shop order */
    FOURTHWALL_SHOPORDER = "fourthwall-shopOrder",
    /** Fourthwall donation */
    FOURTHWALL_DONATION = "fourthwall-donation",
    /** Fourthwall subscription */
    FOURTHWALL_SUBSCRIPTION = "fourthwall-subscription",
    /** Fourthwall subscription changed */
    FOURTHWALL_SUBSCRIPTION_CHANGED = "fourthwall-subscriptionChanged",
    /** Fourthwall subscription expired */
    FOURTHWALL_SUBSCRIPTION_EXPIRED = "fourthwall-subscriptionExpired",
    /** Fourthwall gift purchase */
    FOURTHWALL_GIFTPURCHASE = "fourthwall-giftpurchase",
    /** Fourthwall giveaway started */
    FOURTHWALL_GIVEAWAY_STARTED = "fourthwall-giveawayStarted",
    /** Fourthwall giveaway ended */
    FOURTHWALL_GIVEAWAY_ENDED = "fourthwall-giveawayEnded",
    /** Fourthwall thank you sent */
    FOURTHWALL_THANKYOU_SENT = "fourthwall-thankyouSent",
    /** Fourthwall newsletter subscribed */
    FOURTHWALL_NEWSLETTER_SUBSCRIBED = "fourthwall-newsletterSubscribed",
    /** OBS profile switched */
    OBS_SWITCH_PROFILE = "obs-switchProfile",
    /** OBS scene switched */
    OBS_SWITCH_SCENE = "obs-switchScene",
    /** OBS scene item visibility changed */
    OBS_SCENE_ITEM_VISIBILITY = "obs-sceneItemVisibility",
    /** OBS scene item hidden */
    OBS_SCENE_ITEM_HIDDEN = "obs-sceneItemHidden",
    /** OBS transition switched */
    OBS_SWITCH_TRANSITION = "obs-switchTransition",
    /** OBS transition started */
    OBS_TRANSITION_BEGIN = "obs-transitionBegin",
    /** OBS transition ended */
    OBS_TRANSITION_END = "obs-transitionEnd",
    /** OBS stream starting */
    OBS_STREAM_STARTING = "obs-streamStarting",
    /** OBS stream stopping */
    OBS_STREAM_STOPPING = "obs-streamStopping",
    /** OBS recording starting */
    OBS_RECORDING_STARTING = "obs-recordingStarting",
    /** OBS recording stopping */
    OBS_RECORDING_STOPPING = "obs-recordingStopping",
    /** OBS media input playback started */
    OBS_MEDIA_INPUT_PLAYBACK_STARTED = "obs-mediaInputPlaybackStarted",
    /** OBS media input playback ended */
    OBS_MEDIA_INPUT_PLAYBACK_ENDED = "obs-mediaInputPlaybackEnded",
    /** OBS virtual camera state changed */
    OBS_VIRTUALCAM_STATE_CHANGED = "obs-virtualcamStateChanged",
    /** OBS screenshot saved */
    OBS_SCREENSHOT_SAVED = "obs-screenshotSaved",
    /** OBS replay buffer saved */
    OBS_REPLAY_BUFFER_SAVED = "obs-replayBufferSaved",
    /** OBS vertical backtrack saved */
    OBS_VERTICAL_BACKTRACK_SAVED = "obs-verticalBacktrackSaved",
    /** OBS vendor-specific event */
    OBS_VENDOR_EVENT = "obs-vendorEvent",
    /** SLOBS scene collection switched */
    SLOBS_SWITCH_SCENE_COLLECTION = "slobs-switchSceneCollection",
    /** SLOBS scene switched */
    SLOBS_SWITCH_SCENE = "slobs-switchScene",
    /** SLOBS scene item visibility changed */
    SLOBS_SCENE_ITEM_VISIBILITY = "slobs-sceneItemVisibility",
    /** SLOBS scene item hidden */
    SLOBS_SCENE_ITEM_HIDDEN = "slobs-sceneItemHidden",
    /** Spotify song changed */
    SPOTIFY_SWITCH_SONG = "spotify-switchSong",
    /** Spotify song started playing */
    SPOTIFY_SONG_PLAYED = "spotify-songPlayed",
    /** Spotify song paused */
    SPOTIFY_SONG_PAUSED = "spotify-songPaused",
    /** YouTube Music song changed */
    YOUTUBEMUSIC_SWITCH_SONG = "youtubemusic-switchSong",
    /** YouTube Music song started playing */
    YOUTUBEMUSIC_SONG_PLAYED = "youtubemusic-songPlayed",
    /** YouTube Music song paused */
    YOUTUBEMUSIC_SONG_PAUSED = "youtubemusic-songPaused",
    /** Now Playing song changed */
    NOWPLAYING_SWITCH_SONG = "nowplaying-switchSong",
    /** Now Playing song started */
    NOWPLAYING_SONG_PLAYED = "nowplaying-songPlayed",
    /** Now Playing song paused */
    NOWPLAYING_SONG_PAUSED = "nowplaying-songPaused",
    /** VLC song changed */
    VLC_SWITCH_SONG = "vlc-switchSong",
    /** VLC song started playing */
    VLC_SONG_PLAYED = "vlc-songPlayed",
    /** VLC song paused */
    VLC_SONG_PAUSED = "vlc-songPaused",
    /** Heart rate update from Pulse */
    PULSE_HEARTRATE = "pulse-heartrate",
    /** Calories burned update from Pulse */
    PULSE_CALORIES = "pulse-calories",
    /** New Twitter/X follower */
    TWITTER_FOLLOWER = "twitter-follower",
    /** Twitter/X like received */
    TWITTER_LIKE = "twitter-like",
    /** Twitter/X retweet */
    TWITTER_RETWEET = "twitter-retweet",
    /** WooCommerce order received */
    WOOCOMMERCE_ORDER = "woocommerce-order",
    /** Streamer.bot action executed */
    STREAMERBOT_ACTION = "streamerbot-action",
    /** Crowd Control effect triggered */
    CROWDCONTROL_EFFECT = "crowdcontrol-effect",
    /** VTube Studio hotkey triggered */
    VTUBESTUDIO_HOTKEY_TRIGGERED = "vtubestudio-hotkeyTriggered",
    /** VTube Studio model loaded */
    VTUBESTUDIO_MODEL_LOADED = "vtubestudio-modelLoaded",
    /** VTube Studio animation started */
    VTUBESTUDIO_ANIMATION_START = "vtubestudio-animationStart",
    /** VTube Studio animation ended */
    VTUBESTUDIO_ANIMATION_END = "vtubestudio-animationEnd",
    /** VTube Studio item added */
    VTUBESTUDIO_ITEM_ADDED = "vtubestudio-itemAdded",
    /** VTube Studio item removed */
    VTUBESTUDIO_ITEM_REMOVED = "vtubestudio-itemRemoved",
    /** VTube Studio background changed */
    VTUBESTUDIO_BACKGROUND_CHANGED = "vtubestudio-backgroundChanged",
    /** Meld stream starting */
    MELD_STREAM_STARTING = "meld-streamStarting",
    /** Meld stream stopping */
    MELD_STREAM_STOPPING = "meld-streamStopping",
    /** Meld recording starting */
    MELD_RECORDING_STARTING = "meld-recordingStarting",
    /** Meld recording stopping */
    MELD_RECORDING_STOPPING = "meld-recordingStopping",
    /** Meld scene switched */
    MELD_SWITCH_SCENE = "meld-switchScene",
    /** Meld vertical scene switched */
    MELD_SWITCH_VERTICAL_SCENE = "meld-switchVerticalScene"
}

// <auto-generated-end name="LumiaAlertValues" />

// -----------------------------------------------------------------------------
// System Variables
// Use the **string values** of this enum inside overlays: e.g. {{twitch_total_subscriber_count}}, not {{TWITCH_TOTAL_SUBSCRIBER_COUNT}}.
// -----------------------------------------------------------------------------

// <auto-generated-start name="SystemVariables" />
export declare enum SystemVariables {
    /** Read from a local file. Example: {{read_file=C:\path\file.txt}}. Use in overlays as {{read_file}}. */
    READ_FILE = "read_file",
    /** Read from a simple GET URL (2s timeout). Example: {{read_url=https://api.example.com}}. Use as {{read_url}}. */
    READ_URL = "read_url",
    /** Selection helper for predefined options. Example: {{selection=first,second}}. Use as {{selection}}. */
    SELECTION = "selection",
    /** Random number between two values. Example: {{random=1,20}}. Use as {{random}}. */
    RANDOM = "random",
    /** Pick a random item from a comma list. Example: {{random_input=a,b,c}}. Use as {{random_input}}. */
    RANDOM_INPUT = "random_input",
    /** Evaluate a math expression. Example: {{math={{var1}}+{{var2}}}}. Use as {{math}}. */
    MATH = "math",
    /** Compare two values. Example: {{compare={{var1}},>,{{var2}}}}. Use as {{compare}}. */
    COMPARE = "compare",
    /** Round a value to decimal places. Example: {{round={{math={{var1}}/{{var2}}}},2}}. Use as {{round}}. */
    ROUND = "round",
    /** Conditional output based on truthy value. Example: {{if={{compare={{var1}},>,10}},high,low}}. Use as {{if}}. */
    IF = "if",
    /** Return first non-empty input. Example: {{coalesce={{display_name}},{{username}},Anonymous}}. Use as {{coalesce}}. */
    COALESCE = "coalesce",
    /** Check if value is between two numbers. Example: {{between={{var1}},10,50}}. Use as {{between}}. */
    BETWEEN = "between",
    /** Return minimum numeric value. Example: {{min={{v1}},{{v2}},100}}. Use as {{min}}. */
    MIN = "min",
    /** Return maximum numeric value. Example: {{max={{v1}},{{v2}},100}}. Use as {{max}}. */
    MAX = "max",
    /** Extract regex capture group from text. Example: {{regex_extract={{message}},\"(\\d+)\",1}}. Use as {{regex_extract}}. */
    REGEX_EXTRACT = "regex_extract",
    /** Replace text or regex matches. Example: {{replace={{message}},badword,***}}. Use as {{replace}}. */
    REPLACE = "replace",
    /** Format a date with a pattern. Example: {{format_date={{session_start_date}},MM/DD/YYYY hh:mm A}}. Use as {{format_date}}. */
    FORMAT_DATE = "format_date",
    /** Show elapsed time since date in short format. Example: {{time_since={{follow_time}}}}. Use as {{time_since}}. */
    TIME_SINCE = "time_since",
    /** Sum multiple variables. Example: {{sum_variables=twitch_total_follower_count,kick_total_follower_count}}. Use as {{sum_variables}}. */
    SUM_VARIABLES = "sum_variables",
    /** Offset a variable by a number. Example: {{offset_count=twitch_total_follower_count,10}}. Use as {{offset_count}}. */
    OFFSET_COUNT = "offset_count",
    /** Get user-accessible commands. Use as {{get_commands}}. */
    GET_COMMANDS = "get_commands",
    /** Get all commands (full list). Use as {{get_all_commands}}. */
    GET_ALL_COMMANDS = "get_all_commands",
    /** Convert color names to hex; passes through hex. Example: {{convert_color_to_hex=green}}. Use as {{convert_color_to_hex}}. */
    CONVERT_COLOR_TO_HEX = "convert_color_to_hex",
    /** Latest file from a folder. Example: {{get_latest_file_from_folder=C:/Users/Desktop}}. Use as {{get_latest_file_from_folder}}. */
    GET_LATEST_FILE_FROM_FOLDER = "get_latest_file_from_folder",
    /** Random file from a folder. Example: {{get_random_file_from_folder=C:/Users/Desktop}}. Use as {{get_random_file_from_folder}}. */
    GET_RANDOM_FILE_FROM_FOLDER = "get_random_file_from_folder",
    /** Desktop screenshot (monitor selectable). Example: {{screenshot=2}}. Use as {{screenshot}}. */
    SCREENSHOT = "screenshot",
    /** Overlay screenshot. Example: {{overlay_screenshot=Overlay 1}}. Use as {{overlay_screenshot}}. */
    OVERLAY_SCREENSHOT = "overlay_screenshot",
    /** OBS screenshot (scene selectable). Example: {{obs_screenshot=Scene 1}}. Use as {{obs_screenshot}}. */
    OBS_SCREENSHOT = "obs_screenshot",
    /** Save OBS replay buffer (optional delay). Example: {{obs_replay=5}}. Use as {{obs_replay}}. */
    OBS_REPLAY = "obs_replay",
    /** Save OBS vertical replay (optional delay). Example: {{obs_vertical_replay=5}}. Use as {{obs_vertical_replay}}. */
    OBS_VERTICAL_REPLAY = "obs_vertical_replay",
    /** Current queue count. Example: {{get_queue_count}}. Use as {{get_queue_count}}. */
    GET_QUEUE_COUNT = "get_queue_count",
    /** Extract variable(s) from a message. Example: {{get_var_from_msg=name}}. Use as {{get_var_from_msg}}. */
    GET_VAR_FROM_MSG = "get_var_from_msg",
    /** Get loyalty points for a user. Example: {{get_user_loyalty_points=username,twitch}}. Use as {{get_user_loyalty_points}}. */
    GET_USER_LOYALTY_POINTS = "get_user_loyalty_points",
    /** Translate text (Google). Example: {{translate={{message}}|es}}. Use as {{translate}}. */
    TRANSLATE = "translate",
    /** Get the ai response from ai integration. Example: {{ai_prompt={{message}}}}. Use as {{ai_prompt}}. */
    AI_PROMPT = "ai_prompt",
    /** Current weather for a location via wttr.in. Returns a one-line summary like */
    WEATHER = "weather",
    /** Commands URL/page. Use in overlays as {{commands_url}}. */
    COMMANDS_URL = "commands_url",
    /** Session start time (ISO). Use as {{session_start_date}}. */
    SESSION_START_DATE = "session_start_date",
    /** Last overlay screenshot path. Use as {{last_overlay_screenshot_path}}. */
    LAST_OVERLAY_SCREENSHOT_PATH = "last_overlay_screenshot_path",
    /**
     * Streamer's display name. Platform-agnostic — resolves to the streamer's
     * username on whichever platform is currently connected, preferring the
     * primary platform when multiple are connected. Use as {{streamer}}.
     *
     * Resolution order in the renderer: twitch_username → kick_username →
     * youtube_username → facebook_username → tiktok_username, falling back to
     * '' when no platform is connected. Re-evaluated whenever any of those
     * underlying username variables changes.
     *
     * Useful for templates that want to say "{{streamer}}'s overlay" without
     * knowing which platform the streamer is on — and for SE imports which
     * use the same `{streamer}` token as a platform-agnostic placeholder.
     */
    STREAMER = "streamer",
    /** Last player to trigger a game. Use as {{game_last_player}}. */
    GAME_LAST_PLAYER = "game_last_player",
    /** Lumia app uptime. Use as {{lumia_uptime}}. */
    LUMIA_UPTIME = "lumia_uptime",
    /** Twitch stream uptime. Use as {{twitch_uptime}}. */
    TWITCH_UPTIME = "twitch_uptime",
    /** YouTube stream uptime. Use as {{youtube_uptime}}. */
    YOUTUBE_UPTIME = "youtube_uptime",
    /** Facebook stream uptime. Use as {{facebook_uptime}}. */
    FACEBOOK_UPTIME = "facebook_uptime",
    /** Twitch live status (true/false). Use as {{twitch_live}}. */
    TWITCH_LIVE = "twitch_live",
    /** YouTube live status (true/false). Use as {{youtube_live}}. */
    YOUTUBE_LIVE = "youtube_live",
    /** TikTok live status (true/false). Use as {{tiktok_live}}. */
    TIKTOK_LIVE = "tiktok_live",
    /** Facebook live status (true/false). Use as {{facebook_live}}. */
    FACEBOOK_LIVE = "facebook_live",
    /** Kick live status (true/false). Use as {{kick_live}}. */
    KICK_LIVE = "kick_live",
    /** BRB clips list (comma-separated URLs). Use as {{overlays_brb_clips}}. */
    OVERLAYS_BRB_CLIPS = "overlays_brb_clips",
    /** Last donator name. Use as {{latest_donator}}. */
    LATEST_DONATOR = "latest_donator",
    /** Last donation amount. Use as {{latest_donator_amount}}. */
    LATEST_DONATOR_AMOUNT = "latest_donator_amount",
    /** Last donation currency code. Use as {{latest_donator_currency}}. */
    LATEST_DONATOR_CURRENCY = "latest_donator_currency",
    /** Last donation currency symbol. Use as {{latest_donator_currency_symbol}}. */
    LATEST_DONATOR_CURRENCY_SYMBOL = "latest_donator_currency_symbol",
    /** Top donator this session. Use as {{session_top_donator}}. */
    SESSION_TOP_DONATOR = "session_top_donator",
    /** Top donation amount this session. Use as {{session_top_donator_amount}}. */
    SESSION_TOP_DONATOR_AMOUNT = "session_top_donator_amount",
    /** Top donation currency this session. Use as {{session_top_donator_currency}}. */
    SESSION_TOP_DONATOR_CURRENCY = "session_top_donator_currency",
    /** Top donation currency symbol this session. Use as {{session_top_donator_currency_symbol}}. */
    SESSION_TOP_DONATOR_CURRENCY_SYMBOL = "session_top_donator_currency_symbol",
    /** All-time top donator. Use as {{top_donator}}. */
    TOP_DONATOR = "top_donator",
    /** All-time top donation amount. Use as {{top_donator_amount}}. */
    TOP_DONATOR_AMOUNT = "top_donator_amount",
    /** All-time top donation currency code. Use as {{top_donator_currency}}. */
    TOP_DONATOR_CURRENCY = "top_donator_currency",
    /** All-time top donation currency symbol. Use as {{top_donator_currency_symbol}}. */
    TOP_DONATOR_CURRENCY_SYMBOL = "top_donator_currency_symbol",
    /** Top donators list (last 10). Use as {{top_donator_list}}. */
    TOP_DONATOR_LIST = "top_donator_list",
    /** Amounts for TOP_DONATOR_LIST. Use as {{top_donator_list_amount}}. */
    TOP_DONATOR_LIST_AMOUNT = "top_donator_list_amount",
    /** Currency codes for TOP_DONATOR_LIST. Use as {{top_donator_list_currency}}. */
    TOP_DONATOR_LIST_CURRENCY = "top_donator_list_currency",
    /** Currency symbols for TOP_DONATOR_LIST. Use as {{top_donator_list_currency_symbol}}. */
    TOP_DONATOR_LIST_CURRENCY_SYMBOL = "top_donator_list_currency_symbol",
    /** All-time total donation amount (normalized). Use as {{total_donation_amount}}. */
    TOTAL_DONATION_AMOUNT = "total_donation_amount",
    /** Currency code for TOTAL_DONATION_AMOUNT. Use as {{total_donation_amount_currency}}. */
    TOTAL_DONATION_AMOUNT_CURRENCY = "total_donation_amount_currency",
    /** Currency symbol for TOTAL_DONATION_AMOUNT. Use as {{total_donation_amount_currency_symbol}}. */
    TOTAL_DONATION_AMOUNT_CURRENCY_SYMBOL = "total_donation_amount_currency_symbol",
    /** Session donation sum. Use as {{session_donation_amount}}. */
    SESSION_DONATION_AMOUNT = "session_donation_amount",
    /** Session donation currency code. Use as {{session_donation_amount_currency}}. */
    SESSION_DONATION_AMOUNT_CURRENCY = "session_donation_amount_currency",
    /** Session donation currency symbol. Use as {{session_donation_amount_currency_symbol}}. */
    SESSION_DONATION_AMOUNT_CURRENCY_SYMBOL = "session_donation_amount_currency_symbol",
    /** All-time donation count. Use as {{donation_count}}. */
    DONATION_COUNT = "donation_count",
    /** Session donation count. Use as {{session_donation_count}}. */
    SESSION_DONATION_COUNT = "session_donation_count",
    /** Session donators list. Use as {{session_donator_list}}. */
    SESSION_DONATOR_LIST = "session_donator_list",
    /** Session donators with amounts. Use as {{session_donator_list_with_amount}}. */
    SESSION_DONATOR_LIST_WITH_AMOUNT = "session_donator_list_with_amount",
    /** Raw donation total ignoring currency. Use as {{total_raw_donation_amount}}. */
    TOTAL_RAW_DONATION_AMOUNT = "total_raw_donation_amount",
    /** Donation sum for the current calendar week. Use as {{week_donation_amount}}. */
    WEEK_DONATION_AMOUNT = "week_donation_amount",
    /** Donation sum for the current calendar month. Use as {{month_donation_amount}}. */
    MONTH_DONATION_AMOUNT = "month_donation_amount",
    /** Donation event count for the current calendar week. Use as {{week_donation_count}}. */
    WEEK_DONATION_COUNT = "week_donation_count",
    /** Donation event count for the current calendar month. Use as {{month_donation_count}}. */
    MONTH_DONATION_COUNT = "month_donation_count",
    /** Top donator for the current calendar week. Use as {{week_top_donator}}. */
    WEEK_TOP_DONATOR = "week_top_donator",
    /** Amount for WEEK_TOP_DONATOR. Use as {{week_top_donator_amount}}. */
    WEEK_TOP_DONATOR_AMOUNT = "week_top_donator_amount",
    /** Top donators this week (top 10, comma-separated usernames). Use as {{week_top_donator_list}}. */
    WEEK_TOP_DONATOR_LIST = "week_top_donator_list",
    /** Amounts for WEEK_TOP_DONATOR_LIST (parallel comma-separated). Use as {{week_top_donator_list_amount}}. */
    WEEK_TOP_DONATOR_LIST_AMOUNT = "week_top_donator_list_amount",
    /** Top donator for the current calendar month. Use as {{month_top_donator}}. */
    MONTH_TOP_DONATOR = "month_top_donator",
    /** Amount for MONTH_TOP_DONATOR. Use as {{month_top_donator_amount}}. */
    MONTH_TOP_DONATOR_AMOUNT = "month_top_donator_amount",
    /** Top donators this month. Use as {{month_top_donator_list}}. */
    MONTH_TOP_DONATOR_LIST = "month_top_donator_list",
    /** Amounts for MONTH_TOP_DONATOR_LIST. Use as {{month_top_donator_list_amount}}. */
    MONTH_TOP_DONATOR_LIST_AMOUNT = "month_top_donator_list_amount",
    /** Raffle title. Use as {{raffle_title}}. */
    RAFFLE_TITLE = "raffle_title",
    /** Raffle description. Use as {{raffle_description}}. */
    RAFFLE_DESCRIPTION = "raffle_description",
    /** Raffle entries (comma-separated). Use as {{raffle_entries}}. */
    RAFFLE_ENTRIES = "raffle_entries",
    /** Raffle generated number. Use as {{raffle_generated_number}}. */
    RAFFLE_GENERATED_NUMBER = "raffle_generated_number",
    /** Raffle entries count. Use as {{raffle_entries_count}}. */
    RAFFLE_ENTRIES_COUNT = "raffle_entries_count",
    /** Raffle winners (comma-separated). Use as {{raffle_winners}}. */
    RAFFLE_WINNERS = "raffle_winners",
    /** Raffle type/mode. Use as {{raffle_type}}. */
    RAFFLE_TYPE = "raffle_type",
    /** Current/last raffle winner username. Use as {{raffle_winner}}. */
    RAFFLE_WINNER = "raffle_winner",
    /** Raffle winner avatar URL. Use as {{raffle_winner_avatar}}. */
    RAFFLE_WINNER_AVATAR = "raffle_winner_avatar",
    /** Command used to enter the raffle (e.g., !join). Use as {{raffle_entry_command}}. */
    RAFFLE_ENTRY_COMMAND = "raffle_entry_command",
    /** Tournament title. Use as {{tournament_title}}. */
    TOURNAMENT_TITLE = "tournament_title",
    /** Tournament description. Use as {{tournament_description}}. */
    TOURNAMENT_DESCRIPTION = "tournament_description",
    /** Tournament game. Use as {{tournament_game}}. */
    TOURNAMENT_GAME = "tournament_game",
    /** Tournament format. Use as {{tournament_format}}. */
    TOURNAMENT_FORMAT = "tournament_format",
    /** Tournament state. Use as {{tournament_state}}. */
    TOURNAMENT_STATE = "tournament_state",
    /** Tournament participants count. Use as {{tournament_participants_count}}. */
    TOURNAMENT_PARTICIPANTS_COUNT = "tournament_participants_count",
    /** Tournament entry command (e.g., !tournament). Use as {{tournament_entry_command}}. */
    TOURNAMENT_ENTRY_COMMAND = "tournament_entry_command",
    /** Tournament winner. Use as {{tournament_winner}}. */
    TOURNAMENT_WINNER = "tournament_winner",
    /** Tournament winner avatar URL. Use as {{tournament_winner_avatar}}. */
    TOURNAMENT_WINNER_AVATAR = "tournament_winner_avatar",
    /** Viewer queue title. Use as {{viewerqueue_title}}. */
    VIEWERQUEUE_TITLE = "viewerqueue_title",
    /** Viewer queue entry command (e.g., !joinq). Use as {{viewerqueue_entry_command}}. */
    VIEWERQUEUE_ENTRY_COMMAND = "viewerqueue_entry_command",
    /** Viewer queue entries (comma-separated). Use as {{viewerqueue_entries}}. */
    VIEWERQUEUE_ENTRIES = "viewerqueue_entries",
    /** Viewer queue selected players (comma-separated). Use as {{viewerqueue_players}}. */
    VIEWERQUEUE_PLAYERS = "viewerqueue_players",
    /** Viewer queue entries count. Use as {{viewerqueue_entries_count}}. */
    VIEWERQUEUE_ENTRIES_COUNT = "viewerqueue_entries_count",
    /** Viewer queue max entries limit. Use as {{viewerqueue_queue_limit}}. */
    VIEWERQUEUE_QUEUE_LIMIT = "viewerqueue_queue_limit",
    /** Achievement id. Use as {{achievement_id}}. */
    ACHIEVEMENT_ID = "achievement_id",
    /** Achievement name. Use as {{achievement_name}}. */
    ACHIEVEMENT_NAME = "achievement_name",
    /** Achievement description. Use as {{achievement_description}}. */
    ACHIEVEMENT_DESCRIPTION = "achievement_description",
    /** Achievements completed count. Use as {{achievements_completed}}. */
    ACHIEVEMENTS_COMPLETED = "achievements_completed",
    /** Achievements total count. Use as {{achievements_total}}. */
    ACHIEVEMENTS_TOTAL = "achievements_total",
    /** Achievement completion percent. Use as {{achievements_percent}}. */
    ACHIEVEMENTS_PERCENT = "achievements_percent",
    /** Response from most recent API Action (JSON stringified). Use as {{api_action_global_response}}. */
    API_ACTION_GLOBAL_RESPONSE = "api_action_global_response",
    /** Last RANDOM_INPUT selection. Use as {{last_random_input}}. */
    LAST_RANDOM_INPUT = "last_random_input",
    /** Loyalty currency display name (e.g., Lumipoints). Use as {{loyalty_currency_name}}. */
    LOYALTY_CURRENCY_NAME = "loyalty_currency_name",
    /** Time a user has followed (followage). Use as {{twitch_followage}}. */
    TWITCH_FOLLOWAGE = "twitch_followage",
    /** Time until next ad. Use as {{twitch_next_ad}}. */
    TWITCH_NEXT_AD = "twitch_next_ad",
    /** Get avatar by username. Example: {{twitch_get_avatar={{message}}}}. Use as {{twitch_get_avatar}}. */
    TWITCH_GET_AVATAR = "twitch_get_avatar",
    /** Channel user ID. Use as {{twitch_user_id}}. */
    TWITCH_USER_ID = "twitch_user_id",
    /** Channel username. Use as {{twitch_username}}. */
    TWITCH_USERNAME = "twitch_username",
    /** Current viewer count. Use as {{twitch_current_viewer_count}}. */
    TWITCH_CURRENT_VIEWER_COUNT = "twitch_current_viewer_count",
    /** Current viewers (comma-separated). Use as {{twitch_current_viewers}}. */
    TWITCH_CURRENT_VIEWERS = "twitch_current_viewers",
    /** Lifetime follower count. Use as {{twitch_total_follower_count}}. */
    TWITCH_TOTAL_FOLLOWER_COUNT = "twitch_total_follower_count",
    /** Current followers (comma-separated). Use as {{twitch_current_followers}}. */
    TWITCH_CURRENT_FOLLOWERS = "twitch_current_followers",
    /** Session followers count. Use as {{twitch_session_follower_count}}. */
    TWITCH_SESSION_FOLLOWER_COUNT = "twitch_session_follower_count",
    /** Followers for the current calendar week. Use as {{twitch_week_follower_count}}. */
    TWITCH_WEEK_FOLLOWER_COUNT = "twitch_week_follower_count",
    /** Followers for the current calendar month. Use as {{twitch_month_follower_count}}. */
    TWITCH_MONTH_FOLLOWER_COUNT = "twitch_month_follower_count",
    /** Current subscribers (comma-separated). Use as {{twitch_current_subscribers}}. */
    TWITCH_CURRENT_SUBSCRIBERS = "twitch_current_subscribers",
    /** Lifetime total subs. Use as {{twitch_total_subscriber_count}}. */
    TWITCH_TOTAL_SUBSCRIBER_COUNT = "twitch_total_subscriber_count",
    /** Session subs count. Use as {{twitch_session_subscribers_count}}. */
    TWITCH_SESSION_SUBSCRIBERS_COUNT = "twitch_session_subscribers_count",
    /** Session NEW subscribers (excluding resubs / gifts). Use as {{twitch_session_new_subscribers_count}}. */
    TWITCH_SESSION_NEW_SUBSCRIBERS_COUNT = "twitch_session_new_subscribers_count",
    /** Session resubscribers (excluding new / gifts). Use as {{twitch_session_resub_subscribers_count}}. */
    TWITCH_SESSION_RESUB_SUBSCRIBERS_COUNT = "twitch_session_resub_subscribers_count",
    /** Session gifted subscribers. Use as {{twitch_session_gifted_subscribers_count}}. */
    TWITCH_SESSION_GIFTED_SUBSCRIBERS_COUNT = "twitch_session_gifted_subscribers_count",
    /** Subscribers for the current calendar week. Use as {{twitch_week_subscriber_count}}. */
    TWITCH_WEEK_SUBSCRIBER_COUNT = "twitch_week_subscriber_count",
    /** Subscribers for the current calendar month. Use as {{twitch_month_subscriber_count}}. */
    TWITCH_MONTH_SUBSCRIBER_COUNT = "twitch_month_subscriber_count",
    /** Session gifts count. Use as {{twitch_session_gifts_count}}. */
    TWITCH_SESSION_GIFTS_COUNT = "twitch_session_gifts_count",
    /** All-time top gifter. Use as {{twitch_alltime_top_gifter}}. */
    TWITCH_ALLTIME_TOP_GIFTER = "twitch_alltime_top_gifter",
    /** Lifetime gift count for TWITCH_ALLTIME_TOP_GIFTER. Use as {{twitch_alltime_top_gifter_amount}}. */
    TWITCH_ALLTIME_TOP_GIFTER_AMOUNT = "twitch_alltime_top_gifter_amount",
    /** Lifetime gift members count. Use as {{twitch_total_gift_subscription_count}}. */
    TWITCH_TOTAL_GIFT_SUBSCRIPTION_COUNT = "twitch_total_gift_subscription_count",
    /** Current moderators (comma-separated). Use as {{twitch_current_mods}}. */
    TWITCH_CURRENT_MODS = "twitch_current_mods",
    /** Last follower. Use as {{twitch_last_follower}}. */
    TWITCH_LAST_FOLLOWER = "twitch_last_follower",
    /** Session followers list. Use as {{twitch_session_follower}}. */
    TWITCH_SESSION_FOLLOWERS = "twitch_session_follower",
    /** Last subscriber of any kind (new sub, resub, or recipient of a gift). Use as {{twitch_last_subscriber}}. */
    TWITCH_LAST_SUBSCRIBER = "twitch_last_subscriber",
    /** Last person to subscribe for the first time (excludes resubs and gift-recipients). Use as {{twitch_last_new_subscriber}}. */
    TWITCH_LAST_NEW_SUBSCRIBER = "twitch_last_new_subscriber",
    /** Last person to extend an existing subscription (any month past month 1, consecutive or not). Use as {{twitch_last_resubscriber}}. */
    TWITCH_LAST_RESUBSCRIBER = "twitch_last_resubscriber",
    /** Last gifter (the person who sent the gift). Use as {{twitch_last_gifter}}. */
    TWITCH_LAST_GIFTER = "twitch_last_gifter",
    /** Last gifted sub amount (number of subs in the last gift drop). Use as {{twitch_last_gifter_amount}}. */
    TWITCH_LAST_GIFTER_AMOUNT = "twitch_last_gifter_amount",
    /** Last gift recipient (the person who received the most recent gifted sub). Use as {{twitch_last_gifted}}. */
    TWITCH_LAST_GIFTED = "twitch_last_gifted",
    /** Session subscribers list. Use as {{twitch_session_subscribers}}. */
    TWITCH_SESSION_SUBSCRIBERS = "twitch_session_subscribers",
    /** Session chat count. Use as {{twitch_session_chat_count}}. */
    TWITCH_SESSION_CHAT_COUNT = "twitch_session_chat_count",
    /** Current first chatter. Use as {{twitch_current_first_chatter}}. */
    TWITCH_CURRENT_FIRST_CHATTER = "twitch_current_first_chatter",
    /** Current first chatter count. Use as {{twitch_current_first_chatter_count}}. */
    TWITCH_CURRENT_FIRST_CHATTER_COUNT = "twitch_current_first_chatter_count",
    /** Previous first chatter. Use as {{twitch_previous_first_chatter}}. */
    TWITCH_PREVIOUS_FIRST_CHATTER = "twitch_previous_first_chatter",
    /** Previous first chatter count. Use as {{twitch_previous_first_chatter_count}}. */
    TWITCH_PREVIOUS_FIRST_CHATTER_COUNT = "twitch_previous_first_chatter_count",
    /** Last chatter. Use as {{twitch_last_chatter}}. */
    TWITCH_LAST_CHATTER = "twitch_last_chatter",
    /** Last raider. Use as {{twitch_last_raider}}. */
    TWITCH_LAST_RAIDER = "twitch_last_raider",
    /** Last raid amount. Use as {{twitch_last_raid_amount}}. */
    TWITCH_LAST_RAID_AMOUNT = "twitch_last_raid_amount",
    /** Session raiders list. Use as {{twitch_session_raiders}}. */
    TWITCH_SESSION_RAIDERS = "twitch_session_raiders",
    /** Lifetime bits total. Use as {{twitch_total_bits_count}}. */
    TWITCH_TOTAL_BITS_COUNT = "twitch_total_bits_count",
    /** Session bits count. Use as {{twitch_session_bits_count}}. */
    TWITCH_SESSION_BITS_COUNT = "twitch_session_bits_count",
    /** Bits for the current calendar week. Use as {{twitch_week_bits_count}}. */
    TWITCH_WEEK_BITS_COUNT = "twitch_week_bits_count",
    /** Bits for the current calendar month. Use as {{twitch_month_bits_count}}. */
    TWITCH_MONTH_BITS_COUNT = "twitch_month_bits_count",
    /** Last bit sender. Use as {{twitch_last_bit}}. */
    TWITCH_LAST_BIT = "twitch_last_bit",
    /** Last bit amount. Use as {{twitch_last_bit_amount}}. */
    TWITCH_LAST_BIT_AMOUNT = "twitch_last_bit_amount",
    /** Session bits list. Use as {{twitch_session_bits}}. */
    TWITCH_SESSION_BITS = "twitch_session_bits",
    /** Session bits with amounts list. Use as {{twitch_session_bits_with_amount}}. */
    TWITCH_SESSION_BITS_WITH_AMOUNT = "twitch_session_bits_with_amount",
    /** Top single cheer this session. Use as {{twitch_session_top_cheer}}. */
    TWITCH_SESSION_TOP_CHEER = "twitch_session_top_cheer",
    /** Amount for TWITCH_SESSION_TOP_CHEER. Use as {{twitch_session_top_cheer_amount}}. */
    TWITCH_SESSION_TOP_CHEER_AMOUNT = "twitch_session_top_cheer_amount",
    /** Top cheerer this session (by total bits). Use as {{twitch_session_top_cheerer}}. */
    TWITCH_SESSION_TOP_CHEERER = "twitch_session_top_cheerer",
    /** Total bits for TWITCH_SESSION_TOP_CHEERER. Use as {{twitch_session_top_cheerer_amount}}. */
    TWITCH_SESSION_TOP_CHEERER_AMOUNT = "twitch_session_top_cheerer_amount",
    /** Top cheerer for the current calendar week. Use as {{twitch_week_top_cheerer}}. */
    TWITCH_WEEK_TOP_CHEERER = "twitch_week_top_cheerer",
    /** Total bits for TWITCH_WEEK_TOP_CHEERER. Use as {{twitch_week_top_cheerer_amount}}. */
    TWITCH_WEEK_TOP_CHEERER_AMOUNT = "twitch_week_top_cheerer_amount",
    /** Top cheerer for the current calendar month. Use as {{twitch_month_top_cheerer}}. */
    TWITCH_MONTH_TOP_CHEERER = "twitch_month_top_cheerer",
    /** Total bits for TWITCH_MONTH_TOP_CHEERER. Use as {{twitch_month_top_cheerer_amount}}. */
    TWITCH_MONTH_TOP_CHEERER_AMOUNT = "twitch_month_top_cheerer_amount",
    /** Whether a hype train is currently active (true/false). Use as {{twitch_hypetrain_active}}. */
    TWITCH_HYPETRAIN_ACTIVE = "twitch_hypetrain_active",
    /** Current hype train level. Use as {{twitch_hypetrain_level}}. */
    TWITCH_HYPETRAIN_LEVEL = "twitch_hypetrain_level",
    /** Current hype train progress toward the next level. Use as {{twitch_hypetrain_progress}}. */
    TWITCH_HYPETRAIN_PROGRESS = "twitch_hypetrain_progress",
    /** Target value to reach the next hype train level. Use as {{twitch_hypetrain_level_goal}}. */
    TWITCH_HYPETRAIN_LEVEL_GOAL = "twitch_hypetrain_level_goal",
    /** Total contributions this hype train (running sum). Use as {{twitch_hypetrain_total}}. */
    TWITCH_HYPETRAIN_TOTAL = "twitch_hypetrain_total",
    /** Top contributor for the current hype train. Use as {{twitch_hypetrain_top_contributor}}. */
    TWITCH_HYPETRAIN_TOP_CONTRIBUTOR = "twitch_hypetrain_top_contributor",
    /** Amount contributed by TWITCH_HYPETRAIN_TOP_CONTRIBUTOR. Use as {{twitch_hypetrain_top_contributor_amount}}. */
    TWITCH_HYPETRAIN_TOP_CONTRIBUTOR_AMOUNT = "twitch_hypetrain_top_contributor_amount",
    /** All-time top cheerer (by total bits). Use as {{twitch_alltime_top_cheerer}}. */
    TWITCH_ALLTIME_TOP_CHEERER = "twitch_alltime_top_cheerer",
    /** Total bits for TWITCH_ALLTIME_TOP_CHEERER. Use as {{twitch_alltime_top_cheerer_amount}}. */
    TWITCH_ALLTIME_TOP_CHEERER_AMOUNT = "twitch_alltime_top_cheerer_amount",
    /** Top cheerers list (top 10, comma-separated usernames, sorted by total bits). Use as {{top_cheerer_list}}. */
    TOP_CHEERER_LIST = "top_cheerer_list",
    /** Total bits for TOP_CHEERER_LIST (parallel comma-separated). Use as {{top_cheerer_list_amount}}. */
    TOP_CHEERER_LIST_AMOUNT = "top_cheerer_list_amount",
    /** Top cheerers this week (top 10, comma-separated usernames). Use as {{week_top_cheerer_list}}. */
    WEEK_TOP_CHEERER_LIST = "week_top_cheerer_list",
    /** Total bits for WEEK_TOP_CHEERER_LIST (parallel comma-separated). Use as {{week_top_cheerer_list_amount}}. */
    WEEK_TOP_CHEERER_LIST_AMOUNT = "week_top_cheerer_list_amount",
    /** Top cheerers this month. Use as {{month_top_cheerer_list}}. */
    MONTH_TOP_CHEERER_LIST = "month_top_cheerer_list",
    /** Total bits for MONTH_TOP_CHEERER_LIST. Use as {{month_top_cheerer_list_amount}}. */
    MONTH_TOP_CHEERER_LIST_AMOUNT = "month_top_cheerer_list_amount",
    /** Top gifters list (top 10, comma-separated usernames, sorted by lifetime gifted subs). Use as {{top_gifter_list}}. */
    TOP_GIFTER_LIST = "top_gifter_list",
    /** Total gifts for TOP_GIFTER_LIST (parallel comma-separated). Use as {{top_gifter_list_amount}}. */
    TOP_GIFTER_LIST_AMOUNT = "top_gifter_list_amount",
    /** Top gifters this week. Use as {{week_top_gifter_list}}. */
    WEEK_TOP_GIFTER_LIST = "week_top_gifter_list",
    /** Total gifts for WEEK_TOP_GIFTER_LIST. Use as {{week_top_gifter_list_amount}}. */
    WEEK_TOP_GIFTER_LIST_AMOUNT = "week_top_gifter_list_amount",
    /** Top gifters this month. Use as {{month_top_gifter_list}}. */
    MONTH_TOP_GIFTER_LIST = "month_top_gifter_list",
    /** Total gifts for MONTH_TOP_GIFTER_LIST. Use as {{month_top_gifter_list_amount}}. */
    MONTH_TOP_GIFTER_LIST_AMOUNT = "month_top_gifter_list_amount",
    /** Last clip ID. Use as {{twitch_last_clip_id}}. */
    TWITCH_LAST_CLIP_ID = "twitch_last_clip_id",
    /** Last clip URL. Use as {{twitch_last_clip_url}}. */
    TWITCH_LAST_CLIP_URL = "twitch_last_clip_url",
    /** Last clip thumbnail URL. Use as {{twitch_last_clip_thumbnail_url}}. */
    TWITCH_LAST_CLIP_THUMBNAIL_URL = "twitch_last_clip_thumbnail_url",
    /** Channel title. Use as {{twitch_channel_title}}. */
    TWITCH_CHANNEL_TITLE = "twitch_channel_title",
    /** Channel description. Use as {{twitch_channel_description}}. */
    TWITCH_CHANNEL_DESCRIPTION = "twitch_channel_description",
    /** Channel avatar URL. Use as {{twitch_avatar}}. */
    TWITCH_AVATAR = "twitch_avatar",
    /** Offline image URL. Use as {{twitch_offline_image}}. */
    TWITCH_OFFLINE_IMAGE = "twitch_offline_image",
    /** Current category/game. Use as {{twitch_category}}. */
    TWITCH_CATEGORY = "twitch_category",
    /** Current category/game ID. Use as {{twitch_category_id}}. */
    TWITCH_CATEGORY_ID = "twitch_category_id",
    /** Current poll ID. Use as {{twitch_current_poll_id}}. */
    TWITCH_CURRENT_POLL_ID = "twitch_current_poll_id",
    /** Current prediction ID. Use as {{twitch_current_prediction_id}}. */
    TWITCH_CURRENT_PREDICTION_ID = "twitch_current_prediction_id",
    /** Channel id. Use as {{youtube_channel_id}}. */
    YOUTUBE_CHANNEL_ID = "youtube_channel_id",
    /** Channel username (custom URL slug, falls back to channel title). Use as {{youtube_username}}. */
    YOUTUBE_USERNAME = "youtube_username",
    /** Current viewer count. Use as {{youtube_current_viewer_count}}. */
    YOUTUBE_CURRENT_VIEWER_COUNT = "youtube_current_viewer_count",
    /** Total viewer count (stream). Use as {{youtube_total_viewer_count}}. */
    YOUTUBE_TOTAL_VIEWER_COUNT = "youtube_total_viewer_count",
    /** Stream likes. Use as {{youtube_stream_likes}}. */
    YOUTUBE_STREAM_LIKES = "youtube_stream_likes",
    /** Stream dislikes. Use as {{youtube_stream_dislikes}}. */
    YOUTUBE_STREAM_DISLIKES = "youtube_stream_dislikes",
    /** Stream chat message count. Use as {{youtube_stream_chat_count}}. */
    YOUTUBE_STREAM_CHAT_COUNT = "youtube_stream_chat_count",
    /** Session chat count. Use as {{youtube_session_chat_count}}. */
    YOUTUBE_SESSION_CHAT_COUNT = "youtube_session_chat_count",
    /** Current first chatter. Use as {{youtube_current_first_chatter}}. */
    YOUTUBE_CURRENT_FIRST_CHATTER = "youtube_current_first_chatter",
    /** Current first chatter count. Use as {{youtube_current_first_chatter_count}}. */
    YOUTUBE_CURRENT_FIRST_CHATTER_COUNT = "youtube_current_first_chatter_count",
    /** Previous first chatter. Use as {{youtube_previous_first_chatter}}. */
    YOUTUBE_PREVIOUS_FIRST_CHATTER = "youtube_previous_first_chatter",
    /** Previous first chatter count. Use as {{youtube_previous_first_chatter_count}}. */
    YOUTUBE_PREVIOUS_FIRST_CHATTER_COUNT = "youtube_previous_first_chatter_count",// keep exact value
    /** Last chatter. Use as {{youtube_last_chatter}}. */
    YOUTUBE_LAST_CHATTER = "youtube_last_chatter",
    /** Session subscriber count. Use as {{youtube_session_subscriber_count}}. */
    YOUTUBE_SESSION_SUBSCRIBER_COUNT = "youtube_session_subscriber_count",
    /** Subscribers for the current calendar week. Use as {{youtube_week_subscriber_count}}. */
    YOUTUBE_WEEK_SUBSCRIBER_COUNT = "youtube_week_subscriber_count",
    /** Subscribers for the current calendar month. Use as {{youtube_month_subscriber_count}}. */
    YOUTUBE_MONTH_SUBSCRIBER_COUNT = "youtube_month_subscriber_count",
    /** Lifetime subscriber count. Use as {{youtube_total_subscriber_count}}. */
    YOUTUBE_TOTAL_SUBSCRIBER_COUNT = "youtube_total_subscriber_count",
    /** Session SuperChat count. Use as {{youtube_session_superchat_count}}. */
    YOUTUBE_SESSION_SUPERCHAT_COUNT = "youtube_session_superchat_count",
    /** Last SuperChatter. Use as {{youtube_last_superchatter}}. */
    YOUTUBE_LAST_SUPERCHATTER = "youtube_last_superchatter",
    /** Session SuperChatters (list). Use as {{youtube_session_superchatters}}. */
    YOUTUBE_SESSION_SUPERCHATTERS = "youtube_session_superchatters",
    /** Session SuperSticker count. Use as {{youtube_session_supersticker_count}}. */
    YOUTUBE_SESSION_SUPERSTICKER_COUNT = "youtube_session_supersticker_count",
    /** Last SuperSticker sender. Use as {{youtube_last_supersticker}}. */
    YOUTUBE_LAST_SUPERSTICKER = "youtube_last_supersticker",
    /** Session SuperStickers (list). Use as {{youtube_session_superstickers}}. */
    YOUTUBE_SESSION_SUPERSTICKERS = "youtube_session_superstickers",
    /** Lifetime member count. Use as {{youtube_total_member_count}}. */
    YOUTUBE_TOTAL_MEMBER_COUNT = "youtube_total_member_count",
    /** Session member count. Use as {{youtube_session_member_count}}. */
    YOUTUBE_SESSION_MEMBER_COUNT = "youtube_session_member_count",
    /** Members for the current calendar week. Use as {{youtube_week_member_count}}. */
    YOUTUBE_WEEK_MEMBER_COUNT = "youtube_week_member_count",
    /** Members for the current calendar month. Use as {{youtube_month_member_count}}. */
    YOUTUBE_MONTH_MEMBER_COUNT = "youtube_month_member_count",
    /** Last member. Use as {{youtube_last_member}}. */
    YOUTUBE_LAST_MEMBER = "youtube_last_member",
    /** Session members (list). Use as {{youtube_session_members}}. */
    YOUTUBE_SESSION_MEMBERS = "youtube_session_members",
    /** Lifetime gift members count. Use as {{youtube_total_gift_members_count}}. */
    YOUTUBE_TOTAL_GIFT_MEMBERS_COUNT = "youtube_total_gift_members_count",
    /** Session gift members count. Use as {{youtube_session_gift_members_count}}. */
    YOUTUBE_SESSION_GIFT_MEMBERS_COUNT = "youtube_session_gift_members_count",
    /** Last gift member. Use as {{youtube_last_gift_member}}. */
    YOUTUBE_LAST_GIFT_MEMBER = "youtube_last_gift_member",
    /** Session gift members (list). Use as {{youtube_session_gift_members}}. */
    YOUTUBE_SESSION_GIFT_MEMBERS = "youtube_session_gift_members",
    /** Lifetime jewels count. Use as {{youtube_total_jewels_count}}. */
    YOUTUBE_TOTAL_JEWELS_COUNT = "youtube_total_jewels_count",
    /** Session jewels count. Use as {{youtube_session_jewels_count}}. */
    YOUTUBE_SESSION_JEWELS_COUNT = "youtube_session_jewels_count",
    /** Last jewel amount. Use as {{youtube_last_jewels}}. */
    YOUTUBE_LAST_JEWELS = "youtube_last_jewels",
    /** Last user that sent jewels. Use as {{youtube_last_jewels_user}}. */
    YOUTUBE_LAST_JEWELS_USER = "youtube_last_jewels_user",
    /** Session jewel gifters (list). Use as {{youtube_session_jewels_gifters}}. */
    YOUTUBE_SESSION_JEWELS_GIFTERS = "youtube_session_jewels_gifters",
    /** Last subscriber. Use as {{youtube_last_subscriber}}. */
    YOUTUBE_LAST_SUBSCRIBER = "youtube_last_subscriber",
    /** Total uploaded videos. Use as {{youtube_total_video_count}}. */
    YOUTUBE_TOTAL_VIDEO_COUNT = "youtube_total_video_count",
    /** Total channel views. Use as {{youtube_total_view_count}}. */
    YOUTUBE_TOTAL_VIEW_COUNT = "youtube_total_view_count",
    /** Page / user id. Use as {{facebook_user_id}}. */
    FACEBOOK_USER_ID = "facebook_user_id",
    /** Page / user username. Use as {{facebook_username}}. */
    FACEBOOK_USERNAME = "facebook_username",
    /** Session chat count. Use as {{facebook_session_chat_count}}. */
    FACEBOOK_SESSION_CHAT_COUNT = "facebook_session_chat_count",
    /** Current first chatter. Use as {{facebook_current_first_chatter}}. */
    FACEBOOK_CURRENT_FIRST_CHATTER = "facebook_current_first_chatter",
    /** Current first chatter count. Use as {{facebook_current_first_chatter_count}}. */
    FACEBOOK_CURRENT_FIRST_CHATTER_COUNT = "facebook_current_first_chatter_count",
    /** Previous first chatter. Use as {{facebook_previous_first_chatter}}. */
    FACEBOOK_PREVIOUS_FIRST_CHATTER = "facebook_previous_first_chatter",
    /** Previous first chatter count. Use as {{facebook_previous_first_chatter_count}}. */
    FACEBOOK_PREVIOUS_FIRST_CHATTER_COUNT = "facebook_previous_first_chatter_count",// keep exact value
    /** Last chatter. Use as {{facebook_last_chatter}}. */
    FACEBOOK_LAST_CHATTER = "facebook_last_chatter",
    /** Lifetime follower count. Use as {{facebook_total_follower_count}}. */
    FACEBOOK_TOTAL_FOLLOWER_COUNT = "facebook_total_follower_count",
    /** Session follower count. Use as {{facebook_session_follower_count}}. */
    FACEBOOK_SESSION_FOLLOWER_COUNT = "facebook_session_follower_count",
    /** Followers for the current calendar week. Use as {{facebook_week_follower_count}}. */
    FACEBOOK_WEEK_FOLLOWER_COUNT = "facebook_week_follower_count",
    /** Followers for the current calendar month. Use as {{facebook_month_follower_count}}. */
    FACEBOOK_MONTH_FOLLOWER_COUNT = "facebook_month_follower_count",
    /** Lifetime fan count. Use as {{facebook_total_fan_count}}. */
    FACEBOOK_TOTAL_FAN_COUNT = "facebook_total_fan_count",
    /** Session fan count. Use as {{facebook_session_fan_count}}. */
    FACEBOOK_SESSION_FAN_COUNT = "facebook_session_fan_count",
    /** Fans for the current calendar week. Use as {{facebook_week_fan_count}}. */
    FACEBOOK_WEEK_FAN_COUNT = "facebook_week_fan_count",
    /** Fans for the current calendar month. Use as {{facebook_month_fan_count}}. */
    FACEBOOK_MONTH_FAN_COUNT = "facebook_month_fan_count",
    /** Session reaction count. Use as {{facebook_reaction_count}}. */
    FACEBOOK_REACTION_COUNT = "facebook_reaction_count",
    /** Last Stars sender. Use as {{facebook_last_star}}. */
    FACEBOOK_LAST_STAR = "facebook_last_star",
    /** Last Stars amount. Use as {{facebook_last_star_amount}}. */
    FACEBOOK_LAST_STAR_AMOUNT = "facebook_last_star_amount",
    /** Session Stars list. Use as {{facebook_session_stars}}. */
    FACEBOOK_SESSION_STARS = "facebook_session_stars",
    /** Session Stars with amounts list. Use as {{facebook_session_stars_with_amount}}. */
    FACEBOOK_SESSION_STARS_WITH_AMOUNT = "facebook_session_stars_with_amount",
    /** Channel user id. Use as {{tiktok_user_id}}. */
    TIKTOK_USER_ID = "tiktok_user_id",
    /** Channel username. Use as {{tiktok_username}}. */
    TIKTOK_USERNAME = "tiktok_username",
    /** Session chat count. Use as {{tiktok_session_chat_count}}. */
    TIKTOK_SESSION_CHAT_COUNT = "tiktok_session_chat_count",
    /** Current first chatter. Use as {{tiktok_current_first_chatter}}. */
    TIKTOK_CURRENT_FIRST_CHATTER = "tiktok_current_first_chatter",
    /** Current first chatter count. Use as {{tiktok_current_first_chatter_count}}. */
    TIKTOK_CURRENT_FIRST_CHATTER_COUNT = "tiktok_current_first_chatter_count",
    /** Previous first chatter. Use as {{tiktok_previous_first_chatter}}. */
    TIKTOK_PREVIOUS_FIRST_CHATTER = "tiktok_previous_first_chatter",
    /** Previous first chatter count. Use as {{tiktok_previous_first_chatter_count}}. */
    TIKTOK_PREVIOUS_FIRST_CHATTER_COUNT = "tiktok_previous_first_chatter_count",// keep exact value
    /** Last chatter. Use as {{tiktok_last_chatter}}. */
    TIKTOK_LAST_CHATTER = "tiktok_last_chatter",
    /** Current viewer count. Use as {{tiktok_current_viewer_count}}. */
    TIKTOK_CURRENT_VIEWER_COUNT = "tiktok_current_viewer_count",
    /** Lifetime follower count. Use as {{tiktok_total_follower_count}}. */
    TIKTOK_TOTAL_FOLLOWER_COUNT = "tiktok_total_follower_count",
    /** Session follower count. Use as {{tiktok_session_follower_count}}. */
    TIKTOK_SESSION_FOLLOWER_COUNT = "tiktok_session_follower_count",
    /** Followers for the current calendar week. Use as {{tiktok_week_follower_count}}. */
    TIKTOK_WEEK_FOLLOWER_COUNT = "tiktok_week_follower_count",
    /** Followers for the current calendar month. Use as {{tiktok_month_follower_count}}. */
    TIKTOK_MONTH_FOLLOWER_COUNT = "tiktok_month_follower_count",
    /** Session super fan count. Use as {{tiktok_session_super_fan_count}}. */
    TIKTOK_SESSION_SUPER_FAN_COUNT = "tiktok_session_super_fan_count",
    /** Session share count. Use as {{tiktok_session_share_count}}. */
    TIKTOK_SESSION_SHARE_COUNT = "tiktok_session_share_count",
    /** Last follower. Use as {{tiktok_last_follower}}. */
    TIKTOK_LAST_FOLLOWER = "tiktok_last_follower",
    /** Last super fan. Use as {{tiktok_last_super_fan}}. */
    TIKTOK_LAST_SUPER_FAN = "tiktok_last_super_fan",
    /** Last gifter. Use as {{tiktok_last_gifter}}. */
    TIKTOK_LAST_GIFTER = "tiktok_last_gifter",
    /** Session gifters (list). Use as {{tiktok_session_gifters}}. */
    TIKTOK_SESSION_GIFTERS = "tiktok_session_gifters",
    /** Session gifts (count/list). Use as {{tiktok_session_gifts}}. */
    TIKTOK_SESSION_GIFTS = "tiktok_session_gifts",
    /** Total gifts. Use as {{tiktok_total_gifts}}. */
    TIKTOK_TOTAL_GIFTS = "tiktok_total_gifts",
    /** Total likes. Use as {{tiktok_total_likes}}. */
    TIKTOK_TOTAL_LIKES = "tiktok_total_likes",
    /** Uploaded videos count. Use as {{tiktok_video_count}}. */
    TIKTOK_VIDEO_COUNT = "tiktok_video_count",
    /** Last video title. Use as {{tiktok_last_video_title}}. */
    TIKTOK_LAST_VIDEO_TITLE = "tiktok_last_video_title",
    /** Last video ID. Use as {{tiktok_last_video_id}}. */
    TIKTOK_LAST_VIDEO_ID = "tiktok_last_video_id",
    /** Last video link. Use as {{tiktok_last_video_link}}. */
    TIKTOK_LAST_VIDEO_LINK = "tiktok_last_video_link",
    /** Last video embed URL. Use as {{tiktok_last_video_embed}}. */
    TIKTOK_LAST_VIDEO_EMBED = "tiktok_last_video_embed",
    /** Channel user ID. Use as {{kick_user_id}}. */
    KICK_USER_ID = "kick_user_id",
    /** Channel username. Use as {{kick_username}}. */
    KICK_USERNAME = "kick_username",
    /** Channel title. Use as {{kick_channel_title}}. */
    KICK_CHANNEL_TITLE = "kick_channel_title",
    /** Channel description. Use as {{kick_channel_description}}. */
    KICK_CHANNEL_DESCRIPTION = "kick_channel_description",
    /** Channel avatar URL. Use as {{kick_avatar}}. */
    KICK_AVATAR = "kick_avatar",
    /** Current category. Use as {{kick_category}}. */
    KICK_CATEGORY = "kick_category",
    /** Current category ID. Use as {{kick_category_id}}. */
    KICK_CATEGORY_ID = "kick_category_id",
    /** Stream title. Use as {{kick_stream_title}}. */
    KICK_STREAM_TITLE = "kick_stream_title",
    /** Session chat count. Use as {{kick_session_chat_count}}. */
    KICK_SESSION_CHAT_COUNT = "kick_session_chat_count",
    /** Current first chatter. Use as {{kick_current_first_chatter}}. */
    KICK_CURRENT_FIRST_CHATTER = "kick_current_first_chatter",
    /** Current first chatter count. Use as {{kick_current_first_chatter_count}}. */
    KICK_CURRENT_FIRST_CHATTER_COUNT = "kick_current_first_chatter_count",
    /** Previous first chatter. Use as {{kick_previous_first_chatter}}. */
    KICK_PREVIOUS_FIRST_CHATTER = "kick_previous_first_chatter",
    /** Previous first chatter count. Use as {{kick_previous_first_chatter_count}}. */
    KICK_PREVIOUS_FIRST_CHATTER_COUNT = "kick_previous_first_chatter_count",// keep exact value
    /** Last chatter. Use as {{kick_last_chatter}}. */
    KICK_LAST_CHATTER = "kick_last_chatter",
    /** Current viewer count. Use as {{kick_current_viewer_count}}. */
    KICK_CURRENT_VIEWER_COUNT = "kick_current_viewer_count",
    /** Lifetime follower count. Use as {{kick_total_follower_count}}. */
    KICK_TOTAL_FOLLOWER_COUNT = "kick_total_follower_count",
    /** Session follower count. Use as {{kick_session_follower_count}}. */
    KICK_SESSION_FOLLOWER_COUNT = "kick_session_follower_count",
    /** Followers for the current calendar week. Use as {{kick_week_follower_count}}. */
    KICK_WEEK_FOLLOWER_COUNT = "kick_week_follower_count",
    /** Followers for the current calendar month. Use as {{kick_month_follower_count}}. */
    KICK_MONTH_FOLLOWER_COUNT = "kick_month_follower_count",
    /** Lifetime total subs. Use as {{kick_total_subscriber_count}}. */
    KICK_TOTAL_SUBSCRIBER_COUNT = "kick_total_subscriber_count",
    /** Session subs count. Use as {{kick_session_subscriber_count}}. */
    KICK_SESSION_SUBSCRIBER_COUNT = "kick_session_subscriber_count",
    /** Subscribers for the current calendar week. Use as {{kick_week_subscriber_count}}. */
    KICK_WEEK_SUBSCRIBER_COUNT = "kick_week_subscriber_count",
    /** Subscribers for the current calendar month. Use as {{kick_month_subscriber_count}}. */
    KICK_MONTH_SUBSCRIBER_COUNT = "kick_month_subscriber_count",
    /** Session gifts count. Use as {{kick_session_gifts_count}}. */
    KICK_SESSION_GIFTS_COUNT = "kick_session_gifts_count",
    /** Session subscribers list. Use as {{kick_session_subscribers}}. */
    KICK_SESSION_SUBSCRIBERS = "kick_session_subscribers",
    /** Last user to send a Kicks. Use as {{kick_last_kicks}}. */
    KICK_LAST_KICKS = "kick_last_kicks",
    /** Last amount of a Kicks sent. Use as {{kick_last_kicks_amount}}. */
    KICK_LAST_KICKS_AMOUNT = "kick_last_kicks_amount",
    /** Lifetime kicks count. Use as {{kick_total_kicks_count}}. */
    KICK_TOTAL_KICKS_COUNT = "kick_total_kicks_count",
    /** Session kicks count. Use as {{kick_session_kicks_count}}. */
    KICK_SESSION_KICKS_COUNT = "kick_session_kicks_count",
    /** Session kicks list. Use as {{kick_session_kicks}}. */
    KICK_SESSION_KICKS = "kick_session_kicks",
    /** Session kicks with amounts list. Use as {{kick_session_kicks_with_amount}}. */
    KICK_SESSION_KICKS_WITH_AMOUNT = "kick_session_kicks_with_amount",
    /** Last follower. Use as {{kick_last_follower}}. */
    KICK_LAST_FOLLOWER = "kick_last_follower",
    /** Last subscriber. Use as {{kick_last_subscriber}}. */
    KICK_LAST_SUBSCRIBER = "kick_last_subscriber",
    /** Last gifter (the person who sent the gift). Use as {{kick_last_gifter}}. */
    KICK_LAST_GIFTER = "kick_last_gifter",
    /** Last gifted sub amount (number of subs in the last gift drop). Use as {{kick_last_gifter_amount}}. */
    KICK_LAST_GIFTER_AMOUNT = "kick_last_gifter_amount",
    /** Last gift recipient (the person who received the most recent gifted sub on Kick). Use as {{kick_last_gifted}}. */
    KICK_LAST_GIFTED = "kick_last_gifted",
    /** Last host. Use as {{kick_last_host}}. */
    KICK_LAST_HOST = "kick_last_host",
    /** Last host viewer amount. Use as {{kick_last_host_amount}}. */
    KICK_LAST_HOST_AMOUNT = "kick_last_host_amount",
    /** Lifetime gift members count. Use as {{kick_total_gift_subscription_count}}. */
    KICK_TOTAL_GIFT_SUBSCRIPTION_COUNT = "kick_total_gift_subscription_count",
    /** Get avatar by username. Use as {{kick_get_avatar}}. */
    KICK_GET_AVATAR = "kick_get_avatar",
    /** Now playing song title. Use as {{spotify_now_playing_song}}. */
    SPOTIFY_NOW_PLAYING_SONG = "spotify_now_playing_song",
    /** Now playing artwork URL. Use as {{spotify_now_playing_image}}. */
    SPOTIFY_NOW_PLAYING_IMAGE = "spotify_now_playing_image",
    /** Now playing artist(s). Use as {{spotify_now_playing_artist}}. */
    SPOTIFY_NOW_PLAYING_ARTIST = "spotify_now_playing_artist",
    /** Now playing track ID. Use as {{spotify_now_playing_id}}. */
    SPOTIFY_NOW_PLAYING_ID = "spotify_now_playing_id",
    /** Now playing track URL. Use as {{spotify_now_playing_url}}. */
    SPOTIFY_NOW_PLAYING_URL = "spotify_now_playing_url",
    /** Now playing Spotify URI. Use as {{spotify_now_playing_uri}}. */
    SPOTIFY_NOW_PLAYING_URI = "spotify_now_playing_uri",
    /** Now playing track duration in seconds. Use as {{spotify_now_playing_duration}}. */
    SPOTIFY_NOW_PLAYING_DURATION = "spotify_now_playing_duration",
    /** Now playing track progress (current position) in seconds. Use as {{spotify_now_playing_progress}}. */
    SPOTIFY_NOW_PLAYING_PROGRESS = "spotify_now_playing_progress",
    /** Next song title. Use as {{spotify_next_song}}. */
    SPOTIFY_NEXT_SONG = "spotify_next_song",
    /** Next song artwork URL. Use as {{spotify_next_image}}. */
    SPOTIFY_NEXT_IMAGE = "spotify_next_image",
    /** Next song artist(s). Use as {{spotify_next_artist}}. */
    SPOTIFY_NEXT_ARTIST = "spotify_next_artist",
    /** Next song ID. Use as {{spotify_next_id}}. */
    SPOTIFY_NEXT_ID = "spotify_next_id",
    /** Next song URL. Use as {{spotify_next_url}}. */
    SPOTIFY_NEXT_URL = "spotify_next_url",
    /** Next song Spotify URI. Use as {{spotify_next_uri}}. */
    SPOTIFY_NEXT_URI = "spotify_next_uri",
    /** Current queue (comma-separated). Use as {{spotify_queue}}. */
    SPOTIFY_QUEUE = "spotify_queue",
    /** Now playing song title. Use as {{youtubemusic_now_playing_song}}. */
    YOUTUBEMUSIC_NOW_PLAYING_SONG = "youtubemusic_now_playing_song",
    /** Now playing artwork URL. Use as {{youtubemusic_now_playing_image}}. */
    YOUTUBEMUSIC_NOW_PLAYING_IMAGE = "youtubemusic_now_playing_image",
    /** Now playing artist(s). Use as {{youtubemusic_now_playing_artist}}. */
    YOUTUBEMUSIC_NOW_PLAYING_ARTIST = "youtubemusic_now_playing_artist",
    /** Now playing ID. Use as {{youtubemusic_now_playing_id}}. */
    YOUTUBEMUSIC_NOW_PLAYING_ID = "youtubemusic_now_playing_id",
    /** Now playing URL. Use as {{youtubemusic_now_playing_url}}. */
    YOUTUBEMUSIC_NOW_PLAYING_URL = "youtubemusic_now_playing_url",
    /** Now playing track duration in seconds. Use as {{youtubemusic_now_playing_duration}}. */
    YOUTUBEMUSIC_NOW_PLAYING_DURATION = "youtubemusic_now_playing_duration",
    /** Now playing track progress (current position) in seconds. Use as {{youtubemusic_now_playing_progress}}. */
    YOUTUBEMUSIC_NOW_PLAYING_PROGRESS = "youtubemusic_now_playing_progress",
    /** Next song title. Use as {{youtubemusic_next_song}}. */
    YOUTUBEMUSIC_NEXT_SONG = "youtubemusic_next_song",
    /** Next song artwork URL. Use as {{youtubemusic_next_image}}. */
    YOUTUBEMUSIC_NEXT_IMAGE = "youtubemusic_next_image",
    /** Next song artist(s). Use as {{youtubemusic_next_artist}}. */
    YOUTUBEMUSIC_NEXT_ARTIST = "youtubemusic_next_artist",
    /** Next song ID. Use as {{youtubemusic_next_id}}. */
    YOUTUBEMUSIC_NEXT_ID = "youtubemusic_next_id",
    /** Next song URL. Use as {{youtubemusic_next_url}}. */
    YOUTUBEMUSIC_NEXT_URL = "youtubemusic_next_url",
    /** Current queue (comma-separated). Use as {{youtubemusic_queue}}. */
    YOUTUBEMUSIC_QUEUE = "youtubemusic_queue",
    /** Track ID (computed). Use as {{now_playing_id}}. */
    NOW_PLAYING_ID = "now_playing_id",
    /** Track title. Use as {{now_playing_title}}. */
    NOW_PLAYING_TITLE = "now_playing_title",
    /** Artwork URL. Use as {{now_playing_artwork}}. */
    NOW_PLAYING_ARTWORK = "now_playing_artwork",
    /** Artist name(s). Use as {{now_playing_artist}}. */
    NOW_PLAYING_ARTIST = "now_playing_artist",
    /** Album name. Use as {{now_playing_album}}. */
    NOW_PLAYING_ALBUM = "now_playing_album",
    /** Label. Use as {{now_playing_label}}. */
    NOW_PLAYING_LABEL = "now_playing_label",
    /** BPM. Use as {{now_playing_bpm}}. */
    NOW_PLAYING_BPM = "now_playing_bpm",
    /** Rating. Use as {{now_playing_rating}}. */
    NOW_PLAYING_RATING = "now_playing_rating",
    /** Length (seconds). Use as {{now_playing_length}}. */
    NOW_PLAYING_LENGTH = "now_playing_length",
    /** Comment. Use as {{now_playing_comment}}. */
    NOW_PLAYING_COMMENT = "now_playing_comment",
    /** Musical key. Use as {{now_playing_key}}. */
    NOW_PLAYING_KEY = "now_playing_key",
    /** Generic URL. Use as {{now_playing_url}}. */
    NOW_PLAYING_URL = "now_playing_url",
    /** Spotify URL. Use as {{now_playing_spotify_url}}. */
    NOW_PLAYING_SPOTIFY_URL = "now_playing_spotify_url",
    /** Beatport URL. Use as {{now_playing_beatport_url}}. */
    NOW_PLAYING_BEATPORT_URL = "now_playing_beatport_url",
    /** Beatport ID. Use as {{now_playing_beatport_id}}. */
    NOW_PLAYING_BEATPORT_ID = "now_playing_beatport_id",
    /** File path to media. Use as {{now_playing_file_path}}. */
    NOW_PLAYING_FILE_PATH = "now_playing_file_path",
    /** Currently playing media title. Use as {{vlc_now_playing_media}}. */
    VLC_NOW_PLAYING_MEDIA = "vlc_now_playing_media",
    /** Artwork URL. Use as {{vlc_now_playing_image}}. */
    VLC_NOW_PLAYING_IMAGE = "vlc_now_playing_image",
    /** Artist(s). Use as {{vlc_now_playing_artist}}. */
    VLC_NOW_PLAYING_ARTIST = "vlc_now_playing_artist",
    /** Media ID. Use as {{vlc_now_playing_id}}. */
    VLC_NOW_PLAYING_ID = "vlc_now_playing_id",
    /** Media URL. Use as {{vlc_now_playing_url}}. */
    VLC_NOW_PLAYING_URL = "vlc_now_playing_url",
    /** Now playing media duration in seconds. Use as {{vlc_now_playing_duration}}. */
    VLC_NOW_PLAYING_DURATION = "vlc_now_playing_duration",
    /** Now playing media progress (current position) in seconds. Use as {{vlc_now_playing_progress}}. */
    VLC_NOW_PLAYING_PROGRESS = "vlc_now_playing_progress",
    /** Media URI. Use as {{vlc_now_playing_uri}}. */
    VLC_NOW_PLAYING_URI = "vlc_now_playing_uri",
    /** Voice changer on (true/false). Use as {{voicemod_voice_changer_on}}. */
    VOICEMOD_VOICE_CHANGER_ON = "voicemod_voice_changer_on",
    /** Previous voice. Use as {{voicemod_previous_voice}}. */
    VOICEMOD_PREVIOUS_VOICE = "voicemod_previous_voice",
    /** Current voice. Use as {{voicemod_current_voice}}. */
    VOICEMOD_CURRENT_VOICE = "voicemod_current_voice",
    /** Last order full name. Use as {{woocommerce_last_order_name}}. */
    WOOCOMMERCE_LAST_ORDER_NAME = "woocommerce_last_order_name",
    /** Last order first name. Use as {{woocommerce_last_order_first_name}}. */
    WOOCOMMERCE_LAST_ORDER_FIRST_NAME = "woocommerce_last_order_first_name",
    /** Last order last name. Use as {{woocommerce_last_order_last_name}}. */
    WOOCOMMERCE_LAST_ORDER_LAST_NAME = "woocommerce_last_order_last_name",
    /** Last ordered item (first). Use as {{woocommerce_last_order_item}}. */
    WOOCOMMERCE_LAST_ORDER_ITEM = "woocommerce_last_order_item",
    /** Last ordered items (list). Use as {{woocommerce_last_order_items}}. */
    WOOCOMMERCE_LAST_ORDER_ITEMS = "woocommerce_last_order_items",
    /** Last order amount. Use as {{woocommerce_last_order_amount}}. */
    WOOCOMMERCE_LAST_ORDER_AMOUNT = "woocommerce_last_order_amount",
    /** Last order amount currency code. Use as {{woocommerce_last_order_amount_currency}}. */
    WOOCOMMERCE_LAST_ORDER_AMOUNT_CURRENCY = "woocommerce_last_order_amount_currency",
    /** Is streaming (true/false). Use as {{obs_is_streaming}}. */
    OBS_IS_STREAMING = "obs_is_streaming",
    /** Is recording (true/false). Use as {{obs_is_recording}}. */
    OBS_IS_RECORDING = "obs_is_recording",
    /** Last recording path. Use as {{obs_last_recording_path}}. */
    OBS_LAST_RECORDING_PATH = "obs_last_recording_path",
    /** Studio mode on (true/false). Use as {{obs_studio_mode}}. */
    OBS_STUDIO_MODE = "obs_studio_mode",
    /** Current profile. Use as {{obs_current_profile}}. */
    OBS_CURRENT_PROFILE = "obs_current_profile",
    /** Current scene. Use as {{obs_current_scene}}. */
    OBS_CURRENT_SCENE = "obs_current_scene",
    /** Previous scene. Use as {{obs_previous_scene}}. */
    OBS_PREVIOUS_SCENE = "obs_previous_scene",
    /** Current transition (if transitioning). Use as {{obs_current_transition}}. */
    OBS_CURRENT_TRANSITION = "obs_current_transition",
    /** Last replay buffer save path. Use as {{obs_last_replay_buffer_path}}. */
    OBS_LAST_REPLAY_BUFFER_PATH = "obs_last_replay_buffer_path",
    /** Last vertical backtrack save path. Use as {{obs_last_vertical_backtrack_path}}. */
    OBS_LAST_VERTICAL_BACKTRACK_PATH = "obs_last_vertical_backtrack_path",
    /** Current scene. Use as {{slobs_current_scene}}. */
    SLOBS_CURRENT_SCENE = "slobs_current_scene",
    /** Previous scene. Use as {{slobs_previous_scene}}. */
    SLOBS_PREVIOUS_SCENE = "slobs_previous_scene",
    /** Current scene collection. Use as {{slobs_current_scene_collection}}. */
    SLOBS_CURRENT_SCENE_COLLECTION = "slobs_current_scene_collection",
    /** Is streaming (true/false). Use as {{meld_is_streaming}}. */
    MELD_IS_STREAMING = "meld_is_streaming",
    /** Is recording (true/false). Use as {{meld_is_recording}}. */
    MELD_IS_RECORDING = "meld_is_recording",
    /** Current scene. Use as {{meld_current_scene}}. */
    MELD_CURRENT_SCENE = "meld_current_scene",
    /** Previous scene. Use as {{meld_previous_scene}}. */
    MELD_PREVIOUS_SCENE = "meld_previous_scene",
    /** Current vertical scene. Use as {{meld_current_vertical_scene}}. */
    MELD_CURRENT_VERTICAL_SCENE = "meld_current_vertical_scene",
    /** Previous vertical scene. Use as {{meld_previous_vertical_scene}}. */
    MELD_PREVIOUS_VERTICAL_SCENE = "meld_previous_vertical_scene",
    /** Last Streamer.bot action. Use as {{streamerbot_last_action}}. */
    STREAMERBOT_LAST_ACTION = "streamerbot_last_action",
    /** Current VTS model. Use as {{vtubestudio_current_model}}. */
    VTUBESTUDIO_CURRENT_MODEL = "vtubestudio_current_model",
    /** Current VTS background. Use as {{vtubestudio_current_background}}. */
    VTUBESTUDIO_CURRENT_BACKGROUND = "vtubestudio_current_background",
    /** Last VTS hotkey triggered. Use as {{vtubestudio_last_hotkey_triggered}}. */
    VTUBESTUDIO_LAST_HOTKEY_TRIGGERED = "vtubestudio_last_hotkey_triggered",
    /** Tiltify campaign fundraising goal (currency value). Use as {{tiltify_goal_amount}}. */
    TILTIFY_GOAL_AMOUNT = "tiltify_goal_amount",
    /** Tiltify campaign amount raised so far (currency value). Use as {{tiltify_total_raised}}. */
    TILTIFY_TOTAL_RAISED = "tiltify_total_raised",
    /** Extra Life campaign fundraising goal (USD). Use as {{extralife_goal_amount}}. */
    EXTRALIFE_GOAL_AMOUNT = "extralife_goal_amount",
    /** Extra Life campaign amount raised so far (USD). Use as {{extralife_total_raised}}. */
    EXTRALIFE_TOTAL_RAISED = "extralife_total_raised",
    /** DonorDrive campaign fundraising goal. Use as {{donordrive_goal_amount}}. */
    DONORDRIVE_GOAL_AMOUNT = "donordrive_goal_amount",
    /** DonorDrive campaign amount raised so far. Use as {{donordrive_total_raised}}. */
    DONORDRIVE_TOTAL_RAISED = "donordrive_total_raised",
    /** Heart rate BPM (Pulsoid/Hyperate). Use as {{heartrate_bpm}}. */
    HEARTRATE_BPM = "heartrate_bpm"
}

// <auto-generated-end name="SystemVariables" />
