<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasUuids;

    public $timestamps = true;

    protected $fillable = [
        'course_name',
        'department',
        'duration',
        'total_credits'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Defining one to many relationship with Subject
    public function subjects(): HasMany
    {
        return $this -> hasMany(Subject::class);
    }

    public function students(): HasMany
    {
        return $this -> hasMany(Student::class);
    }
}
