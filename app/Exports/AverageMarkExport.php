<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AverageMarkExport implements WithMultipleSheets
{
    protected $subjectAverages;
    protected $studentAverages;

    public function __construct($subjectAverages, $studentAverages)
    {
        $this->subjectAverages = $subjectAverages;
        $this->studentAverages = $studentAverages;
    }

    public function sheets(): array
    {
        return [
            new SubjectAveragesSheet($this->subjectAverages),
            new StudentAveragesSheet($this->studentAverages),
        ];
    }
}
