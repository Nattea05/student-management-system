import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns"
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Subject } from "@/types";

export default function Subjects({ subjects }: { subjects: Subject[] }) {
    return (
        <AppLayout>
            <Head title="Subjects"/>

            <div className="px-4 py-6">
                <DataTable columns={columns} data={subjects} filter_column="subject_name" title="subject" />
            </div>
        </AppLayout>
    )
}