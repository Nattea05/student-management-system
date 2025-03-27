import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table"

export type SubjectAverage = {
    subject_id: string;
    subject_name: string;
    course_name: string;
    average_marks: number;
}

export const columns: ColumnDef<SubjectAverage>[] = [
    {
        accessorKey: "subject_id",
        header: "Subject ID",
    },
    {
        accessorKey: "subject_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Subject" />
        ),
    },
    {
        accessorKey: "course_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Course" />
        ),
    },
    {
        accessorKey: "average_marks",
        header: "Average Marks",
        cell: ({ row }) => Number(row.getValue("average_marks")).toFixed(2),
    },
]