# webpack-target-titanium

> Titanium target for Webpack, based on the built-in Node target.

## Getting started

First install the Titanium target for Webpack.

```
npm i webpack-target-titanium --save-dev
```

Now you can use the Titanium target in your Webpack configuration.

```
const { GenerateAppJsPlugin, titaniumTarget } = require('webpack-target-titanium');

module.exports = {
  target: titaniumTarget,
  entry: {
    bundle:'./src/main.js',
  },
  plugins: [ new GenerateAppJsPlugin([ 'bundle' ]) ]
};
```

The `GenerateAppJsPlugin` will generate the `app.js` and insert `require` calls to all specified chunks. Splitting your code between multiple chunks is not yet supported, so make sure to always set it to the entry chunk name. 

## Contributing

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanium-webpack-devkit/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-webpack-devkit/pulls/new) against master.

## Getting Help

If you have questions about bundling apps for Titanium with Webpack, feel free to reach out on Stackoverflow or the
`#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License. Version 2.0
