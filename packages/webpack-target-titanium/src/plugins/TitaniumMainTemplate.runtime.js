'use strict';

/* global hotAddUpdateChunk, parentHotUpdateCallback, Ti, installedChunks, $require$ $hotChunkFilename$ $hotMainFilename$ */

module.exports = function () {
	// eslint-disable-next-line no-unused-vars
	function webpackHotUpdateCallback(chunkId, moreModules) {
		hotAddUpdateChunk(chunkId, moreModules);
		if (parentHotUpdateCallback) {
			parentHotUpdateCallback(chunkId, moreModules);
		}
	}// $semicolon

	// eslint-disable-next-line no-unused-vars
	function hotDownloadUpdateChunk(chunkId) {
		const url = $require$.p + $hotChunkFilename$;
		const client = Ti.Network.createHTTPClient({
			onload: function () {
				// eslint-disable-next-line no-eval
				var globalEval = eval;
				globalEval(this.responseText);
			},
			onerror: function (e) {
				Ti.API.debug(e.error);
			},
			timeout: 5000
		});
		client.open('GET', url);
		client.send();
	}

	// eslint-disable-next-line no-unused-vars
	function hotDownloadManifest() {
		return new Promise((resolve, reject) => {
			const url = $require$.p + $hotMainFilename$;
			const client = Ti.Network.createHTTPClient({
				onload: function () {
					try {
						var update = JSON.parse(this.responseText);
						resolve(update);
					} catch (ex) {
						reject(ex);
					}
				},
				onerror: function (e) {
					reject(e.error);
				},
				timeout: 5000
			});
			client.open('GET', url);
			client.send();
		});
	}

	// eslint-disable-next-line no-unused-vars
	function hotDisposeChunk(chunkId) {
		delete installedChunks[chunkId];
	}
};
