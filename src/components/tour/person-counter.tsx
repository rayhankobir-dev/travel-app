import { Dispatch, SetStateAction } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

export default function PersonCounter({
  label,
  price,
  count = 0,
  setCount,
}: {
  label: string;
  price: number;
  count?: number;
  setCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-between items-center gap-2">
      <p className="flex items-center">
        {label} (
        <strong className="flex items-center font-medium">
          <FaBangladeshiTakaSign size={13} /> {price}
        </strong>
        )
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          onClick={() =>
            setCount((prev: number) => (prev > 1 ? prev - 1 : prev))
          }
          className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black"
        >
          <Minus size={14} />
        </Button>
        <p>{count}</p>
        <Button
          onClick={() => setCount((prev: number) => prev + 1)}
          className="w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 border p-0 m-0 text-black"
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
}
