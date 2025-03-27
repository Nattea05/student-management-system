<?php

use App\Http\Controllers\ExamController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('exams/exams', [ExamController::class, 'exams'])->name('exams.index');
    Route::get('exams/create', [ExamController::class, 'create'])->name('exams.create');
    Route::get('exams/edit/{id}', [ExamController::class, 'edit'])->name('exams.edit');
    Route::get('exams/subjects/{course_id}', [ExamController::class, 'subjects']);

    Route::post('exams/store', [ExamController::class, 'store'])->name('exams.store');
    Route::patch('exams/update', [ExamController::class, 'update'])->name('exams.update');
    Route::delete('exams/destroy/{id}', [ExamController::class, 'destroy'])->name('exams.destroy');
});