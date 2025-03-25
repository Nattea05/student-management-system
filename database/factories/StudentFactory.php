<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();

        return [
            'id' => Str::uuid(),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'course_id' => $course->id,
            'date_of_birth' => $this->faker->dateTimeBetween('-30 years', '-18 years')->format('Y-m-d'),
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Other']),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'country' => function (array $attributes) {
                return $attributes['is_international']
                    ? $this->faker->country()
                    : 'Malaysia';
            },
            'is_international' => $this->faker->boolean(30), // 30% chance of being international
            'status' => $this->faker->randomElement(['Active', 'Inactive', 'Suspended']),
            'intake' => $this->faker->dateTimeBetween('-2 years', 'now')->format('Y-m-01'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
