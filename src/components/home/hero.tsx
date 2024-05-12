import { locations, Location } from "../tour-grid/filter-options";
import { RangeDatePicker } from "@/components/ui/range-date-picker";
import { Separator } from "@/components/ui/separator";
import { ComboBox } from "@/components/ui/combobox";
import { Clock, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <>
      <section className="hero-section w-full h-[550px]">
        <div className="max-w-7xl h-full mx-auto pt-14 flex justify-start items-center">
          <div className="py-3 px-6 lg:px-0">
            <h1 className="font-medium text-4xl lg:text-5xl text-left">
              Travel Memories <br />
              You'll Never
              <span className="text-orange-600"> Forget</span>
            </h1>
            <p className="max-w-md font-thin text-sm px-2 py-1.5">
              From local escapes to far-flung adventures, find what makes you
              happy anytime, anywhere
            </p>

            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 border rounded-2xl bg-white shadow-md mt-8 py-3 px-4">
              <div className="flex gap-1 px-3 min-w-32">
                <span className="w-12 h-12 inline-flex justify-center items-center rounded-full bg-slate-50 text-orange-500">
                  <Map />
                </span>
                <div className="flex flex-col text-sm">
                  <h5>Where?</h5>
                  <ComboBox
                    options={locations}
                    selected={location}
                    setSelected={setLocation}
                  >
                    <p className="w-full justify-start font-thin">
                      {location ? (
                        <>{location.label}</>
                      ) : (
                        <>Search your travel location</>
                      )}
                    </p>
                  </ComboBox>
                </div>
              </div>
              <Separator className="lg:hidden opacity-50" />
              <div className="flex gap-1 px-3">
                <span className="w-12 h-12 inline-flex justify-center items-center rounded-full bg-slate-50 text-orange-500">
                  <Clock />
                </span>
                <div className="flex flex-col text-sm">
                  <h5>When?</h5>
                  <RangeDatePicker date={date} setDate={setDate}>
                    <p
                      id="date"
                      className={cn(
                        "min-w-fit justify-start text-left text-black font-thin rounded-lg",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick your travel date</span>
                      )}
                    </p>
                  </RangeDatePicker>
                </div>
              </div>

              <Button className="h-12 w-full lg:w-12 p-2 rounded-xl lg:rounded-full text-white bg-orange-600 hover:bg-orange-500 duration-300">
                <Link to="/list" className="inline-flex items-center gap-3">
                  <p className="lg:hidden text-lg font-medium">Find</p>
                  <Search />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
