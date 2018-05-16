# webpack-titanium-angular

> Webpack plugin to compile Angular apps for the Titanium platform.

## Getting started

First install the Titanium Angular plugin.

```
npm i webpack-titanium-angular --save-dev
```

Now you can use the plugin in your Webpack configuration.

```
const { TitaniumAngularCompilerPlugin } = require('webpack-titanium-angular');

module.exports = {
  plugins: [
    new TitaniumAngularCompilerPlugin({
      tsConfigPath: '/path/to/tsconfig.json',
      targetPlatform: 'ios'
    })
  ]
}
```

Since this plugin wraps the [Angular Webpack Plugin](https://www.npmjs.com/package/@ngtools/webpack) all options from the original plugin can be used. In addition, the `targetPlatform` option allows you to specify a platform name (`android` or `ios`) which is used to load platform specific Angular components and/or templates.

See the [titanium-angular-example](https://github.com/appcelerator/titanium-angular/tree/master/ti-angular-example) project for a complete usage example.

## Contributing

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanium-webpack-devkit/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-webpack-devkit/pulls/new) against master.

## Getting Help

If you have questions about bundling apps for Titanium with Webpack, feel free to reach out on Stackoverflow or the
`#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License. Version 2.0
