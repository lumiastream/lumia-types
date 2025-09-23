import { LumiaAlertValues } from './activity.types';
import { LumiaIntegrations } from './event.types';
import { AllVariables } from './variables.types';

export enum LumiaVariationConditions {
	RANDOM = 'RANDOM', // Frequency: Percent Chance
	GREATER_NUMBER = 'GREATER_NUMBER',
	LESS_NUMBER = 'LESS_NUMBER',
	EQUAL_STRING = 'EQUAL_STRING',
	EQUAL_USERNAME = 'EQUAL_USERNAME',
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

	// Every x amount
	COUNT_IS_MULTIPLE_OF = 'COUNT_IS_MULTIPLE_OF',

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
	username?: string;
	total?: number;
	previousTotal?: number;
}

export const LumiaAlertConfigs: Record<
	LumiaAlertValues | string,
	{
		connection: LumiaIntegrations;
		message: string;
		eventlistSpecialUsername?: string;
		eventlistMessage?: string;
		eventlistDetailedMessage?: string;
		acceptedVariables: string[];
		quickActions?: Array<{
			label: string;
			dynamic: LumiaDynamicCondition;
			extraSettings?: Record<string, string | number | boolean | Array<any>>;
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
			description?: string;
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
		connection: LumiaIntegrations.LUMIASTREAM,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.lumiastream.alerts.donation,
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
			{
				type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
			},
		],
	},
	[LumiaAlertValues.LUMIASTREAM_LUMIA_OPENED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Lumia opened',
		acceptedVariables: AllVariables.lumiastream.alerts.lumiaOpened,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_LUMIA_CLOSED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Lumia closed',
		acceptedVariables: AllVariables.lumiastream.alerts.lumiaClosed,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_ON]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'stream mode on',
		acceptedVariables: AllVariables.lumiastream.alerts.streammodeOn,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_STREAMMODE_OFF]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'stream mode off',
		acceptedVariables: AllVariables.lumiastream.alerts.streammodeOff,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_START]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: '{{raffle_title}} started! Type {{raffle_entry_command}} to enter',
		eventlistMessage: 'Raffle Start',
		eventlistDetailedMessage: '{{raffle_title}} started! Type {{raffle_entry_command}} to enter',
		acceptedVariables: AllVariables.lumiastream.alerts.raffleStart,
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
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_STOP]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: '{{raffle_title}} has stopped! Winners will be drawn soon',
		eventlistMessage: 'Raffle Stop',
		eventlistDetailedMessage: '{{raffle_title}} has stopped! Winners will be drawn soon',
		acceptedVariables: AllVariables.lumiastream.alerts.raffleStop,
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
	[LumiaAlertValues.LUMIASTREAM_RAFFLE_WINNER]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Congratulations {{raffle_winner}} for being selected in this raffle!',
		eventlistMessage: 'Raffle Winner',
		eventlistDetailedMessage: 'Congratulations {{raffle_winner}} for being selected in this raffle!',
		acceptedVariables: AllVariables.lumiastream.alerts.raffleWinner,
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
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
		],
	},
	[LumiaAlertValues.LUMIASTREAM_SPINWHEEL_WINNER]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Congratulations {{spinwheel_winner}} for winning {{spinwheel_item}}!',
		eventlistMessage: 'Raffle Stop',
		eventlistDetailedMessage: 'Congratulations {{spinwheel_winner}} for winning {{spinwheel_item}}!',
		acceptedVariables: AllVariables.lumiastream.alerts.spinwheelWinner,
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
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
		],
	},
	[LumiaAlertValues.LUMIASTREAM_POLL_STARTED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'New poll started {{poll_title}} with choices {{poll_choices}}',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll start',
		eventlistDetailedMessage: 'Poll started {{poll_title}} with choices {{poll_choices}}',
		acceptedVariables: AllVariables.lumiastream.alerts.pollStarted,
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
	[LumiaAlertValues.LUMIASTREAM_POLL_PROGRESSED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll progressed',
		eventlistDetailedMessage: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		acceptedVariables: AllVariables.lumiastream.alerts.pollProgressed,
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
	[LumiaAlertValues.LUMIASTREAM_POLL_ENDED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Poll ended',
		eventlistDetailedMessage: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		acceptedVariables: AllVariables.lumiastream.alerts.pollEnded,
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
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_STARTED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Viewer Queue {{viewerqueue_title}} Started!',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Viewer Queue Started',
		eventlistDetailedMessage: 'Viewer Queue {{viewerqueue_title}} Started!',
		acceptedVariables: AllVariables.lumiastream.alerts.viewerqueueStarted,
		quickActions: [],
		inputFields: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_VIEWERQUEUE_ENDED]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Viewer Queue {{viewerqueue_title}} Ended!',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Viewer Queue Ended',
		eventlistDetailedMessage: 'Viewer Queue {{viewerqueue_title}} Ended!',
		acceptedVariables: AllVariables.lumiastream.alerts.viewerqueueEnded,
		quickActions: [],
		inputFields: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.LUMIASTREAM_ROULETTE_WINNER]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Congratulations {{username}}! The ball landed on {{ball_position}}. You win {{outcome_amount}} {{loyalty_currency_name}}! Well played! 🎉',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Roulette Winner',
		eventlistDetailedMessage: 'Congratulations {{username}}! The ball landed on {{ball_position}}. You win {{outcome_amount}} {{loyalty_currency_name}}! Well played! 🎉',
		acceptedVariables: AllVariables.lumiastream.alerts.rouletteWinner,
		quickActions: [],
		inputFields: [],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.LUMIASTREAM_SLOTS_WINNER]: {
		connection: LumiaIntegrations.LUMIASTREAM,
		message: 'Congratulations {{username}}! you rolled {{slots_combo}} and won {{outcome_amount}} {{loyalty_currency_name}}. 🎉',
		eventlistSpecialUsername: 'lumiastream',
		eventlistMessage: 'Slots Winner',
		eventlistDetailedMessage: 'Congratulations {{username}}! you rolled {{slots_combo}} and won {{outcome_amount}} {{loyalty_currency_name}}. 🎉',
		acceptedVariables: AllVariables.lumiastream.alerts.slotsWinner,
		quickActions: [],
		inputFields: [],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER },
			{ type: LumiaVariationConditions.EQUAL_STRING },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	// twitch: {
	[LumiaAlertValues.TWITCH_EXTENSION]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} redeemed {{command}} for {{amount}} {{amount_type}}',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{command}} for {{amount}} {{amount_type}}',
		acceptedVariables: AllVariables.lumiastream.chat.twitchExtensions,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
				description: 'Amount is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Amount is greater than',
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
					amount_type: 'bits',
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
					amount_type: 'bits',
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
					amount_type: 'bits',
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
			{
				type: 'selection',
				label: 'Amount Type',
				dynamicField: 'amount_type',
				variableField: 'amount_type',
				default: 'bits',
				required: true,
				selections: [
					{ label: 'Bits', value: 'bits' },
					{ label: 'Loyalty Points', value: 'loyalty' },
				],
			},
		],
	},
	[LumiaAlertValues.TWITCH_POINTS]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} redeemed {{command}} for {{amount}} points',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{command}} for {{amount}} points',
		acceptedVariables: AllVariables.lumiastream.chat.twitchPoints,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Command is equal to',
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
				description: 'Amount is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Amount is greater than',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Twitch Stream is now live',
		acceptedVariables: AllVariables.twitch.alerts.streamLive,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_STREAM_OFFLINE]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Twitch Stream is offline',
		acceptedVariables: AllVariables.twitch.alerts.streamOffline,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_FIRST_CHATTER]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} is the first chatter and has been first {{first_count}} times!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.twitch.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TWITCH_ENTRANCE]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.twitch.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
		],
	},
	[LumiaAlertValues.TWITCH_FOLLOWER]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} is now following!',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.twitch.alerts.follower,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
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
	[LumiaAlertValues.TWITCH_SESSION_FOLLOWERS]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Reached {{total}} followers',
		eventlistMessage: 'Total Followers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} followers',
		acceptedVariables: AllVariables.twitch.alerts.sessionFollowers,
		eventlistSpecialUsername: 'Total Followers',
		quickActions: [
			{
				label: '10 Total Followers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Followers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Followers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Followers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Follower Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Follower Count is a multiple of' },
		],
	},
	[LumiaAlertValues.TWITCH_SUBSCRIBER]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} just subscribed with a {{tier}} sub!',
		eventlistMessage: '{{tier}} Sub',
		eventlistDetailedMessage: 'subscribed with a {{tier}} sub',
		acceptedVariables: AllVariables.twitch.alerts.subscriber,
		quickActions: [
			{
				label: 'Tier 1 Sub',
				dynamic: { value: 1000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day ones',
				},
			},
			{
				label: 'Tier 2 Sub',
				dynamic: { value: 2000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 2,
					tier: 'Tier 2',
					subPlan: 2000,
					subPlanName: 'My Day dos',
				},
			},
			{
				label: 'Tier 3 Sub',
				dynamic: { value: 3000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 3,
					tier: 'Tier 3',
					subPlan: 3000,
					subPlanName: 'My Day tres',
				},
			},
			{
				label: 'Prime Sub',
				dynamic: { value: 'Prime' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					tier: 'Prime',
					subPlan: 'Prime',
					subPlanName: 'Optimus Prime',
				},
			},
			{
				label: 'Resubscribed 3 months',
				dynamic: { value: 1000, subMonths: 3 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 3,
					streakMonths: 3,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day ones',
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
				label: 'Months subscribed',
				dynamicField: 'subMonths',
				variableField: 'subMonths',
				required: false,
				default: 1,
			},
			{
				type: 'selection',
				label: 'Sub Plan',
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
				description: 'Tier Level',
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TWITCH_SESSION_SUBS]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Reached {{total}} subscribers',
		eventlistMessage: 'Total Subscribers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} subscribers',
		acceptedVariables: AllVariables.twitch.alerts.sessionSubs,
		eventlistSpecialUsername: 'Total Subscribers',
		quickActions: [
			{
				label: '10 Total Subscribers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Subscribers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Subscribers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Subscribers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Subscriber Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Subscriber Count is a multiple of' },
		],
	},
	[LumiaAlertValues.TWITCH_GIFT_SUBSCRIPTION]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{gifter}} gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		eventlistMessage: 'Gifted {{giftAmount}} subs',
		eventlistDetailedMessage: 'gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		acceptedVariables: AllVariables.twitch.alerts.giftSubscription,
		quickActions: [
			{
				label: 'Gift 1 Sub',
				dynamic: { value: 1000, giftAmount: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights',
					recipientsRaw: [{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } }],
					giftAmount: 1,
					totalGifts: 1,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day ones',
				},
			},
			{
				label: 'Gift 5 Subs',
				dynamic: { value: 1000, giftAmount: 5 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights,lumiastream,lumiatwitch,lumiakick,rgblumia',
					recipientsRaw: [
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiatwitch', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'rgblumia', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
					],
					giftAmount: 5,
					totalGifts: 5,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day unos',
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
				label: 'Gift Recipients',
				variableField: 'recipients',
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
				label: 'Sub Plan',
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
				description: 'Tier Level',
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TWITCH_SESSION_GIFT_SUBSCRIPTIONS]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Reached {{total}} gift subscriptions',
		eventlistMessage: 'Total Gift Subscriptions {{total}}',
		eventlistDetailedMessage: 'reached {{total}} gift subscriptions',
		acceptedVariables: AllVariables.twitch.alerts.sessionGiftSubscriptions,
		eventlistSpecialUsername: 'Total Gift Subscriptions',
		quickActions: [
			{
				label: '10 Total Gift Subscriptions',
				dynamic: { value: 100, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Gift Subscriptions',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Gift Subscriptions',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Gift Subscriptions',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Gift Subscription Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Gift Subscription Count is a multiple of' },
		],
	},
	[LumiaAlertValues.TWITCH_BITS]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} cheered {{amount}} bits. They said {{message}}',
		eventlistMessage: 'Bits',
		eventlistDetailedMessage: 'cheered {{amount}} bits',
		acceptedVariables: AllVariables.twitch.alerts.bits,
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
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_SESSION_BITS]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Reached {{total}} bits',
		eventlistMessage: 'Total Bits {{total}}',
		eventlistDetailedMessage: 'reached {{total}} bits',
		acceptedVariables: AllVariables.twitch.alerts.sessionBits,
		eventlistSpecialUsername: 'Total Bits',
		quickActions: [
			{
				label: '1000 Total Bits',
				dynamic: { value: 1000, total: 1000, previousTotal: 500 },
				extraSettings: {
					total: 1000,
					previousTotal: 500,
				},
			},
			{
				label: '20000 Total Bits',
				dynamic: { value: 20000, total: 20000, previousTotal: 10000 },
				extraSettings: {
					total: 20000,
					previousTotal: 10000,
				},
			},
			{
				label: '100000 Total Bits',
				dynamic: { value: 100000, total: 100000, previousTotal: 50000 },
				extraSettings: {
					total: 100000,
					previousTotal: 50000,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Bits',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 100,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Bit Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Bit Count is a multiple of' },
		],
	},
	[LumiaAlertValues.TWITCH_POWERUPS]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} redeemed {{type}} and cheered {{amount}} bits. They said {{message}}',
		eventlistMessage: 'Powerups',
		eventlistDetailedMessage: 'redeemed {{type}} for {{amount}} bits',
		acceptedVariables: AllVariables.twitch.alerts.powerups,
		quickActions: [
			{
				label: 'Gigantify powerup',
				dynamic: { value: 100, name: 'gigantify_an_emote' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					type: 'gigantify_an_emote',
					amount: 100,
				},
			},
			{
				label: 'Celebration powerup',
				dynamic: { value: 500, name: 'celebration' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					type: 'celebration',
					amount: 500,
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
				label: 'Type of powerup',
				dynamicField: 'value',
				variableField: 'type',
				required: true,
				default: 'celebration',
			},
			{
				type: 'number',
				label: 'Amount of bits',
				variableField: 'amount',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
			{
				type: LumiaVariationConditions.EQUAL_SELECTION,
				description: 'Powerup Type',
				selections: [
					{
						label: 'celebration',
						value: 'celebration',
					},
					{
						label: 'message_effect',
						value: 'message_effect',
					},
					{
						label: 'gigantify_an_emote',
						value: 'gigantify_an_emote',
					},
				],
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_POWERUPS_POINTS]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} redeemed {{type}} for {{amount}} points. They said {{message}}',
		eventlistMessage: 'Powerups',
		eventlistDetailedMessage: 'redeemed {{type}} for {{amount}} points',
		acceptedVariables: AllVariables.twitch.alerts.powerupsPoints,
		quickActions: [
			{
				label: 'Unlock a Random Sub Emote',
				dynamic: { value: 100, name: 'random_sub_emote_unlock' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					type: 'random_sub_emote_unlock',
					amount: 100,
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
				label: 'Type of powerup',
				dynamicField: 'value',
				variableField: 'type',
				required: true,
				default: 'random_sub_emote_unlock',
			},
			{
				type: 'number',
				label: 'Amount of points',
				variableField: 'amount',
				required: true,
				default: 100,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
			{
				type: LumiaVariationConditions.EQUAL_SELECTION,
				description: 'Powerups Type',
				selections: [
					{
						label: 'Single message bypass sub mode',
						value: 'single_message_bypass_sub_mode',
					},
					{
						label: 'Send highlighted message',
						value: 'send_highlighted_message',
					},
					{
						label: 'Random sub emote unlock',
						value: 'random_sub_emote_unlock',
					},
					{
						label: 'Chosen sub emote unlock',
						value: 'chosen_sub_emote_unlock',
					},
					{
						label: 'Chosen modified sub emote unlock',
						value: 'chosen_modified_sub_emote_unlock',
					},
				],
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_RAID]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} raided with {{viewers}} viewers',
		eventlistMessage: 'Raided',
		eventlistDetailedMessage: 'raided with {{viewers}} viewers',
		acceptedVariables: AllVariables.twitch.alerts.raid,
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_RAID_OUT]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'You raided {{username}} with {{viewers}} viewers',
		eventlistMessage: 'Raid Out',
		eventlistDetailedMessage: 'raided out {{username}} with {{viewers}} viewers',
		acceptedVariables: AllVariables.twitch.alerts.raidOut,
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Hype train started',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train started',
		eventlistDetailedMessage: 'Hype train started',
		acceptedVariables: AllVariables.twitch.alerts.hypetrainStarted,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
		],
	},
	[LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Hype train progressed to {{progress}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train progressed',
		eventlistDetailedMessage: 'Hype train progressed to {{progress}}',
		acceptedVariables: AllVariables.twitch.alerts.hypetrainProgressed,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Hype train progressed to level {{level}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train leveled up',
		eventlistDetailedMessage: 'Hype train progressed to level {{level}}',
		acceptedVariables: AllVariables.twitch.alerts.hypetrainLevelProgressed,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Hype train ended on level {{level}} and reached a total of {{total}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Hype train ended',
		eventlistDetailedMessage: 'Hype train ended on level {{level}} and reached a total of {{total}}',
		acceptedVariables: AllVariables.twitch.alerts.hypetrainEnded,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'New poll started {{poll_title}} with choices {{poll_choices}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll start',
		eventlistDetailedMessage: 'Poll started {{poll_title}} with choices {{poll_choices}}',
		acceptedVariables: AllVariables.twitch.alerts.pollStarted,
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
				description: 'Title is equal to',
			},
		],
	},
	[LumiaAlertValues.TWITCH_POLL_PROGRESSED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll progressed',
		eventlistDetailedMessage: 'Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}',
		acceptedVariables: AllVariables.twitch.alerts.pollProgressed,
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
				description: 'Title is equal to',
			},
		],
	},
	[LumiaAlertValues.TWITCH_POLL_ENDED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Poll ended',
		eventlistDetailedMessage: 'Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes',
		acceptedVariables: AllVariables.twitch.alerts.pollEnded,
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
				description: 'Title is equal to',
			},
		],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_STARTED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Prediction started with the title {{prediction_title}}! Choices are {{prediction_outcome1_title}} or {{prediction_outcome2_title}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction start',
		eventlistDetailedMessage: 'Prediction started with the title {{prediction_title}}! Choices are {{prediction_outcome1_title}} or {{prediction_outcome2_title}}',
		acceptedVariables: AllVariables.twitch.alerts.predictionStarted,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Prediction {{prediction_title}} progressed. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction progressed',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} progressed. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: AllVariables.twitch.alerts.predictionProgressed,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING, description: 'Title is equal to' }],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Prediction {{prediction_title}} locked. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction locked',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} locked. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: AllVariables.twitch.alerts.predictionLocked,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING, description: 'Title is equal to' }],
	},
	[LumiaAlertValues.TWITCH_PREDICTION_ENDED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Prediction {{prediction_title}} ended. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Prediction ended',
		eventlistDetailedMessage: 'Prediction {{prediction_title}} ended. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points',
		acceptedVariables: AllVariables.twitch.alerts.predictionEnded,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING, description: 'Title is equal to' }],
	},
	[LumiaAlertValues.TWITCH_GOAL_STARTED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Goal {{goal_description}} started with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal start',
		eventlistDetailedMessage: 'Goal {{goal_description}} started with a target of {{goal_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.goalStarted,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Goal {{goal_description}} progressed to {{goal_amount}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal progressed',
		eventlistDetailedMessage: 'Goal {{goal_description}} progressed to {{goal_amount}} with a target of {{goal_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.goalProgressed,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Goal {{goal_description}} ended at amount {{goal_amount}} with a target of {{goal_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Goal ended',
		eventlistDetailedMessage: 'Goal {{goal_description}} ended at amount {{goal_amount}} with a target of {{goal_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.goalEnded,
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
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} just tipped {{amount}} to charity {{charity_name}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}}',
		acceptedVariables: AllVariables.twitch.alerts.charityDonation,
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TWITCH_CHARITY_CAMPAIGN_STARTED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Charity campaign {{charity_name}} started with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign start',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} started with a target of {{charity_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.charityCampaignStarted,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Charity campaign {{charity_name}} progressed to {{charity_amount}} with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign progressed',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} progressed to {{charity_amount}} with a target of {{charity_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.charityCampaignProgressed,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Charity campaign {{charity_name}} ended at amount {{charity_amount}} with a target of {{charity_target_amount}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Charity campaign ended',
		eventlistDetailedMessage: 'Charity campaign {{charity_name}} ended at amount {{charity_amount}} with a target of {{charity_target_amount}}',
		acceptedVariables: AllVariables.twitch.alerts.charityCampaignStopped,
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
		connection: LumiaIntegrations.TWITCH,
		message: 'Category changed to {{category_name}}',
		eventlistSpecialUsername: 'Twitch',
		eventlistMessage: 'Category {{category_name}}',
		eventlistDetailedMessage: 'Category changed to {{category_name}}',
		acceptedVariables: AllVariables.twitch.alerts.categoryChanged,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING, description: 'Title is equal to' }],
	},
	[LumiaAlertValues.TWITCH_CLIP]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'Clip taken by {{username}} with title of {{clip_title}}',
		eventlistMessage: 'Clipped',
		eventlistDetailedMessage: 'created a clip',
		acceptedVariables: AllVariables.twitch.alerts.clip,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME, description: 'Username is equal to' }],
	},
	[LumiaAlertValues.TWITCH_CHANNEL_JOIN]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} just joined the channel',
		eventlistMessage: 'Join',
		eventlistDetailedMessage: 'joined the channel',
		acceptedVariables: AllVariables.twitch.alerts.channelJoin,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TWITCH_CHANNEL_LEAVE]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} just left the channel',
		eventlistMessage: 'Left',
		eventlistDetailedMessage: 'left the channel',
		acceptedVariables: AllVariables.twitch.alerts.channelLeave,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TWITCH_BANNED]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} is banned',
		eventlistMessage: 'Banned',
		eventlistDetailedMessage: 'banned',
		acceptedVariables: AllVariables.twitch.alerts.banned,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TWITCH_TIMEOUT]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} is timed out',
		eventlistMessage: 'Timeout',
		eventlistDetailedMessage: 'timed out',
		acceptedVariables: AllVariables.twitch.alerts.timeout,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TWITCH_TIMEOUT_OVER]: {
		connection: LumiaIntegrations.TWITCH,
		message: "{{username}}'s timeout of {{duration}} seconds is over",
		eventlistMessage: 'Timeout Over',
		eventlistDetailedMessage: 'time out over',
		acceptedVariables: AllVariables.twitch.alerts.timeoutOver,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TWITCH_SHOUTOUT_RECEIVE]: {
		connection: LumiaIntegrations.TWITCH,
		message: '{{username}} sent you a shoutout',
		eventlistMessage: 'Shoutout',
		eventlistDetailedMessage: 'shoutout',
		acceptedVariables: AllVariables.twitch.alerts.shoutoutReceive,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_STRING, description: 'Username is equal to' }],
	},
	[LumiaAlertValues.TWITCH_AD_STARTED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'ad started',
		eventlistMessage: 'Ad Started',
		eventlistDetailedMessage: 'ad started',
		acceptedVariables: AllVariables.twitch.alerts.adStarted,
		quickActions: [
			{
				label: 'Ad Started',
				dynamic: { value: '60' },
				extraSettings: {
					length: '60',
					is_automatic: false,
					started_at: '2022-07-26T17:00:03.17106713Z',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Length',
				dynamicField: 'value',
				variableField: 'length',
				required: true,
				default: '60',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TWITCH_AD_STOPPED]: {
		connection: LumiaIntegrations.TWITCH,
		message: 'ad stopped',
		eventlistMessage: 'Ad Stopped',
		eventlistDetailedMessage: 'ad stopped',
		acceptedVariables: AllVariables.twitch.alerts.adStopped,
		quickActions: [
			{
				label: 'Ad Stopped',
				dynamic: { value: '60' },
				extraSettings: {
					length: '60',
					is_automatic: false,
					started_at: '2022-07-26T17:00:03.17106713Z',
					next_ad_starts: '1 hour, 5 minutes, 20 seconds',
					next_ad_starts_date: '2022-07-26T17:00:05.17106713Z',
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Length',
				dynamicField: 'value',
				variableField: 'length',
				required: true,
				default: '60',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// youtube: {
	[LumiaAlertValues.YOUTUBE_STREAM_LIVE]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'YouTube Stream is now live',
		acceptedVariables: AllVariables.youtube.alerts.streamLive,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_STREAM_OFFLINE]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'YouTube Stream is offline',
		acceptedVariables: AllVariables.youtube.alerts.streamOffline,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.YOUTUBE_FIRST_CHATTER]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.youtube.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.YOUTUBE_ENTRANCE]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.youtube.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
		],
	},
	[LumiaAlertValues.YOUTUBE_SUBSCRIBER]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{username}} just subscribed!',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: AllVariables.youtube.alerts.subscriber,
		quickActions: [
			{
				label: 'Lumia subscribed',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					displayname: 'LumiaStream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userId: '1234',
				},
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.YOUTUBE_SESSION_SUBS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Reached {{total}} subscribers',
		eventlistMessage: 'Total Subscribers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} subscribers',
		acceptedVariables: AllVariables.youtube.alerts.sessionSubs,
		eventlistSpecialUsername: 'Total Subscribers',
		quickActions: [
			{
				label: '10 Total Subscribers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Subscribers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Subscribers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Subscribers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Subscriber Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Subscriber Count is a multiple of' },
		],
	},
	[LumiaAlertValues.YOUTUBE_MEMBER]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{username}} just became a member with a {{tier}} plan!',
		eventlistMessage: '{{tier}} Member',
		eventlistDetailedMessage: 'just became a member with a {{tier}} plan',
		acceptedVariables: AllVariables.youtube.alerts.member,
		quickActions: [
			{
				label: 'Lumia became a Bronze member',
				dynamic: { value: 'Bronze', username: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					streakMonths: 1,
					tier: 'Bronze',
					subPlan: 'Bronze',
					subPlanName: 'Bronze',
					subPlanId: 'CC-1234567890',
				},
			},
			{
				label: 'Lumia became a Silver member',
				dynamic: { value: 'Silver', username: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					streakMonths: 1,
					tier: 'Silver',
					subPlan: 'Silver',
					subPlanName: 'Silver',
					subPlanId: 'CC-234567890',
				},
			},
			{
				label: 'Lumia became a Gold member',
				dynamic: { value: 'Gold', username: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					streakMonths: 1,
					tier: 'Gold',
					subPlan: 'Gold',
					subPlanName: 'Gold',
					subPlanId: 'CC-34567890',
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
				label: 'Months subscribed',
				dynamicField: 'subMonths',
				variableField: 'subMonths',
				required: false,
				default: 1,
			},
			{
				type: 'selection',
				label: 'Sub Plan Name',
				dynamicField: 'value',
				variableField: 'subPlan',
				default: 'Bronze',
				required: true,
				selections: [
					{ label: 'Bronze', value: 'Bronze' },
					{ label: 'Silver', value: 'Silver' },
					{ label: 'Gold', value: 'Gold' },
				],
			},
			{
				type: 'text',
				label: 'Sub Plan',
				variableField: 'subPlan',
				required: true,
				default: 'Bronze',
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
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Plan Name is equal to',
			},
			{
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL,
				description: 'Months subscribed is equal to',
			},
			{
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER,
				description: 'Months subscribed is greater than',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.YOUTUBE_SESSION_MEMBERS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Reached {{total}} members',
		eventlistMessage: 'Total Members {{total}}',
		eventlistDetailedMessage: 'reached {{total}} members',
		acceptedVariables: AllVariables.youtube.alerts.sessionMembers,
		eventlistSpecialUsername: 'Total Members',
		quickActions: [
			{
				label: '10 Total Members',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Members',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Members',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Members',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Member Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Member Count is a multiple of' },
		],
	},
	[LumiaAlertValues.YOUTUBE_GIFT_MEMBER]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{gifter}} gifted {{giftAmount}} {{tier}} members to {{recipients}}',
		eventlistMessage: 'Gifted {{giftAmount}} members',
		eventlistDetailedMessage: 'gifted {{giftAmount}} {{tier}} members to {{recipients}}',
		acceptedVariables: AllVariables.youtube.alerts.giftMember,
		quickActions: [
			{
				label: 'Gift 1 Member',
				dynamic: { value: '1', giftAmount: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights',
					recipientsRaw: [{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } }],
					giftAmount: 1,
					totalGifts: 1,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: '1',
					subPlanName: 'My Day ones',
				},
			},
			{
				label: 'Gift 5 Members',
				dynamic: { value: '1', giftAmount: 5 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights,lumiastream,lumiatwitch,lumiayoutube,rgblumia',
					recipientsRaw: [
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiatwitch', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'rgblumia', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
					],
					giftAmount: 5,
					totalGifts: 5,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: '1',
					subPlanName: 'My Day ones',
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
				label: 'Gift Recipients',
				variableField: 'recipients',
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
				type: LumiaVariationConditions.GIFT_SUB_EQUAL,
				description: 'Gift members is equal to',
			},
			{
				type: LumiaVariationConditions.GIFT_SUB_GREATER,
				description: 'Gift members is greater than',
			},
		],
	},
	[LumiaAlertValues.YOUTUBE_SESSION_GIFT_MEMBERS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Reached {{total}} gift members',
		eventlistMessage: 'Total Gift Members {{total}}',
		eventlistDetailedMessage: 'reached {{total}} gift members',
		acceptedVariables: AllVariables.youtube.alerts.sessionGiftMembers,
		eventlistSpecialUsername: 'Total Gift Members',
		quickActions: [
			{
				label: '10 Total Gift Members',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Gift Members',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Gift Members',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Gift Members',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Gift Member Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Gift Member Count is a multiple of' },
		],
	},
	[LumiaAlertValues.YOUTUBE_SUPERCHAT]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{username}} just super chatted with {{amount}}. They said {{message}}',
		eventlistMessage: 'Super Chat',
		eventlistDetailedMessage: 'sent {{amount}} for a super chat',
		acceptedVariables: AllVariables.youtube.alerts.superchat,
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					displayname: 'LumiaStream',
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
					displayname: 'LumiaStream',
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
					displayname: 'LumiaStream',
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
			{ type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER },
			{ type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER },
		],
	},
	[LumiaAlertValues.YOUTUBE_SESSION_SUPERCHATS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Reached {{total}} superchats',
		eventlistMessage: 'Total Superchats {{total}}',
		eventlistDetailedMessage: 'reached {{total}} superchats',
		acceptedVariables: AllVariables.youtube.alerts.sessionSuperchats,
		eventlistSpecialUsername: 'Total Superchats',
		quickActions: [
			{
				label: '10 Total Superchats',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Superchats',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Superchats',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Superchats',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Superchat Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Superchat Count is a multiple of' },
		],
	},
	[LumiaAlertValues.YOUTUBE_SUPERSTICKER]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{username}} just sent a supersticker with {{amount}}',
		eventlistMessage: 'Super Sticker',
		eventlistDetailedMessage: 'sent a super sticker for {{amount}}',
		acceptedVariables: AllVariables.youtube.alerts.supersticker,
		quickActions: [
			{
				label: '100',
				dynamic: { value: 100 },
				extraSettings: {
					username: 'lumiastream',
					displayname: 'LumiaStream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
				},
			},
			{
				label: '200',
				dynamic: { value: 200 },
				extraSettings: {
					username: 'lumiastream',
					displayname: 'LumiaStream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 200,
				},
			},
			{
				label: '300',
				dynamic: { value: 300 },
				extraSettings: {
					username: 'lumiastream',
					displayname: 'LumiaStream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 300,
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
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER },
			{ type: LumiaVariationConditions.GREATER_NUMBER },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.YOUTUBE_SESSION_SUPERSTICKERS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: 'Reached {{total}} superstickers',
		eventlistMessage: 'Total Subscribers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} superstickers',
		acceptedVariables: AllVariables.youtube.alerts.sessionSuperstickers,
		eventlistSpecialUsername: 'Total Superstickers',
		quickActions: [
			{
				label: '10 Total Superstickers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Superstickers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Superstickers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Superstickers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Supersticker Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Supersticker Count is a multiple of' },
		],
	},
	[LumiaAlertValues.YOUTUBE_LIKE]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{likes}} likes on the stream',
		eventlistMessage: 'Likes',
		eventlistDetailedMessage: '{{likes}} likes on the stream',
		acceptedVariables: AllVariables.youtube.alerts.like,
		quickActions: [
			{
				label: '10 likes',
				dynamic: { value: 10 },
				extraSettings: { likes: 10, dislikes: 2 },
			},
			{
				label: '20 likes',
				dynamic: { value: 20 },
				extraSettings: { likes: 20, dislikes: 2 },
			},
			{
				label: '100 likes',
				dynamic: { value: 100 },
				extraSettings: { likes: 100, dislikes: 2 },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_NUMBER }, { type: LumiaVariationConditions.GREATER_NUMBER }],
	},
	[LumiaAlertValues.YOUTUBE_VIEWERS]: {
		connection: LumiaIntegrations.YOUTUBE,
		message: '{{viewers}} viewers are watching the stream',
		eventlistMessage: 'Viewers',
		eventlistDetailedMessage: '{{viewers}} viewers are watching the stream',
		acceptedVariables: AllVariables.youtube.alerts.viewers,
		quickActions: [
			{
				label: '100 viewers',
				dynamic: { value: 100 },
				extraSettings: { viewers: 100 },
			},
			{
				label: '200 viewers',
				dynamic: { value: 200 },
				extraSettings: { viewers: 200 },
			},
			{
				label: '300 viewers',
				dynamic: { value: 300 },
				extraSettings: { viewers: 300 },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Viewers Greater Than' }],
	},
	// },
	// facebook: {
	[LumiaAlertValues.FACEBOOK_STREAM_LIVE]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: 'Facebook Stream is now live',
		acceptedVariables: AllVariables.facebook.alerts.streamLive,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_STREAM_OFFLINE]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: 'Facebook Stream is offline',
		acceptedVariables: AllVariables.facebook.alerts.streamOffline,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.FACEBOOK_FIRST_CHATTER]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.facebook.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.FACEBOOK_ENTRANCE]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.facebook.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_USERNAME,
			},
		],
	},
	[LumiaAlertValues.FACEBOOK_FOLLOWER]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.facebook.alerts.follower,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.FACEBOOK_REACTION]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} reacted with a {{reaction}}',
		eventlistMessage: '{{reaction}}',
		eventlistDetailedMessage: 'reacted with a {{reaction}}',
		acceptedVariables: AllVariables.facebook.alerts.reaction,
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
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_STRING, description: 'Username is equal to' },
			{ type: LumiaVariationConditions.EQUAL_USERNAME, description: 'Username is equal to' },
		],
	},
	[LumiaAlertValues.FACEBOOK_STAR]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} sent {{amount}} stars',
		eventlistMessage: 'Stars',
		eventlistDetailedMessage: 'sent {{amount}} stars',
		acceptedVariables: AllVariables.facebook.alerts.star,
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
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER, description: 'Amount is equal to' },
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Amount is greater than' },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.FACEBOOK_SUPPORT]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: AllVariables.facebook.alerts.support,
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
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER, description: 'Amount is equal to' },
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Amount is greater than' },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.FACEBOOK_GIFT_SUBSCRIPTION]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} sent {{amount}} gift subscriptions',
		eventlistMessage: 'Gift Subscription',
		eventlistDetailedMessage: 'sent {{amount}} gift subscriptions',
		acceptedVariables: AllVariables.facebook.alerts.subscriptionGift,
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
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER, description: 'Amount is equal to' },
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Amount is greater than' },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.FACEBOOK_SHARE]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} just shared your page',
		eventlistMessage: 'Shared',
		eventlistDetailedMessage: 'shared your page',
		acceptedVariables: AllVariables.facebook.alerts.share,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.FACEBOOK_FAN]: {
		connection: LumiaIntegrations.FACEBOOK,
		message: '{{username}} became a fan',
		eventlistMessage: 'Fan',
		eventlistDetailedMessage: 'became a fan',
		acceptedVariables: AllVariables.facebook.alerts.fan,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	// },
	// trovo: {
	[LumiaAlertValues.TROVO_FIRST_CHATTER]: {
		connection: LumiaIntegrations.TROVO,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.trovo.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TROVO_ENTRANCE]: {
		connection: LumiaIntegrations.TROVO,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.trovo.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Username is equal to',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TROVO_STREAM_LIVE]: {
		connection: LumiaIntegrations.TROVO,
		message: 'Trovo Stream is now live',
		acceptedVariables: AllVariables.trovo.alerts.streamLive,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TROVO_STREAM_OFFLINE]: {
		connection: LumiaIntegrations.TROVO,
		message: 'Trovo Stream is now offline',
		acceptedVariables: AllVariables.trovo.alerts.streamOffline,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TROVO_CHANNEL_JOIN]: {
		connection: LumiaIntegrations.TROVO,
		message: '{{username}} just joined the channel',
		eventlistMessage: 'Join',
		eventlistDetailedMessage: 'joined the channel',
		acceptedVariables: AllVariables.trovo.alerts.channelJoin,
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
		connection: LumiaIntegrations.TROVO,
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.trovo.alerts.follower,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TROVO_SUBSCRIBER]: {
		connection: LumiaIntegrations.TROVO,
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: AllVariables.trovo.alerts.subscriber,
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
		connection: LumiaIntegrations.TROVO,
		message: '{{gifter}} gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		eventlistMessage: 'Gifted {{giftAmount}} subs',
		eventlistDetailedMessage: 'gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		acceptedVariables: AllVariables.trovo.alerts.subscriptionGift,
		quickActions: [
			{
				label: 'Gift 1 Sub',
				dynamic: { value: 1000, giftAmount: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights',
					recipientsRaw: [{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } }],
					giftAmount: 1,
					totalGifts: 1,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day ones',
				},
			},
			{
				label: 'Gift 5 Subs',
				dynamic: { value: 1000, giftAmount: 5 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights,lumiastream,lumiatwitch,lumiakick,rgblumia',
					recipientsRaw: [
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiatwitch', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'rgblumia', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
					],
					giftAmount: 5,
					totalGifts: 5,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: 1000,
					subPlanName: 'My Day ones',
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
				label: 'Gift Recipients',
				variableField: 'recipients',
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
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Great stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{ type: LumiaVariationConditions.EQUAL_NUMBER },
			{ type: LumiaVariationConditions.GREATER_NUMBER },
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TROVO_RAID]: {
		connection: LumiaIntegrations.TROVO,
		message: '{{username}} raided with {{viewers}} viewers',
		eventlistMessage: 'Raided',
		eventlistDetailedMessage: 'raided with {{viewers}} viewers',
		acceptedVariables: AllVariables.trovo.alerts.raid,
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
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	// },
	// tiktok: {
	[LumiaAlertValues.TIKTOK_FIRST_CHATTER]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.tiktok.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TIKTOK_ENTRANCE]: {
		connection: LumiaIntegrations.TIKTOK,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.tiktok.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Username is equal to',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TIKTOK_FOLLOWER]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.tiktok.alerts.follower,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TIKTOK_LIKE]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} liked the stream {{userLikeCount}} times to make a total of {{totalLikeCount}} likes',
		eventlistMessage: 'Liked',
		eventlistDetailedMessage: 'liked the stream {{userLikeCount}} times',
		acceptedVariables: AllVariables.tiktok.alerts.like,
		quickActions: [
			{
				label: '200 User Likes',
				dynamic: { value: 200 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 200,
					totalLikeCount: 1000,
				},
			},
			{
				label: '1000 User Likes',
				dynamic: { value: 1000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 1000,
					totalLikeCount: 5000,
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
				dynamicField: 'value',
				variableField: 'userLikeCount',
				required: true,
				default: 100,
			},
			{
				type: 'number',
				label: 'Total Like Count',
				variableField: 'totalLikeCount',
				required: false,
				default: 1000,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'User Like Count Greater Than' }],
	},
	[LumiaAlertValues.TIKTOK_TOTAL_LIKES]: {
		connection: LumiaIntegrations.TIKTOK,
		message: 'Reached {{totalLikeCount}} likes',
		eventlistMessage: 'Total Likes {{totalLikeCount}}',
		eventlistDetailedMessage: 'reached {{totalLikeCount}} likes',
		acceptedVariables: AllVariables.tiktok.alerts.like,
		eventlistSpecialUsername: 'Total Likes',
		quickActions: [
			{
				label: '1000 Total Likes',
				dynamic: { value: 1000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 200,
					totalLikeCount: 1000,
				},
			},
			{
				label: '5000 Total Likes',
				dynamic: { value: 5000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 200,
					totalLikeCount: 5000,
				},
			},
			{
				label: '25000 Total Likes',
				dynamic: { value: 25000 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					userLikeCount: 200,
					totalLikeCount: 25000,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Like Count',
				dynamicField: 'value',
				variableField: 'totalLikeCount',
				required: true,
				default: 1000,
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Like Count Greater Than' }],
	},
	[LumiaAlertValues.TIKTOK_GIFT]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} sent x{{giftAmount}} {{giftName}}',
		eventlistMessage: 'Gift',
		eventlistDetailedMessage: 'sent x{{giftAmount}} {{giftName}}',
		acceptedVariables: AllVariables.tiktok.alerts.gift,
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
					diamonds: 1,
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
					diamonds: 50,
				},
			},
			{
				label: 'Boiling Cauldron worth 500 Coins',
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
					diamonds: 250,
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
			{ type: LumiaVariationConditions.RANDOM, description: 'alerts.random' },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Gift Name is equal to',
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
				description: 'Coins is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Coins is greater than',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TIKTOK_SUBSCRIBER]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscribed',
		eventlistDetailedMessage: 'became a subscriber',
		acceptedVariables: AllVariables.tiktok.alerts.subscriber,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TIKTOK_SHARE]: {
		connection: LumiaIntegrations.TIKTOK,
		message: '{{username}} shared your stream',
		eventlistMessage: 'Shared',
		eventlistDetailedMessage: 'shared your stream',
		acceptedVariables: AllVariables.tiktok.alerts.share,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.TIKTOK_STREAM_END]: {
		connection: LumiaIntegrations.TIKTOK,
		message: 'Tiktok stream ended',
		eventlistMessage: 'Stream ended',
		eventlistDetailedMessage: 'stream ended',
		acceptedVariables: AllVariables.tiktok.alerts.streamEnd,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.TIKTOK_NEW_VIDEO]: {
		connection: LumiaIntegrations.TIKTOK,
		message: 'Tiktok new video',
		eventlistMessage: 'New video',
		eventlistDetailedMessage: 'new video',
		acceptedVariables: AllVariables.tiktok.alerts.newVideo,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// kick: {
	[LumiaAlertValues.KICK_POINTS]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} redeemed {{command}} for {{amount}} points',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{command}} for {{amount}} points',
		acceptedVariables: AllVariables.lumiastream.chat.kickPoints,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Command name is equal to',
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
				description: 'Amount is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Amount is greater than',
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
	[LumiaAlertValues.KICK_FIRST_CHATTER]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.kick.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.KICK_ENTRANCE]: {
		connection: LumiaIntegrations.KICK,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.kick.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Username is equal to',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.KICK_FOLLOWER]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.kick.alerts.follower,
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
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }, { type: LumiaVariationConditions.EQUAL_USERNAME }],
	},
	[LumiaAlertValues.KICK_SESSION_FOLLOWERS]: {
		connection: LumiaIntegrations.KICK,
		message: 'Reached {{total}} followers',
		eventlistMessage: 'Total Followers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} followers',
		acceptedVariables: AllVariables.kick.alerts.sessionFollowers,
		eventlistSpecialUsername: 'Total Followers',
		quickActions: [
			{
				label: '10 Total Followers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Followers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Followers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Followers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Follower Count is greater than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Follower Count is a multiple of' },
		],
	},
	[LumiaAlertValues.KICK_SUBSCRIBER]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} just subscribed with a {{tier}} sub!',
		eventlistMessage: '{{tier}} Sub',
		eventlistDetailedMessage: 'subscribed with a {{tier}} sub',
		acceptedVariables: AllVariables.kick.alerts.subscriber,
		quickActions: [
			{
				label: 'Tier 1 Sub',
				dynamic: { value: '1' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Great Stream',
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: '1',
					subPlanName: 'My Day ones',
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
				label: 'Months subscribed',
				dynamicField: 'subMonths',
				variableField: 'subMonths',
				required: false,
				default: 1,
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
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL,
				description: 'Months subscribed is equal to',
			},
			{
				type: LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER,
				description: 'Months subscribed is greater than',
			},
		],
	},
	[LumiaAlertValues.KICK_SESSION_SUBS]: {
		connection: LumiaIntegrations.KICK,
		message: 'Reached {{total}} subscribers',
		eventlistMessage: 'Total Subscribers {{total}}',
		eventlistDetailedMessage: 'reached {{total}} subscribers',
		acceptedVariables: AllVariables.kick.alerts.sessionSubs,
		eventlistSpecialUsername: 'Total Subscribers',
		quickActions: [
			{
				label: '10 Total Subscribers',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Subscribers',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Subscribers',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Subscribers',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Subscriber Count is greater than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Subscriber Count is a multiple of' },
		],
	},
	[LumiaAlertValues.KICK_GIFT_SUBSCRIPTION]: {
		connection: LumiaIntegrations.KICK,
		message: '{{gifter}} gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		eventlistMessage: 'Gifted {{giftAmount}} subs',
		eventlistDetailedMessage: 'gifted {{giftAmount}} {{tier}} subs to {{recipients}}',
		acceptedVariables: AllVariables.kick.alerts.subscriptionGift,
		quickActions: [
			{
				label: 'Gift 1 Sub',
				dynamic: { value: '1', giftAmount: 1 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights',
					recipientsRaw: [{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } }],
					giftAmount: 1,
					totalGifts: 1,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: '1',
					subPlanName: 'My Day ones',
				},
			},
			{
				label: 'Gift 5 Subs',
				dynamic: { value: '1', giftAmount: 5 },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					gifter: 'lumiastream',
					message: 'Great Stream',
					recipients: 'worldlights,lumiastream,lumiatwitch,lumiakick,rgblumia',
					recipientsRaw: [
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiastream', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'lumiatwitch', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'worldlights', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
						{ username: 'rgblumia', avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures', userId: '123', userLevels: { subscriber: true } },
					],
					giftAmount: 5,
					totalGifts: 5,
					subMonths: 1,
					tier: 'Tier 1',
					subPlan: '1',
					subPlanName: 'My Day ones',
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
				label: 'Gift Recipients',
				variableField: 'recipients',
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
				type: LumiaVariationConditions.GIFT_SUB_EQUAL,
				description: 'Gift subs is equal to',
			},
			{
				type: LumiaVariationConditions.GIFT_SUB_GREATER,
				description: 'Gift subs is greater than',
			},
		],
	},
	[LumiaAlertValues.KICK_SESSION_GIFT_SUBSCRIPTIONS]: {
		connection: LumiaIntegrations.KICK,
		message: 'Reached {{total}} gift subscriptions',
		eventlistMessage: 'Total Gift Subscriptions {{total}}',
		eventlistDetailedMessage: 'reached {{total}} gift subscriptions',
		acceptedVariables: AllVariables.kick.alerts.sessionGiftSubscriptions,
		eventlistSpecialUsername: 'Total Gift Subscriptions',
		quickActions: [
			{
				label: '10 Total Gift Subscriptions',
				dynamic: { value: 10, total: 10, previousTotal: 5 },
				extraSettings: {
					total: 10,
					previousTotal: 5,
				},
			},
			{
				label: '50 Total Gift Subscriptions',
				dynamic: { value: 50, total: 50, previousTotal: 2 },
				extraSettings: {
					total: 50,
					previousTotal: 2,
				},
			},
			{
				label: '100 Total Gift Subscriptions',
				dynamic: { value: 100, total: 100, previousTotal: 50 },
				extraSettings: {
					total: 100,
					previousTotal: 50,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Gift Subscriptions',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 10,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Gift Subscription Count is greater than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Gift Subscription Count is a multiple of' },
		],
	},
	[LumiaAlertValues.KICK_KICKS]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} sent {{name}} for {{amount}} kicks. They said "{{message}}"',
		eventlistMessage: 'Kicks',
		eventlistDetailedMessage: 'sent {{name}} for {{amount}} kicks',
		acceptedVariables: AllVariables.kick.alerts.kicks,
		quickActions: [
			{
				label: '100 kicks Hype',
				dynamic: { value: 100, name: 'Hype' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					name: 'Hype',
					type: 'BASIC',
					tier: 'BASIC',
					id: 'hype',
					message: 'This is so hype',
				},
			},
			{
				label: '500 kicks Rage Quit',
				dynamic: { value: 500, name: 'Rage Quit' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 500,
					name: 'Rage Quit',
					type: 'LEVEL_UP',
					tier: 'MID',
					id: 'rage_quit',
					message: 'Im raging!!',
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
				label: 'Amount of kicks',
				dynamicField: 'value',
				variableField: 'amount',
				required: true,
				default: 100,
			},
			{
				type: 'text',
				label: 'Name of kicks',
				dynamicField: 'name',
				variableField: 'name',
				required: true,
				default: 'Hype',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Kicks Name is equal to',
			},
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
				description: 'Kicks Amount is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Kicks Amount is greater than',
			},
		],
	},
	[LumiaAlertValues.KICK_SESSION_KICKS]: {
		connection: LumiaIntegrations.KICK,
		message: 'Reached {{total}} kicks',
		eventlistMessage: 'Total Kicks {{total}}',
		eventlistDetailedMessage: 'reached {{total}} kicks',
		acceptedVariables: AllVariables.kick.alerts.sessionKicks,
		eventlistSpecialUsername: 'Total Kicks',
		quickActions: [
			{
				label: '1000 Total Kicks',
				dynamic: { value: 1000, total: 1000, previousTotal: 500 },
				extraSettings: {
					total: 1000,
					previousTotal: 500,
				},
			},
			{
				label: '20000 Total Kicks',
				dynamic: { value: 20000, total: 20000, previousTotal: 10000 },
				extraSettings: {
					total: 20000,
					previousTotal: 10000,
				},
			},
			{
				label: '100000 Total Kicks',
				dynamic: { value: 100000, total: 100000, previousTotal: 50000 },
				extraSettings: {
					total: 100000,
					previousTotal: 50000,
				},
			},
		],
		inputFields: [
			{
				type: 'number',
				label: 'Total Kicks',
				dynamicField: 'value',
				variableField: 'total',
				required: true,
				default: 100,
			},
			{
				type: 'number',
				label: 'Previous Total',
				dynamicField: 'previousTotal',
				variableField: 'previousTotal',
				required: false,
				default: 0,
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.GREATER_NUMBER, description: 'Total Session Kicks Count Greater Than' },
			{ type: LumiaVariationConditions.COUNT_IS_MULTIPLE_OF, description: 'Total Session Kicks Count is a multiple of' },
		],
	},
	[LumiaAlertValues.KICK_HOST]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} hosted with {{viewers}} viewers',
		eventlistMessage: 'Hosted',
		eventlistDetailedMessage: 'hosted with {{viewers}} viewers',
		acceptedVariables: AllVariables.kick.alerts.host,
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
				description: 'Viewers is greater than',
			},
		],
	},
	[LumiaAlertValues.KICK_BANNED]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} is banned',
		eventlistMessage: 'Banned',
		eventlistDetailedMessage: 'banned',
		acceptedVariables: AllVariables.kick.alerts.banned,
		quickActions: [
			{
				label: 'Banned',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					bannedByUsername: 'lumiacove',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
				label: 'Banned By Username',
				variableField: 'bannedByUsername',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.KICK_UNBANNED]: {
		connection: LumiaIntegrations.KICK,
		message: '{{username}} is unbanned',
		eventlistMessage: 'Unbanned',
		eventlistDetailedMessage: 'unbanned',
		acceptedVariables: AllVariables.kick.alerts.unbanned,
		quickActions: [
			{
				label: 'Unbanned',
				dynamic: { value: 'lumiastream' },
				extraSettings: {
					username: 'lumiastream',
					unbannedByUsername: 'lumiacove',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
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
				label: 'Unbanned By Username',
				variableField: 'unbannedByUsername',
				required: false,
				default: 'lumiastream',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	// },
	// discord: {
	[LumiaAlertValues.DISCORD_FIRST_CHATTER]: {
		connection: LumiaIntegrations.DISCORD,
		message: '{{username}} is the first chatter!',
		eventlistMessage: 'First Chatter',
		eventlistDetailedMessage: 'was the first chatter',
		acceptedVariables: AllVariables.discord.alerts.firstChatter,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_NUMBER,
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Username is equal to',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.DISCORD_ENTRANCE]: {
		connection: LumiaIntegrations.DISCORD,
		message: 'Welcome {{username}}',
		eventlistMessage: 'Entrance',
		eventlistDetailedMessage: '',
		acceptedVariables: AllVariables.discord.alerts.entrance,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Username is equal to',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	// },
	// streamlabs: {
	[LumiaAlertValues.STREAMLABS_DONATION]: {
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.streamlabs.alerts.donation,
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
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.streamlabs.alerts.charity,
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
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} just bought {{merch}}. They said {{message}}',
		eventlistMessage: 'Merch',
		eventlistDetailedMessage: 'bought {{merch}}',
		acceptedVariables: AllVariables.streamlabs.alerts.merch,
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
				description: 'Redemption is equal to',
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_REDEMPTION]: {
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} just redeemed {{redemption}}. They said {{message}}',
		eventlistMessage: 'Redeemed',
		eventlistDetailedMessage: 'redeemed {{redemption}}',
		acceptedVariables: AllVariables.streamlabs.alerts.redemption,
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
				description: 'Username is equal to',
			},
		],
	},
	[LumiaAlertValues.STREAMLABS_PRIMEGIFT]: {
		connection: LumiaIntegrations.STREAMLABS,
		message: '{{username}} sent a prime gift',
		eventlistMessage: 'Prime Gift',
		eventlistDetailedMessage: 'sent a prime gift',
		acceptedVariables: AllVariables.streamlabs.alerts.primeGift,
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
				description: 'Username is equal to',
			},
		],
	},
	// },
	// streamelements: {
	[LumiaAlertValues.STREAMELEMENTS_DONATION]: {
		connection: LumiaIntegrations.STREAMELEMENTS,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.streamelements.alerts.donation,
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
				description: 'Amount is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
				description: 'Amount is greater than',
			},
		],
	},
	// },
	// extralife: {
	[LumiaAlertValues.EXTRALIFE_DONATION]: {
		connection: LumiaIntegrations.EXTRALIFE,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.extralife.alerts.donation,
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
		connection: LumiaIntegrations.DONORDRIVE,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.donordrive.alerts.donation,
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
		connection: LumiaIntegrations.TILTIFY,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.tiltify.alerts.campaignDonation,
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
		connection: LumiaIntegrations.PATREON,
		message: '{{username}} just pledged {{amount}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}}',
		acceptedVariables: AllVariables.patreon.alerts.campaignPledge,
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
		connection: LumiaIntegrations.WOOCOMMERCE,
		message: 'Someone just ordered {{item}} in the amount of {{amount}}',
		eventlistMessage: 'Order',
		eventlistDetailedMessage: 'ordered {{item}}',
		eventlistSpecialUsername: 'Woocommerce',
		acceptedVariables: AllVariables.woocommerce.alerts.order,
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
		connection: LumiaIntegrations.KOFI,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.kofi.alerts.donation,
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
		connection: LumiaIntegrations.KOFI,
		message: '{{username}} just subscribed with tier {{tier}}',
		eventlistMessage: 'Subscription',
		eventlistDetailedMessage: 'subscribed with tier {{tier}}',
		acceptedVariables: AllVariables.kofi.alerts.subscription,
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
		connection: LumiaIntegrations.KOFI,
		message: '{{username}} just commisioned with amount {{amount}}',
		eventlistMessage: 'Commission',
		eventlistDetailedMessage: 'commissioned with {{amount}} {{currency}}',
		acceptedVariables: AllVariables.kofi.alerts.commission,
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
		connection: LumiaIntegrations.KOFI,
		message: '{{username}} just created a shop order with amount {{amount}}',
		eventlistMessage: 'Shop Order',
		eventlistDetailedMessage: 'created a shop order with {{amount}} {{currency}}',
		acceptedVariables: AllVariables.kofi.alerts.shopOrder,
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
	// fourthwall: {
	[LumiaAlertValues.FOURTHWALL_DONATION]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: '{{username}} just tipped {{amount}}. They said {{message}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.fourthwall.alerts.donation,
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
	[LumiaAlertValues.FOURTHWALL_SUBSCRIPTION]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: '{{username}} just subscribed',
		eventlistMessage: 'Subscription',
		eventlistDetailedMessage: 'subscribed',
		acceptedVariables: AllVariables.fourthwall.alerts.subscription,
		quickActions: [
			{
				label: 'Subscribed',
				dynamic: { value: 'Subscribed' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
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
	[LumiaAlertValues.FOURTHWALL_GIFTPURCHASE]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: '{{username}} just bought a gift with amount {{amount}}',
		eventlistMessage: 'Gift Purchase',
		eventlistDetailedMessage: 'Gift purchase with {{amount}} {{currency}}',
		acceptedVariables: AllVariables.fourthwall.alerts.shopOrder,
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
	[LumiaAlertValues.FOURTHWALL_SHOPORDER]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: '{{username}} purchased {{items}}',
		eventlistMessage: 'Shop Order',
		eventlistDetailedMessage: 'purchased {{items}}',
		acceptedVariables: AllVariables.fourthwall.alerts.shopOrder,
		quickActions: [
			{
				label: '$100',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					amount: 100,
					currency: LumiaVariationCurrency.USD,
					items: 'Shirt, Keyblade, Chaos Emerald',
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
					items: 'Shirt, Keyblade, Chaos Emerald',
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
					items: 'Shirt, Keyblade, Chaos Emerald',
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
				label: 'Items',
				variableField: 'items',
				required: true,
				default: 'Shirt, Keyblade, Chaos Emerald',
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
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_STARTED]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: '{{username}} just started a giveaway for {{giveawayName}}',
		eventlistMessage: 'Giveaway Started',
		eventlistDetailedMessage: 'started giveaway for {{giveawayName}}',
		acceptedVariables: AllVariables.fourthwall.alerts.giveawayStarted,
		quickActions: [
			{
				label: 'Test',
				dynamic: { value: 100, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					username: 'lumiastream',
					giveawayName: 'Test Item',
					giveawayId: 'TEST123',
					amount: 100,
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
				label: 'Giveaway Name',
				variableField: 'giveawayName',
				required: false,
				default: 'Test Item',
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
	[LumiaAlertValues.FOURTHWALL_GIVEAWAY_ENDED]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: 'Giveaway {{giveawayName}} ended with {{winnerCount}} winners',
		eventlistMessage: 'Giveaway Ended',
		eventlistDetailedMessage: 'giveaway ended with {{winnerCount}} winners',
		acceptedVariables: AllVariables.fourthwall.alerts.giveawayEnded,
		quickActions: [
			{
				label: 'Test',
				dynamic: { value: 3, currency: LumiaVariationCurrency.USD },
				extraSettings: {
					giveawayName: 'Test Item',
					giveawayId: 'TEST123',
					winners: ['winner1', 'winner2', 'winner3'],
					winnerCount: 3,
				},
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Giveaway Name',
				variableField: 'giveawayName',
				required: false,
				default: 'Test Item',
			},
			{
				type: 'number',
				label: 'Winner Count',
				dynamicField: 'winnerCount',
				variableField: 'winnerCount',
				required: false,
				default: 1,
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
	[LumiaAlertValues.FOURTHWALL_THANKYOU_SENT]: {
		connection: LumiaIntegrations.FOURTHWALL,
		message: 'Thank you sent to {{username}} for {{contributionType}}',
		eventlistMessage: 'Thank You Sent',
		eventlistDetailedMessage: 'thank you for {{contributionType}}',
		acceptedVariables: AllVariables.fourthwall.alerts.thankyouSent,
		quickActions: [
			{
				label: 'Order',
				dynamic: { value: 1 },
				extraSettings: {
					username: 'lumiastream',
					contributionType: 'ORDER',
					message: 'Thank you for your support!',
				},
			},
			{
				label: 'Donation',
				dynamic: { value: 1 },
				extraSettings: {
					username: 'lumiastream',
					contributionType: 'DONATION',
					message: 'Thank you for your support!',
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
				label: 'Contribution Type',
				variableField: 'contributionType',
				required: false,
				default: 'ORDER',
			},
			{
				type: 'text',
				label: 'Message',
				variableField: 'message',
				required: false,
				default: 'Thank you!',
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},

	// },
	// twitter: {
	[LumiaAlertValues.TWITTER_FOLLOWER]: {
		connection: LumiaIntegrations.TWITTER,
		message: '{{username}} just followed',
		eventlistMessage: 'Followed',
		eventlistDetailedMessage: 'became a follower',
		acceptedVariables: AllVariables.twitter.alerts.follower,
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
				description: 'Likes Count is greater than',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	[LumiaAlertValues.TWITTER_LIKE]: {
		connection: LumiaIntegrations.TWITTER,
		message: 'Reached a total likes of {{likes}} on Twitter',
		eventlistSpecialUsername: 'Twitter',
		eventlistMessage: 'Like',
		eventlistDetailedMessage: 'received a like',
		acceptedVariables: AllVariables.twitter.alerts.like,
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
				description: 'Retweet Count is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Retweet Count is greater than',
			},
		],
	},
	[LumiaAlertValues.TWITTER_RETWEET]: {
		connection: LumiaIntegrations.TWITTER,
		message: '{{username}} retweeted',
		eventlistMessage: 'Retweet',
		eventlistDetailedMessage: 'retweeted your tweet',
		acceptedVariables: AllVariables.twitter.alerts.retweet,
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
				description: 'Retweet Count is equal to',
			},
			{
				type: LumiaVariationConditions.GREATER_NUMBER,
				description: 'Retweet Count is greater than',
			},
			{ type: LumiaVariationConditions.EQUAL_USERNAME },
		],
	},
	// },
	// spotify: {
	[LumiaAlertValues.SPOTIFY_SWITCH_SONG]: {
		connection: LumiaIntegrations.SPOTIFY,
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{name}} - {{artists}}',
		acceptedVariables: AllVariables.spotify.alerts.switchSong,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.SPOTIFY_SONG_PLAYED]: {
		connection: LumiaIntegrations.SPOTIFY,
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} - {{artists}} playing',
		acceptedVariables: AllVariables.spotify.alerts.songPlayed,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.SPOTIFY_SONG_PAUSED]: {
		connection: LumiaIntegrations.SPOTIFY,
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'Spotify',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'paused',
		acceptedVariables: AllVariables.spotify.alerts.songPaused,
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
				description: 'Name is equal to',
			},
		],
	},
	// },
	// youtubemusic: {
	[LumiaAlertValues.YOUTUBEMUSIC_SWITCH_SONG]: {
		connection: LumiaIntegrations.YOUTUBEMUSIC,
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{name}} - {{artists}}',
		acceptedVariables: AllVariables.youtubemusic.alerts.switchSong,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PLAYED]: {
		connection: LumiaIntegrations.YOUTUBEMUSIC,
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} - {{artists}} playing',
		acceptedVariables: AllVariables.youtubemusic.alerts.songPlayed,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.YOUTUBEMUSIC_SONG_PAUSED]: {
		connection: LumiaIntegrations.YOUTUBEMUSIC,
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'Youtubemusic',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'paused',
		acceptedVariables: AllVariables.youtubemusic.alerts.songPaused,
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
				description: 'Name is equal to',
			},
		],
	},
	// Nowplaying: {
	[LumiaAlertValues.NOWPLAYING_SWITCH_SONG]: {
		connection: LumiaIntegrations.NOWPLAYING,
		message: 'Song switched to {{title}}',
		eventlistSpecialUsername: 'Now Playing',
		eventlistMessage: 'Switch Song',
		eventlistDetailedMessage: 'song switched to {{title}} - {{artist}}',
		acceptedVariables: AllVariables.nowplaying.alerts.switchSong,
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
				description: 'Title is equal to',
			},
		],
	},
	// },
	// vlc: {
	[LumiaAlertValues.VLC_SWITCH_SONG]: {
		connection: LumiaIntegrations.VLC,
		message: 'Song switched to {{name}}',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Switched',
		eventlistDetailedMessage: 'song switched to {{name}}',
		acceptedVariables: AllVariables.vlc.alerts.switchSong,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.VLC_SONG_PLAYED]: {
		connection: LumiaIntegrations.VLC,
		message: 'Song {{name}} is now playing',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Played',
		eventlistDetailedMessage: 'song {{name}} playing',
		acceptedVariables: AllVariables.vlc.alerts.songPlayed,
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
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.VLC_SONG_PAUSED]: {
		connection: LumiaIntegrations.VLC,
		message: 'Song {{name}} paused',
		eventlistSpecialUsername: 'VLC',
		eventlistMessage: 'Song Paused',
		eventlistDetailedMessage: 'paused',
		acceptedVariables: AllVariables.vlc.alerts.songPaused,
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
				description: 'Name is equal to',
			},
		],
	},
	// },
	// treatstream: {
	[LumiaAlertValues.TREATSTREAM_TREAT]: {
		connection: LumiaIntegrations.TREATSTREAM,
		message: '{{username}} sent {{treat}}',
		eventlistMessage: 'Treat',
		eventlistDetailedMessage: 'sent {{treat}} treat',
		acceptedVariables: AllVariables.treatstream.alerts.treat,
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
				description: 'Treat is equal to',
			},
		],
	},
	// },
	// tipeeestream: {
	[LumiaAlertValues.TIPEEESTREAM_DONATION]: {
		connection: LumiaIntegrations.TIPEEESTREAM,
		message: '{{username}} just tipped {{amount}}',
		eventlistMessage: 'Donation',
		eventlistDetailedMessage: 'tipped {{amount}} {{currency}} "{{message}}"',
		acceptedVariables: AllVariables.tipeeestream.alerts.donation,
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
		connection: LumiaIntegrations.OBS,
		message: 'OBS scene switched to {{scene}}',
		acceptedVariables: AllVariables.obs.alerts.switchScene,
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
				description: 'Scene is equal to',
			},
		],
	},
	[LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS scene item {{item}} became visibile',
		acceptedVariables: AllVariables.obs.alerts.sceneItemVisibility,
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
				description: 'Scene item is equal to',
			},
		],
	},
	[LumiaAlertValues.OBS_SCENE_ITEM_HIDDEN]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS scene item {{item}} became hidden',
		acceptedVariables: AllVariables.obs.alerts.sceneItemHidden,
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
				description: 'Scene item is equal to',
			},
		],
	},
	[LumiaAlertValues.OBS_SWITCH_PROFILE]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS profile switched to {{profile}}',
		acceptedVariables: AllVariables.obs.alerts.switchProfile,
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
				description: 'Profile is equal to',
			},
		],
	},
	[LumiaAlertValues.OBS_SWITCH_TRANSITION]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS transition switched',
		acceptedVariables: AllVariables.obs.alerts.switchTransition,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_TRANSITION_BEGIN]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS transition started',
		acceptedVariables: AllVariables.obs.alerts.transitionBegin,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_TRANSITION_END]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS transition ended',
		acceptedVariables: AllVariables.obs.alerts.transitionEnd,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_STREAM_STARTING]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS stream started',
		acceptedVariables: AllVariables.obs.alerts.streamStarting,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_STREAM_STOPPING]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS stream stopped',
		acceptedVariables: AllVariables.obs.alerts.streamStopping,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_RECORDING_STARTING]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS recording started',
		acceptedVariables: AllVariables.obs.alerts.recordingStarting,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_RECORDING_STOPPING]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS recording stopped',
		acceptedVariables: AllVariables.obs.alerts.recordingStopping,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_REPLAY_BUFFER_SAVED]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS replay buffer saved',
		acceptedVariables: AllVariables.obs.alerts.replayBufferSaved,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_VERTICAL_BACKTRACK_SAVED]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS recording stopped',
		acceptedVariables: AllVariables.obs.alerts.verticalBacktrackSaved,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.OBS_VENDOR_EVENT]: {
		connection: LumiaIntegrations.OBS,
		message: 'OBS vendor event',
		acceptedVariables: AllVariables.obs.alerts.vendorEvent,
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Vendor event is equal to',
			},
		],
	},
	// },
	// slobs: {
	[LumiaAlertValues.SLOBS_SWITCH_SCENE]: {
		connection: LumiaIntegrations.SLOBS,
		message: 'SLOBS scene switched to {{scene}}',
		acceptedVariables: AllVariables.slobs.alerts.switchScene,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: {
		connection: LumiaIntegrations.SLOBS,
		message: 'SLOBS scene collection switched',
		acceptedVariables: AllVariables.slobs.alerts.switchSceneCollection,
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: {
		connection: LumiaIntegrations.SLOBS,
		message: 'SLOBS scene item {{item}} became visibile',
		acceptedVariables: AllVariables.slobs.alerts.sceneItemVisibility,
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
				description: 'Scene is equal to',
			},
		],
	},
	[LumiaAlertValues.SLOBS_SCENE_ITEM_HIDDEN]: {
		connection: LumiaIntegrations.SLOBS,
		message: 'SLOBS scene item {{item}} became hidden',
		acceptedVariables: AllVariables.slobs.alerts.sceneItemHidden,
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
				description: 'Scene item is equal to',
			},
		],
	},
	[LumiaAlertValues.STREAMERBOT_ACTION]: {
		connection: LumiaIntegrations.STREAMERBOT,
		message: '{{action}} action triggered',
		acceptedVariables: AllVariables.streamerbot.alerts.action,
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
				description: 'Action is equal to',
			},
		],
	},
	[LumiaAlertValues.PULSE_HEARTRATE]: {
		connection: LumiaIntegrations.PULSE,
		message: 'Heart rate changed to {{heartrate}}',
		acceptedVariables: AllVariables.pulse.alerts.heartrate,
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
				description: 'Heart Rate is greater than',
			},
		],
	},
	// },
	// crowdcontrol: {
	[LumiaAlertValues.CROWDCONTROL_EFFECT]: {
		connection: LumiaIntegrations.CROWDCONTROL,
		message: '{{username}} sent {{effect}}',
		eventlistMessage: 'Effect',
		eventlistDetailedMessage: 'sent effect {{effect}} for game {{game}}',
		acceptedVariables: AllVariables.crowdcontrol.alerts.effect,
		quickActions: [
			{
				label: 'New Effect',
				dynamic: { value: 'Big Light' },
				extraSettings: {
					username: 'lumiastream',
					avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					effect: 'Big Light',
					game: 'Lumia Stream',
					artwork: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-70x70.png',
					message: 'Turn on the lights',
					duration: 5,
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
				label: 'Effect',
				variableField: 'effect',
				required: true,
				default: 'Big Light',
			},
			{
				type: 'text',
				label: 'Game',
				variableField: 'game',
				required: true,
				default: 'Lumia Stream',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Effect is equal to',
			},
		],
	},
	// },
	// vtube: {
	[LumiaAlertValues.VTUBESTUDIO_HOTKEY_TRIGGERED]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} hotkey triggered',
		acceptedVariables: AllVariables.vtubestudio.alerts.hotkeyTriggered,
		quickActions: [
			{
				label: 'Hotkey Triggered',
				dynamic: { value: 'tomato_splat' },
				extraSettings: { name: 'tomato_splat', modelName: 'Light Bulb', modelId: '123' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Hotkey',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Name of hotkey',
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_MODEL_LOADED]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} model loaded',
		acceptedVariables: AllVariables.vtubestudio.alerts.modelLoaded,
		quickActions: [
			{
				label: 'Model Loaded',
				dynamic: { value: 'Light Bulb' },
				extraSettings: { name: 'Light Bulb', modelName: 'Light Bulb', modelId: '123' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Model',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_START]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} animation started',
		acceptedVariables: AllVariables.vtubestudio.alerts.animationStart,
		quickActions: [
			{
				label: 'Animation Start',
				dynamic: { value: 'Go Bright' },
				extraSettings: { name: 'Go Bright', modelName: 'Light Bulb', modelId: '123', animationName: 'Go Bright', animationLength: 40.3 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Animation',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_ANIMATION_END]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} animation ended',
		acceptedVariables: AllVariables.vtubestudio.alerts.animationEnd,
		quickActions: [
			{
				label: 'Animation End',
				dynamic: { value: 'Go Bright' },
				extraSettings: { name: 'Go Bright', modelName: 'Light Bulb', modelId: '123', animationName: 'Go Bright', animationLength: 40.3 },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Animation',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Name is equal to',
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_ITEM_ADDED]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} item added',
		acceptedVariables: AllVariables.vtubestudio.alerts.itemAdded,
		quickActions: [
			{
				label: 'Item Add',
				dynamic: { value: 'Bulbs' },
				extraSettings: { name: 'Bulbs' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Bulb',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Item is equal to',
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_ITEM_REMOVED]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} item removed',
		acceptedVariables: AllVariables.vtubestudio.alerts.itemRemoved,
		quickActions: [
			{
				label: 'Item Remove',
				dynamic: { value: 'Bulbs' },
				extraSettings: { name: 'Bulbs' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Bulb',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Item is equal to',
			},
		],
	},
	[LumiaAlertValues.VTUBESTUDIO_BACKGROUND_CHANGED]: {
		connection: LumiaIntegrations.VTUBESTUDIO,
		message: '{{name}} background changed',
		acceptedVariables: AllVariables.vtubestudio.alerts.backgroundChanged,
		quickActions: [
			{
				label: 'Background Change',
				dynamic: { value: 'night_time' },
				extraSettings: { name: 'night_time' },
			},
		],
		inputFields: [
			{
				type: 'text',
				label: 'Name',
				dynamicField: 'value',
				variableField: 'name',
				required: true,
				default: 'Background',
			},
		],
		LumiaVariationConditions: [
			{ type: LumiaVariationConditions.RANDOM },
			{
				type: LumiaVariationConditions.EQUAL_STRING,
				description: 'Background is equal to',
			},
		],
	},
	[LumiaAlertValues.MELD_STREAM_STARTING]: {
		connection: LumiaIntegrations.MELD,
		message: '{{name}} is starting',
		acceptedVariables: AllVariables.meld.alerts.streamStarting,
		quickActions: [
			{
				label: 'Stream Starting',
				dynamic: { value: 'Go Bright' },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.MELD_STREAM_STOPPING]: {
		connection: LumiaIntegrations.MELD,
		message: '{{name}} is stopping',
		acceptedVariables: AllVariables.meld.alerts.streamStopping,
		quickActions: [
			{
				label: 'Stream Stop',
				dynamic: { value: 'Go Bright' },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.MELD_RECORDING_STARTING]: {
		connection: LumiaIntegrations.MELD,
		message: '{{name}} is starting',
		acceptedVariables: AllVariables.meld.alerts.recordingStarting,
		quickActions: [
			{
				label: 'Recording Started',
				dynamic: { value: 'Go Bright' },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
	[LumiaAlertValues.MELD_RECORDING_STOPPING]: {
		connection: LumiaIntegrations.MELD,
		message: '{{name}} is stopping',
		acceptedVariables: AllVariables.meld.alerts.recordingStopping,
		quickActions: [
			{
				label: 'Recording Stop',
				dynamic: { value: 'Go Bright' },
			},
		],
		LumiaVariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
	},
};
