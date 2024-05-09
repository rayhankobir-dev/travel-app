import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Location = {
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

export function LocationComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <p
          role="combobox"
          aria-expanded={open}
          aria-label="Select location"
          className="w-full justify-between font-thin tex-sm"
        >
          {value
            ? locations.find((location) => location.value === value)?.label
            : "Search destinations"}
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command aria-disabled={false}>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}