// Any type of activity that can come in through the app. Anything that changes colors or accessories should be here
export enum LumiaActivityCommandTypes {
    TEST = 'test', // value: { type, config }
    ALERT = 'alert', // value: { alert: AlertTypes, variation?: string }
    CHAT = 'chat', // value: { site: 'twitch' | 'youtube' | 'facebook', message: string }
    DIRECT = 'direct',
    MIDI = 'midi', // value: { port: number, type: MIDI_COMMANDS, channel: number, note: MIDI_NOTES_TYPES, velocity: number }
    OSC = 'osc',
    MQTT = 'mqtt',
    ARTNET = 'artnet', // value: { presetName: string; device?: string; univers: string | number, values: IArtnetChannelValues[] }
    LIGHTS_OFF = 'lights-off',
    RGB_COLOR = 'rgb-color', // value: { color: [num, num, num], brightness?: number, transition?: number, duration?: number }
    HEX_COLOR = 'hex-color',
    CHAT_COMMAND = 'chat-command',
    CHAT_MATCH = 'chat-match',
    TWITCH_POINTS = 'twitch-points',
    TWITCH_POINTS_OUTPUT = 'twitch-points-output',
    TWITCH_EXTENSION = 'twitch-extension',
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
    TWITCH_SUBSCRIBER = 'twitch-subscriber',
    TWITCH_FOLLOWER = 'twitch-follower',
    TWITCH_HOST = 'twitch-host',
    TWITCH_RAID = 'twitch-raid',
    TWITCH_BITS = 'twitch-bits',
    TWITCH_REDEMPTION = 'twitch-redemption',
    YOUTUBE_MEMBER = 'youtube-member',
    YOUTUBE_SUBSCRIBER = 'youtube-subscriber',
    YOUTUBE_SUPERCHAT = 'youtube-superchat',
    YOUTUBE_SUPERSTICKER = 'youtube-supersticker',
    FACEBOOK_FOLLOWER = 'facebook-follower',
    FACEBOOK_REACTION = 'facebook-reaction',
    FACEBOOK_STAR = 'facebook-star',
    FACEBOOK_SUPPORT = 'facebook-support',
    FACEBOOK_SHARE = 'facebook-share',
    FACEBOOK_FAN = 'facebook-fan',
    GLIMESH_SUBSCRIBER = 'glimesh-subscriber',
    GLIMESH_FOLLOWER = 'glimesh-follower',
    TROVO_SUBSCRIBER = 'trovo-subscriber', // potential for Trovo, needs testing in POC
    TROVO_FOLLOWER = 'trovo-follower', // potential for Trovo, needs testing in POC
    TROVO_SPELL = 'trovo-spell', // potential for Trovo, needs testing in POC
    TIKTOK_FOLLOWER = 'tiktok-follower',
    TIKTOK_LIKE = 'tiktok-like',
    TIKTOK_GIFT = 'tiktok-gift',
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
    PAYPAL_PAYMENT_COMPLETE = 'paypal-paymentComplete',
    PAYPAL_PAYMENT_DENIED = 'paypal-paymentDenied',
    TIPEEESTREAM_DONATION = 'tipeeestream-donation',
    TREATSTREAM_TREAT = 'treatstream-treat',
    PATREON_PLEDGE = 'patreon-pledge',
    OBS_SWITCH_PROFILE = 'obs-switchProfile',
    OBS_SWITCH_SCENE = 'obs-switchScene',
    OBS_SCENE_ITEM_VISIBILITY = 'obs-sceneItemVisibility',
    OBS_SWITCH_TRANSITION = 'obs-switch-transition',
    OBS_TRANSITION_BEGIN = 'obs-transitionBegin',
    OBS_TRANSITION_END = 'obs-transitionEnd',
    OBS_STREAM_STARTING = 'obs-streamStarting',
    OBS_STREAM_STOPPING = 'obs-streamStopping',
    SLOBS_SWITCH_SCENE_COLLECTION = 'slobs-switchSceneCollection',
    SLOBS_SWITCH_SCENE = 'slobs-switchScene',
    SLOBS_SCENE_ITEM_VISIBILITY = 'slobs-sceneItemVisibility',
    SPOTIFY_SWITCH_SONG = 'spotify-switchSong',
    SPOTIFY_SONG_PLAYED = 'spotify-songPlayed',
    SPOTIFY_SONG_PAUSED = 'spotify-songPaused',
    VLC_SWITCH_SONG = 'vlc-switchSong',
    VLC_SONG_PLAYED = 'vlc-songPlayed',
    VLC_SONG_PAUSED = 'vlc-songPaused',
    PULSE_HEARTRATE = 'pulse-heartrate',
    PULSE_CALORIES = 'pulse-calories',
}

// Where did the Activity Originate from: Chat, alerts, shortcut, api, etc.
export enum LumiaActivityOriginTypes {
    SYSTEM = 'system', // Settings, Shortcut, or API
    ALEXA = 'alexa',
    ALERT = 'alert',
    CHAT = 'chat',
    TWITCH_POINTS = 'twitch-points',
    TWITCH_EXTENSION = 'twitch-extension',
    TROVO_SPELLS = 'trovo-spells',
    API = 'api',
    LUMIASTREAMLINK = 'lumiastreamlink',
    STREAMDECK = 'streamdeck',
    TOUCHPORTAL = 'touchportal',
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
    HYPE,
    ANIMATION,
    THEME,
    SCENE,
}
