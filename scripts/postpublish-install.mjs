#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';

const dependents = ['../LumiaStream', '../Web-Lumia', '../Overlay-UI', '../Server-Lumia', '../Developer-Docs', '../LumiaStreamLink', '../lumia-libs'];

// lumia-libs is an npm-workspaces monorepo, so the install has to name each consuming package.
const workspaces = {
	'../lumia-libs': ['packages/ui', 'packages/chat-clients'],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, '..');

const pkg = JSON.parse(fs.readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
const installTarget = `${pkg.name}@${pkg.version}`;

const allowMissing = process.argv.includes('--allow-missing') || process.env.LUMIA_TYPES_ALLOW_MISSING === '1';

let hadError = false;
const skipped = [];

const postInstallHooks = {
	'../Developer-Docs': ['generate:alerts'],
};

for (const repo of dependents) {
	if (!fs.existsSync(repo)) {
		skipped.push(repo);
		continue;
	}

	const workspaceArgs = (workspaces[repo] ?? []).map((workspace) => `-w ${workspace}`).join(' ');

	try {
		console.log(`Installing ${installTarget} in ${repo}`);
		execSync(`npm install --save-exact --prefer-online --no-audit --no-fund ${workspaceArgs} ${installTarget}`.replace(/\s+/g, ' '), {
			cwd: repo,
			stdio: 'inherit',
		});
	} catch (error) {
		hadError = true;
		console.error(`Failed to install in ${repo}: ${error.message}`);
		continue;
	}

	for (const script of postInstallHooks[repo] ?? []) {
		try {
			console.log(`Running 'npm run ${script}' in ${repo}`);
			execSync(`npm run ${script}`, { cwd: repo, stdio: 'inherit' });
		} catch (error) {
			hadError = true;
			console.error(`Failed to run '${script}' in ${repo}: ${error.message}`);
		}
	}
}

if (skipped.length) {
	console.error(`\n${skipped.length} of ${dependents.length} dependents were not found, so they did NOT receive ${installTarget}:`);
	for (const repo of skipped) {
		console.error(`  - ${repo}`);
	}

	if (allowMissing) {
		console.error('Continuing anyway (--allow-missing).');
	} else {
		// A silently-skipped dependent keeps installing an old version for months; treat it as a failure.
		console.error('Clone them beside this repo, remove them from `dependents`, or re-run with --allow-missing.');
		hadError = true;
	}
}

if (hadError) {
	process.exitCode = 1;
}
