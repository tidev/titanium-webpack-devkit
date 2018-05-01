'use strict';

const { ConcatSource } = require('webpack-sources');

module.exports = class TitaniumHotUpdateChunkTemplatePlugin {
	apply(hotUpdateChunkTemplate) {
		hotUpdateChunkTemplate.hooks.render.tap(
			'TitaniumHotUpdateChunkTemplatePlugin',
			(modulesSource, modules, removedModules, hash, id) => {
				const source = new ConcatSource();
				source.add(
					'exports.id = ' + JSON.stringify(id) + ';\nexports.modules = '
				);
				source.add(modulesSource);
				source.add(';');
				return source;
			}
		);
		hotUpdateChunkTemplate.hooks.hash.tap(
			'TitaniumHotUpdateChunkTemplatePlugin',
			hash => {
				hash.update('TitaniumHotUpdateChunkTemplatePlugin');
				hash.update('1');
				hash.update(
					hotUpdateChunkTemplate.outputOptions.hotUpdateFunction + ''
				);
				hash.update(hotUpdateChunkTemplate.outputOptions.library + '');
			}
		);
	}
};
