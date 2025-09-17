// [AI] When SystemVariables is used, update custom-overlays.d.ts

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

	/** Commands URL/page. Use in overlays as {{commands_url}}. */
	COMMANDS_URL = 'commands_url',
	/** Session start time (ISO). Use as {{session_start_date}}. */
	SESSION_START_DATE = 'session_start_date',

	// ─────────────────────────────────── Games ────────────────────────────────────

	/** Last player to trigger a game. Use as {{game_last_player}}. */
	GAME_LAST_PLAYER = 'game_last_player',

	// ────────────────────────────────── Uptimes ───────────────────────────────────

	/** Lumia app uptime. Use as {{lumia_uptime}}. */
	LUMIA_UPTIME = 'lumia_uptime',
	/** Twitch stream uptime. Use as {{twitch_uptime}}. */
	TWITCH_UPTIME = 'twitch_uptime',
	/** YouTube stream uptime. Use as {{youtube_uptime}}. */
	YOUTUBE_UPTIME = 'youtube_uptime',
	/** Facebook stream uptime. Use as {{facebook_uptime}}. */
	FACEBOOK_UPTIME = 'facebook_uptime',
	/** Trovo stream uptime. Use as {{trovo_uptime}}. */
	TROVO_UPTIME = 'trovo_uptime',
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
	/** Current subscribers (comma-separated). Use as {{twitch_current_subscribers}}. */
	TWITCH_CURRENT_SUBSCRIBERS = 'twitch_current_subscribers',
	/** Lifetime total subs. Use as {{twitch_total_subscriber_count}}. */
	TWITCH_TOTAL_SUBSCRIBER_COUNT = 'twitch_total_subscriber_count',
	/** Session subs count. Use as {{twitch_session_subscribers_count}}. */
	TWITCH_SESSION_SUBSCRIBERS_COUNT = 'twitch_session_subscribers_count',
	/** Session gifts count. Use as {{twitch_session_gifts_count}}. */
	TWITCH_SESSION_GIFTS_COUNT = 'twitch_session_gifts_count',
	/** Current moderators (comma-separated). Use as {{twitch_current_mods}}. */
	TWITCH_CURRENT_MODS = 'twitch_current_mods',
	/** Last follower. Use as {{twitch_last_follower}}. */
	TWITCH_LAST_FOLLOWER = 'twitch_last_follower',
	/** Session followers list. Use as {{twitch_session_follower}}. */
	TWITCH_SESSION_FOLLOWERS = 'twitch_session_follower',
	/** Last subscriber. Use as {{twitch_last_subscriber}}. */
	TWITCH_LAST_SUBSCRIBER = 'twitch_last_subscriber',
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
	/** Last bit sender. Use as {{twitch_last_bit}}. */
	TWITCH_LAST_BIT = 'twitch_last_bit',
	/** Last bit amount. Use as {{twitch_last_bit_amount}}. */
	TWITCH_LAST_BIT_AMOUNT = 'twitch_last_bit_amount',
	/** Session bits list. Use as {{twitch_session_bits}}. */
	TWITCH_SESSION_BITS = 'twitch_session_bits',
	/** Session bits with amounts list. Use as {{twitch_session_bits_with_amount}}. */
	TWITCH_SESSION_BITS_WITH_AMOUNT = 'twitch_session_bits_with_amount',
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
	/** Last member. Use as {{youtube_last_member}}. */
	YOUTUBE_LAST_MEMBER = 'youtube_last_member',
	/** Session members (list). Use as {{youtube_session_members}}. */
	YOUTUBE_SESSION_MEMBERS = 'youtube_session_members',
	/** Last subscriber. Use as {{youtube_last_subscriber}}. */
	YOUTUBE_LAST_SUBSCRIBER = 'youtube_last_subscriber',
	/** Total uploaded videos. Use as {{youtube_total_video_count}}. */
	YOUTUBE_TOTAL_VIDEO_COUNT = 'youtube_total_video_count',
	/** Total channel views. Use as {{youtube_total_view_count}}. */
	YOUTUBE_TOTAL_VIEW_COUNT = 'youtube_total_view_count',

	// ────────────────────────────────── Facebook ──────────────────────────────────

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
	/** Lifetime fan count. Use as {{facebook_total_fan_count}}. */
	FACEBOOK_TOTAL_FAN_COUNT = 'facebook_total_fan_count',
	/** Session fan count. Use as {{facebook_session_fan_count}}. */
	FACEBOOK_SESSION_FAN_COUNT = 'facebook_session_fan_count',
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
	/** Session subscriber count. Use as {{tiktok_session_subscriber_count}}. */
	TIKTOK_SESSION_SUBSCRIBER_COUNT = 'tiktok_session_subscriber_count',
	/** Session share count. Use as {{tiktok_session_share_count}}. */
	TIKTOK_SESSION_SHARE_COUNT = 'tiktok_session_share_count',
	/** Last follower. Use as {{tiktok_last_follower}}. */
	TIKTOK_LAST_FOLLOWER = 'tiktok_last_follower',
	/** Last subscriber. Use as {{tiktok_last_subscriber}}. */
	TIKTOK_LAST_SUBSCRIBER = 'tiktok_last_subscriber',
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
	/** Lifetime total subs. Use as {{kick_total_subscriber_count}}. */
	KICK_TOTAL_SUBSCRIBER_COUNT = 'kick_total_subscriber_count',
	/** Session subs count. Use as {{kick_session_subscriber_count}}. */
	KICK_SESSION_SUBSCRIBER_COUNT = 'kick_session_subscriber_count',
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
	/** Get avatar by username. Use as {{kick_get_avatar}}. */
	KICK_GET_AVATAR = 'kick_get_avatar',

	// ─────────────────────────────────── Trovo ────────────────────────────────────

	/** Live status (true/false). Use as {{trovo_live}}. */
	TROVO_LIVE = 'trovo_live',
	/** Session chat count. Use as {{trovo_session_chat_count}}. */
	TROVO_SESSION_CHAT_COUNT = 'trovo_session_chat_count',
	/** Last follower. Use as {{trovo_last_follower}}. */
	TROVO_LAST_FOLLOWER = 'trovo_last_follower',
	/** Current first chatter. Use as {{trovo_current_first_chatter}}. */
	TROVO_CURRENT_FIRST_CHATTER = 'trovo_current_first_chatter',
	/** Current first chatter count. Use as {{trovo_current_first_chatter_count}}. */
	TROVO_CURRENT_FIRST_CHATTER_COUNT = 'trovo_current_first_chatter_count',
	/** Previous first chatter. Use as {{trovo_previous_first_chatter}}. */
	TROVO_PREVIOUS_FIRST_CHATTER = 'trovo_previous_first_chatter',
	/** Previous first chatter count. Use as {{trovo_previous_first_chatter_count}}. */
	TROVO_PREVIOUS_FIRST_CHATTER_COUNT = 'trovo_previous_first_chatter_count', // keep exact value
	/** Last chatter. Use as {{trovo_last_chatter}}. */
	TROVO_LAST_CHATTER = 'trovo_last_chatter',
	/** Last raid amount. Use as {{trovo_last_raid_amount}}. */
	TROVO_LAST_RAID_AMOUNT = 'trovo_last_raid_amount',
	/** Last raider. Use as {{trovo_last_raider}}. */
	TROVO_LAST_RAIDER = 'trovo_last_raider',
	/** Session follower count. Use as {{trovo_session_follower_count}}. */
	TROVO_SESSION_FOLLOWER_COUNT = 'trovo_session_follower_count',
	/** Session subscribers count. Use as {{trovo_session_subscribers_count}}. */
	TROVO_SESSION_SUBSCRIBERS_COUNT = 'trovo_session_subscribers_count',
	/** Session raiders list. Use as {{trovo_session_raiders}}. */
	TROVO_SESSION_RAIDERS = 'trovo_session_raiders',
	/** Last subscriber. Use as {{trovo_last_subscriber}}. */
	TROVO_LAST_SUBSCRIBER = 'trovo_last_subscriber',
	/** Session subscribers list. Use as {{trovo_session_subscribers}}. */
	TROVO_SESSION_SUBSCRIBERS = 'trovo_session_subscribers',

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
	/** Current queue (comma-separated). Use as {{spotify_queue}}. */
	SPOTIFY_QUEUE = 'spotify_queue',

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
	'full_message',
	'userId',
	'value',
	'site',
	'command',
	'merch',
	'message',
	'rawMessage',
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
	'clip_target_channel_title',
	'clip_target_channel_tags',
	'follow_time',
	'uptime',
];

export const AllVariables = {
	lumiastream: {
		variables: [
			'read_file',
			'read_url',
			'selection',
			'random',
			'random_input',
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
			'lumia_uptime',
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
		],
		chat: {
			cooldowns: ['cooldown_time_remaining'],
			command: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
				'points_cost',
			],
			chatbotCommand: [
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
				'userColor',
				'platform',
				'badgesRaw',
				'hasEmotes',
				'emotes',
				'emotesRaw',
				'timestamp',
			],
			twitchPoints: ['username', 'displayname', 'userId', 'avatar', 'channelDescription', 'channelViews', 'command', 'prompt', 'message', 'rawMessage', 'points', 'title', 'timestamp'],
			kickPoints: ['username', 'displayname', 'userId', 'avatar', 'channelDescription', 'channelViews', 'command', 'prompt', 'message', 'rawMessage', 'points', 'title', 'timestamp'],
			trovoSpells: [
				'username',
				'displayname',
				'spell',
				'spell_quantity',
				'spell_type',
				'spell_value',
				'spell_combined_value',
				'spell_mana_value',
				'spell_mana_combined_value',
				'spell_elixir_value',
				'spell_elixir_combined_value',
				'timestamp',
			],
			twitchExtensions: ['username', 'displayname', 'userId', 'avatar', 'channelDescription', 'channelViews', 'command', 'prompt', 'message', 'bits', 'timestamp', 'points_cost'],
			fileWatcher: ['content', 'file', 'path', 'timestamp'],
			chatmatch: ['language_detect_result', 'detected_language', 'detected_language_code'],

			commands: [
				'get_all_commands',
				'get_commands',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'clip_target_channel_title',
				'clip_target_channel_tags',
				'username',
				'displayname',
				'userId',
				'avatar',
				'userLevels',
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
				'userLevelsRaw',
				'channelDescription',
				'channelViews',
				'command',
				'message',
				'messageId',
				'rawMessage',
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
			donation: ['username', 'avatar', 'sender_social_link', 'currency', 'amount', 'message', 'anonymous', 'command'],
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
			],
			pollStarted: ['poll_title', 'poll_id', 'poll_choices'],
			pollProgressed: ['poll_title', 'poll_id', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
			pollEnded: ['poll_id', 'poll_title', 'poll_choices', 'poll_winning_title', 'poll_winning_id', 'poll_winning_votes', 'poll_total_votes'],
			viewerqueueStarted: ['viewerqueue_title', 'viewerqueue_entry_command', 'viewerqueue_entries', 'viewerqueue_players', 'viewerqueue_entries_count'],
			viewerqueueEnded: ['viewerqueue_title', 'viewerqueue_entry_command', 'viewerqueue_entries', 'viewerqueue_players', 'viewerqueue_entries_count'],
			rouletteWinner: ['username', 'outcome_amount', 'ball_position'],
			slotsWinner: ['username', 'outcome_amount', 'slots_combo'],
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
		alerts: {
			donation: ['username', 'currency', 'amount'],
		},
	},
	extralife: {
		alerts: {
			donation: ['username', 'currency', 'amount'],
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
			'facebook_total_fan_count',
			'facebook_session_fan_count',
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
			subscriptionGift: ['username', 'recipient', 'recipients', 'recipientsRaw', 'gifter', 'giftAmount', 'message'],
			share: ['username'],
		},
	},
	fourthwall: {
		alerts: {
			donation: ['username', 'email', 'message', 'currency', 'amount', 'raw'],
			subscription: ['username', 'email', 'currency', 'amount', 'interval', 'raw'],
			commission: ['username', 'email', 'message', 'currency', 'amount', 'raw'],
			shopOrder: ['username', 'email', 'message', 'items', 'currency', 'amount', 'raw'],
			giftPurchase: ['username', 'email', 'message', 'currency', 'amount', 'raw'],
			giveawayStarted: ['currency', 'amount', 'giveawayName', 'giveawayId', 'winners', 'winnerNames', 'winnerCount', 'duration', 'allGifts', 'totalGifts', 'offer', 'type'],
			giveawayEnded: ['currency', 'amount', 'giveawayName', 'giveawayId', 'winners', 'winnerNames', 'winnerCount', 'duration', 'allGifts', 'totalGifts', 'offer', 'type'],
			thankyouSent: ['username', 'email', 'message', 'mediaUrl', 'contribution'],
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
			'kick_total_subscriber_count',
			'kick_session_subscriber_count',
			'kick_session_gifts_count',
			'kick_session_subscribers',
			'kick_last_follower',
			'kick_last_subscriber',
			'kick_get_avatar',
		],
		alerts: {
			firstChatter: ['username', 'userId', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'userId', 'displayname', 'avatar', 'message'],
			follower: ['username'],
			sessionFollowers: ['total', 'previousTotal'],
			subscriber: ['username', 'avatar', 'tier', 'recipient', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
			sessionSubs: ['total', 'previousTotal'],
			subscriptionGift: ['username', 'avatar', 'tier', 'giftAmount', 'recipients', 'recipientsRaw', 'gifter', 'totalGifts', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
			sessionGiftSubscriptions: ['total', 'previousTotal'],
			kicks: ['username', 'avatar', 'amount', 'name', 'type', 'tier', 'id', 'message'],
			sessionKicks: ['total', 'previousTotal'],
			host: ['username', 'avatar', 'viewers'],
			banned: ['username', 'userId', 'bannedByUsername', 'bannedByUserId', 'expires'],
			unbanned: ['username', 'userId', 'unbannedByUsername', 'unbannedByUserId'],
		},
	},
	kofi: {
		variables: ['kofi_last_order_name', 'kofi_last_order_amount', 'kofi_last_order_amount_currency'],
		alerts: {
			donation: ['username', 'email', 'currency', 'amount'],
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
			replayBufferSaved: ['saved_key'],
			verticalBacktrackSaved: ['saved_key', 'height', 'width'],
			vendorEvent: ['eventType', 'eventData', 'vendorName'],
		},
	},
	patreon: {
		alerts: {
			campaignPledge: ['username', 'currency', 'amount'],
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
			'spotify_next_song',
			'spotify_next_image',
			'spotify_next_artist',
			'spotify_next_id',
			'spotify_next_url',
			'spotify_next_uri',
			'spotify_queue',
		],
		alerts: {
			switchSong: ['name', 'uri', 'image'],
			songPlayed: ['name', 'uri', 'image'],
			songPaused: ['name', 'uri', 'image'],
		},
	},
	streamelements: {
		alerts: {
			donation: ['username', 'currency', 'amount', 'message'],
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
			donation: ['username', 'currency', 'amount', 'message'],
			charity: ['username', 'currency', 'amount', 'message'],
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
			'tiktok_session_subscriber_count',
			'tiktok_session_share_count',
			'tiktok_last_follower',
			'tiktok_last_subscriber',
			'tiktok_last_gifter',
			'tiktok_session_gifters',
			'tiktok_session_gifts',
			'tiktok_total_gifts',
			'tiktok_total_likes',
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
			subscriber: ['username', 'displayname', 'subMonths', 'avatar'],
			gift: ['username', 'userId', 'avatar', 'coins', 'diamonds', 'giftId', 'giftName', 'giftPictureUrl', 'giftType', 'giftAmount'],
			like: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount'],
			totalLikes: ['username', 'userId', 'displayname', 'avatar', 'userLikeCount', 'totalLikeCount'],
			share: ['username', 'userId', 'displayname', 'avatar'],
			streamEnd: ['eventTime'],
			newVideo: ['title', 'description', 'embed', 'link', 'id', 'duration', 'likes', 'shares', 'views', 'comments'],
		},
	},
	tiltify: {
		alerts: {
			campaignDonation: ['username', 'currency', 'amount'],
		},
	},
	tipeeestream: {
		alerts: {
			donation: ['username', 'currency', 'amount'],
		},
	},
	treatstream: {
		alerts: {
			treat: ['username', 'treat'],
		},
	},
	trovo: {
		variables: [
			'trovo_uptime',
			'trovo_live',
			'trovo_session_chat_count',
			'trovo_last_follower',
			'trovo_current_first_chatter',
			'trovo_current_first_chatter_count',
			'trovo_previous_first_chatter',
			'trovo_previous_first_chatter_count',
			'trovo_last_chatter',
			'trovo_last_raider',
			'trovo_last_raid_amount',
			'trovo_session_follower_count',
			'trovo_session_subscribers_count',
			'trovo_session_raiders',
			'trovo_last_subscriber',
			'trovo_session_subscribers',
		],
		alerts: {
			streamLive: [],
			streamOffline: [],
			firstChatter: ['username', 'displayname', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'displayname', 'avatar', 'message'],
			channelJoin: ['username', 'displayname', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
			follower: ['username'],
			subscriber: ['username', 'displayname', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
			subscriptionGift: [
				'username',
				'displayname',
				'avatar',
				'tier',
				'giftAmount',
				'recipients',
				'recipientsRaw',
				'gifter',
				'totalGifts',
				'subMonths',
				'streakMonths',
				'message',
				'subPlan',
				'subPlanName',
				'roles',
				'medals',
			],
			raid: ['username', 'viewers', 'displayname', 'viewers', 'sub_tier', 'sub_level', 'avatar', 'roles', 'medals'],
		},
	},
	twitch: {
		variables: [
			'twitch_uptime',
			'twitch_live',
			'twitch_followage={{username}}',
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
			'twitch_current_subscribers',
			'twitch_total_subscriber_count',
			'twitch_session_subscribers_count',
			'twitch_session_gifts_count',
			'twitch_current_mods',
			'twitch_last_follower',
			'twitch_session_follower',
			'twitch_last_subscriber',
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
			'twitch_last_bit',
			'twitch_last_bit_amount',
			'twitch_session_bits',
			'twitch_session_bits_with_amount',
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
			giftSubscription: ['username', 'avatar', 'tier', 'giftAmount', 'recipients', 'recipientsRaw', 'gifter', 'totalGifts', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName'],
			sessionGiftSubscriptions: ['total', 'previousTotal'],
			bits: ['username', 'avatar', 'amount', 'message', 'rawMessage', 'full_message'],
			sessionBits: ['total', 'previousTotal'],
			raid: ['username', 'avatar', 'viewers'],
			raidOut: ['username', 'avatar', 'viewers'],
			hypetrainStarted: ['total', 'progress', 'goal'],
			hypetrainProgressed: ['level', 'total', 'progress', 'goal'],
			hypetrainLevelProgressed: ['level', 'total', 'progress', 'goal'],
			hypetrainEnded: ['level', 'total'],
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
			charityDonation: ['userId', 'username', 'displayname', 'amount', 'currency', 'campaign_id', 'charity_name', 'charity_description', 'charity_logo', 'charity_website'],
			charityCampaignStarted: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'started_at'],
			charityCampaignProgressed: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency'],
			charityCampaignStopped: ['charity_name', 'charity_description', 'charity_logo', 'charity_amount', 'charity_target_amount', 'charity_website', 'currency', 'ended_at'],
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
			adStarted: ['length', 'is_automatic', 'started_at', 'twitch_next_ad'],
			adStopped: ['length', 'is_automatic', 'started_at', 'twitch_next_ad'],
			powerups: ['username', 'avatar', 'type', 'amount', 'message', 'rawMessage', 'full_message'],
			powerupsPoints: ['username', 'avatar', 'type', 'amount', 'message', 'rawMessage', 'full_message'],
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
		variables: ['vlc_now_playing_media', 'vlc_now_playing_image', 'vlc_now_playing_id', 'vlc_now_playing_artist', 'vlc_now_playing_uri', 'vlc_now_playing_url'],
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
			'youtube_total_subscriber_count',
			'youtube_session_superchat_count',
			'youtube_last_superchatter',
			'youtube_session_superchatters',
			'youtube_session_supersticker_count',
			'youtube_last_supersticker',
			'youtube_session_superstickers',
			'youtube_total_member_count',
			'youtube_session_member_count',
			'youtube_last_member',
			'youtube_session_members',
			'youtube_last_subscriber',
			'youtube_total_video_count',
			'youtube_total_view_count',
		],
		alerts: {
			streamLive: ['eventTime'],
			streamOffline: [],
			firstChatter: ['username', 'displayname', 'userId', 'avatar', 'first_count', 'message'],
			entrance: ['username', 'displayname', 'userId', 'avatar', 'message'],
			subscriber: ['username', 'displayname', 'avatar', 'userId'],
			member: ['username', 'displayname', 'avatar', 'tier', 'subMonths', 'streakMonths', 'message', 'subPlan', 'subPlanName', 'subPlanId'],
			superchat: ['username', 'displayname', 'currency', 'amount', 'message'],
			supersticker: ['username', 'displayname', 'amount'],
			like: ['likes', 'dislikes'],
			viewers: ['viewers'],
		},
	},
	youtubemusic: {
		variables: [
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
