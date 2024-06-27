import { MapPin, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Location } from "@/types";

interface Props {
  title: string;
  location: Location;
  totalBooked: number;
}
export default function TorHeader({ title, location, totalBooked }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-0 mt-24 py-5 space-y-4">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-semibold text-3xl">{title}</h1>
      </div>
      <div className="flex gap-4">
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <MapPin size={15} /> {location?.location}
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <User size={15} /> {totalBooked}+ people
        </p>
      </div>
    </section>
  );
}
