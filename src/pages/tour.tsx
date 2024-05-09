import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Dot,
  MapPin,
  Minus,
  PersonStanding,
  Plus,
  Star,
  User,
  Users,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import Tour1 from "@/assets/tour-1.png";
import Tour2 from "@/assets/tour-2.png";
import Tour3 from "@/assets/tour-3.png";
import Tour4 from "@/assets/tour-4.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dispatch, SetStateAction, useState } from "react";
import FeaturedSection from "@/components/home/featured-trip-section";

export default function SingleTour() {
  return (
    <Fragment>
      <TorHead />
      <ImageGallery />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-5 mt-10 px-6 lg:px-0">
        <TourDetails />
        <div className="hi-fit col-span-12 lg:col-span-3 order-1 lg:order-2 space-y-3">
          <BookingCard />
          <SupportCard />
        </div>
      </div>
      <FeaturedSection />
    </Fragment>
  );
}

function SupportCard() {
  return (
    <Card className="my-3">
      <CardHeader className="p-3.5">
        <CardTitle className="font-medium text-md mb-1">
          Do you need support?
        </CardTitle>
        <p className="font-light text-sm">
          You can check our customers frequently asked question hope you'll find
          our answer.
        </p>
      </CardHeader>
      <CardContent className="px-3.5 font-medium text-sm">
        Note: If you already booked a tour and you want to add more person
        please tell us our admin.
      </CardContent>
      <CardFooter className="px-3.5 pb-3.5">
        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
          Chat with admin
        </Button>
      </CardFooter>
    </Card>
  );
}

function TorHead() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-0 mt-24 py-5 space-y-4">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-semibold text-3xl">
          Explore all things to do in Packege
        </h1>
      </div>
      <div className="flex gap-4">
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <Star size={15} /> 4.8 (234)
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <MapPin size={15} /> 4.8 (234)
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <User size={15} /> 23+ people
        </p>
      </div>
    </section>
  );
}

function ImageGallery() {
  return (
    <section className="h-fit max-w-7xl mx-auto px-6 lg:px-0">
      <div className="grid grid-cols-2 gap-2 ">
        <img src={Tour1} className="h-full" />
        <div className="h-full flex flex-col gap-2">
          <img src={Tour2} className="h-full" />
          <div className="grid grid-cols-2 gap-2">
            <img src={Tour3} className="h-full w-full" />
            <img src={Tour4} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Statstics() {
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 mb-10 gap-3">
      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <Clock size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Duration</h4>
          <p className="font-light text-sm">4 days</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <Users size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Group Size</h4>
          <p className="font-light text-sm">10 people</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <PersonStanding size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Age</h4>
          <p className="font-light text-sm">18-99 yrs</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <Calendar size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Tour duration</h4>
          <p className="font-light text-sm">May 23, 2024 - May 30, 2024</p>
        </div>
      </div>
    </section>
  );
}

function TourDetails() {
  return (
    <section className="max-w-7xl mx-auto col-span-12 lg:col-span-9 order-2 lg:order-1">
      <Statstics />
      <TourOverview />
      <TourHighLight />
      <Separator className="my-6" />
      <TourServices />
      <Separator className="my-6" />
      <TourTimeline />
      <Separator className="my-6" />
      <Faq />
    </section>
  );
}

function BookingCard() {
  const [personCount, setPersonCount] = useState<number>(1);

  const personPrice = 280;

  const subTotal = personCount * personPrice;
  const taxes = 0.1 * subTotal;
  const total = subTotal + taxes;

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
            <span className="h-fit border-b border-dashed"></span>
            <strong className="font-semibold">${subTotal}</strong>
          </p>
          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Taxes:
            <strong className="font-semibold">${taxes}</strong>
          </p>

          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Total:
            <span className="w-full h-fit border-b border-dashed"></span>
            <strong className="font-semibold">${total}</strong>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-lg">
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
}

function PersonCounter({
  label,
  price,
  count = 0,
  setCount,
}: {
  label: string;
  price: number;
  count?: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-between items-center gap-2">
      <p>
        {label} (<strong className="font-medium">${price}</strong>)
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          onClick={() =>
            setCount((prev: number) => (prev > 1 ? prev - 1 : prev))
          }
          className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black"
        >
          <Minus size={14} />
        </Button>
        <p>{count}</p>
        <Button
          onClick={() => setCount((prev: number) => prev + 1)}
          className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black"
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
}

function TourOverview() {
  return (
    <section>
      <h3 className="font-semibold text-xl">Tour Overview</h3>
      <p className="font-light text-sm">
        The Phi Phi archipelago is a must-visit while in Phuket, and this
        speedboat trip whisks you around the islands in one day. Swim over the
        coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at
        Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in "The
        Beach." Boat transfers, snacks, buffet lunch, snorkeling equipment, and
        Phuket hotel pickup and drop-off all included.
      </p>
    </section>
  );
}

function TourHighLight() {
  return (
    <section>
      <h3 className="font-medium text-md mt-5">Tour Highlights</h3>
      <ul className="flex flex-col font-light text-sm py-3">
        <li className="inline-flex items-center">
          <Dot />
          Experience the thrill of a speedboat to the stunning Phi Phi Islands
        </li>
        <li className="inline-flex items-center">
          <Dot />
          Be amazed by the variety of marine life in the archepelago
        </li>
        <li className="inline-flex items-center">
          <Dot />
          Enjoy relaxing in paradise with white sand beaches and azure turquoise
          water
        </li>
        <li className="inline-flex items-center">
          <Dot />
          Feel the comfort of a tour limited to 35 passengers
        </li>
        <li className="inline-flex items-center">
          <Dot />
          Catch a glimpse of the wild monkeys around Monkey Beach
        </li>
      </ul>
    </section>
  );
}

function TourServices() {
  return (
    <section>
      <h3 className="font-semibold text-xl">What's included</h3>
      <ul className="grid grid-cols-2 gap-y-2 gap-x-4 py-3">
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Local taxes
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Hotel pickup and drop-off by air-conditioned minivan
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          InsuranceTransfer to a private pier
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Soft drinks
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Towel
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Tips
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot className="min-w-fit" />
          Alcoholic Beverages
        </li>
      </ul>
    </section>
  );
}

function TourTimeline() {
  return (
    <section>
      <h3 className="font-semibold text-xl">Activities</h3>

      <div className="px-4 py-5">
        <ol className="relative border-s border-dashed border-orange-600">
          <li className="mb-10 ms-6">
            <div className="absolute w-6 h-6 bg-orange-600 rounded-full -start-3"></div>
            <h4 className="text-sm font-medium">
              Day 1: Pick up from Airport.
            </h4>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white rounded-full -start-2 border-2 border-orange-600"></div>
            <h4 className="text-sm font-medium">
              Day 1: Pick up from Airport.
            </h4>
            <p className="text-sm font-light max-w-xl py-1">
              All of the pages and components are first designed in Figma and we
              keep a parity between the two versions even as we update the
              project.
            </p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white rounded-full -start-2 border-2 border-orange-600"></div>
            <h4 className="text-sm font-medium">
              Day 1: Pick up from Airport.
            </h4>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-6 h-6 bg-orange-600 rounded-full -start-3 border border-white"></div>
            <h4 className="text-sm font-medium leading-none">
              Day 7: Drop to destination.
            </h4>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section>
      <h3 className="font-semibold text-xl">FAQ</h3>
      <div className="py-3">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border rounded-xl px-3">
            <AccordionTrigger className="hover:no-underline">
              Can I get the refund?
            </AccordionTrigger>
            <AccordionContent className="font-light">
              Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet
              Lunch by Big Boat cancellation policy: For a full refund, cancel
              at least 24 hours in advance of the start date of the experience.
              Discover and book Phang Nga Bay Sea Cave Canoeing & James Bond
              Island w/ Buffet Lunch by Big Boat
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-xl px-3">
            <AccordionTrigger className="hover:no-underline">
              Can I change the travel date?
            </AccordionTrigger>
            <AccordionContent className="font-light">
              No, You can't change the travel date. We are fixed the tour plan
              including a pre-planed schedule.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
