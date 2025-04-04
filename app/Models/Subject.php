<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasUuids;
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'course_id',
        'subject_name',
        'credits'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Defining one to many inverse (belongs to) with Course
    public function course(): BelongsTo
    {
        return $this -> belongsTo(Course::class);
    }

    public function students(): BelongsToMany
    {
        return $this -> belongsToMany(Student::class);
    }

    public function exams(): HasMany
    {
        return $this -> hasMany(Exam::class);
    }
}
