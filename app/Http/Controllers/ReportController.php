<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Report;
use App\Models\Student;
use App\Models\Subject;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use App\Exports\AverageMarkExport;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function subjects(): Response
    {
        $subject_averages = Subject::with(['exams.reports', 'exams.course'])
            ->get()
            ->map(function ($subject) {
                // Collect all marks from all reports across all exams
                $allMarks = $subject->exams->flatMap(function ($exam) {
                    return $exam->reports->pluck('marks_obtained');
                });

                return [
                    'subject_id' => $subject->id,
                    'subject_name' => $subject->subject_name,
                    'course_name' => $subject->course->course_name,
                    'average_marks' => $allMarks->avg() ?? 0,
                ];
            });

        return Inertia::render('reports/subjects', [
            'subjectAverages' => $subject_averages,
        ]);
    }

    public function students(): Response
    {

        $student_averages = Student::with('reports')
            ->get()
            ->map(function ($student) {
                $allMarks = $student->reports->flatMap(function ($report) {
                    return $report->pluck('marks_obtained');
                });

                return [
                    'student_id' => $student->id,
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    'average_marks' => $allMarks->avg() ?? 0,
                ];
            });

        return Inertia::render('reports/students', [
            'studentAverages' => $student_averages,
        ]);
    }

    public function reports(): Response
    {
        $reports = Report::all();

        return Inertia::render('reports/reports', [
            'reports' => $reports,
        ]);
    }

    public function create(): Response
    {
        $exams = Exam::with(['course', 'subject'])->get();
        $students = Student::all();

        return Inertia::render('reports/create', [
            'exams' => $exams,
            'students' => $students,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $report = Report::create([
            'id' => Str::uuid(),
            'exam_id' => $request->exam_id,
            'student_id' => $request->student_id,
            'marks_obtained' => $request->marks_obtained,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return to_route('reports.reports');
    }

    public function edit($id): Response
    {
        $report = Report::find($id);
        $exams = Exam::with(['course', 'subject'])->get();
        $students = Student::all();

        return Inertia::render('reports/create', [
            'exams' => $exams,
            'students' => $students,
            'report' => $report
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $report = Report::find($request->id);
        $report->update($request->all());

        return to_route('reports.reports');
    }

    public function destroy($id): RedirectResponse
    {
        $report = Report::find($id)->delete();
        return redirect('reports/reports');
    }

    public function export()
    {
        $subject_averages = Subject::with(['exams.reports', 'exams.course'])
            ->get()
            ->map(function ($subject) {
                // Collect all marks from all reports across all exams
                $allMarks = $subject->exams->flatMap(function ($exam) {
                    return $exam->reports->pluck('marks_obtained');
                });

                return [
                    'subject_id' => $subject->id,
                    'subject_name' => $subject->subject_name,
                    'course_name' => $subject->course->course_name,
                    'average_marks' => $allMarks->avg() ?? 0,
                ];
            });

        $student_averages = Student::with('reports')
            ->get()
            ->map(function ($student) {
                $allMarks = $student->reports->flatMap(function ($report) {
                    return $report->pluck('marks_obtained');
                });

                return [
                    'student_id' => $student->id,
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    'average_marks' => $allMarks->avg() ?? 0,
                ];
            });

        return Excel::download(
            new AverageMarkExport($subject_averages, $student_averages),
            'averages_report.xlsx'
        );
    }
}
