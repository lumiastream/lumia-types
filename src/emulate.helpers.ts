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
