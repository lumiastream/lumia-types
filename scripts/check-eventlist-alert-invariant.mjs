#!/usr/bin/env node
/**
 * Pre-publish guard: verify that every `LumiaAlertValues` member lives in
 * EXACTLY ONE of the two eventlist filter lists in `eventlist.types.ts`:
 *
 *   - `LumiaMapAlertTypeToEventListType` → mapped → renders in eventlist +
 *     appears in the picker.
 *   - `AlertsToFilter` → hidden → never renders, never in picker.
 *
 * Never both (would put the picker out of sync with the renderer), never
 * neither (would silently drop the alert and produce data leaks like the
 * "Throne purchases in subscribers feed" bug that this invariant exists to
 * prevent).
 *
 * Runs from `npm test` and as part of `npm run prepublishOnly` so a broken
 * package can't reach the registry. Reads from the built `dist/` (so the
 * check exercises the actual published artifact, not the source) — must run
 * AFTER `npm run build`.
 */
import { LumiaAlertValues, LumiaMapAlertTypeToEventListType, AlertsToFilter } from '../dist/esm/index.js';

const allAlerts = Object.values(LumiaAlertValues);
const mapped = new Set(Object.keys(LumiaMapAlertTypeToEventListType));
const filtered = new Set(AlertsToFilter);

const inBoth = allAlerts.filter((a) => mapped.has(a) && filtered.has(a));
const inNeither = allAlerts.filter((a) => !mapped.has(a) && !filtered.has(a));

const fail = (reason, members) => {
	console.error(`✗ Eventlist alert invariant violated: ${reason}`);
	console.error(`  ${members.length} offending alert${members.length === 1 ? '' : 's'}:`);
	for (const m of members) console.error(`    - ${m}`);
	console.error('');
	console.error('  Every LumiaAlertValues entry must appear in exactly one of:');
	console.error('    - LumiaMapAlertTypeToEventListType (visible in eventlist + picker)');
	console.error('    - AlertsToFilter (hidden from eventlist + picker)');
	console.error('');
	console.error('  Edit lumia-types/src/eventlist.types.ts to fix.');
	process.exit(1);
};

if (inBoth.length) fail('alerts present in BOTH lists', inBoth);
if (inNeither.length) fail('alerts present in NEITHER list', inNeither);

console.log(`✓ Eventlist alert invariant holds (${mapped.size} mapped + ${filtered.size} filtered = ${allAlerts.length} total).`);
