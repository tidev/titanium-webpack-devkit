/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
'use strict';

const Template = require('webpack/lib/Template');

module.exports = class TitaniumMainTemplatePlugin {
	apply(mainTemplate) {
		const needChunkOnDemandLoadingCode = chunk => {
			for (const chunkGroup of chunk.groupsIterable) {
				if (chunkGroup.getNumberOfChildren() > 0) {
					return true;
				}
			}
			return false;
		};
		mainTemplate.hooks.localVars.tap(
			'TitaniumMainTemplatePlugin',
			(source, chunk) => {
				if (!needChunkOnDemandLoadingCode(chunk)) {
					return source;
				}

				return Template.asString([
					source,
					'',
					'// object to store loaded chunks',
					'// "0" means "already loaded"',
					'var installedChunks = {',
					Template.indent(
						chunk.ids.map(id => `${JSON.stringify(id)}: 0`).join(',\n')
					),
					'};'
				]);
			}
		);
		mainTemplate.hooks.requireExtensions.tap(
			'TitaniumMainTemplatePlugin',
			(source, chunk) => {
				if (!needChunkOnDemandLoadingCode(chunk)) {
					return source;
				}

				return Template.asString([
					source,
					'',
					'// uncaught error handler for webpack runtime',
					`${mainTemplate.requireFn}.oe = function(err) {`,
					Template.indent(
						'throw err; // catch this error by using import().catch()'
					),
					'};'
				]);
			}
		);
		mainTemplate.hooks.requireEnsure.tap(
			'TitaniumMainTemplatePlugin',
			(source, chunk, hash) => {
				const chunkFilename = mainTemplate.outputOptions.chunkFilename;
				const chunkMaps = chunk.getChunkMaps();
				const insertMoreModules = [
					'var moreModules = chunk.modules, chunkIds = chunk.ids;',
					'for(var moduleId in moreModules) {',
					Template.indent(
						mainTemplate.renderAddModule(
							hash,
							chunk,
							'moduleId',
							'moreModules[moduleId]'
						)
					),
					'}'
				];

				const request = mainTemplate.getAssetPath(
					JSON.stringify(`./${chunkFilename}`),
					{
						hash: `' + ${mainTemplate.renderCurrentHashCode(hash)} + '`,
						hashWithLength: length =>
							`' + ${mainTemplate.renderCurrentHashCode(hash, length)} + '`,
						chunk: {
							id: '" + chunkId + "',
							hash: `' + ${JSON.stringify(chunkMaps.hash)}[chunkId] + '`,
							hashWithLength: length => {
								const shortChunkHashMap = {};
								for (const chunkId of Object.keys(chunkMaps.hash)) {
									if (typeof chunkMaps.hash[chunkId] === 'string') {
										shortChunkHashMap[chunkId] = chunkMaps.hash[
											chunkId
										].substr(0, length);
									}
								}
								return `' + ${JSON.stringify(
									shortChunkHashMap
								)}[chunkId] + '`;
							},
							contentHash: {
								javascript: `' + ${JSON.stringify(
									chunkMaps.contentHash.javascript
								)}[chunkId] + '`
							},
							contentHashWithLength: {
								javascript: length => {
									const shortContentHashMap = {};
									const contentHash = chunkMaps.contentHash.javascript;
									for (const chunkId of Object.keys(contentHash)) {
										if (typeof contentHash[chunkId] === 'string') {
											shortContentHashMap[chunkId] = contentHash[
												chunkId
											].substr(0, length);
										}
									}
									return `' + ${JSON.stringify(
										shortContentHashMap
									)}[chunkId] + '`;
								}
							},
							name: `' + (${JSON.stringify(
								chunkMaps.name
							)}[chunkId]||chunkId) + '`
						},
						contentHashType: 'javascript'
					}
				);
				return Template.asString([
					source,
					'',
					'// require() chunk loading for javascript',
					'',
					'// "0" is the signal for "already loaded"',
					'if(installedChunks[chunkId] !== 0) {',
					Template.indent(
						[ `var chunk = require(${request});` ]
							.concat(insertMoreModules)
							.concat([
								'for(var i = 0; i < chunkIds.length; i++)',
								Template.indent('installedChunks[chunkIds[i]] = 0;')
							])
					),
					'}'
				]);
			}
		);
		mainTemplate.hooks.hotBootstrap.tap(
			'TitaniumMainTemplatePlugin',
			(source, chunk, hash) => {
				const hotUpdateChunkFilename = mainTemplate.outputOptions.hotUpdateChunkFilename;
				const hotUpdateMainFilename = mainTemplate.outputOptions.hotUpdateMainFilename;
				const chunkMaps = chunk.getChunkMaps();
				const currentHotUpdateChunkFilename = mainTemplate.getAssetPath(
					JSON.stringify(hotUpdateChunkFilename),
					{
						hash: `' + ${mainTemplate.renderCurrentHashCode(hash)} + '`,
						hashWithLength: length =>
							`' + ${mainTemplate.renderCurrentHashCode(hash, length)} + '`,
						chunk: {
							id: '" + chunkId + "',
							hash: `' + ${JSON.stringify(chunkMaps.hash)}[chunkId] + '`,
							hashWithLength: length => {
								const shortChunkHashMap = {};
								for (const chunkId of Object.keys(chunkMaps.hash)) {
									if (typeof chunkMaps.hash[chunkId] === 'string') {
										shortChunkHashMap[chunkId] = chunkMaps.hash[chunkId].substr(
											0,
											length
										);
									}
								}
								return `' + ${JSON.stringify(shortChunkHashMap)}[chunkId] + '`;
							},
							name: `' + (${JSON.stringify(
								chunkMaps.name
							)}[chunkId]||chunkId) + '`
						}
					}
				);
				const currentHotUpdateMainFilename = mainTemplate.getAssetPath(
					JSON.stringify(hotUpdateMainFilename),
					{
						hash: `' + ${mainTemplate.renderCurrentHashCode(hash)} + '`,
						hashWithLength: length =>
							`' + ${mainTemplate.renderCurrentHashCode(hash, length)} + '`
					}
				);
				return Template.getFunctionContent(require('./TitaniumMainTemplate.runtime.js'))
					.replace(/\$require\$/g, mainTemplate.requireFn)
					.replace(/\$hotMainFilename\$/g, currentHotUpdateMainFilename)
					.replace(/\$hotChunkFilename\$/g, currentHotUpdateChunkFilename);
			}
		);
		mainTemplate.hooks.hash.tap('TitaniumMainTemplatePlugin', hash => {
			hash.update('titanium');
			hash.update('1');
			hash.update(mainTemplate.outputOptions.filename + '');
			hash.update(mainTemplate.outputOptions.chunkFilename + '');
		});
	}
};
