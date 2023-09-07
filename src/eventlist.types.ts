import { LumiaAlertValues } from './activity.types';

export enum LumiaEventListTypes {
	REDEMPTION = 'redemption',
	FOLLOWER = 'follower',
	BITS = 'bits',
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

export const LumiaMapAlertTypeToEventListType = {
	[LumiaAlertValues.LUMIASTREAM_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.DONORDRIVE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.EXTRALIFE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.RAFFLE_START]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.RAFFLE_STOP]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.RAFFLE_WINNER]: LumiaEventListTypes.RAFFLE,
	[LumiaAlertValues.FACEBOOK_FAN]: LumiaEventListTypes.FANS,
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.FACEBOOK_REACTION]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.FACEBOOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.FACEBOOK_STAR]: LumiaEventListTypes.STARS,
	[LumiaAlertValues.FACEBOOK_SUPPORT]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KOFI_COMMISSION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.KOFI_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.KOFI_SHOPORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.PATREON_PLEDGE]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMELEMENTS_MERCH]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMLABS_CHARITY]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_MERCH]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TIKTOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TIKTOK_GIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TIKTOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.TIKTOK_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KICK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.KICK_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TILTIFY_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TREATSTREAM_TREAT]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TROVO_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TROVO_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TROVO_RAID]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TROVO_SPELL]: LumiaEventListTypes.SPELLS,
	[LumiaAlertValues.TROVO_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TWITCH_BITS]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_CLIP]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_EXTENSION]: LumiaEventListTypes.EXTENSION,
	[LumiaAlertValues.TWITCH_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: LumiaEventListTypes.HYPETRAIN,
	[LumiaAlertValues.TWITCH_POINTS]: LumiaEventListTypes.POINTS,
	[LumiaAlertValues.TWITCH_RAID]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: LumiaEventListTypes.OTHERS,
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TWITTER_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITTER_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TWITTER_RETWEET]: LumiaEventListTypes.RETWEETS,
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.YOUTUBE_MEMBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: LumiaEventListTypes.SUPERCHATS,
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: LumiaEventListTypes.SUPERSTICKERS,
	[LumiaAlertValues.KICK_HOST]: LumiaEventListTypes.HOSTS,
};
