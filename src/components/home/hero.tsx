import { Clock, Map, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="hero-section w-full h-[550px]">
        <div className="max-w-7xl h-full mx-auto pt-14 flex justify-start items-center">
          <div className="py-3 px-6 lg:px-0">
            <h1 className="font-medium text-5xl text-left">
              Travel Memories <br />
              You'll Never
              <span className="text-orange-600"> Forget</span>
            </h1>
            <p className="max-w-md font-thin text-sm px-2 py-1.5">
              From local escapes to far-flung adventures, find what makes you
              happy anytime, anywhere
            </p>

            <div className="flex justify-between items-center gap-3 border rounded-2xl bg-white shadow-md mt-8 py-3 px-4">
              <div className="flex gap-1 px-3">
                <span className="w-12 h-12 inline-flex justify-center items-center rounded-full bg-slate-50 text-orange-500">
                  <Map />
                </span>
                <div className="flex flex-col text-sm">
                  <h5>Where</h5>
                  <p className="font-thin">Search destinations</p>
                </div>
              </div>

              <div className="flex gap-1 px-3">
                <span className="w-12 h-12 inline-flex justify-center items-center rounded-full bg-slate-50 text-orange-500">
                  <Clock />
                </span>
                <div className="flex flex-col text-sm">
                  <h5>When</h5>
                  <p className="font-thin">February 05 ~ March 14</p>
                </div>
              </div>

              <Button className=" h-12 w-12 p-2 rounded-full text-white bg-orange-600 hover:bg-orange-500 duration-300">
                <Link to="/list">
                  <Search />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
