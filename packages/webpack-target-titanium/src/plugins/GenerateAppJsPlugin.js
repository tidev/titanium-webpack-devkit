'use strict';

const { RawSource } = require('webpack-sources');

class GenerateAppJsPlugin {
	constructor(bundleNames) {
		this.bundleNames = bundleNames;
		this.asset = this.generateAppModule();
		this.filename = 'app.js';
	}

	apply(compiler) {
		compiler.hooks.compilation.tap('GenerateAppJsPlugin', (compilation) => {
			compilation.hooks.additionalAssets.tap('GenerateAppJsPlugin', () => {
				if (typeof compilation.emitAsset === 'function') {
					compilation.emitAsset(this.filename, this.asset);
				} else {
					compilation.assets[this.filename] = this.asset;
				}
			});
		});
	}

	generateAppModule() {
		const appSource = this.bundleNames.map(bundleName => `require('./${bundleName}');`).join('\n');
		return new RawSource(appSource);
	}
}

module.exports = GenerateAppJsPlugin;
