<?php

use Illuminate\Support\Facades\Route;

Route::inertia('', 'dashboard')->name('home');
Route::inertia('{id}', 'product')->name('product');
