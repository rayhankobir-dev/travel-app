/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = "ft" | "az" | "za" | "hl" | "lh";

interface Props {
  options: Record<SortOption, string>;
  selected: SortOption;
  setSelected: (value: SortOption) => void;
}

export default function SortOptions({ options, selected, setSelected }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="block p-0 focus:border-none outline-none">
        {options[selected]}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selected}
          onValueChange={(value: any) => setSelected(value)}
        >
          {Object.entries(options).map(([key, label]) => (
            <DropdownMenuRadioItem key={key} value={key as SortOption}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
