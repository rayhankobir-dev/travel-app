import { authAxios } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import SpinerLoading from "@/components/ui/spinner-loading";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Refunds() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authAxios.get("/transactions?type=refund");
        setTransactions(res.data.transactions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
        <div className="">{row.getValue("bankTransactionId")}</div>
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
      accessorKey: "refundReason",
      header: () => <div className="text-center">Reason</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left text-nowrap  font-light text-xs">
            {row.getValue("refundReason")}
          </div>
        );
      },
    },
    {
      accessorKey: "refundRefId",
      header: () => <div className="text-nowrap">Ref ID</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("refundRefId")}
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
  ];
  return (
    <main className="h-full flex flex-col gap-2">
      <section className="border-b">
        <Breadcrumb className="px-3 py-3" />
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-3">
          <div>
            <h2 className="font-medium text-2xl">All Refunds</h2>
            <p className="font-light text-sm">
              To refund or modify search by booking id.
            </p>
          </div>
        </div>
      </section>
      <section className="flex-1 px-3 overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center mt-5">
            <SpinerLoading className="text-orange-500" />
          </div>
        ) : (
          <div className="h-full">
            <DataTable
              columns={columns}
              data={transactions}
              searchBy="transactionId"
            ></DataTable>
          </div>
        )}
      </section>
    </main>
  );
}
