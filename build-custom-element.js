const fs = require('fs-extra');

const concat = require('concat');

(async function build() {

  const files = [

    './dist/todo/runtime.js',

    './dist/todo/polyfills.js',

    './dist/todo/main.js'
  ];

  await fs.ensureDir('angular-elements-build');

  await concat(files, 'angular-elements-build/angular-elements.js');

  await fs.copy('./dist/todo/styles.css', 'angular-elements-build/styles.css');

   //uncomment the below line if you have assets folder in your project

   //await fs.copy('./dist/ng-clock/assets/', 'angular-elements/assets/');
})();
