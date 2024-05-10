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
import { Location } from "../list/filter-options";

interface Props {
  options: Location[];
  selected: Location | null;
  setSelected: (value: Location | null) => void;
  children: React.ReactElement;
}

export function ComboBox({ options, setSelected, children }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ItemList items={options} setOpen={setOpen} onSelect={setSelected} />
      </PopoverContent>
    </Popover>
  );
}

function ItemList({
  items,
  setOpen,
  onSelect,
}: {
  items: Location[];
  setOpen: (open: boolean) => void;
  onSelect: (location: Location | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter location..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              disabled={false}
              key={item.value}
              value={item.value}
              onSelect={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
