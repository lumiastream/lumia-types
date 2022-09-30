import { LumiaAlertValues } from './activity.types';

export enum LumiaEventListTypes {
	FOLLOWER = 'follower',
	BITS = 'bits',
	DONATION = 'donation',
	SUBSCRIBERS = 'subscribers',
	GIFTS = 'gifts',
	HOSTS = 'hosts',
	RAIDS = 'raids',
	SPELLS = 'spells',
	RETWEETS = 'retweets',
	LIKES = 'likes',
	PURCHASES = 'purchases',
	SUPERSTICKERS = 'superstickers',
	SUPERCHATS = 'superchats',
	STARS = 'stars',
	FANS = 'fans',
	SHARES = 'shares',
	OTHERS = 'others',
}

export const LumiaMapAlertTypeToEventListType = {
	[LumiaAlertValues.TWITCH_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.GLIMESH_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TROVO_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TIKTOK_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITTER_FOLLOWER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: LumiaEventListTypes.FOLLOWER,
	[LumiaAlertValues.TWITCH_BITS]: LumiaEventListTypes.BITS,
	[LumiaAlertValues.TWITCH_HOST]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TWITCH_RAID]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TWITCH_REDEMPTION]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.TROVO_RAID]: LumiaEventListTypes.RAIDS,
	[LumiaAlertValues.STREAMLABS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.STREAMLABS_CHARITY]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.EXTRALIFE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.DONORDRIVE_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TILTIFY_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.KOFI_DONATION]: LumiaEventListTypes.DONATION,
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.GLIMESH_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TROVO_SUBSCRIBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.YOUTUBE_MEMBER]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.PATREON_PLEDGE]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.FACEBOOK_SUPPORT]: LumiaEventListTypes.SUBSCRIBERS,
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TROVO_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TIKTOK_GIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: LumiaEventListTypes.GIFTS,
	[LumiaAlertValues.TROVO_SPELL]: LumiaEventListTypes.SPELLS,
	[LumiaAlertValues.TWITTER_RETWEET]: LumiaEventListTypes.RETWEETS,
	[LumiaAlertValues.TIKTOK_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.TWITTER_LIKE]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.FACEBOOK_REACTION]: LumiaEventListTypes.LIKES,
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.KOFI_SHOPORDER]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.KOFI_COMMISSION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMLABS_MERCH]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMELEMENTS_MERCH]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.TREATSTREAM_TREAT]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: LumiaEventListTypes.PURCHASES,
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: LumiaEventListTypes.SUPERSTICKERS,
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: LumiaEventListTypes.SUPERCHATS,
	[LumiaAlertValues.FACEBOOK_STAR]: LumiaEventListTypes.STARS,
	[LumiaAlertValues.FACEBOOK_FAN]: LumiaEventListTypes.FANS,
	[LumiaAlertValues.FACEBOOK_SHARE]: LumiaEventListTypes.SHARES,
	[LumiaAlertValues.TIKTOK_SHARE]: LumiaEventListTypes.SHARES,
};
