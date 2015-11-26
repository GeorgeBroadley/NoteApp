var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix
        .sass('app.scss')
        .copy('./angular/app/**/*.html', 'public/views/')
        .copy('./node_modules/font-awesome/fonts/**', 'public/fonts/')
        .scripts([
            './node_modules/angular/angular.min.js',
            './node_modules/angular-ui-router/build/angular-ui-router.min.js',
            './node_modules/satellizer/satellizer.min.js',
            './angular/**/*.js',
            './angular/app/**/*.js',
        ], 'public/js');
});
