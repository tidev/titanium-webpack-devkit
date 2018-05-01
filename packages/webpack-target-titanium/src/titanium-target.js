'use strict';

module.exports = function titaniumTarget(compiler) {
	var options = this;
	var webpackLib = 'webpack/lib';

	var TitaniumTemplatePlugin = require('./plugins/TitaniumTemplatePlugin');
	/* eslint-disable security/detect-non-literal-require */
	var FunctionModulePlugin = require(webpackLib + '/FunctionModulePlugin');
	var NodeSourcePlugin = require(webpackLib + '/node/NodeSourcePlugin');
	var LoaderTargetPlugin = require(webpackLib + '/LoaderTargetPlugin');
	/* eslint-enable security/detect-non-literal-require */

	compiler.apply(
		new TitaniumTemplatePlugin(options.output),
		new FunctionModulePlugin(options.output),
		new NodeSourcePlugin(options.node),
		new LoaderTargetPlugin('web')
	);
};
