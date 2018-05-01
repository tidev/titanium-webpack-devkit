'use strict';

const { ConcatSource } = require('webpack-sources');

module.exports = class TitaniumChunkTemplatePlugin {
	apply(chunkTemplate) {
		chunkTemplate.hooks.render.tap(
			'TitaniumChunkTemplatePlugin',
			(modules, chunk) => {
				const source = new ConcatSource();
				source.add(
					`exports.ids = ${JSON.stringify(chunk.ids)};\nexports.modules = `
				);
				source.add(modules);
				source.add(';');
				return source;
			}
		);
		chunkTemplate.hooks.hash.tap('TitaniumChunkTemplatePlugin', hash => {
			hash.update('titanium');
			hash.update('1');
		});
	}
};
