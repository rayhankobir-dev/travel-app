/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { authAxios } from "@/api";
import { User } from "@/types";
import BreadcrumbView from "@/components/ui/custom-breadcrumb";
import toast from "react-hot-toast";
import SpinerLoading from "@/components/ui/spinner-loading";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[] | []>([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authAxios.get("/user?role=user");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function deleteUser(id: string) {
    try {
      await authAxios.delete(`/user/${id}`);
      toast.success("User has been deleted");
      setUsers(users.filter((item) => item._id !== id));
    } catch (error: any) {
      toast.error("Failed to delete");
    }
  }

  const columns: ColumnDef<User>[] = [
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
      accessorKey: "fullName",
      header: "Full name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("fullName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-center">Role</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">{row.getValue("role")}</div>
        );
      },
    },
    {
      accessorKey: "age",
      header: () => <div className="text-center">Age</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("age") || "--"}
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">Phone</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("phone") || "--"}
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: () => <div className="text-center">Address</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("address") || "--"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => deleteUser(user._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <main className="h-full flex flex-col gap-2">
      <section className="border-b">
        <BreadcrumbView className="px-3 py-3" />
        <div className="flex flex-wrap justify-between gap-2 px-3 pb-3">
          <div>
            <h2 className="font-medium text-2xl">All customers</h2>
            <p className="font-light text-sm">Potentials customers are..</p>
          </div>
        </div>
      </section>
      <section className="px-3">
        {loading ? (
          <div className="flex justify-center mt-5">
            <SpinerLoading className="text-orange-500" />
          </div>
        ) : (
          <DataTable columns={columns} data={users} searchBy="email" />
        )}
      </section>
    </main>
  );
}
