export type ViewerProfileAchievementMetric =
	| 'totalCommands'
	| 'uniqueCommands'
	| 'totalChatbotCommands'
	| 'totalPointsCommands'
	| 'totalPointsSpent'
	| 'totalTwitchExtensionsCommands'
	| 'totalBitsSpent'
	| 'totalKicksSpent'
	| 'totalGiftSubscriptions'
	| 'totalMoneySpent'
	| 'totalAlerts'
	| 'uniqueAlerts'
	| 'totalCommandsAndAlerts'
	| 'daysActive'
	| 'allRounder';

export type ViewerProfileAchievementColor = 'gold' | 'amber' | 'emerald' | 'sky' | 'rose' | 'orange' | 'teal' | 'cyan' | 'violet' | 'slate';

export type ViewerProfileAchievementDefinition = {
	id: string;
	label: string;
	description: string;
	metric: ViewerProfileAchievementMetric;
	threshold: number;
	connectionKeys?: string[];
	icon: string;
	color: ViewerProfileAchievementColor;
};

export const VIEWER_PROFILE_ACHIEVEMENTS: ViewerProfileAchievementDefinition[] = [
	// ───────── Command Usage ─────────
	{
		id: 'commands-regular',
		label: 'Commands Regular',
		description: 'Triggered 25 commands.',
		metric: 'totalCommands',
		threshold: 25,
		icon: 'Bolt',
		color: 'amber',
	},
	{
		id: 'commands-runner',
		label: 'Commands Runner',
		description: 'Triggered 50 commands.',
		metric: 'totalCommands',
		threshold: 50,
		icon: 'Speed',
		color: 'amber',
	},
	{
		id: 'commands-overdrive',
		label: 'Commands Overdrive',
		description: 'Triggered 100 commands.',
		metric: 'totalCommands',
		threshold: 100,
		icon: 'FlashOn',
		color: 'orange',
	},
	{
		id: 'commands-speedster',
		label: 'Commands Speedster',
		description: 'Triggered 250 commands.',
		metric: 'totalCommands',
		threshold: 250,
		icon: 'RocketLaunch',
		color: 'orange',
	},
	{
		id: 'commands-blazer',
		label: 'Commands Blazer',
		description: 'Triggered 500 commands.',
		metric: 'totalCommands',
		threshold: 500,
		icon: 'Whatshot',
		color: 'orange',
	},
	{
		id: 'commands-veteran',
		label: 'Commands Veteran',
		description: 'Triggered 1,500 commands.',
		metric: 'totalCommands',
		threshold: 1500,
		icon: 'MilitaryTech',
		color: 'orange',
	},
	{
		id: 'commands-legend',
		label: 'Commands Legend',
		description: 'Triggered 7,500 commands.',
		metric: 'totalCommands',
		threshold: 7500,
		icon: 'EmojiEvents',
		color: 'gold',
	},

	// ───────── Unique Commands ─────────
	{
		id: 'commands-unique-expolorer',
		label: 'Commands Explorer',
		description: 'Used 10 different commands.',
		metric: 'uniqueCommands',
		threshold: 10,
		icon: 'AutoAwesome',
		color: 'amber',
	},
	{
		id: 'commands-unique-adventurer',
		label: 'Commands Adventurer',
		description: 'Used 30 different commands.',
		metric: 'uniqueCommands',
		threshold: 30,
		icon: 'Stars',
		color: 'orange',
	},

	// ───────── Channel Points ─────────
	{
		id: 'twitch-points-spark',
		label: 'Points Starter',
		description: 'Triggered 50 channel point commands.',
		metric: 'totalPointsCommands',
		threshold: 50,
		connectionKeys: ['twitch'],
		icon: 'LocalActivity',
		color: 'cyan',
	},
	{
		id: 'twitch-points-regular',
		label: 'Points Regular',
		description: 'Triggered 200 channel point commands.',
		metric: 'totalPointsCommands',
		threshold: 200,
		connectionKeys: ['twitch'],
		icon: 'StarRate',
		color: 'teal',
	},
	{
		id: 'twitch-points-glow',
		label: 'Points Spender',
		description: 'Spent 7,500 channel points.',
		metric: 'totalPointsSpent',
		threshold: 7500,
		connectionKeys: ['twitch'],
		icon: 'AutoGraph',
		color: 'emerald',
	},
	{
		id: 'twitch-points-beacon',
		label: 'Points Beacon',
		description: 'Spent 40,000 channel points.',
		metric: 'totalPointsSpent',
		threshold: 40000,
		connectionKeys: ['twitch'],
		icon: 'TrendingUp',
		color: 'emerald',
	},
	{
		id: 'twitch-points-tycoon',
		label: 'Points Tycoon',
		description: 'Spent 150,000 channel points.',
		metric: 'totalPointsSpent',
		threshold: 150000,
		connectionKeys: ['twitch'],
		icon: 'WorkspacePremium',
		color: 'gold',
	},

	// ───────── Twitch Extensions ─────────
	{
		id: 'twitch-extension-explorer',
		label: 'Twitch Extension Explorer',
		description: 'Used 5 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 5,
		connectionKeys: ['twitch'],
		icon: 'Extension',
		color: 'sky',
	},
	{
		id: 'twitch-extension-adventurer-ii',
		label: 'Twitch Extension Adventurer II',
		description: 'Used 15 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 15,
		connectionKeys: ['twitch'],
		icon: 'Extension',
		color: 'teal',
	},
	{
		id: 'twitch-extension-adventurer',
		label: 'Twitch Extension Adventurer',
		description: 'Used 40 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 40,
		connectionKeys: ['twitch'],
		icon: 'Extension',
		color: 'violet',
	},
	{
		id: 'twitch-extension-operator',
		label: 'Twitch Extension Operator',
		description: 'Used 150 extension commands.',
		metric: 'totalTwitchExtensionsCommands',
		threshold: 150,
		connectionKeys: ['twitch'],
		icon: 'Extension',
		color: 'gold',
	},

	// ───────── Bits ─────────
	{
		id: 'bits-spark',
		label: 'Bits Spark',
		description: 'Spent 100 bits.',
		metric: 'totalBitsSpent',
		threshold: 100,
		connectionKeys: ['twitch'],
		icon: 'Diamond',
		color: 'sky',
	},
	{
		id: 'bits-beam',
		label: 'Bits Beam',
		description: 'Spent 500 bits.',
		metric: 'totalBitsSpent',
		threshold: 500,
		connectionKeys: ['twitch'],
		icon: 'Diamond',
		color: 'teal',
	},
	{
		id: 'bits-glow',
		label: 'Bits Glow',
		description: 'Spent 1,500 bits.',
		metric: 'totalBitsSpent',
		threshold: 1500,
		connectionKeys: ['twitch'],
		icon: 'Diamond',
		color: 'teal',
	},
	{
		id: 'bits-supernova',
		label: 'Bits Supernova',
		description: 'Spent 7,500 bits.',
		metric: 'totalBitsSpent',
		threshold: 7500,
		connectionKeys: ['twitch'],
		icon: 'Diamond',
		color: 'gold',
	},

	// ───────── Kick ─────────
	{
		id: 'kick-spark',
		label: 'Kicks Starter',
		description: 'Spent 50 kicks.',
		metric: 'totalKicksSpent',
		threshold: 50,
		connectionKeys: ['kick'],
		icon: 'LocalFireDepartment',
		color: 'emerald',
	},
	{
		id: 'kick-glow',
		label: 'Kicks Supporter',
		description: 'Spent 100 kicks.',
		metric: 'totalKicksSpent',
		threshold: 100,
		connectionKeys: ['kick'],
		icon: 'LocalFireDepartment',
		color: 'teal',
	},
	{
		id: 'kick-beam',
		label: 'Kick Power User',
		description: 'Spent 750 kicks.',
		metric: 'totalKicksSpent',
		threshold: 750,
		connectionKeys: ['kick'],
		icon: 'LocalFireDepartment',
		color: 'cyan',
	},
	{
		id: 'kick-supernova',
		label: 'Kick Superstar',
		description: 'Spent 1,500 kicks.',
		metric: 'totalKicksSpent',
		threshold: 1500,
		connectionKeys: ['kick'],
		icon: 'LocalFireDepartment',
		color: 'gold',
	},

	// ───────── Donations ─────────
	{
		id: 'light-supporter',
		label: 'Supporter',
		description: 'Donated 5 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 5,
		icon: 'Payments',
		color: 'amber',
	},
	{
		id: 'light-backer',
		label: 'Backer',
		description: 'Donated 25 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 25,
		icon: 'Payments',
		color: 'orange',
	},
	{
		id: 'light-advocate',
		label: 'Advocate',
		description: 'Donated 50 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 50,
		icon: 'Payments',
		color: 'orange',
	},
	{
		id: 'light-hero',
		label: 'Hero',
		description: 'Donated 100 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 100,
		icon: 'MonetizationOn',
		color: 'gold',
	},
	{
		id: 'light-patron',
		label: 'Patron',
		description: 'Donated 250 in your default currency.',
		metric: 'totalMoneySpent',
		threshold: 250,
		icon: 'MonetizationOn',
		color: 'gold',
	},

	// ───────── Gift Subscriptions ─────────
	{
		id: 'gift-spark',
		label: 'Gift Spark',
		description: 'Gifted 5 subscriptions.',
		metric: 'totalGiftSubscriptions',
		threshold: 5,
		icon: 'CardGiftcard',
		color: 'rose',
	},
	{
		id: 'gift-burst',
		label: 'Gift Burst',
		description: 'Gifted 25 subscriptions.',
		metric: 'totalGiftSubscriptions',
		threshold: 25,
		icon: 'Redeem',
		color: 'rose',
	},
	{
		id: 'gift-legend',
		label: 'Gift Legend',
		description: 'Gifted 100 subscriptions.',
		metric: 'totalGiftSubscriptions',
		threshold: 100,
		icon: 'WorkspacePremium',
		color: 'gold',
	},

	// ───────── Alerts ─────────
	{
		id: 'alert-storm',
		label: 'Alert Storm',
		description: 'Triggered 10 alerts.',
		metric: 'totalAlerts',
		threshold: 10,
		icon: 'NotificationsActive',
		color: 'orange',
	},
	{
		id: 'alert-enthusiast',
		label: 'Alert Enthusiast',
		description: 'Triggered 75 alerts.',
		metric: 'totalAlerts',
		threshold: 75,
		icon: 'Campaign',
		color: 'orange',
	},
	{
		id: 'alert-curator',
		label: 'Alert Curator',
		description: 'Triggered 10 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 10,
		icon: 'Notifications',
		color: 'violet',
	},
	{
		id: 'alert-historian',
		label: 'Alert Historian',
		description: 'Triggered 35 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 35,
		icon: 'Notifications',
		color: 'violet',
	},
	{
		id: 'alert-archivist',
		label: 'Alert Archivist',
		description: 'Triggered 75 different alerts.',
		metric: 'uniqueAlerts',
		threshold: 75,
		icon: 'Notifications',
		color: 'violet',
	},

	// ───────── Overall Engagement ─────────
	{
		id: 'livewire-operator',
		label: 'Livewire',
		description: 'Triggered 750 commands or alerts.',
		metric: 'totalCommandsAndAlerts',
		threshold: 750,
		icon: 'Bolt',
		color: 'violet',
	},
	{
		id: 'on-air-regular',
		label: 'On-Air Regular',
		description: 'Active for 60 days or more.',
		metric: 'daysActive',
		threshold: 60,
		icon: 'AccessTime',
		color: 'emerald',
	},
	{
		id: 'yearlong-viewer',
		label: 'Year-Long Viewer',
		description: 'Active for 400 days or more.',
		metric: 'daysActive',
		threshold: 400,
		icon: 'CalendarMonth',
		color: 'gold',
	},

	// ───────── Ultimate ─────────
	{
		id: 'lumia-luminary',
		label: 'Lumia Luminary',
		description: 'Reached major milestones across commands, alerts, extensions, and support.',
		metric: 'allRounder',
		threshold: 1,
		icon: 'EmojiObjects',
		color: 'gold',
	},
];
