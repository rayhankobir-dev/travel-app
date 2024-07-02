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
import { Transaction } from "@/types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Transations() {
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authAxios.get("/transactions?type=payment");
        setTransactions(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  const columns: ColumnDef<Transaction>[] = [
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
      accessorKey: "transactionId",
      header: () => <div>Transaction ID</div>,
      cell: ({ row }) => (
        <div className="uppercase text-nowrap">
          {row.getValue("transactionId")}
        </div>
      ),
    },
    {
      accessorKey: "bankTransactionId",
      header: () => <div>Bank ID</div>,
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("bankTransactionId")}</div>
      ),
    },
    {
      accessorKey: "transactionType",
      header: () => <div className="text-nowrap">Transaction Type</div>,
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("transactionType")}</div>
      ),
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("currency")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "storeAmount",
      header: () => <div className="text-nowrap">Net Amount</div>,
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("storeAmount")}</div>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: () => <div className="text-nowrap">Payment Method</div>,
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("paymentMethod")}</div>
      ),
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
      accessorKey: "createdAt",
      header: () => (
        <div className="text-center text-nowrap">Transaction At</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {format(row.getValue("createdAt"), "PP")}
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
                Copy Bank Id
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
            <h2 className="font-medium text-2xl">All Payments</h2>
            <p className="font-light text-sm">
              To refund or modify search by booking id.
            </p>
          </div>
        </div>
      </section>
      <section className="px-3">
        <DataTable
          columns={columns}
          data={transactions}
          searchBy="transactionId"
        ></DataTable>
      </section>
    </main>
  );
}
