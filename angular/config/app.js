(function() {

    'use strict';

    angular
        .module('noteApp', ['ui.router', 'satellizer'])
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $authProvider.loginUrl  = '/api/authenticate';
            $authProvider.signupUrl = '/api/register';

            $urlRouterProvider.otherwise('/auth');

            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: './views/auth/auth.html',
                    controller: 'AuthController as authCtrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: './views/register/register.html',
                    controller: 'RegisterController as registerCtrl'
                })
                .state('categories', {
                    url: '/categories',
                    templateUrl: './views/category/category.html',
                    controller: 'CategoryController as categoryCtrl'
                })
                .state('categorydelete', {
                    url: '/categories/:category',
                    templateUrl: './views/categorydelete/categorydelete.html',
                    controller: 'CategorydeleteController as categorydeleteCtrl'
                })
                .state('lists', {
                    url: '/:category/lists',
                    templateUrl: './views/list/list.html',
                    controller: 'ListController as listCtrl'
                })
                .state('notes', {
                    url: '/:category/notes',
                    templateUrl: './views/note/note.html',
                    controller: 'NoteController as noteCtrl'
                })
                .state('bookmarks', {
                    url: '/:category/bookmarks',
                    templateUrl: './views/bookmark/bookmark.html',
                    controller: 'BookmarkController as bookmarkCtrl'
                });
        });
})();
