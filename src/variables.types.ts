// [AI] When SystemVariables is used, update custom-overlays.d.ts

export interface LumiaAcceptedVariableDefinition {
	name: string;
	description?: string;
	origin?: string;
	example?: unknown;
}

export type LumiaAcceptedVariable = string | LumiaAcceptedVariableDefinition;

export const getAcceptedVariableName = (entry: LumiaAcceptedVariable): string => (typeof entry === 'string' ? entry : entry.name);

export const getAcceptedVariableNames = (entries: LumiaAcceptedVariable[]): string[] => entries.map(getAcceptedVariableName);

// Object-valued system variables. Bare token ({{x}}) renders `name`; dotted
// tokens ({{x.amount}}, {{x.currencySymbol}}) render a field. Cheerer / gifter /
// last-event vars carry only { name, amount }; donator-person vars add currency.
export type CountableVariableValue = {
	name: string;
	amount: number;
};

export type DonatorVariableValue = CountableVariableValue & {
	currency: string;
	currencySymbol: string;
};

// Use the **string values** of this enum inside overlays: e.g. {{twitch_total_subscriber_count}}, not {{TWITCH_TOTAL_SUBSCRIBER_COUNT}}.
export enum SystemVariables {
	// ───────────────────────────── Functions / Helpers ─────────────────────────────

	/** Read from a local file. Example: {{read_file=C:\path\file.txt}}. Use in overlays as {{read_file}}. */
	READ_FILE = 'read_file',
	/** Read from a simple GET URL (2s timeout). Example: {{read_url=https://api.example.com}}. Use as {{read_url}}. */
	READ_URL = 'read_url',
	/** Selection helper for predefined options. Example: {{selection=first,second}}. Use as {{selection}}. */
	SELECTION = 'selection',
	/** Random number between two values. Example: {{random=1,20}}. Use as {{random}}. */
	RANDOM = 'random',
	/** Pick a random item from a comma list. Example: {{random_input=a,b,c}}. Use as {{random_input}}. */
	RANDOM_INPUT = 'random_input',
	/** Evaluate a math expression. Example: {{math={{var1}}+{{var2}}}}. Use as {{math}}. */
	MATH = 'math',
	/** Evaluate a JavaScript expression in a sandbox. Example: {{js=10 * {{var1}}}}. Use as {{js}}. */
	JS = 'js',
	/** Compare two values. Example: {{compare={{var1}},>,{{var2}}}}. Use as {{compare}}. */
	COMPARE = 'compare',
	/** Round a value to decimal places. Example: {{round={{math={{var1}}/{{var2}}}},2}}. Use as {{round}}. */
	ROUND = 'round',
	/** Conditional output based on truthy value. Example: {{if={{compare={{var1}},>,10}},high,low}}. Use as {{if}}. */
	IF = 'if',
	/** Return first non-empty input. Example: {{coalesce={{display_name}},{{username}},Anonymous}}. Use as {{coalesce}}. */
	COALESCE = 'coalesce',
	/** Check if value is between two numbers. Example: {{between={{var1}},10,50}}. Use as {{between}}. */
	BETWEEN = 'between',
	/** Return minimum numeric value. Example: {{min={{v1}},{{v2}},100}}. Use as {{min}}. */
	MIN = 'min',
	/** Return maximum numeric value. Example: {{max={{v1}},{{v2}},100}}. Use as {{max}}. */
	MAX = 'max',
	/** Extract regex capture group from text. Example: {{regex_extract={{message}},\"(\\d+)\",1}}. Use as {{regex_extract}}. */
	REGEX_EXTRACT = 'regex_extract',
	/** Replace text or regex matches. Example: {{replace={{message}},badword,***}}. Use as {{replace}}. */
	REPLACE = 'replace',
	/** Format a date with a pattern. Example: {{format_date={{session_start_date}},MM/DD/YYYY hh:mm A}}. Use as {{format_date}}. */
	FORMAT_DATE = 'format_date',
	/** Show elapsed time since date in short format. Example: {{time_since={{follow_time}}}}. Use as {{time_since}}. */
	TIME_SINCE = 'time_since',
	/** Show time remaining until a future date. Example: {{time_until=2026-12-25T00:00:00Z}}. Use as {{time_until}}. */
	TIME_UNTIL = 'time_until',
	/** Current date (no time). Optional IANA timezone: {{today=America/New_York}}. Use as {{today}}. */
	TODAY = 'today',
	/** Sum multiple variables. Example: {{sum_variables=twitch_total_follower_count,kick_total_follower_count}}. Use as {{sum_variables}}. */
	SUM_VARIABLES = 'sum_variables',
	/** Offset a variable by a number. Example: {{offset_count=twitch_total_follower_count,10}}. Use as {{offset_count}}. */
	OFFSET_COUNT = 'offset_count',
	/** Get user-accessible commands. Use as {{get_commands}}. */
	GET_COMMANDS = 'get_commands',
	/** Get all commands (full list). Use as {{get_all_commands}}. */
	GET_ALL_COMMANDS = 'get_all_commands',
	/** Convert color names to hex; passes through hex. Example: {{convert_color_to_hex=green}}. Use as {{convert_color_to_hex}}. */
	CONVERT_COLOR_TO_HEX = 'convert_color_to_hex',
	/** Latest file from a folder. Example: {{get_latest_file_from_folder=C:/Users/Desktop}}. Use as {{get_latest_file_from_folder}}. */
	GET_LATEST_FILE_FROM_FOLDER = 'get_latest_file_from_folder',
	/** Random file from a folder. Example: {{get_random_file_from_folder=C:/Users/Desktop}}. Use as {{get_random_file_from_folder}}. */
	GET_RANDOM_FILE_FROM_FOLDER = 'get_random_file_from_folder',
	/** Desktop screenshot (monitor selectable). Example: {{screenshot=2}}. Use as {{screenshot}}. */
	SCREENSHOT = 'screenshot',
	/** Overlay screenshot. Example: {{overlay_screenshot=Overlay 1}}. Use as {{overlay_screenshot}}. */
	OVERLAY_SCREENSHOT = 'overlay_screenshot',
	/** OBS screenshot (scene selectable). Example: {{obs_screenshot=Scene 1}}. Use as {{obs_screenshot}}. */
	OBS_SCREENSHOT = 'obs_screenshot',
	/** Save OBS replay buffer (optional delay). Example: {{obs_replay=5}}. Use as {{obs_replay}}. */
	OBS_REPLAY = 'obs_replay',
	/** Save OBS vertical replay (optional delay). Example: {{obs_vertical_replay=5}}. Use as {{obs_vertical_replay}}. */
	OBS_VERTICAL_REPLAY = 'obs_vertical_replay',
	/** Current queue count. Example: {{get_queue_count}}. Use as {{get_queue_count}}. */
	GET_QUEUE_COUNT = 'get_queue_count',
	/** Extract variable(s) from a message. Example: {{get_var_from_msg=name}}. Use as {{get_var_from_msg}}. */
	GET_VAR_FROM_MSG = 'get_var_from_msg',
	/** Get loyalty points for a user. Example: {{get_user_loyalty_points=username,twitch}}. Use as {{get_user_loyalty_points}}. */
	GET_USER_LOYALTY_POINTS = 'get_user_loyalty_points',
	/** Translate text (Google). Example: {{translate={{message}}|es}}. Use as {{translate}}. */
	TRANSLATE = 'translate',
	/** Get the ai response from ai integration. Example: {{ai_prompt={{message}}}}. Use as {{ai_prompt}}. */
	AI_PROMPT = 'ai_prompt',
	/** Current weather for a location via wttr.in. Returns a one-line summary like */
	WEATHER = 'weather',
	/** Save a value to local storage (persists across restarts, kept out of the variables list) and return it. Example: {{save_local=highscore,100}}. Use as {{save_local}}. */
	SAVE_LOCAL = 'save_local',
	/** Load a value saved with save_local; optional fallback when the key is unset. Example: {{load_local=highscore}} or {{load_local=highscore,0}}. Use as {{load_local}}. */
	LOAD_LOCAL = 'load_local',

	// ─────────────────────────────────── General Variables ───────────────────────

	/** Commands URL/page. Use in overlays as {{commands_url}}. */
	COMMANDS_URL = 'commands_url',
	/** Session start time (ISO). Use as {{session_start_date}}. */
	SESSION_START_DATE = 'session_start_date',
	/** Last overlay screenshot path. Use as {{last_overlay_screenshot_path}}. */
	LAST_OVERLAY_SCREENSHOT_PATH = 'last_overlay_screenshot_path',
	/**
	 * Streamer's display name. Platform-agnostic — resolves to the streamer's
	 * username on whichever platform is currently connected, preferring the
	 * primary platform when multiple are connected. Use as {{streamer}}.
	 *
	 * Resolution order in the renderer: twitch_username → kick_username →
	 * youtube_username → facebook_username → tiktok_username, falling back to
	 * '' when no platform is connected. Re-evaluated whenever any of those
	 * underlying username variables changes.
	 *
	 * Useful for templates that want to say "{{streamer}}'s overlay" without
	 * knowing which platform the streamer is on — and for SE imports which
	 * use the same `{streamer}` token as a platform-agnostic placeholder.
	 */
	STREAMER = 'streamer',

	// ─────────────────────────────────── Games ────────────────────────────────────

	/** Last player to trigger a game. Use as {{game_last_player}}. */
	GAME_LAST_PLAYER = 'game_last_player',

	// ────────────────────────────────── Uptimes ───────────────────────────────────

	/** Lumia app uptime. Use as {{lumia_uptime}}. */
	LUMIA_UPTIME = 'lumia_uptime',
	/** ISO timestamp of when the Lumia app started. Use as {{lumia_uptime_timestamp}}. */
	LUMIA_UPTIME_TIMESTAMP = 'lumia_uptime_timestamp',
	/** Twitch stream uptime. Use as {{twitch_uptime}}. */
	TWITCH_UPTIME = 'twitch_uptime',
	/** ISO timestamp of when the Twitch stream started. Use as {{twitch_uptime_timestamp}}. */
	TWITCH_UPTIME_TIMESTAMP = 'twitch_uptime_timestamp',
	/** YouTube stream uptime. Use as {{youtube_uptime}}. */
	YOUTUBE_UPTIME = 'youtube_uptime',
	/** ISO timestamp of when the YouTube stream started. Use as {{youtube_uptime_timestamp}}. */
	YOUTUBE_UPTIME_TIMESTAMP = 'youtube_uptime_timestamp',
	/** Facebook stream uptime. Use as {{facebook_uptime}}. */
	FACEBOOK_UPTIME = 'facebook_uptime',
	/** ISO timestamp of when the Facebook stream started. Use as {{facebook_uptime_timestamp}}. */
	FACEBOOK_UPTIME_TIMESTAMP = 'facebook_uptime_timestamp',
	/** Kick stream uptime. Use as {{kick_uptime}}. */
	KICK_UPTIME = 'kick_uptime',
	/** ISO timestamp of when the Kick stream started. Use as {{kick_uptime_timestamp}}. */
	KICK_UPTIME_TIMESTAMP = 'kick_uptime_timestamp',
	/** TikTok stream uptime. Use as {{tiktok_uptime}}. */
	TIKTOK_UPTIME = 'tiktok_uptime',
	/** ISO timestamp of when the TikTok stream started. Use as {{tiktok_uptime_timestamp}}. */
	TIKTOK_UPTIME_TIMESTAMP = 'tiktok_uptime_timestamp',
	/** Twitch live status (true/false). Use as {{twitch_live}}. */
	TWITCH_LIVE = 'twitch_live',
	/** YouTube live status (true/false). Use as {{youtube_live}}. */
	YOUTUBE_LIVE = 'youtube_live',
	/** TikTok live status (true/false). Use as {{tiktok_live}}. */
	TIKTOK_LIVE = 'tiktok_live',
	/** Facebook live status (true/false). Use as {{facebook_live}}. */
	FACEBOOK_LIVE = 'facebook_live',
	/** Kick live status (true/false). Use as {{kick_live}}. */
	KICK_LIVE = 'kick_live',
	/** BRB clips list (comma-separated URLs). Use as {{overlays_brb_clips}}. */
	OVERLAYS_BRB_CLIPS = 'overlays_brb_clips',

	// ─────────────────────────────── Donations / Tips ─────────────────────────────

	/** Last donator name. Use as {{latest_donator}}. */
	LATEST_DONATOR = 'latest_donator',
	/** Last donation amount. Use as {{latest_donator_amount}}. */
	LATEST_DONATOR_AMOUNT = 'latest_donator_amount',
	/** Last donation currency code. Use as {{latest_donator_currency}}. */
	LATEST_DONATOR_CURRENCY = 'latest_donator_currency',
	/** Last donation currency symbol. Use as {{latest_donator_currency_symbol}}. */
	LATEST_DONATOR_CURRENCY_SYMBOL = 'latest_donator_currency_symbol',
	/** Top donator this session. Use as {{session_top_donator}}. */
	SESSION_TOP_DONATOR = 'session_top_donator',
	/** Top donation amount this session. Use as {{session_top_donator_amount}}. */
	SESSION_TOP_DONATOR_AMOUNT = 'session_top_donator_amount',
	/** Top donation currency this session. Use as {{session_top_donator_currency}}. */
	SESSION_TOP_DONATOR_CURRENCY = 'session_top_donator_currency',
	/** Top donation currency symbol this session. Use as {{session_top_donator_currency_symbol}}. */
	SESSION_TOP_DONATOR_CURRENCY_SYMBOL = 'session_top_donator_currency_symbol',
	/** All-time top donator. Use as {{top_donator}}. */
	TOP_DONATOR = 'top_donator',
	/** All-time top donation amount. Use as {{top_donator_amount}}. */
	TOP_DONATOR_AMOUNT = 'top_donator_amount',
	/** All-time top donation currency code. Use as {{top_donator_currency}}. */
	TOP_DONATOR_CURRENCY = 'top_donator_currency',
	/** All-time top donation currency symbol. Use as {{top_donator_currency_symbol}}. */
	TOP_DONATOR_CURRENCY_SYMBOL = 'top_donator_currency_symbol',
	/** Top donators list (last 10). Use as {{top_donator_list}}. */
	TOP_DONATOR_LIST = 'top_donator_list',
	/** Amounts for TOP_DONATOR_LIST. Use as {{top_donator_list_amount}}. */
	TOP_DONATOR_LIST_AMOUNT = 'top_donator_list_amount',
	/** Currency codes for TOP_DONATOR_LIST. Use as {{top_donator_list_currency}}. */
	TOP_DONATOR_LIST_CURRENCY = 'top_donator_list_currency',
	/** Currency symbols for TOP_DONATOR_LIST. Use as {{top_donator_list_currency_symbol}}. */
	TOP_DONATOR_LIST_CURRENCY_SYMBOL = 'top_donator_list_currency_symbol',
	/** All-time total donation amount (normalized). Use as {{total_donation_amount}}. */
	TOTAL_DONATION_AMOUNT = 'total_donation_amount',
	/** Currency code for TOTAL_DONATION_AMOUNT. Use as {{total_donation_amount_currency}}. */
	TOTAL_DONATION_AMOUNT_CURRENCY = 'total_donation_amount_currency',
	/** Currency symbol for TOTAL_DONATION_AMOUNT. Use as {{total_donation_amount_currency_symbol}}. */
	TOTAL_DONATION_AMOUNT_CURRENCY_SYMBOL = 'total_donation_amount_currency_symbol',
	/** Session donation sum. Use as {{session_donation_amount}}. */
	SESSION_DONATION_AMOUNT = 'session_donation_amount',
	/** Session donation currency code. Use as {{session_donation_amount_currency}}. */
	SESSION_DONATION_AMOUNT_CURRENCY = 'session_donation_amount_currency',
	/** Session donation currency symbol. Use as {{session_donation_amount_currency_symbol}}. */
	SESSION_DONATION_AMOUNT_CURRENCY_SYMBOL = 'session_donation_amount_currency_symbol',
	/** All-time donation count. Use as {{donation_count}}. */
	DONATION_COUNT = 'donation_count',
	/** Session donation count. Use as {{session_donation_count}}. */
	SESSION_DONATION_COUNT = 'session_donation_count',
	/** Session donators list. Use as {{session_donator_list}}. */
	SESSION_DONATOR_LIST = 'session_donator_list',
	/** Session donators with amounts. Use as {{session_donator_list_with_amount}}. */
	SESSION_DONATOR_LIST_WITH_AMOUNT = 'session_donator_list_with_amount',
	/** Raw donation total ignoring currency. Use as {{total_raw_donation_amount}}. */
	TOTAL_RAW_DONATION_AMOUNT = 'total_raw_donation_amount',
	/** Donation sum for the current calendar week. Use as {{week_donation_amount}}. */
	WEEK_DONATION_AMOUNT = 'week_donation_amount',
	/** Donation sum for the current calendar month. Use as {{month_donation_amount}}. */
	MONTH_DONATION_AMOUNT = 'month_donation_amount',
	/** Session-wide gross money across every income source (tips, bits, subs, gift subs, super chats, super stickers, TikTok gifts, kicks, stars…), normalized to your default currency. Use as {{session_money_amount}}. */
	SESSION_MONEY_AMOUNT = 'session_money_amount',
	/** Gross money across every income source for the current calendar week. Use as {{week_money_amount}}. */
	WEEK_MONEY_AMOUNT = 'week_money_amount',
	/** Gross money across every income source for the current calendar month. Use as {{month_money_amount}}. */
	MONTH_MONEY_AMOUNT = 'month_money_amount',
	/** All-time gross money across every income source. Use as {{total_money_amount}}. */
	TOTAL_MONEY_AMOUNT = 'total_money_amount',
	/** Donation event count for the current calendar week. Use as {{week_donation_count}}. */
	WEEK_DONATION_COUNT = 'week_donation_count',
	/** Donation event count for the current calendar month. Use as {{month_donation_count}}. */
	MONTH_DONATION_COUNT = 'month_donation_count',
	/** Top donator for the current calendar week. Use as {{week_top_donator}}. */
	WEEK_TOP_DONATOR = 'week_top_donator',
	/** Amount for WEEK_TOP_DONATOR. Use as {{week_top_donator_amount}}. */
	WEEK_TOP_DONATOR_AMOUNT = 'week_top_donator_amount',
	/** Top donators this week (top 10, comma-separated usernames). Use as {{week_top_donator_list}}. */
	WEEK_TOP_DONATOR_LIST = 'week_top_donator_list',
	/** Amounts for WEEK_TOP_DONATOR_LIST (parallel comma-separated). Use as {{week_top_donator_list_amount}}. */
	WEEK_TOP_DONATOR_LIST_AMOUNT = 'week_top_donator_list_amount',
	/** Top donator for the current calendar month. Use as {{month_top_donator}}. */
	MONTH_TOP_DONATOR = 'month_top_donator',
	/** Amount for MONTH_TOP_DONATOR. Use as {{month_top_donator_amount}}. */
	MONTH_TOP_DONATOR_AMOUNT = 'month_top_donator_amount',
	/** Top donators this month. Use as {{month_top_donator_list}}. */
	MONTH_TOP_DONATOR_LIST = 'month_top_donator_list',
	/** Amounts for MONTH_TOP_DONATOR_LIST. Use as {{month_top_donator_list_amount}}. */
	MONTH_TOP_DONATOR_LIST_AMOUNT = 'month_top_donator_list_amount',

	// ─── Cross-platform follower / subscriber / cheer / raid (SE-shaped names) ───
	// Mirror StreamElements' session keys without a platform prefix so SE → Lumia
	// is a 1:1 map and labels can reference one counter that aggregates across
	// Twitch, YouTube, Kick, etc. Platform-specific variants (TWITCH_*, KICK_*,
	// YOUTUBE_*) remain available for labels that need a single-platform view.

	/** Followers this session across all platforms. Use as {{session_follower_count}}. */
	SESSION_FOLLOWER_COUNT = 'session_follower_count',
	/** Followers this week across all platforms. Use as {{week_follower_count}}. */
	WEEK_FOLLOWER_COUNT = 'week_follower_count',
	/** Followers this month across all platforms. Use as {{month_follower_count}}. */
	MONTH_FOLLOWER_COUNT = 'month_follower_count',
	/** Lifetime followers across all platforms. Use as {{total_follower_count}}. */
	TOTAL_FOLLOWER_COUNT = 'total_follower_count',
	/** Most recent follower (any platform). Use as {{last_follower}}. */
	LAST_FOLLOWER = 'last_follower',

	/** Subscribers this session across all platforms (new + resub + gifted). Use as {{session_subscriber_count}}. */
	SESSION_SUBSCRIBER_COUNT = 'session_subscriber_count',
	/** New (first-time) subscribers this session. Use as {{session_new_subscribers_count}}. */
	SESSION_NEW_SUBSCRIBERS_COUNT = 'session_new_subscribers_count',
	/** Resubscribers this session. Use as {{session_resub_subscribers_count}}. */
	SESSION_RESUB_SUBSCRIBERS_COUNT = 'session_resub_subscribers_count',
	/** Gifted subs this session. Use as {{session_gifted_subscribers_count}}. */
	SESSION_GIFTED_SUBSCRIBERS_COUNT = 'session_gifted_subscribers_count',
	/** Subscribers this week across all platforms. Use as {{week_subscriber_count}}. */
	WEEK_SUBSCRIBER_COUNT = 'week_subscriber_count',
	/** Subscribers this month across all platforms. Use as {{month_subscriber_count}}. */
	MONTH_SUBSCRIBER_COUNT = 'month_subscriber_count',
	/** Lifetime subscribers across all platforms. Use as {{total_subscriber_count}}. */
	TOTAL_SUBSCRIBER_COUNT = 'total_subscriber_count',
	/** Most recent subscriber (any platform). Use as {{last_subscriber}}. */
	LAST_SUBSCRIBER = 'last_subscriber',
	/** All-time top gifter (any platform). Use as {{alltime_top_gifter}}. */
	ALLTIME_TOP_GIFTER = 'alltime_top_gifter',
	/** Most recent gifter (any platform), { name, amount }. Use as {{last_gifter}} / {{last_gifter.amount}}. */
	LAST_GIFTER = 'last_gifter',
	/** Most recent gift recipient (any platform). Use as {{last_gifted}}. */
	LAST_GIFTED = 'last_gifted',

	/** Cheers (bits/kicks) this session across all platforms. Use as {{session_cheers_count}}. */
	SESSION_CHEERS_COUNT = 'session_cheers_count',
	/** Cheers this week across all platforms. Use as {{week_cheers_count}}. */
	WEEK_CHEERS_COUNT = 'week_cheers_count',
	/** Cheers this month across all platforms. Use as {{month_cheers_count}}. */
	MONTH_CHEERS_COUNT = 'month_cheers_count',
	/** Top cheerer (by total bits) this session. Use as {{session_top_cheerer}}. */
	SESSION_TOP_CHEERER = 'session_top_cheerer',
	/** Amount for SESSION_TOP_CHEERER. Use as {{session_top_cheerer_amount}}. */
	SESSION_TOP_CHEERER_AMOUNT = 'session_top_cheerer_amount',
	/** Top cheerer this week. Use as {{week_top_cheerer}}. */
	WEEK_TOP_CHEERER = 'week_top_cheerer',
	/** Amount for WEEK_TOP_CHEERER. Use as {{week_top_cheerer_amount}}. */
	WEEK_TOP_CHEERER_AMOUNT = 'week_top_cheerer_amount',
	/** Top cheerer this month. Use as {{month_top_cheerer}}. */
	MONTH_TOP_CHEERER = 'month_top_cheerer',
	/** Amount for MONTH_TOP_CHEERER. Use as {{month_top_cheerer_amount}}. */
	MONTH_TOP_CHEERER_AMOUNT = 'month_top_cheerer_amount',
	/** All-time top cheerer. Use as {{alltime_top_cheerer}}. */
	ALLTIME_TOP_CHEERER = 'alltime_top_cheerer',
	/** Amount for ALLTIME_TOP_CHEERER. Use as {{alltime_top_cheerer_amount}}. */
	ALLTIME_TOP_CHEERER_AMOUNT = 'alltime_top_cheerer_amount',
	/** Largest single cheer this session. Use as {{session_top_cheer}}. */
	SESSION_TOP_CHEER = 'session_top_cheer',
	/** Amount for SESSION_TOP_CHEER. Use as {{session_top_cheer_amount}}. */
	SESSION_TOP_CHEER_AMOUNT = 'session_top_cheer_amount',
	/** Most recent cheer (bits/kicks, any platform), { name, amount }. Use as {{last_cheer}} / {{last_cheer.amount}}. */
	LAST_CHEER = 'last_cheer',

	/** Most recent raider/host (any platform). Use as {{last_raider}}. */
	LAST_RAIDER = 'last_raider',
	/** Viewer count for LAST_RAIDER. Use as {{last_raid_amount}}. */
	LAST_RAID_AMOUNT = 'last_raid_amount',

	// ─────────────────────────────────── Games ────────────────────────────────────

	/** Raffle title. Use as {{raffle_title}}. */
	RAFFLE_TITLE = 'raffle_title',
	/** Raffle description. Use as {{raffle_description}}. */
	RAFFLE_DESCRIPTION = 'raffle_description',
	/** Raffle entries (comma-separated). Use as {{raffle_entries}}. */
	RAFFLE_ENTRIES = 'raffle_entries',
	/** Raffle generated number. Use as {{raffle_generated_number}}. */
	RAFFLE_GENERATED_NUMBER = 'raffle_generated_number',
	/** Raffle entries count. Use as {{raffle_entries_count}}. */
	RAFFLE_ENTRIES_COUNT = 'raffle_entries_count',
	/** Raffle winners (comma-separated). Use as {{raffle_winners}}. */
	RAFFLE_WINNERS = 'raffle_winners',
	/** Raffle type/mode. Use as {{raffle_type}}. */
	RAFFLE_TYPE = 'raffle_type',
	/** Current/last raffle winner username. Use as {{raffle_winner}}. */
	RAFFLE_WINNER = 'raffle_winner',
	/** Raffle winner avatar URL. Use as {{raffle_winner_avatar}}. */
	RAFFLE_WINNER_AVATAR = 'raffle_winner_avatar',
	/** Command used to enter the raffle (e.g., !join). Use as {{raffle_entry_command}}. */
	RAFFLE_ENTRY_COMMAND = 'raffle_entry_command',
	/** Tournament title. Use as {{tournament_title}}. */
	TOURNAMENT_TITLE = 'tournament_title',
	/** Tournament description. Use as {{tournament_description}}. */
	TOURNAMENT_DESCRIPTION = 'tournament_description',
	/** Tournament game. Use as {{tournament_game}}. */
	TOURNAMENT_GAME = 'tournament_game',
	/** Tournament format. Use as {{tournament_format}}. */
	TOURNAMENT_FORMAT = 'tournament_format',
	/** Tournament state. Use as {{tournament_state}}. */
	TOURNAMENT_STATE = 'tournament_state',
	/** Tournament participants count. Use as {{tournament_participants_count}}. */
	TOURNAMENT_PARTICIPANTS_COUNT = 'tournament_participants_count',
	/** Tournament entry command (e.g., !tournament). Use as {{tournament_entry_command}}. */
	TOURNAMENT_ENTRY_COMMAND = 'tournament_entry_command',
	/** Tournament winner. Use as {{tournament_winner}}. */
	TOURNAMENT_WINNER = 'tournament_winner',
	/** Tournament winner avatar URL. Use as {{tournament_winner_avatar}}. */
	TOURNAMENT_WINNER_AVATAR = 'tournament_winner_avatar',
	/** Viewer queue title. Use as {{viewerqueue_title}}. */
	VIEWERQUEUE_TITLE = 'viewerqueue_title',
	/** Viewer queue entry command (e.g., !joinq). Use as {{viewerqueue_entry_command}}. */
	VIEWERQUEUE_ENTRY_COMMAND = 'viewerqueue_entry_command',
	/** Viewer queue entries (comma-separated). Use as {{viewerqueue_entries}}. */
	VIEWERQUEUE_ENTRIES = 'viewerqueue_entries',
	/** Viewer queue selected players (comma-separated). Use as {{viewerqueue_players}}. */
	VIEWERQUEUE_PLAYERS = 'viewerqueue_players',
	/** Viewer queue entries count. Use as {{viewerqueue_entries_count}}. */
	VIEWERQUEUE_ENTRIES_COUNT = 'viewerqueue_entries_count',
	/** Viewer queue max entries limit. Use as {{viewerqueue_queue_limit}}. */
	VIEWERQUEUE_QUEUE_LIMIT = 'viewerqueue_queue_limit',
	/** Achievement id. Use as {{achievement_id}}. */
	ACHIEVEMENT_ID = 'achievement_id',
	/** Achievement name. Use as {{achievement_name}}. */
	ACHIEVEMENT_NAME = 'achievement_name',
	/** Achievement description. Use as {{achievement_description}}. */
	ACHIEVEMENT_DESCRIPTION = 'achievement_description',
	/** Achievements completed count. Use as {{achievements_completed}}. */
	ACHIEVEMENTS_COMPLETED = 'achievements_completed',
	/** Achievements total count. Use as {{achievements_total}}. */
	ACHIEVEMENTS_TOTAL = 'achievements_total',
	/** Achievement completion percent. Use as {{achievements_percent}}. */
	ACHIEVEMENTS_PERCENT = 'achievements_percent',
	/** Response from most recent API Action (JSON stringified). Use as {{api_action_global_response}}. */
	API_ACTION_GLOBAL_RESPONSE = 'api_action_global_response',
	/** Last RANDOM_INPUT selection. Use as {{last_random_input}}. */
	LAST_RANDOM_INPUT = 'last_random_input',
	/** Loyalty currency display name (e.g., Lumipoints). Use as {{loyalty_currency_name}}. */
	LOYALTY_CURRENCY_NAME = 'loyalty_currency_name',

	// ─────────────────────────────────── Twitch ───────────────────────────────────

	/** Time a user has followed (followage). Use as {{twitch_followage}}. */
	TWITCH_FOLLOWAGE = 'twitch_followage',
	/** Time until next ad. Use as {{twitch_next_ad}}. */
	TWITCH_NEXT_AD = 'twitch_next_ad',
	/** Get avatar by username. Example: {{twitch_get_avatar={{message}}}}. Use as {{twitch_get_avatar}}. */
	TWITCH_GET_AVATAR = 'twitch_get_avatar',
	/** Channel user ID. Use as {{twitch_user_id}}. */
	TWITCH_USER_ID = 'twitch_user_id',
	/** Channel username. Use as {{twitch_username}}. */
	TWITCH_USERNAME = 'twitch_username',
	/** Current viewer count. Use as {{twitch_current_viewer_count}}. */
	TWITCH_CURRENT_VIEWER_COUNT = 'twitch_current_viewer_count',
	/** Current viewers (comma-separated). Use as {{twitch_current_viewers}}. */
	TWITCH_CURRENT_VIEWERS = 'twitch_current_viewers',
	/** Lifetime follower count. Use as {{twitch_total_follower_count}}. */
	TWITCH_TOTAL_FOLLOWER_COUNT = 'twitch_total_follower_count',
	/** Current followers (comma-separated). Use as {{twitch_current_followers}}. */
	TWITCH_CURRENT_FOLLOWERS = 'twitch_current_followers',
	/** Session followers count. Use as {{twitch_session_follower_count}}. */
	TWITCH_SESSION_FOLLOWER_COUNT = 'twitch_session_follower_count',
	/** Followers for the current calendar week. Use as {{twitch_week_follower_count}}. */
	TWITCH_WEEK_FOLLOWER_COUNT = 'twitch_week_follower_count',
	/** Followers for the current calendar month. Use as {{twitch_month_follower_count}}. */
	TWITCH_MONTH_FOLLOWER_COUNT = 'twitch_month_follower_count',
	/** Current subscribers (comma-separated). Use as {{twitch_current_subscribers}}. */
	TWITCH_CURRENT_SUBSCRIBERS = 'twitch_current_subscribers',
	/** Lifetime total subs. Use as {{twitch_total_subscriber_count}}. */
	TWITCH_TOTAL_SUBSCRIBER_COUNT = 'twitch_total_subscriber_count',
	/** Session subs count. Use as {{twitch_session_subscribers_count}}. */
	TWITCH_SESSION_SUBSCRIBERS_COUNT = 'twitch_session_subscribers_count',
	/** Session NEW subscribers (excluding resubs / gifts). Use as {{twitch_session_new_subscribers_count}}. */
	TWITCH_SESSION_NEW_SUBSCRIBERS_COUNT = 'twitch_session_new_subscribers_count',
	/** Session resubscribers (excluding new / gifts). Use as {{twitch_session_resub_subscribers_count}}. */
	TWITCH_SESSION_RESUB_SUBSCRIBERS_COUNT = 'twitch_session_resub_subscribers_count',
	/** Session gifted subscribers. Use as {{twitch_session_gifted_subscribers_count}}. */
	TWITCH_SESSION_GIFTED_SUBSCRIBERS_COUNT = 'twitch_session_gifted_subscribers_count',
	/** Subscribers for the current calendar week. Use as {{twitch_week_subscriber_count}}. */
	TWITCH_WEEK_SUBSCRIBER_COUNT = 'twitch_week_subscriber_count',
	/** Subscribers for the current calendar month. Use as {{twitch_month_subscriber_count}}. */
	TWITCH_MONTH_SUBSCRIBER_COUNT = 'twitch_month_subscriber_count',
	/** Session gifts count. Use as {{twitch_session_gifts_count}}. */
	TWITCH_SESSION_GIFTS_COUNT = 'twitch_session_gifts_count',
	/** All-time top gifter. Use as {{twitch_alltime_top_gifter}}. */
	TWITCH_ALLTIME_TOP_GIFTER = 'twitch_alltime_top_gifter',
	/** Lifetime gift count for TWITCH_ALLTIME_TOP_GIFTER. Use as {{twitch_alltime_top_gifter_amount}}. */
	TWITCH_ALLTIME_TOP_GIFTER_AMOUNT = 'twitch_alltime_top_gifter_amount',
	/** Lifetime gift members count. Use as {{twitch_total_gift_subscription_count}}. */
	TWITCH_TOTAL_GIFT_SUBSCRIPTION_COUNT = 'twitch_total_gift_subscription_count',
	/** Current moderators (comma-separated). Use as {{twitch_current_mods}}. */
	TWITCH_CURRENT_MODS = 'twitch_current_mods',
	/** Last follower. Use as {{twitch_last_follower}}. */
	TWITCH_LAST_FOLLOWER = 'twitch_last_follower',
	/** Session followers list. Use as {{twitch_session_follower}}. */
	TWITCH_SESSION_FOLLOWERS = 'twitch_session_follower',
	/** Last subscriber of any kind (new sub, resub, or recipient of a gift). Use as {{twitch_last_subscriber}}. */
	TWITCH_LAST_SUBSCRIBER = 'twitch_last_subscriber',
	/** Last person to subscribe for the first time (excludes resubs and gift-recipients). Use as {{twitch_last_new_subscriber}}. */
	TWITCH_LAST_NEW_SUBSCRIBER = 'twitch_last_new_subscriber',
	/** Last person to extend an existing subscription (any month past month 1, consecutive or not). Use as {{twitch_last_resubscriber}}. */
	TWITCH_LAST_RESUBSCRIBER = 'twitch_last_resubscriber',
	/** Last gifter (the person who sent the gift). Use as {{twitch_last_gifter}}. */
	TWITCH_LAST_GIFTER = 'twitch_last_gifter',
	/** Last gifted sub amount (number of subs in the last gift drop). Use as {{twitch_last_gifter_amount}}. */
	TWITCH_LAST_GIFTER_AMOUNT = 'twitch_last_gifter_amount',
	/** Last gift recipient (the person who received the most recent gifted sub). Use as {{twitch_last_gifted}}. */
	TWITCH_LAST_GIFTED = 'twitch_last_gifted',
	/** Session subscribers list. Use as {{twitch_session_subscribers}}. */
	TWITCH_SESSION_SUBSCRIBERS = 'twitch_session_subscribers',
	/** Session chat count. Use as {{twitch_session_chat_count}}. */
	TWITCH_SESSION_CHAT_COUNT = 'twitch_session_chat_count',
	/** Current first chatter. Use as {{twitch_current_first_chatter}}. */
	TWITCH_CURRENT_FIRST_CHATTER = 'twitch_current_first_chatter',
	/** Current first chatter count. Use as {{twitch_current_first_chatter_count}}. */
	TWITCH_CURRENT_FIRST_CHATTER_COUNT = 'twitch_current_first_chatter_count',
	/** Previous first chatter. Use as {{twitch_previous_first_chatter}}. */
	TWITCH_PREVIOUS_FIRST_CHATTER = 'twitch_previous_first_chatter',
	/** Previous first chatter count. Use as {{twitch_previous_first_chatter_count}}. */
	TWITCH_PREVIOUS_FIRST_CHATTER_COUNT = 'twitch_previous_first_chatter_count',
	/** Last chatter. Use as {{twitch_last_chatter}}. */
	TWITCH_LAST_CHATTER = 'twitch_last_chatter',
	/** Last raider. Use as {{twitch_last_raider}}. */
	TWITCH_LAST_RAIDER = 'twitch_last_raider',
	/** Last raid amount. Use as {{twitch_last_raid_amount}}. */
	TWITCH_LAST_RAID_AMOUNT = 'twitch_last_raid_amount',
	/** Session raiders list. Use as {{twitch_session_raiders}}. */
	TWITCH_SESSION_RAIDERS = 'twitch_session_raiders',
	/** Lifetime bits total. Use as {{twitch_total_bits_count}}. */
	TWITCH_TOTAL_BITS_COUNT = 'twitch_total_bits_count',
	/** Session bits count. Use as {{twitch_session_bits_count}}. */
	TWITCH_SESSION_BITS_COUNT = 'twitch_session_bits_count',
	/** Bits for the current calendar week. Use as {{twitch_week_bits_count}}. */
	TWITCH_WEEK_BITS_COUNT = 'twitch_week_bits_count',
	/** Bits for the current calendar month. Use as {{twitch_month_bits_count}}. */
	TWITCH_MONTH_BITS_COUNT = 'twitch_month_bits_count',
	/** Last bit sender. Use as {{twitch_last_bit}}. */
	TWITCH_LAST_BIT = 'twitch_last_bit',
	/** Last bit amount. Use as {{twitch_last_bit_amount}}. */
	TWITCH_LAST_BIT_AMOUNT = 'twitch_last_bit_amount',
	/** Session bits list. Use as {{twitch_session_bits}}. */
	TWITCH_SESSION_BITS = 'twitch_session_bits',
	/** Session bits with amounts list. Use as {{twitch_session_bits_with_amount}}. */
	TWITCH_SESSION_BITS_WITH_AMOUNT = 'twitch_session_bits_with_amount',
	/** Top single cheer this session. Use as {{twitch_session_top_cheer}}. */
	TWITCH_SESSION_TOP_CHEER = 'twitch_session_top_cheer',
	/** Amount for TWITCH_SESSION_TOP_CHEER. Use as {{twitch_session_top_cheer_amount}}. */
	TWITCH_SESSION_TOP_CHEER_AMOUNT = 'twitch_session_top_cheer_amount',
	/** Top cheerer this session (by total bits). Use as {{twitch_session_top_cheerer}}. */
	TWITCH_SESSION_TOP_CHEERER = 'twitch_session_top_cheerer',
	/** Total bits for TWITCH_SESSION_TOP_CHEERER. Use as {{twitch_session_top_cheerer_amount}}. */
	TWITCH_SESSION_TOP_CHEERER_AMOUNT = 'twitch_session_top_cheerer_amount',
	/** Top cheerer for the current calendar week. Use as {{twitch_week_top_cheerer}}. */
	TWITCH_WEEK_TOP_CHEERER = 'twitch_week_top_cheerer',
	/** Total bits for TWITCH_WEEK_TOP_CHEERER. Use as {{twitch_week_top_cheerer_amount}}. */
	TWITCH_WEEK_TOP_CHEERER_AMOUNT = 'twitch_week_top_cheerer_amount',
	/** Top cheerer for the current calendar month. Use as {{twitch_month_top_cheerer}}. */
	TWITCH_MONTH_TOP_CHEERER = 'twitch_month_top_cheerer',
	/** Total bits for TWITCH_MONTH_TOP_CHEERER. Use as {{twitch_month_top_cheerer_amount}}. */
	TWITCH_MONTH_TOP_CHEERER_AMOUNT = 'twitch_month_top_cheerer_amount',
	/** Whether a hype train is currently active (true/false). Use as {{twitch_hypetrain_active}}. */
	TWITCH_HYPETRAIN_ACTIVE = 'twitch_hypetrain_active',
	/** Current hype train level. Use as {{twitch_hypetrain_level}}. */
	TWITCH_HYPETRAIN_LEVEL = 'twitch_hypetrain_level',
	/** Current hype train progress toward the next level. Use as {{twitch_hypetrain_progress}}. */
	TWITCH_HYPETRAIN_PROGRESS = 'twitch_hypetrain_progress',
	/** Target value to reach the next hype train level. Use as {{twitch_hypetrain_level_goal}}. */
	TWITCH_HYPETRAIN_LEVEL_GOAL = 'twitch_hypetrain_level_goal',
	/** Total contributions this hype train (running sum). Use as {{twitch_hypetrain_total}}. */
	TWITCH_HYPETRAIN_TOTAL = 'twitch_hypetrain_total',
	/** Top contributor for the current hype train. Use as {{twitch_hypetrain_top_contributor}}. */
	TWITCH_HYPETRAIN_TOP_CONTRIBUTOR = 'twitch_hypetrain_top_contributor',
	/** Amount contributed by TWITCH_HYPETRAIN_TOP_CONTRIBUTOR. Use as {{twitch_hypetrain_top_contributor_amount}}. */
	TWITCH_HYPETRAIN_TOP_CONTRIBUTOR_AMOUNT = 'twitch_hypetrain_top_contributor_amount',
	/** All-time top cheerer (by total bits). Use as {{twitch_alltime_top_cheerer}}. */
	TWITCH_ALLTIME_TOP_CHEERER = 'twitch_alltime_top_cheerer',
	/** Total bits for TWITCH_ALLTIME_TOP_CHEERER. Use as {{twitch_alltime_top_cheerer_amount}}. */
	TWITCH_ALLTIME_TOP_CHEERER_AMOUNT = 'twitch_alltime_top_cheerer_amount',
	/** Top cheerers list (top 10, comma-separated usernames, sorted by total bits). Use as {{top_cheerer_list}}. */
	TOP_CHEERER_LIST = 'top_cheerer_list',
	/** Total bits for TOP_CHEERER_LIST (parallel comma-separated). Use as {{top_cheerer_list_amount}}. */
	TOP_CHEERER_LIST_AMOUNT = 'top_cheerer_list_amount',
	/** Top cheerers this week (top 10, comma-separated usernames). Use as {{week_top_cheerer_list}}. */
	WEEK_TOP_CHEERER_LIST = 'week_top_cheerer_list',
	/** Total bits for WEEK_TOP_CHEERER_LIST (parallel comma-separated). Use as {{week_top_cheerer_list_amount}}. */
	WEEK_TOP_CHEERER_LIST_AMOUNT = 'week_top_cheerer_list_amount',
	/** Top cheerers this month. Use as {{month_top_cheerer_list}}. */
	MONTH_TOP_CHEERER_LIST = 'month_top_cheerer_list',
	/** Total bits for MONTH_TOP_CHEERER_LIST. Use as {{month_top_cheerer_list_amount}}. */
	MONTH_TOP_CHEERER_LIST_AMOUNT = 'month_top_cheerer_list_amount',
	/** Top gifters list (top 10, comma-separated usernames, sorted by lifetime gifted subs). Use as {{top_gifter_list}}. */
	TOP_GIFTER_LIST = 'top_gifter_list',
	/** Total gifts for TOP_GIFTER_LIST (parallel comma-separated). Use as {{top_gifter_list_amount}}. */
	TOP_GIFTER_LIST_AMOUNT = 'top_gifter_list_amount',
	/** Top gifters this week. Use as {{week_top_gifter_list}}. */
	WEEK_TOP_GIFTER_LIST = 'week_top_gifter_list',
	/** Total gifts for WEEK_TOP_GIFTER_LIST. Use as {{week_top_gifter_list_amount}}. */
	WEEK_TOP_GIFTER_LIST_AMOUNT = 'week_top_gifter_list_amount',
	/** Top gifters this month. Use as {{month_top_gifter_list}}. */
	MONTH_TOP_GIFTER_LIST = 'month_top_gifter_list',
	/** Total gifts for MONTH_TOP_GIFTER_LIST. Use as {{month_top_gifter_list_amount}}. */
	MONTH_TOP_GIFTER_LIST_AMOUNT = 'month_top_gifter_list_amount',
	/** Last clip ID. Use as {{twitch_last_clip_id}}. */
	TWITCH_LAST_CLIP_ID = 'twitch_last_clip_id',
	/** Last clip URL. Use as {{twitch_last_clip_url}}. */
	TWITCH_LAST_CLIP_URL = 'twitch_last_clip_url',
	/** Last clip thumbnail URL. Use as {{twitch_last_clip_thumbnail_url}}. */
	TWITCH_LAST_CLIP_THUMBNAIL_URL = 'twitch_last_clip_thumbnail_url',
	/** Channel title. Use as {{twitch_channel_title}}. */
	TWITCH_CHANNEL_TITLE = 'twitch_channel_title',
	/** Channel description. Use as {{twitch_channel_description}}. */
	TWITCH_CHANNEL_DESCRIPTION = 'twitch_channel_description',
	/** Channel avatar URL. Use as {{twitch_avatar}}. */
	TWITCH_AVATAR = 'twitch_avatar',
	/** Offline image URL. Use as {{twitch_offline_image}}. */
	TWITCH_OFFLINE_IMAGE = 'twitch_offline_image',
	/** Current category/game. Use as {{twitch_category}}. */
	TWITCH_CATEGORY = 'twitch_category',
	/** Current category/game ID. Use as {{twitch_category_id}}. */
	TWITCH_CATEGORY_ID = 'twitch_category_id',
	/** Current poll ID. Use as {{twitch_current_poll_id}}. */
	TWITCH_CURRENT_POLL_ID = 'twitch_current_poll_id',
	/** Current prediction ID. Use as {{twitch_current_prediction_id}}. */
	TWITCH_CURRENT_PREDICTION_ID = 'twitch_current_prediction_id',

	// ─────────────────────────────────── YouTube ──────────────────────────────────

	/** Channel id. Use as {{youtube_channel_id}}. */
	YOUTUBE_CHANNEL_ID = 'youtube_channel_id',
	/** Current live broadcast video id, for embedding the active stream. Use as {{youtube_live_video_id}}. */
	YOUTUBE_LIVE_VIDEO_ID = 'youtube_live_video_id',
	/** Second live broadcast video id, for a simultaneous (e.g. vertical) stream. Use as {{youtube_second_live_video_id}}. */
	YOUTUBE_SECOND_LIVE_VIDEO_ID = 'youtube_second_live_video_id',
	/** Channel username (custom URL slug, falls back to channel title). Use as {{youtube_username}}. */
	YOUTUBE_USERNAME = 'youtube_username',
	/** Current viewer count. Use as {{youtube_current_viewer_count}}. */
	YOUTUBE_CURRENT_VIEWER_COUNT = 'youtube_current_viewer_count',
	/** Total viewer count (stream). Use as {{youtube_total_viewer_count}}. */
	YOUTUBE_TOTAL_VIEWER_COUNT = 'youtube_total_viewer_count',
	/** Stream likes. Use as {{youtube_stream_likes}}. */
	YOUTUBE_STREAM_LIKES = 'youtube_stream_likes',
	/** Stream dislikes. Use as {{youtube_stream_dislikes}}. */
	YOUTUBE_STREAM_DISLIKES = 'youtube_stream_dislikes',
	/** Stream chat message count. Use as {{youtube_stream_chat_count}}. */
	YOUTUBE_STREAM_CHAT_COUNT = 'youtube_stream_chat_count',

	/** Session chat count. Use as {{youtube_session_chat_count}}. */
	YOUTUBE_SESSION_CHAT_COUNT = 'youtube_session_chat_count',
	/** Current first chatter. Use as {{youtube_current_first_chatter}}. */
	YOUTUBE_CURRENT_FIRST_CHATTER = 'youtube_current_first_chatter',
	/** Current first chatter count. Use as {{youtube_current_first_chatter_count}}. */
	YOUTUBE_CURRENT_FIRST_CHATTER_COUNT = 'youtube_current_first_chatter_count',
	/** Previous first chatter. Use as {{youtube_previous_first_chatter}}. */
	YOUTUBE_PREVIOUS_FIRST_CHATTER = 'youtube_previous_first_chatter',
	/** Previous first chatter count. Use as {{youtube_previous_first_chatter_count}}. */
	YOUTUBE_PREVIOUS_FIRST_CHATTER_COUNT = 'youtube_previous_first_chatter_count', // keep exact value
	/** Last chatter. Use as {{youtube_last_chatter}}. */
	YOUTUBE_LAST_CHATTER = 'youtube_last_chatter',
	/** Session subscriber count. Use as {{youtube_session_subscriber_count}}. */
	YOUTUBE_SESSION_SUBSCRIBER_COUNT = 'youtube_session_subscriber_count',
	/** Subscribers for the current calendar week. Use as {{youtube_week_subscriber_count}}. */
	YOUTUBE_WEEK_SUBSCRIBER_COUNT = 'youtube_week_subscriber_count',
	/** Subscribers for the current calendar month. Use as {{youtube_month_subscriber_count}}. */
	YOUTUBE_MONTH_SUBSCRIBER_COUNT = 'youtube_month_subscriber_count',
	/** Lifetime subscriber count. Use as {{youtube_total_subscriber_count}}. */
	YOUTUBE_TOTAL_SUBSCRIBER_COUNT = 'youtube_total_subscriber_count',
	/** Session SuperChat count. Use as {{youtube_session_superchat_count}}. */
	YOUTUBE_SESSION_SUPERCHAT_COUNT = 'youtube_session_superchat_count',
	/** Last SuperChatter. Use as {{youtube_last_superchatter}}. */
	YOUTUBE_LAST_SUPERCHATTER = 'youtube_last_superchatter',
	/** Session SuperChatters (list). Use as {{youtube_session_superchatters}}. */
	YOUTUBE_SESSION_SUPERCHATTERS = 'youtube_session_superchatters',
	/** Session SuperSticker count. Use as {{youtube_session_supersticker_count}}. */
	YOUTUBE_SESSION_SUPERSTICKER_COUNT = 'youtube_session_supersticker_count',
	/** Last SuperSticker sender. Use as {{youtube_last_supersticker}}. */
	YOUTUBE_LAST_SUPERSTICKER = 'youtube_last_supersticker',
	/** Session SuperStickers (list). Use as {{youtube_session_superstickers}}. */
	YOUTUBE_SESSION_SUPERSTICKERS = 'youtube_session_superstickers',
	/** Lifetime member count. Use as {{youtube_total_member_count}}. */
	YOUTUBE_TOTAL_MEMBER_COUNT = 'youtube_total_member_count',
	/** Session member count. Use as {{youtube_session_member_count}}. */
	YOUTUBE_SESSION_MEMBER_COUNT = 'youtube_session_member_count',
	/** Members for the current calendar week. Use as {{youtube_week_member_count}}. */
	YOUTUBE_WEEK_MEMBER_COUNT = 'youtube_week_member_count',
	/** Members for the current calendar month. Use as {{youtube_month_member_count}}. */
	YOUTUBE_MONTH_MEMBER_COUNT = 'youtube_month_member_count',
	/** Last member. Use as {{youtube_last_member}}. */
	YOUTUBE_LAST_MEMBER = 'youtube_last_member',
	/** Session members (list). Use as {{youtube_session_members}}. */
	YOUTUBE_SESSION_MEMBERS = 'youtube_session_members',
	/** Lifetime gift members count. Use as {{youtube_total_gift_members_count}}. */
	YOUTUBE_TOTAL_GIFT_MEMBERS_COUNT = 'youtube_total_gift_members_count',
	/** Session gift members count. Use as {{youtube_session_gift_members_count}}. */
	YOUTUBE_SESSION_GIFT_MEMBERS_COUNT = 'youtube_session_gift_members_count',
	/** Last gift member. Use as {{youtube_last_gift_member}}. */
	YOUTUBE_LAST_GIFT_MEMBER = 'youtube_last_gift_member',
	/** Session gift members (list). Use as {{youtube_session_gift_members}}. */
	YOUTUBE_SESSION_GIFT_MEMBERS = 'youtube_session_gift_members',
	/** Lifetime jewels count. Use as {{youtube_total_jewels_count}}. */
	YOUTUBE_TOTAL_JEWELS_COUNT = 'youtube_total_jewels_count',
	/** Session jewels count. Use as {{youtube_session_jewels_count}}. */
	YOUTUBE_SESSION_JEWELS_COUNT = 'youtube_session_jewels_count',
	/** Last jewel amount. Use as {{youtube_last_jewels}}. */
	YOUTUBE_LAST_JEWELS = 'youtube_last_jewels',
	/** Last user that sent jewels. Use as {{youtube_last_jewels_user}}. */
	YOUTUBE_LAST_JEWELS_USER = 'youtube_last_jewels_user',
	/** Session jewel gifters (list). Use as {{youtube_session_jewels_gifters}}. */
	YOUTUBE_SESSION_JEWELS_GIFTERS = 'youtube_session_jewels_gifters',
	/** Last subscriber. Use as {{youtube_last_subscriber}}. */
	YOUTUBE_LAST_SUBSCRIBER = 'youtube_last_subscriber',
	/** Total uploaded videos. Use as {{youtube_total_video_count}}. */
	YOUTUBE_TOTAL_VIDEO_COUNT = 'youtube_total_video_count',
	/** Total channel views. Use as {{youtube_total_view_count}}. */
	YOUTUBE_TOTAL_VIEW_COUNT = 'youtube_total_view_count',

	// ────────────────────────────────── Facebook ──────────────────────────────────

	/** Page / user id. Use as {{facebook_user_id}}. */
	FACEBOOK_USER_ID = 'facebook_user_id',
	/** Page / user username. Use as {{facebook_username}}. */
	FACEBOOK_USERNAME = 'facebook_username',
	/** Session chat count. Use as {{facebook_session_chat_count}}. */
	FACEBOOK_SESSION_CHAT_COUNT = 'facebook_session_chat_count',
	/** Current first chatter. Use as {{facebook_current_first_chatter}}. */
	FACEBOOK_CURRENT_FIRST_CHATTER = 'facebook_current_first_chatter',
	/** Current first chatter count. Use as {{facebook_current_first_chatter_count}}. */
	FACEBOOK_CURRENT_FIRST_CHATTER_COUNT = 'facebook_current_first_chatter_count',
	/** Previous first chatter. Use as {{facebook_previous_first_chatter}}. */
	FACEBOOK_PREVIOUS_FIRST_CHATTER = 'facebook_previous_first_chatter',
	/** Previous first chatter count. Use as {{facebook_previous_first_chatter_count}}. */
	FACEBOOK_PREVIOUS_FIRST_CHATTER_COUNT = 'facebook_previous_first_chatter_count', // keep exact value
	/** Last chatter. Use as {{facebook_last_chatter}}. */
	FACEBOOK_LAST_CHATTER = 'facebook_last_chatter',
	/** Lifetime follower count. Use as {{facebook_total_follower_count}}. */
	FACEBOOK_TOTAL_FOLLOWER_COUNT = 'facebook_total_follower_count',
	/** Session follower count. Use as {{facebook_session_follower_count}}. */
	FACEBOOK_SESSION_FOLLOWER_COUNT = 'facebook_session_follower_count',
	/** Followers for the current calendar week. Use as {{facebook_week_follower_count}}. */
	FACEBOOK_WEEK_FOLLOWER_COUNT = 'facebook_week_follower_count',
	/** Followers for the current calendar month. Use as {{facebook_month_follower_count}}. */
	FACEBOOK_MONTH_FOLLOWER_COUNT = 'facebook_month_follower_count',
	/** Lifetime fan count. Use as {{facebook_total_fan_count}}. */
	FACEBOOK_TOTAL_FAN_COUNT = 'facebook_total_fan_count',
	/** Session fan count. Use as {{facebook_session_fan_count}}. */
	FACEBOOK_SESSION_FAN_COUNT = 'facebook_session_fan_count',
	/** Fans for the current calendar week. Use as {{facebook_week_fan_count}}. */
	FACEBOOK_WEEK_FAN_COUNT = 'facebook_week_fan_count',
	/** Fans for the current calendar month. Use as {{facebook_month_fan_count}}. */
	FACEBOOK_MONTH_FAN_COUNT = 'facebook_month_fan_count',
	/** Session reaction count. Use as {{facebook_reaction_count}}. */
	FACEBOOK_REACTION_COUNT = 'facebook_reaction_count',
	/** Last Stars sender. Use as {{facebook_last_star}}. */
	FACEBOOK_LAST_STAR = 'facebook_last_star',
	/** Last Stars amount. Use as {{facebook_last_star_amount}}. */
	FACEBOOK_LAST_STAR_AMOUNT = 'facebook_last_star_amount',
	/** Session Stars list. Use as {{facebook_session_stars}}. */
	FACEBOOK_SESSION_STARS = 'facebook_session_stars',
	/** Session Stars with amounts list. Use as {{facebook_session_stars_with_amount}}. */
	FACEBOOK_SESSION_STARS_WITH_AMOUNT = 'facebook_session_stars_with_amount',

	// ─────────────────────────────────── TikTok ───────────────────────────────────

	/** Channel user id. Use as {{tiktok_user_id}}. */
	TIKTOK_USER_ID = 'tiktok_user_id',
	/** Channel username. Use as {{tiktok_username}}. */
	TIKTOK_USERNAME = 'tiktok_username',
	/** Session chat count. Use as {{tiktok_session_chat_count}}. */
	TIKTOK_SESSION_CHAT_COUNT = 'tiktok_session_chat_count',
	/** Current first chatter. Use as {{tiktok_current_first_chatter}}. */
	TIKTOK_CURRENT_FIRST_CHATTER = 'tiktok_current_first_chatter',
	/** Current first chatter count. Use as {{tiktok_current_first_chatter_count}}. */
	TIKTOK_CURRENT_FIRST_CHATTER_COUNT = 'tiktok_current_first_chatter_count',
	/** Previous first chatter. Use as {{tiktok_previous_first_chatter}}. */
	TIKTOK_PREVIOUS_FIRST_CHATTER = 'tiktok_previous_first_chatter',
	/** Previous first chatter count. Use as {{tiktok_previous_first_chatter_count}}. */
	TIKTOK_PREVIOUS_FIRST_CHATTER_COUNT = 'tiktok_previous_first_chatter_count', // keep exact value
	/** Last chatter. Use as {{tiktok_last_chatter}}. */
	TIKTOK_LAST_CHATTER = 'tiktok_last_chatter',
	/** Current viewer count. Use as {{tiktok_current_viewer_count}}. */
	TIKTOK_CURRENT_VIEWER_COUNT = 'tiktok_current_viewer_count',
	/** Lifetime follower count. Use as {{tiktok_total_follower_count}}. */
	TIKTOK_TOTAL_FOLLOWER_COUNT = 'tiktok_total_follower_count',
	/** Session follower count. Use as {{tiktok_session_follower_count}}. */
	TIKTOK_SESSION_FOLLOWER_COUNT = 'tiktok_session_follower_count',
	/** Followers for the current calendar week. Use as {{tiktok_week_follower_count}}. */
	TIKTOK_WEEK_FOLLOWER_COUNT = 'tiktok_week_follower_count',
	/** Followers for the current calendar month. Use as {{tiktok_month_follower_count}}. */
	TIKTOK_MONTH_FOLLOWER_COUNT = 'tiktok_month_follower_count',
	/** Session super fan count. Use as {{tiktok_session_super_fan_count}}. */
	TIKTOK_SESSION_SUPER_FAN_COUNT = 'tiktok_session_super_fan_count',
	/** Session share count. Use as {{tiktok_session_share_count}}. */
	TIKTOK_SESSION_SHARE_COUNT = 'tiktok_session_share_count',
	/** Last follower. Use as {{tiktok_last_follower}}. */
	TIKTOK_LAST_FOLLOWER = 'tiktok_last_follower',
	/** Last super fan. Use as {{tiktok_last_super_fan}}. */
	TIKTOK_LAST_SUPER_FAN = 'tiktok_last_super_fan',
	/** Last gifter. Use as {{tiktok_last_gifter}}. */
	TIKTOK_LAST_GIFTER = 'tiktok_last_gifter',
	/** Session gifters (list). Use as {{tiktok_session_gifters}}. */
	TIKTOK_SESSION_GIFTERS = 'tiktok_session_gifters',
	/** Session gifts (count/list). Use as {{tiktok_session_gifts}}. */
	TIKTOK_SESSION_GIFTS = 'tiktok_session_gifts',
	/** Total gifts. Use as {{tiktok_total_gifts}}. */
	TIKTOK_TOTAL_GIFTS = 'tiktok_total_gifts',
	/** Total likes. Use as {{tiktok_total_likes}}. */
	TIKTOK_TOTAL_LIKES = 'tiktok_total_likes',
	/** Session likes (running total this session). Use as {{tiktok_session_likes}}. */
	TIKTOK_SESSION_LIKES = 'tiktok_session_likes',
	/** Uploaded videos count. Use as {{tiktok_video_count}}. */
	TIKTOK_VIDEO_COUNT = 'tiktok_video_count',

	/** Last video title. Use as {{tiktok_last_video_title}}. */
	TIKTOK_LAST_VIDEO_TITLE = 'tiktok_last_video_title',
	/** Last video ID. Use as {{tiktok_last_video_id}}. */
	TIKTOK_LAST_VIDEO_ID = 'tiktok_last_video_id',
	/** Last video link. Use as {{tiktok_last_video_link}}. */
	TIKTOK_LAST_VIDEO_LINK = 'tiktok_last_video_link',
	/** Last video embed URL. Use as {{tiktok_last_video_embed}}. */
	TIKTOK_LAST_VIDEO_EMBED = 'tiktok_last_video_embed',

	// ─────────────────────────────────── Kick ─────────────────────────────────────

	/** Channel user ID. Use as {{kick_user_id}}. */
	KICK_USER_ID = 'kick_user_id',
	/** Channel username. Use as {{kick_username}}. */
	KICK_USERNAME = 'kick_username',
	/** Channel title. Use as {{kick_channel_title}}. */
	KICK_CHANNEL_TITLE = 'kick_channel_title',
	/** Channel description. Use as {{kick_channel_description}}. */
	KICK_CHANNEL_DESCRIPTION = 'kick_channel_description',
	/** Channel avatar URL. Use as {{kick_avatar}}. */
	KICK_AVATAR = 'kick_avatar',
	/** Current category. Use as {{kick_category}}. */
	KICK_CATEGORY = 'kick_category',
	/** Current category ID. Use as {{kick_category_id}}. */
	KICK_CATEGORY_ID = 'kick_category_id',
	/** Stream title. Use as {{kick_stream_title}}. */
	KICK_STREAM_TITLE = 'kick_stream_title',
	/** Session chat count. Use as {{kick_session_chat_count}}. */
	KICK_SESSION_CHAT_COUNT = 'kick_session_chat_count',
	/** Current first chatter. Use as {{kick_current_first_chatter}}. */
	KICK_CURRENT_FIRST_CHATTER = 'kick_current_first_chatter',
	/** Current first chatter count. Use as {{kick_current_first_chatter_count}}. */
	KICK_CURRENT_FIRST_CHATTER_COUNT = 'kick_current_first_chatter_count',
	/** Previous first chatter. Use as {{kick_previous_first_chatter}}. */
	KICK_PREVIOUS_FIRST_CHATTER = 'kick_previous_first_chatter',
	/** Previous first chatter count. Use as {{kick_previous_first_chatter_count}}. */
	KICK_PREVIOUS_FIRST_CHATTER_COUNT = 'kick_previous_first_chatter_count', // keep exact value
	/** Last chatter. Use as {{kick_last_chatter}}. */
	KICK_LAST_CHATTER = 'kick_last_chatter',
	/** Current viewer count. Use as {{kick_current_viewer_count}}. */
	KICK_CURRENT_VIEWER_COUNT = 'kick_current_viewer_count',
	/** Lifetime follower count. Use as {{kick_total_follower_count}}. */
	KICK_TOTAL_FOLLOWER_COUNT = 'kick_total_follower_count',
	/** Session follower count. Use as {{kick_session_follower_count}}. */
	KICK_SESSION_FOLLOWER_COUNT = 'kick_session_follower_count',
	/** Followers for the current calendar week. Use as {{kick_week_follower_count}}. */
	KICK_WEEK_FOLLOWER_COUNT = 'kick_week_follower_count',
	/** Followers for the current calendar month. Use as {{kick_month_follower_count}}. */
	KICK_MONTH_FOLLOWER_COUNT = 'kick_month_follower_count',
	/** Lifetime total subs. Use as {{kick_total_subscriber_count}}. */
	KICK_TOTAL_SUBSCRIBER_COUNT = 'kick_total_subscriber_count',
	/** Session subs count. Use as {{kick_session_subscriber_count}}. */
	KICK_SESSION_SUBSCRIBER_COUNT = 'kick_session_subscriber_count',
	/** Subscribers for the current calendar week. Use as {{kick_week_subscriber_count}}. */
	KICK_WEEK_SUBSCRIBER_COUNT = 'kick_week_subscriber_count',
	/** Subscribers for the current calendar month. Use as {{kick_month_subscriber_count}}. */
	KICK_MONTH_SUBSCRIBER_COUNT = 'kick_month_subscriber_count',
	/** Session gifts count. Use as {{kick_session_gifts_count}}. */
	KICK_SESSION_GIFTS_COUNT = 'kick_session_gifts_count',
	/** Session subscribers list. Use as {{kick_session_subscribers}}. */
	KICK_SESSION_SUBSCRIBERS = 'kick_session_subscribers',
	/** Last user to send a Kicks. Use as {{kick_last_kicks}}. */
	KICK_LAST_KICKS = 'kick_last_kicks',
	/** Last amount of a Kicks sent. Use as {{kick_last_kicks_amount}}. */
	KICK_LAST_KICKS_AMOUNT = 'kick_last_kicks_amount',
	/** Lifetime kicks count. Use as {{kick_total_kicks_count}}. */
	KICK_TOTAL_KICKS_COUNT = 'kick_total_kicks_count',
	/** Session kicks count. Use as {{kick_session_kicks_count}}. */
	KICK_SESSION_KICKS_COUNT = 'kick_session_kicks_count',
	/** Session kicks list. Use as {{kick_session_kicks}}. */
	KICK_SESSION_KICKS = 'kick_session_kicks',
	/** Session kicks with amounts list. Use as {{kick_session_kicks_with_amount}}. */
	KICK_SESSION_KICKS_WITH_AMOUNT = 'kick_session_kicks_with_amount',
	/** Last follower. Use as {{kick_last_follower}}. */
	KICK_LAST_FOLLOWER = 'kick_last_follower',
	/** Last subscriber. Use as {{kick_last_subscriber}}. */
	KICK_LAST_SUBSCRIBER = 'kick_last_subscriber',
	/** Last gifter (the person who sent the gift). Use as {{kick_last_gifter}}. */
	KICK_LAST_GIFTER = 'kick_last_gifter',
	/** Last gifted sub amount (number of subs in the last gift drop). Use as {{kick_last_gifter_amount}}. */
	KICK_LAST_GIFTER_AMOUNT = 'kick_last_gifter_amount',
	/** Last gift recipient (the person who received the most recent gifted sub on Kick). Use as {{kick_last_gifted}}. */
	KICK_LAST_GIFTED = 'kick_last_gifted',
	/** Last host. Use as {{kick_last_host}}. */
	KICK_LAST_HOST = 'kick_last_host',
	/** Last host viewer amount. Use as {{kick_last_host_amount}}. */
	KICK_LAST_HOST_AMOUNT = 'kick_last_host_amount',
	/** Lifetime gift members count. Use as {{kick_total_gift_subscription_count}}. */
	KICK_TOTAL_GIFT_SUBSCRIPTION_COUNT = 'kick_total_gift_subscription_count',
	/** Get avatar by username. Use as {{kick_get_avatar}}. */
	KICK_GET_AVATAR = 'kick_get_avatar',

	// ─────────────────────────────────── Spotify ───────────────────────────────────

	/** Now playing song title. Use as {{spotify_now_playing_song}}. */
	SPOTIFY_NOW_PLAYING_SONG = 'spotify_now_playing_song',
	/** Now playing artwork URL. Use as {{spotify_now_playing_image}}. */
	SPOTIFY_NOW_PLAYING_IMAGE = 'spotify_now_playing_image',
	/** Now playing artist(s). Use as {{spotify_now_playing_artist}}. */
	SPOTIFY_NOW_PLAYING_ARTIST = 'spotify_now_playing_artist',
	/** Now playing track ID. Use as {{spotify_now_playing_id}}. */
	SPOTIFY_NOW_PLAYING_ID = 'spotify_now_playing_id',
	/** Now playing track URL. Use as {{spotify_now_playing_url}}. */
	SPOTIFY_NOW_PLAYING_URL = 'spotify_now_playing_url',
	/** Now playing Spotify URI. Use as {{spotify_now_playing_uri}}. */
	SPOTIFY_NOW_PLAYING_URI = 'spotify_now_playing_uri',
	/** Now playing track duration in seconds. Use as {{spotify_now_playing_duration}}. */
	SPOTIFY_NOW_PLAYING_DURATION = 'spotify_now_playing_duration',
	/** Now playing track position in seconds at the last play/pause/seek anchor. Use as {{spotify_now_playing_progress}}. */
	SPOTIFY_NOW_PLAYING_PROGRESS = 'spotify_now_playing_progress',
	/** Epoch ms when the progress anchor was captured (for client-side interpolation). Use as {{spotify_now_playing_progress_ts}}. */
	SPOTIFY_NOW_PLAYING_PROGRESS_TS = 'spotify_now_playing_progress_ts',
	/** Whether playback is currently advancing (true/false). Use as {{spotify_now_playing_is_playing}}. */
	SPOTIFY_NOW_PLAYING_IS_PLAYING = 'spotify_now_playing_is_playing',
	/** Now playing album name. Use as {{spotify_now_playing_album}}. */
	SPOTIFY_NOW_PLAYING_ALBUM = 'spotify_now_playing_album',
	/** Now playing album release year. Use as {{spotify_now_playing_release_year}}. */
	SPOTIFY_NOW_PLAYING_RELEASE_YEAR = 'spotify_now_playing_release_year',
	/** Now playing track popularity score 0-100 from Spotify. Use as {{spotify_now_playing_popularity}}. */
	SPOTIFY_NOW_PLAYING_POPULARITY = 'spotify_now_playing_popularity',
	/** Upcoming queue as a JSON array of {name, artist, image, uri, url}. Use as {{spotify_now_playing_queue}}. */
	SPOTIFY_NOW_PLAYING_QUEUE = 'spotify_now_playing_queue',
	/** Next song title. Use as {{spotify_next_song}}. */
	SPOTIFY_NEXT_SONG = 'spotify_next_song',
	/** Next song artwork URL. Use as {{spotify_next_image}}. */
	SPOTIFY_NEXT_IMAGE = 'spotify_next_image',
	/** Next song artist(s). Use as {{spotify_next_artist}}. */
	SPOTIFY_NEXT_ARTIST = 'spotify_next_artist',
	/** Next song ID. Use as {{spotify_next_id}}. */
	SPOTIFY_NEXT_ID = 'spotify_next_id',
	/** Next song URL. Use as {{spotify_next_url}}. */
	SPOTIFY_NEXT_URL = 'spotify_next_url',
	/** Next song Spotify URI. Use as {{spotify_next_uri}}. */
	SPOTIFY_NEXT_URI = 'spotify_next_uri',

	// ─────────────────────────────── YouTube Music ────────────────────────────────

	/** Now playing song title. Use as {{youtubemusic_now_playing_song}}. */
	YOUTUBEMUSIC_NOW_PLAYING_SONG = 'youtubemusic_now_playing_song',
	/** Now playing artwork URL. Use as {{youtubemusic_now_playing_image}}. */
	YOUTUBEMUSIC_NOW_PLAYING_IMAGE = 'youtubemusic_now_playing_image',
	/** Now playing artist(s). Use as {{youtubemusic_now_playing_artist}}. */
	YOUTUBEMUSIC_NOW_PLAYING_ARTIST = 'youtubemusic_now_playing_artist',
	/** Now playing ID. Use as {{youtubemusic_now_playing_id}}. */
	YOUTUBEMUSIC_NOW_PLAYING_ID = 'youtubemusic_now_playing_id',
	/** Now playing URL. Use as {{youtubemusic_now_playing_url}}. */
	YOUTUBEMUSIC_NOW_PLAYING_URL = 'youtubemusic_now_playing_url',
	/** Now playing track duration in seconds. Use as {{youtubemusic_now_playing_duration}}. */
	YOUTUBEMUSIC_NOW_PLAYING_DURATION = 'youtubemusic_now_playing_duration',
	/** Now playing track position in seconds at the last play/pause/seek anchor. Use as {{youtubemusic_now_playing_progress}}. */
	YOUTUBEMUSIC_NOW_PLAYING_PROGRESS = 'youtubemusic_now_playing_progress',
	/** Epoch ms when the progress anchor was captured (for client-side interpolation). Use as {{youtubemusic_now_playing_progress_ts}}. */
	YOUTUBEMUSIC_NOW_PLAYING_PROGRESS_TS = 'youtubemusic_now_playing_progress_ts',
	/** Whether playback is currently advancing (true/false). Use as {{youtubemusic_now_playing_is_playing}}. */
	YOUTUBEMUSIC_NOW_PLAYING_IS_PLAYING = 'youtubemusic_now_playing_is_playing',
	/** Upcoming queue as a JSON array of {name, artist, image, uri, url}. Use as {{youtubemusic_now_playing_queue}}. */
	YOUTUBEMUSIC_NOW_PLAYING_QUEUE = 'youtubemusic_now_playing_queue',
	/** Next song title. Use as {{youtubemusic_next_song}}. */
	YOUTUBEMUSIC_NEXT_SONG = 'youtubemusic_next_song',
	/** Next song artwork URL. Use as {{youtubemusic_next_image}}. */
	YOUTUBEMUSIC_NEXT_IMAGE = 'youtubemusic_next_image',
	/** Next song artist(s). Use as {{youtubemusic_next_artist}}. */
	YOUTUBEMUSIC_NEXT_ARTIST = 'youtubemusic_next_artist',
	/** Next song ID. Use as {{youtubemusic_next_id}}. */
	YOUTUBEMUSIC_NEXT_ID = 'youtubemusic_next_id',
	/** Next song URL. Use as {{youtubemusic_next_url}}. */
	YOUTUBEMUSIC_NEXT_URL = 'youtubemusic_next_url',
	/** Current queue (comma-separated). Use as {{youtubemusic_queue}}. */
	YOUTUBEMUSIC_QUEUE = 'youtubemusic_queue',

	// ───────────────────────────────── Now Playing ─────────────────────────────────

	/** Track ID (computed). Use as {{now_playing_id}}. */
	NOW_PLAYING_ID = 'now_playing_id',
	/** Track title. Use as {{now_playing_title}}. */
	NOW_PLAYING_TITLE = 'now_playing_title',
	/** Artwork URL. Use as {{now_playing_artwork}}. */
	NOW_PLAYING_ARTWORK = 'now_playing_artwork',
	/** Artist name(s). Use as {{now_playing_artist}}. */
	NOW_PLAYING_ARTIST = 'now_playing_artist',
	/** Album name. Use as {{now_playing_album}}. */
	NOW_PLAYING_ALBUM = 'now_playing_album',
	/** Label. Use as {{now_playing_label}}. */
	NOW_PLAYING_LABEL = 'now_playing_label',
	/** BPM. Use as {{now_playing_bpm}}. */
	NOW_PLAYING_BPM = 'now_playing_bpm',
	/** Rating. Use as {{now_playing_rating}}. */
	NOW_PLAYING_RATING = 'now_playing_rating',
	/** Length (seconds). Use as {{now_playing_length}}. */
	NOW_PLAYING_LENGTH = 'now_playing_length',
	/** Comment. Use as {{now_playing_comment}}. */
	NOW_PLAYING_COMMENT = 'now_playing_comment',
	/** Musical key. Use as {{now_playing_key}}. */
	NOW_PLAYING_KEY = 'now_playing_key',
	/** Generic URL. Use as {{now_playing_url}}. */
	NOW_PLAYING_URL = 'now_playing_url',
	/** Spotify URL. Use as {{now_playing_spotify_url}}. */
	NOW_PLAYING_SPOTIFY_URL = 'now_playing_spotify_url',
	/** Beatport URL. Use as {{now_playing_beatport_url}}. */
	NOW_PLAYING_BEATPORT_URL = 'now_playing_beatport_url',
	/** Beatport ID. Use as {{now_playing_beatport_id}}. */
	NOW_PLAYING_BEATPORT_ID = 'now_playing_beatport_id',
	/** File path to media. Use as {{now_playing_file_path}}. */
	NOW_PLAYING_FILE_PATH = 'now_playing_file_path',

	// ───────────────────────────────────── VLC ─────────────────────────────────────

	/** Currently playing media title. Use as {{vlc_now_playing_media}}. */
	VLC_NOW_PLAYING_MEDIA = 'vlc_now_playing_media',
	/** Artwork URL. Use as {{vlc_now_playing_image}}. */
	VLC_NOW_PLAYING_IMAGE = 'vlc_now_playing_image',
	/** Artist(s). Use as {{vlc_now_playing_artist}}. */
	VLC_NOW_PLAYING_ARTIST = 'vlc_now_playing_artist',
	/** Media ID. Use as {{vlc_now_playing_id}}. */
	VLC_NOW_PLAYING_ID = 'vlc_now_playing_id',
	/** Media URL. Use as {{vlc_now_playing_url}}. */
	VLC_NOW_PLAYING_URL = 'vlc_now_playing_url',
	/** Now playing media duration in seconds. Use as {{vlc_now_playing_duration}}. */
	VLC_NOW_PLAYING_DURATION = 'vlc_now_playing_duration',
	/** Now playing media position in seconds at the last play/pause/seek anchor. Use as {{vlc_now_playing_progress}}. */
	VLC_NOW_PLAYING_PROGRESS = 'vlc_now_playing_progress',
	/** Epoch ms when the progress anchor was captured (for client-side interpolation). Use as {{vlc_now_playing_progress_ts}}. */
	VLC_NOW_PLAYING_PROGRESS_TS = 'vlc_now_playing_progress_ts',
	/** Whether playback is currently advancing (true/false). Use as {{vlc_now_playing_is_playing}}. */
	VLC_NOW_PLAYING_IS_PLAYING = 'vlc_now_playing_is_playing',
	/** Media URI. Use as {{vlc_now_playing_uri}}. */
	VLC_NOW_PLAYING_URI = 'vlc_now_playing_uri',

	// ────────────────────────────────── Voicemod ──────────────────────────────────

	/** Voice changer on (true/false). Use as {{voicemod_voice_changer_on}}. */
	VOICEMOD_VOICE_CHANGER_ON = 'voicemod_voice_changer_on',
	/** Previous voice. Use as {{voicemod_previous_voice}}. */
	VOICEMOD_PREVIOUS_VOICE = 'voicemod_previous_voice',
	/** Current voice. Use as {{voicemod_current_voice}}. */
	VOICEMOD_CURRENT_VOICE = 'voicemod_current_voice',

	// ───────────────────────────────── WooCommerce ─────────────────────────────────

	/** Last order full name. Use as {{woocommerce_last_order_name}}. */
	WOOCOMMERCE_LAST_ORDER_NAME = 'woocommerce_last_order_name',
	/** Last order first name. Use as {{woocommerce_last_order_first_name}}. */
	WOOCOMMERCE_LAST_ORDER_FIRST_NAME = 'woocommerce_last_order_first_name',
	/** Last order last name. Use as {{woocommerce_last_order_last_name}}. */
	WOOCOMMERCE_LAST_ORDER_LAST_NAME = 'woocommerce_last_order_last_name',
	/** Last ordered item (first). Use as {{woocommerce_last_order_item}}. */
	WOOCOMMERCE_LAST_ORDER_ITEM = 'woocommerce_last_order_item',
	/** Last ordered items (list). Use as {{woocommerce_last_order_items}}. */
	WOOCOMMERCE_LAST_ORDER_ITEMS = 'woocommerce_last_order_items',
	/** Last order amount. Use as {{woocommerce_last_order_amount}}. */
	WOOCOMMERCE_LAST_ORDER_AMOUNT = 'woocommerce_last_order_amount',
	/** Last order amount currency code. Use as {{woocommerce_last_order_amount_currency}}. */
	WOOCOMMERCE_LAST_ORDER_AMOUNT_CURRENCY = 'woocommerce_last_order_amount_currency',

	// ───────────────────────────────────── OBS ─────────────────────────────────────

	/** Is streaming (true/false). Use as {{obs_is_streaming}}. */
	OBS_IS_STREAMING = 'obs_is_streaming',
	/** Is recording (true/false). Use as {{obs_is_recording}}. */
	OBS_IS_RECORDING = 'obs_is_recording',
	/** Last recording path. Use as {{obs_last_recording_path}}. */
	OBS_LAST_RECORDING_PATH = 'obs_last_recording_path',
	/** Studio mode on (true/false). Use as {{obs_studio_mode}}. */
	OBS_STUDIO_MODE = 'obs_studio_mode',
	/** Current profile. Use as {{obs_current_profile}}. */
	OBS_CURRENT_PROFILE = 'obs_current_profile',
	/** Current scene. Use as {{obs_current_scene}}. */
	OBS_CURRENT_SCENE = 'obs_current_scene',
	/** Previous scene. Use as {{obs_previous_scene}}. */
	OBS_PREVIOUS_SCENE = 'obs_previous_scene',
	/** Current transition (if transitioning). Use as {{obs_current_transition}}. */
	OBS_CURRENT_TRANSITION = 'obs_current_transition',
	/** Last replay buffer save path. Use as {{obs_last_replay_buffer_path}}. */
	OBS_LAST_REPLAY_BUFFER_PATH = 'obs_last_replay_buffer_path',
	/** Last vertical backtrack save path. Use as {{obs_last_vertical_backtrack_path}}. */
	OBS_LAST_VERTICAL_BACKTRACK_PATH = 'obs_last_vertical_backtrack_path',

	// ───────────────────────────────────── SLOBS ───────────────────────────────────

	/** Current scene. Use as {{slobs_current_scene}}. */
	SLOBS_CURRENT_SCENE = 'slobs_current_scene',
	/** Previous scene. Use as {{slobs_previous_scene}}. */
	SLOBS_PREVIOUS_SCENE = 'slobs_previous_scene',
	/** Current scene collection. Use as {{slobs_current_scene_collection}}. */
	SLOBS_CURRENT_SCENE_COLLECTION = 'slobs_current_scene_collection',

	// ───────────────────────────────────── Meld ───────────────────────────────────

	/** Is streaming (true/false). Use as {{meld_is_streaming}}. */
	MELD_IS_STREAMING = 'meld_is_streaming',
	/** Is recording (true/false). Use as {{meld_is_recording}}. */
	MELD_IS_RECORDING = 'meld_is_recording',
	/** Current scene. Use as {{meld_current_scene}}. */
	MELD_CURRENT_SCENE = 'meld_current_scene',
	/** Previous scene. Use as {{meld_previous_scene}}. */
	MELD_PREVIOUS_SCENE = 'meld_previous_scene',
	/** Current vertical scene. Use as {{meld_current_vertical_scene}}. */
	MELD_CURRENT_VERTICAL_SCENE = 'meld_current_vertical_scene',
	/** Previous vertical scene. Use as {{meld_previous_vertical_scene}}. */
	MELD_PREVIOUS_VERTICAL_SCENE = 'meld_previous_vertical_scene',

	// ───────────────────────────────── Streamer.bot ────────────────────────────────

	/** Last Streamer.bot action. Use as {{streamerbot_last_action}}. */
	STREAMERBOT_LAST_ACTION = 'streamerbot_last_action',

	// ───────────────────────────────── VTube Studio ───────────────────────────────

	/** Current VTS model. Use as {{vtubestudio_current_model}}. */
	VTUBESTUDIO_CURRENT_MODEL = 'vtubestudio_current_model',
	/** Current VTS background. Use as {{vtubestudio_current_background}}. */
	VTUBESTUDIO_CURRENT_BACKGROUND = 'vtubestudio_current_background',
	/** Last VTS hotkey triggered. Use as {{vtubestudio_last_hotkey_triggered}}. */
	VTUBESTUDIO_LAST_HOTKEY_TRIGGERED = 'vtubestudio_last_hotkey_triggered',

	// ─────────────────────────────── Charity Campaigns ────────────────────────────
	// Campaign totals from the polled-API charity integrations (Tiltify / Extra
	// Life / DonorDrive). Written by their respective managers on every poll;
	// goal_amount mirrors the campaign target the streamer set on the platform
	// and total_raised mirrors the running raised total. Reset to 0 on Stop.

	/** Tiltify campaign fundraising goal (currency value). Use as {{tiltify_goal_amount}}. */
	TILTIFY_GOAL_AMOUNT = 'tiltify_goal_amount',
	/** Tiltify campaign amount raised so far (currency value). Use as {{tiltify_total_raised}}. */
	TILTIFY_TOTAL_RAISED = 'tiltify_total_raised',
	/** Extra Life campaign fundraising goal (USD). Use as {{extralife_goal_amount}}. */
	EXTRALIFE_GOAL_AMOUNT = 'extralife_goal_amount',
	/** Extra Life campaign amount raised so far (USD). Use as {{extralife_total_raised}}. */
	EXTRALIFE_TOTAL_RAISED = 'extralife_total_raised',
	/** DonorDrive campaign fundraising goal. Use as {{donordrive_goal_amount}}. */
	DONORDRIVE_GOAL_AMOUNT = 'donordrive_goal_amount',
	/** DonorDrive campaign amount raised so far. Use as {{donordrive_total_raised}}. */
	DONORDRIVE_TOTAL_RAISED = 'donordrive_total_raised',

	// ────────────────────────────────── Twitch channel points ─────────────────────

	/** (Twitch) Most recent channel-points redeemer name. Use as {{twitch_last_channel_points_redeemer}}. */
	TWITCH_LAST_CHANNEL_POINTS_REDEEMER = 'twitch_last_channel_points_redeemer',
	/** Cost for TWITCH_LAST_CHANNEL_POINTS_REDEEMER. Use as {{twitch_last_channel_points_amount}}. */
	TWITCH_LAST_CHANNEL_POINTS_AMOUNT = 'twitch_last_channel_points_amount',

	// ────────────────────────────────── Goals (cross-platform) ─────────────────────

	/** Follower goal target. Use as {{follower_goal}}. */
	FOLLOWER_GOAL = 'follower_goal',
	/** Subscriber goal target. Use as {{subscriber_goal}}. */
	SUBSCRIBER_GOAL = 'subscriber_goal',
	/** Cheer/bits goal target. Use as {{cheer_goal}}. */
	CHEER_GOAL = 'cheer_goal',
	/** Tip/donation goal target. Use as {{tip_goal}}. */
	TIP_GOAL = 'tip_goal',
	/** Superchat goal target. Use as {{superchat_goal}}. */
	SUPERCHAT_GOAL = 'superchat_goal',
	/** Merch order count goal. Use as {{merch_goal_orders}}. */
	MERCH_GOAL_ORDERS = 'merch_goal_orders',
	/** Merch item count goal. Use as {{merch_goal_items}}. */
	MERCH_GOAL_ITEMS = 'merch_goal_items',
	/** Merch revenue goal. Use as {{merch_goal_total}}. */
	MERCH_GOAL_TOTAL = 'merch_goal_total',

	// ────────────────────────────────── Tip cumulative top-tippers (cross-platform) ─

	/** Top tipper this session (cumulative giver). Use as {{session_top_tipper}}. */
	SESSION_TOP_TIPPER = 'session_top_tipper',
	/** Amount for SESSION_TOP_TIPPER. Use as {{session_top_tipper_amount}}. */
	SESSION_TOP_TIPPER_AMOUNT = 'session_top_tipper_amount',
	/** Top tipper this week (cumulative giver). Use as {{week_top_tipper}}. */
	WEEK_TOP_TIPPER = 'week_top_tipper',
	/** Amount for WEEK_TOP_TIPPER. Use as {{week_top_tipper_amount}}. */
	WEEK_TOP_TIPPER_AMOUNT = 'week_top_tipper_amount',
	/** Top tipper this month (cumulative giver). Use as {{month_top_tipper}}. */
	MONTH_TOP_TIPPER = 'month_top_tipper',
	/** Amount for MONTH_TOP_TIPPER. Use as {{month_top_tipper_amount}}. */
	MONTH_TOP_TIPPER_AMOUNT = 'month_top_tipper_amount',
	/** All-time top tipper (cumulative giver). Use as {{alltime_top_tipper}}. */
	ALLTIME_TOP_TIPPER = 'alltime_top_tipper',
	/** Amount for ALLTIME_TOP_TIPPER. Use as {{alltime_top_tipper_amount}}. */
	ALLTIME_TOP_TIPPER_AMOUNT = 'alltime_top_tipper_amount',

	// ────────────────────────────────── Charity campaigns (cross-platform) ─────────

	/** Latest charity-campaign donor name. Use as {{last_charity_donator}}. */
	LAST_CHARITY_DONATOR = 'last_charity_donator',
	/** Amount for LAST_CHARITY_DONATOR. Use as {{last_charity_donation_amount}}. */
	LAST_CHARITY_DONATION_AMOUNT = 'last_charity_donation_amount',
	/** Largest single charity donation this session. Use as {{session_top_charity_donation}}. */
	SESSION_TOP_CHARITY_DONATION = 'session_top_charity_donation',
	/** Amount for SESSION_TOP_CHARITY_DONATION. Use as {{session_top_charity_donation_amount}}. */
	SESSION_TOP_CHARITY_DONATION_AMOUNT = 'session_top_charity_donation_amount',
	/** Largest single charity donation this week. Use as {{week_top_charity_donation}}. */
	WEEK_TOP_CHARITY_DONATION = 'week_top_charity_donation',
	/** Amount for WEEK_TOP_CHARITY_DONATION. Use as {{week_top_charity_donation_amount}}. */
	WEEK_TOP_CHARITY_DONATION_AMOUNT = 'week_top_charity_donation_amount',
	/** Largest single charity donation this month. Use as {{month_top_charity_donation}}. */
	MONTH_TOP_CHARITY_DONATION = 'month_top_charity_donation',
	/** Amount for MONTH_TOP_CHARITY_DONATION. Use as {{month_top_charity_donation_amount}}. */
	MONTH_TOP_CHARITY_DONATION_AMOUNT = 'month_top_charity_donation_amount',
	/** Largest single charity donation all-time. Use as {{alltime_top_charity_donation}}. */
	ALLTIME_TOP_CHARITY_DONATION = 'alltime_top_charity_donation',
	/** Amount for ALLTIME_TOP_CHARITY_DONATION. Use as {{alltime_top_charity_donation_amount}}. */
	ALLTIME_TOP_CHARITY_DONATION_AMOUNT = 'alltime_top_charity_donation_amount',
	/** Top charity donor this session (cumulative giver). Use as {{session_top_charity_donator}}. */
	SESSION_TOP_CHARITY_DONATOR = 'session_top_charity_donator',
	/** Amount for SESSION_TOP_CHARITY_DONATOR. Use as {{session_top_charity_donator_amount}}. */
	SESSION_TOP_CHARITY_DONATOR_AMOUNT = 'session_top_charity_donator_amount',
	/** Top charity donor this week (cumulative giver). Use as {{week_top_charity_donator}}. */
	WEEK_TOP_CHARITY_DONATOR = 'week_top_charity_donator',
	/** Amount for WEEK_TOP_CHARITY_DONATOR. Use as {{week_top_charity_donator_amount}}. */
	WEEK_TOP_CHARITY_DONATOR_AMOUNT = 'week_top_charity_donator_amount',
	/** Top charity donor this month (cumulative giver). Use as {{month_top_charity_donator}}. */
	MONTH_TOP_CHARITY_DONATOR = 'month_top_charity_donator',
	/** Amount for MONTH_TOP_CHARITY_DONATOR. Use as {{month_top_charity_donator_amount}}. */
	MONTH_TOP_CHARITY_DONATOR_AMOUNT = 'month_top_charity_donator_amount',
	/** All-time top charity donor (cumulative giver). Use as {{alltime_top_charity_donator}}. */
	ALLTIME_TOP_CHARITY_DONATOR = 'alltime_top_charity_donator',
	/** Amount for ALLTIME_TOP_CHARITY_DONATOR. Use as {{alltime_top_charity_donator_amount}}. */
	ALLTIME_TOP_CHARITY_DONATOR_AMOUNT = 'alltime_top_charity_donator_amount',

	// ────────────────────────────────── Cheer period tops (single biggest cheer) ──

	/** Largest single cheer this week. Use as {{week_top_cheer}}. */
	WEEK_TOP_CHEER = 'week_top_cheer',
	/** Amount for WEEK_TOP_CHEER. Use as {{week_top_cheer_amount}}. */
	WEEK_TOP_CHEER_AMOUNT = 'week_top_cheer_amount',
	/** Largest single cheer this month. Use as {{month_top_cheer}}. */
	MONTH_TOP_CHEER = 'month_top_cheer',
	/** Amount for MONTH_TOP_CHEER. Use as {{month_top_cheer_amount}}. */
	MONTH_TOP_CHEER_AMOUNT = 'month_top_cheer_amount',
	/** Largest single cheer all-time. Use as {{alltime_top_cheer}}. */
	ALLTIME_TOP_CHEER = 'alltime_top_cheer',
	/** Amount for ALLTIME_TOP_CHEER. Use as {{alltime_top_cheer_amount}}. */
	ALLTIME_TOP_CHEER_AMOUNT = 'alltime_top_cheer_amount',
	/** (Twitch) Largest single cheer this week. Use as {{twitch_week_top_cheer}}. */
	TWITCH_WEEK_TOP_CHEER = 'twitch_week_top_cheer',
	/** Amount for TWITCH_WEEK_TOP_CHEER. Use as {{twitch_week_top_cheer_amount}}. */
	TWITCH_WEEK_TOP_CHEER_AMOUNT = 'twitch_week_top_cheer_amount',
	/** (Twitch) Largest single cheer this month. Use as {{twitch_month_top_cheer}}. */
	TWITCH_MONTH_TOP_CHEER = 'twitch_month_top_cheer',
	/** Amount for TWITCH_MONTH_TOP_CHEER. Use as {{twitch_month_top_cheer_amount}}. */
	TWITCH_MONTH_TOP_CHEER_AMOUNT = 'twitch_month_top_cheer_amount',
	/** (Twitch) Largest single cheer all-time. Use as {{twitch_alltime_top_cheer}}. */
	TWITCH_ALLTIME_TOP_CHEER = 'twitch_alltime_top_cheer',
	/** Amount for TWITCH_ALLTIME_TOP_CHEER. Use as {{twitch_alltime_top_cheer_amount}}. */
	TWITCH_ALLTIME_TOP_CHEER_AMOUNT = 'twitch_alltime_top_cheer_amount',

	// ────────────────────────────────── YouTube superchat aggregations ─────────────

	/** (YouTube) Running superchat amount this session. Use as {{youtube_session_superchat_amount}}. */
	YOUTUBE_SESSION_SUPERCHAT_AMOUNT = 'youtube_session_superchat_amount',
	/** (YouTube) Running superchat amount this week. Use as {{youtube_week_superchat_amount}}. */
	YOUTUBE_WEEK_SUPERCHAT_AMOUNT = 'youtube_week_superchat_amount',
	/** (YouTube) Running superchat amount this month. Use as {{youtube_month_superchat_amount}}. */
	YOUTUBE_MONTH_SUPERCHAT_AMOUNT = 'youtube_month_superchat_amount',
	/** (YouTube) Running superchat amount all-time. Use as {{youtube_total_superchat_amount}}. */
	YOUTUBE_TOTAL_SUPERCHAT_AMOUNT = 'youtube_total_superchat_amount',
	/** (YouTube) Largest single superchat this session. Use as {{youtube_session_top_superchat}}. */
	YOUTUBE_SESSION_TOP_SUPERCHAT = 'youtube_session_top_superchat',
	/** Amount for YOUTUBE_SESSION_TOP_SUPERCHAT. Use as {{youtube_session_top_superchat_amount}}. */
	YOUTUBE_SESSION_TOP_SUPERCHAT_AMOUNT = 'youtube_session_top_superchat_amount',
	/** (YouTube) Largest single superchat this week. Use as {{youtube_week_top_superchat}}. */
	YOUTUBE_WEEK_TOP_SUPERCHAT = 'youtube_week_top_superchat',
	/** Amount for YOUTUBE_WEEK_TOP_SUPERCHAT. Use as {{youtube_week_top_superchat_amount}}. */
	YOUTUBE_WEEK_TOP_SUPERCHAT_AMOUNT = 'youtube_week_top_superchat_amount',
	/** (YouTube) Largest single superchat this month. Use as {{youtube_month_top_superchat}}. */
	YOUTUBE_MONTH_TOP_SUPERCHAT = 'youtube_month_top_superchat',
	/** Amount for YOUTUBE_MONTH_TOP_SUPERCHAT. Use as {{youtube_month_top_superchat_amount}}. */
	YOUTUBE_MONTH_TOP_SUPERCHAT_AMOUNT = 'youtube_month_top_superchat_amount',
	/** (YouTube) Largest single superchat all-time. Use as {{youtube_alltime_top_superchat}}. */
	YOUTUBE_ALLTIME_TOP_SUPERCHAT = 'youtube_alltime_top_superchat',
	/** Amount for YOUTUBE_ALLTIME_TOP_SUPERCHAT. Use as {{youtube_alltime_top_superchat_amount}}. */
	YOUTUBE_ALLTIME_TOP_SUPERCHAT_AMOUNT = 'youtube_alltime_top_superchat_amount',
	/** (YouTube) Top superchatter this session (cumulative giver). Use as {{youtube_session_top_superchatter}}. */
	YOUTUBE_SESSION_TOP_SUPERCHATTER = 'youtube_session_top_superchatter',
	/** Amount for YOUTUBE_SESSION_TOP_SUPERCHATTER. Use as {{youtube_session_top_superchatter_amount}}. */
	YOUTUBE_SESSION_TOP_SUPERCHATTER_AMOUNT = 'youtube_session_top_superchatter_amount',
	/** (YouTube) Top superchatter this week (cumulative giver). Use as {{youtube_week_top_superchatter}}. */
	YOUTUBE_WEEK_TOP_SUPERCHATTER = 'youtube_week_top_superchatter',
	/** Amount for YOUTUBE_WEEK_TOP_SUPERCHATTER. Use as {{youtube_week_top_superchatter_amount}}. */
	YOUTUBE_WEEK_TOP_SUPERCHATTER_AMOUNT = 'youtube_week_top_superchatter_amount',
	/** (YouTube) Top superchatter this month (cumulative giver). Use as {{youtube_month_top_superchatter}}. */
	YOUTUBE_MONTH_TOP_SUPERCHATTER = 'youtube_month_top_superchatter',
	/** Amount for YOUTUBE_MONTH_TOP_SUPERCHATTER. Use as {{youtube_month_top_superchatter_amount}}. */
	YOUTUBE_MONTH_TOP_SUPERCHATTER_AMOUNT = 'youtube_month_top_superchatter_amount',
	/** (YouTube) All-time top superchatter (cumulative giver). Use as {{youtube_alltime_top_superchatter}}. */
	YOUTUBE_ALLTIME_TOP_SUPERCHATTER = 'youtube_alltime_top_superchatter',
	/** Amount for YOUTUBE_ALLTIME_TOP_SUPERCHATTER. Use as {{youtube_alltime_top_superchatter_amount}}. */
	YOUTUBE_ALLTIME_TOP_SUPERCHATTER_AMOUNT = 'youtube_alltime_top_superchatter_amount',

	// ────────────────────────────────── Recent event lists (cross-platform) ────────

	/** Comma-separated list of recent followers. Use as {{recent_followers}}. */
	RECENT_FOLLOWERS = 'recent_followers',
	/** Comma-separated list of recent subscribers. Use as {{recent_subscribers}}. */
	RECENT_SUBSCRIBERS = 'recent_subscribers',
	/** Comma-separated list of recent hosts. Use as {{recent_hosts}}. */
	RECENT_HOSTS = 'recent_hosts',
	/** Comma-separated list of recent raiders. Use as {{recent_raiders}}. */
	RECENT_RAIDERS = 'recent_raiders',
	/** Parallel comma-separated viewer counts for RECENT_RAIDERS. Use as {{recent_raiders_amount}}. */
	RECENT_RAIDERS_AMOUNT = 'recent_raiders_amount',
	/** Comma-separated list of recent cheerers. Use as {{recent_cheers}}. */
	RECENT_CHEERS = 'recent_cheers',
	/** Parallel comma-separated bit amounts for RECENT_CHEERS. Use as {{recent_cheers_amount}}. */
	RECENT_CHEERS_AMOUNT = 'recent_cheers_amount',
	/** Comma-separated list of recent tippers. Use as {{recent_tips}}. */
	RECENT_TIPS = 'recent_tips',
	/** Parallel comma-separated tip amounts for RECENT_TIPS. Use as {{recent_tips_amount}}. */
	RECENT_TIPS_AMOUNT = 'recent_tips_amount',
	/** Comma-separated list of recent superchatters. Use as {{recent_superchats}}. */
	RECENT_SUPERCHATS = 'recent_superchats',
	/** Parallel comma-separated superchat amounts for RECENT_SUPERCHATS. Use as {{recent_superchats_amount}}. */
	RECENT_SUPERCHATS_AMOUNT = 'recent_superchats_amount',
	/** Comma-separated list of recent charity donors. Use as {{recent_charity_donations}}. */
	RECENT_CHARITY_DONATIONS = 'recent_charity_donations',
	/** Parallel comma-separated donation amounts for RECENT_CHARITY_DONATIONS. Use as {{recent_charity_donations_amount}}. */
	RECENT_CHARITY_DONATIONS_AMOUNT = 'recent_charity_donations_amount',

	// ────────────────────────────────── Sensors ────────────────────────────────────

	/** Heart rate BPM (Pulsoid/Hyperate). Use as {{heartrate_bpm}}. */
	HEARTRATE_BPM = 'heartrate_bpm',
}

export const ReservedVariables = [
	'lumia',
	'lumiastream',
	'lumiacove',
	'read',
	'readFile',
	'readApi',
	'variable',
	'variables',
	'username',
	'displayname',
	'userId',
	'value',
	'site',
	'originType',
	'queueType',
	'command',
	'merch',
	'message',
	'messageWithoutEmotes',
	'rawMessageWithoutEmotes',
	'userColor',
	'userColorRgb',
	'platform',
	'points',
	'title',
	'topUserLevel',
	'userLevels',
	'userLevelsRaw',
	'badges',
	'badgesRaw',
	'bits',
	'hasEmotes',
	'emotes',
	'emotesRaw',
	'spell',
	'spell_quantity',
	'spell_type',
	'spell_value',
	'spell_combined_value',
	'spell_mana_value',
	'spell_mana_combined_value',
	'spell_elixir_value',
	'spell_elixir_combined_value',
	'avatar',
	'redemption',
	'amount',
	'currency',
	'viewers',
	'tier',
	'treat',
	'scene',
	'reaction',
	'item',
	'profile',
	'heartrate',
	'cooldown_time_remaining',
	'min_heartrate',
	'max_heartrate',
	'calories',
	'giftAmount',
	'recipient',
	'totalGifts',
	'subMonths',
	'streakMonths',
	'subPlanName',
	'oscValue',
	'osc_value',
	'midi_value',
	'velocity_value',
	'velocity',
	'midiValue',
	'artnet_value',
	'artnetValue',
	'cycles',
	'duration',
	'checkTimingType',
	'timingType',
	'twitch_clip_id',
	'twitchClipId',
	'commands',
	'commands_url',
	'user_levels',
	'user_levels_raw',
	'twitch_user_id',
	'twitch_username',
	'clip_shoutout_url',
	'clip_title',
	'clip_url',
	'clip_target_username',
	'clip_target_userid',
	'clip_target_avatar',
	'clip_thumbnail_url',
	'clip_duration',
	'clip_target_channel',
	'clip_embed_url',
	'clip_id',
	'clip_creator_id',
	'clip_creator_name',
	'clip_game_id',
	'clip_language',
	'clip_view_count',
	'clip_created_at',
	'clip_target_displayname',
	'clip_target_language',
	'clip_target_category_id',
	'clip_target_category',
	'current_target_category_id',
	'current_target_category',
	'clip_target_channel_title',
	'clip_target_channel_tags',
	'follow_time',
	'uptime',
];

// Shared example shapes for object/array variables that recur across alerts.
const USER_LEVELS_RAW_EXAMPLE = {
	isSelf: false,
	mod: false,
	vip: false,
	tier3: false,
	tier2: false,
	tier1: false,
	subscriber: true,
	follower: true,
};

const TWITCH_RECIPIENTS_RAW_EXAMPLE: LumiaAcceptedVariableDefinition = {
	name: 'recipientsRaw',
	example: [
		{
			displayname: 'Ex: LumiaFan',
			username: 'Ex: lumia_fan',
			userId: 'Ex: 123456789',
			avatar: 'Ex: https://static-cdn.jtvnw.net/jtv_user_pictures/lumia.png',
		},
	],
};

const KICK_RECIPIENTS_RAW_EXAMPLE: LumiaAcceptedVariableDefinition = {
	name: 'recipientsRaw',
	example: [
		{
			username: 'Ex: lumia_fan',
			userId: 'Ex: 987654',
			displayname: 'Ex: LumiaFan',
			avatar: 'Ex: https://files.kick.com/images/user/lumia.jpg',
		},
	],
};

const YOUTUBE_RECIPIENTS_RAW_EXAMPLE: LumiaAcceptedVariableDefinition = {
	name: 'recipientsRaw',
	example: [
		{
			username: 'Ex: lumia_member',
			displayname: 'Ex: LumiaMember',
			userId: 'Ex: UCabc123',
			avatar: 'Ex: https://yt3.ggpht.com/lumia-avatar.jpg',
			memberLevelName: 'Ex: Level 1',
		},
	],
};

const USER_LEVELS_RAW_VARIABLE: LumiaAcceptedVariableDefinition = {
	name: 'userLevelsRaw',
	example: USER_LEVELS_RAW_EXAMPLE,
};

export const AllVariables = {
	lumiastream: {
		variables: [
			'read_file',
			'read_url',
			'selection',
			'random',
			'random_input',
			'math',
			'js',
			'compare',
			'round',
			'if',
			'coalesce',
			'between',
			'min',
			'max',
			'regex_extract',
			'replace',
			'format_date',
			'time_since',
			'sum_variables',
			'offset_count',
			'get_commands',
			'get_all_commands',
			'convert_color_to_hex',
			'get_latest_file_from_folder',
			'get_random_file_from_folder',
			'screenshot',
			'get_queue_count',
			'get_var_from_msg',
			'get_user_loyalty_points',
			'translate',
			'commands_url',
			'session_start_date',
			'game_last_player',
			'today',
			'lumia_uptime',
			'lumia_uptime_timestamp',
			'twitch_uptime_timestamp',
			'youtube_uptime_timestamp',
			'facebook_uptime_timestamp',
			'kick_uptime',
			'kick_uptime_timestamp',
			'tiktok_uptime',
			'tiktok_uptime_timestamp',
			'overlays_brb_clips',
			'latest_donator',
			'latest_donator_amount',
			'latest_donator_currency',
			'latest_donator_currency_symbol',
			'session_top_donator',
			'session_top_donator_amount',
			'session_top_donator_currency',
			'session_top_donator_currency_symbol',
			'top_donator',
			'top_donator_amount',
			'top_donator_currency',
			'top_donator_currency_symbol',
			'top_donator_list_amount',
			'top_donator_list_currency',
			'top_donator_list_currency_symbol',
			'total_donation_amount',
			'total_donation_amount_currency',
			'total_donation_amount_currency_symbol',
			'session_donation_amount',
			'session_donation_amount_currency',
			'session_donation_amount_currency_symbol',
			'donation_count',
			'session_donation_count',
			'session_donator_list',
			'session_donator_list_with_amount',
			'week_donation_amount',
			'month_donation_amount',
			'week_donation_count',
			'month_donation_count',
			'week_top_donator',
			'week_top_donator_amount',
			'week_top_donator_list',
			'week_top_donator_list_amount',
			'month_top_donator',
			'month_top_donator_amount',
			'month_top_donator_list',
			'month_top_donator_list_amount',
			'raffle_title',
			'raffle_description',
			'raffle_entries',
			'raffle_generated_number',
			'raffle_entries_count',
			'raffle_winners',
			'raffle_type',
			'raffle_winner',
			'raffle_winner_avatar',
			'raffle_entry_command',
			'tournament_title',
			'tournament_description',
			'tournament_game',
			'tournament_format',
			'tournament_state',
			'tournament_participants_count',
			'tournament_entry_command',
			'tournament_winner',
			'tournament_winner_avatar',
			'viewerqueue_title',
			'viewerqueue_entry_command',
			'viewerqueue_entries',
			'viewerqueue_players',
			'viewerqueue_entries_count',
			'viewerqueue_queue_limit',
			'api_action_global_response',
			'last_random_input',
			'loyalty_currency_name',
			'now_playing_id',
			'now_playing_title',
			'now_playing_artwork',
			'now_playing_artist',
			'now_playing_album',
			'now_playing_label',
			'now_playing_bpm',
			'now_playing_rating',
			'now_playing_length',
			'now_playing_comment',
			'now_playing_key',
			'now_playing_url',
			'now_playing_spotify_url',
			'now_playing_beatport_url',
			'now_playing_beatport_id',
			'now_playing_file_path',
			'heartrate_bpm',
			'follower_goal',
			'subscriber_goal',
			'cheer_goal',
			'tip_goal',
			'superchat_goal',
			'merch_goal_orders',
			'merch_goal_items',
			'merch_goal_total',
			'session_top_tipper',
			'session_top_tipper_amount',
			'week_top_tipper',
			'week_top_tipper_amount',
			'month_top_tipper',
			'month_top_tipper_amount',
			'alltime_top_tipper',
			'alltime_top_tipper_amount',
			'last_charity_donator',
			'last_charity_donation_amount',
			'session_top_charity_donation',
			'session_top_charity_donation_amount',
			'week_top_charity_donation',
			'week_top_charity_donation_amount',
			'month_top_charity_donation',
			'month_top_charity_donation_amount',
			'alltime_top_charity_donation',
			'alltime_top_charity_donation_amount',
			'session_top_charity_donator',
			'session_top_charity_donator_amount',
			'week_top_charity_donator',
			'week_top_charity_donator_amount',
			'month_top_charity_donator',
			'month_top_charity_donator_amount',
			'alltime_top_charity_donator',
			'alltime_top_charity_donator_amount',
			'week_top_cheer',
			'week_top_cheer_amount',
			'month_top_cheer',
			'month_top_cheer_amount',
			'alltime_top_cheer',
			'alltime_top_cheer_amount',
			'recent_followers',
			'recent_subscribers',
			'recent_hosts',
			'recent_raiders',
			'recent_raiders_amount',
			'recent_cheers',
			'recent_cheers_amount',
			'recent_tips',
			'recent_tips_amount',
			'recent_superchats',
			'recent_superchats_amount',
			'recent_charity_donations',
			'recent_charity_donations_amount',
		],
		chat: {
			cooldowns: ['cooldown_time_remaining'],
			command: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'message',
				'messageId',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
				'points_cost',
				'voice_command_full_sentence',
			],
			chatbotCommand: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'message',
				'messageId',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			twitchPoints: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'prompt',
				'message',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'points',
				'title',
				'timestamp',
			],
			kickPoints: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'prompt',
				'message',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'points',
				'title',
				'timestamp',
			],
			twitchExtensions: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'prompt',
				'message',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'bits',
				'timestamp',
				'points_cost',
			],
			fileWatcher: ['content', 'file', 'path', 'timestamp'],
			chatmatch: ['originType', 'queueType', 'language_detect_result', 'detected_language', 'detected_language_code'],

			commands: [
				'get_all_commands',
				'get_commands',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'originType',
				'queueType',
				'command',
				'message',
				'messageId',
				'messageWithoutEmotes',
				'rawMessageWithoutEmotes',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			shoutout: [
				'clip_shoutout_url',
				'clip_title',
				'clip_url',
				'clip_target_username',
				'clip_target_userid',
				'clip_target_avatar',
				'clip_thumbnail_url',
				'clip_duration',
				'clip_target_channel',
				'clip_embed_url',
				'clip_id',
				'clip_creator_id',
				'clip_creator_name',
				'clip_game_id',
				'clip_language',
				'clip_view_count',
				'clip_created_at',
				'clip_target_displayname',
				'clip_target_language',
				'clip_target_category_id',
				'clip_target_category',
				'current_target_category_id',
				'current_target_category',
				'clip_target_channel_title',
				'clip_target_channel_tags',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			followage: [
				'follow_time',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			uptime: [
				'uptime',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			aichat: [
				'ai_response',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			loyaltyPoints: [
				'points_balance',
				'user_rank',
				'total_rank',
				'loyalty_currency_name',
				'get_user_loyalty_points',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			roulette: [
				'roulette_result',
				'ball_position',
				'outcome_amount',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			duel: [
				'duel_result',
				'duel_winner',
				'duel_loser',
				'duel_target_username',
				'duel_duration',
				'outcome_amount',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			slots: [
				'slots_result',
				'slots_combo',
				'outcome_amount',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			raffleEntry: [
				'raffle_title',
				'raffle_description',
				'raffle_entries',
				'raffle_generated_number',
				'raffle_entries_count',
				'raffle_winners',
				'raffle_type',
				'raffle_winner',
				'raffle_winner_avatar',
				'raffle_entry_command',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			viewerQueueEntry: [
				'viewerqueue_title',
				'viewerqueue_entry_command',
				'viewerqueue_entries',
				'viewerqueue_players',
				'viewerqueue_entries_count',
				'viewerqueue_queue_limit',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				USER_LEVELS_RAW_VARIABLE,
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
		},
		alerts: {
			lumiaOpened: ['date'],
			lumiaClosed: ['date'],
			streammodeOn: ['date'],
			streammodeOff: ['date'],
			donation: ['username', 'avatar', 'sender_social_link', 'currency', 'currencySymbol', 'amount', 'message', 'anonymous', 'command'],
			spinwheelWinner: ['spinwheel_winner', 'spinwheel_item', 'spinwheel_item_id', 'spinwheel_item_image', 'spinwheel_item_quantity_remaining', 'spinwheel_item_quantity_initial'],
			raffleStart: ['raffle_title', 'raffle_description', 'raffle_type', 'raffle_entry_command', 'raffle_generated_number'],
			raffleStop: ['raffle_title', 'raffle_description', 'raffle_type', 'raffle_entry_command', 'duration', 'raffle_generated_number'],
			raffleWinner: [
				'raffle_title',
				'raffle_description',
				'raffle_type',
				'raffle_winner',
				'raffle_winner_avatar',
				'raffle_winners',
				'raffle_entry_command',
				'duration',
				'raffle_generated_number',
				'username',
				'platform',
			],
			tournamentStart: ['tournament_title', 'tournament_description', 'tournament_game', 'tournament_format', 'tournament_state', 'tournament_participants_count', 'tournament_entry_command'],
			tournamentEnd: ['tournament_title', 'tournament_description', 'tournament_game', 'tournament_format', 'tournament_state', 'tournament_participants_count', 'tournament_entry_command'],
			tournamentWinner: [
				'tournament_title',
				'tournament_description',
				'tournament_game',
				'tournament_format',
				'tournament_state',
				'tournament_participants_count',
				'tournament_entry_command',
				'tournament_winner',
				'tournament_winner_avatar',
				'username',
				'platform',
			],
			pollStarted: ['poll_title', 'poll_id', 'poll_choices'],
			pollProgressed: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
			pollEnded: ['poll_id', 'poll_title', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
			viewerqueueStarted: ['viewerqueue_title', 'viewerqueue_entry_command', 'viewerqueue_entries', 'viewerqueue_players', 'viewerqueue_entries_count'],
			viewerqueueEnded: ['viewerqueue_title', 'viewerqueue_entry_command', 'viewerqueue_entries', 'viewerqueue_players', 'viewerqueue_entries_count'],
			viewerAchievement: [
				'username',
				'displayname',
				'avatar',
				'platform',
				'achievement_id',
				'achievement_name',
				'achievement_description',
				'achievements_completed',
				'achievements_total',
				'achievements_percent',
			],
			variableChanged: ['variable_name', 'variable_value', 'variable_previous_value'],
			rouletteWinner: ['username', 'platform', 'outcome_amount', 'ball_position'],
			slotsWinner: ['username', 'platform', 'outcome_amount', 'slots_combo'],
		},
	},
	crowdcontrol: {
		alerts: {
			effect: ['username', 'displayname', 'avatar', 'platform', 'effect', 'effectId', 'game', 'gameId', 'artwork', 'message', 'duration'],
		},
	},
	discord: {
		alerts: {
			firstChatter: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'userId', 'displayname', 'avatar', 'message'],
		},
	},
	donordrive: {
		variables: ['donordrive_goal_amount', 'donordrive_total_raised'],
		alerts: {
			donation: ['username', 'currency', 'currencySymbol', 'amount'],
		},
	},
	extralife: {
		variables: ['extralife_goal_amount', 'extralife_total_raised'],
		alerts: {
			donation: ['username', 'currency', 'currencySymbol', 'amount'],
		},
	},
	facebook: {
		variables: [
			'facebook_uptime',
			'facebook_live',
			'facebook_session_chat_count',
			'facebook_current_first_chatter',
			'facebook_current_first_chatter_count',
			'facebook_previous_first_chatter',
			'facebook_previous_first_chatter_count',
			'facebook_last_chatter',
			'facebook_total_follower_count',
			'facebook_session_follower_count',
			'facebook_week_follower_count',
			'facebook_month_follower_count',
			'facebook_total_fan_count',
			'facebook_session_fan_count',
			'facebook_week_fan_count',
			'facebook_month_fan_count',
			'facebook_reaction_count',
			'facebook_last_star',
			'facebook_last_star_amount',
			'facebook_session_stars',
			'facebook_session_stars_with_amount',
		],
		alerts: {
			streamLive: [],
			streamOffline: [],
			firstChatter: ['username', 'first_count', 'message'],
			entrance: ['username', 'message'],
			follower: ['username'],
			fan: ['username'],
			reaction: ['username', 'reaction'],
			star: ['username', 'amount'],
			support: ['username', 'amount'],
			subscriptionGift: ['username', 'recipient', 'recipients', TWITCH_RECIPIENTS_RAW_EXAMPLE, 'gifter', 'giftAmount', 'message'],
			share: ['username'],
		},
	},
	fourthwall: {
		alerts: {
			donation: ['username', 'email', 'message', 'currency', 'currencySymbol', 'amount', 'id', 'status', 'createdAt', 'updatedAt', 'raw'],
			subscription: ['username', 'email', 'currency', 'amount', 'interval', 'id', 'subscriptionType', 'tierId', 'variantId', 'createdAt', 'raw'],
			subscriptionChanged: ['username', 'email', 'currency', 'amount', 'interval', 'id', 'subscriptionType', 'tierId', 'variantId', 'createdAt', 'raw'],
			subscriptionExpired: ['username', 'email', 'currency', 'amount', 'interval', 'id', 'subscriptionType', 'tierId', 'variantId', 'createdAt', 'raw'],
			commission: ['username', 'email', 'message', 'currency', 'amount', 'raw'],
			shopOrder: [
				'username',
				'email',
				'message',
				'items',
				'itemsCount',
				'itemsDetailed',
				{
					name: 'orderItems',
					example: [
						{
							id: 'Ex: lumia-shirt-001',
							name: 'Ex: Lumia Stream Tee',
							slug: 'Ex: lumia-stream-tee',
							description: 'Ex: Official Lumia Stream merch',
							imageUrl: 'Ex: https://lumiastream.com/merch/lumia-tee.png',
							variantName: 'Ex: Lumia Logo - Black - L',
							sku: 'Ex: LUMIA-TEE-BLK-L',
							quantity: 1,
							size: 'Ex: L',
							color: 'Ex: Black',
							colorSwatch: 'Ex: #000000',
							attributes: 'Ex: Black, L',
							unitPrice: 25,
							price: 25,
							variant: null,
						},
					],
				},
				{
					name: 'itemImages',
					example: ['Ex: https://lumiastream.com/merch/lumia-tee.png'],
				},
				'friendlyId',
				'currency',
				'amount',
				{
					name: 'firstItem',
					example: {
						id: 'Ex: lumia-shirt-001',
						name: 'Ex: Lumia Stream Tee',
						slug: 'Ex: lumia-stream-tee',
						description: 'Ex: Official Lumia Stream merch',
						imageUrl: 'Ex: https://lumiastream.com/merch/lumia-tee.png',
						variantName: 'Ex: Lumia Logo - Black - L',
						sku: 'Ex: LUMIA-TEE-BLK-L',
						quantity: 1,
						size: 'Ex: L',
						color: 'Ex: Black',
						colorSwatch: 'Ex: #000000',
						attributes: 'Ex: Black, L',
						unitPrice: 25,
						price: 25,
						variant: null,
					},
				},
				'raw',
			],
			giftPurchase: [
				'username',
				'email',
				'message',
				'currency',
				'amount',
				'friendlyId',
				'quantity',
				{
					name: 'offer',
					example: {
						id: 'Ex: lumia-shirt-001',
						name: 'Ex: Lumia Stream Tee',
						slug: 'Ex: lumia-stream-tee',
						description: 'Ex: Official Lumia Stream merch',
						imageUrl: 'Ex: https://lumiastream.com/merch/lumia-tee.png',
						variantName: 'Ex: Lumia Logo - Black - L',
						sku: 'Ex: LUMIA-TEE-BLK-L',
						quantity: 1,
						size: 'Ex: L',
						color: 'Ex: Black',
						colorSwatch: 'Ex: #000000',
						attributes: 'Ex: Black, L',
						unitPrice: 25,
						price: 25,
						variant: null,
					},
				},
				'offerImageUrl',
				{
					name: 'gifts',
					example: [
						{
							id: 'Ex: gift-001',
							status: 'Ex: AVAILABLE',
							winner: {
								username: 'Ex: lumiastream',
								email: 'Ex: viewer@lumiastream.com',
								selectedAt: 'Ex: 2026-05-14T15:55:15Z',
								redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							},
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				'giftCount',
				{
					name: 'winners',
					example: [
						{
							username: 'Ex: lumiastream',
							email: 'Ex: viewer@lumiastream.com',
							status: 'Ex: REDEEMED',
							selectedAt: 'Ex: 2026-05-14T15:55:15Z',
							redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				{
					name: 'winnerNames',
					example: ['Ex: lumiastream'],
				},
				'winnerCount',
				'firstWinner',
				'availableGiftCount',
				'redeemedGiftCount',
				'createdAt',
				'raw',
			],
			giveawayStarted: [
				'username',
				'email',
				'message',
				'currency',
				'amount',
				'giveawayName',
				'giveawayId',
				'giveawayFriendlyId',
				'offerName',
				'offerImageUrl',
				{
					name: 'winners',
					example: [
						{
							username: 'Ex: lumiastream',
							email: 'Ex: viewer@lumiastream.com',
							status: 'Ex: REDEEMED',
							selectedAt: 'Ex: 2026-05-14T15:55:15Z',
							redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				{
					name: 'winnerNames',
					example: ['Ex: lumiastream'],
				},
				'winnerCount',
				'firstWinner',
				'duration',
				{
					name: 'allGifts',
					example: [
						{
							id: 'Ex: gift-001',
							status: 'Ex: AVAILABLE',
							winner: {
								username: 'Ex: lumiastream',
								email: 'Ex: viewer@lumiastream.com',
								selectedAt: 'Ex: 2026-05-14T15:55:15Z',
								redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							},
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				{
					name: 'gifts',
					example: [
						{
							id: 'Ex: gift-001',
							status: 'Ex: AVAILABLE',
							winner: {
								username: 'Ex: lumiastream',
								email: 'Ex: viewer@lumiastream.com',
								selectedAt: 'Ex: 2026-05-14T15:55:15Z',
								redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							},
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				'totalGifts',
				{
					name: 'offer',
					example: {
						id: 'Ex: lumia-shirt-001',
						name: 'Ex: Lumia Stream Tee',
						slug: 'Ex: lumia-stream-tee',
						description: 'Ex: Official Lumia Stream merch',
						imageUrl: 'Ex: https://lumiastream.com/merch/lumia-tee.png',
						variantName: 'Ex: Lumia Logo - Black - L',
						sku: 'Ex: LUMIA-TEE-BLK-L',
						quantity: 1,
						size: 'Ex: L',
						color: 'Ex: Black',
						colorSwatch: 'Ex: #000000',
						attributes: 'Ex: Black, L',
						unitPrice: 25,
						price: 25,
						variant: null,
					},
				},
				'type',
			],
			giveawayEnded: [
				'username',
				'email',
				'message',
				'currency',
				'amount',
				'giveawayName',
				'giveawayId',
				'giveawayFriendlyId',
				'offerName',
				'offerImageUrl',
				{
					name: 'winners',
					example: [
						{
							username: 'Ex: lumiastream',
							email: 'Ex: viewer@lumiastream.com',
							status: 'Ex: REDEEMED',
							selectedAt: 'Ex: 2026-05-14T15:55:15Z',
							redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				{
					name: 'winnerNames',
					example: ['Ex: lumiastream'],
				},
				'winnerCount',
				'firstWinner',
				'duration',
				{
					name: 'allGifts',
					example: [
						{
							id: 'Ex: gift-001',
							status: 'Ex: AVAILABLE',
							winner: {
								username: 'Ex: lumiastream',
								email: 'Ex: viewer@lumiastream.com',
								selectedAt: 'Ex: 2026-05-14T15:55:15Z',
								redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							},
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				{
					name: 'gifts',
					example: [
						{
							id: 'Ex: gift-001',
							status: 'Ex: REDEEMED',
							winner: {
								username: 'Ex: lumiastream',
								email: 'Ex: viewer@lumiastream.com',
								selectedAt: 'Ex: 2026-05-14T15:55:15Z',
								redeemUri: 'Ex: https://shop.lumiastream.com/redeem',
							},
							orderId: 'Ex: ord-12345',
							orderFriendlyId: 'Ex: LSORDER1',
							promotionId: 'Ex: prm-001',
						},
					],
				},
				'totalGifts',
				{
					name: 'offer',
					example: {
						id: 'Ex: lumia-shirt-001',
						name: 'Ex: Lumia Stream Tee',
						slug: 'Ex: lumia-stream-tee',
						description: 'Ex: Official Lumia Stream merch',
						imageUrl: 'Ex: https://lumiastream.com/merch/lumia-tee.png',
						variantName: 'Ex: Lumia Logo - Black - L',
						sku: 'Ex: LUMIA-TEE-BLK-L',
						quantity: 1,
						size: 'Ex: L',
						color: 'Ex: Black',
						colorSwatch: 'Ex: #000000',
						attributes: 'Ex: Black, L',
						unitPrice: 25,
						price: 25,
						variant: null,
					},
				},
				'type',
			],
			thankyouSent: [
				'username',
				'email',
				'message',
				'mediaUrl',
				'contributionType',
				{
					name: 'contribution',
					example: {
						id: 'Ex: contrib-12345',
						type: 'Ex: ORDER',
						shopId: 'Ex: sh_lumiastream',
						supporter: {
							username: 'Ex: lumiastream',
							email: 'Ex: viewer@lumiastream.com',
							message: 'Ex: Thanks for the stream!',
						},
					},
				},
			],
			newsletterSubscribed: ['email', 'raw'],
		},
	},
	kick: {
		variables: [
			'kick_user_id',
			'kick_username',
			'kick_channel_title',
			'kick_channel_description',
			'kick_avatar',
			'kick_category',
			'kick_category_id',
			'kick_live',
			'kick_get_avatar={{message}}',
			'kick_stream_title',
			'kick_session_chat_count',
			'kick_current_first_chatter',
			'kick_current_first_chatter_count',
			'kick_previous_first_chatter',
			'kick_previous_first_chatter_count',
			'kick_last_chatter',
			'kick_current_viewer_count',
			'kick_total_follower_count',
			'kick_session_follower_count',
			'kick_week_follower_count',
			'kick_month_follower_count',
			'kick_total_subscriber_count',
			'kick_session_subscriber_count',
			'kick_week_subscriber_count',
			'kick_month_subscriber_count',
			'kick_session_gifts_count',
			'kick_session_subscribers',
			'kick_last_kicks',
			'kick_last_kicks_amount',
			'kick_total_kicks_count',
			'kick_session_kicks_count',
			'kick_session_kicks',
			'kick_session_kicks_with_amount',
			'kick_last_follower',
			'kick_last_subscriber',
			'kick_last_gifter',
			'kick_last_gifter_amount',
			'kick_last_gifted',
			'kick_last_host',
			'kick_last_host_amount',
			'kick_total_gift_subscription_count',
			'kick_get_avatar',
		],
		alerts: {
			firstChatter: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'userId', 'displayname', 'avatar', 'message'],
			follower: ['username'],
			sessionFollowers: ['total', 'previousTotal'],
			subscriber: ['username', 'avatar', 'tier', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName', 'amount'],
			sessionSubs: ['total', 'previousTotal'],
			subscriptionGift: [
				'username',
				'avatar',
				'tier',
				'giftAmount',
				'recipients',
				KICK_RECIPIENTS_RAW_EXAMPLE,
				'gifter',
				'totalGifts',
				'subMonths',
				'streakMonths',
				'message',
				'subPlan',
				'subPlanName',
			],
			sessionGiftSubscriptions: ['total', 'previousTotal'],
			kicks: ['username', 'avatar', 'amount', 'name', 'type', 'tier', 'id', 'message'],
			sessionKicks: ['total', 'previousTotal'],
			host: ['username', 'avatar', 'viewers', 'amount'],
			banned: ['username', 'userId', 'bannedByUsername', 'bannedByUserId', 'expires'],
			unbanned: ['username', 'userId', 'unbannedByUsername', 'unbannedByUserId'],
		},
	},
	kofi: {
		variables: ['kofi_last_order_name', 'kofi_last_order_amount', 'kofi_last_order_amount_currency'],
		alerts: {
			donation: ['username', 'email', 'currency', 'currencySymbol', 'amount'],
			subscription: ['username', 'email', 'currency', 'amount', 'tier'],
			commission: ['username', 'email', 'currency', 'amount'],
			shopOrder: ['username', 'email', 'currency', 'amount'],
		},
	},
	meld: {
		alerts: {
			streamStarting: [],
			streamStopping: [],
			recordingStarting: [],
			recordingStopping: [],
			switchScene: ['scene', 'previousScene'],
			switchVerticalScene: ['scene', 'previousScene'],
		},
	},
	nowplaying: {
		variables: [
			'now_playing_id',
			'now_playing_title',
			'now_playing_artwork',
			'now_playing_artist',
			'now_playing_album',
			'now_playing_label',
			'now_playing_bpm',
			'now_playing_rating',
			'now_playing_length',
			'now_playing_comment',
			'now_playing_key',
			'now_playing_url',
			'now_playing_spotify_url',
			'now_playing_beatport_url',
			'now_playing_beatport_id',
			'now_playing_file_path',
		],
		alerts: {
			switchSong: ['id', 'title', 'artwork', 'artist', 'album', 'label', 'bpm', 'rating', 'length', 'comment', 'key', 'url', 'spotify_url', 'beatport_url', 'beatport_id', 'file_key'],
		},
	},
	obs: {
		variables: [
			'obs_screenshot',
			'obs_replay',
			'obs_vertical_replay',
			'obs_is_streaming',
			'obs_is_recording',
			'obs_last_recording_path',
			'obs_studio_mode',
			'obs_current_profile',
			'obs_current_scene',
			'obs_previous_scene',
			'obs_current_transition',
			'obs_last_replay_buffer_path',
			'obs_last_vertical_backtrack_path',
		],
		alerts: {
			switchScene: ['scene'],
			sceneItemVisibility: ['item'],
			sceneItemHidden: ['item'],
			switchProfile: ['profile'],
			switchTransition: ['transition'],
			transitionBegin: ['transition'],
			transitionEnd: ['transition'],
			streamStarting: [],
			streamStopping: [],
			recordingStarting: ['output_key'],
			recordingStopping: ['output_key'],
			mediaInputPlaybackStarted: ['inputName', 'inputUuid'],
			mediaInputPlaybackEnded: ['inputName', 'inputUuid'],
			virtualcamStateChanged: ['outputActive', 'outputState'],
			screenshotSaved: ['savedScreenshotPath'],
			replayBufferSaved: ['saved_key'],
			verticalBacktrackSaved: ['saved_key', 'height', 'width'],
			vendorEvent: ['eventType', 'eventData', 'vendorName'],
		},
	},
	patreon: {
		alerts: {
			campaignPledge: ['username', 'currency', 'currencySymbol', 'amount'],
		},
	},
	pulse: {
		alerts: {
			heartrate: ['heartrate', 'min_heartrate', 'max_heartrate'],
			calories: [],
		},
	},
	slobs: {
		variables: ['slobs_current_scene', 'slobs_previous_scene', 'slobs_current_scene_collection'],
		alerts: {
			switchScene: ['scene'],
			switchSceneCollection: ['collection'],
			sceneItemVisibility: ['item'],
			sceneItemHidden: ['item'],
		},
	},
	spotify: {
		variables: [
			'spotify_now_playing_song',
			'spotify_now_playing_image',
			'spotify_now_playing_id',
			'spotify_now_playing_artist',
			'spotify_now_playing_uri',
			'spotify_now_playing_url',
			'spotify_now_playing_duration',
			// 'spotify_now_playing_progress',
			'spotify_next_song',
			'spotify_next_image',
			'spotify_next_artist',
			'spotify_next_id',
			'spotify_next_url',
			'spotify_next_uri',
			'spotify_now_playing_queue',
		],
		alerts: {
			switchSong: ['name', 'uri', 'image'],
			songPlayed: ['name', 'uri', 'image'],
			songPaused: ['name', 'uri', 'image'],
		},
	},
	streamelements: {
		alerts: {
			donation: ['username', 'currency', 'currencySymbol', 'amount', 'message'],
		},
	},
	streamerbot: {
		variables: ['streamerbot_last_action'],
		alerts: {
			action: ['action', 'actionId'],
		},
	},
	streamlabs: {
		alerts: {
			donation: ['username', 'currency', 'currencySymbol', 'amount', 'message'],
			charity: ['username', 'currency', 'currencySymbol', 'amount', 'message'],
			merch: ['username', 'merch', 'message'],
			redemption: ['username', 'redemption', 'message'],
			primeGift: ['username'],
		},
	},
	tiktok: {
		variables: [
			'tiktok_live',
			'tiktok_session_chat_count',
			'tiktok_current_first_chatter',
			'tiktok_current_first_chatter_count',
			'tiktok_previous_first_chatter',
			'tiktok_previous_first_chatter_count',
			'tiktok_last_chatter',
			'tiktok_current_viewer_count',
			'tiktok_total_follower_count',
			'tiktok_session_follower_count',
			'tiktok_week_follower_count',
			'tiktok_month_follower_count',
			'tiktok_session_super_fan_count',
			'tiktok_session_share_count',
			'tiktok_last_follower',
			'tiktok_last_super_fan',
			'tiktok_last_gifter',
			'tiktok_session_gifters',
			'tiktok_session_gifts',
			'tiktok_total_gifts',
			'tiktok_total_likes',
			'tiktok_session_likes',
			'tiktok_video_count',
			'tiktok_last_video_title',
			'tiktok_last_video_id',
			'tiktok_last_video_link',
			'tiktok_last_video_embed',
		],
		alerts: {
			firstChatter: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'userId', 'displayname', 'avatar', 'message'],
			follower: ['username', 'userId', 'displayname', 'avatar'],
			superFan: ['username', 'displayname', 'avatar', 'userId'],
			gift: ['username', 'userId', 'avatar', 'coins', 'diamonds', 'giftId', 'giftName', 'giftPictureUrl', 'giftType', 'giftAmount', 'amount'],
			like: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount', 'amount'],
			totalLikes: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount', 'amount'],
			share: ['username', 'userId', 'displayname', 'avatar'],
			treasureChest: ['username', 'userId', 'avatar', 'envelopeId', 'diamondCount', 'peopleCount', 'unpackAt', 'amount'],
			question: ['username', 'userId', 'displayname', 'avatar', 'question', 'questionId', 'answerStatus'],
			poll: ['pollId', 'title', 'pollKind', 'pollDuration', 'timeRemain', 'pollSponsor', 'userCount'],
			superFanBox: ['username', 'displayname', 'avatar', 'userId'],
			shopPurchase: ['title', 'price', 'imageUrl', 'shopUrl', 'shopName'],
			pinMessage: ['message', 'messageId', 'pinId', 'pinTime', 'operatorUsername', 'operatorUserId'],
			battleStart: ['battleId', 'battleLabel', 'creatorUsername', 'creatorDisplayname', 'creatorAvatar', 'opponentUsername', 'opponentDisplayname', 'opponentAvatar', 'battleType'],
			battleProgress: [
				'battleId',
				'battleLabel',
				'creatorUsername',
				'creatorDisplayname',
				'creatorAvatar',
				'opponentUsername',
				'opponentDisplayname',
				'opponentAvatar',
				'creatorScore',
				'opponentScore',
				'giftId',
				'giftCount',
				'repeatCount',
				'totalDiamondCount',
				'battleStatus',
				'amount',
			],
			battleEnd: ['battleId', 'battleLabel', 'creatorUsername', 'opponentUsername', 'creatorScore', 'opponentScore', 'result', 'winnerUsername', 'loserUsername'],
			streamEnd: ['eventTime'],
			newVideo: ['title', 'description', 'embed', 'link', 'id', 'duration', 'likes', 'shares', 'views', 'comments'],
		},
	},
	tiltify: {
		variables: ['tiltify_goal_amount', 'tiltify_total_raised'],
		alerts: {
			campaignDonation: ['username', 'currency', 'currencySymbol', 'amount'],
		},
	},
	throne: {
		variables: ['throne_last_gift'],
		alerts: {
			giftPurchase: ['username', 'displayname', 'message', 'itemName', 'itemThumbnailUrl', 'isSurpriseGift', 'creatorUsername', 'raw'],
			contributionPurchase: ['username', 'displayname', 'message', 'itemName', 'itemThumbnailUrl', 'amount', 'currency', 'creatorUsername', 'raw'],
			giftCrowdfunded: ['username', 'displayname', 'itemName', 'itemThumbnailUrl', 'isSurpriseGift', 'creatorUsername', 'raw'],
		},
	},
	tipeeestream: {
		alerts: {
			donation: ['username', 'currency', 'currencySymbol', 'amount'],
		},
	},
	treatstream: {
		alerts: {
			treat: ['username', 'treat'],
		},
	},
	twitch: {
		variables: [
			'twitch_uptime',
			'twitch_live',
			'twitch_followage={{message}}',
			'twitch_next_ad',
			'twitch_get_avatar={{message}}',
			'twitch_followage',
			'twitch_get_avatar',
			'twitch_user_id',
			'twitch_username',
			'twitch_current_viewer_count',
			'twitch_current_viewers',
			'twitch_total_follower_count',
			'twitch_current_followers',
			'twitch_session_follower_count',
			'twitch_week_follower_count',
			'twitch_month_follower_count',
			'twitch_current_subscribers',
			'twitch_total_subscriber_count',
			'twitch_session_subscribers_count',
			'twitch_session_new_subscribers_count',
			'twitch_session_resub_subscribers_count',
			'twitch_session_gifted_subscribers_count',
			'twitch_week_subscriber_count',
			'twitch_month_subscriber_count',
			'twitch_session_gifts_count',
			'twitch_total_gift_subscription_count',
			'twitch_alltime_top_gifter',
			'twitch_alltime_top_gifter_amount',
			'twitch_current_mods',
			'twitch_last_follower',
			'twitch_session_follower',
			'twitch_last_subscriber',
			'twitch_last_new_subscriber',
			'twitch_last_resubscriber',
			'twitch_last_gifter',
			'twitch_last_gifter_amount',
			'twitch_last_gifted',
			'twitch_session_subscribers',
			'twitch_session_chat_count',
			'twitch_current_first_chatter',
			'twitch_current_first_chatter_count',
			'twitch_previous_first_chatter',
			'twitch_previous_first_chatter_count',
			'twitch_last_chatter',
			'twitch_last_raider',
			'twitch_last_raid_amount',
			'twitch_session_raiders',
			'twitch_total_bits_count',
			'twitch_session_bits_count',
			'twitch_week_bits_count',
			'twitch_month_bits_count',
			'twitch_last_bit',
			'twitch_last_bit_amount',
			'twitch_session_bits',
			'twitch_session_bits_with_amount',
			'twitch_session_top_cheer',
			'twitch_session_top_cheer_amount',
			'twitch_session_top_cheerer',
			'twitch_session_top_cheerer_amount',
			'twitch_week_top_cheerer',
			'twitch_week_top_cheerer_amount',
			'twitch_month_top_cheerer',
			'twitch_month_top_cheerer_amount',
			'twitch_hypetrain_active',
			'twitch_hypetrain_level',
			'twitch_hypetrain_progress',
			'twitch_hypetrain_level_goal',
			'twitch_hypetrain_total',
			'twitch_hypetrain_top_contributor',
			'twitch_hypetrain_top_contributor_amount',
			'twitch_alltime_top_cheerer',
			'twitch_alltime_top_cheerer_amount',
			'twitch_week_top_cheer',
			'twitch_week_top_cheer_amount',
			'twitch_month_top_cheer',
			'twitch_month_top_cheer_amount',
			'twitch_alltime_top_cheer',
			'twitch_alltime_top_cheer_amount',
			'twitch_last_channel_points_redeemer',
			'twitch_last_channel_points_amount',
			'top_cheerer_list',
			'top_cheerer_list_amount',
			'week_top_cheerer_list',
			'week_top_cheerer_list_amount',
			'month_top_cheerer_list',
			'month_top_cheerer_list_amount',
			'top_gifter_list',
			'top_gifter_list_amount',
			'week_top_gifter_list',
			'week_top_gifter_list_amount',
			'month_top_gifter_list',
			'month_top_gifter_list_amount',
			'twitch_last_clip_id',
			'twitch_last_clip_url',
			'twitch_last_clip_thumbnail_url',
			'twitch_channel_title',
			'twitch_channel_description',
			'twitch_avatar',
			'twitch_offline_image',
			'twitch_category',
			'twitch_category_id',
			'twitch_current_poll_id',
			'twitch_current_prediction_id',
		],
		alerts: {
			streamLive: ['eventTime'],
			streamOffline: [],
			firstChatter: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'userId', 'displayname', 'avatar', 'message'],
			follower: ['username', 'avatar'],
			sessionFollowers: ['total', 'previousTotal'],
			subscriber: ['username', 'avatar', 'tier', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
			sessionSubs: ['total', 'previousTotal'],
			giftSubscription: [
				'username',
				'avatar',
				'tier',
				'giftAmount',
				'amount',
				'recipients',
				TWITCH_RECIPIENTS_RAW_EXAMPLE,
				'gifter',
				'totalGifts',
				'subMonths',
				'streakMonths',
				'message',
				'subPlan',
				'subPlanName',
			],
			sessionGiftSubscriptions: ['total', 'previousTotal'],
			bits: ['username', 'avatar', 'amount', 'message'],
			bitsCombo: ['username', 'avatar', 'amount', 'bitsType', 'message'],
			sessionBits: ['total', 'previousTotal'],
			raid: ['username', 'avatar', 'viewers', 'amount'],
			raidOut: ['username', 'avatar', 'viewers', 'amount'],
			hypetrainStarted: ['total', 'progress', 'goal', 'amount'],
			hypetrainProgressed: ['level', 'total', 'progress', 'goal', 'amount'],
			hypetrainLevelProgressed: ['level', 'total', 'progress', 'goal', 'amount'],
			hypetrainEnded: ['level', 'total', 'amount'],
			pollStarted: ['poll_title', 'poll_id', 'poll_choices', 'poll_started_at', 'poll_ends_at'],
			pollProgressed: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_started_at', 'poll_ends_at'],
			pollEnded: ['poll_id', 'poll_title', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_started_at', 'poll_ends_at'],
			predictionStarted: [
				'prediction_title',
				'prediction_id',
				'prediction_possible_outcomes',
				'prediction_outcome1_title',
				'prediction_outcome1_points',
				'prediction_outcome1_color',
				'prediction_outcome2_title',
				'prediction_outcome2_points',
				'prediction_outcome2_color',
				'prediction_started_at',
				'prediction_ends_at',
			],
			predictionProgressed: [
				'prediction_title',
				'prediction_id',
				'prediction_possible_outcomes',
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
			predictionLocked: [
				'prediction_title',
				'prediction_id',
				'prediction_possible_outcomes',
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
			predictionEnded: [
				'prediction_title',
				'prediction_id',
				'prediction_possible_outcomes',
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
			goalStarted: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount'],
			goalProgressed: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount'],
			goalEnded: ['goal_type', 'goal_id', 'goal_description', 'goal_amount', 'goal_target_amount', 'goal_achieved', 'goal_status'],
			charityDonation: ['userId', 'username', 'displayname', 'amount', 'currency', 'currencySymbol', 'campaign_id', 'charity_name', 'charity_description', 'charity_logo', 'charity_website'],
			charityCampaignStarted: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'currencySymbol', 'started_at'],
			charityCampaignProgressed: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'currencySymbol'],
			charityCampaignStopped: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'currencySymbol', 'ended_at'],
			categoryChanged: ['category_name', 'category_id', 'channel_title'],
			clip: [
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
			channelJoin: ['username', 'avatar'],
			channelLeave: ['username', 'avatar'],
			banned: ['username', 'userId', 'avatar', 'reason'],
			timeout: ['username', 'userId', 'avatar', 'timeout_duration', 'expiration_ms', 'reason'],
			timeoutOver: ['username', 'userId', 'avatar', 'timeout_duration', 'expiration_ms', 'reason'],
			shoutoutReceive: ['username', 'userId', 'displayname', 'avatar', 'viewer_count', 'started_at'],
			warned: ['username', 'userId', 'displayname', 'moderator', 'reason', 'chat_rules_cited'],
			suspiciousUserMessage: ['username', 'userId', 'displayname', 'message', 'low_trust_status', 'ban_evasion_evaluation', 'types'],
			suspiciousUserUpdated: ['username', 'userId', 'displayname', 'moderator', 'low_trust_status'],
			shieldModeStarted: ['username', 'userId', 'displayname', 'started_at'],
			shieldModeEnded: ['username', 'userId', 'displayname', 'ended_at'],
			adStarted: ['length', 'is_automatic', 'started_at', 'twitch_next_ad', 'amount'],
			adStopped: ['length', 'is_automatic', 'started_at', 'twitch_next_ad', 'amount'],
			watchStreak: ['username', 'userId', 'displayname', 'avatar', 'streak_count', 'channel_points_awarded', 'amount', 'message', 'system_message'],
			powerups: ['username', 'avatar', 'type', 'amount', 'message', 'reward_id', 'powerup_source'],
			modiversary: ['username', 'userId', 'displayname', 'avatar', 'months', 'message', 'system_message'],
		},
	},
	twitter: {
		variables: [
			'twitter_last_tweet',
			'twitter_last_tweet_id',
			'twitter_last_tweet_link',
			'twitter_likes_count',
			'twitter_retweets_count',
			'twitter_last_follower_username',
			'twitter_last_follower_id',
			'twitter_last_follower_avatar',
			'twitter_last_follower_tweet',
			'twitter_last_follower_tweet_url',
			'twitter_last_follower_background_color',
			'twitter_last_follower_link_color',
			'twitter_follower_count',
			'twitter_following_count',
			'twitter_tweets_count',
			'twitter_last_tweet_likes_count',
			'twitter_last_tweet_retweets_count',
			'twitter_last_retweeter_username',
			'twitter_last_retweeter_id',
			'twitter_last_retweeter_avatar',
			'twitter_last_retweeter_tweet',
			'twitter_last_retweeter_background_color',
			'twitter_last_retweeter_link_color',
		],
		alerts: {
			follower: ['username', 'userId', 'displayname', 'avatar', 'followers'],
			like: ['value', 'likes'],
			retweet: [
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
		},
	},
	vlc: {
		variables: ['vlc_now_playing_media', 'vlc_now_playing_image', 'vlc_now_playing_id', 'vlc_now_playing_artist', 'vlc_now_playing_uri', 'vlc_now_playing_url', 'vlc_now_playing_duration' /* , 'vlc_now_playing_progress' */],
		alerts: {
			switchSong: ['name', 'uri', 'image'],
			songPlayed: ['name', 'uri', 'image'],
			songPaused: ['name', 'uri', 'image'],
		},
	},
	voicemod: {
		variables: ['voicemod_voice_changer_on', 'voicemod_previous_voice', 'voicemod_current_voice'],
	},
	vtubestudio: {
		variables: ['vtubestudio_current_model', 'vtubestudio_current_background', 'vtubestudio_last_hotkey_triggered'],
		alerts: {
			hotkeyTriggered: ['name', 'modelName', 'modelId'],
			modelLoaded: ['name', 'modelName', 'modelId'],
			animationStart: ['name', 'modelName', 'modelId', 'animationName', 'animationLength'],
			animationEnd: ['name', 'modelName', 'modelId', 'animationName', 'animationLength'],
			itemAdded: ['name'],
			itemRemoved: ['name'],
			backgroundChanged: ['name'],
		},
	},
	woocommerce: {
		variables: [
			'woocommerce_last_order_name',
			'woocommerce_last_order_first_name',
			'woocommerce_last_order_last_name',
			'woocommerce_last_order_items',
			'woocommerce_last_order_item',
			'woocommerce_last_order_amount',
			'woocommerce_last_order_amount_currency',
		],
		alerts: {
			order: [],
		},
	},
	youtube: {
		variables: [
			'youtube_uptime',
			'youtube_live',
			'youtube_session_chat_count',
			'youtube_current_first_chatter',
			'youtube_current_first_chatter_count',
			'youtube_previous_first_chatter',
			'youtube_previous_first_chatter_count',
			'youtube_last_chatter',
			'youtube_session_subscriber_count',
			'youtube_week_subscriber_count',
			'youtube_month_subscriber_count',
			'youtube_total_subscriber_count',
			'youtube_session_superchat_count',
			'youtube_session_superchat_amount',
			'youtube_week_superchat_amount',
			'youtube_month_superchat_amount',
			'youtube_total_superchat_amount',
			'youtube_session_top_superchat',
			'youtube_session_top_superchat_amount',
			'youtube_week_top_superchat',
			'youtube_week_top_superchat_amount',
			'youtube_month_top_superchat',
			'youtube_month_top_superchat_amount',
			'youtube_alltime_top_superchat',
			'youtube_alltime_top_superchat_amount',
			'youtube_session_top_superchatter',
			'youtube_session_top_superchatter_amount',
			'youtube_week_top_superchatter',
			'youtube_week_top_superchatter_amount',
			'youtube_month_top_superchatter',
			'youtube_month_top_superchatter_amount',
			'youtube_alltime_top_superchatter',
			'youtube_alltime_top_superchatter_amount',
			'youtube_last_superchatter',
			'youtube_session_superchatters',
			'youtube_session_supersticker_count',
			'youtube_last_supersticker',
			'youtube_session_superstickers',
			'youtube_total_member_count',
			'youtube_session_member_count',
			'youtube_week_member_count',
			'youtube_month_member_count',
			'youtube_last_member',
			'youtube_session_members',
			'youtube_last_subscriber',
			'youtube_total_gift_members_count',
			'youtube_session_gift_members_count',
			'youtube_last_gift_member',
			'youtube_session_gift_members',
			'youtube_total_jewels_count',
			'youtube_session_jewels_count',
			'youtube_last_jewels',
			'youtube_last_jewels_user',
			'youtube_session_jewels_gifters',
			'youtube_total_video_count',
			'youtube_total_view_count',
		],
		alerts: {
			streamLive: ['eventTime'],
			streamOffline: [],
			firstChatter: ['username', 'displayname', 'userId', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'displayname', 'userId', 'avatar', 'message'],
			subscriber: ['username', 'displayname', 'avatar', 'userId'],
			sessionSubs: ['total', 'previousTotal'],
			member: ['username', 'displayname', 'avatar', 'tier', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName', 'subPlanId'],
			sessionMembers: ['total', 'previousTotal'],
			giftMembers: [
				'username',
				'displayname',
				'avatar',
				'tier',
				'giftAmount',
				'recipients',
				YOUTUBE_RECIPIENTS_RAW_EXAMPLE,
				'gifter',
				'totalGifts',
				'subMonths',
				'streakMonths',
				'message',
				'subPlan',
				'subPlanName',
			],
			sessionGiftMembers: ['total', 'previousTotal'],
			gifts: [
				'username',
				'displayname',
				'avatar',
				'userId',
				'jewelsAmount',
				'totalJewels',
				'comboCount',
				'giftName',
				'giftUrl',
				'giftImageUrl',
				'giftDurationSeconds',
				'giftDurationNanos',
				'hasVisualEffect',
				'altText',
				'language',
				'message',
			],
			sessionGifts: ['total', 'previousTotal'],
			superchat: ['username', 'displayname', 'currency', 'currencySymbol', 'amount', 'message'],
			sessionSuperchats: ['total', 'previousTotal', 'currency', 'currencySymbol'],
			supersticker: ['username', 'displayname', 'stickerId', 'stickerName', 'amount', 'currency', 'currencySymbol', 'imageUrl'],
			sessionSuperstickers: ['total', 'previousTotal', 'currency', 'currencySymbol'],
			like: ['likes', 'dislikes', 'amount'],
			viewers: ['viewers', 'amount'],
		},
	},
	youtubemusic: {
		variables: [
			'youtubemusic_now_playing_song',
			'youtubemusic_now_playing_image',
			'youtubemusic_now_playing_id',
			'youtubemusic_now_playing_artist',
			'youtubemusic_now_playing_url',
			'youtubemusic_now_playing_duration',
			// 'youtubemusic_now_playing_progress',
			'youtubemusic_next_song',
			'youtubemusic_next_image',
			'youtubemusic_next_artist',
			'youtubemusic_next_id',
			'youtubemusic_next_url',
			'youtubemusic_queue',
		],
		alerts: {
			switchSong: [
				'youtubemusic_now_playing_song',
				'youtubemusic_now_playing_image',
				'youtubemusic_now_playing_id',
				'youtubemusic_now_playing_artist',
				'youtubemusic_now_playing_url',
				'youtubemusic_next_song',
				'youtubemusic_next_image',
				'youtubemusic_next_artist',
				'youtubemusic_next_id',
				'youtubemusic_next_url',
				'youtubemusic_queue',
			],
			songPlayed: [
				'youtubemusic_now_playing_song',
				'youtubemusic_now_playing_image',
				'youtubemusic_now_playing_id',
				'youtubemusic_now_playing_artist',
				'youtubemusic_now_playing_url',
				'youtubemusic_next_song',
				'youtubemusic_next_image',
				'youtubemusic_next_artist',
				'youtubemusic_next_id',
				'youtubemusic_next_url',
				'youtubemusic_queue',
			],
			songPaused: [
				'youtubemusic_now_playing_song',
				'youtubemusic_now_playing_image',
				'youtubemusic_now_playing_id',
				'youtubemusic_now_playing_artist',
				'youtubemusic_now_playing_url',
				'youtubemusic_next_song',
				'youtubemusic_next_image',
				'youtubemusic_next_artist',
				'youtubemusic_next_id',
				'youtubemusic_next_url',
				'youtubemusic_queue',
			],
		},
	},
};
