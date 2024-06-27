/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ComboBox } from "@/components/ui/combobox";
import { RangeDatePicker } from "@/components/ui/range-date-picker";
import { DateRange } from "react-day-picker";
import { format, parse } from "date-fns";
import { PriceSlider } from "@/components/ui/price-slider";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicAxios } from "@/api";
import { useSearchParams } from "react-router-dom";

export default function FilterOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [price, setPrice] = useState<number>(
    Number(searchParams.get("price")) || 2500
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const from = searchParams.get("from")
      ? parse(searchParams.get("from"), "yyyy-MM-dd", new Date())
      : new Date();
    const to = searchParams.get("to")
      ? parse(searchParams.get("to"), "yyyy-MM-dd", new Date())
      : undefined;
    return { from, to };
  });

  async function fetchLocations() {
    const res = await publicAxios.get("/locations");
    return res.data.data.locations;
  }

  useEffect(() => {
    async function fetchLocations() {
      const res = await publicAxios.get("/locations");
      const locations = res.data.data.locations;
      const locationName = searchParams.get("location");
      if (locationName) {
        const location = locations.find((loc) =>
          loc.location.includes(locationName)
        );
        setSelectedLocation(location);
      }
      return locations;
    }
    fetchLocations();
  }, [searchParams]);

  useEffect(() => {
    if (selectedLocation) {
      searchParams.set("location", selectedLocation.location);
    }

    if (date?.from) {
      searchParams.set("from", format(date.from, "yyyy-MM-dd"));
    }

    if (date?.to) {
      searchParams.set("to", format(date.to, "yyyy-MM-dd"));
    }

    searchParams.set("maxPrice", price.toString());
    setSearchParams(searchParams);
  }, [selectedLocation, date, price, searchParams, setSearchParams]);

  const clearFilter = () => {
    searchParams.delete("location");
    searchParams.delete("from");
    searchParams.delete("to");
    searchParams.delete("maxPrice");
    setSearchParams(searchParams);
  };

  return (
    <Card className="relative h-fit max-h-fit col-span-12 lg:col-span-3 overflow-hidden rounded-xl">
      <Button
        onClick={clearFilter}
        className="absolute top-1 right-1 w-8 h-8 p-2 bg-white text-orange-600 border-black"
      >
        <FilterX />
      </Button>
      <CardHeader className="space-y-3 bg-orange-600 text-white">
        <div className="space-y-1">
          <p className="font-light text-sm">Where you travel?</p>
          <ComboBox
            label="location"
            value="_id"
            options={fetchLocations}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          >
            <Button
              variant="outline"
              className="w-full justify-start font-light text-black"
            >
              {selectedLocation ? (
                <>{selectedLocation?.location}</>
              ) : (
                <>Select travel location</>
              )}
            </Button>
          </ComboBox>
        </div>
        <div className="space-y-1">
          <p className="font-light text-sm">When are you traveling?</p>
          <RangeDatePicker date={date} setDate={setDate}>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "min-w-fit justify-start text-left text-black font-light rounded-lg",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
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
                <span>Pick a date</span>
              )}
            </Button>
          </RangeDatePicker>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="py-2">
          <h4 className="font-medium text-sm">Filter price</h4>
          <div className="mt-2.5 py-2">
            <PriceSlider maxPrice={25000} price={price} setPrice={setPrice} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
