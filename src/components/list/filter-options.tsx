import { Card, CardContent, CardHeader } from "../ui/card";
import { CheckboxInput } from "../ui/check-box";
import { ComboBoxResponsive } from "../ui/combobox";
import { DatePickerWithRange } from "../ui/range-date-picker";
import { Separator } from "../ui/separator";

export default function FilterOptions() {
  return (
    <Card className="col-span-12 lg:col-span-3 overflow-hidden rounded-xl">
      <CardHeader className="space-y-3 bg-orange-600 text-white">
        <div className="space-y-1">
          <p className="font-light text-sm">Where you travel?</p>

          <ComboBoxResponsive />
        </div>
        <div className="space-y-1">
          <p className="font-light text-sm">When are you traveling?</p>
          <DatePickerWithRange />
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="py-2 space-y-2">
          <h4 className="font-medium text-sm">Tour Type</h4>
          <div className="space-y-3">
            <CheckboxInput id="type" label="Nature Tours" />
            <CheckboxInput id="type" label="Adventure Tours" />
            <CheckboxInput id="type" label="Cultural Tours" />
            <CheckboxInput id="type" label="Food Tours" />
            <CheckboxInput id="type" label="Cruises Tours" />
            <CheckboxInput id="type" label="City Tours" />
          </div>
          <p className="font-medium text-sm text-blue-900">See more</p>
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
