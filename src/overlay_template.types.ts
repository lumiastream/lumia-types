export type OverlayTemplateAnchor =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'middle-left'
	| 'middle-center'
	| 'middle-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

export type OverlayTemplateLayerOverrides = {
	content?: Record<string, any>;
	css?: Record<string, any>;
};

export type OverlayTemplateLayerDescriptor = {
	type: string;
	anchor: OverlayTemplateAnchor;
	margin: number;
	width: number;
	height: number;
	overrides?: OverlayTemplateLayerOverrides;
};

export type OverlayTemplate = {
	id: string;
	name: string;
	description: string;
	thumbnail_url: string | null;
	canvas: {
		width: number;
		height: number;
	};
	layers: OverlayTemplateLayerDescriptor[];
};

export const BLANK_OVERLAY_TEMPLATE_ID = 'blank';
