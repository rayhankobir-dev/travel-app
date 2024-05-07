import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const sortOptions = {
  ft: "Featured",
  az: "A to Z",
  za: "Z to A",
  hl: "High to Low",
  lh: "Low to High",
};

export default function ListingArea() {
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("az");

  return (
    <section className="col-span-12 lg:col-span-9">
      <div className="flex justify-between gap-2">
        <p className="font-light text-sm">1362 results</p>
        <div className="inline-flex items-center gap-2 font-light text-sm">
          Sort by:
          <DropdownMenu>
            <DropdownMenuTrigger className="block p-0 focus:border-none outline-none">
              {sortOptions[sortBy]}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as keyof typeof sortOptions)
                }
              >
                <DropdownMenuRadioItem value="ft">
                  Featured
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="az">A to Z</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="za">Z to A</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hl">
                  High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lh">
                  Low to High
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 py-3">
        <PackageItem />
        <PackageItem />
      </div>
    </section>
  );
}

import Sport1 from "@/assets/sport-1.png";
import { ArrowRight, Clock, MapPin, Plane } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function PackageItem() {
  return (
    <Card className="grid md:flex justify-between rounded-2xl">
      <CardHeader className="min-w-fit relative p-3 ">
        <img src={Sport1} className="w-full max-h-48 rounded-xl" />
        <div className="absolute top-5 left-5 py-1.5 px-2 bg-orange-500 font-thin text-xs text-white rounded-lg">
          20 % OFF
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between px-3 md:px-5 pb-1.5 md:py-5">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <MapPin size={15} /> <span>Paris, France</span>
          </p>
          <h3 className="font-medium text-sm">
            Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine
            Tour
          </h3>
          <p className="font-thin text-sm">
            The Phi Phi archipelago is a must-visit while in Phuket, and this
            speedboat trip.
          </p>
        </div>

        <div className="inline-flex justify-between gap-2 font-thin text-sm py-1.5">
          <p>Best Price Guarantee</p>
          <p>Free Cancellation</p>
        </div>
      </CardContent>

      <Separator orientation="vertical" className="hidden md:block" />
      <Separator orientation="horizontal" className="md:hidden" />

      <CardFooter className="min-w-fit flex flex-col justify-between p-3 md:py-5 px-3 md:px-6">
        <div className="w-full grid grid-cols-2 md:flex md:flex-col gap-2">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <Clock size={15} /> 2 Days 1 Nights
          </p>
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <Plane size={15} /> Air
          </p>
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            Aviailable: <span>2 person</span>
          </p>
        </div>
        <p className="font-thin text-md py-3 lg:py-0">
          From <strong className="font-medium">$245</strong>
        </p>
        <Button
          variant="outline"
          className="w-full md:w-fit flex items-center  gap-1 rounded-xl border-orange-500 hover:bg-orange-50 text-orange-600 hover:text-orange-600"
        >
          View Details <ArrowRight size={15} />
        </Button>
      </CardFooter>
    </Card>
  );
}
