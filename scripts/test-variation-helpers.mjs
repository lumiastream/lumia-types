#!/usr/bin/env node
import assert from 'node:assert/strict';
import { checkAlertVariation, LumiaVariationConditions, resetVariationCumulativeTracking } from '../dist/index.js';

const silentLogger = {
	debug: () => undefined,
	error: (...args) => console.error(...args),
};

const variation = (name, conditionType, condition, overrides = {}) => ({
	id: name,
	name,
	on: true,
	condition,
	conditionType,
	...overrides,
});

const alertConfig = (variations, overrides = {}) => ({
	on: true,
	variations,
	...overrides,
});

const isVariationsOnly = (config) => Boolean(config.onlyVariation || config.disableBaseAlert);

const check = (config, condition, options = {}) =>
	checkAlertVariation(config, condition, {
		getRandomChance: (item) => item.condition,
		isBaseAlertEnabled: (item) => !isVariationsOnly(item),
		logger: silentLogger,
		shouldUseRandomFallback: isVariationsOnly,
		shouldUseSubscriptionOrder: (item) => item.subgift !== undefined && item.subgift !== null,
		...options,
	});

const tests = [];
const test = (name, run) => tests.push({ name, run });

test('preserves the top variation when identical normal variations both match', () => {
	const config = alertConfig([variation('top', LumiaVariationConditions.EQUAL_NUMBER, 10), variation('bottom', LumiaVariationConditions.EQUAL_NUMBER, 10)], { onlyVariation: true });

	assert.equal(check(config, { value: 10 }), config.variations[0]);
});

test('uses the highest matching numeric greater threshold when conditions are strings', () => {
	const config = alertConfig(
		[
			variation('greater 1', LumiaVariationConditions.GREATER_NUMBER, '1'),
			variation('greater 2', LumiaVariationConditions.GREATER_NUMBER, '2'),
			variation('greater 9', LumiaVariationConditions.GREATER_NUMBER, '9'),
			variation('greater 11', LumiaVariationConditions.GREATER_NUMBER, '11'),
		],
		{ onlyVariation: true },
	);

	assert.equal(check(config, { value: 10 }), config.variations[2]);
	assert.equal(check(config, { value: 11 }), config.variations[3]);
});

test('uses the lowest matching less-than threshold', () => {
	const config = alertConfig(
		[
			variation('less 100', LumiaVariationConditions.LESS_NUMBER, 100),
			variation('less 50', LumiaVariationConditions.LESS_NUMBER, 50),
			variation('less 10', LumiaVariationConditions.LESS_NUMBER, 10),
		],
		{ onlyVariation: true },
	);

	assert.equal(check(config, { value: 40 }), config.variations[1]);
});

test('prefers exact gift sub variations over lower greater thresholds in subscription order', () => {
	const config = alertConfig([variation('gift greater 9', LumiaVariationConditions.GIFT_SUB_GREATER, '9'), variation('gift equal 11', LumiaVariationConditions.GIFT_SUB_EQUAL, '11')], {
		onlyVariation: true,
		subgift: true,
	});

	assert.equal(check(config, { value: 1000, giftAmount: 11 }), config.variations[1]);
});

test('matches selection and strings case-insensitively by default', () => {
	const selectionConfig = alertConfig([variation('prime selection', LumiaVariationConditions.EQUAL_SELECTION, 'prime')], { onlyVariation: true });
	const stringConfig = alertConfig([variation('merch', LumiaVariationConditions.EQUAL_STRING, 'Mikey')], { onlyVariation: true });

	assert.equal(check(selectionConfig, { value: 'Prime' }), selectionConfig.variations[0]);
	assert.equal(check(stringConfig, { value: 'mikey' }), stringConfig.variations[0]);
});

test('honors case-sensitive string matching when enabled', () => {
	const config = alertConfig([variation('merch', LumiaVariationConditions.EQUAL_STRING, 'Mikey')], { caseSensitive: true, onlyVariation: true });

	assert.equal(check(config, { value: 'mikey' }), null);
	assert.equal(check(config, { value: 'Mikey' }), config.variations[0]);
});

test('matches variable values from dynamic condition and fallback lookup', () => {
	const conditionConfig = alertConfig([variation('points from condition', LumiaVariationConditions.EQUAL_VARIABLE, '10', { conditionExtra: 'points' })], { onlyVariation: true });
	const fallbackConfig = alertConfig([variation('points from fallback', LumiaVariationConditions.EQUAL_VARIABLE, '20', { conditionExtra: '{{points}}' })], { onlyVariation: true });

	assert.equal(check(conditionConfig, { value: 0, points: 10 }), conditionConfig.variations[0]);
	assert.equal(check(fallbackConfig, { value: 0 }, { getVariableValue: ({ normalizedVariableName }) => ({ points: 20 })[normalizedVariableName] }), fallbackConfig.variations[0]);
});

test('matches usernames and user levels', () => {
	const usernameConfig = alertConfig([variation('username', LumiaVariationConditions.EQUAL_USERNAME, 'Lumia')], { onlyVariation: true });
	const userLevelConfig = alertConfig([variation('level', LumiaVariationConditions.EQUAL_USER_LEVEL, '3')], { onlyVariation: true });

	assert.equal(check(usernameConfig, { value: 'ignored', username: 'lumia' }), usernameConfig.variations[0]);
	assert.equal(check(userLevelConfig, { value: 0, lumiauserlevels: [1, 3] }), userLevelConfig.variations[0]);
});

test('matches currency equal and greater conditions with currency-specific filtering', () => {
	const config = alertConfig(
		[
			variation('100 usd equal', LumiaVariationConditions.EQUAL_CURRENCY_NUMBER, 100, { conditionExtra: 'USD' }),
			variation('200 usd greater', LumiaVariationConditions.GREATER_CURRENCY_NUMBER, 200, { conditionExtra: 'USD' }),
			variation('200 sek greater', LumiaVariationConditions.GREATER_CURRENCY_NUMBER, 200, { conditionExtra: 'SEK' }),
		],
		{ onlyVariation: true },
	);

	assert.equal(check(config, { value: 100, currency: 'USD' }), config.variations[0]);
	assert.equal(check(config, { value: 300, currency: 'USD' }), config.variations[1]);
	assert.equal(check(config, { value: 300, currency: 'SEK' }), config.variations[2]);
});

test('matches subscription gift, prime, and month conditions', () => {
	const config = alertConfig(
		[
			variation('gift', LumiaVariationConditions.IS_GIFT, true),
			variation('prime', LumiaVariationConditions.IS_PRIME, true),
			variation('months equal', LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL, 6),
			variation('months greater', LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER, 3),
		],
		{ onlyVariation: true, subgift: true },
	);

	assert.equal(check(config, { value: 1000, isGift: true }), config.variations[0]);
	assert.equal(check(config, { value: 'Prime' }), config.variations[1]);
	assert.equal(check(config, { value: 1000, subMonths: 6 }), config.variations[2]);
	assert.equal(check(config, { value: 1000, subMonths: 5 }), config.variations[3]);
});

test('returns base alert or null based on base alert fallback', () => {
	const baseConfig = alertConfig([variation('unmatched', LumiaVariationConditions.EQUAL_NUMBER, 10)]);
	const onlyConfig = alertConfig([variation('unmatched', LumiaVariationConditions.EQUAL_NUMBER, 10)], { onlyVariation: true });

	assert.deepEqual(check(baseConfig, { value: 2 }), { ...baseConfig });
	assert.equal(check(onlyConfig, { value: 2 }), null);
});

test('uses deterministic random chance and only-variation random fallback', () => {
	const hitConfig = alertConfig([variation('random hit', LumiaVariationConditions.RANDOM, 100)], { onlyVariation: true });
	const fallbackConfig = alertConfig([variation('random fallback', LumiaVariationConditions.RANDOM, 0)], { onlyVariation: true });
	const missConfig = alertConfig([variation('random miss', LumiaVariationConditions.RANDOM, 0)], { onlyVariation: true });

	assert.equal(check(hitConfig, { value: 0 }, { random: () => 0.99 }), hitConfig.variations[0]);
	assert.equal(check(fallbackConfig, { value: 0 }, { random: () => 0.99 }), fallbackConfig.variations[0]);
	assert.equal(check(missConfig, { value: 0 }, { random: () => 0.99, shouldUseRandomFallback: () => false }), null);
});

test('tracks count-is-multiple-of crossings and respects skipVariationUpdates', () => {
	resetVariationCumulativeTracking(silentLogger);
	const config = alertConfig([variation('every 10', LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, 10)], { onlyVariation: true });

	assert.equal(check(config, { value: 0, total: 9 }), null);
	assert.equal(check(config, { value: 0, total: 10, previousTotal: 9 }), config.variations[0]);
	assert.equal(check(config, { value: 0, total: 19, previousTotal: 10 }), null);
	assert.equal(check(config, { value: 0, total: 20, previousTotal: 19 }), config.variations[0]);

	resetVariationCumulativeTracking(silentLogger);
	assert.equal(check(config, { value: 0, total: 20, previousTotal: 10 }, { skipVariationUpdates: true }), config.variations[0]);
	assert.equal(check(config, { value: 0, total: 20, previousTotal: 10 }), config.variations[0]);
});

test('can use condition.value as count total when requested', () => {
	resetVariationCumulativeTracking(silentLogger);
	const config = alertConfig([variation('every 10', LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, 10)], { onlyVariation: true });

	assert.equal(check(config, { value: 9 }, { useConditionValueForCountTotal: true }), null);
	assert.equal(check(config, { value: 10 }, { useConditionValueForCountTotal: true }), config.variations[0]);
});

test('supports trigger-once hooks without owning app state', () => {
	let triggered = false;
	const config = alertConfig([variation('once', LumiaVariationConditions.EQUAL_NUMBER, 10, { triggerOncePerStream: true })], { onlyVariation: true });

	assert.equal(check(config, { value: 10 }, { hasTriggeredOnce: () => triggered, markTriggeredOnce: () => void (triggered = true) }), config.variations[0]);
	assert.equal(check(config, { value: 10 }, { hasTriggeredOnce: () => triggered }), null);
});

let passed = 0;
for (const { name, run } of tests) {
	try {
		run();
		passed += 1;
	} catch (error) {
		console.error(`✗ ${name}`);
		throw error;
	}
}

console.log(`✓ Variation helper tests passed (${passed} cases).`);
