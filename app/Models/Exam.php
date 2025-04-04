<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasUuids;
    use HasFactory;

    public $timestamps = true;

    protected $fillable = [
        'course_id',
        'subject_id',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function subject(): BelongsTo
    {
        return $this -> belongsTo(Subject::class);
    }

    public function course(): BelongsTo
    {
        return $this -> belongsTo(Course::class);
    }

    public function reports(): HasMany
    {
        return $this -> hasMany(Report::class);
    }
}
