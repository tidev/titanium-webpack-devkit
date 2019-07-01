'use strict';

const MESSAGE_CHANGE_DETECTED = 'change-detected';
const MESSAGE_COMPILATION_COMPLETE = 'compilation-complete';

/**
 * Plugin for IPC communication with appcd.
 *
 * Sends an IPC message if webpack detects changes in watch mode and once
 * it has emitted all bundles.
 */
class WatchStateNotifierPlugin {
	static get MESSAGE_CHANGE_DETECTED() {
		return MESSAGE_CHANGE_DETECTED;
	}

	static get MESSAGE_COMPILATION_COMPLETE() {
		return MESSAGE_COMPILATION_COMPLETE;
	}

	apply(compiler) {
		compiler.hooks.watchRun.tapAsync('WatchStateNotifierPlugin', (compiler, callback) => {
			process.send && process.send(WatchStateNotifierPlugin.MESSAGE_CHANGE_DETECTED, () => {});
			callback();
		});
		compiler.hooks.afterEmit.tapAsync('WatchStateNotifierPlugin', (compiler, callback) => {
			process.send && process.send(WatchStateNotifierPlugin.MESSAGE_COMPILATION_COMPLETE, () => {});
			callback();
		});
	}
}

module.exports = WatchStateNotifierPlugin;
