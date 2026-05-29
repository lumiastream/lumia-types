export const EMULATE_EXAMPLE_AVATAR_URL =
	'https://static-cdn.jtvnw.net/jtv_user_pictures/2b1fa336-f9b2-42cf-bd2c-98675da74982-profile_image-300x300.png';

export function getExampleAlertVariableValue(variableName: string): string | number | boolean {
	const lowered = variableName.toLowerCase();

	if (lowered.includes('avatar') || lowered.includes('image') || lowered.includes('thumbnail') || lowered.includes('cover') || lowered.includes('icon')) {
		return EMULATE_EXAMPLE_AVATAR_URL;
	}
	if (lowered.includes('url') || lowered.includes('link')) {
		return 'https://lumia.stream';
	}
	if (lowered.endsWith('symbol') || lowered === 'currencysymbol') {
		return '$';
	}
	if (lowered.includes('currency')) {
		return 'USD';
	}
	if (lowered.includes('color')) {
		return '#FF4076';
	}
	if (
		lowered.includes('amount') ||
		lowered.includes('bits') ||
		lowered.includes('count') ||
		lowered.includes('total') ||
		lowered.includes('viewers') ||
		lowered.includes('points') ||
		lowered.includes('level') ||
		lowered.includes('progress') ||
		lowered.includes('duration') ||
		lowered.includes('price')
	) {
		return 42;
	}
	if (lowered.startsWith('is') || lowered.startsWith('has') || lowered.startsWith('can') || lowered.startsWith('should')) {
		return true;
	}
	if (lowered.includes('date')) {
		return new Date().toISOString().slice(0, 10);
	}
	if (lowered.includes('time')) {
		return new Date().toISOString();
	}
	if (lowered.includes('song') || lowered.includes('track') || lowered.includes('title')) {
		return 'Example Title';
	}
	if (lowered.includes('artist')) {
		return 'Example Artist';
	}
	if (lowered.includes('album')) {
		return 'Example Album';
	}
	if (lowered.includes('username') || lowered.includes('user') || lowered.includes('viewer') || lowered.includes('sender') || lowered.includes('author')) {
		return 'lumiastream';
	}
	if (lowered.includes('message') || lowered.includes('text') || lowered.includes('content') || lowered.includes('body')) {
		return 'Example message';
	}
	if (lowered.endsWith('id') || lowered.includes('_id')) {
		return '12345';
	}
	return `Example ${variableName}`;
}

export function buildExampleAlertVariables(
	acceptedVariables: string[] | undefined,
	existingExtraSettings?: Record<string, any>,
): Record<string, any> {
	if (!Array.isArray(acceptedVariables) || acceptedVariables.length === 0) {
		return {};
	}
	const currentValues = existingExtraSettings ?? {};
	return acceptedVariables.reduce(
		(all, variableName) => {
			if (typeof variableName !== 'string') {
				return all;
			}
			const cleanedVariableName = variableName.replace(/^\{\{|\}\}$/g, '').trim();
			if (!cleanedVariableName) {
				return all;
			}
			if (Object.prototype.hasOwnProperty.call(currentValues, cleanedVariableName)) {
				return all;
			}
			return { ...all, [cleanedVariableName]: getExampleAlertVariableValue(cleanedVariableName) };
		},
		{} as Record<string, any>,
	);
}

const LINKED_VARIABLE_FIELD_GROUPS: ReadonlyArray<ReadonlyArray<string>> = [['giftAmount', 'amount']];

// One-way alias: any of the legacy per-platform image field names (the
// pre-canonical names — giftPictureUrl, imageUrl, etc.) backfills
// `contentImage` if it's empty. We don't do the reverse — populating every
// legacy field from canonical would scatter the URL across alert types it
// doesn't belong to. Real platform managers continue to emit their own
// legacy field directly; this only matters for emulated payloads and any
// older form that still binds to a legacy variableField.
const LEGACY_CONTENT_IMAGE_FIELDS: ReadonlyArray<string> = [
	'giftPictureUrl',
	'imageUrl',
	'giftImageUrl',
	'clip_thumbnail',
	'charity_logo',
	'offerImageUrl',
];

export interface InputFieldLike {
	variableField: string;
}

export function isRedundantInputField(inputField: InputFieldLike, allInputFields: ReadonlyArray<InputFieldLike> | undefined): boolean {
	if (!inputField || !allInputFields) return false;
	for (const group of LINKED_VARIABLE_FIELD_GROUPS) {
		const idx = group.indexOf(inputField.variableField);
		if (idx <= 0) continue;
		const primary = group[0];
		if (allInputFields.some((f) => f.variableField === primary)) {
			return true;
		}
	}
	return false;
}

export function syncLinkedVariableFields(values: Record<string, any>): void {
	if (!values) return;
	for (const group of LINKED_VARIABLE_FIELD_GROUPS) {
		let source: any;
		let sourceKey: string | undefined;
		for (const key of group) {
			if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
				source = values[key];
				sourceKey = key;
				break;
			}
		}
		if (sourceKey === undefined) continue;
		for (const key of group) {
			if (key === sourceKey) continue;
			if (values[key] === undefined || values[key] === null || values[key] === '') {
				values[key] = source;
			}
		}
	}
}

// Canonical wire-type-aligned numeric field set. Each name corresponds to a
// dynamic/extraSettings field that real platform managers (twitch, kick,
// streamlabs, …) emit as a Number — see wire.types.ts. Emulation form inputs
// hand back numeric strings ("1"), which silently break downstream consumers
// that do arithmetic (SE compat shim's resolvedAmount, goal/cheer widgets,
// plugin SDK reducers). Run this before dispatch to match the live shape.
//
// `value` is intentionally NOT in this set — wire.types.ts uses `value: string`
// for most alerts (templated display string) and `value: number` only for a
// handful (bits, raid, kicks, hypetrain, ads). Coerce `value` at the form
// binding using inputField.type === 'number' instead, so the per-alert
// contract isn't violated.
const NUMERIC_ALERT_FIELDS: ReadonlySet<string> = new Set([
	'amount',
	'giftAmount',
	'totalGifts',
	'subMonths',
	'streakMonths',
	'cumulativeMonths',
	'streak',
	'months',
	'bits',
	'kicks',
	'viewers',
	'total',
	'previousTotal',
	'current_amount',
	'target_amount',
	'length',
	'streak_count',
	'channel_points_awarded',
	'reward_cost',
	'view_count',
	'clip_duration',
	'timeout_duration',
	'expiration_ms',
	'poll_duration',
	'level',
	'progress',
	'goal',
]);

export function aliasContentImageFromLegacy(values: Record<string, any>): void {
	if (!values) return;
	if (typeof values.contentImage === 'string' && values.contentImage !== '') return;
	for (const key of LEGACY_CONTENT_IMAGE_FIELDS) {
		const v = values[key];
		if (typeof v === 'string' && v !== '') {
			values.contentImage = v;
			return;
		}
	}
}

export function coerceNumericAlertFields(values: Record<string, any>): void {
	if (!values) return;
	for (const key of Object.keys(values)) {
		if (!NUMERIC_ALERT_FIELDS.has(key)) continue;
		const v = values[key];
		if (typeof v === 'string' && v !== '' && !isNaN(Number(v))) {
			values[key] = Number(v);
		}
	}
}
