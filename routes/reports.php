<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('reports/subjects', [ReportController::class, 'subjects'])->name('reports.subjects');
    Route::get('reports/students', [ReportController::class, 'students'])->name('reports.students');
    Route::get('reports/reports', [ReportController::class, 'reports'])->name('reports.reports');
    Route::get('reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::get('reports/edit/{id}', [ReportController::class, 'edit'])->name('reports.edit');

    Route::post('reports/store', [ReportController::class, 'store'])->name('reports.store');
    Route::patch('reports/update', [ReportController::class, 'update'])->name('reports.update');
    Route::delete('reports/destroy/{id}', [ReportController::class, 'destroy'])->name('reports.destroy');

    Route::get('reports/export', [ReportController::class, 'export'])->name('reports.export');
});