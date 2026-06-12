# Lumia Stream Chatbot Message Reference

This document is the reference for writing **chat bot messages** for Lumia Stream chat commands. A chat command runs when a viewer types a trigger (for example `!hello`) and the bot sends back a message. The message is a single line of text that can contain dynamic **variables** and **variable functions**.

## Message syntax

Write the message as plain text. Insert dynamic values with double curly braces: `{{variable}}`. When the message is sent, each token is replaced with its live value.

- A plain variable: `Welcome {{username}}!` becomes `Welcome lumi!`.
- A default/fallback value if the variable is empty: `{{latest_subscriber=nobody yet}}`.
- Tokens can be nested inside a function: `{{math={{twitch_total_follower_count}}+1}}`.
- Anything that is not inside `{{ }}` is sent literally.

Keep messages to a single chat line unless the user asks for more. Do not wrap the message in quotes and do not use markdown. Only use variables and functions that appear in this reference — never invent new variable or function names.

## Common variables

These resolve to live values about the viewer, the stream, and recent events.

### Viewer / chatter

- `{{username}}` — the login name of the viewer who triggered the command.
- `{{displayname}}` — the viewer's display (cased) name.
- `{{message}}` — the full text the viewer typed after the command.
- `{{platform}}` — the viewer's platform: `twitch`, `youtube`, `kick`, `tiktok`, or `facebook`.
- `{{userLevels}}` — the viewer's roles (mod, vip, subscriber, follower, etc.).

### The streamer / channel

- `{{streamer}}` — the streamer's name (works across any connected platform).
- `{{twitch_channel_title}}` — the current stream title.
- `{{twitch_category}}` — the current game or category.
- `{{twitch_current_viewer_count}}` — current live viewer count on Twitch.
- `{{twitch_live}}` — `true` or `false` for whether Twitch is live.

### Followers, subscribers, donations (totals and sessions)

- `{{total_follower_count}}` — all-time follower count across platforms.
- `{{total_subscriber_count}}` — all-time subscriber count across platforms.
- `{{twitch_total_follower_count}}`, `{{kick_total_subscriber_count}}`, etc. — per-platform totals.
- `{{session_follower_count}}` — followers gained this stream session.
- `{{session_subscriber_count}}` — subscribers gained this session.
- `{{session_donation_amount}}` — total donations this session.

### Most recent events

- `{{last_follower}}` — name of the most recent follower.
- `{{latest_subscriber}}` — name of the most recent subscriber.
- `{{last_cheer}}` — name of the last person to cheer bits.
- `{{last_raider}}` — name of the last raider, with `{{last_raider_amount}}` viewers.
- `{{latest_donator}}` — last donor, with `{{latest_donator_amount}}` and `{{latest_donator_currency_symbol}}`.

### Time and uptime

- `{{today}}` — the current date.
- `{{time}}` — the current time.
- `{{lumia_uptime}}` — how long Lumia Stream has been running (e.g. `1d 5h`).
- `{{twitch_uptime}}` — how long the Twitch stream has been live.

### Loyalty / points

- `{{loyalty_currency_name}}` — the custom name of the channel's points (e.g. "Lumipoints").

## Variable functions

Variable functions perform logic. They are written `{{name=arguments}}`. Arguments are separated by commas. If an argument itself contains a comma (a URL, a regex, a date pattern), wrap that argument in quotes.

### Randomness

- `{{random}}` — a random number from 1 to 100.
- `{{random=1,6}}` — a random number in a range (a dice roll).
- `{{random_input=a,b,c}}` — pick one item at random from the list.
- `{{random_inputs={{username}},{{last_subscriber}}}}` — pick at random between variables.
- `{{random_chatter=twitch}}` — pick a random recent chatter on a platform. Use `all` for any platform.

### Math and numbers

- `{{math={{var1}}+{{var2}}}}` — evaluate a math expression. Operators: `+ - * / % ^`, with parentheses.
- `{{round={{math=10/3}},2}}` — round a number to N decimal places.
- `{{min={{var1}},{{var2}},100}}` / `{{max=...}}` — smallest / largest of the values.
- `{{sum_variables=twitch_total_follower_count,kick_total_follower_count}}` — add a list of numeric variables.
- `{{offset_count=twitch_total_follower_count,10}}` — add (or subtract) a fixed offset to a numeric variable.

### Conditionals

- `{{compare={{var1}},>,{{var2}}}}` — returns `true` or `false`. Operators: `> >= < <= == !=`.
- `{{between={{twitch_current_viewer_count}},1,100}}` — returns `true` if the value is in the range.
- `{{if={{compare={{var1}},>,10}},high,low}}` — if the condition is truthy, output the second argument, otherwise the third.
- `{{coalesce={{displayname}},{{username}},Anonymous}}` — output the first argument that is not empty.

### Text

- `{{arg=1}}` — the first word the viewer typed after the command. `{{arg=2}}` is the second word, and so on.
- `{{arg=1,word}}` — like `arg` but only accepts a plain word. Use `emote` to require an emote.
- `{{replace={{message}},badword,***}}` — replace text. The search term may be a `/pattern/flags` regex.
- `{{regex_extract={{message}},(\w+),1}}` — extract regex capture group N from the text.

### Counters and saved values

- `{{counter=deaths}}` — increment a saved counter by 1 and output the new value.
- `{{counter=deaths,+5}}` — change a counter. Modifiers: `+N` add, `-N` subtract, `=N` set, `*N` multiply.
- `{{save_local=highscore,100}}` — save a value that persists between messages.
- `{{load_local=highscore,0}}` — load a saved value, with a fallback if it is unset.

### Dates and durations

- `{{format_date={{session_start_date}},"MM/DD/YYYY hh:mm A"}}` — format a date (moment.js patterns; quote patterns containing commas).
- `{{time_since={{follow_time}}}}` — elapsed time since a date, like `2d 3h`.
- `{{time_until="2026-12-25T00:00:00Z"}}` — countdown to a future date.
- `{{twitch_followage}}` — how long the viewer has followed.
- `{{account_age}}` — how long ago the viewer's account was created.

### Roles and user lookups

- `{{user_has_role=mod}}` — outputs the username if they have the role, otherwise empty. Roles: `mod`, `vip`, `subscriber`, `tier1`/`tier2`/`tier3`, `follower`, `broadcaster`.
- `{{user_has_role=subscriber,yesno}}` — outputs `Yes` or `No`.
- `{{user_top_role}}` — the viewer's highest role.
- `{{lookup_user=someuser,twitch,displayname}}` — look up another user's field. Fields: `displayname`, `avatar`, `channelDescription`, `channelViews`.
- `{{get_user_loyalty_points={{username}}}}` — the viewer's loyalty point balance.
- `{{user_watchtime={{username}}}}` — the viewer's total watch time.

### External / advanced

- `{{read_url="https://api.example.com/user",data.name}}` — fetch JSON from a URL and read a field (quote URLs with commas/query strings).
- `{{weather=Seattle}}` — current weather for a location.
- `{{js=Math.floor(Math.random()*6)+1}}` — run a small sandboxed JavaScript expression (1 second limit). Wrap string variables in quotes, e.g. `{{js='{{username}}'.toUpperCase()}}`.

## StreamElements compatibility

Lumia accepts StreamElements `$(...)` syntax and converts it automatically. Prefer native `{{ }}` tokens, but these are equivalent: `$(sender)` → `{{username}}`, `$(touser)` → `{{arg=1}}`, `$(count)` → `{{counter}}`, `$(random.pick a b c)` → `{{random_input=a,b,c}}`, `$(urlfetch url)` → `{{read_url=url}}`.

## Examples

- Greeting: `Welcome to the stream, {{username}}! 🎉`
- Death counter: `{{streamer}} has died {{counter=deaths,+1}} times this stream.`
- Dice roll: `🎲 {{username}} rolled a {{random=1,6}}!`
- Shoutout: `Go check out {{arg=1}} at twitch.tv/{{arg=1}} — they were last seen playing {{lookup_user={{arg=1}},twitch,channelDescription}}!`
- Followage: `{{username}}, you have been following for {{twitch_followage}}.`
- Subs goal: `Sub count: {{twitch_total_subscriber_count}} / 100 — {{if={{compare={{twitch_total_subscriber_count}},>=,100}},goal hit!,keep going!}}`
- Points: `{{username}}, you have {{get_user_loyalty_points={{username}}}} {{loyalty_currency_name}}.`
