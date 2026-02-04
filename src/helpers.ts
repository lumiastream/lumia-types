import { LumiaVariationConditions } from './alert.types';

// Helper function to format condition type and value into user-friendly text
export const formatCondition = (conditionType: string | undefined, condition: string | number | undefined, conditionExtra?: any): string => {
	if (!conditionType) return '';

	const conditionMap: Record<string, (val?: string | number, extra?: any) => string> = {
		[LumiaVariationConditions.EQUAL_NUMBER]: (val, extra) =>
			typeof extra === 'string' && extra.length ? `Variable ${extra} equals ${val}` : `Amount equals ${val}`,
		[LumiaVariationConditions.GREATER_NUMBER]: (val, extra) =>
			typeof extra === 'string' && extra.length ? `Variable ${extra} is ${val} or more` : `Amount is ${val} or more`,
		[LumiaVariationConditions.LESS_NUMBER]: (val, extra) =>
			typeof extra === 'string' && extra.length ? `Variable ${extra} is ${val} or less` : `Amount is ${val} or less`,
		[LumiaVariationConditions.EQUAL_STRING]: (val, extra) =>
			typeof extra === 'string' && extra.length ? `Variable ${extra} equals "${val}"` : `Text equals "${val}"`,
		[LumiaVariationConditions.EQUAL_USERNAME]: (val) => `User is ${val}`,
		[LumiaVariationConditions.EQUAL_USER_LEVEL]: (val) => `User level is ${val}`,
		[LumiaVariationConditions.EQUAL_SELECTION]: (val) => `${val}`,
		[LumiaVariationConditions.EQUAL_CURRENCY_NUMBER]: (val, extra) => `Amount equals ${val}${extra ? ` ${extra}` : ''}`,
		[LumiaVariationConditions.GREATER_CURRENCY_NUMBER]: (val, extra) => `Amount is ${val}${extra ? ` ${extra}` : ''} or more`,
		[LumiaVariationConditions.GIFT_SUB_EQUAL]: (val) => `Gift subs equals ${val}`,
		[LumiaVariationConditions.GIFT_SUB_GREATER]: (val) => `Gift subs is ${val} or more`,
		[LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL]: (val) => `Subscribed for ${val} months`,
		[LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER]: (val) => `Subscribed for ${val} months or more`,
		[LumiaVariationConditions.IS_GIFT]: () => 'Is a gift subscription',
		[LumiaVariationConditions.IS_PRIME]: () => 'Is a Prime subscription',
		[LumiaVariationConditions.TARGET_ACHIEVED]: () => 'Target achieved',
		[LumiaVariationConditions.IS_ON]: () => 'Is on',
		[LumiaVariationConditions.COUNT_IS_MULTIPLE_OF]: (val, extra) => `Count is multiple of ${val}${extra ? ` ${extra}` : ''}`,
		[LumiaVariationConditions.RANDOM]: (val) => `${val}% random chance`,
	};

	const formatter = conditionMap[conditionType];
	if (formatter) {
		return formatter(condition, conditionExtra);
	}

	// Fallback for unknown types
	return condition ? `${conditionType}: ${condition}` : conditionType;
};
