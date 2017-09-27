// This Webpack loader adds relevant entries from package.json to your manifest.json.

const fs = require('fs')

module.exports = function (source) {
  this.addDependency('./package.json')
  this.cacheable()
  const pkg = JSON.parse(fs.readFileSync('./package.json'))

  const merged = Object.assign({}, JSON.parse(source), {
    'name': pkg.name,
    'description': pkg.description,
    'version': pkg.version,
    'author': pkg.author,
    'homepage_url': pkg.homepage
  })

  const isProduction = (process.argv.indexOf('process.env.NODE_ENV=production') >= 0)

  // remove the hot-reloader from the production build
  if (isProduction && merged.background && merged.background.scripts) {
    let index = merged.background.scripts.indexOf('hot-reload.bundle.js')
    if (index >= 0) {
      merged.background.scripts.splice(index, 1)
    }
    if (merged.background.scripts.length === 0) {
      delete merged.background
    }
  }

  let indentation = isProduction ? null : 2
  return JSON.stringify(merged, null, indentation) + '\n'
}
