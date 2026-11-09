import { ENTRANCE_DURATIONS, ENTRANCE_DURATION_DAYS } from './extension.constants';
import type { EntranceAccess, EntranceAccessOptions, EntranceDuration, EntrancePurchase, ExtensionEntranceRequest } from './extension.types';

type EntranceLike = Pick<ExtensionEntranceRequest, 'status' | 'expires_at'> & { duration?: EntranceDuration; command_id?: string };

const durationRank = (duration: EntranceDuration): number => ENTRANCE_DURATIONS.indexOf(duration);

export const isEntranceExpired = (entry: Pick<ExtensionEntranceRequest, 'expires_at'>, now = Date.now()): boolean =>
	Boolean(entry.expires_at) && !(new Date(entry.expires_at as string).getTime() > now);

// Pending or approved, and not past its expiry: the entry still blocks requesting the same item again.
export const isEntranceOpen = (entry: EntranceLike, now = Date.now()): boolean => entry.status !== 'denied' && !isEntranceExpired(entry, now);

// Approved and not past its expiry: the entry currently grants entrance access.
export const isEntranceActive = (entry: EntranceLike, now = Date.now()): boolean => entry.status === 'created' && !isEntranceExpired(entry, now);

export const findOpenEntranceForCommand = <T extends EntranceLike>(entries: T[], commandId: string, now = Date.now()): T | undefined =>
	entries.find((entry) => entry.command_id === commandId && isEntranceOpen(entry, now));

// The viewer's current access is the longest active duration; its expiry is the latest expiry at that duration.
export function activeEntranceAccess(entries: EntranceLike[], now = Date.now()): EntranceAccess | null {
	const active = entries.filter((entry) => isEntranceActive(entry, now));
	if (!active.length) return null;
	const highest = active.reduce((best, entry) => (durationRank(entry.duration ?? 'unlimited') > durationRank(best.duration ?? 'unlimited') ? entry : best));
	const duration = highest.duration ?? 'unlimited';
	const expiresAt =
		duration === 'unlimited'
			? null
			: (active
					.filter((entry) => entry.duration === duration)
					.map((entry) => entry.expires_at as string)
					.sort()
					.slice(-1)[0] ?? null);
	return { duration, expiresAt };
}

// Without access every enabled duration is a new purchase; with access, an item can be added at the cheapest price or access can be upgraded.
export function entrancePurchaseChoices(options: EntranceAccessOptions, entries: EntranceLike[], now = Date.now()): EntrancePurchase[] {
	const enabled = ENTRANCE_DURATIONS.filter((duration) => options[duration].enabled);
	if (!enabled.length) return [];
	const access = activeEntranceAccess(entries, now);
	if (!access) return enabled.map((duration) => ({ duration, bits: options[duration].bits, kind: 'new' }));
	return [
		{ duration: access.duration, bits: options[enabled[0]].bits, kind: 'add' },
		...enabled
			.filter((duration) => durationRank(duration) > durationRank(access.duration))
			.map((duration): EntrancePurchase => ({ duration, bits: options[duration].bits, kind: 'upgrade' })),
	];
}

export function entranceExpiry(duration: EntranceDuration, activatedAt: Date): string | null {
	const days = ENTRANCE_DURATION_DAYS[duration];
	return days ? new Date(activatedAt.getTime() + days * 86_400_000).toISOString() : null;
}
