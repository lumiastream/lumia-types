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
	EQUAL_USER_LEVEL = 'EQUAL_USER_LEVEL',

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

export enum LumiaRedemptionCurrency {
	NONE = '',
	BITS = 'bits',
	POINTS = 'points',
	LUMIBUCKS = 'lumibucks',
}

export const LumiaRedemptionCurrencySymbol = {
	[LumiaRedemptionCurrency.NONE]: '',
	[LumiaRedemptionCurrency.BITS]: '♦',
	[LumiaRedemptionCurrency.POINTS]: '★',
	[LumiaRedemptionCurrency.LUMIBUCKS]: '⚡',
};

export interface LumiaDynamicCondition {
	value: number | string;
	name?: string;
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
			extraSettings?: Record<string, string | number | boolean>;
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
	// lumia: {
	[LumiaAlertValues.LUMIASTREAM_DONATION]: {
		connection: 'lumiastream',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'avatar', 'sender_social_link', 'currency', 'amount', 'message', 'anonymous', 'command'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					sender_social_link: 'https://twitch.tv/lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
					anonymous: false,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					sender_social_link: 'https://twitch.tv/lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
					anonymous: false,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					sender_social_link: 'https://twitch.tv/lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
					anonymous: false,
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
	[LumiaAlertValues.SYSTEM_LUMIA_OPENED]: {
		connection: 'lumiastream',
		message: 'Lumia opened',
		acceptedVariables: ['date'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SYSTEM_LUMIA_CLOSED]: {
		connection: 'lumiastream',
		message: 'Lumia closed',
		acceptedVariables: ['date'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SYSTEM_STREAMMODE_ON]: {
		connection: 'lumiastream',
		message: 'stream mode on',
		acceptedVariables: ['date'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SYSTEM_STREAMMODE_OFF]: {
		connection: 'lumiastream',
		message: 'stream mode off',
		acceptedVariables: ['date'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.RAFFLE_START]: {
		connection: 'lumiastream',
		message: '{{raffle_title}} started! Type {{raffle_entry_command}} to enter',
		eventlistMessage: 'Raffle Start',
		eventlistDetailedMessage: '{{raffle_title}} started! Type {{raffle_entry_command}} to enter',
		acceptedVariables: ['raffle_title', 'description', 'type', 'raffle_entry_command'],
		quickActions: [
			{
				label: 'My bright raffle',
				dynamic: { value: 'My bright raffle' },
				extraSettings: {
					title: 'My bright raffle',
					description: 'Raffle only for the brightest streamers',
					type: 'userList',
					raffle_entry_command: '!join',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'raffle_title',
				required: false,
				default: '',
			},
			{
				type: 'text',
				label: 'Description',
				variableField: 'description',
				required: false,
				default: '',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.RAFFLE_STOP]: {
		connection: 'lumiastream',
		message: '{{raffle_title}} has stopped! Winners will be drawn soon',
		eventlistMessage: 'Raffle Stop',
		eventlistDetailedMessage: '{{raffle_title}} has stopped! Winners will be drawn soon',
		acceptedVariables: ['raffle_title', 'description', 'type', 'raffle_entry_command', 'duration'],
		quickActions: [
			{
				label: 'My bright raffle',
				dynamic: { value: 'My bright raffle' },
				extraSettings: {
					title: 'My bright raffle',
					description: 'Raffle only for the brightest streamers',
					type: 'userList',
					raffle_entry_command: '!join',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'raffle_title',
				required: false,
				default: '',
			},
			{
				type: 'text',
				label: 'Description',
				variableField: 'description',
				required: false,
				default: '',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.RAFFLE_WINNER]: {
		connection: 'lumiastream',
		message: 'Congratulations {{raffle_winner}} for being selected in this raffle!',
		eventlistMessage: 'Raffle Stop',
		eventlistDetailedMessage: 'Congratulations {{raffle_winner}} for being selected in this raffle!',
		acceptedVariables: ['raffle_title', 'description', 'type', 'raffle_winner', 'raffle_winner_avatar', 'raffle_winners', 'raffle_entry_command', 'duration'],
		quickActions: [
			{
				label: 'My bright raffle',
				dynamic: { value: 'My bright raffle' },
				extraSettings: {
					title: 'My bright raffle',
					description: 'Raffle only for the brightest streamers',
					type: 'userList',
					raffle_entry_command: '!join',
					raffle_winner: 'lumiastream',
					raffle_winners: 'lumiastream,lumiacove,lumiatwitch',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				variableField: 'raffle_title',
				required: false,
				default: '',
			},
			{
				type: 'text',
				label: 'Description',
				variableField: 'description',
				required: false,
				default: '',
			},
			{
				type: 'text',
				label: 'Winner',
				variableField: 'winner',
				required: true,
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
	[LumiaAlertValues.SPINWHEEL_WINNER]: {
		connection: 'lumiastream',
		message: 'Congratulations {{spinwheel_winner}} for winning {{spinwheel_item}}!',
		eventlistMessage: 'Raffle Stop',
		eventlistDetailedMessage: 'Congratulations {{spinwheel_winner}} for winning {{spinwheel_item}}!',
		acceptedVariables: ['spinwheel_winner', 'spinwheel_item', 'spinwheel_item_id', 'spinwheel_item_image', 'spinwheel_item_quantity_remaining', 'spinwheel_item_quantity_initial'],
		quickActions: [
			{
				label: 'Light Bulbs',
				dynamic: { value: 'Light Bulbs' },
				extraSettings: {
					spinwheel_winner: 'Lumia Stream',
					spinwheel_item: 'Light Bulbs',
					spinwheel_item_id: '123',
					spinwheel_item_image: 'https://storage.lumiastream.com/overlays/2/946e20c5-35da-44f6-94cb-fe833c71d10b.gif',
					spinwheel_item_quantity_remaining: 2,
					spinwheel_item_quantity_initial: 4,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Item',
				variableField: 'spinwheel_item',
				required: true,
				default: '',
			},
			{
				type: 'text',
				label: 'Winner',
				variableField: 'spinwheel_winner',
				required: true,
				default: '',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.POLL_STARTED]: {
		connection: 'lumiastream',
		message: 'New poll started {{poll_title}} with choices {{poll_choices}}',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll start',
		eventlistDetailedMessage: 'Poll started {{poll_title}} with choices {{poll_choices}}',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices'],
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
	[LumiaAlertValues.POLL_PROGRESSED]: {
		connection: 'lumiastream',
		message: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll progressed',
		eventlistDetailedMessage: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
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
	[LumiaAlertValues.POLL_ENDED]: {
		connection: 'lumiastream',
		message: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll ended',
		eventlistDetailedMessage: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		acceptedVariables: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
		quickActions: [
			{
				label: 'Yes won',
				dynamic: { value: 'Is Lumia Stream the best' },
				extraSettings: {
					poll_title: 'Is Lumia Stream the best',
					poll_choices: 'Yes,No',
					poll_winning_title: 'Yes',
					poll_winning_votes: 10,
					poll_total_votes: 14,
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
					poll_total_votes: 15,
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
	// twitch: {
	[LumiaAlertValues.TWITCH_EXTENSION]: {
		connection: 'twitch',
		message: '{{username}} redeemed {{command}} for {{amount}} bits',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{command}} for {{amount}} bits',
		acceptedVariables: ['username', 'displayname', 'message', 'avatar', 'command', 'amount', 'currencySymbol', 'currency'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
		quickActions: [
			{
				label: 'Redeemed for 100 bits',
				dynamic: { name: 'lumibeam', value: '100', currency: LumiaRedemptionCurrency.BITS },
				extraSettings: {
					command: 'lumibeam',
					message: 'pew pew',
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					amount: '100',
					currency: LumiaRedemptionCurrency.BITS,
					currencySymbol: LumiaRedemptionCurrencySymbol.bits,
				},
			},
			{
				label: 'Redeemed for 2000 bits',
				dynamic: { name: 'lumibeam', value: '2000', currency: LumiaRedemptionCurrency.BITS },
				extraSettings: {
					command: 'lumibeam',
					message: 'pew pew',
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					amount: '2000',
					currency: LumiaRedemptionCurrency.BITS,
					currencySymbol: LumiaRedemptionCurrencySymbol.bits,
				},
			},
			{
				label: 'Redeemed for 10000 bits',
				dynamic: { name: 'lumibeam', value: '10000', currency: LumiaRedemptionCurrency.BITS },
				extraSettings: {
					command: 'lumibeam',
					message: 'pew pew',
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					amount: '10000',
					currency: LumiaRedemptionCurrency.BITS,
					currencySymbol: LumiaRedemptionCurrencySymbol.bits,
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
				label: 'Command',
				dynamicField: 'value',
				variableField: 'command',
				required: true,
				default: 'lumibeam',
			},
			{
				type: 'text',
				label: 'Amount',
				dynamicField: 'amount',
				variableField: 'amount',
				required: true,
				default: '100',
			},
		],
	},
	[LumiaAlertValues.TWITCH_POINTS]: {
		connection: 'twitch',
		message: '{{username}} redeemed {{command}} for {{amount}} points',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{command}} for {{amount}} points',
		acceptedVariables: ['username', 'displayname', 'message', 'avatar', 'command', 'amount', 'currencySymbol', 'currency'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
		quickActions: [
			{
				label: 'Redeemed for 100 points',
				dynamic: { name: 'lumiray', value: '100', currency: LumiaRedemptionCurrency.POINTS },
				extraSettings: {
					command: 'lumiray',
					message: 'ray ray',
					username: 'lumiastream',
					displayname: 'LumiaStream',
					amount: '100',
					currency: LumiaRedemptionCurrency.POINTS,
					currencySymbol: LumiaRedemptionCurrencySymbol.points,
				},
			},
			{
				label: 'Redeemed for 2000 points',
				dynamic: { name: 'lumiray', value: '2000', currency: LumiaRedemptionCurrency.POINTS },
				extraSettings: {
					command: 'lumiray',
					message: 'ray ray',
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					amount: '2000',
					currency: LumiaRedemptionCurrency.POINTS,
					currencySymbol: LumiaRedemptionCurrencySymbol.points,
				},
			},
			{
				label: 'Redeemed for 10000 points',
				dynamic: { name: 'lumiray', value: '10000', currency: LumiaRedemptionCurrency.POINTS },
				extraSettings: {
					command: 'lumiray',
					message: 'ray ray',
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					amount: '10000',
					currency: LumiaRedemptionCurrency.POINTS,
					currencySymbol: LumiaRedemptionCurrencySymbol.points,
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
				label: 'Command',
				dynamicField: 'value',
				variableField: 'command',
				required: true,
				default: 'lumibeam',
			},
			{
				type: 'text',
				label: 'Amount',
				dynamicField: 'amount',
				variableField: 'amount',
				required: true,
				default: '100',
			},
		],
	},
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
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: {
		connection: 'twitch',
		message: '{{username}} is the first chatter and has been first {{first_count}} times!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.TWITCH_ENTRANCE]: {
		connection: 'twitch',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TWITCH_FOLLOWER]: {
		connection: 'twitch',
		message: '{{username}} is now following!',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: ['username', 'avatar'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
		quickActions: [
			{
				label: 'New Follow',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png' },
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
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username', 'avatar', 'tier', 'giftAmount', 'totalGifts', 'gifter', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
		quickActions: [
			{
				label: 'Tier 1 Sub',
				dynamic: { value: 1000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
					gifter: 'lumiastream',
					message: 'Great Stream',
					username: 'worldlights',
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: {
		connection: 'twitch',
		message: '{{gifter}} gifted {{giftAmount}} subs!',
		eventlistMessage: 'Gifted subscription',
		eventlistDetailedMessage: 'gifted {{recipient}} a subscription',
		acceptedVariables: ['username', 'avatar', 'tier', 'giftAmount', 'totalGifts', 'gifter', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
		quickActions: [
			{
				label: 'Gift 1 Sub',
				dynamic: { value: 1000, giftAmount: 1, isGift: true },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipient: 'worldlights',
					giftAmount: 1,
					totalGifts: 1,
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
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
				label: 'Gift 10 Subs',
				dynamic: { value: 1000, giftAmount: 10, isGift: true },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipient: 'worldlights',
					giftAmount: 10,
					totalGifts: 10,
					tier: 1000,
					subMonths: 1,
					subPlan: 1000,
					subPlanName: 'Tier 1',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Gifter',
				variableField: 'gifter',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Username',
				variableField: 'username',
				required: false,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Gift Recipient',
				variableField: 'recipient',
				required: true,
				default: 'worldlights',
			},
			{
				type: 'number',
				label: 'Gift amount',
				dynamicField: 'giftAmount',
				variableField: 'giftAmount',
				required: true,
				default: 1,
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
		eventlistMessage: 'Bits',
		eventlistDetailedMessage: 'cheered {{amount}} bits',
		acceptedVariables: ['username', 'avatar', 'amount', 'message', 'rawMessage', 'full_message'],
		quickActions: [
			{
				label: '100 bits',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '500 bits',
				dynamic: { value: 500 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 500 },
			},
			{
				label: '1000 bits',
				dynamic: { value: 1000 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 1000 },
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
	[LumiaAlertValues.TWITCH_RAID]: {
		connection: 'twitch',
		message: '{{username}} raided with {{viewers}} viewers',
		eventlistMessage: 'Raided',
		eventlistDetailedMessage: 'raided with {{viewers}} viewers',
		acceptedVariables: ['username', 'avatar', 'viewers'],
		quickActions: [
			{
				label: '10 viewers',
				dynamic: { value: 10 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 10 },
			},
			{
				label: '50 viewers',
				dynamic: { value: 50 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 50 },
			},
			{
				label: '100 viewers',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 100 },
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
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount'],
		quickActions: [
			{
				label: '100 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_amount: 0,
					goal_target_amount: 100,
				},
			},
			{
				label: '100 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_amount: 0,
					goal_target_amount: 100,
				},
			},
			{
				label: '100 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_amount: 0,
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
				variableField: 'goal_amount',
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
		message: 'Goal {{goal_description}} progressed to {{goal_amount}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal progressed',
		eventlistDetailedMessage: 'Goal {{goal_description}} progressed to {{goal_amount}} with a target of {{goal_target_amount}}',
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount'],
		quickActions: [
			{
				label: 'Gained 50 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_amount: 50,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Gained 50 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_amount: 50,
					goal_target_amount: 50,
				},
			},
			{
				label: 'Gained 50 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_amount: 50,
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
				variableField: 'goal_amount',
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
		message: 'Goal {{goal_description}} ended at amount {{goal_amount}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal ended',
		eventlistDetailedMessage: 'Goal {{goal_description}} ended at amount {{goal_amount}} with a target of {{goal_target_amount}}',
		acceptedVariables: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount', 'goal_achieved', 'goal_status'],
		quickActions: [
			{
				label: 'Reached 100 Followers',
				dynamic: { value: 'follower' },
				extraSettings: {
					goal_type: 'follower',
					goal_description: '100 Followers!',
					goal_amount: 100,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Reached 100 Subs',
				dynamic: { value: 'subscription' },
				extraSettings: {
					goal_type: 'subscription',
					goal_description: '100 Subs!',
					goal_amount: 100,
					goal_target_amount: 100,
				},
			},
			{
				label: 'Reached 100 New Subs',
				dynamic: { value: 'new_subscriptions' },
				extraSettings: {
					goal_type: 'new_subscriptions',
					goal_description: '100 New Subs!',
					goal_amount: 100,
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
				variableField: 'goal_amount',
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
	[LumiaAlertValues.TWITCH_CHARITY_DONATION]: {
		connection: 'streamlabs',
		message: '{{username}} just donated {{amount}} to charity {{charity_name}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['userId', 'username', 'displayname', 'amount', 'currency', 'charity_name', 'charity_description', 'charity_logo', 'charity_website'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
					charity_id: 'lumia123',
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_website: 'https://lumiastream.com',
					started_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
					charity_id: 'lumia123',
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_website: 'https://lumiastream.com',
					started_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 300,
					currency: LumiaVariationCurrency.USD,
					charity_id: 'lumia123',
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_website: 'https://lumiastream.com',
					started_at: '2022-07-26T17:00:03.17106713Z',
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
				label: 'Charity Name',
				variableField: 'charity_name',
				required: false,
				default: 'My Charity',
			},
			{
				type: 'text',
				label: 'Charity Description',
				variableField: 'charity_description',
				required: false,
				default: '100 dollars!',
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
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED]: {
		connection: 'twitch',
		message: 'Charity campaign {{charity_name}} started with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign start',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} started with a target of {{charity_target_amount}}',
		acceptedVariables: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'started_at'],
		quickActions: [
			{
				label: 'Charity Started',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					charity_id: 'lumia123',
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_amount: 0,
					charity_target_amount: 100,
					charity_website: 'https://lumiastream.com',
					currency: LumiaVariationCurrency.USD,
					started_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Charity Name',
				variableField: 'charity_name',
				required: true,
				default: 'My Charity',
			},
			{
				type: 'text',
				label: 'Charity Description',
				variableField: 'charity_description',
				required: false,
				default: '100 dollars!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				variableField: 'goal_amount',
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
			{
				type: 'text',
				label: 'Currency',
				variableField: 'currency',
				required: true,
				default: 'usd',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_PROGRESSED]: {
		connection: 'twitch',
		message: 'Charity campaign {{charity_name}} progressed to {{charity_amount}} with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign progressed',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} progressed to {{charity_amount}} with a target of {{charity_target_amount}}',
		acceptedVariables: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency'],
		quickActions: [
			{
				label: 'Charity Started',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_amount: 20,
					charity_target_amount: 100,
					charity_website: 'https://lumiastream.com',
					currency: LumiaVariationCurrency.USD,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Charity Name',
				variableField: 'charity_name',
				required: true,
				default: 'My Charity',
			},
			{
				type: 'text',
				label: 'Charity Description',
				variableField: 'charity_description',
				required: false,
				default: '100 dollars!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				variableField: 'charity_amount',
				required: true,
				default: 20,
			},
			{
				type: 'number',
				label: 'Target Amount',
				variableField: 'charity_target_amount',
				required: true,
				default: 100,
			},
			{
				type: 'text',
				label: 'Currency',
				variableField: 'currency',
				required: true,
				default: 'usd',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STOPPED]: {
		connection: 'twitch',
		message: 'Charity campaign {{charity_name}} ended at amount {{charity_amount}} with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign ended',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} ended at amount {{charity_amount}} with a target of {{charity_target_amount}}',
		acceptedVariables: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'ended_at'],
		quickActions: [
			{
				label: 'Charity Target Achieved',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					charity_name: 'Lumia Charity',
					charity_description: 'Give me more lights',
					charity_logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					charity_amount: 100,
					charity_target_amount: 100,
					charity_website: 'https://lumiastream.com',
					currency: LumiaVariationCurrency.USD,
					ended_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Charity Name',
				variableField: 'charity_name',
				required: true,
				default: 'My Charity',
			},
			{
				type: 'text',
				label: 'Charity Description',
				variableField: 'charity_description',
				required: false,
				default: '100 dollars!',
			},
			{
				type: 'number',
				label: 'Current Amount',
				variableField: 'charity_amount',
				required: true,
				default: 20,
			},
			{
				type: 'number',
				label: 'Target Amount',
				variableField: 'charity_target_amount',
				required: true,
				default: 100,
			},
			{
				type: 'text',
				label: 'Currency',
				variableField: 'currency',
				required: true,
				default: 'usd',
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
		eventlistMessage: 'Clipped',
		eventlistDetailedMessage: 'created a clip',
		acceptedVariables: [
			'username',
			'avatar',
			'displayname',
			'userId',
			'clip_url',
			'clip_id',
			'clip_title',
			'clip_duration',
			'clip_user_is_mod',
			'clip_user_is_vip',
			'clip_user_is_sub',
			'clip_user_is_follower',
		],
		quickActions: [
			{
				label: 'Lumia Clipped',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
	[LumiaAlertValues.TWITCH_CHANNEL_JOIN]: {
		connection: 'twitch',
		message: '{{username}} just joined the channel',
		eventlistMessage: 'Join',
		eventlistDetailedMessage: 'joined the channel',
		acceptedVariables: ['username', 'avatar'],
		quickActions: [
			{
				label: 'New Join',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_CHANNEL_LEAVE]: {
		connection: 'twitch',
		message: '{{username}} just left the channel',
		eventlistMessage: 'Left',
		eventlistDetailedMessage: 'left the channel',
		acceptedVariables: ['username', 'avatar'],
		quickActions: [
			{
				label: 'New Leave',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_BANNED]: {
		connection: 'twitch',
		message: '{{username}} is banned',
		eventlistMessage: 'Banned',
		eventlistDetailedMessage: 'banned',
		acceptedVariables: ['username', 'userId', 'avatar', 'reason'],
		quickActions: [
			{
				label: 'Banned',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					reason: 'For being too bright',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Reason',
				variableField: 'reason',
				required: false,
				default: 'Too bright',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_TIMEOUT]: {
		connection: 'twitch',
		message: '{{username}} is timed out',
		eventlistMessage: 'Timeout',
		eventlistDetailedMessage: 'timed out',
		acceptedVariables: ['username', 'userId', 'avatar', 'timeout_duration', 'expiration_ms', 'reason'],
		quickActions: [
			{
				label: 'Timed Out',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					timeout_duration: 30,
					reason: 'For being too bright',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Reason',
				variableField: 'reason',
				required: false,
				default: 'Too bright',
			},
			{
				type: 'text',
				label: 'Duration',
				variableField: 'timeout_duration',
				required: false,
				default: '30',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_TIMEOUT_OVER]: {
		connection: 'twitch',
		message: "{{username}}'s timeout of {{duration}} seconds is over",
		eventlistMessage: 'Timeout Over',
		eventlistDetailedMessage: 'time out over',
		acceptedVariables: ['username', 'userId', 'avatar', 'timeout_duration', 'expiration_ms', 'reason'],
		quickActions: [
			{
				label: 'Time Out Over',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					timeout_duration: 30,
					reason: 'For being too bright',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Reason',
				variableField: 'reason',
				required: false,
				default: 'Too bright',
			},
			{
				type: 'text',
				label: 'Duration',
				variableField: 'timeout_duration',
				required: false,
				default: '30',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: {
		connection: 'twitch',
		message: '{{username}} sent you a shoutout',
		eventlistMessage: 'Shoutout',
		eventlistDetailedMessage: 'shoutout',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar', 'viewer_count', 'started_at'],
		quickActions: [
			{
				label: 'Shoutout Receive',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					displayname: 'LumiaStream',
					userId: '1234',
					viewer_count: 100,
					started_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Username',
				dynamicField: 'value',
				variableField: 'username',
				required: true,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING }],
	},
	// youtube: {
	[LumiaAlertValues.YOUTUBE_STREAM_LIVE]: {
		connection: 'youtube',
		message: 'YouTube Stream is now live',
		acceptedVariables: ['eventTime'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_STREAM_OFFLINE]: {
		connection: 'youtube',
		message: 'YouTube Stream is offline',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_FIRST_CHATTER]: {
		connection: 'youtube',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'userId', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.YOUTUBE_ENTRANCE]: {
		connection: 'youtube',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'userId', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: {
		connection: 'youtube',
		message: '{{username}} just subscribed!',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username', 'avatar', 'userId'],
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
		acceptedVariables: ['username', 'avatar', 'userId'],
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
		eventlistDetailedMessage: 'sent {{amount}} for a super chat',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistDetailedMessage: 'sent a super sticker for {{amount}}',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 300 },
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
	[LumiaAlertValues.FACEBOOK_STREAM_LIVE]: {
		connection: 'facebook',
		message: 'Facebook Stream is now live',
		acceptedVariables: ['eventTime'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_STREAM_OFFLINE]: {
		connection: 'facebook',
		message: 'Facebook Stream is offline',
		acceptedVariables: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_FIRST_CHATTER]: {
		connection: 'facebook',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'first_count', 'message'],
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
	[LumiaAlertValues.FACEBOOK_ENTRANCE]: {
		connection: 'facebook',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
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
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 300 },
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
		eventlistMessage: 'Stars',
		eventlistDetailedMessage: 'sent {{amount}} stars',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 300 },
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
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 300 },
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
		eventlistMessage: 'Gift Subscription',
		eventlistDetailedMessage: 'sent {{amount}} gift subscriptions',
		acceptedVariables: ['username', 'amount'],
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 100 },
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 200 },
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 300 },
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
	// trovo: {
	[LumiaAlertValues.TROVO_FIRST_CHATTER]: {
		connection: 'trovo',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'displayname', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.TROVO_ENTRANCE]: {
		connection: 'trovo',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'displayname', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.TROVO_CHANNEL_JOIN]: {
		connection: 'trovo',
		message: '{{username}} just joined the channel',
		eventlistMessage: 'Join',
		eventlistDetailedMessage: 'joined the channel',
		acceptedVariables: ['username', 'displayname', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
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
		acceptedVariables: ['username', 'displayname', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
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
	[LumiaAlertValues.TROVO_GIFT_SUBSCRIPTION]: {
		connection: 'trovo',
		message: '{{gifter}} sent {{amount}} gift subscriptions',
		eventlistMessage: 'Gift Subscriptions',
		eventlistDetailedMessage: 'sent {{amount}} gift subscriptions',
		acceptedVariables: ['username', 'displayname', 'gifter', 'recipient', 'value', 'subPlan', 'message', 'giftAmount', 'totalGifts', 'subMonths', 'sub_tier', 'sub_level', 'roles', 'medals'],
		quickActions: [
			{
				label: '1 gift',
				dynamic: { value: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					amount: 1,
				},
			},
			{
				label: '5 gifts',
				dynamic: { value: 5 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 5 },
			},
			{
				label: '20 gifts',
				dynamic: { value: 20 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 20 },
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
				label: 'Gifter',
				variableField: 'gifter',
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
	[LumiaAlertValues.TROVO_RAID]: {
		connection: 'trovo',
		message: '{{username}} raided with {{viewers}} viewers',
		eventlistMessage: 'Raided',
		eventlistDetailedMessage: 'raided with {{viewers}} viewers',
		acceptedVariables: ['username', 'viewers', 'displayname', 'viewers', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
		quickActions: [
			{
				label: '10 viewers',
				dynamic: { value: 10 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 10 },
			},
			{
				label: '50 viewers',
				dynamic: { value: 50 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 50 },
			},
			{
				label: '100 viewers',
				dynamic: { value: 100 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', viewers: 100 },
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
	// },
	// tiktok: {
	[LumiaAlertValues.TIKTOK_FIRST_CHATTER]: {
		connection: 'tiktok',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'displayname', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.TIKTOK_ENTRANCE]: {
		connection: 'tiktok',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'displayname', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
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
		eventlistDetailedMessage: 'sent a like',
		acceptedVariables: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount'],
		quickActions: [
			{
				label: 'New Like (Total 10)',
				dynamic: { value: 10 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 1,
					totalLikeCount: 40,
				},
			},
			{
				label: 'New Like (Total 50)',
				dynamic: { value: 50 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 1,
					totalLikeCount: 50,
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
		message: '{{username}} sent a gift {{giftName}} with count of {{coins}} coins',
		eventlistMessage: 'Gift',
		eventlistDetailedMessage: 'sent {{giftAmount}} gifts of {{giftName}}',
		acceptedVariables: [
			'username',
			'userId',
			'profilePictureUrl',
			'describe',
			'coins',
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
				label: 'Rose worth 1 Coin',
				dynamic: { value: 1, name: 'Rose' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					giftName: 'Rose',
					giftType: 1,
					giftId: 5655,
					giftAmount: 1,
					value: 1,
					coins: 1,
					giftPictureUrl: 'https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png',
				},
			},
			{
				label: 'Pumpkin worth 100 Coins',
				dynamic: { value: 100, name: 'Pumpkin' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					giftName: 'Pumpkin',
					giftPictureUrl: 'https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/e675252b83e97135f9ede3b5d32c2c71~tplv-obj.png',
					giftType: 2,
					giftId: 7095,
					giftAmount: 1,
					value: 100,
					coins: 100,
				},
			},
			{
				label: 'Boiling Cauldron worth 500 coins',
				dynamic: { value: 500, name: 'Boiling Cauldron' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					giftName: 'Boiling Cauldron',
					giftPictureUrl: 'https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/e675252b83e97135f9ede3b5d32c2c71~tplv-obj.png',
					giftType: 2,
					giftId: 7158,
					giftAmount: 1,
					value: 500,
					coins: 500,
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
				label: 'Gift Name',
				dynamicField: 'value',
				variableField: 'giftName',
				required: false,
				default: 'Rose',
			},
			{
				type: 'number',
				label: 'Coins',
				variableField: 'value',
				required: false,
				default: 1,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TIKTOK_SUBSCRIBER]: {
		connection: 'tiktok',
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: ['username', 'displayname', 'subMonths', 'avatar'],
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
	[LumiaAlertValues.TIKTOK_NEW_VIDEO]: {
		connection: 'tiktok',
		message: 'Tiktok new video',
		eventlistMessage: 'New video',
		eventlistDetailedMessage: 'new video',
		acceptedVariables: ['title', 'description', 'embed', 'link', 'id', 'duration', 'likes', 'shares', 'views', 'comments'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// kick: {
	[LumiaAlertValues.KICK_FIRST_CHATTER]: {
		connection: 'kick',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'displayname', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.KICK_ENTRANCE]: {
		connection: 'kick',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'displayname', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.KICK_FOLLOWER]: {
		connection: 'kick',
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
	[LumiaAlertValues.KICK_SUBSCRIBER]: {
		connection: 'kick',
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
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: {
		connection: 'kick',
		message: '{{gifter}} sent {{amount}} gift subscriptions',
		eventlistMessage: 'Gift Subscriptions',
		eventlistDetailedMessage: 'sent {{amount}} gift subscriptions',
		acceptedVariables: ['username', 'gifter', 'recipient', 'value', 'giftAmount', 'totalGifts'],
		quickActions: [
			{
				label: '1 gift',
				dynamic: { value: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					amount: 1,
				},
			},
			{
				label: '5 gifts',
				dynamic: { value: 5 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 5 },
			},
			{
				label: '20 gifts',
				dynamic: { value: 20 },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', amount: 20 },
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
				label: 'Gifter',
				variableField: 'gifter',
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
	// discord: {
	[LumiaAlertValues.DISCORD_FIRST_CHATTER]: {
		connection: 'discord',
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: ['username', 'displayname', 'avatar', 'first_count', 'message'],
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
	[LumiaAlertValues.DISCORD_ENTRANCE]: {
		connection: 'discord',
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: ['username', 'displayname', 'avatar', 'message'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// },
	// streamlabs: {
	[LumiaAlertValues.STREAMLABS_DONATION]: {
		connection: 'streamlabs',
		message: '{{username}} just donated {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Merch',
		eventlistDetailedMessage: 'bought {{merch}}',
		acceptedVariables: ['username', 'merch', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', merch: 'shirt' },
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
		],
	},
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: {
		connection: 'streamlabs',
		message: '{{username}} just redeemed {{redemption}}. They said {{message}}',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{redemption}}',
		acceptedVariables: ['username', 'redemption', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Merch',
		eventlistDetailedMessage: 'bought {{merch}}',
		acceptedVariables: ['username', 'merch', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Redemption',
		eventlistDetailedMessage: 'redeemed {{redemption}}',
		acceptedVariables: ['username', 'redemption', 'message'],
		quickActions: [
			{
				label: 'Shirt',
				dynamic: { value: 'shirt' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistMessage: 'Order',
		eventlistDetailedMessage: 'ordered {{item}}',
		eventlistSpecialUsername: 'Woocommerce',
		acceptedVariables: ['item', 'amount', 'username', 'currency', 'message'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					item: 'rgb light',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					item: 'rgb light, smart plug',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					item: 'rgb light, keylight, smart plug',
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
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistDetailedMessage: 'commissioned with {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		eventlistDetailedMessage: 'created a shop order with {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: [
			'retweets',
			'avatar',
			'username',
			'userId',
			'displayname',
			'banner',
			'profile_background_color',
			'profile_link_color',
			'user_followers',
			'user_likes',
			'is_following',
			'following_count',
			'verified',
			'private',
		],
		quickActions: [
			{
				label: 'New Follower',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', followers: 100 },
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
		eventlistDetailedMessage: 'received a like',
		acceptedVariables: ['likes'],
		quickActions: [
			{
				label: 'New Like',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', likes: 100 },
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
		message: '{{username}} retweeted',
		eventlistMessage: 'Retweet',
		eventlistDetailedMessage: 'retweeted your tweet',
		acceptedVariables: [
			'retweets',
			'avatar',
			'username',
			'userId',
			'displayname',
			'banner',
			'profile_background_color',
			'profile_link_color',
			'user_followers',
			'user_likes',
			'is_following',
			'following_count',
			'verified',
			'private',
		],
		quickActions: [
			{
				label: 'New Retweet',
				dynamic: { value: 'lumiastream' },
				extraSettings: { username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png', retweets: 100 },
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
		eventlistDetailedMessage: 'song switched to {{name}} - {{artists}}',
		acceptedVariables: ['name', 'uri', 'artists', 'image'],
		quickActions: [
			{
				label: 'Song changed',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
		eventlistDetailedMessage: 'song {{name}} - {{artists}} playing',
		acceptedVariables: ['name', 'uri', 'artists', 'image'],
		quickActions: [
			{
				label: 'Song played',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
		eventlistDetailedMessage: 'paused',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song paused',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
	// youtubemusic: {
	[LumiaAlertValues.YOUTUBEMUSIC_SWITCH_SONG]: {
		connection: 'youtubemusic',
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{name}} - {{artists}}',
		acceptedVariables: ['name', 'url', 'artists', 'image'],
		quickActions: [
			{
				label: 'Song changed',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					url: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				label: 'URL',
				variableField: 'url',
				required: false,
				default: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
			},
			{
				type: 'text',
				label: 'Image URI',
				variableField: 'image',
				required: false,
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PLAYED]: {
		connection: 'youtubemusic',
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} - {{artists}} playing',
		acceptedVariables: ['name', 'url', 'artists', 'image'],
		quickActions: [
			{
				label: 'Song played',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					url: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				label: 'URL',
				variableField: 'url',
				required: false,
				default: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
			},
			{
				type: 'text',
				label: 'Image URL',
				variableField: 'image',
				required: false,
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PAUSED]: {
		connection: 'youtubemusic',
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'paused',
		acceptedVariables: ['name', 'url', 'image'],
		quickActions: [
			{
				label: 'Song paused',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					url: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				label: 'URL',
				variableField: 'url',
				required: false,
				default: 'https://music.youtube.com/watch?v=M8xO9hyYC4U',
			},
			{
				type: 'text',
				label: 'Image URL',
				variableField: 'image',
				required: false,
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	// Nowplaying: {
	[LumiaAlertValues.NOWPLAYING_SWITCH_SONG]: {
		connection: 'nowplaying',
		message: 'Song switched to {{title}}',
		eventlistSpecialUsername: 'Now Playing',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{title}} - {{artist}}',
		acceptedVariables: ['id', 'title', 'artwork', 'artist', 'album', 'label', 'bpm', 'rating', 'length', 'comment', 'key', 'url', 'spotify_url', 'beatport_url', 'beatport_id', 'file_path'],
		quickActions: [
			{
				label: 'Song changed',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					title: 'Lumia Dream',
					artist: 'Lumia Stream',
					url: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Title',
				dynamicField: 'value',
				variableField: 'title',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Artist',
				dynamicField: 'value',
				variableField: 'artist',
				required: true,
				default: 'lumiastream',
			},
			{
				type: 'text',
				label: 'Artwork',
				variableField: 'artwork',
				required: false,
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
		eventlistDetailedMessage: 'paused',
		acceptedVariables: ['name', 'uri', 'image'],
		quickActions: [
			{
				label: 'Song paused',
				dynamic: { value: 'Lumia Dream' },
				extraSettings: {
					name: 'Lumia Dream',
					uri: 'https://open.spotify.com/track/3vBn6l5T2AWm4NlqNWE43f',
					image: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
				default: 'https://lh3.googleusercontent.com/hxcNF4a-5MZqN9HmIyPMlVm6AzQ6CI0MmisFqZTglun4VJ2Ghli4lvyQpJS2oeqjnT8a0S2EAWklTo14=w544-h544-l90-rj',
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
		eventlistDetailedMessage: 'donated {{amount}} {{currency}}',
		acceptedVariables: ['username', 'currency', 'amount'],
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$200',
				dynamic: { value: 200, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
					currency: LumiaVariationCurrency.USD,
				},
			},
			{
				label: '$300',
				dynamic: { value: 300, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
	[LumiaAlertValues.OBS_RECORDING_STARTING]: {
		connection: 'obs',
		message: 'OBS recording started',
		acceptedVariables: ['output_path'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_RECORDING_STOPPING]: {
		connection: 'obs',
		message: 'OBS recording stopped',
		acceptedVariables: ['output_path'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_REPLAY_BUFFER_SAVED]: {
		connection: 'obs',
		message: 'OBS replay buffer saved',
		acceptedVariables: ['saved_path'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_VERTICAL_BACKTRACK_SAVED]: {
		connection: 'obs',
		message: 'OBS recording stopped',
		acceptedVariables: ['saved_path'],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_VENDOR_EVENT]: {
		connection: 'obs',
		message: 'OBS vendor event',
		acceptedVariables: ['eventType', 'eventData', 'vendorName'],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
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
