'use strict';

const pathModule = require('path');

/**
 * A decorator around Webpack's input file system that allows the Angular's
 * AoT compiler to load platform specific files.
 */
class PlatformAwareFileSystem {
	constructor(inputFileSystem, targetPlatform) {
		this.inputFileSystem = inputFileSystem;
		this.targetPlatform = targetPlatform;
	}

	stat(path, callback) {
		this.usePlatformPathIfExists(this.inputFileSystem.stat, path, callback);
	}

	readdir(path, callback) {
		this.inputFileSystem.readdir(path, callback);
	}

	readFile(path, callback) {
		this.usePlatformPathIfExists(this.inputFileSystem.readFile, path, callback);
	}

	readJson(path, callback) {
		this.usePlatformPathIfExists(this.inputFileSystem.readJson, path, callback);
	}

	readlink(path, callback) {
		this.usePlatformPathIfExists(this.inputFileSystem.readlink, path, callback);
	}

	statSync(path) {
		return this.usePlatformPathIfExistsSync(this.inputFileSystem.statSync, path);
	}

	readdirSync(path) {
		return this.usePlatformPathIfExistsSync(this.inputFileSystem.readdirSync, path);
	}

	readFileSync(path) {
		return this.usePlatformPathIfExistsSync(this.inputFileSystem.readFileSync, path);
	}

	readJsonSync(path) {
		return this.usePlatformPathIfExistsSync(this.inputFileSystem.readJsonSync, path);
	}

	readlinkSync(path) {
		return this.usePlatformPathIfExistsSync(this.inputFileSystem.readlinkSync, path);
	}

	purge(changes) {
		return this.inputFileSystem.purge(changes);
	}

	usePlatformPathIfExists(vfsFunction, originalPath, callback) {
		let candidatePath = originalPath;
		const platformPath = this.resolvePlatformSpecificPath(originalPath);
		this.inputFileSystem.stat(platformPath, (err, stat) => {
			if (!err && stat.isFile()) {
				candidatePath = platformPath;
			}
			vfsFunction.call(this.inputFileSystem, candidatePath, callback);
		});
	}

	usePlatformPathIfExistsSync(vfsFunction, originalPath) {
		const platformPath = this.resolvePlatformSpecificPath(originalPath);
		const stats = this.inputFileSystem.statSync(platformPath);
		vfsFunction.call(this.inputFileSystem, stats && stats.isFile() ? platformPath : originalPath);
	}

	resolvePlatformSpecificPath(path) {
		const { dir, name, ext } = pathModule.parse(path);
		return pathModule.join(dir, `${name}.${this.targetPlatform}${ext}`);
	}
}

module.exports = PlatformAwareFileSystem;
