<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class SubjectController extends Controller
{
    public function subjects(): Response
    {
        $subjects = Subject::with('course:id,course_name')
            ->get()
            ->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'course_name' => $subject->course->course_name ?? 'No Course Assigned',
                    'subject_name' => $subject->subject_name,
                    'credits' => $subject->credits,
                    'created_at' => $subject->created_at,
                    'updated_at' => $subject->updated_at,
                ];
            });

        return Inertia::render('subjects/subjects', [
            'subjects' => $subjects
        ]);
    }

    public function create(): Response
    {
        $courses = Course::all();

        return Inertia::render('subjects/create', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $subject = Subject::create([
            'id' => Str::uuid(),
            'course_id' => $request->course_name,
            'subject_name' => $request->subject_name,
            'credits' => $request->credits,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return to_route('subjects.index');
    }

    public function edit($id): Response
    {
        $subject = Subject::find($id);
        $courses = Course::all();

        return Inertia::render('subjects/create', [
            'courses' => $courses,
            'subject' => $subject,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $course = Subject::find($request->id);
        $course->update($request->all());

        return to_route('subjects.index');
    }

    public function destroy($id): RedirectResponse
    {
        $student = Subject::find($id)->delete();
        return redirect('subjects/subjects');
    }
}
