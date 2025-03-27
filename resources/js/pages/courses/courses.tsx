import { DataTable } from "@/components/ui/data-table";
import { columns } from "./courses-columns"
import AppLayout from "@/layouts/app-layout";
import { Course } from "@/types";
import { Head } from "@inertiajs/react";

export default function Students({ courses }: { courses: Course[] }) {
    return (
        <AppLayout>
            <Head title="Courses"/>

            <div className="px-4 py-6">
                <DataTable columns={columns} data={courses} filter_column="first_name" title="course" />
            </div>
        </AppLayout>
    )
}