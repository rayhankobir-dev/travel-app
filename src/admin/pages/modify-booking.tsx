/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbView from "@/components/ui/custom-breadcrumb";
import { IoMdBook } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { authAxios } from "@/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Booking } from "@/types";
import { Copy, Users } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import SpinerLoading from "@/components/ui/spinner-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ModifyBooking() {
  const [isFetching, setIsFetching] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);

  const params = useParams();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await authAxios.get(`/bookings/${params.id}`);
        setBooking(res.data.data.booking);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchBooking();
  }, [params.id]);

  return (
    <main>
      <section className="border-b">
        <BreadcrumbView className="px-3 py-3" />
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-3">
          <div>
            <h2 className="font-medium text-2xl">Edit Bookings</h2>
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
              <Link to="/dashboard/trips/bookings">
                <IoMdBook size={15} /> Go Booking
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="p-3">
        {isFetching ? (
          <SpinerLoading />
        ) : (
          booking && <ModifyBookingForm booking={booking} />
        )}
      </section>
    </main>
  );
}

const schema = Yup.object().shape({
  totalPerson: Yup.number()
    .required("Total person required")
    .integer("Must be posetive integer")
    .min(1, "Must be grater than or equal one")
    .typeError("This filed must be a number"),
  totalCost: Yup.number().optional(),
});

function ModifyBookingForm({ booking }: { booking: Booking }) {
  const [response, setResponse] = useState<any>(null);

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      totalCost: booking.totalCost,
      totalPerson: booking.totalPerson,
    },
  });

  const onSubmit = async (payload: any) => {
    try {
      const res = await authAxios.put("/bookings", {
        bookingId: booking._id,
        totalPerson: payload.totalPerson,
      });
      setResponse(res.data.data);
      form.reset();
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(
        error.response.data.message || error.message || "Failed to save"
      );
    }
  };

  return (
    <div>
      <Card className="p-3 my-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-end gap-2 px-1 w-full relative"
          >
            <div className="w-full grid grid-cols-2 items-start gap-2 ">
              <FormField
                name="totalPerson"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <Label>Total person *</Label>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          autoComplete="true"
                          className="pl-12 h-12 rounded-xl"
                          placeholder="Total person"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                name="totalCost"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <Label>Total cost(Auto generated)</Label>
                    <FormControl>
                      <div className="relative">
                        <FaBangladeshiTakaSign className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          autoComplete="true"
                          readOnly={true}
                          className="pl-12 h-12 rounded-xl"
                          placeholder="Total cost"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              size="lg"
              className="h-11 gap-2 px-10 rounded-lg bg-orange-600 hover:bg-orange-500"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </Card>

      {response?.paymentLink && <PaymentLink link={response?.paymentLink} />}
    </div>
  );
}

function PaymentLink({ link }: { link: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start gap-2">
        <div>
          <CardTitle>Extra Payment Required</CardTitle>
          <CardDescription>
            Please send this link to the customer to pay extra amount for
            modification.
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          className="h-fit p-2 flex gap-2"
          onClick={() => navigator.clipboard.writeText(link)}
        >
          <Copy size={16} />
          Copy
        </Button>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="font-light">
          <span className="font-medium">Payment Link:</span> {link}
        </p>
      </CardContent>
    </Card>
  );
}
