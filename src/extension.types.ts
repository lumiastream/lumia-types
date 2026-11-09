export type ExtensionVisibilityKey = 'showCommands' | 'showHfx' | 'showTts';
export type HfxMode = 'safe' | 'all';
export type FlashSaleMode = 'off' | 'global' | 'subscriber' | 'random';
export type MarketplaceSort = 'popular' | 'newest' | 'alphabetical';
export type MarketplaceKind = 'hfx' | 'tts';
export type MarketplaceCategory = 'tts' | 'video' | 'audio';
export type EntranceDuration = 'week' | 'month' | 'unlimited';
export type EntranceApprovalMode = 'manual' | 'automatic';
export type EntranceAccessAction = 'new' | 'add' | 'upgrade';
export type EntranceStatus = 'pending' | 'created' | 'denied';
export type EntranceAccessOptions = Record<EntranceDuration, { enabled: boolean; bits: number }>;

export type ExtensionSettings = Record<ExtensionVisibilityKey, boolean> & {
	hfxMode: HfxMode;
	marketplaceDefaultPrice: number;
	entranceAccessOptions: EntranceAccessOptions;
	hfxSort: MarketplaceSort;
	ttsSort: MarketplaceSort;
	flashSaleMode: FlashSaleMode;
	flashSalePercent: number;
	flashSaleTier1Percent: number;
	flashSaleTier2Percent: number;
	flashSaleTier3Percent: number;
	flashSaleMinimumBits: number;
	randomSaleItemId: string;
	entranceApproval: EntranceApprovalMode;
	marketplaceDefaultVolume: number;
	hfxMarketplaceVolumeOverrides: Record<string, number>;
	ttsMarketplaceVolumeOverrides: Record<string, number>;
	hfxMarketplacePriceOverrides: Record<string, number>;
	ttsMarketplacePriceOverrides: Record<string, number>;
	hfxVisibilityOverrides: Record<string, boolean>;
	ttsVisibilityOverrides: Record<string, boolean>;
};

export type FlashSaleSettings = Pick<
	ExtensionSettings,
	'flashSaleMode' | 'flashSalePercent' | 'flashSaleTier1Percent' | 'flashSaleTier2Percent' | 'flashSaleTier3Percent' | 'flashSaleMinimumBits' | 'randomSaleItemId'
>;

export type PricedMarketplaceItem = { id?: string; bits: number; marketplace?: { category: string; nsfw?: boolean } };

export type HfxMediaSource = { hfx?: string; hfxPreview?: string; hfxOrigin?: string };

export interface ExtensionEntranceRequest {
	id: string;
	user_id: string;
	username: string;
	display_name?: string;
	avatar?: string;
	command_id?: string;
	source_type?: 'command' | 'marketplace';
	title: string;
	description?: string;
	message: string;
	status: EntranceStatus;
	denial_reason?: string;
	duration?: EntranceDuration;
	access_action?: EntranceAccessAction;
	approval_mode?: EntranceApprovalMode;
	activated_at?: string | null;
	expires_at?: string | null;
	created_at?: string;
	request_bits?: number;
	variation_id?: string;
	variation_initialized?: boolean;
	image?: string;
	tts_voice_id?: string;
	ttsPreview?: string;
	hfx?: string;
	hfxOrigin?: 'hudfx' | 'lumiastream';
	hfxMediaUrl?: string;
}

export type EntrancePurchase = { duration: EntranceDuration; bits: number; kind: EntranceAccessAction };
export type EntranceAccess = { duration: EntranceDuration; expiresAt: string | null };
