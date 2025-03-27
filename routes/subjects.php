<?php

use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('subjects/subjects', [SubjectController::class, 'subjects'])->name('subjects.index');
    Route::get('subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
    Route::get('subjects/edit/{id}', [SubjectController::class, 'edit'])->name('subjects.edit');

    Route::post('subjects/store', [SubjectController::class, 'store'])->name('subjects.store');
    Route::patch('subjects/update', [SubjectController::class, 'update'])->name('subjects.update');
    Route::delete('subjects/destroy/{id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
});