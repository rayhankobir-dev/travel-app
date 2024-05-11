/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FeaturedSection from "@/components/home/featured-trip-section";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import {
  ClassifiedData,
  classifyWeather,
  groupByDate,
  weather,
  WeatherData,
} from "./wather";
import { cn } from "@/lib/utils";

const place = "Cox's Bazar";
export default function SingleTour() {
  useEffect(() => {
    // fetch(
    //   "https://api.openweathermap.org/data/2.5/forecast?q=Naogaon&units=metric&appid=e6de7be75ad5fce9bc74bcbee51c17bf"
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  }, []);
  return (
    <Fragment>
      <TorHead />
      <ImageGallery />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-5 mt-10 px-6 lg:px-0">
        <TourDetails />
        <div className="hi-fit col-span-12 lg:col-span-3 order-1 lg:order-2 space-y-3">
          <BookingCard />
          <WeatherCard
            weatherData={groupByDate(weather.list)}
            city={weather.city}
          />
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
        <Button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          asChild
        >
          <Link to="/support">Chat with admin</Link>
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
          <MapPin size={15} /> {place}
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
    <section className="h-fit max-h-[500px] overflow-hidden max-w-7xl mx-auto px-6 lg:px-0">
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
      <p className="flex items-center">
        {label} (
        <strong className="flex items-center font-medium">
          <FaBangladeshiTakaSign size={13} /> {price}
        </strong>
        )
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
      <ul className="grid lg:grid-cols-2 gap-y-2 gap-x-4 py-3">
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

import { CiTempHigh } from "react-icons/ci";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { TbTemperatureCelsius, TbTemperatureSun } from "react-icons/tb";
import { getTimeFromUnixTimestamp } from "@/lib/lib";
import { Link } from "react-router-dom";

const WeatherCard = ({
  weatherData,
  city,
}: {
  weatherData: any[];
  city: any;
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(weatherData[0]);
  const [classifiedWeather, setWeather] = useState<
    ClassifiedData | undefined
  >();

  useEffect(() => {
    setWeather(classifyWeather(selectedDate.data));
  }, [selectedDate]);

  const handleDateClick = (date: WeatherData) => {
    setSelectedDate(date);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 bg-orange-50">
        <div className="flex justify-around divide-x border-b overflow-hidden">
          {weatherData.map((item: any, index: number) => (
            <div
              key={index}
              className={cn(
                "w-full py-3.5 text-center text-xs font-medium cursor-pointer",
                selectedDate.day === item.day && "bg-orange-500 text-white"
              )}
              onClick={() => handleDateClick(item)}
            >
              {item.slug}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <div className="flex items-center gap-2 px-4 mb-3">
          <TbTemperatureSun size={28} />
          <p className="flex items-center gap-1 font-medium text-2xl">
            {selectedDate.data[0].main.temp.toFixed(1)} <TbTemperatureCelsius />
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src={`http://openweathermap.org/img/w/${selectedDate.data[0].weather[0].icon}.png`}
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-medium capitalize">
              {selectedDate.data[0].weather[0].main}
              {". "}
              {selectedDate.data[0].weather[0].description}
            </h2>
            <p className="text-xs font-light">
              The high will be {selectedDate.data[0].main.temp_max}°C, the low
              will be {selectedDate.data[0].main.temp_min}°C.
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <table className="w-full">
          <thead className="text-sm">
            <tr>
              <th>
                <p className="flex justify-center">
                  <CiTempHigh />
                </p>
              </th>
              <th className="px-1 font-medium">Morning</th>
              <th className="px-1 font-medium">Afternon</th>
              <th className="px-1 font-medium">Evening</th>
              <th className="px-1 font-medium">Night</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm font-light text-center h-6">
              <td className="uppercase font-medium py-2">Temp</td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.morning.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.morning.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.afternoon.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.afternoon.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.evening.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.evening.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.night.temp == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.night.temp}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
            </tr>
            <tr className="text-sm font-light text-center h-6">
              <td className="uppercase font-medium">Feels</td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.morning.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.morning.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td className="text-center">
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.afternoon.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.afternoon.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.evening.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.evening.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
              <td>
                <p className="inline-flex items-center gap-0.5">
                  {classifiedWeather?.night.feels_like == "" ? (
                    "-"
                  ) : (
                    <>
                      {classifiedWeather?.night.feels_like}
                      <TbTemperatureCelsius />
                    </>
                  )}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 divide-x px-3 py-0">
        <div className="flex items-center gap-2 py-1.5">
          <WiSunrise size={34} className="text-orange-500" />
          <div className="text-sm uppercase">
            <p className="font-medium">Sunraise</p>
            <p className="font-light">
              {getTimeFromUnixTimestamp(city.sunrise)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-1.5">
          <WiSunset size={34} className="text-orange-600" />
          <div className="text-sm uppercase">
            <p className="font-medium">Sunset</p>
            <p className="font-light">
              {getTimeFromUnixTimestamp(city.sunset)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

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
