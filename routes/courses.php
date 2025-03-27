<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('courses/courses', [CourseController::class, 'courses'])->name('courses.index');
    Route::get('courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::get('courses/edit/{id}', [CourseController::class, 'edit'])->name('courses.edit');

    Route::post('courses/store', [CourseController::class, 'store'])->name('courses.store');
    Route::patch('courses/update', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('courses/destroy/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');
});