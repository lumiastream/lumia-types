import type { EntranceAccessOptions, EntranceDuration, ExtensionSettings } from './extension.types';

// Twitch only sells Bits through products registered for the extension, so every price must be one of these amounts.
// prettier-ignore
export const TWITCH_EXTENSION_BIT_VALUES: readonly number[] = [
	0, 1, 2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 35, 36, 40, 41, 42, 43, 44, 45,
	46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 61, 62, 64, 65, 66, 68, 69, 70, 73, 75, 80, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103,
	104, 105, 110, 111, 112, 115, 120, 122, 123, 124, 125, 129, 130, 135, 147, 149, 150, 151, 155, 158, 160, 169, 175, 180, 182, 195, 199, 200,
	201, 218, 222, 224, 225, 234, 249, 250, 269, 270, 275, 299, 300, 301, 314, 316, 318, 320, 333, 337, 345, 350, 354, 369, 375, 378, 392, 399,
	400, 404, 419, 420, 425, 433, 444, 450, 456, 469, 500, 501, 506, 520, 525, 550, 555, 569, 600, 601, 620, 650, 666, 690, 699, 700, 722, 750,
	769, 777, 800, 808, 850, 888, 900, 901, 911, 912, 969, 974, 999, 1000, 1001, 1050, 1069, 1100, 1111, 1150, 1200, 1250, 1269, 1300, 1310,
	1312, 1337, 1500, 1750, 1800, 2000, 2250, 2271, 2272, 2273, 2274, 2275, 2500, 2750, 2800, 3000, 3069, 3333, 3500, 4000, 4200, 4500, 4969,
	5000, 5069, 5420, 5555, 5912, 5913, 6000, 6666, 6969, 7500, 7850, 8000, 8008, 9000, 9001, 9999, 10000,
];

export const BITS_SKU_PREFIX = 'lumia-bits-';
export const bitsSku = (bits: number): string => `${BITS_SKU_PREFIX}${bits}`;

export const FLASH_SALE_PERCENT_OPTIONS: readonly number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
export const LOYALTY_POINTS_SALE_FLOOR = 20;

export const MARKETPLACE_SORTS = ['popular', 'newest', 'alphabetical'] as const;

// Ordered from shortest to longest access; the index doubles as the upgrade rank.
export const ENTRANCE_DURATIONS: readonly EntranceDuration[] = ['week', 'month', 'unlimited'];
export const ENTRANCE_DURATION_DAYS: Record<EntranceDuration, number | null> = { week: 7, month: 30, unlimited: null };

export const DEFAULT_ENTRANCE_ACCESS_OPTIONS: EntranceAccessOptions = {
	week: { enabled: true, bits: 100 },
	month: { enabled: true, bits: 500 },
	unlimited: { enabled: true, bits: 2000 },
};

export const DEFAULT_EXTENSION_SETTINGS: ExtensionSettings = {
	showCommands: true,
	// Marketplace selling is opt-in, so existing channels don't start selling HFX or AI TTS after an update.
	showHfx: false,
	showTts: false,
	hfxMode: 'safe',
	marketplaceDefaultPrice: 100,
	entranceAccessOptions: DEFAULT_ENTRANCE_ACCESS_OPTIONS,
	hfxSort: 'popular',
	ttsSort: 'popular',
	flashSaleMode: 'off',
	flashSalePercent: 20,
	flashSaleTier1Percent: 10,
	flashSaleTier2Percent: 20,
	flashSaleTier3Percent: 30,
	flashSaleMinimumBits: 20,
	randomSaleItemId: '',
	entranceApproval: 'manual',
	marketplaceDefaultVolume: 100,
	hfxMarketplaceVolumeOverrides: {},
	ttsMarketplaceVolumeOverrides: {},
	hfxMarketplacePriceOverrides: {},
	ttsMarketplacePriceOverrides: {},
	hfxVisibilityOverrides: {},
	ttsVisibilityOverrides: {},
};

export enum ExtensionUserLevel {
	STREAMER = 1,
	MOD = 2,
	VIP = 3,
	TIER3_SUB = 4,
	TIER2_SUB = 5,
	SUBSCRIBER = 6,
	REGULAR = 7,
	FOLLOWER = 8,
	EVERYONE = 9,
}

export const EXTENSION_USER_LEVEL_NAMES: Record<ExtensionUserLevel, string> = {
	[ExtensionUserLevel.STREAMER]: 'Streamer',
	[ExtensionUserLevel.MOD]: 'Mod',
	[ExtensionUserLevel.VIP]: 'VIP',
	[ExtensionUserLevel.TIER3_SUB]: 'Tier 3 Sub',
	[ExtensionUserLevel.TIER2_SUB]: 'Tier 2 Sub',
	[ExtensionUserLevel.SUBSCRIBER]: 'Subscriber',
	[ExtensionUserLevel.REGULAR]: 'Regular',
	[ExtensionUserLevel.FOLLOWER]: 'Follower',
	[ExtensionUserLevel.EVERYONE]: 'Everyone',
};

// Levels above this value are streamer-defined custom levels.
export const EXTENSION_BUILT_IN_USER_LEVEL_MAX = 10;

export const TWITCH_SUBSCRIPTION_TIERS = ['1000', '2000', '3000'] as const;
