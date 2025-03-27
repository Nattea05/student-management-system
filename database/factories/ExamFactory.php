<?php

namespace Database\Factories;

use App\Models\Subject;
use App\Models\Course;
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
        $subject = Subject::inRandomOrder()->first();
        $course = Course::find($subject->course_id);

        return [
            'id' => Str::uuid(),
            'course_id' => $course->id,
            'subject_id' => $subject->id,
            'date' => $this->faker->dateTimeThisYear('+2 months'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
