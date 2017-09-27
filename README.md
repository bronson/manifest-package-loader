# manifest-package-loader

This Webpack loader inserts data from package.json into a your manifest.json
to ensure it's always up-to-date.  (who remembers to update the version field every time?)

This is handy when writing chrome extensions.  You may also be interested in the
[web-accessible resources plugin](https://github.com/bronson/web-accessible-resources-webpack-plugin).

This script was originally written by [SO user108471](https://stackoverflow.com/questions/44232366/how-do-i-build-a-json-file-with-webpack).

The following fields are copied from webpack.json to your manifest.json:

* `name`
* `description`
* `version`
* `author`
* `homepage_url`


## Install

* `yarn add -D manifest-package-loader`

## Usage

Add a rule to your `webpack.config.json`:

```js
//  webpack.config.js

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /^manifest\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          'manifest-package-loader'
        ]
      }
    ]
  }
  ...
}
```

Make sure to require or import './manifest.json' in any of your javascript files.
If you omit this step, Webpack will think the manifest is dead code.

```js
// index.js
import './manifest.json'
```

## Contributing

Please file an issue on [GitHub](https://github.com/bronson/manifest-package-loader/issues).

## Alternatives

* https://github.com/mrmisterman/chem-loader

## License

MIT, be free.
