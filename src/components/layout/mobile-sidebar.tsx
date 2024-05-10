/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MenuIcon, ShieldBan } from "lucide-react";
import { TbSoccerField, TbPlayFootball } from "react-icons/tb";
import { useEffect, useState } from "react";
import { PiSoccerBall } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 1024 ? setOpen(false) : setOpen(open);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon size={30} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full !px-0">
          <div className="-translate-y-14 h-screen overflow-hidden overflow-y-scroll space-y-4 py-8 ">
            <div className="w-full h-14 inline-flex items-center gap-2 border-b px-4 text-green-600">
              <PiSoccerBall size={25} />
              <p className="italic font-semibold text-lg">Soccer</p>
            </div>
            <div className="py-2">
              <div className="space-y-1">
                <NavLink
                  end={true}
                  to="/"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/videos/genre/mid-filder"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <TbSoccerField className="mr-2 h-4 w-4" />
                  <span>Mid Filder</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/videos/genre/defense"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <ShieldBan className="mr-2 h-4 w-4" />
                  <span>Difense</span>
                </NavLink>

                <NavLink
                  to="/videos/genre/striker"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <TbPlayFootball className="mr-2 h-4 w-4" />
                  <span>Striker</span>
                </NavLink>

                <div className="flex gap-1.5 px-4">
                  <NavLink
                    to="/login"
                    className="w-full md:w-fit px-10 py-3  text-orange-500 rounded-full border border-orange-500 text-center duration-500"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="w-full md:w-fit px-10 py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white text-center duration-500"
                  >
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
