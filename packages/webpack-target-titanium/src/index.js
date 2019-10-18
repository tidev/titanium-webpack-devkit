'use strict';

const GenerateAppJsPlugin = require('./plugins/GenerateAppJsPlugin');
const PlatformResolverPlugin = require('./plugins/PlatformResolverPlugin');
const titaniumTarget = require('./titanium-target');

module.exports = {
	GenerateAppJsPlugin,
	PlatformResolverPlugin,
	titaniumTarget
};
