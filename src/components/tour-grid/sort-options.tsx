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
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export type SortOption = "az" | "za" | "hl" | "lh";

interface Props {
  options: Record<SortOption, string>;
  selected: SortOption;
  setSelected: (value: SortOption) => void;
}

export default function SortOptions({ options, selected, setSelected }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get("sort") as SortOption;
    if (sort) {
      setSelected(sort);
    }
  }, [searchParams, setSelected]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", selected);
    setSearchParams(params);
  }, [selected, searchParams, setSearchParams]);

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
