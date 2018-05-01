const GenerateAppJsPlugin = require('./lib/plugins/GenerateAppJsPlugin');
const titaniumTarget = require('./lib/titanium-target');
const WatchStateNotifierPlugin = require('./lib/plugins/WatchStateNotifierPlugin');

module.exports = {
	GenerateAppJsPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
};
