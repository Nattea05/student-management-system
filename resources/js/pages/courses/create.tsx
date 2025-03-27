import AppLayout from "@/layouts/app-layout";
import { Course } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function CourseCreate({ course }: { course: Course | null }) {
    const { data, setData, post, processing, errors, patch } = useForm<Required<Course>>({
        id: course?.id || '',
        course_name: course?.course_name || '',
        department: course?.department || '',
        duration: course?.duration || '',
        total_credits: course?.total_credits || 0,
        created_at: course?.created_at || new Date(),
        updated_at: new Date(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (course) {
            patch(route('courses.update'));
        } else {
            post(route('courses.store'));
        }
    };

    return (
        <AppLayout>
            <Head title="Create student" />

            <div className="px-4 py-6">
                <form className="grid grid-cols-3 gap-5" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="course_name">Course name</Label>
                        <Input
                            id="course_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="course_name"
                            value={data.course_name}
                            onChange={(e) => setData('course_name', e.target.value)}
                            placeholder="Enter course name"
                        />
                        <InputError message={errors.course_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select onValueChange={(e) => setData('department', e)} defaultValue={data.department} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="Engineering & Technology" value="Engineering & Technology">Engineering & Technology</SelectItem>
                                <SelectItem key="Business" value="Business">Business</SelectItem>
                                <SelectItem key="Art" value="Art">Art</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select onValueChange={(e) => setData('duration', e)} defaultValue={data.duration} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="2 Years" value="2 Years">2 Years</SelectItem>
                                <SelectItem key="3 Years" value="3 Years">3 Years</SelectItem>
                                <SelectItem key="4 Years" value="4 Years">4 Years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="total_credits">Total credits</Label>
                        <Input
                            id="total_credits"
                            type="number"
                            required
                            autoFocus
                            tabIndex={2}
                            autoComplete="total_credits"
                            value={data.total_credits}
                            onChange={(e) => setData('total_credits', Number(e.target.value))}
                            placeholder="Enter total credits for the course"
                        />
                        <InputError message={errors.total_credits} />
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