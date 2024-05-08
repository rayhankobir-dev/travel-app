import FilterOptions from "@/components/list/filter-options";
import ListingArea from "@/components/list/list-area";
import SectionHead from "@/components/list/section-head";
import { Fragment } from "react/jsx-runtime";

export default function List() {
  return (
    <Fragment>
      <SectionHead />
      <section className="max-w-7xl mx-auto grid lg:grid-cols-12 px-6 lg:px-0 gap-4">
        <FilterOptions />
        <ListingArea />
      </section>
    </Fragment>
  );
}
