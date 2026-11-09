import {
	DEFAULT_ENTRANCE_ACCESS_OPTIONS,
	DEFAULT_EXTENSION_SETTINGS,
	ENTRANCE_DURATIONS,
	FLASH_SALE_PERCENT_OPTIONS,
	LOYALTY_POINTS_SALE_FLOOR,
	MARKETPLACE_SORTS,
	TWITCH_EXTENSION_BIT_VALUES,
	TWITCH_SUBSCRIPTION_TIERS,
} from './extension.constants';
import type {
	EntranceAccessOptions,
	ExtensionSettings,
	FlashSaleMode,
	FlashSaleSettings,
	HfxMediaSource,
	MarketplaceKind,
	MarketplaceSort,
	PricedMarketplaceItem,
} from './extension.types';

const fromEntries = <T>(entries: Array<[string, T]>): Record<string, T> =>
	entries.reduce<Record<string, T>>((result, [key, value]) => {
		result[key] = value;
		return result;
	}, {});

export const isJsonEqual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

// Published commands use their name as the identifier when no explicit id exists.
export const commandKey = (command: { id?: string; name: string }): string => command.id ?? command.name;

export const marketplaceKindOf = (category?: string): MarketplaceKind => (category === 'tts' ? 'tts' : 'hfx');

// Catalog ids look like `marketplace:<kind>:<origin>:<id>`; overrides are stored against the bare trailing id.
export const marketplaceItemId = (id: string): string => id.slice(id.lastIndexOf(':') + 1);

export const marketplacePriceOverrideKey = (kind: MarketplaceKind) => (kind === 'hfx' ? 'hfxMarketplacePriceOverrides' : 'ttsMarketplacePriceOverrides');
export const marketplaceVolumeOverrideKey = (kind: MarketplaceKind) => (kind === 'hfx' ? 'hfxMarketplaceVolumeOverrides' : 'ttsMarketplaceVolumeOverrides');
export const marketplaceVisibilityOverrideKey = (kind: MarketplaceKind) => (kind === 'hfx' ? 'hfxVisibilityOverrides' : 'ttsVisibilityOverrides');

export const marketplacePriceOverride = (settings: ExtensionSettings, kind: MarketplaceKind, id: string): number | undefined =>
	settings[marketplacePriceOverrideKey(kind)][marketplaceItemId(id)];
export const marketplaceVolumeOverride = (settings: ExtensionSettings, kind: MarketplaceKind, id: string): number | undefined =>
	settings[marketplaceVolumeOverrideKey(kind)][marketplaceItemId(id)];

// Snaps any amount to the closest purchasable Twitch product within [minimum, maximum]; ties favor the lower price.
export function nearestBits(amount: number, minimum = 0, maximum = Infinity): number {
	const target = Number.isFinite(amount) ? amount : 0;
	const eligible = TWITCH_EXTENSION_BIT_VALUES.filter((value) => value >= minimum && value <= maximum);
	return eligible.reduce((best, value) => (Math.abs(value - target) < Math.abs(best - target) ? value : best), eligible[0] ?? 0);
}

const clampVolume = (volume: unknown): number => Math.max(0, Math.min(100, Number(volume)));

const normalizeVolumeOverrides = (overrides?: Record<string, number>): Record<string, number> =>
	fromEntries(
		Object.entries(overrides ?? {})
			.filter(([, volume]) => Number.isFinite(volume))
			.map(([id, volume]): [string, number] => [id, clampVolume(volume)]),
	);

// Items are visible by default, so only explicit opt-outs are persisted.
const disabledVisibilityOverrides = (overrides?: Record<string, boolean>): Record<string, boolean> =>
	fromEntries(Object.entries(overrides ?? {}).filter(([, enabled]) => enabled === false));

const pickOption = <T>(value: T | undefined, options: readonly T[], fallback: T): T => (value !== undefined && options.includes(value) ? value : fallback);

const normalizeEntranceAccessOptions = (options?: Partial<EntranceAccessOptions>): EntranceAccessOptions =>
	fromEntries(
		ENTRANCE_DURATIONS.map((duration): [string, { enabled: boolean; bits: number }] => {
			const option = options?.[duration];
			const fallback = DEFAULT_ENTRANCE_ACCESS_OPTIONS[duration];
			return [duration, { enabled: option?.enabled ?? fallback.enabled, bits: nearestBits(option?.bits ?? fallback.bits) }];
		}),
	) as EntranceAccessOptions;

// Rebuilds a complete, valid settings object from whatever the saved JSON config contains; unknown keys are dropped.
export function normalizeExtensionSettings(settings: Partial<ExtensionSettings> = {}): ExtensionSettings {
	const defaults = DEFAULT_EXTENSION_SETTINGS;
	const minimumBits = Number.isFinite(settings.flashSaleMinimumBits) ? Math.max(0, Math.floor(settings.flashSaleMinimumBits as number)) : defaults.flashSaleMinimumBits;
	return {
		...defaults,
		showCommands: settings.showCommands ?? defaults.showCommands,
		showHfx: settings.showHfx ?? defaults.showHfx,
		showTts: settings.showTts ?? defaults.showTts,
		flashSaleMode: settings.flashSaleMode ?? defaults.flashSaleMode,
		hfxMode: settings.hfxMode === 'all' ? 'all' : 'safe',
		marketplaceDefaultPrice: nearestBits(settings.marketplaceDefaultPrice ?? defaults.marketplaceDefaultPrice),
		entranceAccessOptions: normalizeEntranceAccessOptions(settings.entranceAccessOptions),
		hfxSort: pickOption<MarketplaceSort>(settings.hfxSort, MARKETPLACE_SORTS, defaults.hfxSort),
		ttsSort: pickOption<MarketplaceSort>(settings.ttsSort, MARKETPLACE_SORTS, defaults.ttsSort),
		flashSalePercent: pickOption(settings.flashSalePercent, FLASH_SALE_PERCENT_OPTIONS, defaults.flashSalePercent),
		flashSaleMinimumBits: nearestBits(minimumBits),
		flashSaleTier1Percent: pickOption(settings.flashSaleTier1Percent, FLASH_SALE_PERCENT_OPTIONS, defaults.flashSaleTier1Percent),
		flashSaleTier2Percent: pickOption(settings.flashSaleTier2Percent, FLASH_SALE_PERCENT_OPTIONS, defaults.flashSaleTier2Percent),
		flashSaleTier3Percent: pickOption(settings.flashSaleTier3Percent, FLASH_SALE_PERCENT_OPTIONS, defaults.flashSaleTier3Percent),
		randomSaleItemId: settings.randomSaleItemId ?? '',
		entranceApproval: settings.entranceApproval === 'automatic' ? 'automatic' : 'manual',
		marketplaceDefaultVolume: clampVolume(settings.marketplaceDefaultVolume ?? defaults.marketplaceDefaultVolume),
		hfxMarketplaceVolumeOverrides: normalizeVolumeOverrides(settings.hfxMarketplaceVolumeOverrides),
		ttsMarketplaceVolumeOverrides: normalizeVolumeOverrides(settings.ttsMarketplaceVolumeOverrides),
		hfxMarketplacePriceOverrides: { ...settings.hfxMarketplacePriceOverrides },
		ttsMarketplacePriceOverrides: { ...settings.ttsMarketplacePriceOverrides },
		hfxVisibilityOverrides: disabledVisibilityOverrides(settings.hfxVisibilityOverrides),
		ttsVisibilityOverrides: disabledVisibilityOverrides(settings.ttsVisibilityOverrides),
	};
}

// Returns the discount percent that applies to this viewer and item, or null when no sale applies.
function flashSaleDiscount(settings: ExtensionSettings, tier?: string | null, itemId?: string): number | null {
	let percent: number;
	switch (settings.flashSaleMode) {
		case 'subscriber':
			if (tier === '1000') percent = settings.flashSaleTier1Percent;
			else if (tier === '2000') percent = settings.flashSaleTier2Percent;
			else if (tier === '3000') percent = settings.flashSaleTier3Percent;
			else return null;
			break;
		case 'random':
			if (!itemId || itemId !== settings.randomSaleItemId) return null;
			percent = settings.flashSalePercent;
			break;
		case 'global':
			percent = settings.flashSalePercent;
			break;
		default:
			return null;
	}
	return Math.min(100, Math.max(0, percent));
}

// Discounted Bits price snapped to a purchasable product that never exceeds the original or drops below the sale floor.
export function flashSalePrice(bits: number, settings: ExtensionSettings, tier?: string | null, itemId?: string): number {
	const percent = flashSaleDiscount(settings, tier, itemId);
	if (percent === null || bits <= 0 || bits <= settings.flashSaleMinimumBits) return bits;
	const target = (bits * (100 - percent)) / 100;
	return nearestBits(target, settings.flashSaleMinimumBits, bits);
}

// Loyalty points have no product list, so the discount is rounded and held at a fixed floor instead.
export function flashSalePointsPrice(points: number, settings: ExtensionSettings, tier?: string | null, itemId?: string): number {
	const percent = flashSaleDiscount(settings, tier, itemId);
	if (percent === null || points <= LOYALTY_POINTS_SALE_FLOOR) return points;
	return Math.max(LOYALTY_POINTS_SALE_FLOOR, Math.round((points * (100 - percent)) / 100));
}

// The lowest price any viewer could pay, used to warn when a sale would push an AI TTS item under the quota threshold.
export function ttsQuotaPrice(bits: number, settings: ExtensionSettings, itemId: string): number {
	return settings.flashSaleMode === 'subscriber'
		? Math.min(...TWITCH_SUBSCRIPTION_TIERS.map((tier) => flashSalePrice(bits, settings, tier, itemId)))
		: flashSalePrice(bits, settings, undefined, itemId);
}

export function marketplaceBasePrice(command: PricedMarketplaceItem, settings: ExtensionSettings): number {
	if (!command.marketplace) return command.bits;
	return marketplacePriceOverride(settings, marketplaceKindOf(command.marketplace.category), command.id ?? '') ?? settings.marketplaceDefaultPrice;
}

export function marketplacePrice(command: PricedMarketplaceItem, settings: ExtensionSettings, tier?: string | null): number {
	return flashSalePrice(marketplaceBasePrice(command, settings), settings, tier, command.id);
}

export function setFlashSaleMode(settings: ExtensionSettings, mode: FlashSaleMode): ExtensionSettings {
	return { ...settings, flashSaleMode: mode };
}

export function pickFlashSaleSettings(settings: ExtensionSettings): FlashSaleSettings {
	return {
		flashSaleMode: settings.flashSaleMode,
		flashSalePercent: settings.flashSalePercent,
		flashSaleTier1Percent: settings.flashSaleTier1Percent,
		flashSaleTier2Percent: settings.flashSaleTier2Percent,
		flashSaleTier3Percent: settings.flashSaleTier3Percent,
		flashSaleMinimumBits: settings.flashSaleMinimumBits,
		randomSaleItemId: settings.randomSaleItemId,
	};
}

export function isMarketplaceItemEnabled(settings: ExtensionSettings, kind: MarketplaceKind, id: string, nsfw = false): boolean {
	// Hiding a whole type only affects presentation; per-item overrides stay saved for when it is shown again.
	if (kind === 'hfx' && !settings.showHfx) return false;
	if (kind === 'tts' && !settings.showTts) return false;
	if (kind === 'hfx' && settings.hfxMode === 'safe' && nsfw) return false;
	return settings[marketplaceVisibilityOverrideKey(kind)][marketplaceItemId(id)] ?? true;
}

export function isMarketplaceCommandVisible(command: PricedMarketplaceItem, settings: ExtensionSettings): boolean {
	if (!command.marketplace) return false;
	return isMarketplaceItemEnabled(settings, marketplaceKindOf(command.marketplace.category), command.id ?? '', Boolean(command.marketplace.nsfw));
}

// Only exceptions are saved, so enabling an item removes its override instead of storing `true`.
export function toggleMarketplaceItem(settings: ExtensionSettings, kind: MarketplaceKind, id: string, enabled: boolean): ExtensionSettings {
	const key = marketplaceVisibilityOverrideKey(kind);
	const overrides = { ...settings[key] };
	const itemId = marketplaceItemId(id);
	if (enabled) delete overrides[itemId];
	else overrides[itemId] = false;
	return { ...settings, [key]: overrides };
}

export function getMarketplaceOverrideCounts(settings: ExtensionSettings, kind: MarketplaceKind) {
	return {
		priceOverrides: Object.keys(settings[marketplacePriceOverrideKey(kind)]).length,
		disabledItems: Object.values(settings[marketplaceVisibilityOverrideKey(kind)]).filter((enabled) => enabled === false).length,
	};
}

// HFX can arrive as a full URL, a HudFX id, or a legacy Lumia id (published before origins existed).
export function hfxMediaUrl(source: HfxMediaSource, preview = false): string | undefined {
	const item = preview ? source.hfxPreview ?? source.hfx : source.hfx;
	if (!item) return undefined;
	if (item.startsWith('https')) return item;
	if ((source.hfxOrigin ?? 'lumiastream') === 'lumiastream') {
		return preview ? `https://storage.lumiastream.com/overlays/lumia/hfx/previews/${item}.webm.gif` : `https://storage.lumiastream.com/overlays/lumia/hfx/${item}.webm`;
	}
	return `https://cdn.hudfx.io/hfx/${item}${preview ? '.gif' : '.webm'}`;
}

export const EXTENSION_SETTINGS_OVERRIDE_KEYS = [
	'hfxMarketplaceVolumeOverrides',
	'ttsMarketplaceVolumeOverrides',
	'hfxMarketplacePriceOverrides',
	'ttsMarketplacePriceOverrides',
	'hfxVisibilityOverrides',
	'ttsVisibilityOverrides',
] as const;

export type ExtensionSettingsChange = Partial<Record<keyof ExtensionSettings, unknown>> & Record<string, unknown>;

export function changedExtensionSettings(baseline: ExtensionSettings, next: ExtensionSettings): ExtensionSettingsChange {
	return fromEntries(Object.entries(next).filter(([key, value]) => !isJsonEqual(value, baseline[key as keyof ExtensionSettings])));
}

// Map-like settings can also be edited from the other client, so they must be merged with the latest server copy.
export function settingsChangeNeedsServerCopy(changed: ExtensionSettingsChange): boolean {
	return Object.keys(changed).length > 2 || 'entranceAccessOptions' in changed || EXTENSION_SETTINGS_OVERRIDE_KEYS.some((key) => key in changed);
}

// Rewrites map-like fields in `changed` so only the entries this client edited replace the server's current values.
export function mergeExtensionSettingsChange(
	changed: ExtensionSettingsChange,
	baseline: ExtensionSettings,
	next: ExtensionSettings,
	current?: Partial<ExtensionSettings> | null,
): ExtensionSettingsChange {
	const merged: ExtensionSettingsChange = { ...changed };
	if ('entranceAccessOptions' in changed) {
		const options = { ...normalizeExtensionSettings(current ?? undefined).entranceAccessOptions };
		for (const duration of ENTRANCE_DURATIONS) {
			if (!isJsonEqual(baseline.entranceAccessOptions[duration], next.entranceAccessOptions[duration])) options[duration] = next.entranceAccessOptions[duration];
		}
		merged.entranceAccessOptions = options;
	}
	for (const key of EXTENSION_SETTINGS_OVERRIDE_KEYS) {
		if (!(key in changed)) continue;
		const before = baseline[key] as Record<string, number | boolean>;
		const after = next[key] as Record<string, number | boolean>;
		const overrides: Record<string, number | boolean> = { ...((current?.[key] as Record<string, number | boolean>) ?? {}) };
		for (const id of new Set([...Object.keys(before), ...Object.keys(after)])) {
			if (before[id] === after[id]) continue;
			if (id in after) overrides[id] = after[id];
			else delete overrides[id];
		}
		merged[key] = overrides;
	}
	return merged;
}
