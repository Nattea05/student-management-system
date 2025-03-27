"use client"

import AppLayout from "@/layouts/app-layout";
import { Course, Exam as ExamInterface, Subject } from "@/types";
import { Exam } from "./columns";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function ExamCreate({ courses, exam }: { courses: Course[], exam: ExamInterface | null }) {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const { data, setData, post, processing, errors, patch } = useForm<Required<Exam>>({
        id: exam?.id || '',
        course_name: exam?.course_id || '',
        subject_name: exam?.subject_id || '',
        date: exam?.date ? formatDateForInput(exam.date) : '',
        created_at: exam?.created_at || new Date(),
        updated_at: new Date(),
    });

    function formatDateForInput(dateString: string | Date): string {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extracts yyyy-MM-dd
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (exam) {
            patch(route('exams.update'));
        } else {
            post(route('exams.store'));
        }
    };

    useEffect(() => {
        if (data.course_name) {
            fetch(`/exams/subjects/${data.course_name}`)
                .then(res => res.json())
                .then(data => setSubjects(data));
        }
    }, [data.course_name])

    return (
        <AppLayout>
            <Head title="Create exam" />

            <div className="px-4 py-6">
                <form className="grid grid-cols-3 gap-5" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="course">Course</Label>
                        <Select onValueChange={(e) => setData('course_name', e)} defaultValue={data.course_name} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id}>
                                        {course.course_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subject">Subjects</Label>
                        <Select onValueChange={(e) => setData('subject_name', e)} defaultValue={data.subject_name} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id} value={subject.id}>
                                        {subject.subject_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="date"
                            value={data.date.toLocaleString()}
                            onChange={(e) => setData('date', e.target.value)}
                        />
                        <InputError message={errors.date} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Confirm
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}