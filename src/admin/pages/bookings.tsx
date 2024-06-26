import { authAxios } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IoMdBook } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Bookings() {
  const [bookings, setBookings] = useState<User[] | []>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authAxios.get("/bookings");
        setBookings(res.data.data.bookings);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

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
      accessorKey: "_id",
      header: "Booking ID",
      cell: ({ row }) => <div className="uppercase">{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "tx",
      header: () => <div className="text-left">Transaction ID</div>,
      cell: ({ row }) => <div className="">{row.getValue("tx")}</div>,
    },
    {
      accessorKey: "user",
      header: () => <div className="text-left">User</div>,
      cell: ({ row }) => {
        return <div className="">{row.getValue("user").fullName}</div>;
      },
    },
    {
      accessorKey: "user",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => {
        return <div className="">{row.getValue("user").email}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            <Badge
              className={cn(
                row.getValue("status") == "SUCCESS"
                  ? "bg-green-100 text-green-500"
                  : "bg-rose-100 text-rose-500"
              )}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "totalPerson",
      header: () => <div className="text-center text-nowrap">Total Person</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("totalPerson")}
          </div>
        );
      },
    },
    {
      accessorKey: "perPersonCost",
      header: () => <div className="text-center text-nowrap">Person Cost</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("perPersonCost")}
          </div>
        );
      },
    },
    {
      accessorKey: "totalCost",
      header: () => <div className="text-center">Amount</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("totalCost")}
          </div>
        );
      },
    },
    {
      accessorKey: "tax",
      header: () => <div className="text-center">Tax</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center text-nowrap font-medium">
            {row.getValue("tax")} %
          </div>
        );
      },
    },
    {
      accessorKey: "bookedAt",
      header: () => <div className="text-center">Booked At</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center text-nowrap font-medium">
            {format(row.getValue("bookedAt"), "PP")}
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user._id)}
              >
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
        <Breadcrumb className="px-3 py-3" />
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-3">
          <div>
            <h2 className="font-medium text-2xl">All Bookings</h2>
            <p className="font-light text-sm">
              To refund or modify search by booking id.
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              className="h-8 flex gap-1.5 px-2 font-normal text-sm bg-orange-50 border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600 rounded-md"
              asChild
            >
              <Link to="/">
                <IoMdBook size={15} /> Create booking
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="px-3">
        <DataTable columns={columns} data={bookings} searchBy="_id"></DataTable>
      </section>
    </main>
  );
}
