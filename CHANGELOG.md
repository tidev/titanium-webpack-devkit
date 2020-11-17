# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.1](https://github.com/appcelerator/titanium-webpack-devkit/compare/v2.2.0...v2.2.1) (2020-11-17)


### Bug Fixes

* **angular:** typo in compiler options ([#42](https://github.com/appcelerator/titanium-webpack-devkit/issues/42)) ([cec3328](https://github.com/appcelerator/titanium-webpack-devkit/commit/cec3328))





# [2.2.0](https://github.com/appcelerator/titanium-webpack-devkit/compare/v2.1.2...v2.2.0) (2020-11-17)


### Bug Fixes

* **angular:** add transformer if skipCodeGeneration is false ([cb817eb](https://github.com/appcelerator/titanium-webpack-devkit/commit/cb817eb))


### Features

* replace entry and bootstrap for aot build ([c61607f](https://github.com/appcelerator/titanium-webpack-devkit/commit/c61607f))





## [2.1.2](https://github.com/appcelerator/titanium-webpack-devkit/compare/v2.1.1...v2.1.2) (2020-07-15)


### Bug Fixes

* **angular:** expose missing getters from vfs ([#37](https://github.com/appcelerator/titanium-webpack-devkit/issues/37)) ([ac5afd1](https://github.com/appcelerator/titanium-webpack-devkit/commit/ac5afd1))





## [2.1.1](https://github.com/appcelerator/titanium-webpack-devkit/compare/v2.1.0...v2.1.1) (2020-06-15)


### Bug Fixes

* create watch file system using platform decorator ([0447ce8](https://github.com/appcelerator/titanium-webpack-devkit/commit/0447ce8))
* follow convention when wrapping input file system ([107062a](https://github.com/appcelerator/titanium-webpack-devkit/commit/107062a))





# [2.1.0](https://github.com/appcelerator/titanium-webpack-devkit/compare/v2.0.0...v2.1.0) (2020-05-28)


### Bug Fixes

* emit app.js only once ([#36](https://github.com/appcelerator/titanium-webpack-devkit/issues/36)) ([9c0ddc1](https://github.com/appcelerator/titanium-webpack-devkit/commit/9c0ddc1))


### Features

* support hot module reloading ([#8](https://github.com/appcelerator/titanium-webpack-devkit/issues/8)) ([990f023](https://github.com/appcelerator/titanium-webpack-devkit/commit/990f023))





# [2.0.0](https://github.com/appcelerator/titanium-webpack-devkit/compare/v1.0.0...v2.0.0) (2020-04-17)


### Bug Fixes

* respect existing extension ([283a59d](https://github.com/appcelerator/titanium-webpack-devkit/commit/283a59d))
* **angular:** move platform fs decorator to angular package ([e404a86](https://github.com/appcelerator/titanium-webpack-devkit/commit/e404a86))


### BREAKING CHANGES

* Inserts new `ignoreExtension` argument to plugin constructor. You need to create and add two plugin instances with altering `ignoreExtension` values.





# [1.0.0](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.2.3...v1.0.0) (2019-10-18)


### Features

* platform resolver plugin ([#25](https://github.com/appcelerator/titanium-webpack-devkit/issues/25)) ([de034c5](https://github.com/appcelerator/titanium-webpack-devkit/commit/de034c5))
* titanium externals plugin ([#27](https://github.com/appcelerator/titanium-webpack-devkit/issues/27)) ([c74a694](https://github.com/appcelerator/titanium-webpack-devkit/commit/c74a694))


### BREAKING CHANGES

* replace the file system override with a resolver plugin





## [0.2.3](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.2.2...v0.2.3) (2019-10-17)


### Bug Fixes

* replace NodeSourcePlugin with NodeTargetPlugin ([#23](https://github.com/appcelerator/titanium-webpack-devkit/issues/23)) ([341333d](https://github.com/appcelerator/titanium-webpack-devkit/commit/341333d))





## [0.2.2](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.2.1...v0.2.2) (2019-07-01)


### Bug Fixes

* reference proper ipc message data ([#16](https://github.com/appcelerator/titanium-webpack-devkit/issues/16)) ([95838ba](https://github.com/appcelerator/titanium-webpack-devkit/commit/95838ba))





## [0.2.1](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.1.0...v0.2.1) (2019-03-20)


### Bug Fixes

* **angular:** fix typo in require ([ac0493f](https://github.com/appcelerator/titanium-webpack-devkit/commit/ac0493f))





<a name="0.1.0"></a>
# [0.1.0](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.0.2...v0.1.0) (2018-06-14)


### Features

* platform aware filesystem plugin ([#6](https://github.com/appcelerator/titanium-webpack-devkit/issues/6)) ([7bfd8c1](https://github.com/appcelerator/titanium-webpack-devkit/commit/7bfd8c1))




<a name="0.0.2"></a>
## [0.0.2](https://github.com/appcelerator/titanium-webpack-devkit/compare/v0.0.1...v0.0.2) (2018-05-16)




**Note:** Version bump only for package titanium-webpack-devkit

<a name="0.0.1"></a>
## 0.0.1 (2018-05-16)




**Note:** Version bump only for package titanium-webpack-devkit
