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
  Clock,
  Dot,
  Languages,
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

export default function SingleTour() {
  return (
    <Fragment>
      <TorHead />
      <ImageGallery />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 mt-10">
        <TourDetails />
        <BookingCard />
      </div>
    </Fragment>
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
    <section className="max-w-7xl mx-auto h-fit">
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
    <section className="max-w-7xl mx-auto grid grid-cols-4 mb-10">
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
          <Languages size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Languages</h4>
          <p className="font-light text-sm">English, Japanese</p>
        </div>
      </div>
    </section>
  );
}

function TourDetails() {
  return (
    <section className="max-w-7xl mx-auto col-span-9">
      <Statstics />
      <h3 className="font-semibold text-xl">Tour Overview</h3>
      <p className="font-light text-sm">
        The Phi Phi archipelago is a must-visit while in Phuket, and this
        speedboat trip whisks you around the islands in one day. Swim over the
        coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at
        Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in "The
        Beach." Boat transfers, snacks, buffet lunch, snorkeling equipment, and
        Phuket hotel pickup and drop-off all included.
      </p>

      <h3 className="font-medium text-md mt-5">Tour Highlights</h3>
      <ul className="flex flex-col font-light text-sm">
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

      <Separator className="my-6" />

      <h3 className="font-semibold text-xl">What's included</h3>
      <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Local taxes
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Hotel pickup and drop-off by air-conditioned minivan
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          InsuranceTransfer to a private pier
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Soft drinks
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Towel
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Tips
        </li>
        <li className="inline-flex items-center font-light text-sm">
          <Dot />
          Alcoholic Beverages
        </li>
      </ul>

      <Separator className="my-6" />

      <h3 className="font-semibold text-xl">Itinerary</h3>
      <div className="py-3 pl-3">
        <ol className="relative border-s border-orange-600 border-dashed">
          <li className="mb-8 ms-6">
            <div className="absolute w-6 h-6 bg-orange-600 rounded-full  -start-3 border border-orange-500 "></div>
            <p className="font-light text-sm pt-0.5">Day 1: Airport Pick Up</p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white border-orange-600 border-2 rounded-full  -start-2"></div>
            <p className="font-light text-sm pt-0.5">Day 2: Airport Pick Up</p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white border-orange-600 border-2 rounded-full  -start-2"></div>
            <p className="font-light text-sm pt-0.5">
              Day 3: Massage & Overnight Train
            </p>
            <p className="max-w-lg font-thin text-sm">
              Like on all of our trips, we can collect you from the airport when
              you land and take you directly to your hotel. The first Day is
              just a check-in Day so you have this freedom to explore the city
              and get settled in.
            </p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white border-orange-600 border-2 rounded-full  -start-2"></div>
            <p className="font-light text-sm pt-0.5">
              Day 4: Khao Sok National Park
            </p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white border-orange-600 border-2 rounded-full  -start-2"></div>
            <p className="font-light text-sm pt-0.5">
              Day 5: Travel to Koh Phangan
            </p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-4 h-4 bg-white border-orange-600 border-2 rounded-full  -start-2"></div>
            <p className="font-light text-sm pt-0.5">
              Day 6: Morning Chill & Muay Thai Lesson
            </p>
          </li>
          <li className="mb-10 ms-6">
            <div className="absolute w-6 h-6 bg-orange-600 rounded-full  -start-3 border border-orange-500 "></div>
            <p className="font-light text-sm pt-0.5">Day 7: Island Boat Trip</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

function BookingCard() {
  return (
    <Card className="col-span-3 h-fit p-4">
      <CardHeader className="p-0">
        <CardTitle className="font-medium text-md mb-1">Booking Here</CardTitle>
      </CardHeader>
      <CardContent className="p-0 font-light text-sm space-y-3 py-2">
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-2">
            <p>Adult (18+ years) $282.00</p>
            <div className="flex items-center gap-1.5">
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Minus size={14} />
              </Button>
              <p>4</p>
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p>Youth (13-17 years) $168.00</p>
            <div className="flex items-center gap-1.5">
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Minus size={14} />
              </Button>
              <p>4</p>
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p>Children (0-12 years) $80.00</p>
            <div className="flex items-center gap-1.5">
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Minus size={14} />
              </Button>
              <p>4</p>
              <Button className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black">
                <Plus size={14} />
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2 mb-5">
          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Sub Total:
            <span className="h-fit border-b border-dashed"></span>
            <strong className="font-semibold">$560</strong>
          </p>
          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Taxes:
            <strong className="font-semibold">$30</strong>
          </p>

          <p className="w-full inline-flex justify-between items-center gap-2 font-medium text-sm px-1">
            Total:
            <span className="w-full h-fit border-b border-dashed"></span>
            <strong className="font-semibold">$590</strong>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-5">
        <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-lg">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
}
