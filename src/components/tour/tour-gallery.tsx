import { Image } from "@/types";

export default function ImageGallery({ images }: { images: Image[] }) {
  return (
    <section className="h-fit max-h-[500px] overflow-hidden max-w-7xl mx-auto px-6 lg:px-0">
      {images?.length > 0 && (
        <div className="h-full grid grid-cols-2 gap-2">
          <img
            src={images[0].url}
            className="h-full max-h-[500px] w-full rounded-tl-xl"
          />
          <div className="h-full flex flex-col overflow-hidden gap-2">
            <img
              src={images[1].url}
              className="h-full max-h-[250px] rounded-tr-xl"
            />
            <div className="h-full max-h-[250px] grid grid-cols-2 gap-2">
              <img src={images[2].url} className="h-full w-full" />
              <img src={images[3].url} className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
