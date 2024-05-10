import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MobileSidebar } from "./mobile-sidebar";

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
        "w-full fixed top-0 left-0 z-10 px-6 lg:px-0 py-3.5 duration-700",
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

        <ul className="hidden lg:flex items-center gap-2 font-light text-sm">
          <li>
            <NavLink to="/" className="px-2">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/privacy-policy" className="px-2">
              Privacy & Policies
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className="px-2">
              FAQ's
            </NavLink>
          </li>
          {scrolled ? (
            <li>
              <ProfileOptions />
            </li>
          ) : (
            <AuthLinks />
          )}
        </ul>
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
      </nav>
    </header>
  );
}

export function AuthLinks() {
  return (
    <Fragment>
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
    </Fragment>
  );
}

function ProfileOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8">
          <AvatarFallback>CN</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink
              to="/profile"
              className="w-full inline-flex justify-between"
            >
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink
              to="/bookings"
              className="w-full inline-flex justify-between"
            >
              Bookings
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-rose-500">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
