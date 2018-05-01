'use strict';

const TitaniumMainTemplatePlugin = require('./TitaniumMainTemplatePlugin');
const TitaniumChunkTemplatePlugin = require('./TitaniumChunkTemplatePlugin');
const TitaniumHotUpdateChunkTemplatePlugin = require('./TitaniumHotUpdateChunkTemplatePlugin');

class TitaniumTemplatePlugin {
	apply(compiler) {
		compiler.hooks.thisCompilation.tap('TitaniumTemplatePlugin', compilation => {
			new TitaniumMainTemplatePlugin().apply(compilation.mainTemplate);
			new TitaniumChunkTemplatePlugin().apply(compilation.chunkTemplate);
			new TitaniumHotUpdateChunkTemplatePlugin().apply(
				compilation.hotUpdateChunkTemplate
			);
		});
	}
}

module.exports = TitaniumTemplatePlugin;
