import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import PersonCounter from "./person-counter";
import { Separator } from "../ui/separator";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "../ui/button";
import { authAxios } from "@/api";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface Props {
  id?: string;
  personPrice?: number;
  tax?: number;
}

export default function BookingCard({ id, personPrice = 200, tax = 5 }: Props) {
  const [personCount, setPersonCount] = useState<number>(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const subTotal = personCount * personPrice;
  const taxes = (tax / 100) * subTotal;
  const total = subTotal + taxes;

  const handleOrder = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await authAxios.post("/bookings/make-payment", {
        tourId: id,
        totalPerson: personCount,
      });
      const { redirectUrl } = res.data.data;
      window.open(redirectUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="h-fit p-4">
      <CardHeader className="p-0">
        <CardTitle className="font-medium text-md mb-1">Booking Here</CardTitle>
      </CardHeader>
      <CardContent className="p-0 font-light text-sm space-y-3 py-2">
        <div className="space-y-3">
          <PersonCounter
            label="Per person"
            count={personCount}
            setCount={setPersonCount}
            price={personPrice}
          />
        </div>
        <Separator />
        <div className="space-y-2 mb-5">
          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Sub Total:
            <strong className="flex items-center font-semibold">
              <FaBangladeshiTakaSign size={13} /> {subTotal}
            </strong>
          </p>
          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Taxes:
            <strong className="flex items-center font-semibold">
              <FaBangladeshiTakaSign size={13} /> {taxes}
            </strong>
          </p>

          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Total:
            <span className="w-full h-fit border-b border-dashed"></span>
            <strong className="flex items-center font-semibold">
              <FaBangladeshiTakaSign size={13} /> {total}
            </strong>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <Button
          onClick={handleOrder}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-lg"
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
}
