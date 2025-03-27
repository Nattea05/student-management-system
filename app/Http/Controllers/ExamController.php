<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Course;
use App\Models\Subject;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    public function exams(): Response
    {
        $exams = Exam::with(['course:id,course_name', 'subject:id,subject_name'])
            ->get()
            ->map(function ($exam) {
                return [
                    'id' => $exam->id,
                    'course_name' => $exam->course->course_name ?? 'No Course Assigned',
                    'subject_name' => $exam->subject->subject_name ?? 'No Subject Assigned',
                    'date' => $exam->date,
                    'created_at' => $exam->created_at,
                    'updated_at' => $exam->updated_at,
                ];
            });

        return Inertia::render('exams/exams', [
            'exams' => $exams
        ]);
    }

    public function subjects($course_id)
    {
        $subjects = Subject::where('course_id', $course_id)->get();
        return $subjects;
    }

    public function create(): Response
    {
        $courses = Course::all();

        return Inertia::render('exams/create', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $exam = Exam::create([
            'id' => Str::uuid(),
            'course_id' => $request->course_name,
            'subject_id' => $request->subject_name,
            'date' => $request->date,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return to_route('exams.index');
    }

    public function edit($id): Response
    {
        $exam = Exam::find($id);
        $courses = Course::all();

        return Inertia::render('exams/create', [
            'courses' => $courses,
            'exam' => $exam
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $exam = Exam::find($request->id);

        $data = $request->all();
        if (isset($data['course_name'])) {
            $data['course_id'] = $request->course_name;
            unset($data['course_name']); // Remove the course_name from update data
        }

        if (isset($data['subject_name'])) {
            $data['subject_id'] = $request->subject_name;
            unset($data['subject_name']); // Remove the subject_name from update data
        }

        $exam->update($data);

        return to_route('exams.index');
    }

    public function destroy($id): RedirectResponse
    {
        $exam = Exam::find($id)->delete();
        return redirect('exams/exams');
    }
}
