import Tour1 from "@/assets/tour-1.png";
import Tour2 from "@/assets/tour-2.png";
import Tour3 from "@/assets/tour-3.png";
import Tour4 from "@/assets/tour-4.png";

export default function ImageGallery() {
  return (
    <section className="h-fit max-h-[500px] overflow-hidden max-w-7xl mx-auto px-6 lg:px-0">
      <div className="grid grid-cols-2 gap-2 ">
        <img src={Tour1} className="h-full" />
        <div className="h-full flex flex-col gap-2">
          <img src={Tour2} className="h-full" />
          <div className="grid grid-cols-2 gap-2">
            <img src={Tour3} className="h-full w-full" />
            <img src={Tour4} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
