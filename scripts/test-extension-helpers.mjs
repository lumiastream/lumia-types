#!/usr/bin/env node
import assert from 'node:assert/strict';
import {
	DEFAULT_EXTENSION_SETTINGS as defaults,
	TWITCH_EXTENSION_BIT_VALUES,
	activeEntranceAccess,
	changedExtensionSettings,
	entranceExpiry,
	entrancePurchaseChoices,
	flashSalePointsPrice,
	flashSalePrice,
	hfxMediaUrl,
	isMarketplaceCommandVisible,
	isMarketplaceItemEnabled,
	marketplacePrice,
	marketplaceVolumeOverride,
	mergeExtensionSettingsChange,
	nearestBits,
	normalizeExtensionSettings,
	toggleMarketplaceItem,
	ttsQuotaPrice,
} from '../dist/index.js';

const tests = [];
const test = (name, run) => tests.push({ name, run });

test('marketplace selling is off until the streamer turns it on', () => {
	const settings = normalizeExtensionSettings({});
	assert.equal(settings.showHfx, false);
	assert.equal(settings.showTts, false);
	assert.equal(isMarketplaceItemEnabled(settings, 'hfx', 'any'), false);
	assert.equal(isMarketplaceItemEnabled(settings, 'tts', 'any'), false);
});

test('snaps per-item prices to amounts Twitch sells', () => {
	const settings = normalizeExtensionSettings({ hfxMarketplacePriceOverrides: { a: 7, b: 100, c: Number.NaN }, ttsMarketplacePriceOverrides: { d: 1234 } });
	assert.deepEqual(settings.hfxMarketplacePriceOverrides, { a: 6, b: 100 });
	assert.ok(TWITCH_EXTENSION_BIT_VALUES.includes(settings.ttsMarketplacePriceOverrides.d));
});

test('never discounts a paid item to 0 Bits', () => {
	const settings = { ...defaults, flashSaleMode: 'global', flashSalePercent: 90, flashSaleMinimumBits: 0 };
	assert.equal(flashSalePrice(3, settings), 3);
	assert.ok(flashSalePrice(100, settings) > 0);
});

test('entrance access defaults offer one week, one month, and unlimited access', () => {
	assert.deepEqual(normalizeExtensionSettings({}).entranceAccessOptions, {
		week: { enabled: true, bits: 100 },
		month: { enabled: true, bits: 500 },
		unlimited: { enabled: true, bits: 2000 },
	});
});

test('drops unknown keys and keeps only disabled visibility overrides', () => {
	const settings = normalizeExtensionSettings({ ...defaults, sectionOrder: ['marketplace'], showHfx: false, hfxVisibilityOverrides: { hidden: false, visible: true } });
	assert.equal('sectionOrder' in settings, false);
	assert.equal(settings.showHfx, false);
	assert.equal(settings.hfxMode, 'safe');
	assert.deepEqual(settings.hfxVisibilityOverrides, { hidden: false });
});

test('hides marketplace items according to their type visibility', () => {
	const command = (id, category) => ({ id, bits: 100, marketplace: { category } });
	const hidden = normalizeExtensionSettings({ ...defaults, showHfx: false, showTts: false });
	assert.equal(isMarketplaceCommandVisible(command('voice', 'tts'), hidden), false);
	const ttsHidden = normalizeExtensionSettings({ ...hidden, showHfx: true });
	assert.equal(isMarketplaceCommandVisible(command('voice', 'tts'), ttsHidden), false);
	assert.equal(isMarketplaceCommandVisible(command('hfx', 'video'), ttsHidden), true);
});

test('uses bare ids in separate HFX and TTS override maps', () => {
	const settings = normalizeExtensionSettings({
		showHfx: true,
		showTts: true,
		hfxMarketplacePriceOverrides: { shared: 64 },
		ttsMarketplacePriceOverrides: { shared: 102 },
		hfxMarketplaceVolumeOverrides: { shared: 51 },
		ttsMarketplaceVolumeOverrides: { shared: 25 },
		hfxVisibilityOverrides: { shared: false },
	});
	assert.equal(marketplacePrice({ id: 'marketplace:hfx:hudfx:shared', bits: 100, marketplace: { category: 'video' } }, settings), 64);
	assert.equal(marketplacePrice({ id: 'marketplace:tts:shared', bits: 100, marketplace: { category: 'tts' } }, settings), 102);
	assert.equal(marketplaceVolumeOverride(settings, 'hfx', 'marketplace:hfx:hudfx:shared'), 51);
	assert.equal(marketplaceVolumeOverride(settings, 'tts', 'marketplace:tts:shared'), 25);
	assert.equal(isMarketplaceItemEnabled(settings, 'hfx', 'marketplace:hfx:hudfx:shared'), false);
	assert.equal(isMarketplaceItemEnabled(settings, 'tts', 'marketplace:tts:shared'), true);
	assert.deepEqual(toggleMarketplaceItem(settings, 'tts', 'marketplace:tts:shared', false).ttsVisibilityOverrides, { shared: false });
});

test('every discount uses a supported price, respects the floor, and never increases cost', () => {
	for (const price of TWITCH_EXTENSION_BIT_VALUES)
		for (const percent of [10, 35, 90]) {
			const sale = flashSalePrice(price, { ...defaults, flashSaleMode: 'global', flashSalePercent: percent });
			assert.ok(TWITCH_EXTENSION_BIT_VALUES.includes(sale));
			assert.ok(sale <= price);
			assert.ok(sale >= (price >= 20 ? 20 : 0));
		}
	assert.equal(nearestBits(7), 6);
	assert.equal(flashSalePrice(10, { ...defaults, flashSaleMode: 'global', flashSalePercent: 90 }), 10);
});

test('random sales only discount the selected id and subscriber sales require a tier', () => {
	const settings = { ...defaults, flashSaleMode: 'random', randomSaleItemId: 'chosen' };
	assert.equal(flashSalePrice(100, settings, null, 'other'), 100);
	assert.equal(flashSalePrice(100, settings, null, 'chosen'), 80);
	assert.equal(flashSalePrice(100, { ...settings, flashSaleMode: 'subscriber' }, null, 'chosen'), 100);
	assert.equal(flashSalePrice(100, { ...settings, flashSaleMode: 'subscriber' }, '3000', 'other'), 70);
});

test('loyalty point sales keep a 20-point floor', () => {
	const global = { ...defaults, flashSaleMode: 'global', flashSalePercent: 25, flashSaleMinimumBits: 100 };
	assert.equal(flashSalePointsPrice(10, global), 10);
	assert.equal(flashSalePointsPrice(0, global), 0);
	assert.equal(flashSalePointsPrice(21, { ...global, flashSalePercent: 90 }), 20);
	assert.equal(flashSalePointsPrice(101, { ...global, flashSaleMode: 'random', randomSaleItemId: 'points' }, null, 'points'), 76);
	assert.equal(flashSalePointsPrice(100, { ...global, flashSaleMode: 'subscriber' }, '2000'), 80);
});

test('TTS quota warning uses the lowest effective sale price', () => {
	const global = { ...defaults, flashSaleMode: 'global', flashSalePercent: 55 };
	assert.ok(ttsQuotaPrice(130, global, 'marketplace:tts:voice-1') < 100);
	assert.equal(ttsQuotaPrice(130, { ...global, flashSaleMode: 'off' }, 'marketplace:tts:voice-1'), 130);
	const subscriber = { ...global, flashSaleMode: 'subscriber', flashSaleTier1Percent: 10, flashSaleTier3Percent: 50 };
	assert.equal(ttsQuotaPrice(130, subscriber, 'x'), flashSalePrice(130, subscriber, '3000', 'x'));
});

test('settings changes only replace the override entries this client edited', () => {
	const baseline = normalizeExtensionSettings({ hfxMarketplacePriceOverrides: { a: 10, b: 20 } });
	const next = normalizeExtensionSettings({ hfxMarketplacePriceOverrides: { a: 15 } });
	const changed = changedExtensionSettings(baseline, next);
	assert.deepEqual(Object.keys(changed), ['hfxMarketplacePriceOverrides']);
	const merged = mergeExtensionSettingsChange(changed, baseline, next, { hfxMarketplacePriceOverrides: { a: 10, b: 20, c: 30 } });
	assert.deepEqual(merged.hfxMarketplacePriceOverrides, { a: 15, c: 30 });
});

test('entrance purchase choices offer add and upgrades once the viewer has access', () => {
	const options = defaults.entranceAccessOptions;
	assert.deepEqual(entrancePurchaseChoices(options, []).map((choice) => choice.kind), ['new', 'new', 'new']);
	const week = { status: 'created', duration: 'week', expires_at: new Date(Date.now() + 86_400_000).toISOString() };
	assert.deepEqual(activeEntranceAccess([week]).duration, 'week');
	assert.deepEqual(
		entrancePurchaseChoices(options, [week]).map((choice) => `${choice.kind}:${choice.duration}`),
		['add:week', 'upgrade:month', 'upgrade:unlimited'],
	);
	assert.equal(entranceExpiry('unlimited', new Date()), null);
});

test('HFX media urls resolve full urls, HudFX ids, and legacy Lumia ids', () => {
	assert.equal(hfxMediaUrl({ hfx: 'https://x/y.webm' }), 'https://x/y.webm');
	assert.equal(hfxMediaUrl({ hfx: 'abc', hfxOrigin: 'hudfx' }, true), 'https://cdn.hudfx.io/hfx/abc.gif');
	assert.equal(hfxMediaUrl({ hfx: 'abc' }), 'https://storage.lumiastream.com/overlays/lumia/hfx/abc.webm');
});

let failed = 0;
for (const { name, run } of tests) {
	try {
		run();
	} catch (error) {
		failed++;
		console.error(`✗ ${name}\n`, error);
	}
}
if (failed) process.exit(1);
console.log(`extension helpers: ${tests.length} tests passed`);
