'use strict';

const PlatformAwareFileSystem = require('../PlatformAwareFileSystem');

module.exports = class PlatformAwareFileSystemPlugins {
	constructor(options) {
		this.platform = options.platform;
	}

	apply(compiler) {
		compiler.hooks.environment.tap('titanium-platform-fs', () => {
			compiler.inputFileSystem = new PlatformAwareFileSystem(compiler.inputFileSystem, this.platform);
		});
	}
};
