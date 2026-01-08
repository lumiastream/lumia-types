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
	| 'allRounder';

export type ViewerProfileAchievementDefinition = {
	id: string;
	label: string;
	description: string;
	metric: ViewerProfileAchievementMetric;
	threshold: number;
	connectionKeys?: string[];
};

export const VIEWER_PROFILE_ACHIEVEMENTS: ViewerProfileAchievementDefinition[] = [
	// ───────── Command Usage ─────────
	{
		id: 'commands-regular',
		label: 'Commands Regular',
		description: 'Triggered 25 commands.',
		metric: 'totalCommands',
		threshold: 25,
	},
	{
		id: 'commands-runner',
		label: 'Commands Runner',
		description: 'Triggered 50 commands.',
		metric: 'totalCommands',
		threshold: 50,
	},
	{
		id: 'commands-overdrive',
		label: 'Commands Overdrive',
		description: 'Triggered 100 commands.',
		metric: 'totalCommands',
		threshold: 100,
	},
	{
		id: 'commands-speedster',
		label: 'Commands Speedster',
		description: 'Triggered 250 commands.',
		metric: 'totalCommands',
		threshold: 250,
	},
	{
		id: 'commands-blazer',
		label: 'Commands Blazer',
		description: 'Triggered 500 commands.',
		metric: 'totalCommands',
		threshold: 500,
	},
	{
		id: 'commands-veteran',
		label: 'Commands Veteran',
		description: 'Triggered 1,000 commands.',
		metric: 'totalCommands',
		threshold: 1000,
	},
	{
		id: 'commands-legend',
		label: 'Commands Legend',
		description: 'Triggered 5,000 commands.',
		metric: 'totalCommands',
		threshold: 5000,
	},

	// ───────── Unique Commands ─────────
	{
		id: 'commands-unique-expolorer',
		label: 'Commands Explorer',
		description: 'Used 10 different commands.',
		metric: 'uniqueCommands',
		threshold: 10,
	},
	{
		id: 'commands-unique-adventurer',
		label: 'Commands Adventurer',
		description: 'Used 20 different commands.',
		metric: 'uniqueCommands',
		threshold: 20,
	},

	// ───────── Channel Points ─────────
	{
		id: 'twitch-points-spark',
		label: 'Points Starter',
		description: 'Triggered 50 channel point commands.',
		metric: 'totalPointsCommands',
		threshold: 50,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-points-regular',
		label: 'Points Regular',
		description: 'Triggered 200 channel point commands.',
		metric: 'totalPointsCommands',
		threshold: 200,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-points-glow',
		label: 'Points Spender',
		description: 'Spent 5,000 channel points.',
		metric: 'totalPointsSpent',
		threshold: 5000,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-points-beacon',
		label: 'Points Beacon',
		description: 'Spent 25,000 channel points.',
		metric: 'totalPointsSpent',
		threshold: 25000,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-points-tycoon',
		label: 'Points Tycoon',
		description: 'Spent 100,000 channel points.',
		metric: 'totalPointsSpent',
		threshold: 100000,
		connectionKeys: ['twitch'],
	},

	// ───────── Twitch Extensions ─────────
	{
		id: 'twitch-extension-explorer',
		label: 'Twitch Extension Explorer',
		description: 'Used 5 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 5,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-extension-adventurer-ii',
		label: 'Twitch Extension Adventurer II',
		description: 'Used 10 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 10,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-extension-adventurer',
		label: 'Twitch Extension Adventurer',
		description: 'Used 25 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 25,
		connectionKeys: ['twitch'],
	},
	{
		id: 'twitch-extension-operator',
		label: 'Twitch Extension Operator',
		description: 'Used 100 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 100,
		connectionKeys: ['twitch'],
	},

	// ───────── Bits ─────────
	{
		id: 'bits-spark',
		label: 'Bits Spark',
		description: 'Spent 100 bits.',
		metric: 'totalBitsSpent',
		threshold: 100,
		connectionKeys: ['twitch'],
	},
	{
		id: 'bits-beam',
		label: 'Bits Beam',
		description: 'Spent 500 bits.',
		metric: 'totalBitsSpent',
		threshold: 500,
		connectionKeys: ['twitch'],
	},
	{
		id: 'bits-glow',
		label: 'Bits Glow',
		description: 'Spent 1,000 bits.',
		metric: 'totalBitsSpent',
		threshold: 1000,
		connectionKeys: ['twitch'],
	},
	{
		id: 'bits-supernova',
		label: 'Bits Supernova',
		description: 'Spent 5,000 bits.',
		metric: 'totalBitsSpent',
		threshold: 5000,
		connectionKeys: ['twitch'],
	},

	// ───────── Kick ─────────
	{
		id: 'kick-spark',
		label: 'Kicks Starter',
		description: 'Spent 50 kicks.',
		metric: 'totalKicksSpent',
		threshold: 50,
		connectionKeys: ['kick'],
	},
	{
		id: 'kick-glow',
		label: 'Kicks Supporter',
		description: 'Spent 100 kicks.',
		metric: 'totalKicksSpent',
		threshold: 100,
		connectionKeys: ['kick'],
	},
	{
		id: 'kick-beam',
		label: 'Kick Power User',
		description: 'Spent 500 kicks.',
		metric: 'totalKicksSpent',
		threshold: 500,
		connectionKeys: ['kick'],
	},
	{
		id: 'kick-supernova',
		label: 'Kick Superstar',
		description: 'Spent 1,000 kicks.',
		metric: 'totalKicksSpent',
		threshold: 1000,
		connectionKeys: ['kick'],
	},

	// ───────── Donations ─────────
	{
		id: 'light-supporter',
		label: 'Supporter',
		description: 'Donated 5 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 5,
	},
	{
		id: 'light-backer',
		label: 'Backer',
		description: 'Donated 25 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 25,
	},
	{
		id: 'light-advocate',
		label: 'Advocate',
		description: 'Donated 50 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 50,
	},
	{
		id: 'light-hero',
		label: 'Hero',
		description: 'Donated 100 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 100,
	},
	{
		id: 'light-patron',
		label: 'Patron',
		description: 'Donated 100 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 100,
	},

	// ───────── Alerts ─────────
	{
		id: 'alert-storm',
		label: 'Alert Storm',
		description: 'Triggered 10 alerts.',
		metric: 'totalAlerts',
		threshold: 10,
	},
	{
		id: 'alert-enthusiast',
		label: 'Alert Enthusiast',
		description: 'Triggered 50 alerts.',
		metric: 'totalAlerts',
		threshold: 50,
	},
	{
		id: 'alert-curator',
		label: 'Alert Explorer',
		description: 'Triggered 10 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 10,
	},
	{
		id: 'alert-historian',
		label: 'Alert Historian',
		description: 'Triggered 25 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 25,
	},
	{
		id: 'alert-archivist',
		label: 'Alert Archivist',
		description: 'Triggered 50 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 50,
	},

	// ───────── Overall Engagement ─────────
	{
		id: 'livewire-operator',
		label: 'Livewire',
		description: 'Triggered 500 commands or alerts.',
		metric: 'totalCommandsAndAlerts',
		threshold: 500,
	},
	{
		id: 'on-air-regular',
		label: 'On-Air Regular',
		description: 'Active for 60 days or more.',
		metric: 'daysActive',
		threshold: 60,
	},
	{
		id: 'yearlong-viewer',
		label: 'Year-Long Viewer',
		description: 'Active for 365 days or more.',
		metric: 'daysActive',
		threshold: 365,
	},

	// ───────── Ultimate ─────────
	{
		id: 'lumia-luminary',
		label: 'Lumia Luminary',
		description: 'Reached major milestones across commands, alerts, extensions, and support.',
		metric: 'allRounder',
		threshold: 1,
	},
];
