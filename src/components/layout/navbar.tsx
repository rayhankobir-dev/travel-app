/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useAuth from "@/hooks/useAuth";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const { user }: any = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
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
      <nav
        className={cn(
          "flex justify-between items-center gap-3 mx-auto",
          isAdmin ? "max-w-full lg:px-6" : "max-w-7xl "
        )}
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-xl text-orange-500"
        >
          <img src={Logo} className="h-8" />
          Ghure Ashi
        </NavLink>

        <ul className="flex items-center gap-2 font-light text-sm">
          <span className="hidden lg:flex ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn("px-2", isActive && "text-orange-600")
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  cn("px-2", isActive && "text-orange-600")
                }
              >
                Privacy & Policies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  cn("px-2", isActive && "text-orange-600")
                }
              >
                FAQ's
              </NavLink>
            </li>
            {!user && <AuthLinks />}
          </span>

          {user && <ProfileOptions />}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
        </ul>
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
  const { logout, user }: any = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 bg-orange-500">
          <AvatarFallback className="bg-orange-500 text-white">
            {user.fullName[0]}
          </AvatarFallback>
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
          {user.role === "user" && (
            <>
              <DropdownMenuItem asChild>
                <NavLink
                  to="/bookings"
                  className="w-full inline-flex justify-between"
                >
                  Bookings
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink
                  to="/support"
                  className="w-full inline-flex justify-between"
                >
                  Support
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </NavLink>
              </DropdownMenuItem>
            </>
          )}
          {user.role === "admin" && (
            <DropdownMenuItem asChild>
              <NavLink
                to="/dashboard"
                className="w-full inline-flex justify-between"
              >
                Go dashboard
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </NavLink>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-rose-500">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
