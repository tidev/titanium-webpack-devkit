'use strict';

const GenerateAppJsPlugin = require('./plugins/GenerateAppJsPlugin');
const PlatformResolverPlugin = require('./plugins/PlatformResolverPlugin');
const titaniumTarget = require('./titanium-target');
const TitaniumExternalsPlugins = require('./plugins/TitaniumExternalsPlugin');

module.exports = {
	GenerateAppJsPlugin,
	PlatformResolverPlugin,
	titaniumTarget,
	TitaniumExternalsPlugins
};
