#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const distDir = resolve(projectRoot, 'dist');
const esmDir = resolve(distDir, 'esm');
const customOverlayTypesPath = resolve(distDir, 'custom-overlays.d.ts');

function walkFiles(directory) {
	const entries = readdirSync(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkFiles(path));
			continue;
		}
		files.push(path);
	}

	return files;
}

function hasKnownExtension(specifier) {
	const extension = extname(specifier);
	return ['.cjs', '.js', '.json', '.mjs', '.node'].includes(extension);
}

function addJsExtension(specifier) {
	if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
		return specifier;
	}
	if (hasKnownExtension(specifier)) {
		return specifier;
	}
	return `${specifier}.js`;
}

function rewriteRelativeSpecifiers(filePath) {
	const source = readFileSync(filePath, 'utf8');
	const rewritten = source
		.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (_match, prefix, specifier, suffix) => `${prefix}${addJsExtension(specifier)}${suffix}`)
		.replace(/(import\s*\(\s*['"])(\.{1,2}\/[^'"]+)(['"]\s*\))/g, (_match, prefix, specifier, suffix) => `${prefix}${addJsExtension(specifier)}${suffix}`);

	if (rewritten !== source) {
		writeFileSync(filePath, rewritten, 'utf8');
	}
}

function parseEnumMembers(enumBody) {
	const members = [];
	const memberPattern = /^\s*([A-Za-z_$][\w$]*)\s*=\s*(['"])(.*?)\2\s*,?/gm;
	let match;

	while ((match = memberPattern.exec(enumBody))) {
		members.push([match[1], match[3]]);
	}

	return members;
}

function readEnum(typesContent, enumName) {
	const enumPattern = new RegExp(`export\\s+enum\\s+${enumName}\\s*{([\\s\\S]*?)\\n}`, 'm');
	const match = enumPattern.exec(typesContent);
	if (!match) {
		throw new Error(`Could not find enum ${enumName} in ${customOverlayTypesPath}`);
	}

	const members = parseEnumMembers(match[1]);
	if (members.length === 0) {
		throw new Error(`Could not read members for enum ${enumName}`);
	}

	return members;
}

function objectLiteral(members) {
	return `{\n${members.map(([name, value]) => `\t${name}: ${JSON.stringify(value)},`).join('\n')}\n}`;
}

function writeCustomOverlayRuntime() {
	if (!existsSync(customOverlayTypesPath)) {
		throw new Error(`Could not find ${customOverlayTypesPath}`);
	}

	const typesContent = readFileSync(customOverlayTypesPath, 'utf8');
	const customTabs = readEnum(typesContent, 'CustomTabs');
	const configsFieldType = readEnum(typesContent, 'ConfigsFieldType');

	const esmOutput = [
		`export const CustomTabs = ${objectLiteral(customTabs)};`,
		`export const ConfigsFieldType = ${objectLiteral(configsFieldType)};`,
		'',
	].join('\n\n');
	writeFileSync(resolve(esmDir, 'custom-overlays.d.js'), esmOutput, 'utf8');

	const cjsOutput = [
		'"use strict";',
		'Object.defineProperty(exports, "__esModule", { value: true });',
		'exports.ConfigsFieldType = exports.CustomTabs = void 0;',
		`exports.CustomTabs = ${objectLiteral(customTabs)};`,
		`exports.ConfigsFieldType = ${objectLiteral(configsFieldType)};`,
		'',
	].join('\n');
	writeFileSync(resolve(distDir, 'custom-overlays.d.js'), cjsOutput, 'utf8');
}

if (!existsSync(esmDir)) {
	throw new Error(`Could not find ESM output directory: ${esmDir}`);
}

for (const filePath of walkFiles(esmDir)) {
	if (filePath.endsWith('.js')) {
		rewriteRelativeSpecifiers(filePath);
	}
}

writeFileSync(resolve(esmDir, 'package.json'), `${JSON.stringify({ type: 'module' }, null, 2)}\n`, 'utf8');
writeCustomOverlayRuntime();

console.log('ESM build finalized.');
