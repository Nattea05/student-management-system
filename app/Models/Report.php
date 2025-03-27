<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Report extends Model
{
    use HasUuids;
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'exam_id',
        'student_id',
        'marks_obtained',
    ];

    protected $casts = [
        'marks_obtained' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function exams(): BelongsToMany
    {
        return $this -> belongsToMany(Exam::class);
    }

    public function student(): BelongsTo
    {
        return $this -> belongsto(Student::class);
    }
}
