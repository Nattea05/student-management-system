import AppLayout from "@/layouts/app-layout";
import { Course, Report as ReportInterface, Student, Subject } from "@/types";
import { Report } from "./columns";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function ReportCreate({ exams, students, report }: {
    exams: {
        id: string,
        course: Course,
        course_id: string,
        subject: Subject,
        subject_id: string,
        date: string | Date,
        created_at: string | Date,
        updated_at: string | Date,
    }[],
    students: Student[],
    report: ReportInterface | null
}) {
    const { data, setData, post, processing, errors, patch } = useForm<Required<Report>>({
        id: report?.id || '',
        exam_id: report?.exam_id || '',
        student_id: report?.student_id || '',
        marks_obtained: Number(report?.marks_obtained) || 0,
        created_at: report?.created_at || new Date(),
        updated_at: new Date(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (report) {
            patch(route('reports.update'));
        } else {
            post(route('reports.store'));
        }
    };

    return (
        <AppLayout>
            <Head title="Create exam" />

            <div className="px-4 py-6">
                <form className="grid grid-cols-3 gap-5" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="course">Exam</Label>
                        <Select onValueChange={(e) => setData('exam_id', e)} defaultValue={data.exam_id} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an exam" />
                            </SelectTrigger>
                            <SelectContent>
                                {exams.map((exam) => (
                                    <SelectItem key={exam.id} value={exam.id}>
                                        {exam.course.course_name}, {exam.subject.subject_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subject">Student</Label>
                        <Select onValueChange={(e) => setData('student_id', e)} defaultValue={data.student_id} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map((student) => (
                                    <SelectItem key={student.id} value={student.id}>
                                        {student.first_name} {student.last_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="marks_obtained">Marks obtained</Label>
                        <Input
                            id="marks_obtained"
                            type="number"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="marks_obtained"
                            value={data.marks_obtained}
                            onChange={(e) => setData('marks_obtained', Number(e.target.value))}
                        />
                        <InputError message={errors.marks_obtained} />
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