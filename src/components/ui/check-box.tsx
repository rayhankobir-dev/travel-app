import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
interface Props {
  id: string;
  label: string;
  value: string;
}
export function CheckboxInput({ id, label }: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <label
        htmlFor={id}
        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
