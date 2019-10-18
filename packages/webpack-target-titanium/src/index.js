'use strict';

const GenerateAppJsPlugin = require('./plugins/GenerateAppJsPlugin');
const PlatformResolverPlugin = require('./plugins/PlatformResolverPlugin');
const titaniumTarget = require('./titanium-target');
const WatchStateNotifierPlugin = require('./plugins/WatchStateNotifierPlugin');

module.exports = {
	GenerateAppJsPlugin,
	PlatformResolverPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
};
