#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

const projectRoot = resolve(process.cwd());
const docsDir = resolve(projectRoot, 'docs/custom-code');
const distDocsDir = resolve(projectRoot, 'dist/custom-code');
const allowedExtensions = new Set(['.md', '.d.ts', '.txt']);

function getExt(fileName) {
	const dotIndex = fileName.lastIndexOf('.');
	return dotIndex >= 0 ? fileName.slice(dotIndex) : '';
}

function shouldSkip(fileName) {
	if (fileName.startsWith('.')) return true;
	if (fileName === '_category_.json') return true;
	return false;
}

function copyDirectoryRecursive(sourceDir, targetDir) {
	const entries = readdirSync(sourceDir, { withFileTypes: true });

	for (const entry of entries) {
		if (shouldSkip(entry.name)) {
			continue;
		}

		const sourcePath = join(sourceDir, entry.name);
		const targetPath = join(targetDir, entry.name);

		if (entry.isDirectory()) {
			mkdirSync(targetPath, { recursive: true });
			copyDirectoryRecursive(sourcePath, targetPath);
			continue;
		}

		if (!allowedExtensions.has(getExt(entry.name))) {
			continue;
		}

		mkdirSync(dirname(targetPath), { recursive: true });
		copyFileSync(sourcePath, targetPath);
	}
}

function sync() {
	if (!existsSync(docsDir)) {
		throw new Error(`Could not find docs directory: ${docsDir}`);
	}

	mkdirSync(distDocsDir, { recursive: true });
	copyDirectoryRecursive(docsDir, distDocsDir);
	console.log('Custom code documentation synced to dist/.');
}

try {
	sync();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
