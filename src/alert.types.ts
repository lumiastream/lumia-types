import { LumiaAlertValues } from './activity.types';
import { LumiaAlertBrands } from './event.types';

export enum LumiaVariationConditions {
	RANDOM = 'RANDOM', // Frequency: Percent Chance
	GREATER_NUMBER = 'GREATER_NUMBER',
	LESS_NUMBER = 'LESS_NUMBER',
	EQUAL_STRING = 'EQUAL_STRING',
	EQUAL_NUMBER = 'EQUAL_NUMBER',
	EQUAL_SELECTION = 'EQUAL_SELECTION',
	EQUAL_CURRENCY_NUMBER = 'EQUAL_CURRENCY_NUMBER',
	GREATER_CURRENCY_NUMBER = 'GREATER_CURRENCY_NUMBER',

	// Twitch Sub Variations
	SUBSCRIBED_MONTHS_EQUAL = 'SUBSCRIBED_MONTHS_EQUAL',
	SUBSCRIBED_MONTHS_GREATER = 'SUBSCRIBED_MONTHS_GREATER',
	IS_GIFT = 'IS_GIFT',
	GIFT_SUB_EQUAL = 'GIFT_SUB_EQUAL',
	GIFT_SUB_GREATER = 'GIFT_SUB_GREATER',
	IS_PRIME = 'IS_PRIME',

	// Twitch Goal
	TARGET_ACHIEVED = 'TARGET_ACHIEVED',

	IS_ON = 'IS_ON',
}

export enum LumiaVariationCurrency {
	NONE = '',
	USD = 'USD',
	EUR = 'EUR',
	CAD = 'CAD',
	AUD = 'AUD',
	DKK = 'DKK',
	CZK = 'CZK',
	HKD = 'HKD',
	ILS = 'ILS',
	MYR = 'MYR',
	MXN = 'MXN',
	NOK = 'NOK',
	NZD = 'NZD',
	PHP = 'PHP',
	PLN = 'PLN',
	GBP = 'GBP',
	RUB = 'RUB',
	SGD = 'SGD',
	SEK = 'SEK',
	CHF = 'CHF',
	THB = 'THB',
	TRY = 'TRY',
}

export const VariationCurrencySymbol = {
	[LumiaVariationCurrency.NONE]: '',
	[LumiaVariationCurrency.USD]: '$',
	[LumiaVariationCurrency.EUR]: '€',
	[LumiaVariationCurrency.CAD]: '$',
	[LumiaVariationCurrency.AUD]: '$',
	[LumiaVariationCurrency.DKK]: 'kr',
	[LumiaVariationCurrency.CZK]: 'Kč',
	[LumiaVariationCurrency.HKD]: '$',
	[LumiaVariationCurrency.ILS]: '₪',
	[LumiaVariationCurrency.MYR]: 'RM',
	[LumiaVariationCurrency.MXN]: '$',
	[LumiaVariationCurrency.NOK]: 'kr',
	[LumiaVariationCurrency.NZD]: '$',
	[LumiaVariationCurrency.PHP]: '₱',
	[LumiaVariationCurrency.PLN]: 'zł',
	[LumiaVariationCurrency.GBP]: '£',
	[LumiaVariationCurrency.RUB]: '₽',
	[LumiaVariationCurrency.SGD]: '$',
	[LumiaVariationCurrency.SEK]: 'kr',
	[LumiaVariationCurrency.CHF]: 'CHF',
	[LumiaVariationCurrency.THB]: '฿',
	[LumiaVariationCurrency.TRY]: 'TRY',
};

export interface LumiaDynamicCondition {
	value: number | string;
	isPrime?: boolean;
	isGift?: boolean;
	giftAmount?: number;
	subMonths?: number;
	currency?: string;
}

export const LumiaAlertConfigs: Record<
	LumiaAlertValues | string,
	{
		connection: LumiaAlertBrands;
		message: string;
		eventlistSpecialUsername?: string;
		eventlistMessage?: string;
		eventlistDetailedMessage?: string;
		acceptedVariables: string[];
		quickActions?: Array<{
			label: string;
			dynamic: LumiaDynamicCondition;
			extraSettings?: Record<string, string | number>;
		}>;
		inputFields?: Array<{
			type: 'text' | 'number' | 'selection' | 'check' | 'currency';
			label: string;
			helperText?: string;
			dynamicField?: string;
			variableField: string;
			default: string | number | boolean;
			required?: boolean;
			selections?: Array<{ label: string; value: string | number }>;
			hideWhen?: string;
			showWhen?: string;
		}>;
		LumiaVariationConditions: Array<{
			type: LumiaVariationConditions;
			selections?: Array<{
				label: string;
				message?: string;
				value: string | number;
			}>;
		}>;
	}
> = {
	// twitch: {
	[LumiaAlertValues.TWITCH_STREAM_LIVE]: {
		connection: 'twitch',
		message: 'Twitch Stream is now live',
		acceptedVariables: ['eventTime'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: {
		connection: 'twitch',
		message: 'Twitch Stream is offline',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_FOLLOWER]: {
		connection: 'twitch',
		message: '{{username}} is now following!',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: ['username'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
	},
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: {
		connection: 'twitch',
		message: '{{username}} just subscribed!',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a {{tier}} subscriber',
		acceptedVariables: ['username', 'tier', 'giftAmount', 'totalGifts', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
		quickActions: [
			{
				label: 'Tier 1 Sub',
				dynamic: { value: 1000 },
				extraSettings: {
					username: 'lumiastream',
					message: 'Great Stream',
					tier: 1000,
					subMonths: 1,
					subPlan: 1000,
					subPlanName: 'Tier 1',
				},
			},
			{
				label: 'Gift 5 Subs',
				dynamic: { value: 1000, giftAmount: 5, isGift: true },
				extraSettings: {
					username: 'lumiastream',
					message: 'Great Stream',
					recipient: 'worldlights',
					giftAmount: 5,
					totalGifts: 5,
					tier: 1000,
					subMonths: 1,
					subPlan: 1000,
					subPlanName: 'Tier 1',
				},
			},
			{
				label: 'Prime Sub',
				dynamic: { value: 'Prime' },
				extraSettings: {
					username: 'lumiastream',
					message: 'Great Stream',
					tier: 'Prime',
					subMonths: 1,
					subPlan: 'Prime',
					subPlanName: 'Prime',
				},
			},
			{
				label: 'Resubscribed 3 months',
				dynamic: { value: 1000, subMonths: 3 },
				extraSettings: {
					username: 'lumiastream',
					message: 'Great Stream',
					tier: 1000,
					subMonths: 3,
					streakMonths: 3,
					subPlan: 1000,
					subPlanName: 'Tier 1',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'check',
				label: 'Is Gift',
				dynamicField: 'isGift',
				variableField: 'isGift',
				default: false,
				required: false,
			},
			{
				type: 'text',
				label: 'Gift Recipient',
				variableField: 'recipient',
				required: false,
				default: 'worldlights',
				showWhen: 'isGift',
			},
			{
				type: 'number',
				label: 'Months subscribed',
				dynamicField: 'subMonths',
				variableField: 'subMonths',
				required: false,
				default: 1,
				hideWhen: 'isGift',
			},
			{
				type: 'number',
				label: 'Gift amount',
				dynamicField: 'giftAmount',
				variableField: 'giftAmount',
				required: false,
				default: 1,
				showWhen: 'isGift',
			},
			{
				type: 'selection',
				label: 'Tier',
				dynamicField: 'value',
				variableField: 'subPlan',
				default: 1000,
				required: true,
				selections: [
					{ label: 'Tier 1', value: 1000 },
					{ label: 'Tier 2', value: 2000 },
					{ label: 'Tier 3', value: 3000 },
					{ label: 'Prime', value: 'Prime' },
				],
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_SELECTION,
				selections: [
					{ label: 'Tier 1', value: 1000 },
					{ label: 'Tier 2', value: 2000 },
					{ label: 'Tier 3', value: 3000 },
					{ label: 'Prime', value: 'Prime' },
				],
			},
			{
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL,
			},
			{
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER,
			},
			{
				type: LumiaVariationConditions.IS_PRIME,
			},
			{
				type: LumiaVariationConditions.IS_GIFT,
			},
			{
				type: LumiaVariationConditions.GIFT_SUB_EQUAL,
			},
			{
				type: LumiaVariationConditions.GIFT_SUB_GREATER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_BITS]: {
		connection: 'twitch',
		message: '{{username}} cheered {{amount}} bits. They said {{message}}',
		eventlistMessage: '{{amount}} Bits',
		eventlistDetailedMessage: 'cheered {{amount}} bits',
		acceptedVariables: ['username', 'amount', 'message', 'full_message'],
		quickActions: [
			{
				label: '100 bits',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 10 },
			},
			{
				label: '500 bits',
				dynamic: { value: 500 },
				extraSettings: { username: 'lumiastream', amount: 10 },
			},
			{
				label: '1000 bits',
				dynamic: { value: 1000 },
				extraSettings: { username: 'lumiastream', amount: 10 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount of bits',
				dynamicField: 'value',
				variableField: 'amount',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HOST]: {
		connection: 'twitch',
		message: '{{username}} hosted with {{viewers}} viewers',
		eventlistMessage: 'Hosted',
		eventlistDetailedMessage: 'hosted with {{viewers}} viewers',
		acceptedVariables: ['username', 'viewers'],
		quickActions: [
			{
				label: '10 viewers',
				dynamic: { value: 10 },
				extraSettings: { username: 'lumiastream', viewers: 10 },
			},
			{
				label: '50 viewers',
				dynamic: { value: 50 },
				extraSettings: { username: 'lumiastream', viewers: 50 },
			},
			{
				label: '100 viewers',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', viewers: 100 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount of viewers',
				dynamicField: 'value',
				variableField: 'viewers',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_RAID]: {
		connection: 'twitch',
		message: '{{username}} raided with {{viewers}} viewers',
		eventlistMessage: 'Raided',
		eventlistDetailedMessage: 'raided with {{viewers}} viewers',
		acceptedVariables: ['username', 'viewers'],
		quickActions: [
			{
				label: '10 viewers',
				dynamic: { value: 10 },
				extraSettings: { username: 'lumiastream', viewers: 10 },
			},
			{
				label: '50 viewers',
				dynamic: { value: 50 },
				extraSettings: { username: 'lumiastream', viewers: 50 },
			},
			{
				label: '100 viewers',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', viewers: 100 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount of viewers',
				dynamicField: 'value',
				variableField: 'viewers',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: {
		connection: 'twitch',
		message: 'Hype train started',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train started',
		eventlistDetailedMessage: 'Hype train started',
		acceptedVariables: ['total', 'progress', 'goal'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: {
		connection: 'twitch',
		message: 'Hype train progressed to {{progress}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train progressed',
		eventlistDetailedMessage: 'Hype train progressed to {{progress}}',
		acceptedVariables: ['level', 'total', 'progress', 'goal'],
		quickActions: [
			{
				label: 'Progress 100',
				dynamic: { value: 100 },
				extraSettings: { level: 1, total: 100, progress: 100, goal: 4 },
			},
			{
				label: 'Progress 200',
				dynamic: { value: 200 },
				extraSettings: { level: 1, total: 200, progress: 200, goal: 4 },
			},
			{
				label: 'Progress 300',
				dynamic: { value: 300 },
				extraSettings: { level: 1, total: 300, progress: 300, goal: 4 },
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Progress',
				dynamicField: 'value',
				variableField: 'progress',
				required: false,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: {
		connection: 'twitch',
		message: 'Hype train progressed to level {{level}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train leveled up',
		eventlistDetailedMessage: 'Hype train progressed to level {{level}}',
		acceptedVariables: ['level', 'total', 'progress', 'goal'],
		quickActions: [
			{
				label: 'Level 1',
				dynamic: { value: 1 },
				extraSettings: { level: 1, total: 0, progress: 0, goal: 5 },
			},
			{
				label: 'Level 2',
				dynamic: { value: 2 },
				extraSettings: { level: 2, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 3',
				dynamic: { value: 3 },
				extraSettings: { level: 3, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 4',
				dynamic: { value: 4 },
				extraSettings: { level: 4, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 5',
				dynamic: { value: 5 },
				extraSettings: { level: 5, total: 100, progress: 100, goal: 5 },
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Level',
				dynamicField: 'value',
				variableField: 'level',
				required: false,
				default: 2,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: {
		connection: 'twitch',
		message: 'Hype train ended on level {{level}} and reached a total of {{total}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train ended',
		eventlistDetailedMessage: 'Hype train ended on level {{level}} and reached a total of {{total}}',
		acceptedVariables: ['level', 'total'],
		quickActions: [
			{
				label: 'Level 1',
				dynamic: { value: 1 },
				extraSettings: { level: 1, total: 0, progress: 0, goal: 5 },
			},
			{
				label: 'Level 2',
				dynamic: { value: 2 },
				extraSettings: { level: 2, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 3',
				dynamic: { value: 3 },
				extraSettings: { level: 3, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 4',
				dynamic: { value: 4 },
				extraSettings: { level: 4, total: 100, progress: 100, goal: 5 },
			},
			{
				label: 'Level 5',
				dynamic: { value: 5 },
				extraSettings: { level: 5, total: 100, progress: 100, goal: 5 },
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Level',
				variableField: 'level',
				dynamicField: 'value',
				required: false,
				default: 2,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_POLL_STARTED]: {
		connection: 'twitch',
		message: 'New poll started {{poll_title}} with choices {{poll_choices}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll start',
		eventlistDetailedMessage: 'Poll started {{poll_title}} with choices {{poll_choices}}',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices', 'poll_started_at', 'poll_ends_at'],
		quickActions: [
			{
				label: 'Poll Yes/No',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				dynamicField: 'value',
				variableField: 'poll_title',
				required: false,
				default: 'Is Lumia Stream the best',
			},
			{
				type: 'text',
				label: 'Choices (Comma separated)',
				variableField: 'poll_choices',
				required: false,
				default: 'Yes,No',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: {
		connection: 'twitch',
		message: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll progressed',
		eventlistDetailedMessage: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_started_at', 'poll_ends_at'],
		quickActions: [
			{
				label: 'Yes is winning',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
					poll_winning_title: 'Yes',
					poll_winning_votes: 10,
				},
			},
			{
				label: 'No is winning',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
					poll_winning_title: 'No',
					poll_winning_votes: 10,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'poll_title',
				required: false,
				default: 'Is Lumia Stream the best',
			},
			{
				type: 'text',
				label: 'Choices (Comma separated)',
				variableField: 'poll_choices',
				required: false,
				default: 'Yes,No',
			},
			{
				type: 'text',
				label: 'Winning choice',
				dynamicField: 'value',
				variableField: 'poll_winning_title',
				required: true,
				default: 'Yes',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TWITCH_POLL_ENDED]: {
		connection: 'twitch',
		message: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll ended',
		eventlistDetailedMessage: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_started_at', 'poll_ends_at'],
		quickActions: [
			{
				label: 'Yes won',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
					poll_winning_title: 'Yes',
					poll_winning_votes: 10,
				},
			},
			{
				label: 'No won',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
					poll_winning_title: 'No',
					poll_winning_votes: 10,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'poll_title',
				required: false,
				default: 'Is Lumia Stream the best',
			},
			{
				type: 'text',
				label: 'Choices (Comma separated)',
				variableField: 'poll_choices',
				required: false,
				default: 'Yes,No',
			},
			{
				type: 'text',
				label: 'Winning choice',
				dynamicField: 'value',
				variableField: 'poll_winning_title',
				required: true,
				default: 'Yes',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: {
		connection: 'twitch',
		message: 'Prediction started with the title {{prediction_title}}! Choices are {{prediction_outcome1_title}} or {{prediction_outcome2_title}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction start',
		eventlistDetailedMessage: 'Prediction started with the title {{prediction_title}}! Choices are {{prediction_outcome1_title}} or {{prediction_outcome2_title}}',
		acceptedVariables: [
			'prediction_title',
			'prediction_id',
			'prediction_outcomes',
			'prediction_outcome1_title',
			'prediction_outcome1_points',
			'prediction_outcome1_color',
			'prediction_outcome2_title',
			'prediction_outcome2_points',
			'prediction_outcome2_color',
			'prediction_started_at',
			'prediction_ends_at',
		],
		quickActions: [
			{
				label: 'Prediction Yes/No',
				dynamic: { value: 'Will Lumia Stream be my only app for stream' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					prediction_outcomes: 'Yes,No',
					prediction_outcome1_title: 'Yes',
					prediction_outcome1_points: 0,
					prediction_outcome1_color: '#ff00ff',
					prediction_outcome2_title: 'No',
					prediction_outcome2_points: 0,
					prediction_outcome2_color: '#0000ff',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				dynamicField: 'value',
				variableField: 'prediction_title',
				required: false,
				default: 'Will Lumia Stream be my only app for stream',
			},
			{
				type: 'text',
				label: 'Option 1',
				variableField: 'prediction_outcome1_title',
				required: false,
				default: 'Yes',
			},
			{
				type: 'text',
				label: 'Option 2',
				variableField: 'prediction_outcome2_title',
				required: false,
				default: 'No',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_PROGRESSED]: {
		connection: 'twitch',
		message: 'Prediction {{prediction_title}} progressed. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction progressed',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} progressed. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: [
			'prediction_title',
			'prediction_id',
			'prediction_outcomes',
			'prediction_winning_outcome_title',
			'prediction_winning_outcome_points',
			'prediction_winning_outcome_color',
			'prediction_outcome1_title',
			'prediction_outcome1_points',
			'prediction_outcome1_color',
			'prediction_outcome2_title',
			'prediction_outcome2_points',
			'prediction_outcome2_color',
			'prediction_started_at',
			'prediction_ends_at',
		],
		quickActions: [
			{
				label: 'Prediction Yes/No',
				dynamic: { value: 'Will Lumia Stream be my only app for stream' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					prediction_outcomes: 'Yes,No',
					prediction_outcome1_title: 'Yes',
					prediction_outcome1_points: 0,
					prediction_outcome1_color: '#ff00ff',
					prediction_outcome2_title: 'No',
					prediction_outcome2_points: 0,
					prediction_outcome2_color: '#0000ff',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'prediction_title',
				required: false,
				default: 'Will Lumia Stream be my only app for stream',
			},
			{
				type: 'text',
				label: 'Current Winning Option',
				dynamicField: 'value',
				variableField: 'prediction_winning_outcome_title',
				required: true,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Current Winning Option Points',
				variableField: 'prediction_winning_outcome_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 1',
				variableField: 'prediction_outcome1_title',
				required: false,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Option 1 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 2',
				variableField: 'prediction_outcome2_title',
				required: false,
				default: 'No',
			},
			{
				type: 'number',
				label: 'Option 2 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 50,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: {
		connection: 'twitch',
		message: 'Prediction {{prediction_title}} locked. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction locked',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} locked. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: [
			'prediction_title',
			'prediction_id',
			'prediction_outcomes',
			'prediction_winning_outcome_title',
			'prediction_winning_outcome_points',
			'prediction_winning_outcome_color',
			'prediction_outcome1_title',
			'prediction_outcome1_points',
			'prediction_outcome1_color',
			'prediction_outcome2_title',
			'prediction_outcome2_points',
			'prediction_outcome2_color',
			'prediction_started_at',
			'prediction_ends_at',
		],
		quickActions: [
			{
				label: 'Prediction Yes/No',
				dynamic: { value: 'Will Lumia Stream be my only app for stream' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					prediction_outcomes: 'Yes,No',
					prediction_outcome1_title: 'Yes',
					prediction_outcome1_points: 0,
					prediction_outcome1_color: '#ff00ff',
					prediction_outcome2_title: 'No',
					prediction_outcome2_points: 0,
					prediction_outcome2_color: '#0000ff',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'prediction_title',
				required: false,
				default: 'Will Lumia Stream be my only app for stream',
			},
			{
				type: 'text',
				label: 'Current Winning Option',
				dynamicField: 'value',
				variableField: 'prediction_winning_outcome_title',
				required: true,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Current Winning Option Points',
				variableField: 'prediction_winning_outcome_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 1',
				variableField: 'prediction_outcome1_title',
				required: false,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Option 1 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 2',
				variableField: 'prediction_outcome2_title',
				required: false,
				default: 'No',
			},
			{
				type: 'number',
				label: 'Option 2 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 50,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: {
		connection: 'twitch',
		message: 'Prediction {{prediction_title}} ended. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction ended',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} ended. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: [
			'prediction_title',
			'prediction_id',
			'prediction_outcomes',
			'prediction_winning_outcome_title',
			'prediction_winning_outcome_points',
			'prediction_winning_outcome_color',
			'prediction_outcome1_title',
			'prediction_outcome1_points',
			'prediction_outcome1_color',
			'prediction_outcome2_title',
			'prediction_outcome2_points',
			'prediction_outcome2_color',
			'prediction_started_at',
			'prediction_ends_at',
		],
		quickActions: [
			{
				label: 'Prediction Yes/No',
				dynamic: { value: 'Will Lumia Stream be my only app for stream' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					prediction_outcomes: 'Yes,No',
					prediction_outcome1_title: 'Yes',
					prediction_outcome1_points: 0,
					prediction_outcome1_color: '#ff00ff',
					prediction_outcome2_title: 'No',
					prediction_outcome2_points: 0,
					prediction_outcome2_color: '#0000ff',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'prediction_title',
				required: false,
				default: 'Will Lumia Stream be my only app for stream',
			},
			{
				type: 'text',
				label: 'Current Winning Option',
				dynamicField: 'value',
				variableField: 'prediction_winning_outcome_title',
				required: true,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Current Winning Option Points',
				variableField: 'prediction_winning_outcome_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 1',
				variableField: 'prediction_outcome1_title',
				required: false,
				default: 'Yes',
			},
			{
				type: 'number',
				label: 'Option 1 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 100,
			},
			{
				type: 'text',
				label: 'Option 2',
				variableField: 'prediction_outcome2_title',
				required: false,
				default: 'No',
			},
			{
				type: 'number',
				label: 'Option 2 Points',
				variableField: 'prediction_outcome1_points',
				required: false,
				default: 50,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: {
		connection: 'twitch',
		message: 'Goal {{goal_description}} started with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal start',
		eventlistDetailedMessage: 'Goal {{goal_description}} started with a target of {{goal_target_amount}}',
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_aomunt', 'goal_target_amount'],
		quickActions: [
			{
				label: '100 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_aomunt: 0,
					goal_target_amount: 100,
				},
			},
			{
				label: '100 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_aomunt: 0,
					goal_target_amount: 100,
				},
			},
			{
				label: '100 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_aomunt: 0,
					goal_target_amount: 100,
				},
			},
		],
		inputFields: [
			{
				type: 'selection',
				label: 'Goal Type',
				dynamicField: 'value',
				variableField: 'goal_type',
				required: true,
				default: 'subscription',
				selections: [
					{ label: 'follower', value: 'follower' },
					{ label: 'subscription', value: 'subscription' },
					{ label: 'New subscriptions', value: 'new_subscriptions' },
				],
			},
			{
				type: 'text',
				label: 'Goal Description',
				variableField: 'goal_description',
				required: false,
				default: '100 Subs!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				variableField: 'goal_aomunt',
				required: true,
				default: 0,
			},
			{
				type: 'number',
				label: 'Target Amount',
				variableField: 'goal_target_amount',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: {
		connection: 'twitch',
		message: 'Goal {{goal_description}} progressed to {{goal_aomunt}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal progressed',
		eventlistDetailedMessage: 'Goal {{goal_description}} progressed to {{goal_aomunt}} with a target of {{goal_target_amount}}',
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_aomunt', 'goal_target_amount'],
		quickActions: [
			{
				label: 'Gained 50 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_aomunt: 50,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Gained 50 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_aomunt: 50,
					goal_target_amount: 50,
				},
			},
			{
				label: 'Gained 50 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_aomunt: 50,
					goal_target_amount: 100,
				},
			},
		],
		inputFields: [
			{
				type: 'selection',
				label: 'Goal Type',
				variableField: 'goal_type',
				required: true,
				default: 'subscription',
				selections: [
					{ label: 'follower', value: 'follower' },
					{ label: 'subscription', value: 'subscription' },
					{ label: 'New subscriptions', value: 'new_subscriptions' },
				],
			},
			{
				type: 'text',
				label: 'Goal Description',
				variableField: 'goal_description',
				required: false,
				default: '100 Subs!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				dynamicField: 'value',
				variableField: 'goal_aomunt',
				required: true,
				default: 50,
			},
			{
				type: 'number',
				label: 'Target Amount',
				variableField: 'goal_target_amount',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.TWITCH_GOAL_ENDED]: {
		connection: 'twitch',
		message: 'Goal {{goal_description}} ended at amount {{goal_aomunt}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal ended',
		eventlistDetailedMessage: 'Goal {{goal_description}} ended at amount {{goal_aomunt}} with a target of {{goal_target_amount}}',
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_aomunt', 'goal_target_amount', 'goal_achieved', 'goal_status'],
		quickActions: [
			{
				label: 'Reached 100 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_aomunt: 100,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Reached 100 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_aomunt: 100,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Reached 100 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_aomunt: 100,
					goal_target_amount: 100,
				},
			},
		],
		inputFields: [
			{
				type: 'selection',
				label: 'Goal Type',
				variableField: 'goal_type',
				required: true,
				default: 'subscription',
				selections: [
					{ label: 'follower', value: 'follower' },
					{ label: 'subscription', value: 'subscription' },
					{ label: 'New subscriptions', value: 'new_subscriptions' },
				],
			},
			{
				type: 'text',
				label: 'Goal Description',
				variableField: 'goal_description',
				required: false,
				default: '100 Subs!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				dynamicField: 'value',
				variableField: 'goal_aomunt',
				required: true,
				default: 50,
			},
			{
				type: 'number',
				label: 'Target Amount',
				variableField: 'goal_target_amount',
				required: true,
				default: 100,
			},
			{
				type: 'check',
				label: 'Goal Achieved',
				variableField: 'goal_achieved',
				required: true,
				default: true,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.TARGET_ACHIEVED },
			{ type: LumiaVariationConditions.EQUAL_NUMBER },
			{ type: LumiaVariationConditions.GREATER_NUMBER },
		],
	},
	[LumiaAlertValues.TWITCH_CATEGORY]: {
		connection: 'twitch',
		message: 'Category changed to {{category_name}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Category {{category_name}}',
		eventlistDetailedMessage: 'Category changed to {{category_name}}',
		acceptedVariables: ['category_name', 'category_id', 'channel_title'],
		quickActions: [
			{
				label: 'Just Chatting',
				dynamic: { value: 'Just Chatting' },
				extraSettings: { category_name: 'Just Chatting' },
			},
			{
				label: 'Fortnite',
				dynamic: { value: 'Fortnite' },
				extraSettings: { category_name: 'Fortnite' },
			},
			{
				label: 'Valorant',
				dynamic: { value: 'Valorant' },
				extraSettings: { category_name: 'Valorant' },
			},
			{
				label: 'Retro',
				dynamic: { value: 'Retro' },
				extraSettings: { category_name: 'Retro' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Category Name',
				variableField: 'category_name',
				required: true,
				default: 'Retro',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_CLIP]: {
		connection: 'twitch',
		message: 'Clip taken by {{username}} with title of {{clip_title}}',
		eventlistMessage: 'Clipped {{clip_title}}',
		eventlistDetailedMessage: 'Clipped {{clip_title}}',
		acceptedVariables: ['clip_url', 'clip_id', 'clip_title', 'clip_duration', 'clip_user_is_mod', 'clip_user_is_vip', 'clip_user_is_sub', 'clip_user_is_follower'],
		quickActions: [
			{
				label: 'Lumia Clipped',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					clip_title: 'Lumia Stream',
					clip_url: 'https://www.twitch.tv/lumiastream/clip/EnchantingSuccessfulMoonBlargNaut-ev_c6MJ_Qb0o7gEx',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Clip URL',
				variableField: 'clip_url',
				required: true,
				default: 'https://www.twitch.tv/lumiastream/clip/EnchantingSuccessfulMoonBlargNaut-ev_c6MJ_Qb0o7gEx',
			},
			{
				type: 'text',
				label: 'Clip Title',
				variableField: 'clip_title',
				required: false,
				default: 'Lumia Stream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// youtube: {
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: {
		connection: 'youtube',
		message: '{{username}} just subscribed!',
		eventlistSpecialUsername: 'Youtube',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'new subscriber',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'Lumia subscribed',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_MEMBER]: {
		connection: 'youtube',
		message: '{{username}} became a member!',
		eventlistMessage: 'Member',
		eventlistDetailedMessage: 'became a member',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'Lumia became a member',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: {
		connection: 'youtube',
		message: '{{username}} just super chatted with {{amount}}. They said {{message}}',
		eventlistMessage: 'Super Chat',
		eventlistDetailedMessage: 'sent {{amount}} super chat',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER }, { type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER }],
	},
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: {
		connection: 'youtube',
		message: '{{username}} just sent a supersticker with {{amount}}',
		eventlistMessage: 'Super Sticker',
		eventlistDetailedMessage: 'sent a super sticker with {{amount}}',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', amount: 300 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	// },
	// facebook: {
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: {
		connection: 'facebook',
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_REACTION]: {
		connection: 'facebook',
		message: '{{username}} reacted with a {{reaction}}',
		eventlistMessage: '{{reaction}}',
		eventlistDetailedMessage: 'reacted with a {{reaction}}',
		acceptedVariables: ['username', 'reaction'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', amount: 300 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'selection',
				label: 'Reaction',
				dynamicField: 'value',
				variableField: 'reaction',
				required: false,
				default: 'like',
				selections: [
					{ label: 'Like', value: 'like' },
					{ label: 'Love', value: 'love' },
					{ label: 'Wow', value: 'wow' },
					{ label: 'Haha', value: 'haha' },
					{ label: 'Sad', value: 'sad' },
					{ label: 'Angry', value: 'angry' },
					{ label: 'Thankful', value: 'thankful' },
					{ label: 'Pride', value: 'pride' },
				],
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.FACEBOOK_STAR]: {
		connection: 'facebook',
		message: '{{username}} sent {{amount}} stars',
		eventlistMessage: '{{amount}} Stars',
		eventlistDetailedMessage: 'sent {{amount}} stars',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', amount: 300 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.FACEBOOK_SUPPORT]: {
		connection: 'facebook',
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a {{amount}} subscriber',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', amount: 300 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: {
		connection: 'facebook',
		message: '{{username}} sent {{amount}} gift subscriptions',
		eventlistMessage: '{{amount}} Gift Subscriptions',
		eventlistDetailedMessage: 'sent {{amount}} gift subscriptions',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', amount: 300 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.FACEBOOK_SHARE]: {
		connection: 'facebook',
		message: '{{username}} just shared your page',
		eventlistMessage: 'Shared',
		eventlistDetailedMessage: 'shared your page',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Share',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_FAN]: {
		connection: 'facebook',
		message: '{{username}} became a fan',
		eventlistMessage: 'Fan',
		eventlistDetailedMessage: 'became a fan',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Fan',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// glimesh: {
	[LumiaAlertValues.GLIMESH_FOLLOWER]: {
		connection: 'glimesh',
		message: '{{username}} just followed',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.GLIMESH_SUBSCRIBER]: {
		connection: 'glimesh',
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Subscriber',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// trovo: {
	[LumiaAlertValues.TROVO_FOLLOWER]: {
		connection: 'trovo',
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TROVO_SUBSCRIBER]: {
		connection: 'trovo',
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Subscriber',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.IS_GIFT,
			},
		],
	},
	// },
	// tiktok: {
	[LumiaAlertValues.TIKTOK_FOLLOWER]: {
		connection: 'tiktok',
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar'],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TIKTOK_LIKE]: {
		connection: 'tiktok',
		message: '{{username}} sent a like to make a total like count of {{totalLikeCount}}',
		eventlistMessage: 'Liked',
		eventlistDetailedMessage: 'sent a like to make a total like count of {{totalLikeCount}}',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount'],
		quickActions: [
			{
				label: 'New Like (Total 10)',
				dynamic: { value: 10 },
				extraSettings: { username: 'lumiastream', userLikeCount: 1, totalLikeCount: 40 },
			},
			{
				label: 'New Like (Total 50)',
				dynamic: { value: 50 },
				extraSettings: { username: 'lumiastream', userLikeCount: 1, totalLikeCount: 50 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'User Like Count',
				variableField: 'userLikeCount',
				required: false,
				default: 1,
			},
			{
				type: 'number',
				label: 'Total Like Count',
				variableField: 'totalLikeCount',
				required: false,
				default: 40,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.TIKTOK_GIFT]: {
		connection: 'tiktok',
		message: '{{username}} sent a gift {{giftAmount}}',
		eventlistMessage: '{{giftAmount}} Gift',
		eventlistDetailedMessage: 'sent a gift {{giftName}} with amount {{giftAmount}}',
		acceptedVariables: [
			'username',
			'userId',
			'profilePictureUrl',
			'describe',
			'diamondCount',
			'giftId',
			'giftName',
			'giftPictureUrl',
			'giftType',
			'isNewGifter',
			'receiverUserId',
			'repeatCount',
			'repeatEnd',
		],
		quickActions: [
			{
				label: 'Rose',
				dynamic: { value: 'Rose' },
				extraSettings: { username: 'lumiastream', giftName: 'Rose', giftType: 1, giftId: 5655, diamondCount: 1, giftPictureUrl: '' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Gift Name',
				dynamicField: 'value',
				variableField: 'giftName',
				required: false,
				default: 'Rose',
			},
			{
				type: 'number',
				label: 'Diamond Count',
				variableField: 'diamondCount',
				required: false,
				default: 1,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TIKTOK_SHARE]: {
		connection: 'tiktok',
		message: '{{username}} shared your stream',
		eventlistMessage: 'Shared',
		eventlistDetailedMessage: 'shared your stream',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar'],
		quickActions: [
			{
				label: 'New Share',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TIKTOK_STREAM_END]: {
		connection: 'tiktok',
		message: 'Tiktok stream ended',
		eventlistMessage: 'Stream ended',
		eventlistDetailedMessage: 'stream ended',
		acceptedVariables: ['eventTime'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// streamlabs: {
	[LumiaAlertValues.STREAMLABS_DONATION]: {
		connection: 'streamlabs',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_CHARITY]: {
		connection: 'streamlabs',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_MERCH]: {
		connection: 'streamlabs',
		message: '{{username}} just bought {{merch}}. They said {{message}}',
		eventlistMessage: 'Merch {{merch}}',
		eventlistDetailedMessage: 'bought {{merch}}',
		acceptedVariables: ['username', 'merch', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: { username: 'lumiastream', merch: 'shirt' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Merch',
				dynamicField: 'value',
				variableField: 'merch',
				required: true,
				default: 'shirt',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: {
		connection: 'streamlabs',
		message: '{{username}} just redeemed {{redemption}}. They said {{message}}',
		eventlistMessage: 'Redeemed {{redemption}}',
		eventlistDetailedMessage: 'redeemed {{redemption}}',
		acceptedVariables: ['username', 'redemption', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: {
					username: 'lumiastream',
					redemption: 'shirt',
					message: 'Great stream',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Redemption',
				dynamicField: 'value',
				variableField: 'redemption',
				required: true,
				default: 'shirt',
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: {
		connection: 'streamlabs',
		message: '{{username}} sent a prime gift',
		eventlistMessage: 'Prime Gift',
		eventlistDetailedMessage: 'sent a prime gift',
		acceptedVariables: ['username'],
		quickActions: [
			{
				label: 'New Prime Gift',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// streamelements: {
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: {
		connection: 'streamelements',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.STREAMELEMENTS_MERCH]: {
		connection: 'streamelements',
		message: '{{username}} just bought {{merch}}. They said {{message}}',
		eventlistMessage: 'Merch {{merch}}',
		eventlistDetailedMessage: 'bought {{merch}}',
		acceptedVariables: ['username', 'merch', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: {
		connection: 'streamelements',
		message: '{{username}} just redeemed {{redemption}}. They said {{message}}',
		eventlistMessage: 'Redemption {{redemption}}',
		eventlistDetailedMessage: 'redeemed {{redemption}}',
		acceptedVariables: ['username', 'redemption', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: {
					username: 'lumiastream',
					redemption: 'shirt',
					message: 'Great stream',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Redemption',
				dynamicField: 'value',
				variableField: 'redemption',
				required: true,
				default: 'shirt',
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// extralife: {
	[LumiaAlertValues.EXTRALIFE_DONATION]: {
		connection: 'extralife',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// donordrive: {
	[LumiaAlertValues.DONORDRIVE_DONATION]: {
		connection: 'donordrive',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// tiltify: {
	[LumiaAlertValues.TILTIFY_DONATION]: {
		connection: 'tiltify',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// patreon: {
	[LumiaAlertValues.PATREON_PLEDGE]: {
		connection: 'patreon',
		message: '{{username}} just pledged {{amount}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// woocommerce: {
	[LumiaAlertValues.WOOCOMMERCE_ORDER]: {
		connection: 'woocommerce',
		message: 'Someone just ordered {{item}} in the amount of {{amount}}',
		eventlistMessage: 'Order {{item}}',
		eventlistDetailedMessage: 'ordered {{item}} in the amount of {{amount}}',
		acceptedVariables: ['item', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Item',
				variableField: 'item',
				required: false,
				default: 'Shirt',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// kofi: {
	[LumiaAlertValues.KOFI_DONATION]: {
		connection: 'kofi',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation {{amount}} {{currency}}',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.KOFI_SUBSCRIPTION]: {
		connection: 'kofi',
		message: '{{username}} just subscribed with tier {{tier}}',
		eventlistMessage: 'Subscription',
		eventlistDetailedMessage: 'subscribed with tier {{tier}}',
		acceptedVariables: ['username', 'currency', 'amount', 'tier'],
		quickActions: [
			{
				label: 'Tier 1',
				dynamic: { value: 'Tier 1' },
				extraSettings: {
					username: 'lumiastream',
					tier: 'Tier 1',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: 'Tier 2',
				dynamic: { value: 'Tier 2' },
				extraSettings: {
					username: 'lumiastream',
					tier: 'Tier 2',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: 'Tier 3',
				dynamic: { value: 'Tier 3' },
				extraSettings: {
					username: 'lumiastream',
					tier: 'Tier 3',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Tier',
				dynamicField: 'tier',
				variableField: 'tier',
				required: false,
				default: 'Tier 1',
			},
			{
				type: 'number',
				label: 'Amount',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.KOFI_COMMISSION]: {
		connection: 'kofi',
		message: '{{username}} just commisioned with amount {{amount}}',
		eventlistMessage: 'Commission',
		eventlistDetailedMessage: 'commissioned with amount {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.KOFI_SHOPORDER]: {
		connection: 'kofi',
		message: '{{username}} just created a shop order with amount {{amount}}',
		eventlistMessage: 'Shop Order',
		eventlistDetailedMessage: 'created a shop order with amount {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// twitter: {
	[LumiaAlertValues.TWITTER_FOLLOWER]: {
		connection: 'twitter',
		message: 'Received a new Twitter follower. Follower count is now {{followers}}',
		eventlistSpecialUsername: 'Twitter',
		eventlistMessage: 'Follower',
		eventlistDetailedMessage: 'new folower with total count of {{followers}}',
		acceptedVariables: ['followers'],
		quickActions: [
			{
				label: 'New Follower',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', followers: 100 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Follower Count',
				variableField: 'followers',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITTER_LIKE]: {
		connection: 'twitter',
		message: 'Reached a total likes of {{likes}} on Twitter',
		eventlistSpecialUsername: 'Twitter',
		eventlistMessage: 'Like',
		eventlistDetailedMessage: 'new like with total count of {{likes}}',
		acceptedVariables: ['likes'],
		quickActions: [
			{
				label: 'New Like',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', likes: 100 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Likes Count',
				variableField: 'likes',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITTER_RETWEET]: {
		connection: 'twitter',
		message: 'Reached {{retweets}}',
		eventlistSpecialUsername: 'Twitter',
		eventlistMessage: 'Retweet',
		eventlistDetailedMessage: 'reached {{retweets}} retweets',
		acceptedVariables: ['retweets'],
		quickActions: [
			{
				label: 'New Retweet',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', retweets: 100 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Retweet Count',
				variableField: 'retweets',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	// },
	// spotify: {
	[LumiaAlertValues.SPOTIFY_SWITCH_SONG]: {
		connection: 'spotify',
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{name}}',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song changed',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.SPOTIFY_SONG_PLAYED]: {
		connection: 'spotify',
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} playing',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song played',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.SPOTIFY_SONG_PAUSED]: {
		connection: 'spotify',
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'song {{name}} paused',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song paused',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// vlc: {
	[LumiaAlertValues.VLC_SWITCH_SONG]: {
		connection: 'vlc',
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Switched',
		eventlistDetailedMessage: 'song switched to {{name}}',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song changed',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.VLC_SONG_PLAYED]: {
		connection: 'vlc',
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} playing',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song played',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.VLC_SONG_PAUSED]: {
		connection: 'vlc',
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'song {{name}} paused',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song paused',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'URI',
				variableField: 'uri',
				required: false,
				default: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://i.scdn.co/image/ab67616d00001e0236ebefef88d1990f6f4d62ef',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// treatstream: {
	[LumiaAlertValues.TREATSTREAM_TREAT]: {
		connection: 'treatstream',
		message: '{{username}} sent {{treat}}',
		eventlistMessage: 'Treat',
		eventlistDetailedMessage: 'sent {{treat}} treat',
		acceptedVariables: ['username', 'treat'],
		quickActions: [
			{
				label: 'Lumia Treats',
				dynamic: { value: 'Lumia Treats' },
				extraSettings: { treat: 'Lumia Treats' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Treat',
				dynamicField: 'value',
				variableField: 'treats',
				required: true,
				default: 'Lumia Treats',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// tipeeestream: {
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: {
		connection: 'tipeeestream',
		message: '{{username}} just donated {{amount}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'number',
				label: 'Amount',
				dynamicField: 'value',
				variableField: 'amount',
				required: false,
				default: 100,
			},
			{
				type: 'currency',
				label: 'Currency',
				dynamicField: 'currency',
				variableField: 'currency',
				required: false,
				default: LumiaVariationCurrency.USD,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	// },
	// obs: {
	[LumiaAlertValues.OBS_SWITCH_SCENE]: {
		connection: 'obs',
		message: 'OBS scene switched to {{scene}}',
		acceptedVariables: ['scene'],
		quickActions: [
			{
				label: 'Scene Change',
				dynamic: { value: 'Lumia Scene' },
				extraSettings: { item: 'Lumia Scene' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'scene',
				required: true,
				default: 'Lumia Scene',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: {
		connection: 'obs',
		message: 'OBS scene item {{item}} became visibile',
		acceptedVariables: ['item'],
		quickActions: [
			{
				label: 'Scene Visible',
				dynamic: { value: 'Lumia Scene' },
				extraSettings: { item: 'Lumia Scene' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'item',
				required: true,
				default: 'Lumia Scene',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN]: {
		connection: 'obs',
		message: 'OBS scene item {{item}} became hidden',
		acceptedVariables: ['item'],
		quickActions: [
			{
				label: 'Scene Hidden',
				dynamic: { value: 'Lumia Scene' },
				extraSettings: { item: 'Lumia Scene' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'item',
				required: true,
				default: 'Lumia Scene',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.OBS_SWITCH_PROFILE]: {
		connection: 'obs',
		message: 'OBS profile switched to {{profile}}',
		acceptedVariables: ['profile'],
		quickActions: [
			{
				label: 'Profile Change',
				dynamic: { value: 'Lumia Profile' },
				extraSettings: { profile: 'Lumia Profile' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'profile',
				required: true,
				default: 'Lumia Profile',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.OBS_SWITCH_TRANSITION]: {
		connection: 'obs',
		message: 'OBS transition switched',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_TRANSITION_BEGIN]: {
		connection: 'obs',
		message: 'OBS transition started',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_TRANSITION_END]: {
		connection: 'obs',
		message: 'OBS transition ended',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_STREAM_STARTING]: {
		connection: 'obs',
		message: 'OBS stream started',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_STREAM_STOPPING]: {
		connection: 'obs',
		message: 'OBS stream stopped',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// slobs: {
	[LumiaAlertValues.SLOBS_SWITCH_SCENE]: {
		connection: 'slobs',
		message: 'SLOBS scene switched to {{scene}}',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: {
		connection: 'slobs',
		message: 'SLOBS scene collection switched',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: {
		connection: 'slobs',
		message: 'SLOBS scene item {{item}} became visibile',
		acceptedVariables: ['item'],
		quickActions: [
			{
				label: 'Scene Visible',
				dynamic: { value: 'Lumia Scene' },
				extraSettings: { item: 'Lumia Scene' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'item',
				required: true,
				default: 'Lumia Scene',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN]: {
		connection: 'slobs',
		message: 'SLOBS scene item {{item}} became hidden',
		acceptedVariables: ['item'],
		quickActions: [
			{
				label: 'Scene Hidden',
				dynamic: { value: 'Lumia Scene' },
				extraSettings: { item: 'Lumia Scene' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Scene',
				dynamicField: 'value',
				variableField: 'item',
				required: true,
				default: 'Lumia Scene',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.STREAMERBOT_ACTION]: {
		connection: 'streamerbot',
		message: '{{action}} action triggered',
		acceptedVariables: ['action', 'actionId'],
		quickActions: [
			{
				label: 'Lumia Action',
				dynamic: { value: 'Lumia Action' },
				extraSettings: { action: 'Lumia Action', actionId: 'lumia' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Action',
				dynamicField: 'value',
				variableField: 'action',
				required: true,
				default: 'Lumia Action',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.PULSE_HEARTRATE]: {
		connection: 'pulse',
		message: 'Heart rate changed to {{heartrate}}',
		acceptedVariables: ['heartrate', 'min_heartrate', 'max_heartrate'],
		quickActions: [
			{
				label: 'Heart Rate 100',
				dynamic: { value: 100 },
				extraSettings: { heartrate: 100 },
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Heart rate',
				dynamicField: 'value',
				variableField: 'heartrate',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
};
