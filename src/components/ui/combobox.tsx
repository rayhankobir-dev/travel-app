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
import { Location } from "../list/filter-options";

interface Props {
  locations: Location[];
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

export function ComboBoxResponsive({
  locations,
  selectedLocation,
  setSelectedLocation,
}: Props) {
  const [open, setOpen] = React.useState(false);

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
        <LocationList
          locations={locations}
          setOpen={setOpen}
          onSelect={setSelectedLocation}
        />
      </PopoverContent>
    </Popover>
  );
}

function LocationList({
  locations,
  setOpen,
  onSelect,
}: {
  locations: Location[];
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
