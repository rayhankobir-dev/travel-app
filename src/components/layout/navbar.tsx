import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        console.log("User started scrolling");
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "w-full fixed top-0 left-0 z-[100] px-6 lg:px-0 py-3.5 duration-700",
        scrolled ? "bg-white border-b" : "bg-transparent border-none"
      )}
    >
      <nav className="max-w-7xl flex justify-between items-center gap-3 mx-auto">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-xl text-orange-500"
        >
          <img src={Logo} className="h-8" />
          Travela
        </NavLink>
        <p className="hidden lg:flex font-thin text-sm">
          Search destinations or activities
        </p>
        <ul className="hidden lg:flex items-center gap-2 font-light text-sm">
          <li>
            <NavLink to="/" className="px-2">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/activities" className="px-2">
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/activities" className="px-2">
              Destenation
            </NavLink>
          </li>
          <li>
            <NavLink to="/activities" className="px-2">
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="mx-3">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white duration-500"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
