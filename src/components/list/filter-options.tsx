import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ComboBoxResponsive } from "../ui/combobox";
import { DatePickerWithRange } from "../ui/range-date-picker";
import { Separator } from "../ui/separator";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { CheckboxGroup, CheckboxOption } from "./checkbox-group";

export type Location = {
  value: string;
  label: string;
};

const locations: Location[] = [
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

const options: CheckboxOption[] = [
  { id: "nature", label: "Nature Tours", value: "nature" },
  { id: "adventure", label: "Adventure Tours", value: "adventure" },
  { id: "cultural", label: "Cultural Tours", value: "cultural" },
  { id: "food", label: "Food Tours", value: "food" },
  { id: "cruises", label: "Cruises Tours", value: "cruises" },
  { id: "city", label: "City Tours", value: "city" },
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

  return (
    <Card className="col-span-12 lg:col-span-3 overflow-hidden rounded-xl">
      <CardHeader className="space-y-3 bg-orange-600 text-white">
        <div className="space-y-1">
          <p className="font-light text-sm">Where you travel?</p>
          <ComboBoxResponsive
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className="space-y-1">
          <p className="font-light text-sm">When are you traveling?</p>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="py-2 space-y-2">
          <CheckboxGroup
            options={options}
            checkedValues={selectedTourType}
            setCheckedValues={setSelectedTourType}
          />
        </div>
        <Separator />
        <div className="py-2">
          <h4 className="font-medium text-sm">Filter price</h4>
        </div>
        <Separator />

        <div className="py-2">
          <h4 className="font-medium text-sm">Duration</h4>
        </div>
      </CardContent>
    </Card>
  );
}
