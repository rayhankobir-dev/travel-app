import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxOption {
  id: string;
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  checkedValues: string[];
  setCheckedValues: (value: string[]) => void;
}

export function CheckboxGroup({ options }: CheckboxGroupProps) {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const initialOptions = options.slice(0, 5);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const toggleCheckbox = (value: string) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  const toggleShowMore = () => {
    setShowAllOptions(!showAllOptions);
  };

  return (
    <div className="py-2 space-y-2">
      <h4 className="font-medium text-sm">Tour Type</h4>
      <div className="space-y-3">
        {(showAllOptions ? options : initialOptions).map((option) => (
          <CheckboxInput
            key={option.id}
            id={option.id}
            value={option.value}
            label={option.label}
            isChecked={checkedValues.includes(option.value)}
            onChange={toggleCheckbox}
          />
        ))}
      </div>
      <p className="font-medium text-sm text-blue-900" onClick={toggleShowMore}>
        {showAllOptions ? "See less" : "See more"}
      </p>
    </div>
  );
}

interface CheckboxInputProps {
  id: string;
  label: string;
  value: string;
  isChecked: boolean;
  onChange: (value: string) => void;
}

function CheckboxInput({ id, label, value, onChange }: CheckboxInputProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onClick={() => {
          setChecked(!checked);
          onChange(value);
        }}
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
