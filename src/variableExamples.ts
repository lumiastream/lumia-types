export type VariableExample = { label: string; snippet: string };

// English-only example use-cases for function variables, surfaced when a
// function variable is expanded in a variable picker. Keyed by variable name;
// the snippet is the inner token (what goes between {{ }}). Shared across apps —
// the UI layer receives this map and renders it. Only list a variable here when
// it has 2+ genuinely distinct examples (different args/capability, or a
// discoverable option set) — a single example just duplicates the default
// insert.
//
// All snippets below are verified against the VariablesManager implementations.
// Two gotchas the resolver imposes: function args split on commas, so a regex
// or date pattern that contains a comma must be wrapped in quotes; and a literal
// backslash in a pattern is written `\\` in this source so the runtime string is
// a single backslash.
export const VARIABLE_EXAMPLES: Record<string, VariableExample[]> = {
	read_url: [
		{ label: 'Fetch a plain-text endpoint', snippet: 'read_url=https://api.lumiastream.com/api/url-test' },
		{ label: 'Pull one field out of a JSON response', snippet: 'read_url=https://api.example.com/user,data.name' },
		{ label: 'URL containing commas (wrap in quotes)', snippet: 'read_url="https://api.example.com/?ids=1,2,3",result' },
	],
	selection: [
		{ label: 'Validate a vote (chatter types one)', snippet: 'selection=red,blue,green' },
		{ label: 'Yes / no / maybe gate', snippet: 'selection=yes,no,maybe' },
		{ label: 'Pick a side', snippet: 'selection=heads,tails' },
	],
	random: [
		{ label: 'Number between 1 and 100', snippet: 'random=1,100' },
		{ label: 'Dice roll (1–6)', snippet: 'random=1,6' },
		{ label: 'Allow negative numbers', snippet: 'random=-10,10' },
	],
	random_input: [
		{ label: 'Magic 8-ball answer', snippet: 'random_input=Yes,No,Maybe,Ask again later,Definitely' },
		{ label: 'Decide what to play', snippet: 'random_input=Minecraft,Valorant,Just Chatting' },
		{ label: 'Coin flip', snippet: 'random_input=Heads,Tails' },
		{ label: 'Random hype message', snippet: "random_input=Let's go!,Insane!,GG" },
	],
	random_inputs: [
		{ label: 'Random compliment', snippet: "random_inputs=You're awesome!,Great vibes!,Legend!" },
		{ label: 'Pick a random viewer to shout out', snippet: 'random_inputs={{username}},{{last_subscriber}},{{last_follower}}' },
		{ label: 'Random dare', snippet: 'random_inputs=No swearing for 5 min,Use a funny voice,Do a dance' },
	],
	math: [
		{ label: 'Add two variables', snippet: 'math={{twitch_total_follower_count}}+{{kick_total_follower_count}}' },
		{ label: 'Percentage of a goal', snippet: 'math={{current}}/{{goal}}*100' },
		{ label: 'Group with parentheses', snippet: 'math=({{var1}}+{{var2}})/2' },
		{ label: 'Even/odd via modulo', snippet: 'math={{arg=1}}%2' },
		{ label: 'Exponent (square)', snippet: 'math={{arg=1}}^2' },
	],
	js: [
		{ label: 'Celsius → Fahrenheit', snippet: 'js={{arg=1}} * 9 / 5 + 32' },
		{ label: 'Round to 2 decimals', snippet: 'js=({{arg=1}} / 3).toFixed(2)' },
		{ label: 'Adult / minor check (ternary)', snippet: "js={{arg=1}} >= 18 ? 'adult' : 'minor'" },
		{ label: 'Random dice roll 1–6', snippet: 'js=Math.floor(Math.random() * 6) + 1' },
		{ label: 'Clamp between 0 and 100', snippet: 'js=Math.min(100, Math.max(0, {{arg=1}}))' },
		{ label: "Uppercase the caller's name", snippet: "js='{{username}}'.toUpperCase()" },
		{ label: 'Comma-format a big number', snippet: 'js=Number({{twitch_total_follower_count}}).toLocaleString()' },
		{ label: 'First word of the message', snippet: "js='{{message}}'.split(' ')[0]" },
	],
	compare: [
		{ label: 'Greater than', snippet: 'compare={{var1}},>,{{var2}}' },
		{ label: 'At least 100 viewers', snippet: 'compare={{twitch_current_viewer_count}},>=,100' },
		{ label: 'Equality check', snippet: 'compare={{platform}},==,twitch' },
		{ label: 'Not equal to a value', snippet: 'compare={{game}},!=,Just Chatting' },
	],
	round: [
		{ label: 'Round a division to 2 decimals', snippet: 'round={{math={{var1}}/{{var2}}}},2' },
		{ label: 'Round to a whole number', snippet: 'round={{math={{var1}}/{{var2}}}},0' },
		{ label: 'Goal percentage to 1 decimal', snippet: 'round={{math={{current}}/{{goal}}*100}},1' },
	],
	if: [
		{ label: 'High / low from a comparison', snippet: 'if={{compare={{var1}},>,10}},high,low' },
		{ label: 'Badge only for mods', snippet: 'if={{user_has_role=mod}},🛡️,' },
		{ label: 'Sub vs viewer', snippet: 'if={{user_has_role=subscriber}},sub,viewer' },
		{ label: 'Branch on a range', snippet: 'if={{between={{viewers}},1,10}},cozy,packed' },
	],
	coalesce: [
		{ label: 'Display name with fallback', snippet: 'coalesce={{display_name}},{{username}},Anonymous' },
		{ label: "First connected platform's title", snippet: 'coalesce={{twitch_channel_title}},{{kick_channel_title}}' },
		{ label: 'Typed target, else the caller', snippet: 'coalesce={{arg=1}},{{username}}' },
	],
	between: [
		{ label: 'Check a value is in range', snippet: 'between={{var1}},10,50' },
		{ label: 'Gate on viewer count', snippet: 'between={{twitch_current_viewer_count}},1,100' },
	],
	min: [
		{ label: 'Smallest of several values', snippet: 'min={{v1}},{{v2}},100' },
		{ label: 'Cap a value at 100', snippet: 'min={{score}},100' },
	],
	max: [
		{ label: 'Largest of several values', snippet: 'max={{v1}},{{v2}},0' },
		{ label: 'Floor a value at 0', snippet: 'max={{score}},0' },
	],
	regex_extract: [
		{ label: 'First number in the message', snippet: 'regex_extract={{message}},([0-9]+),1' },
		{ label: 'First word in the message', snippet: 'regex_extract={{message}},(\\w+),1' },
		{ label: 'A @mention', snippet: 'regex_extract={{message}},@(\\w+),1' },
		{ label: 'A hashtag (whole match, group 0)', snippet: 'regex_extract={{message}},#\\w+,0' },
		{ label: 'Comma in pattern → quote it', snippet: 'regex_extract={{message}},"(\\d{2,4})",1' },
	],
	replace: [
		{ label: 'Censor a word', snippet: 'replace={{message}},badword,***' },
		{ label: 'Case-insensitive regex censor', snippet: 'replace={{message}},/badword/gi,***' },
		{ label: 'Strip everything but digits', snippet: 'replace={{message}},/[^0-9]/g,' },
		{ label: 'Swap text', snippet: 'replace={{message}},hello,hi' },
		{ label: 'Remove a word', snippet: 'replace={{message}},spoiler,' },
	],
	format_date: [
		{ label: 'Date and time (default)', snippet: 'format_date={{session_start_date}},MM/DD/YYYY hh:mm A' },
		{ label: 'ISO date', snippet: 'format_date={{session_start_date}},YYYY-MM-DD' },
		{ label: '12-hour clock', snippet: 'format_date={{session_start_date}},h:mm A' },
		{ label: '24-hour clock', snippet: 'format_date={{session_start_date}},HH:mm' },
		{ label: 'Weekday name', snippet: 'format_date={{session_start_date}},dddd' },
		{ label: 'Month and ordinal day', snippet: 'format_date={{session_start_date}},MMMM Do' },
		{ label: 'Short day + time', snippet: 'format_date={{session_start_date}},ddd h:mm A' },
		{ label: 'Friendly (quote patterns with commas)', snippet: 'format_date={{session_start_date}},"dddd, MMM Do YYYY"' },
		{ label: 'Full date with comma (quoted)', snippet: 'format_date={{session_start_date}},"MMM D, YYYY"' },
	],
	time_since: [
		{ label: 'Since you went live', snippet: 'time_since={{session_start_date}}' },
		{ label: 'Since a follow', snippet: 'time_since={{follow_time}}' },
		{ label: 'Since a fixed date', snippet: 'time_since=2020-01-01' },
		{ label: 'Since a variable date', snippet: 'time_since={{anniversary_date}}' },
	],
	time_until: [
		{ label: 'Countdown to a date', snippet: 'time_until=2026-12-25T00:00:00Z' },
		{ label: 'Until the next Twitch ad', snippet: 'time_until={{next_ad_starts_date}}' },
		{ label: 'Until the poll closes', snippet: 'time_until={{poll_ends_at}}' },
		{ label: 'Until the prediction closes', snippet: 'time_until={{prediction_ends_at}}' },
		{ label: 'Countdown to a variable date', snippet: 'time_until={{event_date}}' },
	],
	counter: [
		{ label: 'Add one (e.g. deaths)', snippet: 'counter=mydeaths' },
		{ label: 'Add five', snippet: 'counter=mydeaths,+5' },
		{ label: 'Subtract one', snippet: 'counter=mydeaths,-1' },
		{ label: 'Set to a value', snippet: 'counter=mydeaths,=0' },
		{ label: 'Double it', snippet: 'counter=score,*2' },
	],
	save_local: [
		{ label: 'Save a high score', snippet: 'save_local=highscore,100' },
		{ label: 'Save a flag', snippet: 'save_local=intro_done,true' },
	],
	load_local: [
		{ label: 'Load a saved value', snippet: 'load_local=highscore' },
		{ label: 'Load with a fallback', snippet: 'load_local=highscore,0' },
	],
	arg: [
		{ label: 'First word after the command', snippet: 'arg=1' },
		{ label: 'Second word', snippet: 'arg=2' },
		{ label: 'Require alphanumeric', snippet: 'arg=1,word' },
		{ label: 'Require an emote', snippet: 'arg=3,emote' },
	],
	get_var_from_msg: [
		{ label: 'Read name= from the message', snippet: 'get_var_from_msg=name' },
		{ label: 'Read age= from the message', snippet: 'get_var_from_msg=age' },
		{ label: 'Read a quoted value (msg color="hot pink")', snippet: 'get_var_from_msg=color' },
	],
	lookup_user: [
		{ label: "Another user's display name", snippet: 'lookup_user=lumi' },
		{ label: 'The target the chatter typed', snippet: 'lookup_user={{arg=1}}' },
		{ label: 'Avatar on a platform', snippet: 'lookup_user=lumi,twitch,avatar' },
	],
	random_chatter: [
		{ label: 'Any recent chatter', snippet: 'random_chatter' },
		{ label: 'Twitch only', snippet: 'random_chatter=twitch' },
		{ label: 'Across all platforms', snippet: 'random_chatter=all' },
	],
	user_has_role: [
		{ label: 'Mods only', snippet: 'user_has_role=mod' },
		{ label: 'VIPs only', snippet: 'user_has_role=vip' },
		{ label: 'Subscribers only', snippet: 'user_has_role=subscriber' },
	],
	sum_variables: [
		{ label: 'Combined followers', snippet: 'sum_variables=twitch_total_follower_count,kick_total_follower_count' },
		{ label: 'Combined subscribers', snippet: 'sum_variables=twitch_total_subscriber_count,kick_total_subscriber_count' },
	],
	offset_count: [
		{ label: 'Pad a follower count', snippet: 'offset_count=twitch_total_follower_count,10' },
		{ label: 'Subtract from a count', snippet: 'offset_count=twitch_total_follower_count,-5' },
	],
	convert_color_to_hex: [
		{ label: 'Green to hex', snippet: 'convert_color_to_hex=green' },
		{ label: 'Hot pink to hex', snippet: 'convert_color_to_hex=hotpink' },
		{ label: 'From a chat color name', snippet: 'convert_color_to_hex={{message}}' },
	],
	get_random_file_from_folder: [
		{ label: 'Random sound for a !sfx command', snippet: 'get_random_file_from_folder=C:/Sounds' },
		{ label: 'Random meme image', snippet: 'get_random_file_from_folder=C:/Memes' },
		{ label: 'Random clip', snippet: 'get_random_file_from_folder=C:/Clips' },
	],
	get_latest_file_from_folder: [
		{ label: 'Latest clip', snippet: 'get_latest_file_from_folder=C:/Clips' },
		{ label: 'Latest screenshot', snippet: 'get_latest_file_from_folder=C:/Screenshots' },
		{ label: 'Latest recording', snippet: 'get_latest_file_from_folder=C:/Recordings' },
	],
	screenshot: [
		{ label: 'Primary monitor', snippet: 'screenshot' },
		{ label: 'Second monitor', snippet: 'screenshot=2' },
	],
	overlay_screenshot: [
		{ label: 'Capture an overlay', snippet: 'overlay_screenshot=Overlay 1' },
		{ label: 'Thermal filter', snippet: 'overlay_screenshot=Overlay 1,thermal' },
		{ label: 'Grayscale filter', snippet: 'overlay_screenshot=Overlay 1,grayscale' },
		{ label: 'Inverted colors', snippet: 'overlay_screenshot=Overlay 1,invert' },
		{ label: 'Black & white (binary)', snippet: 'overlay_screenshot=Overlay 1,binary' },
	],
	obs_screenshot: [
		{ label: 'Current OBS scene', snippet: 'obs_screenshot' },
		{ label: 'A specific scene', snippet: 'obs_screenshot=Scene 1' },
	],
	obs_replay: [
		{ label: 'Save the replay buffer', snippet: 'obs_replay' },
		{ label: 'Wait 5s before saving', snippet: 'obs_replay=5' },
	],
	obs_vertical_replay: [
		{ label: 'Save the vertical buffer', snippet: 'obs_vertical_replay' },
		{ label: 'Wait 5s before saving', snippet: 'obs_vertical_replay=5' },
	],
	twitch_followage: [
		{ label: 'Your own followage', snippet: 'twitch_followage' },
		{ label: "Another user's followage", snippet: 'twitch_followage={{username}}' },
	],
	twitch_accountage: [
		{ label: 'Your account age', snippet: 'twitch_accountage' },
		{ label: "Another user's account age", snippet: 'twitch_accountage={{username}}' },
	],
	account_age: [
		{ label: "Caller's account age", snippet: 'account_age={{username}}' },
		{ label: 'On a specific platform', snippet: 'account_age={{username}},twitch' },
	],
	get_avatar: [
		{ label: "Caller's avatar", snippet: 'get_avatar={{username}}' },
		{ label: 'A named user', snippet: 'get_avatar=lumi' },
		{ label: 'On a specific platform', snippet: 'get_avatar=lumi,twitch' },
	],
	vanish: [
		{ label: 'Clear your own messages', snippet: 'vanish={{username}}' },
		{ label: 'Clear the target user', snippet: 'vanish={{arg=1}}' },
	],
	get_user_loyalty_points: [
		{ label: 'Points for a typed user', snippet: 'get_user_loyalty_points={{message}}' },
		{ label: 'User on a platform', snippet: 'get_user_loyalty_points={{username}},{{platform}}' },
	],
	user_watchtime: [
		{ label: "Caller's watchtime", snippet: 'user_watchtime={{username}}' },
		{ label: 'A named user/platform', snippet: 'user_watchtime=lumi,twitch' },
	],
	toggle_automation: [
		{ label: 'Enable an automation', snippet: 'toggle_automation=My Automation,true' },
		{ label: 'Disable an automation', snippet: 'toggle_automation=My Automation,false' },
	],
	translate: [
		{ label: 'Auto-translate to your language', snippet: 'translate={{message}}' },
		{ label: 'To Spanish', snippet: 'translate={{message}}|es' },
		{ label: 'To French', snippet: 'translate={{message}}|fr' },
		{ label: 'To German', snippet: 'translate={{message}}|de' },
		{ label: 'To Japanese', snippet: 'translate={{message}}|ja' },
		{ label: 'To Korean', snippet: 'translate={{message}}|ko' },
		{ label: 'To Portuguese', snippet: 'translate={{message}}|pt' },
		{ label: 'To English', snippet: 'translate={{message}}|en' },
	],
	ai_prompt: [
		{ label: "Answer the chatter's question", snippet: 'ai_prompt={{message}}' },
		{ label: 'Fun fact about a topic', snippet: 'ai_prompt=Give a short fun fact about {{message}}' },
		{ label: 'Playful roast', snippet: 'ai_prompt=Roast {{username}} in one playful sentence' },
		{ label: 'Summarize in one line', snippet: 'ai_prompt=Summarize this in one sentence: {{message}}' },
		{ label: 'Keep context with a thread', snippet: 'ai_prompt={{message}}|{{username}}' },
		{ label: 'With a thread and model', snippet: 'ai_prompt=Make a funny quote|thread_name|gpt-5-mini' },
	],
	weather: [
		{ label: 'By city', snippet: 'weather=Seattle' },
		{ label: 'City, state', snippet: 'weather=New York, NY' },
		{ label: 'By coordinates', snippet: 'weather=47.6,-122.3' },
	],
	time: [
		{ label: 'Your local time', snippet: 'time' },
		{ label: 'Eastern (New York)', snippet: 'time=America/New_York' },
		{ label: 'Central (Chicago)', snippet: 'time=America/Chicago' },
		{ label: 'Mountain (Denver)', snippet: 'time=America/Denver' },
		{ label: 'Pacific (Los Angeles)', snippet: 'time=America/Los_Angeles' },
		{ label: 'UK (London)', snippet: 'time=Europe/London' },
		{ label: 'Central Europe (Paris)', snippet: 'time=Europe/Paris' },
		{ label: 'Japan (Tokyo)', snippet: 'time=Asia/Tokyo' },
		{ label: 'Australia (Sydney)', snippet: 'time=Australia/Sydney' },
		{ label: 'UTC', snippet: 'time=Etc/UTC' },
	],
	today: [
		{ label: "Today's date (local)", snippet: 'today' },
		{ label: 'Date in Eastern time', snippet: 'today=America/New_York' },
		{ label: 'Date in the UK', snippet: 'today=Europe/London' },
		{ label: 'Date in Japan', snippet: 'today=Asia/Tokyo' },
		{ label: 'Date in UTC', snippet: 'today=Etc/UTC' },
	],
	lookup_user_game: [
		{ label: "A typed user's category", snippet: 'lookup_user_game={{arg=1}}' },
		{ label: 'On a specific platform', snippet: 'lookup_user_game=someuser,twitch' },
	],
	lookup_user_title: [
		{ label: "A typed user's title", snippet: 'lookup_user_title={{arg=1}}' },
		{ label: 'On a specific platform', snippet: 'lookup_user_title=someuser,twitch' },
	],
	channel_emotes: [
		{ label: "Caller's platform emotes", snippet: 'channel_emotes' },
		{ label: 'A specific platform', snippet: 'channel_emotes=twitch' },
	],
	viewer_profile_summary: [
		{ label: "Caller's profile", snippet: 'viewer_profile_summary={{username}}' },
		{ label: 'A typed user', snippet: 'viewer_profile_summary={{arg=1}}' },
	],
	filesay: [
		{ label: 'Post each line of a URL', snippet: 'filesay=https://example.com/list.txt' },
		{ label: 'Post each line of a local file', snippet: 'filesay=C:/path/list.txt' },
	],
	loyalty_top: [
		{ label: 'Top 3 users', snippet: 'loyalty_top=3' },
		{ label: 'Top 5 users', snippet: 'loyalty_top=5' },
		{ label: 'Top 10 users', snippet: 'loyalty_top=10' },
	],
	add_points: [
		{ label: 'Give a user points', snippet: 'add_points={{username}},100' },
		{ label: 'Give the target points', snippet: 'add_points={{arg=1}},50' },
	],
	set_points: [
		{ label: "Set a user's points", snippet: 'set_points={{username}},100' },
		{ label: 'Reset a user to zero', snippet: 'set_points={{arg=1}},0' },
	],
	give_points: [
		{ label: 'Transfer to the typed user', snippet: 'give_points={{username}},{{touser}},100' },
		{ label: 'Transfer a fixed amount', snippet: 'give_points={{username}},{{arg=1}},50' },
	],
	add_chatbot_command: [
		{ label: 'Create a static command', snippet: 'add_chatbot_command=hi,Hello there!' },
		{ label: 'Create one using a variable', snippet: 'add_chatbot_command=so,Check out {{arg=1}}' },
	],
};

export const getVariableExamples = (variableName: string): VariableExample[] => VARIABLE_EXAMPLES[variableName] ?? [];
