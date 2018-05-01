'use strict';

const { RawSource } = require('webpack-sources');

class GenerateAppJsPlugin {
	constructor(bundleNames) {
		this.bundleNames = bundleNames;
	}

	apply(compiler) {
		compiler.hooks.emit.tap('GenerateAppJsPlugin', (compilation) => {
			compilation.assets['app.js'] = this.generateAppModule();
		});
	}

	generateAppModule() {
		const appSource = this.bundleNames.map(bundleName => `require('./${bundleName}');`).join('\n');
		return new RawSource(appSource);
	}
}

module.exports = GenerateAppJsPlugin;
