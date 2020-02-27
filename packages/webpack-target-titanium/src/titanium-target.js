'use strict';

module.exports = function titaniumTarget(compiler) {
	const webpackLib = 'webpack/lib';

	const TitaniumTemplatePlugin = require('./plugins/TitaniumTemplatePlugin');
	/* eslint-disable security/detect-non-literal-require */
	const FunctionModulePlugin = require(webpackLib + '/FunctionModulePlugin');
	const NodeTargetPlugin = require(webpackLib + '/node/NodeTargetPlugin');
	const LoaderTargetPlugin = require(webpackLib + '/LoaderTargetPlugin');
	/* eslint-enable security/detect-non-literal-require */

	new TitaniumTemplatePlugin().apply(compiler);
	new FunctionModulePlugin().apply(compiler);
	new NodeTargetPlugin().apply(compiler);
	new LoaderTargetPlugin('node').apply(compiler);
};
