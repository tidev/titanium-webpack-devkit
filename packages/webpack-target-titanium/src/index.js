'use strict';

const GenerateAppJsPlugin = require('./plugins/GenerateAppJsPlugin');
const PlatformAwareFileSystem = require('./PlatformAwareFileSystem');
const PlatformAwareFileSystemPlugin = require('./plugins/PlatformAwareFileSystemPlugin');
const titaniumTarget = require('./titanium-target');
const WatchStateNotifierPlugin = require('./plugins/WatchStateNotifierPlugin');

module.exports = {
	GenerateAppJsPlugin,
	PlatformAwareFileSystem,
	PlatformAwareFileSystemPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
};
