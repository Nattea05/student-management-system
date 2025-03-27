import { DataTable } from "@/components/ui/data-table";
import { columns } from "./students-columns";
import { Head } from "@inertiajs/react";
import { StudentAverage } from "@/types";
import AppLayout from "@/layouts/app-layout";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export default function StudentsReport({ studentAverages }: { studentAverages: StudentAverage[] }) {
    return (
        <AppLayout>
            <Head title="Students Report" />

            <div className="px-4 py-6 flex flex-col space-y-5">
                <div className="space-x-5">
                    <TextLink href={route('reports.subjects')}>
                        Subjects Report
                    </TextLink>
                    <TextLink href={route('reports.reports')}>
                        All Reports
                    </TextLink>
                    <a href={route('reports.export')}>
                        <Button>
                            <FileSpreadsheet />
                            Generate CSV Report
                        </Button>
                    </a>
                </div>
                <DataTable columns={columns} data={studentAverages} filter_column="course_name" />
            </div>
        </AppLayout>
    )
}