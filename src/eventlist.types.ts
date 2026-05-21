import { LumiaAlertValues } from './activity.types';

/**
 * Eventlist categories. The eventlist module uses these as a *blacklist* via
 * `content.filters` — any category listed there is hidden from the rendered
 * feed (and so anything NOT listed is shown). `OTHERS` is the catch-all for
 * stream-management / administrative events that aren't tied to a viewer
 * action (poll progress, stream live/offline, OBS scene switches, etc.).
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
	OTHERS = 'others',
}

/**
 * Categorization map from `LumiaAlertValues` → `LumiaEventListTypes`. Drives
 * eventlist filtering: an alert that's missing from this map is treated as
 * "unmapped" and will not be hidden by any category-based filter (it falls
 * through to OTHERS only if OTHERS is allowed). Historically this caused
 * unrelated alerts (e.g. Throne purchases) to leak into category-scoped
 * marquees like "Recent Subscribers", because the missing mapping made the
 * filtering logic's blacklist check pass.
 *
 * Policy:
 *   - Every alert in `LumiaAlertValues` should appear here. If an alert isn't
 *     viewer-facing (stream lifecycle, OBS/SLOBS/Meld events, music players,
 *     VTube Studio, Pulse health, polls/predictions/goals progress) it maps
 *     to OTHERS, never silently to a "real" category.
 *   - Categorize by the *viewer's* intent, not the underlying payload shape.
 *     A "subscription expired" event is administrative, not a new sub →
 *     OTHERS, not SUBSCRIBERS. A giveaway-started notice is admin → OTHERS.
 *     A Throne / Fourthwall shop gift purchase is a viewer buying something
 *     for the streamer → PURCHASES.
 *   - Session-counter alerts (e.g. TWITCH_SESSION_FOLLOWERS) mirror the
 *     category of their per-event cousin (FOLLOWER) so a counter widget can
 *     reuse the same category filter.
 *
 * Grouped by platform / source for review; ordering within groups follows
 * the enum declaration in `activity.types.ts`.
 */
export const LumiaMapAlertTypeToEventListType: Partial<Record<LumiaAlertValues, LumiaEventListTypes>> = {
	// --- Lumia Stream native ---
	[LumiaAlertValues.LUMIASTREAM_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.LUMIASTREAM_LUMIA_OPENED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_LUMIA_CLOSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_ON]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_OFF]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_START]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_STOP]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_WINNER]: LumiaEventListTypes.RAFFLE,
	// Spinwheel / Roulette / Slots winners are giveaway-style outcomes —
	// align them with the RAFFLE category so a "Recent Giveaways" widget
	// can pick them up alongside actual raffles.
	[LumiaAlertValues.LUMIASTREAM_SPINWHEEL_WINNER]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.LUMIASTREAM_ROULETTE_WINNER]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.LUMIASTREAM_SLOTS_WINNER]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.LUMIASTREAM_TOURNAMENT_START]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_TOURNAMENT_END]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_TOURNAMENT_WINNER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_POLL_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_POLL_PROGRESSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_POLL_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_VIEWER_ACHIEVEMENT]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.LUMIASTREAM_VARIABLE_CHANGED]: LumiaEventListTypes.OTHERS,

	// --- Twitch ---
	[LumiaAlertValues.TWITCH_EXTENSION]: LumiaEventListTypes.EXTENSION,
	[LumiaAlertValues.TWITCH_POINTS]: LumiaEventListTypes.POINTS,
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_ENTRANCE]: LumiaEventListTypes.OTHERS,
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
	// Channel-point redemptions used to be miscategorized as PURCHASES on the
	// Streamlabs alert; REDEMPTION is the dedicated category for this event
	// shape and is what category-filtered widgets should target.
	[LumiaAlertValues.TWITCH_REDEMPTION]: LumiaEventListTypes.REDEMPTION,
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_POLL_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_POLL_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_GOAL_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_PROGRESSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STOPPED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CATEGORY]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CLIP]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CHANNEL_JOIN]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_CHANNEL_LEAVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_BANNED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_TIMEOUT]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_TIMEOUT_OVER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_AD_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_AD_STOPPED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_WATCH_STREAK]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_POWERUPS]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_POWERUPS_POINTS]: LumiaEventListTypes.POINTS,

	// --- YouTube ---
	[LumiaAlertValues.YOUTUBE_STREAM_LIVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBE_STREAM_OFFLINE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBE_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBE_ENTRANCE]: LumiaEventListTypes.OTHERS,
	// YouTube "subscribers" are free follows in YT-speak — categorize as
	// FOLLOWER so a "Recent Followers" widget unifies Twitch follows + YT
	// subs. Paid memberships are categorized as SUBSCRIBERS below.
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
	[LumiaAlertValues.YOUTUBE_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.YOUTUBE_VIEWERS]: LumiaEventListTypes.OTHERS,

	// --- Facebook ---
	[LumiaAlertValues.FACEBOOK_STREAM_LIVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FACEBOOK_STREAM_OFFLINE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FACEBOOK_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FACEBOOK_ENTRANCE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.FACEBOOK_REACTION]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.FACEBOOK_STAR]: LumiaEventListTypes.STARS,
	// FB Supporters are paid subscriptions, FB Fans are free fan-status, FB
	// Gift Subscriptions are gifted Supporters → keep all three in their
	// distinct categories.
	[LumiaAlertValues.FACEBOOK_SUPPORT]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.FACEBOOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.FACEBOOK_FAN]: LumiaEventListTypes.FANS,

	// --- TikTok ---
	[LumiaAlertValues.TIKTOK_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_ENTRANCE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TIKTOK_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TIKTOK_TOTAL_LIKES]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TIKTOK_GIFT]: LumiaEventListTypes.GIFTS,
	// TikTok Super Fan = paid membership (subscriber-equivalent). Super Fan
	// BOX is a separate gift-style event where a viewer receives a fan-only
	// drop — categorize as GIFTS to keep the SUBSCRIBERS feed sub-only.
	[LumiaAlertValues.TIKTOK_SUPER_FAN]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TIKTOK_SUPER_FAN_BOX]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_TREASURE_CHEST]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_QUESTION]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_POLL]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_SHOP_PURCHASE]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TIKTOK_PIN_MESSAGE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_BATTLE_START]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_BATTLE_PROGRESS]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_BATTLE_END]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.TIKTOK_STREAM_END]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TIKTOK_NEW_VIDEO]: LumiaEventListTypes.OTHERS,

	// --- Kick ---
	[LumiaAlertValues.KICK_POINTS]: LumiaEventListTypes.POINTS,
	[LumiaAlertValues.KICK_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.KICK_ENTRANCE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.KICK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.KICK_SESSION_FOLLOWERS]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.KICK_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KICK_SESSION_SUBS]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.KICK_SESSION_GIFT_SUBSCRIPTIONS]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.KICK_KICKS]: LumiaEventListTypes.KICKS,
	[LumiaAlertValues.KICK_SESSION_KICKS]: LumiaEventListTypes.KICKS,
	[LumiaAlertValues.KICK_HOST]: LumiaEventListTypes.HOSTS,
	[LumiaAlertValues.KICK_BANNED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.KICK_UNBANNED]: LumiaEventListTypes.OTHERS,

	// --- Discord ---
	[LumiaAlertValues.DISCORD_FIRST_CHATTER]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.DISCORD_ENTRANCE]: LumiaEventListTypes.OTHERS,

	// --- Third-party donation / commerce platforms ---
	[LumiaAlertValues.STREAMLABS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_CHARITY]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_MERCH]: LumiaEventListTypes.PURCHASES,
	// Streamlabs Redemption was previously miscategorized as PURCHASES. It's
	// a Streamlabs loyalty-points redemption — the dedicated REDEMPTION
	// category is the correct home, mirroring TWITCH_REDEMPTION.
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: LumiaEventListTypes.REDEMPTION,
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.EXTRALIFE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.DONORDRIVE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TILTIFY_DONATION]: LumiaEventListTypes.DONATION,
	// Throne is a viewer wishlist platform — a "gift purchase" is a viewer
	// buying an item off the streamer's wishlist. Treat all three Throne
	// events as PURCHASES so they don't leak into the SUBSCRIBERS feed (the
	// historical bug: Throne was unmapped, which made the eventlist filter's
	// blacklist check silently pass on category-scoped widgets).
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
	// `SUBSCRIPTION_EXPIRED` is an admin notice that a sub lapsed — NOT a new
	// subscriber. Moving to OTHERS prevents stale "Recent Subscribers"
	// entries from showing canceled subs.
	[LumiaAlertValues.FOURTHWALL_SUBSCRIPTION_EXPIRED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FOURTHWALL_GIFTPURCHASE]: LumiaEventListTypes.PURCHASES,
	// Giveaway lifecycle events are administrative (giveaway started/ended),
	// not actual gifts. Categorize as OTHERS; the Lumia raffle alerts have
	// the RAFFLE category for the winner side.
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FOURTHWALL_THANKYOU_SENT]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.FOURTHWALL_NEWSLETTER_SUBSCRIBED]: LumiaEventListTypes.OTHERS,

	// --- OBS Studio / Streamlabs OBS / Meld Studio ---
	// All broadcasting-app events are stream-management, never viewer-facing.
	[LumiaAlertValues.OBS_SWITCH_PROFILE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_SWITCH_SCENE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_SWITCH_TRANSITION]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_TRANSITION_BEGIN]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_TRANSITION_END]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_STREAM_STARTING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_STREAM_STOPPING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_RECORDING_STARTING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_RECORDING_STOPPING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_MEDIA_INPUT_PLAYBACK_STARTED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_MEDIA_INPUT_PLAYBACK_ENDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_VIRTUALCAM_STATE_CHANGED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_SCREENSHOT_SAVED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_REPLAY_BUFFER_SAVED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_VERTICAL_BACKTRACK_SAVED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.OBS_VENDOR_EVENT]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SLOBS_SWITCH_SCENE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_STREAM_STARTING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_STREAM_STOPPING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_RECORDING_STARTING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_RECORDING_STOPPING]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_SWITCH_SCENE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.MELD_SWITCH_VERTICAL_SCENE]: LumiaEventListTypes.OTHERS,

	// --- Music players (Spotify / YouTube Music / Now Playing / VLC) ---
	[LumiaAlertValues.SPOTIFY_SWITCH_SONG]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SPOTIFY_SONG_PLAYED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.SPOTIFY_SONG_PAUSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBEMUSIC_SWITCH_SONG]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PLAYED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PAUSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.NOWPLAYING_SWITCH_SONG]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.NOWPLAYING_SONG_PLAYED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.NOWPLAYING_SONG_PAUSED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VLC_SWITCH_SONG]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VLC_SONG_PLAYED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VLC_SONG_PAUSED]: LumiaEventListTypes.OTHERS,

	// --- Health / fitness ---
	[LumiaAlertValues.PULSE_HEARTRATE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.PULSE_CALORIES]: LumiaEventListTypes.OTHERS,

	// --- Social media (Twitter / X) ---
	[LumiaAlertValues.TWITTER_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITTER_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TWITTER_RETWEET]: LumiaEventListTypes.RETWEETS,

	// --- E-commerce ---
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: LumiaEventListTypes.PURCHASES,

	// --- Other integrations ---
	[LumiaAlertValues.STREAMERBOT_ACTION]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.CROWDCONTROL_EFFECT]: LumiaEventListTypes.OTHERS,

	// --- VTube Studio ---
	[LumiaAlertValues.VTUBESTUDIO_HOTKEY_TRIGGERED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_MODEL_LOADED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_START]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_END]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_ITEM_ADDED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_ITEM_REMOVED]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.VTUBESTUDIO_BACKGROUND_CHANGED]: LumiaEventListTypes.OTHERS,
};
