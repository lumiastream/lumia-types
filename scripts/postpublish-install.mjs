#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';

const dependents = ['../LumiaStream', '../Web-Lumia', '../Overlay-UI', '../Server-Lumia', '../Developer-Docs', '../LumiaStreamLink'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, '..');

const pkg = JSON.parse(fs.readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
const installTarget = `${pkg.name}@${pkg.version}`;

let hadError = false;

for (const repo of dependents) {
	if (!fs.existsSync(repo)) {
		console.log(`Skipping missing repo: ${repo}`);
		continue;
	}

	try {
		console.log(`Installing ${installTarget} in ${repo}`);
		execSync(`npm install --save-exact ${installTarget}`, {
			cwd: repo,
			stdio: 'inherit',
		});
	} catch (error) {
		hadError = true;
		console.error(`Failed to install in ${repo}: ${error.message}`);
	}
}

if (hadError) {
	process.exitCode = 1;
}
