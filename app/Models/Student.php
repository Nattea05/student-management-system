<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasUuids;
    use HasFactory;

    // Enabling timestamps
    public $timestamps = true;

    // Define the fields that are mass assignable
    protected $fillable = [
        'first_name',
        'last_name',
        'course_id',
        'date_of_birth',
        'gender',
        'email',
        'phone_number',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_international',
        'status',
        'intake',
    ];

    // Define the fields that should be cast to native types
    protected $casts = [
        'intake' => 'date',
        'is_international' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function course(): BelongsTo
    {
        return $this -> belongsTo(Course::class);
    }

    public function subjects(): BelongsToMany
    {
        return $this -> belongstoMany(Subject::class);
    }

    public function reports(): HasMany
    {
        return $this -> hasMany(Report::class);
    }
}
