import { LumiaStreamingSites } from './activity.types';

// ---------------------------------------------------------------------------
// Song Request — shared types for the native LumiaStream song-request system.
//
// Used by:
//   - LumiaStream renderer (queue manager, system chatbot command, Lumia
//     action handler, dashboard page + widgets)
//   - Overlay-UI `songrequest` module (now-playing card + queue list + skip/
//     pause UI; consumes SongRequestQueueUpdatePayload via SSE)
//   - Lumia-UI `se-import` (`mapMediaShare` translates SE's
//     `se-widget-media-share` widget into a Lumia `songrequest` module)
//
// Architecture summary (so this file's shape is legible standalone):
//   1. Viewers submit via `!sr <youtube-url|spotify-url|free text>` chat
//      command. Streamer / mods can also add via the dashboard UI or via the
//      ADD_SONG_REQUEST Lumia action.
//   2. Submission lands in `pending` for moderator approval (default) or
//      jumps directly to `queue` when `forceApprove: true` (streamer / mod
//      additions) or when `config.approvalRequired: false`.
//   3. Approved items get a `playbackTarget` chosen at queue time:
//        - `OVERLAY` (default): hidden YT iframe inside the songrequest
//          overlay module
//        - `SPOTIFY`: routed to streamer's Spotify Premium queue via
//          spotify.manager.SearchAndAddToQueue (already implemented)
//        - `YOUTUBE_MUSIC`: routed to streamer's YT Music queue (handler
//          to be added in Phase E)
//   4. Items move queue → nowPlaying → history (capped) as they play out.
// ---------------------------------------------------------------------------

/** Lifecycle of a single song request. */
export enum SongRequestStatus {
	/** Awaiting moderator approval (only used when `config.approvalRequired`). */
	PENDING = 'pending',
	/** Approved, waiting in the queue. */
	QUEUED = 'queued',
	/** Currently playing. */
	PLAYING = 'playing',
	/** Finished playing naturally. */
	COMPLETED = 'completed',
	/** Rejected by streamer / mod before playing. */
	DENIED = 'denied',
	/** Ended early (skip button or skip command). */
	SKIPPED = 'skipped',
}

/** Where a request entered the system. Used for analytics + permission checks. */
export enum SongRequestSource {
	/** Triggered by the `!sr` system chatbot command. */
	CHAT_COMMAND = 'chat',
	/** Triggered by the ADD_SONG_REQUEST Lumia action (decks, automations, …). */
	LUMIA_ACTION = 'action',
	/** Streamer added directly from the dashboard. */
	STREAMER = 'streamer',
	/** Mod added directly from the modtool window. */
	MOD = 'mod',
}

/** Format of the user's submission, before resolution. */
export enum SongRequestProvider {
	/** YouTube watch URL or short URL. */
	YOUTUBE = 'youtube',
	/** Spotify track URL — may be routed to Spotify queue or converted to YouTube. */
	SPOTIFY = 'spotify',
	/** YouTube Music URL (less common; usually treated like YouTube). */
	YOUTUBE_MUSIC = 'youtubeMusic',
	/** Free-text query that needs a search before it can play. */
	TEXT = 'text',
}

/** Where the resolved song actually plays once approved. */
export enum SongRequestPlaybackTarget {
	/** Hidden YT iframe inside the songrequest overlay module (default). */
	OVERLAY = 'overlay',
	/** Streamer's Spotify Premium player via Spotify Web API queue. */
	SPOTIFY = 'spotify',
	/** Streamer's YouTube Music player via YT Music queue. */
	YOUTUBE_MUSIC = 'youtubeMusic',
	VLC = 'vlc',
}

/** A single request item — one row in the queue / pending tray / history. */
export interface SongRequestItem {
	id: string;
	status: SongRequestStatus;
	source: SongRequestSource;
	provider: SongRequestProvider;
	/** Raw user input — the URL or text query they submitted. */
	query: string;

	// Resolved metadata (filled in async after parse + lookup; all optional so
	// items can enter the queue immediately and get enriched as data arrives).
	resolvedUrl?: string;
	/** YouTube video ID (resolved for both YOUTUBE and TEXT providers). */
	videoId?: string;
	/** Spotify track ID, when applicable. */
	spotifyTrackId?: string;
	title?: string;
	artist?: string;
	thumbnailUrl?: string;
	durationSeconds?: number;

	// Submission context — who asked, where from.
	requesterUsername: string;
	requesterPlatform?: LumiaStreamingSites;
	requesterAvatar?: string;

	// Moderation audit trail. Set when a mod or the streamer acts on the item.
	approvedBy?: string;
	approvedAt?: number;
	deniedBy?: string;
	deniedReason?: string;

	/** Chosen at queue-entry time based on connected services + config. */
	playbackTarget?: SongRequestPlaybackTarget;

	// Timestamps (epoch ms).
	createdAt: number;
	startedAt?: number;
	endedAt?: number;

	// Tip-gating fields — populated when a request was bound to a tip event
	// (Phase 5). Always optional; consumers ignore when absent.
	tipAmount?: number;
	tipCurrency?: string;
}

/**
 * User-configurable settings for the song-request system. Lives in user
 * settings (not in runtime state). Role gating for the `!sr` command piggybacks
 * on the system command's own `userLevels` field — we deliberately do NOT
 * duplicate it here.
 */
export interface SongRequestConfig {
	enabled: boolean;
	/** Trigger word for the system chatbot command. Default: `!sr`. */
	triggerCommand: string;

	// Throttling.
	cooldownPerUserSeconds: number;
	cooldownGlobalSeconds: number;
	maxRequestsPerUserInSession: number;

	// Moderation.
	/** When true, requests land in `pending` until a mod / streamer approves. */
	approvalRequired: boolean;

	// Queue limits.
	maxQueueSize: number;
	maxSongDurationSeconds: number;

	// Sources accepted from chat.
	allowYouTubeUrls: boolean;
	allowSpotifyUrls: boolean;
	allowFreeTextSearch: boolean;
	/** Required for free-text → YouTube Data API v3 search. */
	youtubeApiKey?: string;

	preferredPlaybackTarget: SongRequestPlaybackTarget;

	// Chat UX templates. Variables: {title} {artist} {username} {duration}.
	announceInChat: boolean;
	chatTemplateAdded: string;
	chatTemplateNowPlaying: string;
	chatTemplateDenied: string;
	/** Used for dedup / cooldown / queue-full / disallowed-source rejections. */
	chatTemplateRejected: string;
}

/** Runtime queue state. Lives in the LumiaStream Redux slice; the dashboard
 *  widgets and the overlay module consume slices of this shape. */
export interface SongRequestState {
	/** Awaiting moderator approval (empty when `approvalRequired: false`). */
	pending: SongRequestItem[];
	/** Approved, waiting to play. Index 0 plays next. */
	queue: SongRequestItem[];
	/** Currently playing item, if any. */
	nowPlaying: SongRequestItem | null;
	/** Recently completed / skipped / denied items, newest first. Capped. */
	history: SongRequestItem[];
}

// ---------------------------------------------------------------------------
// Event payloads — broadcast from LumiaStream to the overlay module via the
// existing SSE channel. Keep payloads small; the overlay maintains its own
// derived view from these.
// ---------------------------------------------------------------------------

/** Fired whenever the active queue or now-playing changes. */
export interface SongRequestQueueUpdatePayload {
	queue: SongRequestItem[];
	nowPlaying: SongRequestItem | null;
}

/** Fired whenever the pending tray changes (drives the moderation widget). */
export interface SongRequestPendingUpdatePayload {
	pending: SongRequestItem[];
}

/** Lighter-weight ping when only nowPlaying changed (e.g., natural advance). */
export interface SongRequestNowPlayingPayload {
	nowPlaying: SongRequestItem | null;
}

// ---------------------------------------------------------------------------
// Parameters for the new ADD_SONG_REQUEST Lumia action and the SONG_REQUEST
// system chatbot command. Both share the same input shape so a single handler
// can serve both call sites.
// ---------------------------------------------------------------------------

export interface SongRequestAddParams {
	/** Raw input — URL or free text. The parser resolves it. */
	query: string;
	requesterUsername?: string;
	requesterPlatform?: LumiaStreamingSites;
	/** Defaults to `LUMIA_ACTION` when omitted (matches the action call site). */
	source?: SongRequestSource;
	/**
	 * Streamer / mod additions can skip the pending state. Chat-command
	 * additions ignore this flag — chat is always subject to `approvalRequired`.
	 */
	forceApprove?: boolean;
}

export interface SongRequestModerationParams {
	id: string;
	/** Optional reason for deny actions (surfaced in chat / mod log). */
	reason?: string;
}
