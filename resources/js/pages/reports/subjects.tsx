import { DataTable } from "@/components/ui/data-table";
import { columns } from "./subjects-columns";
import { Head } from "@inertiajs/react";
import { SubjectAverage } from "@/types";
import AppLayout from "@/layouts/app-layout";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export default function SubjectsReport({ subjectAverages }: { subjectAverages: SubjectAverage[] }) {
    return (
        <AppLayout>
            <Head title="Subjects Report" />

            <div className="px-4 py-6 flex flex-col space-y-5">
                <div className="space-x-5">
                    <TextLink href={route('reports.students')}>
                        Students Report
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
                <DataTable columns={columns} data={subjectAverages} filter_column="course_name" />
            </div>
        </AppLayout>
    )
}