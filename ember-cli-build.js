/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
      babel: {
      optional: ['es7.decorators', 'es7.functionBind']
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    sassOptions: {
      includePaths: [
        'bower_components/breakpoint-sass/stylesheets'
      ]
    }
  });

  shim(EmberApp);

  return app.toTree();
};
