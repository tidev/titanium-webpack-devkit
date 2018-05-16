# Titanium Webpack DevKit

> Development tools to bundle Titanium apps with Webpack

This is the home for all the libraries and plugins to integrate Webpack support into the Titanium build pipeline.

## Packages

This is a monorepo with the following packages:

| Package | Description | Version | Links |
|---|---|---|---|
| webpack-target-titanium | Creates a new Titanium target based on the web target | [![latest](https://img.shields.io/npm/v/webpack-target-titanium.svg?style=flat-square)](https://www.npmjs.com/package/webpack-target-titanium) | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/appcelerator/titanium-webpack-devkit/tree/master/packages/webpack-target-titanium#readme) |
| webpack-titanium-angular | Wraps the Angular compiler plugin and decorates the internal virtual file system plugin so it supports loading of platform specific files. | [![latest](https://img.shields.io/npm/v/webpack-titanium-angular.svg?style=flat-square)](https://www.npmjs.com/package/webpack-titanium-angular) | [![README](https://img.shields.io/badge/README--green.svg)](https://github.com/appcelerator/titanium-webpack-devkit/tree/master/packages/webpack-titanium-angular#readme) |
| webpack-dev-titanium | Provides Hot Module Reloading inside Titanium apps | - | - |

## Contributing

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanium-webpack-devkit/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-webpack-devkit/pulls/new) against master.

Before you contribute read through the following guidelines.

* The `master` branch contains a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**
* Checkout relevant topic branches, e.g. `develop` and merge back against that branch.
* Your commit messages should follow the [Conventional Commits Specification](https://conventionalcommits.org/) so that changelogs and version bumps can be automatically generated. If you are not familiar with the commit message convention, you can use `npm run commit` instead of git commit, which provides an interactive CLI for generating proper commit messages.
* We will let GitHub automatically squash your PR before merging, so don't worry about making multiple small commits.

## Development setup

After cloning the repo just install the dependencies and you are good to go.

```
npm i
```

## Getting Help

If you have questions about bundling apps for Titanium with Webpack, feel free to reach out on Stackoverflow or the
`#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License. Version 2.0
