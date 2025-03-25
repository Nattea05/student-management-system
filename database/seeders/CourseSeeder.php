<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->insert([
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Information Technology',
                'department' => 'Engineering & Technology',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Computer Science',
                'department' => 'Engineering & Technology',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Finance and Economics',
                'department' => 'Business',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Accounting',
                'department' => 'Business',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Marketing',
                'department' => 'Business',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Arts in Digital Film Production',
                'department' => 'Art',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Arts in Graphic Design',
                'department' => 'Art',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Bachelor of Arts in Interior Architecture',
                'department' => 'Art',
                'duration' => '3 Years',
                'total_credits' => 120,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => Str::uuid(),
                'course_name' => 'Diploma in Design Communication',
                'department' => 'Art',
                'duration' => '2 Years',
                'total_credits' => 90,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
