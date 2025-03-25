<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first() ?? Course::factory()->create();

        $subjectTemplates = [
            'Engineering & Technology' => [
                'prefixes' => ['Advanced', 'Fundamentals of', 'Principles of', 'Introduction to'],
                'subjects' => [
                    'Computer Systems', 'Data Structures', 'Network Security', 
                    'Algorithm Design', 'Software Architecture', 'Database Management'
                ]
            ],
            'Business' => [
                'prefixes' => ['Business', 'Corporate', 'Strategic', 'International'],
                'subjects' => [
                    'Finance', 'Marketing', 'Operations', 
                    'Accounting', 'Economics', 'Management'
                ]
            ],
            'Arts' => [
                'prefixes' => ['Creative', 'Digital', 'Modern', 'Classical'],
                'subjects' => [
                    'Photography', 'Illustration', 'Animation',
                    'Film Studies', 'Graphic Design', 'Art History'
                ]
            ]
        ];

        $template = $subjectTemplates[$course->department] ?? $subjectTemplates['Engineering & Technology'];
        
        $prefix = $this->faker->randomElement($template['prefixes']);
        $subject = $this->faker->randomElement($template['subjects']);

        return [
            'id' => Str::uuid(),
            'course_id' => $course->id,
            'subject_name' => trim("$prefix $subject"),
            'credits' => $this->faker->numberBetween(2, 4),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
