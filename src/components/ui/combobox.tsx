import React from "react";
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

interface Props<T> {
  options: T[] | (() => Promise<T[]>);
  selected: T | null;
  setSelected: (value: T | null) => void;
  value: keyof T;
  label: keyof T;
  children: React.ReactElement;
}

export function ComboBox<T>({
  options,
  setSelected,
  label,
  value,
  children,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(false);
      try {
        if (typeof options === "function") {
          const resolvedOptions = await options();
          setItems(resolvedOptions);
        } else {
          setItems(options);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ItemList
          label={label}
          value={value}
          items={items}
          setOpen={setOpen}
          onSelect={setSelected}
          loading={loading}
          error={error}
        />
      </PopoverContent>
    </Popover>
  );
}

interface ItemListProps<T> {
  label: keyof T;
  value: keyof T;
  items: T[];
  setOpen: (open: boolean) => void;
  onSelect: (item: T | null) => void;
  loading: boolean;
  error: boolean;
}

function ItemList<T>({
  label,
  value,
  items,
  setOpen,
  onSelect,
  loading,
  error,
}: ItemListProps<T>) {
  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        {loading && <div>Loading...</div>}
        {(error || items.length == 0) && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {!loading && !error && (
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                disabled={false}
                key={String(item[value])}
                value={String(item[label])}
                onSelect={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {String(item[label])}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
