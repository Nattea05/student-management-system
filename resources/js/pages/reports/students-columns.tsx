import { DataTableColumnHeader } from "@/components/ui/column-header";
import { ColumnDef } from "@tanstack/react-table"

export type StudentAverage = {
    student_id: string;
    first_name: string;
    last_name: string;
    average_marks: number;
}

export const columns: ColumnDef<StudentAverage>[] = [
    {
        accessorKey: "student_id",
        header: "Student ID",
    },
    {
        accessorKey: "first_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First Name" />
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Name" />
        ),
    },
    {
        accessorKey: "average_marks",
        header: "Average Marks",
        cell: ({ row }) => Number(row.getValue("average_marks")).toFixed(2),
    },
]