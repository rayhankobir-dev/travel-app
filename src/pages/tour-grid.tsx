import FilterOptions from "@/components/tour-grid/filter-options";
import ListingArea from "@/components/tour-grid/list-area";
import SectionHeader from "@/components/tour-grid/section-header";
import SEO from "@/components/ui/seo";
import { Fragment } from "react/jsx-runtime";

export default function List() {
  return (
    <Fragment>
      <SEO title="Explore Our Tour Packages - GhureAshi" />
      <SectionHeader />
      <section className="max-w-7xl mx-auto grid lg:grid-cols-12 px-6 lg:px-0 gap-4">
        <FilterOptions />
        <ListingArea />
      </section>
    </Fragment>
  );
}
