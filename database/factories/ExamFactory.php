<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $student = Student::inRandomOrder()->first();
        $subject = Subject::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'student_id' => $student->id,
            'subject_id' => $subject->id,
            'date' => $this->faker->dateTimeThisYear('+2 months'),
            'marks_obtained' => $this->faker->randomFloat(2, 0, 1),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
