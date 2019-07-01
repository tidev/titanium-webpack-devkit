/* global installedChunks */
module.exports = function () {
	/**
	 * @todo Implement chunk loading from titanium-dev-server
	 * @param {string} chunkId Chunk id to download
	 */
	// eslint-disable-next-line no-unused-vars
	function hotDownloadUpdateChunk(chunkId) {
		// var chunk = require('./' + $hotChunkFilename$);
		// hotAddUpdateChunk(chunk.id, chunk.modules);
	}

	/**
	 * @todo Implement manifest download from titanium-dev-server
	 */
	// eslint-disable-next-line no-unused-vars
	function hotDownloadManifest() {
		return Promise.resolve();
	}

	// eslint-disable-next-line no-unused-vars
	function hotDisposeChunk(chunkId) {
		delete installedChunks[chunkId];
	}
};
