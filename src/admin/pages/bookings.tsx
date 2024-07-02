/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { IoMdBook } from "react-icons/io";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Booking } from "@/types";
import { authAxios } from "@/api";
import toast from "react-hot-toast";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[] | []>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authAxios.get("/bookings");
        setBookings(res.data.data.bookings);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  async function cancelBooking(id: string) {
    try {
      const res = await authAxios.put(`/bookings/cancel/${id}`);
      setBookings((prev) =>
        prev.map((item) => {
          if (item._id === res.data.data?.booking._id) {
            item = res.data.data?.booking;
          }
          return item;
        })
      );
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to cancel booking"
      );
    }
  }

  const columns: ColumnDef<Booking>[] = [
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
      accessorKey: "tour",
      header: () => <div className="text-left">Tour</div>,
      cell: ({ row }) => {
        return (
          <div className="min-w-[300px] flex items-center gap-2">
            <img
              className="max-w-12 rounded"
              src={row.original.tour.images[0].url}
            />
            {row.original.tour.title}
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: () => <div className="text-left">User</div>,
      cell: ({ row }) => {
        return <div className="">{row.original.user.fullName}</div>;
      },
    },
    {
      accessorKey: "user",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => {
        return <div className="">{row.original.user.email}</div>;
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
        const user = row.original.user;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Copy user email
              </DropdownMenuItem>
              {row.original.status === "SUCCESS" && (
                <>
                  <DropdownMenuItem className="text-blue-500" asChild>
                    <Link
                      to={`/dashboard/trips/bookings/modify/${row.original._id}`}
                    >
                      Modify Booking
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-orange-600"
                    onClick={() => {
                      cancelBooking(row.original._id);
                    }}
                  >
                    Cancel Booking
                  </DropdownMenuItem>
                </>
              )}
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
      <section className="px-3 overflow-y-scroll">
        <DataTable columns={columns} data={bookings} searchBy="_id"></DataTable>
      </section>
    </main>
  );
}
