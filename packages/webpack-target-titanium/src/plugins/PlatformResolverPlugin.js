const path = require('path');

class PlatformResolverPlugin {
	constructor(source, platform, ignoreExtension, target) {
		this.source = source;
		this.target = target;
		this.ignoreExtension = ignoreExtension;
		this.platform = platform;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync('PlatformResolverPlugin', (request, resolveContext, callback) => {
				let platformPath;
				let relativePath;
				const ext = path.extname(request.path);
				if (!this.ignoreExtension && ext.length) {
					const platformSuffix = `.${this.platform}${ext}`;
					platformPath = request.path.slice(0, -ext.length) + platformSuffix;
					relativePath = request.relativePath && request.relativePath.slice(0, -ext.length) + platformSuffix;
				} else {
					platformPath = request.path + `.${this.platform}`;
					relativePath = request.relativePath && request.relativePath + `.${this.platform}`;
				}
				const platformRequest = {
					...request,
					path: platformPath,
					relativePath
				};
				resolver.doResolve(target, platformRequest, null, resolveContext, callback);
			});
	}
}

module.exports = PlatformResolverPlugin;
