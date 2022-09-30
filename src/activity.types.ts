export enum LumiaStreamingSites {
	TWITCH = 'twitch',
	YOUTUBE = 'youtube',
	FACEBOOK = 'facebook',
	TROVO = 'trovo',
	GLIMESH = 'glimesh',
	TIKTOK = 'tiktok',
}

// Any type of activity that can come in through the app. Anything that changes colors or accessories should be here
export enum LumiaActivityCommandTypes {
	TEST = 'test', // value: { type, config }
	ALERT = 'alert', // value: { alert: AlertTypes, variation?: string }
	CHAT = 'chat', // value: { site: "twitch" | "youtube" | "facebook", message: string }
	DIRECT = 'direct',
	MIDI = 'midi', // value: { port: number, type: MIDI_COMMANDS, channel: number, note: MIDI_NOTES_TYPES, velocity: number }
	OSC = 'osc',
	MQTT = 'mqtt',
	ARTNET = 'artnet', // value: { presetName: string; device?: string; univers: string | number, values: IArtnetChannelValues[] }
	LIGHTS_ON = 'lights-on',
	LIGHTS_OFF = 'lights-off',
	RGB_COLOR = 'rgb-color', // value: { color: [num, num, num], brightness?: number, transition?: number, duration?: number }
	HEX_COLOR = 'hex-color',
	CHAT_COMMAND = 'chat-command',
	CHATBOT_COMMAND = 'chatbot-command',
	CHAT_MATCH = 'chat-match',
	TWITCH_POINTS = 'twitch-points',
	TWITCH_POINTS_OUTPUT = 'twitch-points-output',
	TWITCH_EXTENSION = 'twitch-extension',
	TWITCH_EXTENSION_HFX = 'twitch-extension-hfx',
	TROVO_SPELLS = 'trovo-spells',
	STUDIO_SCENE = 'studio-scene',
	STUDIO_ANIMATION = 'studio-animation',
	STUDIO_THEME = 'studio-theme',
	SET_FUZE = 'set-fuze',
	START_FUZE = 'start-fuze',
	STOP_FUZE = 'stop-fuze',
	TOGGLE_FUZE = 'toggle-fuze',
	TO_DEFAULT = 'to-default',
	SET_LUMIA = 'set-lumia',
	START_LUMIA = 'start-lumia',
	STOP_LUMIA = 'stop-lumia',
	TOGGLE_STREAMMODE = 'toggle-stream-mode',
	START_STREAMMODE = 'start-stream-mode',
	STOP_STREAMMODE = 'stop-stream-mode',
	CLEAR_QUEUE = 'clear-queue',
	CHATBOT_MESSAGE = 'chatbot-message',
	TTS = 'tts',
	COMMUNITY_TEST = 'community-test',
	UPDATE_VARIABLE_VALUE = 'update-variable-value',
	GET_VARIABLE_VALUE = 'get-variable-value',
	SPOTIFY = 'send-spotify-command',
	VLC = 'send-vlc-command',
	TWITTER = 'send-twitter-command',

	// Overlay Commands
	OVERLAY_SET_OVERLAY_VISIBILITY = 'overlay-set-visibility',
	OVERLAY_SET_LAYER_VISIBILITY = 'overlay-set-layer-visibility',
	OVERLAY_SET_LAYER_POSITION = 'overlay-set-layer-position',
	OVERLAY_SET_CONTENT = 'overlay-set-content',

	// Games Glow Command Types
	GAMESGLOW_ALERT = 'gamesglow-alert',
	GAMESGLOW_COMMAND = 'gamesglow-command',
	GAMESGLOW_VARIABLE = 'gamesglow-variable',
	GAMESGLOW_VIRTUALLIGHT = 'gamesglow-virtuallight',
}

// Anything that comes through in an external way
export enum LumiaExternalActivityCommandTypes {
	ALERT = 'alert', // value: { alert: AlertTypes, variation?: string }
	MIDI = 'midi', // value: { port: number, type: MIDI_COMMANDS, channel: number, note: MIDI_NOTES_TYPES, velocity: number }
	OSC = 'osc',
	ARTNET = 'artnet', // value: { presetName: string; device?: string; univers: string | number, values: IArtnetChannelValues[] }
	RGB_COLOR = 'rgb-color', // value: { color: [num, num, num], brightness?: number, transition?: number, duration?: number }
	HEX_COLOR = 'hex-color',
	CHAT_COMMAND = 'chat-command',
	TWITCH_POINTS = 'twitch-points',
	TWITCH_EXTENSION = 'twitch-extension',
	TROVO_SPELLS = 'trovo-spells',
	STUDIO_SCENE = 'studio-scene',
	STUDIO_ANIMATION = 'studio-animation',
	STUDIO_THEME = 'studio-theme',
	CHATBOT_MESSAGE = 'chatbot-messsage',
	TTS = 'tts',
}

export enum LumiaAlertValues {
	TWITCH_STREAM_LIVE = 'twitch-streamLive',
	TWITCH_STREAM_OFFLINE = 'twitch-streamOffline',
	TWITCH_FOLLOWER = 'twitch-follower',
	TWITCH_SUBSCRIBER = 'twitch-subscriber',
	TWITCH_HOST = 'twitch-host',
	TWITCH_RAID = 'twitch-raid',
	TWITCH_BITS = 'twitch-bits',
	TWITCH_REDEMPTION = 'twitch-redemption',
	TWITCH_HYPETRAIN_STARTED = 'twitch-hypetrainStarted',
	TWITCH_HYPETRAIN_PROGRESSED = 'twitch-hypetrainProgressed',
	TWITCH_HYPETRAIN_LEVEL_PROGRESSED = 'twitch-hypetrainLevelProgressed',
	TWITCH_HYPETRAIN_ENDED = 'twitch-hypetrainEnded',
	TWITCH_POLL_STARTED = 'twitch-pollStarted',
	TWITCH_POLL_PROGRESSED = 'twitch-pollProgressed',
	TWITCH_POLL_ENDED = 'twitch-pollEnded',
	TWITCH_PREDICTION_STARTED = 'twitch-predictionStarted',
	TWITCH_PREDICTION_PROGRESSED = 'twitch-predictionProgressed',
	TWITCH_PREDICTION_LOCKED = 'twitch-predictionLocked',
	TWITCH_PREDICTION_ENDED = 'twitch-predictionEnded',
	TWITCH_GOAL_STARTED = 'twitch-goalStarted',
	TWITCH_GOAL_PROGRESSED = 'twitch-goalProgressed',
	TWITCH_GOAL_ENDED = 'twitch-goalEnded',
	TWITCH_CATEGORY = 'twitch-categoryChanged',
	TWITCH_CLIP = 'twitch-clip',
	YOUTUBE_MEMBER = 'youtube-member',
	YOUTUBE_SUBSCRIBER = 'youtube-subscriber',
	YOUTUBE_SUPERCHAT = 'youtube-superchat',
	YOUTUBE_SUPERSTICKER = 'youtube-supersticker',
	FACEBOOK_FOLLOWER = 'facebook-follower',
	FACEBOOK_REACTION = 'facebook-reaction',
	FACEBOOK_STAR = 'facebook-star',
	FACEBOOK_SUPPORT = 'facebook-support',
	FACEBOOK_GIFT_SUBSCRIPTION = 'facebook-subscriptionGift',
	FACEBOOK_SHARE = 'facebook-share',
	FACEBOOK_FAN = 'facebook-fan',
	GLIMESH_SUBSCRIBER = 'glimesh-subscriber',
	GLIMESH_FOLLOWER = 'glimesh-follower',
	TROVO_STREAM_LIVE = 'trovo-streamLive',
	TROVO_STREAM_OFFLINE = 'trovo-streamOffline',
	TROVO_CHANNEL_JOIN = 'trovo-channelJoin',
	TROVO_SUBSCRIBER = 'trovo-subscriber', // potential for Trovo, needs testing in POC
	TROVO_FOLLOWER = 'trovo-follower', // potential for Trovo, needs testing in POC
	TROVO_SPELL = 'trovo-spell', // potential for Trovo, needs testing in POC
	TROVO_GIFT_SUBSCRIPTION = 'trovo-giftSubscription',
	TROVO_RAID = 'trovo-raid',
	TIKTOK_FOLLOWER = 'tiktok-follower',
	TIKTOK_LIKE = 'tiktok-like',
	TIKTOK_GIFT = 'tiktok-gift',
	TIKTOK_SHARE = 'tiktok-share',
	TIKTOK_STREAM_END = 'tiktok-streamEnd',
	STREAMLABS_DONATION = 'streamlabs-donation',
	STREAMLABS_CHARITY = 'streamlabs-charity',
	STREAMLABS_MERCH = 'streamlabs-merch',
	STREAMLABS_REDEMPTION = 'streamlabs-redemption',
	STREAMLABS_PRIMEGIFT = 'streamlabs-primegift',
	STREAMELEMENTS_DONATION = 'streamelements-donation',
	STREAMELEMENTS_MERCH = 'streamelements-merch',
	STREAMELEMENTS_REDEMPTION = 'streamelements-redemption',
	EXTRALIFE_DONATION = 'extralife-donation',
	DONORDRIVE_DONATION = 'donordrive-donation',
	TILTIFY_DONATION = 'tiltify-campaignDonation',
	// PAYPAL_PAYMENT_COMPLETE = "paypal-paymentComplete",
	// PAYPAL_PAYMENT_DENIED = "paypal-paymentDenied",
	TIPEEESTREAM_DONATION = 'tipeeestream-donation',
	TREATSTREAM_TREAT = 'treatstream-treat',
	PATREON_PLEDGE = 'patreon-pledge',
	OBS_SWITCH_PROFILE = 'obs-switchProfile',
	OBS_SWITCH_SCENE = 'obs-switchScene',
	OBS_SCENE_ITEM_VISIBILITY = 'obs-sceneItemVisibility',
	OBS_SCENE_ITEM_HIDDEN = 'obs-sceneItemHidden',
	OBS_SWITCH_TRANSITION = 'obs-switch-transition',
	OBS_TRANSITION_BEGIN = 'obs-transitionBegin',
	OBS_TRANSITION_END = 'obs-transitionEnd',
	OBS_STREAM_STARTING = 'obs-streamStarting',
	OBS_STREAM_STOPPING = 'obs-streamStopping',
	SLOBS_SWITCH_SCENE_COLLECTION = 'slobs-switchSceneCollection',
	SLOBS_SWITCH_SCENE = 'slobs-switchScene',
	SLOBS_SCENE_ITEM_VISIBILITY = 'slobs-sceneItemVisibility',
	SLOBS_SCENE_ITEM_HIDDEN = 'slobs-sceneItemHidden',
	SPOTIFY_SWITCH_SONG = 'spotify-switchSong',
	SPOTIFY_SONG_PLAYED = 'spotify-songPlayed',
	SPOTIFY_SONG_PAUSED = 'spotify-songPaused',
	VLC_SWITCH_SONG = 'vlc-switchSong',
	VLC_SONG_PLAYED = 'vlc-songPlayed',
	VLC_SONG_PAUSED = 'vlc-songPaused',
	PULSE_HEARTRATE = 'pulse-heartrate',
	PULSE_CALORIES = 'pulse-calories',
	TWITTER_FOLLOWER = 'twitter-follower',
	TWITTER_LIKE = 'twitter-like',
	TWITTER_RETWEET = 'twitter-retweet',
	WOOCOMMERCE_ORDER = 'woocommerce-order',
	KOFI_DONATION = 'kofi-donation',
	KOFI_SUBSCRIPTION = 'kofi-subscription',
	KOFI_COMMISSION = 'kofi-commission',
	KOFI_SHOPORDER = 'kofi-shopOrder',
	STREAMERBOT_ACTION = 'streamerbot-action',
}

export const LumiaAlertFriendlyValues = {
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: 'Twitch StreamLive',
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: 'Twitch StreamOffline',
	[LumiaAlertValues.TWITCH_FOLLOWER]: 'Twitch Follower',
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: 'Twitch Subscriber',
	[LumiaAlertValues.TWITCH_HOST]: 'Twitch Host',
	[LumiaAlertValues.TWITCH_RAID]: 'Twitch Raid',
	[LumiaAlertValues.TWITCH_BITS]: 'Twitch Bits',
	[LumiaAlertValues.TWITCH_REDEMPTION]: 'Twitch Redemption',
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: 'Twitch HypetrainStarted',
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: 'Twitch HypetrainProgressed',
	[LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: 'Twitch HypetrainLevelProgressed',
	[LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: 'Twitch HypetrainEnded',
	[LumiaAlertValues.TWITCH_POLL_STARTED]: 'Twitch PollStarted',
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: 'Twitch PollProgressed',
	[LumiaAlertValues.TWITCH_POLL_ENDED]: 'Twitch PollEnded',
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: 'Twitch PredictionStarted',
	[LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED]: 'Twitch PredictionProgressed',
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: 'Twitch PredictionLocked',
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: 'Twitch PredictionEnded',
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: 'Twitch GoalStarted',
	[LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: 'Twitch GoalProgressed',
	[LumiaAlertValues.TWITCH_GOAL_ENDED]: 'Twitch GoalEnded',
	[LumiaAlertValues.TWITCH_CATEGORY]: 'Twitch CategoryChanged',
	[LumiaAlertValues.TWITCH_CLIP]: 'Twitch Clip',
	[LumiaAlertValues.YOUTUBE_MEMBER]: 'Youtube Member',
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: 'Youtube Subscriber',
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: 'Youtube Superchat',
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: 'Youtube Supersticker',
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: 'Facebook Follower',
	[LumiaAlertValues.FACEBOOK_REACTION]: 'Facebook Reaction',
	[LumiaAlertValues.FACEBOOK_STAR]: 'Facebook Star',
	[LumiaAlertValues.FACEBOOK_SUPPORT]: 'Facebook Support',
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: 'Facebook Subscription Gift',
	[LumiaAlertValues.FACEBOOK_SHARE]: 'Facebook Share',
	[LumiaAlertValues.FACEBOOK_FAN]: 'Facebook Fan',
	[LumiaAlertValues.GLIMESH_SUBSCRIBER]: 'Glimesh Subscriber',
	[LumiaAlertValues.GLIMESH_FOLLOWER]: 'Glimesh Follower',
	[LumiaAlertValues.TROVO_SUBSCRIBER]: 'Trovo Subscriber',
	[LumiaAlertValues.TROVO_FOLLOWER]: 'Trovo Follower',
	[LumiaAlertValues.TROVO_SPELL]: 'Trovo Spell',
	[LumiaAlertValues.TIKTOK_FOLLOWER]: 'Tiktok Follower',
	[LumiaAlertValues.TIKTOK_LIKE]: 'Tiktok Like',
	[LumiaAlertValues.TIKTOK_GIFT]: 'Tiktok Gift',
	[LumiaAlertValues.TIKTOK_SHARE]: 'Tiktok Share',
	[LumiaAlertValues.TIKTOK_STREAM_END]: 'Tiktok StreamEnded',
	[LumiaAlertValues.STREAMLABS_DONATION]: 'Streamlabs Donation',
	[LumiaAlertValues.STREAMLABS_CHARITY]: 'Streamlabs Charity',
	[LumiaAlertValues.STREAMLABS_MERCH]: 'Streamlabs Merch',
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: 'Streamlabs Redemption',
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: 'Streamlabs Primegift',
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: 'Streamelements Donation',
	[LumiaAlertValues.STREAMELEMENTS_MERCH]: 'Streamelements Merch',
	[LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: 'Streamelements Redemption',
	[LumiaAlertValues.EXTRALIFE_DONATION]: 'Extralife Donation',
	[LumiaAlertValues.DONORDRIVE_DONATION]: 'Donordrive Donation',
	[LumiaAlertValues.TILTIFY_DONATION]: 'Tiltify CampaignDonation',
	// [LumiaAlertValues.PAYPAL_PAYMENT_COMPLETE]: "Paypal PaymentComplete",
	// [LumiaAlertValues.PAYPAL_PAYMENT_DENIED]: "Paypal PaymentDenied",
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: 'Tipeeestream Donation',
	[LumiaAlertValues.TREATSTREAM_TREAT]: 'Treatstream Treat',
	[LumiaAlertValues.PATREON_PLEDGE]: 'Patreon Pledge',
	[LumiaAlertValues.OBS_SWITCH_PROFILE]: 'Obs SwitchProfile',
	[LumiaAlertValues.OBS_SWITCH_SCENE]: 'Obs SwitchScene',
	[LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: 'Obs SceneItemVisibility',
	[LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN]: 'Obs SceneItemHidden',
	[LumiaAlertValues.OBS_SWITCH_TRANSITION]: 'obs-Switch Transition',
	[LumiaAlertValues.OBS_TRANSITION_BEGIN]: 'Obs TransitionBegin',
	[LumiaAlertValues.OBS_TRANSITION_END]: 'Obs TransitionEnd',
	[LumiaAlertValues.OBS_STREAM_STARTING]: 'Obs StreamStarting',
	[LumiaAlertValues.OBS_STREAM_STOPPING]: 'Obs StreamStopping',
	[LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: 'Slobs SwitchSceneCollection',
	[LumiaAlertValues.SLOBS_SWITCH_SCENE]: 'Slobs SwitchScene',
	[LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: 'Slobs SceneItemVisibility',
	[LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN]: 'Slobs SceneItemHidden',
	[LumiaAlertValues.SPOTIFY_SWITCH_SONG]: 'Spotify SwitchSong',
	[LumiaAlertValues.SPOTIFY_SONG_PLAYED]: 'Spotify SongPlayed',
	[LumiaAlertValues.SPOTIFY_SONG_PAUSED]: 'Spotify SongPaused',
	[LumiaAlertValues.VLC_SWITCH_SONG]: 'Vlc SwitchSong',
	[LumiaAlertValues.VLC_SONG_PLAYED]: 'Vlc SongPlayed',
	[LumiaAlertValues.VLC_SONG_PAUSED]: 'Vlc SongPaused',
	[LumiaAlertValues.PULSE_HEARTRATE]: 'Pulse Heartrate',
	[LumiaAlertValues.PULSE_CALORIES]: 'Pulse Calories',
	[LumiaAlertValues.TWITTER_FOLLOWER]: 'Twitter Follower',
	[LumiaAlertValues.TWITTER_LIKE]: 'Twitter Like',
	[LumiaAlertValues.TWITTER_RETWEET]: 'Twitter Retweet',
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: 'Woocommerce Order',
	[LumiaAlertValues.KOFI_DONATION]: 'Kofi Donation',
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: 'Kofi Subscription',
	[LumiaAlertValues.KOFI_COMMISSION]: 'Kofi Commission',
	[LumiaAlertValues.KOFI_SHOPORDER]: 'Kofi Shoporder',
	[LumiaAlertValues.STREAMERBOT_ACTION]: 'Streamerbot Action',
};

// Where did the Activity Originate from: Chat, alerts, shortcut, api, etc.
export enum LumiaActivityOriginTypes {
	SYSTEM = 'system', // Settings, Shortcut, or API
	ALEXA = 'alexa',
	ALERT = 'alert',
	CHAT = 'chat',
	CHATBOT = 'chatbot',
	TWITCH_POINTS = 'twitch-points',
	TWITCH_EXTENSION = 'twitch-extension',
	TROVO_SPELLS = 'trovo-spells',
	API = 'api',
	LUMIASTREAMLINK = 'lumiastreamlink',
	STREAMDECK = 'streamdeck',
	TOUCHPORTAL = 'touchportal',
	AVERMEDIA = 'avermedia',
	LOUPEDECK = 'loupedeck',
	GAMESGLOW = 'gamesglow',
}

export enum LumiaActivityApiValueType {
	NO_VALUE,
	CUSTOM_VALUE,
	SET_VALUE,
}

// Activities that do not need a value
export const LumiaActivityNoValueTypes = [
	LumiaActivityCommandTypes.CLEAR_QUEUE,
	LumiaActivityCommandTypes.START_FUZE,
	LumiaActivityCommandTypes.START_LUMIA,
	LumiaActivityCommandTypes.START_STREAMMODE,
	LumiaActivityCommandTypes.STOP_FUZE,
	LumiaActivityCommandTypes.STOP_LUMIA,
	LumiaActivityCommandTypes.STOP_STREAMMODE,
	LumiaActivityCommandTypes.TOGGLE_FUZE,
	LumiaActivityCommandTypes.TOGGLE_STREAMMODE,
];

// We'll want to use test types when we're sending a direct activity that doesn't currently have a link
export enum LumiaActivityTestType {
	REACTION,
	BUILDUPS,
	ANIMATION,
	THEME,
	SCENE,
}
