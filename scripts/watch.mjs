#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
// Only watch src/. The build's sync step writes back into
// docs/custom-overlays/custom-overlays.d.ts, which would cause a watch loop
// if docs/ were included. Doc-driven rebuilds need a manual `npm run build`.
const watchedDirs = [resolve(projectRoot, 'src')];
const debounceMs = 150;

let debounceTimer = null;
let running = null;
let pending = false;

function runBuild() {
	if (running) {
		pending = true;
		return;
	}
	const start = Date.now();
	process.stdout.write('\n[watch] rebuilding…\n');
	running = spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: false });
	running.on('exit', (code) => {
		const dur = ((Date.now() - start) / 1000).toFixed(1);
		process.stdout.write(
			code === 0
				? `[watch] build ok (${dur}s) — watching for changes\n`
				: `[watch] build failed (exit ${code}) — fix and save to retry\n`,
		);
		running = null;
		if (pending) {
			pending = false;
			runBuild();
		}
	});
}

function scheduleBuild() {
	if (debounceTimer) clearTimeout(debounceTimer);
	debounceTimer = setTimeout(runBuild, debounceMs);
}

for (const dir of watchedDirs) {
	try {
		watch(dir, { recursive: true }, () => scheduleBuild());
		process.stdout.write(`[watch] watching ${dir}\n`);
	} catch (err) {
		process.stderr.write(`[watch] cannot watch ${dir}: ${err.message}\n`);
	}
}

runBuild();
