import { authAxios } from "@/api";
import BookingsCard from "@/components/bookings/booking-card";
import SEO from "@/components/ui/seo";
import SpinerLoading from "@/components/ui/spinner-loading";
import { Booking } from "@/types";
import { useEffect, useState } from "react";
import Empty from "@/assets/empty.svg";

export default function MyBookings() {
  const [loading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await authAxios.get("/bookings/my");
        setBookings(res.data.data.bookings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);
  return (
    <main className="max-w-7xl mx-auto mt-0">
      <section className="mt-7">
        <SEO title="My Bookings - GhureAshi" />
        <div className="faq-section h-48 flex justify-start items-end bg-gray-50 bg-opacity-20">
          <div className="max-w-7xl w-full mx-auto space-y-2  py-10 px-6 lg:px-0">
            <h1 className="font-semibold text-3xl">My Bookings</h1>
            <p className="font-light text-sm">
              Find our bookings history. And go to support for any help.
            </p>
          </div>
        </div>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center my-5">
            <SpinerLoading className="text-orange-500" />
          </div>
        ) : bookings.length > 0 ? (
          bookings.map((booking: Booking) => (
            <BookingsCard key={booking._id} booking={booking} />
          ))
        ) : (
          <div className="flex justify-center my-4">
            <img src={Empty} className="max-w-sm" />
          </div>
        )}
      </section>
    </main>
  );
}
