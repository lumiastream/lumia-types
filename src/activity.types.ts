export enum LumiaStreamingSites {
	TWITCH = 'twitch',
	YOUTUBE = 'youtube',
	FACEBOOK = 'facebook',
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
	KICK_POINTS = 'kick-points',
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
	RESUME_QUEUE = 'resume-queue',
	PAUSE_QUEUE = 'pause-queue',
	REMOVE_CURRENT_QUEUE_ITEM = 'remove-current-queue-item',

	SET_COMMNAD_STATE = 'set-command-state',
	SET_FOLDER_STATE = 'set-folder-state',

	CLEAR_QUEUE = 'clear-queue',
	CLEAR_COOLDOWNS = 'clear-cooldowns',
	CHATBOT_MESSAGE = 'chatbot-message',
	TTS = 'tts',
	COMMUNITY_TEST = 'community-test',
	UPDATE_VARIABLE_VALUE = 'update-variable-value',
	GET_VARIABLE_VALUE = 'get-variable-value',
	SPOTIFY = 'send-spotify-command',
	VLC = 'send-vlc-command',
	TWITTER = 'send-twitter-command',

	// Stream Commands
	CHANGE_STREAM_TITLE = 'change-stream-title',
	CHANGE_CURRENT_CATEGORY = 'change-current-category',
	CREATE_STREAM_MARKER = 'create-stream-marker',
	RUN_COMMERCIAL = 'run-commercial',
	SET_SLOW_MODE = 'set-slow-mode',
	SET_SUBSCRIBER_MODE = 'set-subscriber-mode',
	SET_FOLLOW_MODE = 'set-follow-mode',
	SET_EMOTES_MODE = 'set-emotes-mode',
	SEND_ANNOUNCEMENT = 'send-announcement',
	CLIP = 'clip',
	CREATE_POLL = 'create-poll',
	END_POLL = 'end-poll',
	CREATE_PREDICTION = 'create-prediction',
	END_PREDICTION = 'end-prediction',
	CLEAR_CHAT = 'clear-chat',

	// Chat Box Mod Commands
	TRANSLATE_MESSAGE = 'translate-message',
	DELETE_MESSAGE = 'delete-message',
	BAN_USER = 'ban-user',
	UNBAN_USER = 'unban-user',
	TIMEOUT_USER = 'timeout-user',
	ADD_LOYALTY_POINTS = 'add-loyalty-points',
	GET_LOYALTY_POINTS = 'get-loyalty-points',
	SHOUTOUT = 'shoutout',
	ADD_VIP = 'add-vip',
	REMOVE_VIP = 'remove-vip',
	ADD_MODERATOR = 'add-moderator',
	REMOVE_MODERATOR = 'remove-moderator',

	// Overlay Commands
	OVERLAY_SET_OVERLAY_VISIBILITY = 'overlay-set-visibility',
	OVERLAY_SET_LAYER_VISIBILITY = 'overlay-set-layer-visibility',
	OVERLAY_SET_LAYER_POSITION = 'overlay-set-layer-position',
	OVERLAY_SET_CONTENT = 'overlay-set-content',
	OVERLAY_SCREENSHOT = 'overlay-screenshot',
	OVERLAY_SCREENSHOT_RESPONSE = 'overlay-screenshot-response', // Response to OVERLAY_SCREENSHOT, internal

	// HUD Commands
	HUD_OVERLAY_CHANGE = 'hud-overlay-change',
	HUD_TOGGLE = 'hud-toggle',
	HUD_VOLUME_SET = 'hud-volume-set',
	HUD_OPACITY_SET = 'hud-opacity-set',

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
	KICK_POINTS = 'kick-points',
	STUDIO_SCENE = 'studio-scene',
	STUDIO_ANIMATION = 'studio-animation',
	STUDIO_THEME = 'studio-theme',
	CHATBOT_MESSAGE = 'chatbot-messsage',
	TTS = 'tts',
}

/**
 * Comprehensive enum of all Lumia alert types.
 * Used to identify specific events in AlertEvent.alert field.
 */
export enum LumiaAlertValues {
	// Lumia Stream specific alerts
	/** Lumia Stream donation received */
	LUMIASTREAM_DONATION = 'lumiastream-donation',
	/** Lumia application opened */
	LUMIASTREAM_LUMIA_OPENED = 'lumiastream-lumiaOpened',
	/** Lumia application closed */
	LUMIASTREAM_LUMIA_CLOSED = 'lumiastream-lumiaClosed',
	/** Stream mode activated */
	LUMIASTREAM_STREAMMODE_ON = 'lumiastream-streammodeOn',
	/** Stream mode deactivated */
	LUMIASTREAM_STREAMMODE_OFF = 'lumiastream-streammodeOff',
	/** Raffle started */
	LUMIASTREAM_RAFFLE_START = 'lumiastream-raffleStart',
	/** Raffle stopped */
	LUMIASTREAM_RAFFLE_STOP = 'lumiastream-raffleStop',
	/** Raffle winner selected */
	LUMIASTREAM_RAFFLE_WINNER = 'lumiastream-raffleWinner',
	/** Spin wheel winner selected */
	LUMIASTREAM_SPINWHEEL_WINNER = 'lumiastream-spinwheelWinner',
	/** Poll started */
	LUMIASTREAM_POLL_STARTED = 'lumiastream-pollStarted',
	/** Poll progress update */
	LUMIASTREAM_POLL_PROGRESSED = 'lumiastream-pollProgressed',
	/** Poll ended */
	LUMIASTREAM_POLL_ENDED = 'lumiastream-pollEnded',
	/** Viewer queue started */
	LUMIASTREAM_VIEWERQUEUE_STARTED = 'lumiastream-viewerqueueStarted',
	/** Viewer queue ended */
	LUMIASTREAM_VIEWERQUEUE_ENDED = 'lumiastream-viewerqueueEnded',
	/** Viewer achievement unlocked */
	LUMIASTREAM_VIEWER_ACHIEVEMENT = 'lumiastream-viewerAchievement',
	/** Template variable value changed */
	LUMIASTREAM_VARIABLE_CHANGED = 'lumiastream-variableChanged',
	/** Roulette winner selected */
	LUMIASTREAM_ROULETTE_WINNER = 'lumiastream-rouletteWinner',
	/** Slots winner */
	LUMIASTREAM_SLOTS_WINNER = 'lumiastream-slotsWinner',

	// Twitch alerts
	/** Twitch extension interaction */
	TWITCH_EXTENSION = 'twitch-extension',
	/** Twitch channel points redemption */
	TWITCH_POINTS = 'twitch-points',
	/** Twitch stream went live */
	TWITCH_STREAM_LIVE = 'twitch-streamLive',
	/** Twitch stream went offline */
	TWITCH_STREAM_OFFLINE = 'twitch-streamOffline',
	/** First chat message in stream */
	TWITCH_FIRST_CHATTER = 'twitch-firstChatter',
	/** User entered the stream */
	TWITCH_ENTRANCE = 'twitch-entrance',
	/** New follower */
	TWITCH_FOLLOWER = 'twitch-follower',
	/** Total Session followers count */
	TWITCH_SESSION_FOLLOWERS = 'twitch-sessionFollowers',
	/** New subscription */
	TWITCH_SUBSCRIBER = 'twitch-subscriber',
	/** Total Session subs count */
	TWITCH_SESSION_SUBS = 'twitch-sessionSubs',
	/** Gift subscription given */
	TWITCH_GIFT_SUBSCRIPTION = 'twitch-giftSubscription',
	/** Total Session gifts count */
	TWITCH_SESSION_GIFT_SUBSCRIPTIONS = 'twitch-sessionGiftSubscriptions',
	/** Incoming raid */
	TWITCH_RAID = 'twitch-raid',
	/** Outgoing raid */
	TWITCH_RAID_OUT = 'twitch-raidOut',
	/** Bits cheered */
	TWITCH_BITS = 'twitch-bits',
	/** Total Session bits count */
	TWITCH_SESSION_BITS = 'twitch-sessionBits',
	/** Channel points redemption */
	TWITCH_REDEMPTION = 'twitch-redemption',
	/** Hype train started */
	TWITCH_HYPETRAIN_STARTED = 'twitch-hypetrainStarted',
	/** Hype train progress */
	TWITCH_HYPETRAIN_PROGRESSED = 'twitch-hypetrainProgressed',
	/** Hype train level increased */
	TWITCH_HYPETRAIN_LEVEL_PROGRESSED = 'twitch-hypetrainLevelProgressed',
	/** Hype train ended */
	TWITCH_HYPETRAIN_ENDED = 'twitch-hypetrainEnded',
	/** Poll started */
	TWITCH_POLL_STARTED = 'twitch-pollStarted',
	/** Poll progress update */
	TWITCH_POLL_PROGRESSED = 'twitch-pollProgressed',
	/** Poll ended */
	TWITCH_POLL_ENDED = 'twitch-pollEnded',
	/** Prediction started */
	TWITCH_PREDICTION_STARTED = 'twitch-predictionStarted',
	/** Prediction progress update */
	TWITCH_PREDICTION_PROGRESSED = 'twitch-predictionProgressed',
	/** Prediction locked */
	TWITCH_PREDICTION_LOCKED = 'twitch-predictionLocked',
	/** Prediction ended */
	TWITCH_PREDICTION_ENDED = 'twitch-predictionEnded',
	/** Goal started */
	TWITCH_GOAL_STARTED = 'twitch-goalStarted',
	/** Goal progress update */
	TWITCH_GOAL_PROGRESSED = 'twitch-goalProgressed',
	/** Goal completed */
	TWITCH_GOAL_ENDED = 'twitch-goalEnded',
	/** Charity donation */
	TWITCH_CHARITY_DONATION = 'twitch-charityDonation',
	/** Charity campaign started */
	TWITCH_CHARITY_CAMPAIGN_STARTED = 'twitch-charityCampaignStarted',
	/** Charity campaign progress */
	TWITCH_CHARITY_CAMPAIGN_PROGRESSED = 'twitch-charityCampaignProgressed',
	/** Charity campaign stopped */
	TWITCH_CHARITY_CAMPAIGN_STOPPED = 'twitch-charityCampaignStopped',
	/** Stream category changed */
	TWITCH_CATEGORY = 'twitch-categoryChanged',
	/** Clip created */
	TWITCH_CLIP = 'twitch-clip',
	/** User joined channel */
	TWITCH_CHANNEL_JOIN = 'twitch-channelJoin',
	/** User left channel */
	TWITCH_CHANNEL_LEAVE = 'twitch-channelLeave',
	/** User banned */
	TWITCH_BANNED = 'twitch-banned',
	/** User timed out */
	TWITCH_TIMEOUT = 'twitch-timeout',
	/** User timeout expired */
	TWITCH_TIMEOUT_OVER = 'twitch-timeoutOver',
	/** Shoutout received */
	TWITCH_SHOUTOUT_RECEIVE = 'twitch-shoutoutReceive',
	/** Ad break started */
	TWITCH_AD_STARTED = 'twitch-adStarted',
	/** Ad break ended */
	TWITCH_AD_STOPPED = 'twitch-adStopped',
	/** Power-ups used */
	TWITCH_POWERUPS = 'twitch-powerups',
	/** Power-up points earned */
	TWITCH_POWERUPS_POINTS = 'twitch-powerupsPoints',

	// YouTube alerts
	/** YouTube stream went live */
	YOUTUBE_STREAM_LIVE = 'youtube-streamLive',
	/** YouTube stream went offline */
	YOUTUBE_STREAM_OFFLINE = 'youtube-streamOffline',
	/** First YouTube chat message */
	YOUTUBE_FIRST_CHATTER = 'youtube-firstChatter',
	/** YouTube user entrance */
	YOUTUBE_ENTRANCE = 'youtube-entrance',
	/** YouTube new subscriber */
	YOUTUBE_SUBSCRIBER = 'youtube-subscriber',
	/** YouTube session subscribers */
	YOUTUBE_SESSION_SUBS = 'youtube-sessionSubs',
	/** YouTube channel membership */
	YOUTUBE_MEMBER = 'youtube-member',
	/** YouTube session members */
	YOUTUBE_SESSION_MEMBERS = 'youtube-sessionMembers',
	/** YouTube gift members */
	YOUTUBE_GIFT_MEMBERS = 'youtube-giftMembers',
	/** YouTube session gift members */
	YOUTUBE_SESSION_GIFT_MEMBERS = 'youtube-sessionGiftMembers',
	/** YouTube Super Chat */
	YOUTUBE_SUPERCHAT = 'youtube-superchat',
	/** YouTube session superchats */
	YOUTUBE_SESSION_SUPERCHATS = 'youtube-sessionSuperchats',
	/** YouTube Super Sticker */
	YOUTUBE_SUPERSTICKER = 'youtube-supersticker',
	/** YouTube session superstickers */
	YOUTUBE_SESSION_SUPERSTICKERS = 'youtube-sessionSuperstickers',
	/** YouTube total likes */
	YOUTUBE_LIKE = 'youtube-like',
	/** YouTube total views */
	YOUTUBE_VIEWERS = 'youtube-viewers',

	// Facebook alerts
	/** Facebook stream went live */
	FACEBOOK_STREAM_LIVE = 'facebook-streamLive',
	/** Facebook stream went offline */
	FACEBOOK_STREAM_OFFLINE = 'facebook-streamOffline',
	/** First Facebook chat message */
	FACEBOOK_FIRST_CHATTER = 'facebook-firstChatter',
	/** Facebook user entrance */
	FACEBOOK_ENTRANCE = 'facebook-entrance',
	/** Facebook new follower */
	FACEBOOK_FOLLOWER = 'facebook-follower',
	/** Facebook reaction */
	FACEBOOK_REACTION = 'facebook-reaction',
	/** Facebook stars received */
	FACEBOOK_STAR = 'facebook-star',
	/** Facebook support */
	FACEBOOK_SUPPORT = 'facebook-support',
	/** Facebook gift subscription */
	FACEBOOK_GIFT_SUBSCRIPTION = 'facebook-subscriptionGift',
	/** Facebook share */
	FACEBOOK_SHARE = 'facebook-share',
	/** Facebook fan */
	FACEBOOK_FAN = 'facebook-fan',

	// TikTok alerts
	/** First TikTok chat message */
	TIKTOK_FIRST_CHATTER = 'tiktok-firstChatter',
	/** TikTok user entrance */
	TIKTOK_ENTRANCE = 'tiktok-entrance',
	/** TikTok new follower */
	TIKTOK_FOLLOWER = 'tiktok-follower',
	/** TikTok like received */
	TIKTOK_LIKE = 'tiktok-like',
	/** TikTok total likes */
	TIKTOK_TOTAL_LIKES = 'tiktok-totalLikes',
	/** TikTok gift received */
	TIKTOK_GIFT = 'tiktok-gift',
	/** TikTok new subscriber */
	TIKTOK_SUBSCRIBER = 'tiktok-subscriber',
	/** TikTok share */
	TIKTOK_SHARE = 'tiktok-share',
	/** TikTok stream ended */
	TIKTOK_STREAM_END = 'tiktok-streamEnd',
	/** New TikTok video posted */
	TIKTOK_NEW_VIDEO = 'tiktok-newVideo',

	// Kick alerts
	/** Kick points earned */
	KICK_POINTS = 'kick-points',
	/** First Kick chat message */
	KICK_FIRST_CHATTER = 'kick-firstChatter',
	/** Kick user entrance */
	KICK_ENTRANCE = 'kick-entrance',
	/** Kick new follower */
	KICK_FOLLOWER = 'kick-follower',
	/** Total Session followers count */
	KICK_SESSION_FOLLOWERS = 'kick-sessionFollowers',
	/** Kick new subscriber */
	KICK_SUBSCRIBER = 'kick-subscriber',
	/** Total Session subs count */
	KICK_SESSION_SUBS = 'kick-sessionSubs',
	/** Kick gift subscription */
	KICK_GIFT_SUBSCRIPTION = 'kick-subscriptionGift',
	/** Total Session gifts count */
	KICK_SESSION_GIFT_SUBSCRIPTIONS = 'kick-sessionGiftSubscriptions',
	/** Kick kicks */
	KICK_KICKS = 'kick-kicks',
	/** Kick Session kicks */
	KICK_SESSION_KICKS = 'kick-sessionKicks',
	/** Kick host */
	KICK_HOST = 'kick-host',
	/** Kick user banned */
	KICK_BANNED = 'kick-banned',
	/** Kick user unbanned */
	KICK_UNBANNED = 'kick-unbanned',

	// Discord alerts
	/** First Discord message */
	DISCORD_FIRST_CHATTER = 'discord-firstChatter',
	/** Discord user entrance */
	DISCORD_ENTRANCE = 'discord-entrance',

	// Third-party donation platforms
	/** Streamlabs donation */
	STREAMLABS_DONATION = 'streamlabs-donation',
	/** Streamlabs charity donation */
	STREAMLABS_CHARITY = 'streamlabs-charity',
	/** Streamlabs merchandise purchase */
	STREAMLABS_MERCH = 'streamlabs-merch',
	/** Streamlabs redemption */
	STREAMLABS_REDEMPTION = 'streamlabs-redemption',
	/** Streamlabs Prime gift */
	STREAMLABS_PRIMEGIFT = 'streamlabs-primegift',
	/** StreamElements donation */
	STREAMELEMENTS_DONATION = 'streamelements-donation',
	/** Extra Life donation */
	EXTRALIFE_DONATION = 'extralife-donation',
	/** DonorDrive donation */
	DONORDRIVE_DONATION = 'donordrive-donation',
	/** Tiltify campaign donation */
	TILTIFY_DONATION = 'tiltify-campaignDonation',
	/** TipeeeStream donation */
	TIPEEESTREAM_DONATION = 'tipeeestream-donation',
	/** TreatStream treat */
	TREATSTREAM_TREAT = 'treatstream-treat',
	/** Patreon pledge */
	PATREON_PLEDGE = 'patreon-campaignPledge',
	/** Ko-fi donation */
	KOFI_DONATION = 'kofi-donation',
	/** Ko-fi subscription */
	KOFI_SUBSCRIPTION = 'kofi-subscription',
	/** Ko-fi commission */
	KOFI_COMMISSION = 'kofi-commission',
	/** Ko-fi shop order */
	KOFI_SHOPORDER = 'kofi-shopOrder',
	/** Fourthwall shop order */
	FOURTHWALL_SHOPORDER = 'fourthwall-shopOrder',
	/** Fourthwall donation */
	FOURTHWALL_DONATION = 'fourthwall-donation',
	/** Fourthwall subscription */
	FOURTHWALL_SUBSCRIPTION = 'fourthwall-subscription',
	/** Fourthwall gift purchase */
	FOURTHWALL_GIFTPURCHASE = 'fourthwall-giftpurchase',
	/** Fourthwall giveaway started */
	FOURTHWALL_GIVEAWAY_STARTED = 'fourthwall-giveawayStarted',
	/** Fourthwall giveaway ended */
	FOURTHWALL_GIVEAWAY_ENDED = 'fourthwall-giveawayEnded',
	/** Fourthwall thank you sent */
	FOURTHWALL_THANKYOU_SENT = 'fourthwall-thankyouSent',

	// OBS Studio events
	/** OBS profile switched */
	OBS_SWITCH_PROFILE = 'obs-switchProfile',
	/** OBS scene switched */
	OBS_SWITCH_SCENE = 'obs-switchScene',
	/** OBS scene item visibility changed */
	OBS_SCENE_ITEM_VISIBILITY = 'obs-sceneItemVisibility',
	/** OBS scene item hidden */
	OBS_SCENE_ITEM_HIDDEN = 'obs-sceneItemHidden',
	/** OBS transition switched */
	OBS_SWITCH_TRANSITION = 'obs-switchTransition',
	/** OBS transition started */
	OBS_TRANSITION_BEGIN = 'obs-transitionBegin',
	/** OBS transition ended */
	OBS_TRANSITION_END = 'obs-transitionEnd',
	/** OBS stream starting */
	OBS_STREAM_STARTING = 'obs-streamStarting',
	/** OBS stream stopping */
	OBS_STREAM_STOPPING = 'obs-streamStopping',
	/** OBS recording starting */
	OBS_RECORDING_STARTING = 'obs-recordingStarting',
	/** OBS recording stopping */
	OBS_RECORDING_STOPPING = 'obs-recordingStopping',
	/** OBS replay buffer saved */
	OBS_REPLAY_BUFFER_SAVED = 'obs-replayBufferSaved',
	/** OBS vertical backtrack saved */
	OBS_VERTICAL_BACKTRACK_SAVED = 'obs-verticalBacktrackSaved',
	/** OBS vendor-specific event */
	OBS_VENDOR_EVENT = 'obs-vendorEvent',

	// Streamlabs OBS events
	/** SLOBS scene collection switched */
	SLOBS_SWITCH_SCENE_COLLECTION = 'slobs-switchSceneCollection',
	/** SLOBS scene switched */
	SLOBS_SWITCH_SCENE = 'slobs-switchScene',
	/** SLOBS scene item visibility changed */
	SLOBS_SCENE_ITEM_VISIBILITY = 'slobs-sceneItemVisibility',
	/** SLOBS scene item hidden */
	SLOBS_SCENE_ITEM_HIDDEN = 'slobs-sceneItemHidden',

	// Music player events
	/** Spotify song changed */
	SPOTIFY_SWITCH_SONG = 'spotify-switchSong',
	/** Spotify song started playing */
	SPOTIFY_SONG_PLAYED = 'spotify-songPlayed',
	/** Spotify song paused */
	SPOTIFY_SONG_PAUSED = 'spotify-songPaused',
	/** YouTube Music song changed */
	YOUTUBEMUSIC_SWITCH_SONG = 'youtubemusic-switchSong',
	/** YouTube Music song started playing */
	YOUTUBEMUSIC_SONG_PLAYED = 'youtubemusic-songPlayed',
	/** YouTube Music song paused */
	YOUTUBEMUSIC_SONG_PAUSED = 'youtubemusic-songPaused',
	/** Now Playing song changed */
	NOWPLAYING_SWITCH_SONG = 'nowplaying-switchSong',
	/** Now Playing song started */
	NOWPLAYING_SONG_PLAYED = 'nowplaying-songPlayed',
	/** Now Playing song paused */
	NOWPLAYING_SONG_PAUSED = 'nowplaying-songPaused',
	/** VLC song changed */
	VLC_SWITCH_SONG = 'vlc-switchSong',
	/** VLC song started playing */
	VLC_SONG_PLAYED = 'vlc-songPlayed',
	/** VLC song paused */
	VLC_SONG_PAUSED = 'vlc-songPaused',

	// Health & fitness
	/** Heart rate update from Pulse */
	PULSE_HEARTRATE = 'pulse-heartrate',
	/** Calories burned update from Pulse */
	PULSE_CALORIES = 'pulse-calories',

	// Social media
	/** New Twitter/X follower */
	TWITTER_FOLLOWER = 'twitter-follower',
	/** Twitter/X like received */
	TWITTER_LIKE = 'twitter-like',
	/** Twitter/X retweet */
	TWITTER_RETWEET = 'twitter-retweet',

	// E-commerce
	/** WooCommerce order received */
	WOOCOMMERCE_ORDER = 'woocommerce-order',

	// Other integrations
	/** Streamer.bot action executed */
	STREAMERBOT_ACTION = 'streamerbot-action',
	/** Crowd Control effect triggered */
	CROWDCONTROL_EFFECT = 'crowdcontrol-effect',

	// VTube Studio events
	/** VTube Studio hotkey triggered */
	VTUBESTUDIO_HOTKEY_TRIGGERED = 'vtubestudio-hotkeyTriggered',
	/** VTube Studio model loaded */
	VTUBESTUDIO_MODEL_LOADED = 'vtubestudio-modelLoaded',
	/** VTube Studio animation started */
	VTUBESTUDIO_ANIMATION_START = 'vtubestudio-animationStart',
	/** VTube Studio animation ended */
	VTUBESTUDIO_ANIMATION_END = 'vtubestudio-animationEnd',
	/** VTube Studio item added */
	VTUBESTUDIO_ITEM_ADDED = 'vtubestudio-itemAdded',
	/** VTube Studio item removed */
	VTUBESTUDIO_ITEM_REMOVED = 'vtubestudio-itemRemoved',
	/** VTube Studio background changed */
	VTUBESTUDIO_BACKGROUND_CHANGED = 'vtubestudio-backgroundChanged',

	// Meld Studio events
	/** Meld stream starting */
	MELD_STREAM_STARTING = 'meld-streamStarting',
	/** Meld stream stopping */
	MELD_STREAM_STOPPING = 'meld-streamStopping',
	/** Meld recording starting */
	MELD_RECORDING_STARTING = 'meld-recordingStarting',
	/** Meld recording stopping */
	MELD_RECORDING_STOPPING = 'meld-recordingStopping',
	/** Meld scene switched */
	MELD_SWITCH_SCENE = 'meld-switchScene',
	/** Meld vertical scene switched */
	MELD_SWITCH_VERTICAL_SCENE = 'meld-switchVerticalScene',
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
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_STARTED]: 'Viewer Queue Started',
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_ENDED]: 'Viewer Queue Ended',
	[LumiaAlertValues.LUMIASTREAM_VIEWER_ACHIEVEMENT]: 'Viewer Achievement',
	[LumiaAlertValues.LUMIASTREAM_VARIABLE_CHANGED]: 'Variable Changed',
	[LumiaAlertValues.LUMIASTREAM_ROULETTE_WINNER]: 'Roulette Winner',
	[LumiaAlertValues.LUMIASTREAM_SLOTS_WINNER]: 'Slots Winner',
	[LumiaAlertValues.TWITCH_EXTENSION]: 'Twitch Extension',
	[LumiaAlertValues.TWITCH_POINTS]: 'Twitch Points',
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: 'Twitch Stream Live',
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: 'Twitch Stream Offline',
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: 'Twitch First Chatter',
	[LumiaAlertValues.TWITCH_ENTRANCE]: 'Twitch Entrance',
	[LumiaAlertValues.TWITCH_FOLLOWER]: 'Twitch Follower',
	[LumiaAlertValues.TWITCH_SESSION_FOLLOWERS]: 'Twitch Session Followers',
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: 'Twitch Subscriber',
	[LumiaAlertValues.TWITCH_SESSION_SUBS]: 'Twitch Session Subs',
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: 'Twitch Gift Subscription',
	[LumiaAlertValues.TWITCH_SESSION_GIFT_SUBSCRIPTIONS]: 'Twitch Session Gift Subscriptions',
	[LumiaAlertValues.TWITCH_RAID]: 'Twitch Raid',
	[LumiaAlertValues.TWITCH_RAID_OUT]: 'Twitch Raid Out',
	[LumiaAlertValues.TWITCH_BITS]: 'Twitch Bits',
	[LumiaAlertValues.TWITCH_SESSION_BITS]: 'Twitch Session Bits',
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
	[LumiaAlertValues.TWITCH_POWERUPS]: 'Twitch Powerups',
	[LumiaAlertValues.TWITCH_POWERUPS_POINTS]: 'Twitch Powerups points',
	[LumiaAlertValues.YOUTUBE_STREAM_LIVE]: 'Youtube Stream Live',
	[LumiaAlertValues.YOUTUBE_STREAM_OFFLINE]: 'Youtube Stream Offline',
	[LumiaAlertValues.YOUTUBE_FIRST_CHATTER]: 'Youtube First Chatter',
	[LumiaAlertValues.YOUTUBE_MEMBER]: 'Youtube Member',
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: 'Youtube Subscriber',
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: 'Youtube Superchat',
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: 'Youtube Supersticker',
	[LumiaAlertValues.YOUTUBE_ENTRANCE]: 'Youtube Entrance',
	[LumiaAlertValues.YOUTUBE_LIKE]: 'Youtube Like',
	[LumiaAlertValues.YOUTUBE_VIEWERS]: 'Youtube Viewers',
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
	[LumiaAlertValues.TIKTOK_FIRST_CHATTER]: 'Tiktok First Chatter',
	[LumiaAlertValues.TIKTOK_FOLLOWER]: 'Tiktok Follower',
	[LumiaAlertValues.TIKTOK_LIKE]: 'Tiktok Like',
	[LumiaAlertValues.TIKTOK_TOTAL_LIKES]: 'Tiktok Total Likes',
	[LumiaAlertValues.TIKTOK_GIFT]: 'Tiktok Gift',
	[LumiaAlertValues.TIKTOK_SUBSCRIBER]: 'Tiktok Subscriber',
	[LumiaAlertValues.TIKTOK_SHARE]: 'Tiktok Share',
	[LumiaAlertValues.TIKTOK_STREAM_END]: 'Tiktok Stream Ended',
	[LumiaAlertValues.TIKTOK_NEW_VIDEO]: 'Tiktok New Video',
	[LumiaAlertValues.TIKTOK_ENTRANCE]: 'Tiktok Entrance',
	[LumiaAlertValues.KICK_POINTS]: 'Kick Points',
	[LumiaAlertValues.KICK_FIRST_CHATTER]: 'Kick First Chatter',
	[LumiaAlertValues.KICK_FOLLOWER]: 'Kick Follower',
	[LumiaAlertValues.KICK_SESSION_FOLLOWERS]: 'Kick Session Followers',
	[LumiaAlertValues.KICK_SUBSCRIBER]: 'Kick Subscriber',
	[LumiaAlertValues.KICK_SESSION_SUBS]: 'Kick Session Subs',
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: 'Kick Gift Subscription',
	[LumiaAlertValues.KICK_SESSION_GIFT_SUBSCRIPTIONS]: 'Kick Session Gift Subscriptions',
	[LumiaAlertValues.KICK_KICKS]: 'Kick Kicks',
	[LumiaAlertValues.KICK_SESSION_KICKS]: 'Kick Session Kicks',
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
	[LumiaAlertValues.FOURTHWALL_SHOPORDER]: 'Fourthwall Shop Order',
	[LumiaAlertValues.FOURTHWALL_DONATION]: 'Fourthwall Donation',
	[LumiaAlertValues.FOURTHWALL_SUBSCRIPTION]: 'Fourthwall Subscription',
	[LumiaAlertValues.FOURTHWALL_GIFTPURCHASE]: 'Fourthwall Giftpurchase',
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_STARTED]: 'Fourthwall Giveaway Started',
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_ENDED]: 'Fourthwall Giveaway Ended',
	[LumiaAlertValues.FOURTHWALL_THANKYOU_SENT]: 'Fourthwall Thank You Sent',
	[LumiaAlertValues.CROWDCONTROL_EFFECT]: 'Crowdcontrol Effect',
	[LumiaAlertValues.VTUBESTUDIO_HOTKEY_TRIGGERED]: 'Vtube Hotkey Triggered',
	[LumiaAlertValues.VTUBESTUDIO_MODEL_LOADED]: 'Vtube Model Loaded',
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_START]: 'Vtube Animation Start',
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_END]: 'Vtube Animation End',
	[LumiaAlertValues.VTUBESTUDIO_ITEM_ADDED]: 'Vtube Item Added',
	[LumiaAlertValues.VTUBESTUDIO_ITEM_REMOVED]: 'Vtube Item Removed',
	[LumiaAlertValues.VTUBESTUDIO_BACKGROUND_CHANGED]: 'Vtube Background Changed',
	[LumiaAlertValues.MELD_STREAM_STARTING]: 'Meld Stream Starting',
	[LumiaAlertValues.MELD_STREAM_STOPPING]: 'Meld Stream Stopping',
	[LumiaAlertValues.MELD_RECORDING_STARTING]: 'Meld Recording Starting',
	[LumiaAlertValues.MELD_RECORDING_STOPPING]: 'Meld Recording Stopping',
};

// Where did the Activity Originate from: Chat, alerts, shortcut, api, etc.
export enum LumiaActivityOriginTypes {
	SYSTEM = 'system', // Settings, Shortcut, or API
	ALERT = 'alert',
	CHAT = 'chat',
	CHATBOT = 'chatbot',
	TWITCH_POINTS = 'twitch-points',
	TWITCH_EXTENSION = 'twitch-extension',
	KICK_POINTS = 'kick-points',
	API = 'api',
	LUMIASTREAMLINK = 'lumiastreamlink',
	STREAMDECK = 'streamdeck',
	TOUCHPORTAL = 'touchportal',
	AVERMEDIA = 'avermedia',
	LOUPEDECK = 'loupedeck',
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
