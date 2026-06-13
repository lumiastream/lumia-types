---
sidebar_position: 2
title: Random Twitch Clip
---

# Randomly getting the latest Twitch Clip from a user

You can call requests from integrations that we support that have an access token. You can also pass in variable values when calling other commands/alerts to pass in extra data that you may need in that command.

```js
async function() {
	// Declared outside the try so it's still in scope when we call done()
	let randomClip;

	try {
		const twitchToken = await getToken('twitch');
		const twitchClientId = await getClientId('twitch');

		// userId is a variable that comes from chat commands. This will get the clips of the user who's chatting
		const clipsRes = await fetch('https://api.twitch.tv/helix/clips?broadcaster_id={{userId}}', {
			headers: {
				Authorization: `Bearer ${twitchToken}`,
				'Client-ID': twitchClientId
			}
		});
		const clips = (await clipsRes.json())?.data ?? [];
		if (clips.length) {
			randomClip = clips[Math.floor(Math.random() * clips.length)];
			chatbot({ message: `${randomClip.title}: ${randomClip.url}` });
		}
	} catch (err) {
		showToast({ message: 'error: ' + err.message });
	}

	if (randomClip) {
		done({ variables: { user_clip_title: randomClip.title, user_clip: randomClip.url } });
	} else {
		done();
	}
}
```

:::tip

**code blocks** like the one above 👆 have a copy button on the **top right corner** click it then paste in Lumia stream

:::
