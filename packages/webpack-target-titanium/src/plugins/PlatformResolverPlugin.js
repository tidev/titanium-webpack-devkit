class PlatformResolverPlugin {
	constructor(source, platform, target) {
		this.source = source;
		this.target = target;
		this.platform = platform;
	}

	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync('PlatformResolverPlugin', (request, resolveContext, callback) => {
				const platformRequest = {
					...request,
					path: request.path + `.${this.platform}`,
					relativePath: request.relativePath && request.relativePath + `.${this.platform}`
				};
				resolver.doResolve(target, platformRequest, null, resolveContext, callback);
			});
	}
}

module.exports = PlatformResolverPlugin;
