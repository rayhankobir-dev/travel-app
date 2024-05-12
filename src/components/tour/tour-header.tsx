import { MapPin, Star, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Props {
  title?: string;
  place: string;
  rating: number;
  totalRatedUser: number;
  totalPeopleEnrolled: number;
}
export default function TorHeader({
  title = "Explore all things to do in Packege",
  place,
  rating,
  totalRatedUser,
  totalPeopleEnrolled,
}: Props) {
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
          <Star size={15} /> {rating} ({totalRatedUser})
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <MapPin size={15} /> {place}
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <User size={15} /> {totalPeopleEnrolled}+ people
        </p>
      </div>
    </section>
  );
}
