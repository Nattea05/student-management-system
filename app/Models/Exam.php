<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exam extends Model
{
    use HasUuids;
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'student_id',
        'subject_id',
        'date',
        'marks_obtained',
        'intake',
    ];

    protected $casts = [
        'date' => 'date',
        'marks_obtained' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function subject(): BelongsTo
    {
        return $this -> belongsTo(Subject::class, 'subject_id', 'subject_name');
    }

    public function student(): BelongsTo
    {
        return $this -> belongsTo(Student::class);
    }
}
