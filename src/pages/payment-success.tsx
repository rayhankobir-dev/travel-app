import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaymentSuccessImg from "@/assets/payment-success.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/ui/seo";

export function PaymentSuccess() {
  return (
    <section className="min-h-[80vh] max-w-7xl flex items-center justify-center px-6 lg:px-0 mx-auto">
      <SEO title="Payment Successfull - GhureAshi" />

      <Card className="max-w-sm w-full mt-24 px-3 text-2xl font-semibold border-dashed lg:border-none shadow-none">
        <CardHeader>
          <img src={PaymentSuccessImg} className="max-w-sm mx-auto" />
        </CardHeader>
        <CardContent className="pt-3 px-2">
          <div className="max-w-sm mx-auto">
            <CardTitle className="text-center text-2xl font-medium">
              Payment Successfull
            </CardTitle>
            <p className="text-center text-sm font-medium py-1.5">
              Your trip has been confirmed
            </p>
            <p className="mt-4 font-light text-sm text-center lg:text-left">
              Your bookings you'll found in your profile
              <Link
                to="/bookings"
                className="px-2 font-semibold text-orange-600"
              >
                Bookings
              </Link>
              . If you need customer support please go to support center.
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
