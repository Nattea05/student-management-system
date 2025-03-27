<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function courses(): Response
    {
        $courses = Course::all();

        return Inertia::render('courses/courses', [
            'courses' => $courses
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('courses/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $course = Course::create([
            'id' => Str::uuid(),
            'department' => $request->department,
            'course_name' => $request->course_name,
            'duration' => $request->duration,
            'total_credits' => $request->total_credits,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return to_route('courses.index');
    }

    public function edit($id): Response
    {
        $course = Course::find($id);

        return Inertia::render('courses/create', [
            'course' => $course,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $course = Course::find($request->id);
        $course->update($request->all());

        return to_route('courses.index');
    }

    public function destroy($id): RedirectResponse
    {
        $student = Course::find($id)->delete();
        return redirect('courses/courses');
    }
}
