'use strict';

const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { VirtualWatchFileSystemDecorator } = require('@ngtools/webpack/src/virtual_file_system_decorator');

const { replaceBootstrap } = require('./transformers')
const PlatformAwareFileSystem = require('./PlatformAwareFileSystem');

/**
 * An extension of the AngularCompilerPlugin that decorates Angular's own
 * virtual file system to allow loading of platform specific files.
 */
class TitaniumAngularCompilerPlugin extends AngularCompilerPlugin {
	constructor(options) {
		if (options.skipCodeGeneration) {
			const platformTransforms = [];
			const getEntryModule = () => this.entryModule
			const getTypeChecker = () => this._getTsProgram().getTypeChecker()
			platformTransforms.push(replaceBootstrap(getEntryModule, getTypeChecker))
			options.platformTransforms = platformTransforms
		}

		super(options);

		this.targetPlatform = options.targetPlatform;
	}

	apply(compiler) {
		super.apply(compiler);

		compiler.hooks.environment.tap('titanium-angular-compiler', () => {
			const inputFileSystem = new PlatformAwareFileSystem(compiler.inputFileSystem, this.targetPlatform);
			compiler.inputFileSystem = inputFileSystem;
			compiler.watchFileSystem = new VirtualWatchFileSystemDecorator(
				inputFileSystem,
				compiler.watchFileSystem._replacements
			);
		});
	}
}

module.exports = TitaniumAngularCompilerPlugin;
