/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { BiSolidOffer } from "react-icons/bi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { user }: any = useAuth();

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
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="w-full h-14 inline-flex items-center gap-2 border-b px-4 text-orange-600"
            >
              <img src={Logo} alt="Travella" />
              <p className="italic font-semibold text-lg">Travella</p>
            </Link>
            <div className="h-[80%] overflow-y-scroll flex flex-col justify-between py-2 px-4">
              <div className="">
                <NavLink
                  end={true}
                  to="/"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-orange-600",
                      isActive ? "text-orange-700" : "text-black"
                    )
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/privacy-policy"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-orange-600",
                      isActive ? "text-orange-700" : "text-black"
                    )
                  }
                >
                  <span>Privacy & Policy</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/faq"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:text-orange-600",
                      isActive ? "text-orange-700" : "text-black"
                    )
                  }
                >
                  <span>FAQ's</span>
                </NavLink>

                {!user && (
                  <div className="flex gap-1.5 px-4 mt-5">
                    <NavLink
                      onClick={() => setOpen(false)}
                      to="/login"
                      className="w-full md:w-fit px-10 py-2  text-orange-500 rounded-full border border-orange-500 text-center duration-500"
                    >
                      Sign up
                    </NavLink>

                    <NavLink
                      onClick={() => setOpen(false)}
                      to="/login"
                      className="w-full md:w-fit px-10 py-2 bg-orange-600 hover:bg-orange-500 rounded-full text-white text-center duration-500"
                    >
                      Login
                    </NavLink>
                  </div>
                )}
              </div>
              <div>
                <Card className="bg-orange-500 text-white py-4 px-4">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 mb-3">
                      <BiSolidOffer size={40} className="min-w-fit" />
                      <h1 className="font-medium text-2xl">
                        Friday Sale 10% OFF
                      </h1>
                    </div>
                    <p className="font-light text-sm">
                      Get your 10% off within next friday. You can checkout our
                      regular package as well .
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 mt-4">
                    <Button className="bg-white text-orange-600">
                      Claim offer
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
