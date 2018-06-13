'use strict';

const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { PlatformAwareFileSystem } = require('webpack-titanium-target');

/**
 * An extension of the AngularCompilerPlugin that decorates Angular's own
 * virtual file system to allow loading of platform specific files.
 */
class TitaniumAngularCompilerPlugin extends AngularCompilerPlugin {
	constructor(options) {
		super(options);

		this.targetPlatform = options.targetPlatform;
	}

	apply(compiler) {
		super.apply(compiler);

		compiler.hooks.environment.tap('titanium-angular-compiler', () => {
			compiler.inputFileSystem = new PlatformAwareFileSystem(compiler.inputFileSystem, this.targetPlatform);
			// compiler.watchFileSystem = new VirtualWatchFileSystemDecorator(compiler.inputFileSystem);
		});
	}
}

module.exports = TitaniumAngularCompilerPlugin;
