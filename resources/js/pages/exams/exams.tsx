import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Head } from "@inertiajs/react";
import { Exam } from "@/types";
import AppLayout from "@/layouts/app-layout";

export default function Exams({ exams }: { exams: Exam[] }) {
    return (
        <AppLayout>
            <Head title="Exams"/>

            <div className="px-4 py-6">
                <DataTable columns={columns} data={exams} filter_column="course_name" title="exam" />
            </div>
        </AppLayout>
    )
}