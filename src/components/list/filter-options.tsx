/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ComboBox } from "../ui/combobox";
import { RangeDatePicker } from "../ui/range-date-picker";
import { Separator } from "../ui/separator";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { CheckboxGroup, CheckboxOption } from "./checkbox-group";
import { PriceSlider } from "../ui/price-slider";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Location = {
  value: string;
  label: string;
};

export const locations: Location[] = [
  {
    value: "dhaka",
    label: "Dhaka",
  },
  {
    value: "sylhet",
    label: "Sylhet",
  },
  {
    value: "rajshahi",
    label: "Rajshahi",
  },
  {
    value: "cumilla",
    label: "Cumilla",
  },
  {
    value: "bogura",
    label: "Bogura",
  },
];

const tourTypes: CheckboxOption[] = [
  { id: "nature", label: "Nature Tours", value: "nature" },
  { id: "adventure", label: "Adventure Tours", value: "adventure" },
  { id: "cultural", label: "Cultural Tours", value: "cultural" },
  { id: "food", label: "Food Tours", value: "food" },
  { id: "cruises", label: "Cruises Tours", value: "cruises" },
  { id: "city", label: "City Tours", value: "city" },
];

const durations: CheckboxOption[] = [
  { id: "300", label: "Below 3000", value: "3000" },
];

export default function FilterOptions() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [selectedTourType, setSelectedTourType] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(2500);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  return (
    <Card className="col-span-12 lg:col-span-3 overflow-hidden rounded-xl">
      <CardHeader className="space-y-3 bg-orange-600 text-white">
        <div className="space-y-1">
          <p className="font-light text-sm">Where you travel?</p>
          <ComboBox
            options={locations}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          >
            <Button
              variant="outline"
              className="w-full justify-start font-light text-black"
            >
              {selectedLocation ? (
                <>{selectedLocation.label}</>
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
        <div className="py-2 space-y-2">
          <h4 className="font-medium text-sm">Tour Type</h4>
          <CheckboxGroup
            options={tourTypes}
            checkedValues={selectedTourType}
            setCheckedValues={setSelectedTourType}
          />
        </div>
        <Separator />
        <div className="py-2">
          <h4 className="font-medium text-sm">Filter price</h4>
          <div className="mt-2.5 py-2">
            <PriceSlider maxPrice={25000} price={price} setPrice={setPrice} />
          </div>
        </div>
        <Separator />

        <div className="py-2 space-y-3">
          <h4 className="font-medium text-sm">Duration</h4>
          <CheckboxGroup
            options={durations}
            checkedValues={selectedDurations}
            setCheckedValues={setSelectedDurations}
          />
        </div>
      </CardContent>
    </Card>
  );
}
