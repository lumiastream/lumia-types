import { type LumiaDynamicCondition, LumiaVariationConditions, LumiaVariationCurrency } from './alert.types';

export interface LumiaVariationLike {
	id?: string | number;
	name?: string;
	on?: boolean;
	condition?: string | number | boolean | null;
	conditionType?: LumiaVariationConditions;
	conditionExtra?: LumiaVariationCurrency | string | number | null;
	randomChance?: number;
	triggerOncePerStream?: boolean;
	settings?: {
		enabled?: boolean;
	};
}

export interface LumiaVariationConfigLike<TVariation extends LumiaVariationLike> {
	variations?: TVariation[];
	onlyVariation?: boolean;
	disableBaseAlert?: boolean;
	subgift?: boolean;
	on?: boolean;
	matchEmptyCondition?: boolean;
	caseSensitive?: boolean;
	settings?: {
		enabled?: boolean;
	};
}

export type LumiaVariationLogger = Pick<Console, 'debug' | 'error'>;

export interface LumiaVariationCheckerOptions<TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike> {
	getRandomChance?: (variation: TVariation) => unknown;
	getVariableValue?: (params: { condition: LumiaDynamicCondition; variableReference?: string; normalizedVariableName: string }) => unknown;
	hasTriggeredOnce?: (variation: TVariation, config: TConfig) => boolean;
	isBaseAlertEnabled?: (config: TConfig) => boolean;
	isVariationEnabled?: (variation: TVariation, config: TConfig) => boolean;
	logger?: LumiaVariationLogger;
	markTriggeredOnce?: (variation: TVariation, config: TConfig) => void;
	random?: () => number;
	shouldUseRandomFallback?: (config: TConfig) => boolean;
	shouldUseSubscriptionOrder?: (config: TConfig, condition: LumiaDynamicCondition | undefined | null) => boolean;
	skipVariationUpdates?: boolean;
	useConditionValueForCountTotal?: boolean;
}

const lastCountMultipleIdxByKey = new Map<string, number>();

const subscriptionOrderNumbers: Record<string, number> = {
	[LumiaVariationConditions.GIFT_SUB_EQUAL]: 1,
	[LumiaVariationConditions.GIFT_SUB_GREATER]: 2,
	[LumiaVariationConditions.IS_GIFT]: 3,
	[LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL]: 4,
	[LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER]: 5,
	[LumiaVariationConditions.IS_PRIME]: 6,
	[LumiaVariationConditions.EQUAL_SELECTION]: 7,
	[LumiaVariationConditions.RANDOM]: 8,
};

const variationBucketTypes = {
	equals: [
		LumiaVariationConditions.EQUAL_NUMBER,
		LumiaVariationConditions.EQUAL_VARIABLE,
		LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
		LumiaVariationConditions.EQUAL_SELECTION,
		LumiaVariationConditions.EQUAL_STRING,
		LumiaVariationConditions.EQUAL_USERNAME,
		LumiaVariationConditions.EQUAL_USER_LEVEL,
		LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL,
		LumiaVariationConditions.GIFT_SUB_EQUAL,
		LumiaVariationConditions.COUNT_IS_MULTIPLE_OF,
	],
	greaters: [
		LumiaVariationConditions.GREATER_NUMBER,
		LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
		LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER,
		LumiaVariationConditions.GIFT_SUB_GREATER,
	],
	lessers: [LumiaVariationConditions.LESS_NUMBER],
	checks: [LumiaVariationConditions.IS_GIFT, LumiaVariationConditions.IS_PRIME],
	randoms: [LumiaVariationConditions.RANDOM],
};

export const sanitizeVariationVariableReference = (value?: string) => (value ? value.trim().replace(/[={}]/g, '') : '');

const isVariationOnly = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(config: TConfig) => Boolean(config.onlyVariation || config.disableBaseAlert);

const isBaseAlertEnabled = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(config: TConfig, options: LumiaVariationCheckerOptions<TConfig, TVariation>) =>
	options.isBaseAlertEnabled?.(config) ?? !isVariationOnly(config);

const isVariationEnabled = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	variation: TVariation,
	config: TConfig,
	options: LumiaVariationCheckerOptions<TConfig, TVariation>,
) => options.isVariationEnabled?.(variation, config) ?? variation.on !== false;

const safeParse = (value: string | number | boolean | null | undefined, floor = false): number | boolean | null | undefined => {
	if (typeof value === 'number') {
		return floor ? Math.floor(value) : value;
	}
	if (typeof value === 'boolean' || value === undefined || value === null) {
		return value;
	}

	if (value.includes('.')) {
		const parsedValue = parseFloat(value);
		return floor ? Math.floor(parsedValue) : parsedValue;
	}

	const parsedValue = parseInt(value);
	return floor ? Math.floor(parsedValue) : parsedValue;
};

const toFiniteNumber = (value: unknown): number | undefined => {
	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : undefined;
	}
	if (typeof value === 'string') {
		const trimmedValue = value.trim();
		if (!trimmedValue.length) {
			return undefined;
		}
		const parsedValue = Number(trimmedValue);
		return Number.isFinite(parsedValue) ? parsedValue : undefined;
	}
	return undefined;
};

const getRandomNumber = (min = 0, max = 255, random = Math.random) => Math.floor(random() * (max - min + 1) + min);

const rollChance = (percent: unknown = 100, random = Math.random) => getRandomNumber(0, 100, random) < (percent as number);

const shuffle = <T>(array: Readonly<T[]>, random = Math.random): T[] => {
	const newArray = [...array];
	const startIndex = newArray.length;
	let randomIndex = Math.floor(random() * startIndex);

	for (let currentIndex = startIndex - 1; currentIndex >= 1; currentIndex--) {
		[newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
		randomIndex = Math.floor(random() * currentIndex);
	}

	return newArray;
};

const compareVariationValue = ({ expected, actual, caseSensitive }: { expected: unknown; actual: unknown; caseSensitive?: boolean }) => {
	if (expected === undefined || expected === null || (typeof expected === 'string' && expected.trim().length === 0)) {
		return actual !== undefined && actual !== null;
	}

	const expectedNumber = toFiniteNumber(expected);
	const actualNumber = toFiniteNumber(actual);
	if (expectedNumber !== undefined && actualNumber !== undefined) {
		return expectedNumber === actualNumber;
	}

	const expectedString = `${expected}`;
	const actualString = actual === undefined || actual === null ? '' : `${actual}`;
	if (caseSensitive ? expectedString === actualString : expectedString.toLowerCase() === actualString.toLowerCase()) {
		return true;
	}

	return (expected as any) == (actual as any);
};

const getVariableValueFromCondition = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	condition: LumiaDynamicCondition,
	variableReference: string | undefined,
	options: LumiaVariationCheckerOptions<TConfig, TVariation>,
) => {
	const normalizedVariableName = sanitizeVariationVariableReference(variableReference);
	if (!normalizedVariableName) {
		return undefined;
	}

	const conditionRecord = condition as unknown as Record<string, unknown>;
	if (conditionRecord[normalizedVariableName] !== undefined) {
		return conditionRecord[normalizedVariableName];
	}
	if (variableReference && conditionRecord[variableReference] !== undefined) {
		return conditionRecord[variableReference];
	}

	return options.getVariableValue?.({ condition, variableReference, normalizedVariableName });
};

const toSortableCondition = (condition: unknown) => (typeof condition !== 'boolean' ? safeParse(condition as string | number | null | undefined) : condition);

const compareVariationCondition = <TVariation extends LumiaVariationLike>(a: TVariation, b: TVariation, bucketKey: string) => {
	const aCondition = toSortableCondition(a.condition) as any;
	const bCondition = toSortableCondition(b.condition) as any;

	if (aCondition === bCondition) {
		return 0;
	}

	if (bucketKey === 'lessers') {
		return aCondition <= bCondition ? -1 : 1;
	}

	return aCondition >= bCondition ? -1 : 1;
};

const getVariationBucketKey = (conditionType?: LumiaVariationConditions) => {
	if (!conditionType) {
		return undefined;
	}

	return Object.entries(variationBucketTypes).find(([, conditionTypes]) => conditionTypes.includes(conditionType))?.[0];
};

const compareSubscriptionOrder = <TVariation extends LumiaVariationLike>(currentVariation: TVariation, previousVariation: TVariation) => {
	if (typeof currentVariation.conditionType === 'undefined' || typeof previousVariation.conditionType === 'undefined') {
		return 0;
	}

	const currentOrder = subscriptionOrderNumbers[currentVariation.conditionType];
	const previousOrder = subscriptionOrderNumbers[previousVariation.conditionType];

	if (currentOrder === previousOrder) {
		const currentBucketKey = getVariationBucketKey(currentVariation.conditionType);
		const previousBucketKey = getVariationBucketKey(previousVariation.conditionType);

		if (currentBucketKey && currentBucketKey === previousBucketKey) {
			return compareVariationCondition(currentVariation, previousVariation, currentBucketKey);
		}

		return 0;
	}

	return currentOrder > previousOrder ? 1 : -1;
};

export const resetVariationCumulativeTracking = (logger: LumiaVariationLogger = console) => {
	lastCountMultipleIdxByKey.clear();
	logger.debug('Cumulative tracking reset for new stream session');
};

const getBaseAlertFallback = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	config: TConfig,
	options: LumiaVariationCheckerOptions<TConfig, TVariation>,
) => {
	if (!isBaseAlertEnabled(config, options)) {
		options.logger?.debug('No variation found. Only accepting variations');
		return null;
	}

	return { ...config };
};

const isEmptyVariationCondition = <TVariation extends LumiaVariationLike>(variation: TVariation) => {
	const condition = variation.condition;
	if (condition === undefined || condition === null) {
		return true;
	}
	if (typeof condition === 'string') {
		return condition.trim().length === 0;
	}
	if (typeof condition === 'number') {
		return Number.isNaN(condition);
	}
	return false;
};

const evaluateVariationMatch = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>({
	variation,
	condition,
	config,
	options,
}: {
	variation: TVariation;
	condition: LumiaDynamicCondition | undefined | null;
	config: TConfig;
	options: LumiaVariationCheckerOptions<TConfig, TVariation>;
}) => {
	try {
		if (!condition && variation.conditionType !== LumiaVariationConditions.RANDOM) {
			return false;
		}

		if (
			config.matchEmptyCondition &&
			isEmptyVariationCondition(variation) &&
			variation.conditionType &&
			[
				LumiaVariationConditions.EQUAL_NUMBER,
				LumiaVariationConditions.EQUAL_VARIABLE,
				LumiaVariationConditions.EQUAL_STRING,
				LumiaVariationConditions.EQUAL_SELECTION,
				LumiaVariationConditions.GREATER_NUMBER,
				LumiaVariationConditions.LESS_NUMBER,
			].includes(variation.conditionType)
		) {
			return true;
		}

		switch (variation.conditionType) {
			case LumiaVariationConditions.EQUAL_NUMBER:
				return typeof variation.condition !== 'undefined' && safeParse(variation.condition) === safeParse(condition?.value);

			case LumiaVariationConditions.EQUAL_SELECTION: {
				let variationCondition = variation.condition;
				let value = condition?.name ?? condition?.value;
				if (typeof variationCondition === 'string') {
					variationCondition = variationCondition.toLowerCase();
				}
				if (typeof value === 'string') {
					value = value.toLowerCase();
				}

				return variationCondition == value;
			}
			case LumiaVariationConditions.EQUAL_STRING: {
				const name = condition?.name ?? condition?.value;
				if (config.caseSensitive) {
					return variation.condition?.toString() === name?.toString();
				}

				return variation.condition?.toString()?.toLowerCase() == name?.toString()?.toLowerCase();
			}
			case LumiaVariationConditions.EQUAL_VARIABLE: {
				const variableValue = condition ? getVariableValueFromCondition(condition, variation.conditionExtra?.toString(), options) : undefined;
				return compareVariationValue({ expected: variation.condition, actual: variableValue, caseSensitive: config.caseSensitive });
			}
			case LumiaVariationConditions.EQUAL_USERNAME: {
				const name = condition?.username ?? condition?.value;
				return variation.condition?.toString()?.toLowerCase() == name?.toString()?.toLowerCase();
			}
			case LumiaVariationConditions.EQUAL_USER_LEVEL:
				return Boolean(condition?.lumiauserlevels?.includes(safeParse(variation.condition) as number));

			case LumiaVariationConditions.GREATER_NUMBER:
				return typeof variation.condition !== 'undefined' && (safeParse(condition?.value) as number) >= (safeParse(variation.condition) as number);

			case LumiaVariationConditions.LESS_NUMBER:
				return typeof variation.condition !== 'undefined' && (safeParse(condition?.value) as number) <= (safeParse(variation.condition) as number);

			case LumiaVariationConditions.EQUAL_CURRENCY_NUMBER: {
				if (typeof variation.condition === 'undefined' || safeParse(variation.condition) !== safeParse(condition?.value)) {
					return false;
				}

				const checkCurrency = condition?.currency?.toUpperCase() ?? condition?.currency;
				return variation.conditionExtra === checkCurrency || variation.conditionExtra === LumiaVariationCurrency.NONE || !variation.conditionExtra;
			}
			case LumiaVariationConditions.GREATER_CURRENCY_NUMBER: {
				const checkCurrency = condition?.currency?.toUpperCase() ?? condition?.currency;
				if (typeof variation.condition !== 'undefined' && (safeParse(condition?.value) as number) >= (safeParse(variation.condition) as number)) {
					return variation.conditionExtra === checkCurrency || variation.conditionExtra === LumiaVariationCurrency.NONE || !variation.conditionExtra;
				}
				return false;
			}
			case LumiaVariationConditions.GIFT_SUB_EQUAL:
				return typeof variation.condition !== 'undefined' && safeParse(variation.condition) === safeParse(condition?.giftAmount);

			case LumiaVariationConditions.GIFT_SUB_GREATER:
				return typeof variation.condition !== 'undefined' && (safeParse(condition?.giftAmount) as number) >= (safeParse(variation.condition) as number);

			case LumiaVariationConditions.IS_GIFT:
				return Boolean(condition?.isGift || condition?.giftAmount);

			case LumiaVariationConditions.IS_PRIME:
				return Boolean(condition?.isPrime || condition?.value === 'Prime');

			case LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL:
				return typeof variation.condition !== 'undefined' && safeParse(variation.condition) === safeParse(condition?.subMonths);

			case LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER:
				return typeof variation.condition !== 'undefined' && (safeParse(condition?.subMonths) as number) >= (safeParse(variation.condition) as number);

			case LumiaVariationConditions.RANDOM:
				return rollChance(options.getRandomChance?.(variation) ?? variation.randomChance ?? variation.condition, options.random);

			case LumiaVariationConditions.COUNT_IS_MULTIPLE_OF:
				return evaluateCountIsMultipleOf({ variation, condition, options });

			default:
				return false;
		}
	} catch (error) {
		options.logger?.error('Error in variationCheck', error, variation, condition);
		return false;
	}
};

const evaluateCountIsMultipleOf = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>({
	variation,
	condition,
	options,
}: {
	variation: TVariation;
	condition: LumiaDynamicCondition | undefined | null;
	options: LumiaVariationCheckerOptions<TConfig, TVariation>;
}) => {
	if (variation.condition === undefined || condition === undefined || condition === null) {
		return false;
	}

	const step = safeParse(variation.condition);
	const totalSource = condition.total !== undefined ? condition.total : options.useConditionValueForCountTotal ? condition.value : undefined;
	const total = safeParse(totalSource);
	const previousTotal = condition.previousTotal === undefined ? undefined : safeParse(condition.previousTotal);
	const key = `${variation.id || 'unknown'}:${variation.name || 'variation'}`;

	const numericStep = Number(step);
	const numericTotal = Number(total);
	if (!Number.isFinite(numericTotal) || !Number.isFinite(numericStep) || numericStep <= 0) {
		return false;
	}

	const currIdx = Math.floor(numericTotal / numericStep);
	const storedIdx = lastCountMultipleIdxByKey.get(key);
	const hasPrevTotal = previousTotal !== undefined;
	const shouldCommit = !options.skipVariationUpdates;

	if (storedIdx !== undefined && currIdx < storedIdx) {
		if (shouldCommit) {
			lastCountMultipleIdxByKey.set(key, currIdx);
		}
		return false;
	}

	let baseIdx = storedIdx;

	if (baseIdx === undefined) {
		if (hasPrevTotal) {
			const numericPreviousTotal = Number(previousTotal);
			if (numericPreviousTotal > numericTotal) {
				if (shouldCommit) {
					lastCountMultipleIdxByKey.set(key, currIdx);
				}
				return false;
			}
			baseIdx = Math.floor(numericPreviousTotal / numericStep);
		} else {
			if (shouldCommit) {
				lastCountMultipleIdxByKey.set(key, currIdx);
			}
			return false;
		}
	}

	const crossed = currIdx > baseIdx;

	if (crossed) {
		if (shouldCommit) {
			lastCountMultipleIdxByKey.set(key, currIdx);
		}
		return true;
	}

	if (storedIdx === undefined && shouldCommit) {
		lastCountMultipleIdxByKey.set(key, baseIdx);
	}

	return false;
};

const variationCheck = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>({
	variation,
	condition,
	config,
	options,
}: {
	variation: TVariation;
	condition: LumiaDynamicCondition | undefined | null;
	config: TConfig;
	options: LumiaVariationCheckerOptions<TConfig, TVariation>;
}) => {
	if (variation.triggerOncePerStream && options.hasTriggeredOnce?.(variation, config)) {
		options.logger?.debug('Variation already triggered this stream', variation.name);
		return false;
	}

	const matched = evaluateVariationMatch({ variation, condition, config, options });

	if (matched && variation.triggerOncePerStream && !options.skipVariationUpdates) {
		options.markTriggeredOnce?.(variation, config);
	}

	return matched;
};

const checkByOrder = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	config: TConfig,
	condition: LumiaDynamicCondition | undefined | null,
	options: LumiaVariationCheckerOptions<TConfig, TVariation>,
) => {
	if (typeof config.variations === 'undefined') {
		return undefined;
	}

	const variations = config.variations.filter((variation) => isVariationEnabled(variation, config, options)).sort(compareSubscriptionOrder);

	let foundVariation: TVariation | undefined;
	let randoms: TVariation[] = [];

	variations.some((variation) => {
		if (typeof variation.conditionType !== 'undefined' && variationBucketTypes.randoms.includes(variation.conditionType)) {
			randoms.push(variation);
			return false;
		}

		if (variationCheck({ variation, condition, config, options })) {
			foundVariation = variation;
			return true;
		}

		return false;
	});

	if (typeof foundVariation === 'undefined' && randoms.length) {
		randoms = shuffle(randoms, options.random);
		randoms.some((variation) => {
			if (variationCheck({ variation, condition, config, options })) {
				foundVariation = variation;
				return true;
			}

			return false;
		});

		if (!foundVariation && options.shouldUseRandomFallback?.(config)) {
			foundVariation = randoms[0];
		}
	}

	return foundVariation;
};

const checkByPriorities = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	config: TConfig,
	condition: LumiaDynamicCondition | undefined | null,
	options: LumiaVariationCheckerOptions<TConfig, TVariation>,
) => {
	if (typeof config.variations === 'undefined') {
		return undefined;
	}

	const variationBucket: Record<keyof typeof variationBucketTypes, TVariation[]> = {
		equals: [],
		greaters: [],
		lessers: [],
		checks: [],
		randoms: [],
	};

	config.variations.forEach((variation) => {
		if (!isVariationEnabled(variation, config, options) || typeof variation.conditionType === 'undefined') {
			return;
		}

		if (variationBucketTypes.equals.includes(variation.conditionType)) {
			variationBucket.equals.push(variation);
		} else if (variationBucketTypes.greaters.includes(variation.conditionType)) {
			variationBucket.greaters.push(variation);
		} else if (variationBucketTypes.lessers.includes(variation.conditionType)) {
			variationBucket.lessers.push(variation);
		} else if (variationBucketTypes.checks.includes(variation.conditionType)) {
			variationBucket.checks.push(variation);
		} else if (variationBucketTypes.randoms.includes(variation.conditionType)) {
			variationBucket.randoms.push(variation);
		}
	});

	Object.keys(variationBucket).forEach((bucketKey) => {
		variationBucket[bucketKey as keyof typeof variationBucket].sort((a, b) => compareVariationCondition(a, b, bucketKey));
	});

	let foundVariation: TVariation | undefined;
	const bucketKeys: Array<keyof typeof variationBucket> = ['equals', 'greaters', 'lessers', 'checks', 'randoms'];

	bucketKeys.some((bucketKey) => {
		if (!variationBucket[bucketKey].length) {
			return false;
		}

		const variations = bucketKey === 'randoms' ? shuffle(variationBucket[bucketKey], options.random) : variationBucket[bucketKey];
		variations.some((variation) => {
			if (variationCheck({ variation, condition, config, options })) {
				foundVariation = variation;
				return true;
			}
			return false;
		});

		if (!foundVariation && bucketKey === 'randoms' && options.shouldUseRandomFallback?.(config)) {
			foundVariation = variations[0];
		}

		return Boolean(foundVariation);
	});

	return foundVariation;
};

export const checkAlertVariation = <TConfig extends LumiaVariationConfigLike<TVariation>, TVariation extends LumiaVariationLike>(
	config: TConfig,
	condition: LumiaDynamicCondition | undefined | null,
	options: LumiaVariationCheckerOptions<TConfig, TVariation> = {},
): TVariation | TConfig | null => {
	if (!config.variations) {
		return getBaseAlertFallback(config, options);
	}

	const foundVariation = options.shouldUseSubscriptionOrder?.(config, condition) ? checkByOrder(config, condition, options) : checkByPriorities(config, condition, options);

	if (foundVariation) {
		options.logger?.debug('Found variation: ', foundVariation?.name);
		return foundVariation;
	}

	return getBaseAlertFallback(config, options);
};
