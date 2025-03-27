<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('students/students', [StudentController::class, 'students'])->name('students.index');
    Route::get('students/create', [StudentController::class, 'create'])->name('students.create');
    Route::get('students/edit/{id}', [StudentController::class, 'edit'])->name('students.edit');

    Route::post('students/store', [StudentController::class, 'store'])->name('students.store');
    Route::patch('students/update', [StudentController::class, 'update'])->name('students.update');
    Route::delete('students/destroy/{id}', [StudentController::class, 'destroy'])->name('students.destroy');
});