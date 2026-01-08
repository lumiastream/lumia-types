export type ViewerProfileAchievementMetric =
	| 'totalCommands'
	| 'uniqueCommands'
	| 'totalChatbotCommands'
	| 'totalPointsCommands'
	| 'totalPointsSpent'
	| 'totalTwitchExtensionsCommands'
	| 'totalBitsSpent'
	| 'totalKicksSpent'
	| 'totalMoneySpent'
	| 'totalAlerts'
	| 'uniqueAlerts'
	| 'totalCommandsAndAlerts'
	| 'daysActive'
	| 'platforms';

export type ViewerProfileAchievementDefinition = {
	id: string;
	label: string;
	description: string;
	metric: ViewerProfileAchievementMetric;
	threshold: number;
};

export const VIEWER_PROFILE_ACHIEVEMENTS: ViewerProfileAchievementDefinition[] = [
	{
		id: 'first-command',
		label: 'First Command',
		description: 'Triggered a command.',
		metric: 'totalCommands',
		threshold: 1,
	},
	{
		id: 'command-explorer',
		label: 'Command Explorer',
		description: 'Triggered 10 unique commands.',
		metric: 'uniqueCommands',
		threshold: 10,
	},
	{
		id: 'command-variety-pack',
		label: 'Command Variety Pack',
		description: 'Triggered 40 unique commands.',
		metric: 'uniqueCommands',
		threshold: 40,
	},
	{
		id: 'command-regular',
		label: 'Command Regular',
		description: 'Triggered 25 commands.',
		metric: 'totalCommands',
		threshold: 25,
	},
	{
		id: 'command-master',
		label: 'Command Master',
		description: 'Triggered 100 commands.',
		metric: 'totalCommands',
		threshold: 100,
	},
	{
		id: 'command-addict',
		label: 'Command Addict',
		description: 'Triggered 250 commands.',
		metric: 'totalCommands',
		threshold: 250,
	},
	{
		id: 'chatbot-whisperer',
		label: 'Chatbot Whisperer',
		description: 'Triggered 25 chatbot commands.',
		metric: 'totalChatbotCommands',
		threshold: 25,
	},
	{
		id: 'points-spender',
		label: 'Points Spender',
		description: 'Triggered 50 Twitch or Kick points commands.',
		metric: 'totalPointsCommands',
		threshold: 50,
	},
	{
		id: 'points-grinder',
		label: 'Points Grinder',
		description: 'Spent 5,000 points.',
		metric: 'totalPointsSpent',
		threshold: 5000,
	},
	{
		id: 'points-mogul',
		label: 'Points Mogul',
		description: 'Spent 25,000 points.',
		metric: 'totalPointsSpent',
		threshold: 25000,
	},
	{
		id: 'extension-explorer',
		label: 'Extension Explorer',
		description: 'Triggered 15 Twitch extensions commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 15,
	},
	{
		id: 'bits-backer',
		label: 'Bits Backer',
		description: 'Spent 1,000 bits.',
		metric: 'totalBitsSpent',
		threshold: 1000,
	},
	{
		id: 'bits-tycoon',
		label: 'Bits Tycoon',
		description: 'Spent 10,000 bits.',
		metric: 'totalBitsSpent',
		threshold: 10000,
	},
	{
		id: 'kicks-supporter',
		label: 'Kicks Supporter',
		description: 'Spent 250 kicks.',
		metric: 'totalKicksSpent',
		threshold: 250,
	},
	{
		id: 'kicks-patron',
		label: 'Kicks Patron',
		description: 'Spent 1,000 kicks.',
		metric: 'totalKicksSpent',
		threshold: 1000,
	},
	{
		id: 'donation-supporter',
		label: 'Donation Supporter',
		description: 'Donated 250 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 250,
	},
	{
		id: 'donation-patron',
		label: 'Donation Patron',
		description: 'Donated 1,000 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 1000,
	},
	{
		id: 'alert-trigger',
		label: 'Alert Trigger',
		description: 'Triggered an alert.',
		metric: 'totalAlerts',
		threshold: 1,
	},
	{
		id: 'alert-curator',
		label: 'Alert Curator',
		description: 'Triggered 10 unique alerts.',
		metric: 'uniqueAlerts',
		threshold: 10,
	},
	{
		id: 'alert-storm',
		label: 'Alert Storm',
		description: 'Triggered 10 alerts.',
		metric: 'totalAlerts',
		threshold: 10,
	},
	{
		id: 'power-user',
		label: 'Power User',
		description: 'Triggered 500 commands or alerts combined.',
		metric: 'totalCommandsAndAlerts',
		threshold: 500,
	},
	{
		id: 'loyal-regular',
		label: 'Loyal Regular',
		description: 'Active across 60 days or more.',
		metric: 'daysActive',
		threshold: 60,
	},
	{
		id: 'multi-platform',
		label: 'Multi-Platform',
		description: 'Seen on multiple platforms.',
		metric: 'platforms',
		threshold: 2,
	},
];
