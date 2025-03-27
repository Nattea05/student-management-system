<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('sms-dashboard', function () {
        return Inertia::render('sms-dashboard');
    })->name('sms-dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/courses.php';
require __DIR__.'/students.php';
require __DIR__.'/auth.php';
