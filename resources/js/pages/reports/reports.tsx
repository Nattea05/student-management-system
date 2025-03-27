import { DataTable } from "@/components/ui/data-table";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { columns } from "./columns";
import { Report } from "@/types";

export default function Reports({ reports }: { reports: Report[] }) {
    return (
        <AppLayout>
            <Head title="Exams" />

            <div className="px-4 py-6 flex flex-col space-y-5">
                <div className="space-x-5">
                    <TextLink href={route('reports.subjects')}>
                        Subjects Report
                    </TextLink>
                    <TextLink href={route('reports.students')}>
                        Students Report
                    </TextLink>
                    <a href={route('reports.export')}>
                        <Button>
                            <FileSpreadsheet />
                            Generate CSV Report
                        </Button>
                    </a>
                </div>
                <DataTable columns={columns} data={reports} filter_column="exam_id" title="report" />
            </div>
        </AppLayout>
    )
}