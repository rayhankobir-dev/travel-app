import * as React from "react";
import { Button } from "@/components/ui/button";
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

export function ComboBoxResponsive() {
  const [open, setOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] =
    React.useState<Location | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <LocationList setOpen={setOpen} onSelect={setSelectedLocation} />
      </PopoverContent>
    </Popover>
  );
}

function LocationList({
  setOpen,
  onSelect,
}: {
  setOpen: (open: boolean) => void;
  onSelect: (location: Location | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter location..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {locations.map((location) => (
            <CommandItem
              disabled={false}
              key={location.value}
              value={location.value}
              onSelect={() => {
                onSelect(location);
                setOpen(false);
              }}
            >
              {location.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
