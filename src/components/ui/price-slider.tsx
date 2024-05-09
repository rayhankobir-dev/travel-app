import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

interface PriceSliderProps extends SliderProps {
  className?: string;
  maxPrice: number;
  price: number;
  setPrice: (value: number) => void;
}

export function PriceSlider({
  className,
  maxPrice,
  price,
  setPrice,
}: PriceSliderProps) {
  const [value, setValue] = useState(
    Math.abs((price / (maxPrice - price)) * 100)
  );
  const defaultPercentage = Math.abs((price / (maxPrice - price)) * 100);

  const handleSliderChange = (value: number[]) => {
    setValue(value[0]);
    const blendedPrice = (value[0] / 100) * maxPrice;
    setPrice(blendedPrice);
  };

  return (
    <Fragment>
      <Slider
        defaultValue={[defaultPercentage]}
        max={100}
        step={1}
        className={cn("w-full", className)}
        onValueChange={handleSliderChange}
      />
      <div className="flex justify-between font-normal text-sm mt-2">
        <p>BDT {price.toFixed(2)}</p>
        <p>BDT {maxPrice.toFixed(2)}</p>
      </div>
    </Fragment>
  );
}
