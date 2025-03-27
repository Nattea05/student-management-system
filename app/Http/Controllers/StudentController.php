<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    public function students(): Response
    {
        $students = Student::with('course:id,course_name') // Eager load only needed fields
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    // Replace course_id with course_name
                    'course_name' => $student->course->course_name ?? 'No Course Assigned',
                    'date_of_birth' => $student->date_of_birth,
                    'gender' => $student->gender,
                    'email' => $student->email,
                    'phone_number' => $student->phone_number,
                    'address' => $student->address,
                    'city' => $student->city,
                    'state' => $student->state,
                    'postal_code' => $student->postal_code,
                    'country' => $student->country,
                    'is_international' => $student->is_international,
                    'status' => $student->status,
                    'intake' => $student->intake,
                    'created_at' => $student->created_at,
                    'updated_at' => $student->updated_at,
                ];
            });

        return Inertia::render('students/students', [
            'students' => $students
        ]);
    }

    public function create(): Response
    {
        $courses = Course::all();

        return Inertia::render('students/create', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $student = Student::create([
            'id' => Str::uuid(),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'course_id' => $request->course_name,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'is_international' => $request->is_international,
            'status' => $request->status,
            'intake' => $request->intake,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return to_route('students.index');
    }

    public function edit($id): Response
    {
        $student = Student::find($id);
        $courses = Course::all();

        return Inertia::render('students/create', [
            'courses' => $courses,
            'student' => $student
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $student = Student::find($request->id);

        $data = $request->all();
        if (isset($data['course_name'])) {
            $data['course_id'] = $request->course_name;
            unset($data['course_name']); // Remove the course_name from update data
        }

        $student->update($data);

        return to_route('students.index');
    }

    public function destroy($id): RedirectResponse
    {
        $student = Student::find($id)->delete();
        return redirect('students/students');
    }
}
