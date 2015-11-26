<?php

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function () {
    Route::resource('lists', 'ListController', ['only' => ['show', 'store', 'destroy']]);
    Route::resource('notes', 'NoteController', ['only' => ['show', 'store', 'destroy']]);
    Route::resource('bookmarks', 'BookmarkController', ['only' => ['show', 'store', 'destroy']]);
    Route::resource('categories', 'CategoryController', ['only' => ['index', 'store', 'destroy']]);
    Route::resource('category_types', 'CategoryTypeController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::post('register', 'AuthenticateController@register');
});
