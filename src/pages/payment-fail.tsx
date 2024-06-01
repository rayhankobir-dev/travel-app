import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoIosSad } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/ui/seo";

export function PaymentFailed() {
  return (
    <section className="min-h-[80vh] max-w-7xl flex items-center justify-center px-6 lg:px-0 mx-auto">
      <SEO title="Payment Successfull - GhureAshi" />
      <Card className="max-w-sm w-full mt-24 px-3 text-2xl font-semibold border-dashed lg:border-none shadow-none">
        <CardHeader>
          <div className="w-24 h-24 flex justify-center items-center bg-rose-100 rounded-full mx-auto">
            <IoIosSad size={80} className="text-rose-600" />
          </div>
        </CardHeader>
        <CardContent className="pt-3 px-2">
          <div className="max-w-sm mx-auto">
            <CardTitle className="text-center text-2xl font-medium">
              Payment Failed for Booking
            </CardTitle>
            <p className="text-center text-sm font-medium py-1.5">
              Payment failed to confirm your booking.
            </p>
            <p className="mt-4 font-light text-sm text-center lg:text-left">
              Please try again to book your trip. If you faced any problem with
              that please go to support.
              <Link
                to="/support"
                className="px-2 font-semibold text-orange-600"
              >
                Support
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-2 mt-4">
          <Button
            variant="outline"
            asChild
            className="w-full md:w-fit lg:px-10 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white mx-auto"
          >
            <Link to="/">Go home</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
