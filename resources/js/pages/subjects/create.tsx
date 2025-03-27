import AppLayout from "@/layouts/app-layout";
import { Course, Subject as SubjectInterface } from "@/types";
import { Subject } from "./columns";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubjectCreate({ courses, subject }: { courses: Course[], subject: SubjectInterface | null }) {
    const { data, setData, post, processing, errors, patch } = useForm<Required<Subject>>({
        id: subject?.id || '',
        course_name: subject?.course_id || '',
        subject_name: subject?.subject_name || '',
        credits: subject?.credits || 0,
        created_at: subject?.created_at || new Date(),
        updated_at: new Date(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (subject) {
            patch(route('subjects.update'));
        } else {
            post(route('subjects.store'));
        }
    };

    return (
        <AppLayout>
            <Head title="Create student" />

            <div className="px-4 py-6">
                <form className="grid grid-cols-3 gap-5" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="subject_name">Subject name</Label>
                        <Input
                            id="subject_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="subject_name"
                            value={data.subject_name}
                            onChange={(e) => setData('subject_name', e.target.value)}
                            placeholder="Enter course name"
                        />
                        <InputError message={errors.subject_name} />
                    </div>

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
                        <Label htmlFor="credits">Credits</Label>
                        <Input
                            id="credits"
                            type="number"
                            required
                            autoFocus
                            tabIndex={2}
                            autoComplete="credits"
                            value={data.credits}
                            onChange={(e) => setData('credits', Number(e.target.value))}
                            placeholder="Enter total credits for the course"
                        />
                        <InputError message={errors.credits} />
                    </div>

                    <Button type="submit" className="mt-5" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Confirm
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}