import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Booking, Transaction } from "@/types";
import { User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BookingsCard({ booking }: { booking: Booking }) {
  const [reveal, setReveal] = useState(false);
  return (
    <Card
      className="mt-2 p-2 cursor-pointer"
      onClick={() => setReveal((prev) => !prev)}
    >
      <CardHeader className="flex flex-row items-start justify-between p-0">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-md mt-1.5"
            src={booking.tour.images[0].url}
          />
          <h3 className="max-w-sm font-light">{booking.tour.title}</h3>
        </div>

        <div className="">
          <div className="flex flex-col justify-end">
            <p className="flex items-center font-light text-sm">
              <User size={14} />
              {booking.totalPerson}
              <span className="mx-2">x</span>
              <FaBangladeshiTakaSign size={12} />
              {booking.perPersonCost.toFixed(2)}
            </p>
            <p className="flex items-center justify-between gap-1.5 font-light text-sm">
              Tax: <span>{booking.appliedTaxAmount.toFixed(2)}</span>
            </p>
            <div className="w-full border-t border-dashed"></div>
            <p className="flex justify-between text-sm text-right">
              <span>Total:</span> <span>${booking.totalCost.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardFooter
        className={cn(
          "flex flex-col items-start gap-1 p-0 py-2.5",
          reveal ? "block" : "hidden"
        )}
      >
        <h3 className="font-medium mb-3">Transactions:</h3>
        {booking.txHistory.map((transaction: Transaction) => (
          <History key={transaction._id} transaction={transaction} />
        ))}
      </CardFooter>
    </Card>
  );
}

function History({ transaction }: { transaction: Transaction }) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-5 font-thin text-sm border-b border-t py-2 px-1"
      )}
    >
      <p className="">
        <strong>Bank Id:</strong> {transaction.bankTransactionId}
      </p>
      <p>
        <strong>Type:</strong> {transaction.transactionType}
      </p>
      <p>
        <strong>Currency:</strong> {transaction.currency}
      </p>
      <p>
        <strong>Amount:</strong> {transaction.amount.toFixed(2)}
      </p>
      <p>
        <strong>Payment Method:</strong> {transaction.paymentMethod}
      </p>
    </div>
  );
}
