import { LumiaAlertValues } from './activity.types';

export type AlertPlatform = 'twitch' | 'kick' | 'youtube' | 'facebook' | 'tiktok' | 'lumiastream' | string;

export interface IAlertEvent<TDynamic = Record<string, unknown>, TExtraSettings = { platform?: AlertPlatform; [k: string]: unknown }> {
	alert: LumiaAlertValues | string;
	variation?: string;
	duration?: number;
	dynamic: TDynamic;
	extraSettings: TExtraSettings;
	fromLumia?: boolean;
	processed?: boolean;
	silent?: boolean;
	timestamp?: string;
	replay?: boolean;
}

// Shape every session-aggregate alert shares (TWITCH_SESSION_* + KICK_SESSION_*).
// Dynamic.value mirrors `total` so templates can read either name.
export interface SessionAggregateDynamic {
	value: number;
	total: number;
	previousTotal: number;
}
export interface SessionAggregateExtraSettings {
	total: number;
	previousTotal: number;
	platform?: AlertPlatform;
}

// ============================================================================
// TWITCH
// ============================================================================

export interface TwitchFollowerDynamic {
	value: string;
	username: string;
}
export interface TwitchFollowerExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	avatar?: string;
	profile_image_url?: string;
	platform: 'twitch';
}

export interface TwitchSubscriberDynamic {
	value: string;
	username: string;
	isResub: boolean;
	isAnon: boolean;
	isPrime: boolean;
	streakMonths: number;
	subMonths: number;
}
export interface TwitchSubscriberExtraSettings {
	userId: string | number;
	username: string;
	displayname: string;
	value: string;
	tier: string;
	subPlan: string;
	subPlanName: string;
	message: string;
	streakMonths: number;
	subMonths: number;
	avatar?: string;
	profile_image_url?: string;
	platform: 'twitch';
}

export interface TwitchGiftSubscriptionRecipient {
	username: string;
	userId: string | number;
	displayname: string;
	avatar?: string;
}
// LumiaStream emits gift subs in two modes: batch (single alert summarising N gifts)
// and individual (one alert per recipient). The dynamic field set differs slightly
// across the modes — modelled here as a discriminator-free superset; consumers
// inspect giftAmount === 1 to tell them apart.
export interface TwitchGiftSubscriptionDynamic {
	value: string;
	giftAmount: number;
	amount: number;
	totalGifts: number;
	isAnon: boolean;
	isPrime: boolean;
	subMonths: number;
	streakMonths?: number;
	username: string;
}
export interface TwitchGiftSubscriptionExtraSettings {
	userId: string | number;
	username: string;
	displayname: string;
	value: string;
	gifter: string;
	recipient?: string;
	recipients: string;
	recipientsRaw: TwitchGiftSubscriptionRecipient[];
	tier: string;
	subPlan: string;
	subPlanName: string;
	message: string;
	giftAmount: number;
	amount: number;
	totalGifts: number;
	subMonths: number;
	streakMonths?: number;
	avatar?: string;
	profile_image_url?: string;
	platform: 'twitch';
}

export interface TwitchBitsDynamic {
	value: number;
	username: string;
}
export interface TwitchBitsExtraSettings {
	username: string;
	displayname: string;
	avatar?: string;
	profile_image_url?: string;
	userId: string | number;
	amount: number;
	value: number;
	bits: number;
	bitsType: string;
	message: string;
	rawMessage: string;
	full_message?: string;
	platform: 'twitch';
}

// Bits-combo aggregator emits this after a 60s window: dynamic shape matches
// TwitchBitsDynamic but extraSettings reflects an accumulated payload (the
// individual bits messages have already fired separately if combo mode is off).
export interface TwitchBitsComboDynamic {
	value: number;
	username: string;
}
export interface TwitchBitsComboExtraSettings {
	amount: number;
	username: string;
	displayname: string;
	avatar?: string;
	userId: string | number;
	bitsType: string;
	message: string;
	rawMessage: string;
	full_message?: string;
	platform: 'twitch';
}

export interface TwitchRaidDynamic {
	value: number;
	amount: number;
	username: string;
}
export interface TwitchRaidExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	value: number;
	viewers: number;
	amount: number;
	avatar?: string;
	profile_image_url?: string;
	platform: 'twitch';
}

// Outgoing raid (streamer raids someone else). LumiaStream hardcodes userId to 0
// and displayname to username.
export type TwitchRaidOutDynamic = TwitchRaidDynamic;
export type TwitchRaidOutExtraSettings = TwitchRaidExtraSettings;

export interface TwitchChannelJoinDynamic {
	value: string;
	username?: string;
}
export interface TwitchChannelJoinExtraSettings {
	username: string;
	platform: 'twitch';
}
export type TwitchChannelLeaveDynamic = TwitchChannelJoinDynamic;
export type TwitchChannelLeaveExtraSettings = TwitchChannelJoinExtraSettings;

// NO EMITTER in LumiaStream; computed in FallbackBridge (task #32). Shape mirrors
// follower so the alert module's lookup-by-username keys still work.
export interface TwitchFirstChatterDynamic {
	value: string;
	username: string;
}
export interface TwitchFirstChatterExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	avatar?: string;
	platform: 'twitch';
}
export type TwitchEntranceDynamic = TwitchFirstChatterDynamic;
export type TwitchEntranceExtraSettings = TwitchFirstChatterExtraSettings;

export interface TwitchTimeoutDynamic {
	value: string;
}
export interface TwitchTimeoutExtraSettings {
	username: string;
	userId: string | number;
	avatar?: string;
	reason?: string;
	timeout_duration: number;
	expiration_ms: number;
	platform: 'twitch';
}
export type TwitchTimeoutOverDynamic = TwitchTimeoutDynamic;
export type TwitchTimeoutOverExtraSettings = TwitchTimeoutExtraSettings;

export interface TwitchBannedDynamic {
	value: string;
}
export interface TwitchBannedExtraSettings {
	username: string;
	userId: string | number;
	avatar?: string;
	reason?: string;
	platform: 'twitch';
}

export interface TwitchClipExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	clip_url: string;
	clip_id: string;
	clip_title: string;
	clip_duration: number;
	clip_thumbnail: string;
	clip_shoutout_url?: string;
	clip_user_is_mod?: boolean;
	clip_user_is_vip?: boolean;
	clip_user_is_sub?: boolean;
	clip_user_is_broadcaster?: boolean;
	clip_created_at: string;
	platform: 'twitch';
}
// LumiaStream emits TWITCH_CLIP without a dynamic block.
export type TwitchClipDynamic = Record<string, never>;

export interface TwitchCategoryDynamic {
	value: string;
}
export interface TwitchCategoryExtraSettings {
	title: string;
	category_id: string;
	category_name: string;
	description?: string;
	view_count?: number;
	profile_image_url?: string;
	offline_image_url?: string;
	platform: 'twitch';
}

// Hype Train ---------------------------------------------------------------
export interface TwitchHypeTrainInfo {
	level: number;
	progress: number;
	goal: number;
	total: number;
	top_contributions?: Array<{ user_name?: string; user_id?: string | number; type?: string; total?: number }>;
}
export interface TwitchHypeTrainDynamic {
	value: number;
	amount: number;
}
export interface TwitchHypeTrainExtraSettings extends TwitchHypeTrainInfo {
	value?: number;
	amount: number;
	platform: 'twitch';
}
export type TwitchHypeTrainStartedDynamic = TwitchHypeTrainDynamic;
export type TwitchHypeTrainStartedExtraSettings = TwitchHypeTrainExtraSettings;
export type TwitchHypeTrainProgressedDynamic = TwitchHypeTrainDynamic;
export type TwitchHypeTrainProgressedExtraSettings = TwitchHypeTrainExtraSettings;
export type TwitchHypeTrainLevelProgressedDynamic = TwitchHypeTrainDynamic;
export type TwitchHypeTrainLevelProgressedExtraSettings = TwitchHypeTrainExtraSettings;
export type TwitchHypeTrainEndedDynamic = TwitchHypeTrainDynamic;
export type TwitchHypeTrainEndedExtraSettings = TwitchHypeTrainExtraSettings;

// Poll ---------------------------------------------------------------------
export interface TwitchPollChoice {
	id?: string;
	title: string;
	votes?: number;
	channel_points_votes?: number;
	bits_votes?: number;
}
export interface TwitchPollInfo {
	poll_id: string;
	poll_title: string;
	poll_winning_title?: string;
	poll_duration?: number;
	poll_choices: TwitchPollChoice[];
}
export interface TwitchPollDynamic {
	value: string;
}
export type TwitchPollExtraSettings = TwitchPollInfo & { platform: 'twitch' };
export type TwitchPollStartedDynamic = TwitchPollDynamic;
export type TwitchPollStartedExtraSettings = TwitchPollExtraSettings;
export type TwitchPollProgressedDynamic = TwitchPollDynamic;
export type TwitchPollProgressedExtraSettings = TwitchPollExtraSettings;
export type TwitchPollEndedDynamic = TwitchPollDynamic;
export type TwitchPollEndedExtraSettings = TwitchPollExtraSettings;

// Prediction ---------------------------------------------------------------
export interface TwitchPredictionOutcome {
	id?: string;
	title: string;
	color?: string;
	users?: number;
	channel_points?: number;
	top_predictors?: Array<{ user_name?: string; user_id?: string | number; channel_points_used?: number; channel_points_won?: number }>;
}
export interface TwitchPredictionInfo {
	prediction_id: string;
	prediction_title: string;
	prediction_winning_outcome_title?: string;
	outcomes: TwitchPredictionOutcome[];
	creation_time?: string;
}
export interface TwitchPredictionDynamic {
	value: string;
}
export type TwitchPredictionExtraSettings = TwitchPredictionInfo & { platform: 'twitch' };
export type TwitchPredictionStartedDynamic = TwitchPredictionDynamic;
export type TwitchPredictionStartedExtraSettings = TwitchPredictionExtraSettings;
export type TwitchPredictionProgressedDynamic = TwitchPredictionDynamic;
export type TwitchPredictionProgressedExtraSettings = TwitchPredictionExtraSettings;
export type TwitchPredictionLockedDynamic = TwitchPredictionDynamic;
export type TwitchPredictionLockedExtraSettings = TwitchPredictionExtraSettings;
export type TwitchPredictionEndedDynamic = TwitchPredictionDynamic;
export type TwitchPredictionEndedExtraSettings = TwitchPredictionExtraSettings;

// Goal ---------------------------------------------------------------------
export interface TwitchGoalInfo {
	type: string;
	description?: string;
	target_amount: number;
	current_amount: number;
}
export interface TwitchGoalDynamic {
	value: string | number;
}
export type TwitchGoalExtraSettings = TwitchGoalInfo & { platform: 'twitch' };
export type TwitchGoalStartedDynamic = TwitchGoalDynamic;
export type TwitchGoalStartedExtraSettings = TwitchGoalExtraSettings;
export type TwitchGoalProgressedDynamic = TwitchGoalDynamic;
export type TwitchGoalProgressedExtraSettings = TwitchGoalExtraSettings;
export type TwitchGoalEndedDynamic = TwitchGoalDynamic;
export type TwitchGoalEndedExtraSettings = TwitchGoalExtraSettings;

// Charity ------------------------------------------------------------------
export interface TwitchCharityDonationDynamic {
	value: string;
}
export interface TwitchCharityDonationExtraSettings {
	userId: string | number;
	username: string;
	displayname?: string;
	amount: number;
	currency: string;
	currencySymbol: string;
	charity_name: string;
	avatar?: string;
	platform: 'twitch';
}
export interface TwitchCharityCampaignDynamic {
	value: string;
}
export interface TwitchCharityCampaignExtraSettings {
	charity_name: string;
	current_amount?: number;
	target_amount?: number;
	currency: string;
	currencySymbol: string;
	charity_logo?: string;
	platform: 'twitch';
}
export type TwitchCharityCampaignStartedDynamic = TwitchCharityCampaignDynamic;
export type TwitchCharityCampaignStartedExtraSettings = TwitchCharityCampaignExtraSettings;
export type TwitchCharityCampaignProgressedDynamic = TwitchCharityCampaignDynamic;
export type TwitchCharityCampaignProgressedExtraSettings = TwitchCharityCampaignExtraSettings;
export type TwitchCharityCampaignStoppedDynamic = TwitchCharityCampaignDynamic;
export type TwitchCharityCampaignStoppedExtraSettings = TwitchCharityCampaignExtraSettings;

// Shoutout -----------------------------------------------------------------
export interface TwitchShoutoutReceiveDynamic {
	value: string;
	username: string;
}
export interface TwitchShoutoutReceiveExtraSettings {
	userId: string | number;
	username: string;
	displayname?: string;
	broadcaster_language?: string;
	avatar?: string;
	profile_image_url?: string;
	platform: 'twitch';
}

// Ads ----------------------------------------------------------------------
export interface TwitchAdDynamic {
	value: number;
	amount: number;
}
export interface TwitchAdStartedExtraSettings {
	length: number;
	amount: number;
	is_automatic?: boolean;
	platform: 'twitch';
}
export interface TwitchAdStoppedExtraSettings {
	length: number;
	amount: number;
	next_ad_starts?: number;
	next_ad_starts_date?: string;
	platform: 'twitch';
}

// Stream lifecycle ---------------------------------------------------------
export interface TwitchStreamLiveDynamic {
	value: string;
}
export interface TwitchStreamLiveExtraSettings {
	value: string;
	eventTime?: string;
	stream_id?: string;
	title?: string;
	category_id?: string;
	category_name?: string;
	platform: 'twitch';
}
// LumiaStream fires TWITCH_STREAM_OFFLINE with neither dynamic nor extraSettings;
// keep both as optional empty records so downstream consumers don't crash.
export type TwitchStreamOfflineDynamic = Record<string, never>;
export interface TwitchStreamOfflineExtraSettings {
	platform?: 'twitch';
}

// Watch streak -------------------------------------------------------------
export interface TwitchWatchStreakDynamic {
	value: number;
	username: string;
}
export interface TwitchWatchStreakExtraSettings {
	username: string;
	displayname: string;
	avatar?: string;
	userId: string | number;
	streak_count: number;
	channel_points_awarded: number;
	amount: number;
	message?: string;
	platform: 'twitch';
}

// Powerups -----------------------------------------------------------------
export interface TwitchPowerupsDynamic {
	value: number;
	username: string;
	name: string;
}
export interface TwitchPowerupsExtraSettings {
	username: string;
	displayname: string;
	avatar?: string;
	userId: string | number;
	amount: number;
	value: number;
	bits: number;
	type: string;
	platform: 'twitch';
}
export interface TwitchPowerupsPointsExtraSettings {
	username: string;
	displayname: string;
	avatar?: string;
	userId: string | number;
	amount: number;
	value: number;
	points: number;
	type: string;
	platform: 'twitch';
}

// Channel point reward (NO EMITTER in current LumiaStream source — placeholder for
// when EventSub channel.channel_points_custom_reward_redemption.add gets wired up).
export interface TwitchRedemptionDynamic {
	value: string;
	username: string;
}
export interface TwitchRedemptionExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	avatar?: string;
	reward_id: string;
	reward_title: string;
	reward_cost: number;
	reward_prompt?: string;
	user_input?: string;
	redeemed_at?: string;
	platform: 'twitch';
}

// Session aggregates: every TWITCH_SESSION_* / KICK_SESSION_* shares this shape.
export type TwitchSessionFollowersDynamic = SessionAggregateDynamic;
export type TwitchSessionFollowersExtraSettings = SessionAggregateExtraSettings;
export type TwitchSessionSubsDynamic = SessionAggregateDynamic;
export type TwitchSessionSubsExtraSettings = SessionAggregateExtraSettings;
export type TwitchSessionGiftSubscriptionsDynamic = SessionAggregateDynamic;
export type TwitchSessionGiftSubscriptionsExtraSettings = SessionAggregateExtraSettings;
export type TwitchSessionBitsDynamic = SessionAggregateDynamic;
export type TwitchSessionBitsExtraSettings = SessionAggregateExtraSettings;

// ============================================================================
// KICK
// ============================================================================

export interface KickFollowerDynamic {
	value: string;
	username: string;
}
export interface KickFollowerExtraSettings {
	username: string;
	avatar?: string;
	displayname: string;
	userId: string | number;
	platform: 'kick';
}

export interface KickSubscriberDynamic {
	value: number;
	subMonths: number;
	amount: number;
	username: string;
	isAnon: boolean;
}
export interface KickSubscriberExtraSettings {
	username: string;
	avatar?: string;
	displayname: string;
	months: number;
	subMonths: number;
	streakMonths: number;
	message: string;
	tier: string;
	subPlan: string;
	subPlanName: string;
	platform: 'kick';
}

export interface KickGiftSubscriptionRecipient {
	username: string;
	userId: string | number;
	displayname: string;
	avatar?: string;
}
export interface KickGiftSubscriptionDynamic {
	value: number;
	giftAmount: number;
	totalGifts: number;
	username: string;
}
export interface KickGiftSubscriptionExtraSettings {
	username: string;
	userId: string | number;
	avatar?: string;
	displayname: string;
	gifter: string;
	recipient: string;
	recipients: string;
	recipientsRaw?: KickGiftSubscriptionRecipient[];
	amount: number;
	giftAmount: number;
	totalGifts: number;
	tier: string;
	subMonths: number;
	streakMonths: number;
	message: string;
	subPlan: string;
	subPlanName: string;
	platform: 'kick';
}

export interface KickKicksDynamic {
	value: number;
	username: string;
	name: string;
}
export interface KickKicksExtraSettings {
	username: string;
	displayname: string;
	avatar?: string;
	userId: string | number;
	amount: number;
	value: number;
	kicks: number;
	name: string;
	tier: string;
	id: string;
	type: string;
	message: string;
	rawMessage: string;
	full_message: string;
	platform: 'kick';
}

export interface KickHostDynamic {
	value: string;
	amount: number;
}
export interface KickHostExtraSettings {
	username: string;
	viewers: number;
	message?: string;
	avatar?: string;
	platform: 'kick';
}

export interface KickBannedDynamic {
	value: string;
}
export interface KickBannedExtraSettings {
	username: string;
	userId: string | number;
	bannedByUsername: string;
	bannedByUserId: string | number;
	expires: string;
	avatar?: string;
	platform: 'kick';
}

export interface KickUnbannedDynamic {
	value: string;
}
export interface KickUnbannedExtraSettings {
	username: string;
	userId: string | number;
	unbannedByUsername: string;
	unbannedByUserId: string | number;
	avatar?: string;
	platform: 'kick';
}

// NO EMITTER in LumiaStream Kick source; computed in FallbackBridge (task #32).
export interface KickFirstChatterDynamic {
	value: string;
	username: string;
}
export interface KickFirstChatterExtraSettings {
	username: string;
	displayname: string;
	userId: string | number;
	avatar?: string;
	platform: 'kick';
}
export type KickEntranceDynamic = KickFirstChatterDynamic;
export type KickEntranceExtraSettings = KickFirstChatterExtraSettings;

export type KickSessionFollowersDynamic = SessionAggregateDynamic;
export type KickSessionFollowersExtraSettings = SessionAggregateExtraSettings;
export type KickSessionSubsDynamic = SessionAggregateDynamic;
export type KickSessionSubsExtraSettings = SessionAggregateExtraSettings;
export type KickSessionGiftSubscriptionsDynamic = SessionAggregateDynamic;
export type KickSessionGiftSubscriptionsExtraSettings = SessionAggregateExtraSettings;
export type KickSessionKicksDynamic = SessionAggregateDynamic;
export type KickSessionKicksExtraSettings = SessionAggregateExtraSettings;

// ============================================================================
// AlertEventInputMap — the canonical shape lookup keyed by alert string.
// Consumers can write a generic emit helper as:
//   function emitAlert<K extends keyof AlertEventInputMap>(alert: K, dynamic: AlertEventInputMap[K]['dynamic'], extraSettings: AlertEventInputMap[K]['extraSettings'])
// and TS will narrow dynamic + extraSettings against the literal alert kind.
// ============================================================================

export type AlertEventInputMap = {
	[LumiaAlertValues.TWITCH_FOLLOWER]: { dynamic: TwitchFollowerDynamic; extraSettings: TwitchFollowerExtraSettings };
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: { dynamic: TwitchSubscriberDynamic; extraSettings: TwitchSubscriberExtraSettings };
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: { dynamic: TwitchGiftSubscriptionDynamic; extraSettings: TwitchGiftSubscriptionExtraSettings };
	[LumiaAlertValues.TWITCH_BITS]: { dynamic: TwitchBitsDynamic; extraSettings: TwitchBitsExtraSettings };
	[LumiaAlertValues.TWITCH_BITS_COMBO]: { dynamic: TwitchBitsComboDynamic; extraSettings: TwitchBitsComboExtraSettings };
	[LumiaAlertValues.TWITCH_RAID]: { dynamic: TwitchRaidDynamic; extraSettings: TwitchRaidExtraSettings };
	[LumiaAlertValues.TWITCH_RAID_OUT]: { dynamic: TwitchRaidOutDynamic; extraSettings: TwitchRaidOutExtraSettings };
	[LumiaAlertValues.TWITCH_CHANNEL_JOIN]: { dynamic: TwitchChannelJoinDynamic; extraSettings: TwitchChannelJoinExtraSettings };
	[LumiaAlertValues.TWITCH_CHANNEL_LEAVE]: { dynamic: TwitchChannelLeaveDynamic; extraSettings: TwitchChannelLeaveExtraSettings };
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: { dynamic: TwitchFirstChatterDynamic; extraSettings: TwitchFirstChatterExtraSettings };
	[LumiaAlertValues.TWITCH_ENTRANCE]: { dynamic: TwitchEntranceDynamic; extraSettings: TwitchEntranceExtraSettings };
	[LumiaAlertValues.TWITCH_TIMEOUT]: { dynamic: TwitchTimeoutDynamic; extraSettings: TwitchTimeoutExtraSettings };
	[LumiaAlertValues.TWITCH_TIMEOUT_OVER]: { dynamic: TwitchTimeoutOverDynamic; extraSettings: TwitchTimeoutOverExtraSettings };
	[LumiaAlertValues.TWITCH_BANNED]: { dynamic: TwitchBannedDynamic; extraSettings: TwitchBannedExtraSettings };
	[LumiaAlertValues.TWITCH_CLIP]: { dynamic: TwitchClipDynamic; extraSettings: TwitchClipExtraSettings };
	[LumiaAlertValues.TWITCH_CATEGORY]: { dynamic: TwitchCategoryDynamic; extraSettings: TwitchCategoryExtraSettings };
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: { dynamic: TwitchHypeTrainStartedDynamic; extraSettings: TwitchHypeTrainStartedExtraSettings };
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: { dynamic: TwitchHypeTrainProgressedDynamic; extraSettings: TwitchHypeTrainProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: { dynamic: TwitchHypeTrainLevelProgressedDynamic; extraSettings: TwitchHypeTrainLevelProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: { dynamic: TwitchHypeTrainEndedDynamic; extraSettings: TwitchHypeTrainEndedExtraSettings };
	[LumiaAlertValues.TWITCH_POLL_STARTED]: { dynamic: TwitchPollStartedDynamic; extraSettings: TwitchPollStartedExtraSettings };
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: { dynamic: TwitchPollProgressedDynamic; extraSettings: TwitchPollProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_POLL_ENDED]: { dynamic: TwitchPollEndedDynamic; extraSettings: TwitchPollEndedExtraSettings };
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: { dynamic: TwitchPredictionStartedDynamic; extraSettings: TwitchPredictionStartedExtraSettings };
	[LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED]: { dynamic: TwitchPredictionProgressedDynamic; extraSettings: TwitchPredictionProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: { dynamic: TwitchPredictionLockedDynamic; extraSettings: TwitchPredictionLockedExtraSettings };
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: { dynamic: TwitchPredictionEndedDynamic; extraSettings: TwitchPredictionEndedExtraSettings };
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: { dynamic: TwitchGoalStartedDynamic; extraSettings: TwitchGoalStartedExtraSettings };
	[LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: { dynamic: TwitchGoalProgressedDynamic; extraSettings: TwitchGoalProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_GOAL_ENDED]: { dynamic: TwitchGoalEndedDynamic; extraSettings: TwitchGoalEndedExtraSettings };
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: { dynamic: TwitchCharityDonationDynamic; extraSettings: TwitchCharityDonationExtraSettings };
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED]: { dynamic: TwitchCharityCampaignStartedDynamic; extraSettings: TwitchCharityCampaignStartedExtraSettings };
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_PROGRESSED]: { dynamic: TwitchCharityCampaignProgressedDynamic; extraSettings: TwitchCharityCampaignProgressedExtraSettings };
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STOPPED]: { dynamic: TwitchCharityCampaignStoppedDynamic; extraSettings: TwitchCharityCampaignStoppedExtraSettings };
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: { dynamic: TwitchShoutoutReceiveDynamic; extraSettings: TwitchShoutoutReceiveExtraSettings };
	[LumiaAlertValues.TWITCH_AD_STARTED]: { dynamic: TwitchAdDynamic; extraSettings: TwitchAdStartedExtraSettings };
	[LumiaAlertValues.TWITCH_AD_STOPPED]: { dynamic: TwitchAdDynamic; extraSettings: TwitchAdStoppedExtraSettings };
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: { dynamic: TwitchStreamLiveDynamic; extraSettings: TwitchStreamLiveExtraSettings };
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: { dynamic: TwitchStreamOfflineDynamic; extraSettings: TwitchStreamOfflineExtraSettings };
	[LumiaAlertValues.TWITCH_WATCH_STREAK]: { dynamic: TwitchWatchStreakDynamic; extraSettings: TwitchWatchStreakExtraSettings };
	[LumiaAlertValues.TWITCH_POWERUPS]: { dynamic: TwitchPowerupsDynamic; extraSettings: TwitchPowerupsExtraSettings };
	[LumiaAlertValues.TWITCH_POWERUPS_POINTS]: { dynamic: TwitchPowerupsDynamic; extraSettings: TwitchPowerupsPointsExtraSettings };
	[LumiaAlertValues.TWITCH_REDEMPTION]: { dynamic: TwitchRedemptionDynamic; extraSettings: TwitchRedemptionExtraSettings };
	[LumiaAlertValues.TWITCH_SESSION_FOLLOWERS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.TWITCH_SESSION_SUBS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.TWITCH_SESSION_GIFT_SUBSCRIPTIONS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.TWITCH_SESSION_BITS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.KICK_FOLLOWER]: { dynamic: KickFollowerDynamic; extraSettings: KickFollowerExtraSettings };
	[LumiaAlertValues.KICK_SUBSCRIBER]: { dynamic: KickSubscriberDynamic; extraSettings: KickSubscriberExtraSettings };
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: { dynamic: KickGiftSubscriptionDynamic; extraSettings: KickGiftSubscriptionExtraSettings };
	[LumiaAlertValues.KICK_KICKS]: { dynamic: KickKicksDynamic; extraSettings: KickKicksExtraSettings };
	[LumiaAlertValues.KICK_HOST]: { dynamic: KickHostDynamic; extraSettings: KickHostExtraSettings };
	[LumiaAlertValues.KICK_BANNED]: { dynamic: KickBannedDynamic; extraSettings: KickBannedExtraSettings };
	[LumiaAlertValues.KICK_UNBANNED]: { dynamic: KickUnbannedDynamic; extraSettings: KickUnbannedExtraSettings };
	[LumiaAlertValues.KICK_FIRST_CHATTER]: { dynamic: KickFirstChatterDynamic; extraSettings: KickFirstChatterExtraSettings };
	[LumiaAlertValues.KICK_ENTRANCE]: { dynamic: KickEntranceDynamic; extraSettings: KickEntranceExtraSettings };
	[LumiaAlertValues.KICK_SESSION_FOLLOWERS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.KICK_SESSION_SUBS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.KICK_SESSION_GIFT_SUBSCRIPTIONS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
	[LumiaAlertValues.KICK_SESSION_KICKS]: { dynamic: SessionAggregateDynamic; extraSettings: SessionAggregateExtraSettings };
};

// ============================================================================
// Discriminated union of every concrete IAlertEvent shape
// ============================================================================
export type AlertEventUnion =
	| IAlertEvent<TwitchFollowerDynamic, TwitchFollowerExtraSettings>
	| IAlertEvent<TwitchSubscriberDynamic, TwitchSubscriberExtraSettings>
	| IAlertEvent<TwitchGiftSubscriptionDynamic, TwitchGiftSubscriptionExtraSettings>
	| IAlertEvent<TwitchBitsDynamic, TwitchBitsExtraSettings>
	| IAlertEvent<TwitchBitsComboDynamic, TwitchBitsComboExtraSettings>
	| IAlertEvent<TwitchRaidDynamic, TwitchRaidExtraSettings>
	| IAlertEvent<TwitchRaidOutDynamic, TwitchRaidOutExtraSettings>
	| IAlertEvent<TwitchChannelJoinDynamic, TwitchChannelJoinExtraSettings>
	| IAlertEvent<TwitchChannelLeaveDynamic, TwitchChannelLeaveExtraSettings>
	| IAlertEvent<TwitchFirstChatterDynamic, TwitchFirstChatterExtraSettings>
	| IAlertEvent<TwitchEntranceDynamic, TwitchEntranceExtraSettings>
	| IAlertEvent<TwitchTimeoutDynamic, TwitchTimeoutExtraSettings>
	| IAlertEvent<TwitchTimeoutOverDynamic, TwitchTimeoutOverExtraSettings>
	| IAlertEvent<TwitchBannedDynamic, TwitchBannedExtraSettings>
	| IAlertEvent<TwitchClipDynamic, TwitchClipExtraSettings>
	| IAlertEvent<TwitchCategoryDynamic, TwitchCategoryExtraSettings>
	| IAlertEvent<TwitchHypeTrainDynamic, TwitchHypeTrainExtraSettings>
	| IAlertEvent<TwitchPollDynamic, TwitchPollExtraSettings>
	| IAlertEvent<TwitchPredictionDynamic, TwitchPredictionExtraSettings>
	| IAlertEvent<TwitchGoalDynamic, TwitchGoalExtraSettings>
	| IAlertEvent<TwitchCharityDonationDynamic, TwitchCharityDonationExtraSettings>
	| IAlertEvent<TwitchCharityCampaignDynamic, TwitchCharityCampaignExtraSettings>
	| IAlertEvent<TwitchShoutoutReceiveDynamic, TwitchShoutoutReceiveExtraSettings>
	| IAlertEvent<TwitchAdDynamic, TwitchAdStartedExtraSettings>
	| IAlertEvent<TwitchAdDynamic, TwitchAdStoppedExtraSettings>
	| IAlertEvent<TwitchStreamLiveDynamic, TwitchStreamLiveExtraSettings>
	| IAlertEvent<TwitchStreamOfflineDynamic, TwitchStreamOfflineExtraSettings>
	| IAlertEvent<TwitchWatchStreakDynamic, TwitchWatchStreakExtraSettings>
	| IAlertEvent<TwitchPowerupsDynamic, TwitchPowerupsExtraSettings>
	| IAlertEvent<TwitchPowerupsDynamic, TwitchPowerupsPointsExtraSettings>
	| IAlertEvent<TwitchRedemptionDynamic, TwitchRedemptionExtraSettings>
	| IAlertEvent<SessionAggregateDynamic, SessionAggregateExtraSettings>
	| IAlertEvent<KickFollowerDynamic, KickFollowerExtraSettings>
	| IAlertEvent<KickSubscriberDynamic, KickSubscriberExtraSettings>
	| IAlertEvent<KickGiftSubscriptionDynamic, KickGiftSubscriptionExtraSettings>
	| IAlertEvent<KickKicksDynamic, KickKicksExtraSettings>
	| IAlertEvent<KickHostDynamic, KickHostExtraSettings>
	| IAlertEvent<KickBannedDynamic, KickBannedExtraSettings>
	| IAlertEvent<KickUnbannedDynamic, KickUnbannedExtraSettings>
	| IAlertEvent<KickFirstChatterDynamic, KickFirstChatterExtraSettings>
	| IAlertEvent<KickEntranceDynamic, KickEntranceExtraSettings>;
