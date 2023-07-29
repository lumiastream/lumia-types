// Used for external things like our SDK websocket and rest apis

import { LumiaActivityCommandTypes } from './activity.types';

// Packets that will be sent through socket and rest apis
export interface ILumiaSendPack {
	type: LumiaActivityCommandTypes;
	gamesGlowId?: string;
	gamesGlowKey?: string;
	params?: {
		value: string | boolean | { r: number; g: number; b: number };
		lights?: Array<ILumiaLight>;
		hold?: boolean; // Sets this command to default or not
		skipQueue?: boolean; // Skips the queue and instantly turns to this color

		platform?: LumiaPlatforms;

		// Used for TTS
		voice?: string;
		volume?: number;

		// Mainly used for RGB color and Hex color types
		brightness?: number;
		transition?: number;
		duration?: number;

		extraSettings?: { username?: string; bits?: number }; // Mainly used to pass in variables for things like TTS or Chat bot
	};
}

export interface ILumiaEvent {
	origin: EventOrigins;
	subOrigin?: EventOrigins;
	type: LumiaEventTypes;
	data: ILumiaEventStateBody | ILumiaEventChatCommandBody | ILumiaEventChatBody | ILumiaEventAlertBody | ILumiaEventStateBody;
}

export interface ILumiaEventChatCommandBody {
	username?: string;
	command?: string;
}

export interface ILumiaEventChatBody {
	type: string;
	data: {
		id: string;
		username: string;
		userId: string;
		userColor: string;
		userColorRgb: string;
		avatar: string;
		platform: string;
		badgesRaw: string;
		hasEmotes: boolean;
		emotes: string;
		rawMessageWithoutEmotes: string;
		emotesRaw: string;
		channel: string;
		message: string;
		user: {
			'badge-info': Array<unknown>;
			badges: Array<unknown>;
			'client-nonce': string;
			color: string;
			'display-name': string;
			emotes: string;
			'first-msg': boolean;
			flags: string;
			id: string;
			mod: boolean;
			'room-id': string;
			subscriber: boolean;
			'tmi-sent-ts': string;
			turbo: boolean;
			'user-id': string;
			'user-type': string;
			'emotes-raw': string;
			'badge-info-raw': string;
			'badges-raw': string;
			username: string;
			'message-type': string;
			isSelf: boolean;
			vip: boolean;
			tier3: boolean;
			tier2: boolean;
			tier1: boolean;
			follower: boolean;
		};
	};
	raw: {
		channel: string;
		message: string;
		user: {
			'badge-info': Array<unknown>;
			badges: Array<unknown>;
			'client-nonce': string;
			color: string;
			'display-name': string;
			emotes: string;
			'first-msg': boolean;
			flags: string;
			id: string;
			mod: boolean;
			'room-id': string;
			subscriber: boolean;
			'tmi-sent-ts': string;
			turbo: boolean;
			'user-id': string;
			'user-type': string;
			'emotes-raw': string;
			'badge-info-raw': string;
			'badges-raw': string;
			username: string;
			'message-type': string;
			isSelf: boolean;
			vip: boolean;
			tier3: boolean;
			tier2: boolean;
			tier1: boolean;
			follower: boolean;
		};
	};
}

export interface ILumiaEventAlertBody {
	// Streamlabs origin
	type?: 'follow';
	message?: unknown;
	for?: 'twitch_account';
	event_id?: string;
}

export interface ILumiaEventStateBody {
	on: number;
	fuze: number;
	streamMode: number;
}

export interface ILumiaLight {
	type: LightBrands;
	id: string | number;
}

export type LumiaPlatforms = 'twitch' | 'youtube' | 'facebook' | 'trovo';
type LightBrands =
	| 'hue'
	| 'nanoleaf'
	| 'nanoleaf2'
	| 'lifx'
	| 'tplink'
	| 'tapo'
	| 'yeelight'
	| 'cololight'
	| 'tuya'
	| 'smartlife'
	| 'wyze'
	| 'wiz'
	| 'homeassistant'
	| 'govee'
	| 'wled'
	| 'magichome'
	| 'logitech'
	| 'razer'
	| 'corsair'
	| 'steelseries'
	| 'overlay'
	| 'elgato';

export type LumiaAlertBrands =
	| 'lumiastream'
	| 'twitch'
	| 'facebook'
	| 'trovo'
	| 'youtube'
	| 'streamlabs'
	| 'streamelements'
	| 'extralife'
	| 'donordrive'
	| 'tiltify'
	| 'patreon'
	| 'tipeeestream'
	| 'treatstream'
	| 'obs'
	| 'slobs'
	| 'spotify'
	| 'nowplaying'
	| 'vlc'
	| 'twitter'
	| 'woocommerce'
	| 'kofi'
	| 'tiktok'
	| 'kick'
	| 'streamerbot'
	| 'discord'
	| 'pulse'
	| 'youtubemusic';

export enum LumiaEventTypes {
	STATES = 'states',
	CHAT = 'chat',
	COMMAND = 'command',
	TWITCH_POINTS = 'twitch_point',
	TWITCH_EXTENSIONS = 'twitch_extension',
	TROVO_SPELL = 'trovo_spell',
	PULSE = 'pulse',
	ALERTS = 'alert',
	GAMESGLOW_ALERT = 'gamesglow_alert',
	GAMESGLOW_COMMAND = 'gamesglow_command',
	GAMESGLOW_VIRTUALLIGHT = 'gamesglow_virtuallight',
}

type EventOrigins =
	| 'lumia'
	| 'twitch'
	| 'youtube'
	| 'facebook'
	| 'trovo'
	| 'streamlabs'
	| 'streamelements'
	| 'extralife'
	| 'donordrive'
	| 'tiltify'
	| 'patreon'
	| 'tipeeestream'
	| 'treatstream'
	| 'discord'
	| 'obs'
	| 'slobs'
	| 'pulse'
	| 'pulsoid'
	| 'hyperate'
	| 'ableton'
	| 'streamerbot'
	| 'paypal';
