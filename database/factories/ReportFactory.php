<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Find list of exam rows whose course_id is also found in students table
        $exam = Exam::whereHas('course.students')->inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'exam_id' => $exam->id,
            'student_id' => $exam->course->students->first()->id,
            'marks_obtained' => $this->faker->randomFloat(2, 0, 1),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
