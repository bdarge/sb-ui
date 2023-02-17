// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.3/config/configuration-file.html

module.exports = function (config) {
  let isWatch = config.buildWebpack.options.watch;
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir : require('path').join(__dirname, '../coverage'),
      subdir: '.',
      reporters: [
        { type: 'html'},
        { type: 'text'},
        { type: 'text-summary'},
      ]
    },
    port: 9877,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    browserNoActivityTimeout: 50000,
    singleRun: !isWatch
  })
};
