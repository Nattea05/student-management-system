import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/column-header";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

export type Course = {
    id: string;
    department: string;
    course_name: string;
    duration: string;
    total_credits: number;
    created_at: string | Date;
    updated_at: string | Date;
}

export const columns: ColumnDef<Course>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "course_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "total_credits",
        header: "Total Credits",
    }, {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleString(),
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => new Date(row.getValue("updated_at")).toLocaleString(),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                            onClick={() => router.get(route('courses.edit', {
                                id: row.getValue('id')
                            }))}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.delete(route('courses.destroy', {
                                id: row.getValue('id')
                            }))}
                        >
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]