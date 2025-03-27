import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import AppLayout from "@/layouts/app-layout";
import { Student } from "@/types";
import { Head } from "@inertiajs/react";

export default function Students({ students }: { students: Student[] }) {
    return (
        <AppLayout>
            <Head title="Students"/>

            <div className="px-4 py-6">
                <DataTable columns={columns} data={students} filter_column="first_name" title="student" />
            </div>
        </AppLayout>
    )
}