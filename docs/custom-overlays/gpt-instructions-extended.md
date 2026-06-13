# Lumia Custom Overlays GPT — Extended Reference

This is the companion knowledge file to `gpt-instructions.md`. The system prompt is capped at 8000 characters so long-form reference material lives here. When a rule here conflicts with `gpt-instructions.md`, the system prompt wins.

---

## SystemVariables Quick Reference

Curated short list. For anything not here, check `custom-overlays.d.ts` before suggesting a name. If a name is not in the enum, it does not exist — fall back to Config/Data or a custom variable.

### Followers (lifetime / session count)

- Twitch: `{{twitch_total_follower_count}}` / `{{twitch_session_follower_count}}`
- Kick: `{{kick_total_follower_count}}` / `{{kick_session_follower_count}}`
- YouTube: `{{youtube_total_subscriber_count}}` (YouTube calls followers "subscribers")

### Subscribers / members (lifetime / session count)

- Twitch: `{{twitch_total_subscriber_count}}` / `{{twitch_session_subscribers_count}}`
- Kick: `{{kick_total_subscriber_count}}` / `{{kick_session_subscriber_count}}`
- YouTube: `{{youtube_session_subscriber_count}}`

### Donations (cross-platform aggregate)

- Lifetime: `{{total_donation_amount}}`, `{{total_donation_amount_currency}}`, `{{total_donation_amount_currency_symbol}}`
- Session: `{{session_donation_amount}}`, `{{session_donation_count}}`
- Top donor: `{{session_top_donator}}`, `{{session_top_donator_amount}}`

### Bits (Twitch only)

- Lifetime / session count: `{{twitch_total_bits_count}}` / `{{twitch_session_bits_count}}`
- Last bit: `{{twitch_last_bit}}`, `{{twitch_last_bit_amount}}`

### Last-event names (great for "recent X" overlays)

- `{{twitch_last_follower}}`, `{{twitch_last_subscriber}}`, `{{twitch_last_gifter}}`, `{{twitch_last_gifter_amount}}`, `{{twitch_last_raider}}`, `{{twitch_last_raid_amount}}`, `{{twitch_last_chatter}}`

### Stream state

- Live state: `{{twitch_live}}`, `{{kick_live}}`, `{{youtube_live}}`
- Uptime: `{{twitch_uptime}}`, `{{youtube_uptime}}`
- Viewers: `{{twitch_current_viewer_count}}`, `{{kick_current_viewer_count}}`, `{{youtube_current_viewer_count}}`

### Channel info

- Twitch: `{{twitch_username}}`, `{{twitch_avatar}}`, `{{twitch_channel_title}}`, `{{twitch_category}}`
- Kick: `{{kick_username}}`, `{{kick_avatar}}`, `{{kick_channel_title}}`, `{{kick_category}}`

### Function-style SystemVariables (useful in Config `input` with `enableVariables: true`)

- Math / logic: `{{math=...}}`, `{{round=...}}`, `{{compare=...}}`, `{{if=...}}`, `{{between=...}}`, `{{min=...}}`, `{{max=...}}`, `{{coalesce=...}}`
- Random: `{{random=min,max}}`, `{{random_input=a,b,c}}`, `{{selection=first,second}}`
- Strings / dates: `{{regex_extract=...}}`, `{{replace=...}}`, `{{format_date=...}}`, `{{time_since=...}}`

Rules: SystemVariables are read-only from overlays. Never `setVariable` on a SystemVariable key. Do not create Config/Data keys that duplicate SystemVariable concepts.

---

## Alert Values (`data.alert`)

Always match with exact string equality — never `includes`, never substring matching.

### Twitch

- `twitch-follower`, `twitch-subscriber`, `twitch-giftSubscription`, `twitch-raid`, `twitch-raidOut`
- `twitch-bits`, `twitch-bitsCombo`, `twitch-points`, `twitch-redemption`, `twitch-extension`
- `twitch-channelJoin`, `twitch-channelLeave`, `twitch-firstChatter`, `twitch-entrance`, `twitch-clip`
- `twitch-streamLive`, `twitch-streamOffline`, `twitch-categoryChanged`
- `twitch-hypetrainStarted`, `twitch-hypetrainProgressed`, `twitch-hypetrainLevelProgressed`, `twitch-hypetrainEnded`
- `twitch-pollStarted`, `twitch-pollProgressed`, `twitch-pollEnded`
- `twitch-predictionStarted`, `twitch-predictionProgressed`, `twitch-predictionLocked`, `twitch-predictionEnded`
- `twitch-goalStarted`, `twitch-goalProgressed`, `twitch-goalEnded`
- `twitch-charityDonation`, `twitch-charityCampaignStarted`, `twitch-charityCampaignProgressed`, `twitch-charityCampaignStopped`
- `twitch-banned`, `twitch-timeout`, `twitch-timeoutOver`, `twitch-shoutoutReceive`
- `twitch-adStarted`, `twitch-adStopped`, `twitch-watchStreak`, `twitch-powerups`

### Kick

- `kick-follower`, `kick-subscriber`, `kick-giftSubscription`, `kick-points`, `kick-raid`, `kick-hosted`
- `kick-streamLive`, `kick-streamOffline`, `kick-firstChatter`, `kick-entrance`
- `kick-banned`, `kick-unbanned`

### YouTube

- `youtube-subscriber`, `youtube-member`, `youtube-giftMembers`, `youtube-superchat`, `youtube-superstickers`
- `youtube-streamLive`, `youtube-streamOffline`, `youtube-firstChatter`, `youtube-entrance`

### Donations (all cross-platform)

- `streamlabs-donation`, `streamelements-donation`, `extralife-donation`, `donordrive-donation`
- `tiltify-campaignDonation`, `kofi-donation`, `kofi-subscription`, `kofi-shopOrder`
- `fourthwall-donation`, `fourthwall-orderPlaced`, `fourthwall-giftPurchase`, `fourthwall-subscriptionPurchased`
- `patreon-pledge`, `lumiastream-donation`

For the canonical full enum see `custom-overlays-alerts.d.ts`.

---

## `Overlay.chatbot` Platform Values

`platform` is optional. Omit to send to every connected chat. When set, use exactly one of:

- `"twitch"`, `"youtube"`, `"kick"`, `"tiktok"`, `"facebook"`, `"trovo"`

Never invent other values. Never capitalize.

---

## OBS Events

When the overlay runs inside OBS with Lumia connected, OBS events are forwarded to `window` as real DOM `CustomEvent`s. Lumia auto-detects which events the overlay uses from string literals in `addEventListener` calls — so always use a direct string literal.

### Supported event names

- `obsRecordingStarted`, `obsRecordingStopped`, `obsRecordingPaused`, `obsRecordingUnpaused`
- `obsStreamingStarted`, `obsStreamingStopped`
- `obsReplaybufferStarted`, `obsReplaybufferStopped`
- `obsVirtualcamStarted`, `obsVirtualcamStopped`
- `obsSceneChanged`
- `obsTransitionBegin`, `obsTransitionEnd`
- `obsSourceVisibleChanged`, `obsSourceActiveChanged`

### Usage

```js
window.addEventListener("obsSceneChanged", (e) => {
  const sceneName = e.detail?.name;
  // react to scene change
});
```

Notes:

- `e.detail` is correct here because these are real `CustomEvent` objects. Lumia's own overlay events (`chat`, `alert`, `hfx`, `virtuallight`, `overlaycontent`) still use the raw-payload `Overlay.on` API — don't confuse the two.
- OBS events only fire when the overlay runs inside OBS with Lumia running. Handle the case where they never fire.

---

## Free CDN Assets (no API key, hotlink-safe)

Safe to recommend to normal users. Stable URLs, permissive licenses, no signup required.

### Images

- **Lorem Picsum** — random photos, CC0.
  - Pattern: `https://picsum.photos/{width}/{height}?random={seed}`
  - Example: `https://picsum.photos/800/600?random=12`
- **DiceBear** — deterministic avatars. Great for chat-avatar fallbacks.
  - Pattern: `https://api.dicebear.com/9.x/{style}/svg?seed={anything}`
  - Styles: `bottts`, `pixel-art`, `lorelei`, `thumbs`, `shapes`, `adventurer`, `avataaars`, `fun-emoji`, `identicon`, `initials`, `micah`, `miniavs`, `notionists`, `open-peeps`, `personas`.
  - Example: `https://api.dicebear.com/9.x/bottts/svg?seed=lumia`

### Icons and logos

- **Simple Icons** — brand logos for 3000+ companies.
  - Pattern: `https://cdn.simpleicons.org/{slug}/{color?}`
  - Example: `https://cdn.simpleicons.org/twitch/9146FF`
- **Twemoji** — Twitter's open emoji set (MIT).
  - Pattern: `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/{codepoint}.png`
  - Example (🔥 = 1f525): `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f525.png`
- **OpenMoji** — CC BY-SA open emoji.
  - Pattern: `https://openmoji.org/data/color/svg/{CODEPOINT}.svg`

### Pokemon sprites (used by the Pokemon example)

- `https://img.pokemondb.net/sprites/home/{normal|shiny}/{slug}.png`

### Do NOT recommend

Services requiring an API key or signup (Unsplash API, Pexels, Pixabay, Giphy, Tenor, Freesound) — normal users won't do the setup.

---

## Lumia-Hosted Asset Library (existing placeholders)

Already hosted on Lumia's CDN — safe to use as fallbacks when the user hasn't supplied an asset:

- Generic image: `https://storage.lumiastream.com/placeholderLogo.png`
- Empty avatar: `https://storage.lumiastream.com/placeholderUserIcon.png`
- Game art: `https://storage.lumiastream.com/overlays/2/bed3ba31-f516-476d-975a-3498f5b5f33e.png`
- Spin SFX: `https://storage.lumiastream.com/overlays/lumia/audio/Wheel_of_Fortune.mp3`
- Win SFX: `https://storage.lumiastream.com/overlays/lumia/audio/crowdClap.mp3`
- Lose SFX: `https://storage.lumiastream.com/overlays/lumia/audio/youLose.mp3`

---

## Lumia-Hosted Asset Library — NOT YET AVAILABLE (do not suggest)

⚠️ There is **no** general `https://storage.lumiastream.com/overlays/lumia/assets/...` asset library yet — those URLs do **not** resolve. Never invent, guess, or hand a user any `.../overlays/lumia/assets/...` path. An expanded CC0 SFX/image library is planned for that location, but until it ships, only point users at the two safe sources:

- The confirmed Lumia-hosted placeholders in the **Lumia-Hosted Asset Library (existing placeholders)** section above.
- The keyless free-CDN patterns in the **Free CDN Assets** section above.

If a user needs a sound or image you can't source from those, have them upload their own through a Config `soundupload` / `imageupload` / `videoupload` field instead of pointing at a URL that may not exist.

---

## Style Crib Sheet

- Numbers from Config/Data: `const n = Number(Overlay.data?.key) || defaultValue;`
- Guard against missing chat fields: `const msg = (data.message || "").trim();`
- Check moderator status: `const isMod = data.userLevels?.mod || data.userLevels?.isSelf;`
- Get a Config value as string via token replacement: `const color = "{{accentColor}}";`
- Lumia wraps the JS tab in `(async () => { ... })()`, so top-level `await` works.
