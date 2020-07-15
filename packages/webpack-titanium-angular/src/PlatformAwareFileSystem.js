'use strict';

const pathModule = require('path');

/**
 * A decorator around Webpack's input file system that allows the Angular's
 * AoT compiler to load platform specific files.
 */
class PlatformAwareFileSystem {
	constructor(inputFileSystem, targetPlatform) {
		// underscored variable name is important for webpack-virtual-modules
		this._inputFileSystem = inputFileSystem;
		this.targetPlatform = targetPlatform;
	}

	getWebpackCompilerHost() {
		return this._inputFileSystem.getWebpackCompilerHost();
	}

	getVirtualFilesPaths() {
		return this._inputFileSystem.getVirtualFilesPaths();
	}

	stat(path, callback) {
		this.usePlatformPathIfExists(this._inputFileSystem.stat, path, callback);
	}

	readdir(path, callback) {
		this._inputFileSystem.readdir(path, callback);
	}

	readFile(path, callback) {
		this.usePlatformPathIfExists(this._inputFileSystem.readFile, path, callback);
	}

	readJson(path, callback) {
		this.usePlatformPathIfExists(this._inputFileSystem.readJson, path, callback);
	}

	readlink(path, callback) {
		this.usePlatformPathIfExists(this._inputFileSystem.readlink, path, callback);
	}

	statSync(path) {
		return this.usePlatformPathIfExistsSync(this._inputFileSystem.statSync, path);
	}

	readdirSync(path) {
		return this.usePlatformPathIfExistsSync(this._inputFileSystem.readdirSync, path);
	}

	readFileSync(path) {
		return this.usePlatformPathIfExistsSync(this._inputFileSystem.readFileSync, path);
	}

	readJsonSync(path) {
		return this.usePlatformPathIfExistsSync(this._inputFileSystem.readJsonSync, path);
	}

	readlinkSync(path) {
		return this.usePlatformPathIfExistsSync(this._inputFileSystem.readlinkSync, path);
	}

	purge(changes) {
		return this._inputFileSystem.purge(changes);
	}

	usePlatformPathIfExists(vfsFunction, originalPath, callback) {
		let candidatePath = originalPath;
		const platformPath = this.resolvePlatformSpecificPath(originalPath);
		this._inputFileSystem.stat(platformPath, (err, stat) => {
			if (!err && stat.isFile()) {
				candidatePath = platformPath;
			}
			vfsFunction.call(this._inputFileSystem, candidatePath, callback);
		});
	}

	usePlatformPathIfExistsSync(vfsFunction, originalPath) {
		const platformPath = this.resolvePlatformSpecificPath(originalPath);
		const stats = this._inputFileSystem.statSync(platformPath);
		vfsFunction.call(this._inputFileSystem, stats && stats.isFile() ? platformPath : originalPath);
	}

	resolvePlatformSpecificPath(path) {
		const { dir, name, ext } = pathModule.parse(path);
		return pathModule.join(dir, `${name}.${this.targetPlatform}${ext}`);
	}
}

module.exports = PlatformAwareFileSystem;
