import { LumiaAlertValues } from './activity.types';

/**
 * Eventlist categories. The eventlist module uses these as a *blacklist* via
 * `content.filters` — any category listed there is hidden from the rendered
 * feed (and so anything NOT listed is shown).
 *
 * Policy: every category here corresponds to a viewer-facing event class. We
 * deliberately do NOT have an "others" catch-all category — alerts that exist
 * only as stream-management / administrative signals (OBS scene switches,
 * stream-live notices, music-player events, poll progress, etc.) are simply
 * left out of `LumiaMapAlertTypeToEventListType` below. The eventlist
 * component only renders MAPPED alerts, so unmapped alerts are silently
 * excluded from every feed without needing a UI toggle.
 *
 * When adding a new value here, mirror it in:
 *   - `ALL_LUMIA_EVENTLIST_CATEGORIES` in Lumia-UI's SE importer
 *   - the `ALL_EVENT_CATEGORIES` constant in Overlay-UI's `layer.actions.ts`
 *     (labelmarquee branch)
 * Otherwise category-scoped widgets (`labelmarquee`, SE `*-recent` imports)
 * leak the new category through.
 */
export enum LumiaEventListTypes {
	REDEMPTION = 'redemption',
	FOLLOWER = 'follower',
	BITS = 'bits',
	KICKS = 'kicks',
	EXTENSION = 'extension',
	POINTS = 'points',
	DONATION = 'donation',
	SUBSCRIBERS = 'subscribers',
	GIFTS = 'gifts',
	HOSTS = 'hosts',
	RAIDS = 'raids',
	HYPETRAIN = 'hypetrain',
	SPELLS = 'spells',
	RETWEETS = 'retweets',
	LIKES = 'likes',
	PURCHASES = 'purchases',
	SUPERSTICKERS = 'superstickers',
	SUPERCHATS = 'superchats',
	STARS = 'stars',
	FANS = 'fans',
	SHARES = 'shares',
	RAFFLE = 'raffles',
	CHARITY = 'charity',
}

/**
 * Categorization map from `LumiaAlertValues` → `LumiaEventListTypes`. The
 * eventlist module ONLY renders alerts that appear in this map — anything
 * absent is silently excluded from every feed (no UI toggle to surface it).
 *
 * Policy:
 *   - Map only viewer-facing events. Stream-management / administrative
 *     signals (OBS / SLOBS / Meld scene switches, music-player events,
 *     poll/prediction/goal lifecycle, stream-live notices, channel
 *     join/leave, ad starts/stops, Pulse heartrate, etc.) are NOT mapped
 *     — they don't belong in a viewer-facing activity feed and have no UI
 *     toggle to bring them in.
 *   - Categorize by the *viewer's* intent, not payload shape. A Throne /
 *     Fourthwall shop gift purchase is a viewer buying something for the
 *     streamer → PURCHASES. A subscription-expired notice is admin, not a
 *     new subscriber → omit entirely (was OTHERS, now unmapped).
 *   - Session-counter alerts (e.g. TWITCH_SESSION_FOLLOWERS) mirror the
 *     category of their per-event cousin (FOLLOWER) so a counter widget
 *     can reuse the same category filter.
 *
 * Grouped by platform / source for review; ordering within groups follows
 * the enum declaration in `activity.types.ts`. Alerts that previously
 * mapped to OTHERS were removed in this revision and are now unmapped
 * (purposefully hidden from all eventlists).
 */
export const LumiaMapAlertTypeToEventListType: Partial<Record<LumiaAlertValues, LumiaEventListTypes>> = {
	// --- Lumia Stream native ---
	[LumiaAlertValues.LUMIASTREAM_DONATION]: LumiaEventListTypes.DONATION,

	// --- Twitch ---
	[LumiaAlertValues.TWITCH_EXTENSION]: LumiaEventListTypes.EXTENSION,
	[LumiaAlertValues.TWITCH_POINTS]: LumiaEventListTypes.POINTS,
	[LumiaAlertValues.TWITCH_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITCH_SESSION_FOLLOWERS]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TWITCH_SESSION_SUBS]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TWITCH_SESSION_GIFT_SUBSCRIPTIONS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TWITCH_RAID]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TWITCH_RAID_OUT]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TWITCH_BITS]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_BITS_COMBO]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_SESSION_BITS]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: LumiaEventListTypes.CHARITY,
	[LumiaAlertValues.TWITCH_POWERUPS]: LumiaEventListTypes.BITS,

	// --- YouTube ---
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.YOUTUBE_SESSION_SUBS]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.YOUTUBE_MEMBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.YOUTUBE_SESSION_MEMBERS]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.YOUTUBE_GIFT_MEMBERS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.YOUTUBE_SESSION_GIFT_MEMBERS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: LumiaEventListTypes.SUPERCHATS,
	[LumiaAlertValues.YOUTUBE_SESSION_SUPERCHATS]: LumiaEventListTypes.SUPERCHATS,
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: LumiaEventListTypes.SUPERSTICKERS,
	[LumiaAlertValues.YOUTUBE_SESSION_SUPERSTICKERS]: LumiaEventListTypes.SUPERSTICKERS,
	[LumiaAlertValues.YOUTUBE_GIFTS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.YOUTUBE_SESSION_GIFTS]: LumiaEventListTypes.GIFTS,

	// --- Facebook ---
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.FACEBOOK_REACTION]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.FACEBOOK_STAR]: LumiaEventListTypes.STARS,
	[LumiaAlertValues.FACEBOOK_SUPPORT]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.FACEBOOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.FACEBOOK_FAN]: LumiaEventListTypes.FANS,

	// --- TikTok ---
	[LumiaAlertValues.TIKTOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TIKTOK_GIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_SUPER_FAN]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TIKTOK_SUPER_FAN_BOX]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_TREASURE_CHEST]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_SHOP_PURCHASE]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TIKTOK_SHARE]: LumiaEventListTypes.SHARES,

	// --- Kick ---
	[LumiaAlertValues.KICK_POINTS]: LumiaEventListTypes.POINTS,
	[LumiaAlertValues.KICK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.KICK_SESSION_FOLLOWERS]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.KICK_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KICK_SESSION_SUBS]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.KICK_SESSION_GIFT_SUBSCRIPTIONS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.KICK_KICKS]: LumiaEventListTypes.KICKS,
	[LumiaAlertValues.KICK_SESSION_KICKS]: LumiaEventListTypes.KICKS,
	[LumiaAlertValues.KICK_HOST]: LumiaEventListTypes.HOSTS,

	// --- Third-party donation / commerce platforms ---
	[LumiaAlertValues.STREAMLABS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_CHARITY]: LumiaEventListTypes.CHARITY,
	[LumiaAlertValues.STREAMLABS_MERCH]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: LumiaEventListTypes.REDEMPTION,
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.EXTRALIFE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.DONORDRIVE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TILTIFY_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.THRONE_GIFT_PURCHASE]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.THRONE_CONTRIBUTION_PURCHASE]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.THRONE_GIFT_CROWDFUNDED]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TREATSTREAM_TREAT]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.PATREON_PLEDGE]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KOFI_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KOFI_COMMISSION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.KOFI_SHOPORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.FOURTHWALL_SHOPORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.FOURTHWALL_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.FOURTHWALL_SUBSCRIPTION]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.FOURTHWALL_SUBSCRIPTION_CHANGED]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.FOURTHWALL_GIFTPURCHASE]: LumiaEventListTypes.PURCHASES,

	// --- Social media (Twitter / X) ---
	[LumiaAlertValues.TWITTER_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITTER_RETWEET]: LumiaEventListTypes.RETWEETS,

	// --- E-commerce ---
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: LumiaEventListTypes.PURCHASES,
};

/**
 * Alerts that should NOT appear in the eventlist's user-facing picker AND
 * should NOT render in any eventlist feed. The invariant is:
 *
 *   - Every `LumiaAlertValues` member must appear in EITHER
 *     `LumiaMapAlertTypeToEventListType` (mapped → visible in the picker
 *     and eventlist) OR in `AlertsToFilter` (hidden everywhere). Never
 *     both, never neither.
 *
 * Shared between LumiaStream (`EventCollection.ts` skips processing these
 * to avoid spamming the event log, `EventListFilterPopover` hides them from
 * the picker) and Overlay-UI (eventlist Manager picker hides them, eventlist
 * component drops them at render). Was duplicated in both repos before
 * being consolidated here.
 *
 * Grouped by source / platform. When adding a new alert to
 * `LumiaAlertValues`, place it in EXACTLY ONE of the two lists. Default
 * choice is `AlertsToFilter` (hidden) unless it's a viewer-facing event
 * the eventlist should render.
 */
export const AlertsToFilter: LumiaAlertValues[] = [
	// --- Lumia Stream native ---
	LumiaAlertValues.LUMIASTREAM_LUMIA_OPENED,
	LumiaAlertValues.LUMIASTREAM_LUMIA_CLOSED,
	LumiaAlertValues.LUMIASTREAM_STREAMMODE_ON,
	LumiaAlertValues.LUMIASTREAM_STREAMMODE_OFF,
	LumiaAlertValues.LUMIASTREAM_SPINWHEEL_WINNER,
	LumiaAlertValues.LUMIASTREAM_RAFFLE_START,
	LumiaAlertValues.LUMIASTREAM_RAFFLE_STOP,
	LumiaAlertValues.LUMIASTREAM_RAFFLE_WINNER,
	LumiaAlertValues.LUMIASTREAM_TOURNAMENT_START,
	LumiaAlertValues.LUMIASTREAM_TOURNAMENT_END,
	LumiaAlertValues.LUMIASTREAM_TOURNAMENT_WINNER,
	LumiaAlertValues.LUMIASTREAM_POLL_STARTED,
	LumiaAlertValues.LUMIASTREAM_POLL_PROGRESSED,
	LumiaAlertValues.LUMIASTREAM_POLL_ENDED,
	LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_STARTED,
	LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_ENDED,
	LumiaAlertValues.LUMIASTREAM_VIEWER_ACHIEVEMENT,
	LumiaAlertValues.LUMIASTREAM_VARIABLE_CHANGED,
	LumiaAlertValues.LUMIASTREAM_ROULETTE_WINNER,
	LumiaAlertValues.LUMIASTREAM_SLOTS_WINNER,

	// --- Twitch ---
	LumiaAlertValues.TWITCH_STREAM_LIVE,
	LumiaAlertValues.TWITCH_STREAM_OFFLINE,
	LumiaAlertValues.TWITCH_ENTRANCE,
	LumiaAlertValues.TWITCH_FIRST_CHATTER,
	LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED,
	LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED,
	LumiaAlertValues.TWITCH_HYPETRAIN_ENDED,
	LumiaAlertValues.TWITCH_REDEMPTION,
	LumiaAlertValues.TWITCH_POLL_STARTED,
	LumiaAlertValues.TWITCH_POLL_PROGRESSED,
	LumiaAlertValues.TWITCH_POLL_ENDED,
	LumiaAlertValues.TWITCH_PREDICTION_STARTED,
	LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED,
	LumiaAlertValues.TWITCH_PREDICTION_LOCKED,
	LumiaAlertValues.TWITCH_PREDICTION_ENDED,
	LumiaAlertValues.TWITCH_GOAL_STARTED,
	LumiaAlertValues.TWITCH_GOAL_PROGRESSED,
	LumiaAlertValues.TWITCH_GOAL_ENDED,
	LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED,
	LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_PROGRESSED,
	LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STOPPED,
	LumiaAlertValues.TWITCH_CATEGORY,
	LumiaAlertValues.TWITCH_CLIP,
	LumiaAlertValues.TWITCH_CHANNEL_JOIN,
	LumiaAlertValues.TWITCH_CHANNEL_LEAVE,
	LumiaAlertValues.TWITCH_BANNED,
	LumiaAlertValues.TWITCH_TIMEOUT,
	LumiaAlertValues.TWITCH_TIMEOUT_OVER,
	LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE,
	LumiaAlertValues.TWITCH_WARNED,
	LumiaAlertValues.TWITCH_SUSPICIOUS_USER_MESSAGE,
	LumiaAlertValues.TWITCH_SUSPICIOUS_USER_UPDATED,
	LumiaAlertValues.TWITCH_SHIELD_MODE_STARTED,
	LumiaAlertValues.TWITCH_SHIELD_MODE_ENDED,
	LumiaAlertValues.TWITCH_AD_STARTED,
	LumiaAlertValues.TWITCH_AD_STOPPED,
	LumiaAlertValues.TWITCH_WATCH_STREAK,
	LumiaAlertValues.TWITCH_MODIVERSARY,

	// --- YouTube ---
	LumiaAlertValues.YOUTUBE_STREAM_LIVE,
	LumiaAlertValues.YOUTUBE_STREAM_OFFLINE,
	LumiaAlertValues.YOUTUBE_ENTRANCE,
	LumiaAlertValues.YOUTUBE_FIRST_CHATTER,
	LumiaAlertValues.YOUTUBE_LIKE,
	LumiaAlertValues.YOUTUBE_VIEWERS,

	// --- Facebook ---
	LumiaAlertValues.FACEBOOK_STREAM_LIVE,
	LumiaAlertValues.FACEBOOK_STREAM_OFFLINE,
	LumiaAlertValues.FACEBOOK_ENTRANCE,
	LumiaAlertValues.FACEBOOK_FIRST_CHATTER,

	// --- TikTok ---
	LumiaAlertValues.TIKTOK_STREAM_END,
	LumiaAlertValues.TIKTOK_ENTRANCE,
	LumiaAlertValues.TIKTOK_FIRST_CHATTER,
	LumiaAlertValues.TIKTOK_NEW_VIDEO,
	LumiaAlertValues.TIKTOK_TOTAL_LIKES,
	LumiaAlertValues.TIKTOK_LIKE,
	LumiaAlertValues.TIKTOK_QUESTION,
	LumiaAlertValues.TIKTOK_POLL,
	LumiaAlertValues.TIKTOK_PIN_MESSAGE,
	LumiaAlertValues.TIKTOK_BATTLE_START,
	LumiaAlertValues.TIKTOK_BATTLE_PROGRESS,
	LumiaAlertValues.TIKTOK_BATTLE_END,

	// --- Kick ---
	LumiaAlertValues.KICK_ENTRANCE,
	LumiaAlertValues.KICK_FIRST_CHATTER,
	LumiaAlertValues.KICK_BANNED,
	LumiaAlertValues.KICK_UNBANNED,

	// --- Discord ---
	LumiaAlertValues.DISCORD_FIRST_CHATTER,
	LumiaAlertValues.DISCORD_ENTRANCE,

	// --- Third-party (Fourthwall housekeeping) ---
	LumiaAlertValues.FOURTHWALL_SUBSCRIPTION_EXPIRED,
	LumiaAlertValues.FOURTHWALL_GIVEAWAY_STARTED,
	LumiaAlertValues.FOURTHWALL_GIVEAWAY_ENDED,
	LumiaAlertValues.FOURTHWALL_THANKYOU_SENT,
	LumiaAlertValues.FOURTHWALL_NEWSLETTER_SUBSCRIBED,

	// --- Broadcasting apps (OBS / SLOBS / Meld) ---
	LumiaAlertValues.OBS_SWITCH_PROFILE,
	LumiaAlertValues.OBS_SWITCH_SCENE,
	LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY,
	LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN,
	LumiaAlertValues.OBS_SWITCH_TRANSITION,
	LumiaAlertValues.OBS_TRANSITION_BEGIN,
	LumiaAlertValues.OBS_TRANSITION_END,
	LumiaAlertValues.OBS_STREAM_STARTING,
	LumiaAlertValues.OBS_STREAM_STOPPING,
	LumiaAlertValues.OBS_RECORDING_STARTING,
	LumiaAlertValues.OBS_RECORDING_STOPPING,
	LumiaAlertValues.OBS_MEDIA_INPUT_PLAYBACK_STARTED,
	LumiaAlertValues.OBS_MEDIA_INPUT_PLAYBACK_ENDED,
	LumiaAlertValues.OBS_VIRTUALCAM_STATE_CHANGED,
	LumiaAlertValues.OBS_SCREENSHOT_SAVED,
	LumiaAlertValues.OBS_REPLAY_BUFFER_SAVED,
	LumiaAlertValues.OBS_VERTICAL_BACKTRACK_SAVED,
	LumiaAlertValues.OBS_VENDOR_EVENT,
	LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION,
	LumiaAlertValues.SLOBS_SWITCH_SCENE,
	LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY,
	LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN,
	LumiaAlertValues.MELD_STREAM_STARTING,
	LumiaAlertValues.MELD_STREAM_STOPPING,
	LumiaAlertValues.MELD_RECORDING_STARTING,
	LumiaAlertValues.MELD_RECORDING_STOPPING,
	LumiaAlertValues.MELD_SWITCH_SCENE,
	LumiaAlertValues.MELD_SWITCH_VERTICAL_SCENE,

	// --- Music players ---
	LumiaAlertValues.SPOTIFY_SWITCH_SONG,
	LumiaAlertValues.SPOTIFY_SONG_PLAYED,
	LumiaAlertValues.SPOTIFY_SONG_PAUSED,
	LumiaAlertValues.YOUTUBEMUSIC_SWITCH_SONG,
	LumiaAlertValues.YOUTUBEMUSIC_SONG_PLAYED,
	LumiaAlertValues.YOUTUBEMUSIC_SONG_PAUSED,
	LumiaAlertValues.NOWPLAYING_SWITCH_SONG,
	LumiaAlertValues.NOWPLAYING_SONG_PLAYED,
	LumiaAlertValues.NOWPLAYING_SONG_PAUSED,
	LumiaAlertValues.VLC_SWITCH_SONG,
	LumiaAlertValues.VLC_SONG_PLAYED,
	LumiaAlertValues.VLC_SONG_PAUSED,

	// --- Health / fitness ---
	LumiaAlertValues.PULSE_HEARTRATE,
	LumiaAlertValues.PULSE_CALORIES,

	// --- Social media ---
	LumiaAlertValues.TWITTER_LIKE,

	// --- Other integrations ---
	LumiaAlertValues.STREAMERBOT_ACTION,
	LumiaAlertValues.CROWDCONTROL_EFFECT,

	// --- VTube Studio ---
	LumiaAlertValues.VTUBESTUDIO_HOTKEY_TRIGGERED,
	LumiaAlertValues.VTUBESTUDIO_MODEL_LOADED,
	LumiaAlertValues.VTUBESTUDIO_ANIMATION_START,
	LumiaAlertValues.VTUBESTUDIO_ANIMATION_END,
	LumiaAlertValues.VTUBESTUDIO_ITEM_ADDED,
	LumiaAlertValues.VTUBESTUDIO_ITEM_REMOVED,
	LumiaAlertValues.VTUBESTUDIO_BACKGROUND_CHANGED,
];

/**
 * Platforms whose events should be hidden from the eventlist / event log
 * processing pipeline. These are connections whose alerts are stream
 * management or housekeeping (broadcasting apps, music players, health
 * trackers, automation tools) rather than viewer-facing activity.
 *
 * Used by LumiaStream's `EventCollection.ts` to short-circuit processing
 * before the event lands in the eventlist DB at all. Was duplicated in
 * LumiaStream `Integrations.types.ts` before being consolidated here.
 */
export const PlatformsToFilter: string[] = ['obs', 'slobs', 'meld', 'paypal', 'pulsoid', 'hyperate', 'spotify', 'youtubemusic', 'nowplaying', 'vlc', 'streamerbot', 'vtubestudio'];

export const LumiaEventListTypeColors: Record<LumiaEventListTypes, string> = {
	[LumiaEventListTypes.FOLLOWER]: '#22c55e',
	[LumiaEventListTypes.SUBSCRIBERS]: '#a855f7',
	[LumiaEventListTypes.GIFTS]: '#ec4899',
	[LumiaEventListTypes.DONATION]: '#10b981',
	[LumiaEventListTypes.CHARITY]: '#f97316',
	[LumiaEventListTypes.BITS]: '#facc15',
	[LumiaEventListTypes.KICKS]: '#84cc16',
	[LumiaEventListTypes.POINTS]: '#3b82f6',
	[LumiaEventListTypes.REDEMPTION]: '#06b6d4',
	[LumiaEventListTypes.EXTENSION]: '#8b5cf6',
	[LumiaEventListTypes.RAIDS]: '#ef4444',
	[LumiaEventListTypes.HOSTS]: '#f43f5e',
	[LumiaEventListTypes.HYPETRAIN]: '#fb7185',
	[LumiaEventListTypes.SPELLS]: '#7c3aed',
	[LumiaEventListTypes.RETWEETS]: '#0ea5e9',
	[LumiaEventListTypes.LIKES]: '#f472b6',
	[LumiaEventListTypes.SHARES]: '#14b8a6',
	[LumiaEventListTypes.PURCHASES]: '#eab308',
	[LumiaEventListTypes.SUPERSTICKERS]: '#fb923c',
	[LumiaEventListTypes.SUPERCHATS]: '#f59e0b',
	[LumiaEventListTypes.STARS]: '#fde047',
	[LumiaEventListTypes.FANS]: '#d946ef',
	[LumiaEventListTypes.RAFFLE]: '#34d399',
};

const DEFAULT_EVENTLIST_COLOR = '#9ca3af';

export const getEventListCategoryColor = (category: LumiaEventListTypes | undefined | null): string => {
	if (!category) return DEFAULT_EVENTLIST_COLOR;
	return LumiaEventListTypeColors[category] ?? DEFAULT_EVENTLIST_COLOR;
};
