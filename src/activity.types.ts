export enum LumiaStreamingSites {
	TWITCH = 'twitch',
	YOUTUBE = 'youtube',
	FACEBOOK = 'facebook',
	TROVO = 'trovo',
	TIKTOK = 'tiktok',
	KICK = 'kick',
	TWITTER = 'twitter',
	DISCORD = 'discord',
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
	FUZE_AUDIO_SENSITIVITY = 'fuze-audio-sensitivity',
	TO_DEFAULT = 'to-default',
	SET_LUMIA = 'set-lumia',
	START_LUMIA = 'start-lumia',
	STOP_LUMIA = 'stop-lumia',
	TOGGLE_STREAMMODE = 'toggle-stream-mode',
	START_STREAMMODE = 'start-stream-mode',
	STOP_STREAMMODE = 'stop-stream-mode',

	SET_COMMNAD_STATE = 'set-command-state',
	SET_FOLDER_STATE = 'set-folder-state',

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
	LUMIASTREAM_DONATION = 'lumiastream-donation',
	LUMIASTREAM_LUMIA_OPENED = 'lumiastream-lumiaOpened',
	LUMIASTREAM_LUMIA_CLOSED = 'lumiastream-lumiaClosed',
	LUMIASTREAM_STREAMMODE_ON = 'lumiastream-streammodeOn',
	LUMIASTREAM_STREAMMODE_OFF = 'lumiastream-streammodeOff',
	LUMIASTREAM_RAFFLE_START = 'lumiastream-raffleStart',
	LUMIASTREAM_RAFFLE_STOP = 'lumiastream-raffleStop',
	LUMIASTREAM_RAFFLE_WINNER = 'lumiastream-raffleWinner',
	LUMIASTREAM_SPINWHEEL_WINNER = 'lumiastream-spinwheelWinner',
	LUMIASTREAM_POLL_STARTED = 'lumiastream-pollStarted',
	LUMIASTREAM_POLL_PROGRESSED = 'lumiastream-pollProgressed',
	LUMIASTREAM_POLL_ENDED = 'lumiastream-pollEnded',
	TWITCH_EXTENSION = 'twitch-extension',
	TWITCH_POINTS = 'twitch-points',
	TWITCH_STREAM_LIVE = 'twitch-streamLive',
	TWITCH_STREAM_OFFLINE = 'twitch-streamOffline',
	TWITCH_FIRST_CHATTER = 'twitch-firstChatter',
	TWITCH_ENTRANCE = 'twitch-entrance',
	TWITCH_FOLLOWER = 'twitch-follower',
	TWITCH_SUBSCRIBER = 'twitch-subscriber',
	TWITCH_GIFT_SUBSCRIPTION = 'twitch-giftSubscription',
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
	TWITCH_CHARITY_DONATION = 'twitch-charityDonation',
	TWITCH_CHARITY_CAMPAIGN_STARTED = 'twitch-charityCampaignStarted',
	TWITCH_CHARITY_CAMPAIGN_PROGRESSED = 'twitch-charityCampaignProgressed',
	TWITCH_CHARITY_CAMPAIGN_STOPPED = 'twitch-charityCampaignStopped',
	TWITCH_CATEGORY = 'twitch-categoryChanged',
	TWITCH_CLIP = 'twitch-clip',
	TWITCH_CHANNEL_JOIN = 'twitch-channelJoin',
	TWITCH_CHANNEL_LEAVE = 'twitch-channelLeave',
	TWITCH_BANNED = 'twitch-banned',
	TWITCH_TIMEOUT = 'twitch-timeout',
	TWITCH_TIMEOUT_OVER = 'twitch-timeoutOver',
	TWITCH_SHOUTOUT_RECEIVE = 'twitch-shoutoutReceive',
	TWITCH_AD_STARTED = 'twitch-adStarted',
	TWITCH_AD_STOPPED = 'twitch-adStopped',
	YOUTUBE_STREAM_LIVE = 'youtube-streamLive',
	YOUTUBE_STREAM_OFFLINE = 'youtube-streamOffline',
	YOUTUBE_FIRST_CHATTER = 'youtube-firstChatter',
	YOUTUBE_ENTRANCE = 'youtube-entrance',
	YOUTUBE_MEMBER = 'youtube-member',
	YOUTUBE_SUBSCRIBER = 'youtube-subscriber',
	YOUTUBE_SUPERCHAT = 'youtube-superchat',
	YOUTUBE_SUPERSTICKER = 'youtube-supersticker',
	FACEBOOK_STREAM_LIVE = 'facebook-streamLive',
	FACEBOOK_STREAM_OFFLINE = 'facebook-streamOffline',
	FACEBOOK_FIRST_CHATTER = 'facebook-firstChatter',
	FACEBOOK_ENTRANCE = 'facebook-entrance',
	FACEBOOK_FOLLOWER = 'facebook-follower',
	FACEBOOK_REACTION = 'facebook-reaction',
	FACEBOOK_STAR = 'facebook-star',
	FACEBOOK_SUPPORT = 'facebook-support',
	FACEBOOK_GIFT_SUBSCRIPTION = 'facebook-subscriptionGift',
	FACEBOOK_SHARE = 'facebook-share',
	FACEBOOK_FAN = 'facebook-fan',
	TROVO_STREAM_LIVE = 'trovo-streamLive',
	TROVO_STREAM_OFFLINE = 'trovo-streamOffline',
	TROVO_FIRST_CHATTER = 'trovo-firstChatter',
	TROVO_ENTRANCE = 'trovo-entrance',
	TROVO_CHANNEL_JOIN = 'trovo-channelJoin',
	TROVO_SUBSCRIBER = 'trovo-subscriber', // potential for Trovo, needs testing in POC
	TROVO_FOLLOWER = 'trovo-follower', // potential for Trovo, needs testing in POC
	TROVO_SPELL = 'trovo-spell', // potential for Trovo, needs testing in POC
	TROVO_GIFT_SUBSCRIPTION = 'trovo-giftSubscription',
	TROVO_RAID = 'trovo-raid',
	TIKTOK_FIRST_CHATTER = 'tiktok-firstChatter',
	TIKTOK_ENTRANCE = 'tiktok-entrance',
	TIKTOK_FOLLOWER = 'tiktok-follower',
	TIKTOK_LIKE = 'tiktok-like',
	TIKTOK_GIFT = 'tiktok-gift',
	TIKTOK_SUBSCRIBER = 'tiktok-subscriber',
	TIKTOK_SHARE = 'tiktok-share',
	TIKTOK_STREAM_END = 'tiktok-streamEnd',
	TIKTOK_NEW_VIDEO = 'tiktok-newVideo',
	KICK_FIRST_CHATTER = 'kick-firstChatter',
	KICK_ENTRANCE = 'kick-entrance',
	KICK_FOLLOWER = 'kick-follower',
	KICK_SUBSCRIBER = 'kick-subscriber',
	KICK_GIFT_SUBSCRIPTION = 'kick-subscriptionGift',
	KICK_HOST = 'kick-host',
	KICK_BANNED = 'kick-banned',
	KICK_UNBANNED = 'kick-unbanned',
	DISCORD_FIRST_CHATTER = 'discord-firstChatter',
	DISCORD_ENTRANCE = 'discord-entrance',
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
	PATREON_PLEDGE = 'patreon-campaignPledge',
	OBS_SWITCH_PROFILE = 'obs-switchProfile',
	OBS_SWITCH_SCENE = 'obs-switchScene',
	OBS_SCENE_ITEM_VISIBILITY = 'obs-sceneItemVisibility',
	OBS_SCENE_ITEM_HIDDEN = 'obs-sceneItemHidden',
	OBS_SWITCH_TRANSITION = 'obs-switch-transition',
	OBS_TRANSITION_BEGIN = 'obs-transitionBegin',
	OBS_TRANSITION_END = 'obs-transitionEnd',
	OBS_STREAM_STARTING = 'obs-streamStarting',
	OBS_STREAM_STOPPING = 'obs-streamStopping',
	OBS_RECORDING_STARTING = 'obs-recordingStarting',
	OBS_RECORDING_STOPPING = 'obs-recordingStopping',
	OBS_REPLAY_BUFFER_SAVED = 'obs-replayBufferSaved',
	OBS_VERTICAL_BACKTRACK_SAVED = 'obs-verticalBacktrackSaved',
	OBS_VENDOR_EVENT = 'obs-vendorEvent',
	SLOBS_SWITCH_SCENE_COLLECTION = 'slobs-switchSceneCollection',
	SLOBS_SWITCH_SCENE = 'slobs-switchScene',
	SLOBS_SCENE_ITEM_VISIBILITY = 'slobs-sceneItemVisibility',
	SLOBS_SCENE_ITEM_HIDDEN = 'slobs-sceneItemHidden',
	SPOTIFY_SWITCH_SONG = 'spotify-switchSong',
	SPOTIFY_SONG_PLAYED = 'spotify-songPlayed',
	SPOTIFY_SONG_PAUSED = 'spotify-songPaused',
	YOUTUBEMUSIC_SWITCH_SONG = 'youtubemusic-switchSong',
	YOUTUBEMUSIC_SONG_PLAYED = 'youtubemusic-songPlayed',
	YOUTUBEMUSIC_SONG_PAUSED = 'youtubemusic-songPaused',
	NOWPLAYING_SWITCH_SONG = 'nowplaying-switchSong',
	NOWPLAYING_SONG_PLAYED = 'nowplaying-songPlayed',
	NOWPLAYING_SONG_PAUSED = 'nowplaying-songPaused',
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
	[LumiaAlertValues.LUMIASTREAM_LUMIA_OPENED]: 'Lumia Opened',
	[LumiaAlertValues.LUMIASTREAM_LUMIA_CLOSED]: 'Lumia Closed',
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_ON]: 'Stream Mode On',
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_OFF]: 'Stream Mode Off',
	[LumiaAlertValues.LUMIASTREAM_DONATION]: 'Lumia Tip',
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_START]: 'Raffle Start',
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_STOP]: 'Raffle Stop',
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_WINNER]: 'Raffle Winner',
	[LumiaAlertValues.LUMIASTREAM_SPINWHEEL_WINNER]: 'Spinwheel Winner',
	[LumiaAlertValues.LUMIASTREAM_POLL_STARTED]: 'Poll Started',
	[LumiaAlertValues.LUMIASTREAM_POLL_PROGRESSED]: 'Poll Progressed',
	[LumiaAlertValues.LUMIASTREAM_POLL_ENDED]: 'Poll Ended',
	[LumiaAlertValues.TWITCH_EXTENSION]: 'Twitch Extension',
	[LumiaAlertValues.TWITCH_POINTS]: 'Twitch Points',
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: 'Twitch Stream Live',
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: 'Twitch Stream Offline',
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: 'Twitch First Chatter',
	[LumiaAlertValues.TWITCH_ENTRANCE]: 'Twitch Entrance',
	[LumiaAlertValues.TWITCH_FOLLOWER]: 'Twitch Follower',
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: 'Twitch Subscriber',
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: 'Twitch Gift Subscription',
	[LumiaAlertValues.TWITCH_RAID]: 'Twitch Raid',
	[LumiaAlertValues.TWITCH_BITS]: 'Twitch Bits',
	[LumiaAlertValues.TWITCH_REDEMPTION]: 'Twitch Redemption',
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: 'Twitch Hypetrain Started',
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: 'Twitch Hypetrain Progressed',
	[LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: 'Twitch Hypetrain Level Progressed',
	[LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: 'Twitch Hypetrain Ended',
	[LumiaAlertValues.TWITCH_POLL_STARTED]: 'Twitch Poll Started',
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: 'Twitch Poll Progressed',
	[LumiaAlertValues.TWITCH_POLL_ENDED]: 'Twitch Poll Ended',
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: 'Twitch Prediction Started',
	[LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED]: 'Twitch Prediction Progressed',
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: 'Twitch Prediction Locked',
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: 'Twitch Prediction Ended',
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: 'Twitch Goal Started',
	[LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: 'Twitch Goal Progressed',
	[LumiaAlertValues.TWITCH_GOAL_ENDED]: 'Twitch GoalEnded',
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: 'Twitch Charity Tip',
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED]: 'Twitch Charity Campaign Started',
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_PROGRESSED]: 'Twitch Charity Campaign Progressed',
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STOPPED]: 'Twitch Charity Campaign Stopped',
	[LumiaAlertValues.TWITCH_CATEGORY]: 'Twitch Category Changed',
	[LumiaAlertValues.TWITCH_CLIP]: 'Twitch Clip',
	[LumiaAlertValues.TWITCH_CHANNEL_JOIN]: 'Twitch Channel Join',
	[LumiaAlertValues.TWITCH_CHANNEL_LEAVE]: 'Twitch Channel Leave',
	[LumiaAlertValues.TWITCH_BANNED]: 'Twitch Banned',
	[LumiaAlertValues.TWITCH_TIMEOUT]: 'Twitch Timeout',
	[LumiaAlertValues.TWITCH_TIMEOUT_OVER]: 'Twitch Timeout Over',
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: 'Twitch Shoutout Receive',
	[LumiaAlertValues.TWITCH_AD_STARTED]: 'Twitch Ad Started',
	[LumiaAlertValues.TWITCH_AD_STOPPED]: 'Twitch Ad Stopped',
	[LumiaAlertValues.YOUTUBE_STREAM_LIVE]: 'Youtube Stream Live',
	[LumiaAlertValues.YOUTUBE_STREAM_OFFLINE]: 'Youtube Stream Offline',
	[LumiaAlertValues.YOUTUBE_FIRST_CHATTER]: 'Youtube First Chatter',
	[LumiaAlertValues.YOUTUBE_MEMBER]: 'Youtube Member',
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: 'Youtube Subscriber',
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: 'Youtube Superchat',
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: 'Youtube Supersticker',
	[LumiaAlertValues.YOUTUBE_ENTRANCE]: 'Youtube Entrance',
	[LumiaAlertValues.FACEBOOK_STREAM_LIVE]: 'Facebook Stream Live',
	[LumiaAlertValues.FACEBOOK_STREAM_OFFLINE]: 'Facebook Stream Offline',
	[LumiaAlertValues.FACEBOOK_FIRST_CHATTER]: 'Facebook First Chatter',
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: 'Facebook Follower',
	[LumiaAlertValues.FACEBOOK_REACTION]: 'Facebook Reaction',
	[LumiaAlertValues.FACEBOOK_STAR]: 'Facebook Star',
	[LumiaAlertValues.FACEBOOK_SUPPORT]: 'Facebook Support',
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: 'Facebook Subscription Gift',
	[LumiaAlertValues.FACEBOOK_SHARE]: 'Facebook Share',
	[LumiaAlertValues.FACEBOOK_FAN]: 'Facebook Fan',
	[LumiaAlertValues.FACEBOOK_ENTRANCE]: 'Facebook Entrance',
	[LumiaAlertValues.TROVO_FIRST_CHATTER]: 'Trovo First Chatter',
	[LumiaAlertValues.TROVO_FOLLOWER]: 'Trovo Follower',
	[LumiaAlertValues.TROVO_CHANNEL_JOIN]: 'Trovo Channel Join',
	[LumiaAlertValues.TROVO_SUBSCRIBER]: 'Trovo Subscriber',
	[LumiaAlertValues.TROVO_GIFT_SUBSCRIPTION]: 'Trovo Gift Subscription',
	[LumiaAlertValues.TROVO_RAID]: 'Trovo Raid',
	[LumiaAlertValues.TROVO_SPELL]: 'Trovo Spell',
	[LumiaAlertValues.TROVO_ENTRANCE]: 'Trovo Entrance',
	[LumiaAlertValues.TIKTOK_FIRST_CHATTER]: 'Tiktok First Chatter',
	[LumiaAlertValues.TIKTOK_FOLLOWER]: 'Tiktok Follower',
	[LumiaAlertValues.TIKTOK_LIKE]: 'Tiktok Like',
	[LumiaAlertValues.TIKTOK_GIFT]: 'Tiktok Gift',
	[LumiaAlertValues.TIKTOK_SUBSCRIBER]: 'Tiktok Subscriber',
	[LumiaAlertValues.TIKTOK_SHARE]: 'Tiktok Share',
	[LumiaAlertValues.TIKTOK_STREAM_END]: 'Tiktok Stream Ended',
	[LumiaAlertValues.TIKTOK_NEW_VIDEO]: 'Tiktok New Video',
	[LumiaAlertValues.TIKTOK_ENTRANCE]: 'Tiktok Entrance',
	[LumiaAlertValues.KICK_FIRST_CHATTER]: 'Kick First Chatter',
	[LumiaAlertValues.KICK_FOLLOWER]: 'Kick Follower',
	[LumiaAlertValues.KICK_SUBSCRIBER]: 'Kick Subscriber',
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: 'Kick Gift Subscription',
	[LumiaAlertValues.KICK_HOST]: 'Kick Host',
	[LumiaAlertValues.KICK_BANNED]: 'Kick User Banned',
	[LumiaAlertValues.KICK_UNBANNED]: 'Kick User Unbanned',
	[LumiaAlertValues.KICK_ENTRANCE]: 'Kick Entrance',
	[LumiaAlertValues.DISCORD_FIRST_CHATTER]: 'Discord First Chatter',
	[LumiaAlertValues.DISCORD_ENTRANCE]: 'Discord Entrance',
	[LumiaAlertValues.STREAMLABS_DONATION]: 'Streamlabs Tip',
	[LumiaAlertValues.STREAMLABS_CHARITY]: 'Streamlabs Charity',
	[LumiaAlertValues.STREAMLABS_MERCH]: 'Streamlabs Merch',
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: 'Streamlabs Redemption',
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: 'Streamlabs Primegift',
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: 'Streamelements Tip',
	[LumiaAlertValues.STREAMELEMENTS_MERCH]: 'Streamelements Merch',
	[LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: 'Streamelements Redemption',
	[LumiaAlertValues.EXTRALIFE_DONATION]: 'Extralife Tip',
	[LumiaAlertValues.DONORDRIVE_DONATION]: 'Donordrive Tip',
	[LumiaAlertValues.TILTIFY_DONATION]: 'Tiltify Campaign Tip',
	// [LumiaAlertValues.PAYPAL_PAYMENT_COMPLETE]: "Paypal Payment Complete",
	// [LumiaAlertValues.PAYPAL_PAYMENT_DENIED]: "Paypal Payment Denied",
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: 'Tipeeestream Tip',
	[LumiaAlertValues.TREATSTREAM_TREAT]: 'Treatstream Treat',
	[LumiaAlertValues.PATREON_PLEDGE]: 'Patreon Pledge',
	[LumiaAlertValues.OBS_SWITCH_PROFILE]: 'Obs Switch Profile',
	[LumiaAlertValues.OBS_SWITCH_SCENE]: 'Obs Switch Scene',
	[LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: 'Obs Scene Item Visibility',
	[LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN]: 'Obs Scene Item Hidden',
	[LumiaAlertValues.OBS_SWITCH_TRANSITION]: 'Obs Switch Transition',
	[LumiaAlertValues.OBS_TRANSITION_BEGIN]: 'Obs Transition Begin',
	[LumiaAlertValues.OBS_TRANSITION_END]: 'Obs Transition End',
	[LumiaAlertValues.OBS_STREAM_STARTING]: 'Obs Stream Starting',
	[LumiaAlertValues.OBS_STREAM_STOPPING]: 'Obs Stream Stopping',
	[LumiaAlertValues.OBS_RECORDING_STARTING]: 'Obs Recording Starting',
	[LumiaAlertValues.OBS_RECORDING_STOPPING]: 'Obs Recording Stopping',
	[LumiaAlertValues.OBS_REPLAY_BUFFER_SAVED]: 'Obs Replay Buffer Saved',
	[LumiaAlertValues.OBS_VERTICAL_BACKTRACK_SAVED]: 'Obs Vertical Backtrack Saved',
	[LumiaAlertValues.OBS_VENDOR_EVENT]: 'Obs Vendor Event',
	[LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: 'Slobs Switch Scene Collection',
	[LumiaAlertValues.SLOBS_SWITCH_SCENE]: 'Slobs Switch Scene',
	[LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: 'Slobs Scene Item Visibility',
	[LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN]: 'Slobs Scene Item Hidden',
	[LumiaAlertValues.SPOTIFY_SWITCH_SONG]: 'Spotify Switch Song',
	[LumiaAlertValues.SPOTIFY_SONG_PLAYED]: 'Spotify Song Played',
	[LumiaAlertValues.SPOTIFY_SONG_PAUSED]: 'Spotify Song Paused',
	[LumiaAlertValues.YOUTUBEMUSIC_SWITCH_SONG]: 'Youtube Music Switch Song',
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PLAYED]: 'Youtube Music Song Played',
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PAUSED]: 'Youtube Music Song Paused',
	[LumiaAlertValues.NOWPLAYING_SWITCH_SONG]: 'Nowplaying Switch Song',
	[LumiaAlertValues.NOWPLAYING_SONG_PLAYED]: 'Nowplaying Song Played',
	[LumiaAlertValues.NOWPLAYING_SONG_PAUSED]: 'Nowplaying Song Paused',
	[LumiaAlertValues.VLC_SWITCH_SONG]: 'Vlc Switch Song',
	[LumiaAlertValues.VLC_SONG_PLAYED]: 'Vlc Song Played',
	[LumiaAlertValues.VLC_SONG_PAUSED]: 'Vlc Song Paused',
	[LumiaAlertValues.PULSE_HEARTRATE]: 'Pulse Heartrate',
	[LumiaAlertValues.PULSE_CALORIES]: 'Pulse Calories',
	[LumiaAlertValues.TWITTER_FOLLOWER]: 'Twitter Follower',
	[LumiaAlertValues.TWITTER_LIKE]: 'Twitter Like',
	[LumiaAlertValues.TWITTER_RETWEET]: 'Twitter Retweet',
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: 'Woocommerce Order',
	[LumiaAlertValues.KOFI_DONATION]: 'Kofi Tip',
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: 'Kofi Subscription',
	[LumiaAlertValues.KOFI_COMMISSION]: 'Kofi Commission',
	[LumiaAlertValues.KOFI_SHOPORDER]: 'Kofi Shop Order',
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
