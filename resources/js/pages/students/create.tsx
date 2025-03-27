import AppLayout from "@/layouts/app-layout";
import { Course } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Student } from "./columns";
import { Student as StudentInterface } from "@/types";
import { FormEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function StudentCreate({ courses, student }: { courses: Course[], student: StudentInterface | null }) {
    const { data, setData, post, processing, errors, patch } = useForm<Required<Student>>({
        id: student?.id || '',
        first_name: student?.first_name || '',
        last_name: student?.last_name || '',
        course_name: student?.course_id || '',
        date_of_birth: student?.date_of_birth ? formatDateForInput(student.date_of_birth) : '',
        gender: student?.gender || '',
        email: student?.email || '',
        phone_number: student?.phone_number || '',
        address: student?.address || '',
        city: student?.city || '',
        state: student?.state || '',
        postal_code: student?.postal_code || '',
        country: student?.country || '',
        is_international: student?.is_international || false,
        status: student?.status || 'Active',
        intake: student?.intake ? formatDateForInput(student.intake) : '',
        created_at: student?.created_at || new Date(),
        updated_at: new Date(),
    });

    function formatDateForInput(dateString: string | Date): string {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extracts yyyy-MM-dd
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (student) {
            patch(route('students.update'));
        } else {
            post(route('students.store'));
        }
    };

    return (
        <AppLayout>
            <Head title="Create student" />

            <div className="px-4 py-6">
                <form className="grid grid-cols-3 gap-5" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            placeholder="John"
                        />
                        <InputError message={errors.first_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={2}
                            autoComplete="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            placeholder="Smith"
                        />
                        <InputError message={errors.last_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input
                            id="date_of_birth"
                            type="date"
                            required
                            autoFocus
                            tabIndex={3}
                            autoComplete="date_of_birth"
                            value={data.date_of_birth.toLocaleString()}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            placeholder="mm/dd/YYYY"
                        />
                        <InputError message={errors.date_of_birth} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select onValueChange={(e) => setData('gender', e)} defaultValue={data.gender} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="Male" value="Male">Male</SelectItem>
                                <SelectItem key="Female" value="Female">Female</SelectItem>
                                <SelectItem key="Other" value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
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
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={4}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone_number">Phone number</Label>
                        <Input
                            id="phone_number"
                            type="tel"
                            autoFocus
                            tabIndex={5}
                            autoComplete="tel"
                            value={data.phone_number?.toString()}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="+6012-345 6789"
                        />
                        <InputError message={errors.phone_number} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            autoFocus
                            tabIndex={6}
                            autoComplete="address-level1"
                            value={data.address?.toString()}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Aeropod, Jalan Sembulan"
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            type="text"
                            autoFocus
                            tabIndex={7}
                            value={data.city?.toString()}
                            onChange={(e) => setData('city', e.target.value)}
                            placeholder="Subang Jaya"
                        />
                        <InputError message={errors.city} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            type="text"
                            autoFocus
                            tabIndex={8}
                            value={data.state?.toString()}
                            onChange={(e) => setData('state', e.target.value)}
                            placeholder="Selangor"
                        />
                        <InputError message={errors.state} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="postal_code">Postal code</Label>
                        <Input
                            id="postal_code"
                            type="number"
                            autoFocus
                            tabIndex={9}
                            autoComplete="postal-code"
                            value={data.postal_code?.toString()}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            placeholder="12345"
                        />
                        <InputError message={errors.postal_code} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            type="text"
                            autoFocus
                            tabIndex={9}
                            autoComplete="country"
                            value={data.country?.toString()}
                            onChange={(e) => setData('country', e.target.value)}
                            placeholder="Malaysia"
                        />
                        <InputError message={errors.country} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="is_international">Is International</Label>
                        <Checkbox
                            checked={data.is_international}
                            onCheckedChange={(e) => setData("is_international", Boolean(e.valueOf()))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(e) => setData('status', e)} defaultValue={data.status} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key="Active" value="Active">
                                    Active
                                </SelectItem>
                                <SelectItem key="Inactive" value="Inactive">
                                    Inactive
                                </SelectItem>
                                <SelectItem key="Graduated" value="Graduated">
                                    Graduated
                                </SelectItem>
                                <SelectItem key="Suspended" value="Suspended">
                                    Suspended
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="intake">Intake</Label>
                        <Input
                            id="intake"
                            type="date"
                            autoFocus
                            required
                            tabIndex={10}
                            value={data.intake?.toString()}
                            onChange={(e) => setData('intake', e.target.value)}
                            placeholder="mm-YYYY"
                        />
                        <InputError message={errors.intake} />
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