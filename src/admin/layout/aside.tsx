/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { BaggageClaim, Gauge, Map, ShoppingBag, Users } from "lucide-react";
import { TbCreditCardRefund, TbPlayFootball } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import React, { Fragment } from "react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IconType } from "react-icons";
import { BiTrip } from "react-icons/bi";

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props) {
  return (
    <aside className={cn("bg-gray-50", className)}>
      <div className="w-full h-full space-y-4 py-4 bg-slate">
        <ScrollArea className="h-full">
          <nav className="grid items-start gap-2">
            <NavLink
              end={true}
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 pl-5 py-2.5 text-sm font-medium hover:bg-orange-50 hover:text-orange-600",
                  isActive ? "bg-orange-50 text-orange-600" : "transparent"
                )
              }
            >
              <Gauge className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>

            <UserLinks label="" Icon={Users} actionText="Users">
              <Fragment>
                <NavLink
                  end={true}
                  to="/dashboard/admins"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <TbPlayFootball className="mr-2 h-4 w-4" />
                  <span>Admins</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/dashboard/customers"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <TbPlayFootball className="mr-2 h-4 w-4" />
                  <span>Customers</span>
                </NavLink>
              </Fragment>
            </UserLinks>

            <UserLinks label="" Icon={BiTrip} actionText="Trips">
              <Fragment>
                <NavLink
                  end={true}
                  to="/dashboard/trips"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <BaggageClaim className="mr-2 h-4 w-4" />
                  <span>All Trips</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/dashboard/trips/bookings"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Bookings</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/dashboard/trips/locations"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <Map className="mr-2 h-4 w-4" />
                  <span>Locations</span>
                </NavLink>
              </Fragment>
            </UserLinks>

            <UserLinks
              label=""
              Icon={FaBangladeshiTakaSign}
              actionText="Payment"
            >
              <Fragment>
                <NavLink
                  end={true}
                  to="/dashboard/payment/transactions"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <AiOutlineTransaction className="mr-2 h-4 w-4" />
                  <span>Transactions</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/dashboard/payment/refunds"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md px-2 pl-3 py-1.5 text-sm font-normal hover:bg-orange-50 hover:text-orange-600",
                      isActive ? "bg-orange-50 text-orange-600" : "transparent"
                    )
                  }
                >
                  <TbCreditCardRefund className="mr-2 h-4 w-4" />
                  <span>Refund</span>
                </NavLink>
              </Fragment>
            </UserLinks>

            <NavLink
              end={true}
              to="/dashboard/support"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 pl-5 py-2.5 text-sm font-medium hover:bg-orange-50 hover:text-orange-600",
                  isActive ? "bg-orange-50 text-orange-600" : "transparent"
                )
              }
            >
              <RiCustomerServiceFill className="mr-2 h-4 w-4" />
              <span>Support</span>
            </NavLink>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}

interface UserLinkProps {
  label: string;
  Icon: IconType | any;
  actionText: string;
  children: React.ReactNode;
}

function UserLinks({ label, Icon, actionText, children }: UserLinkProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full px-4 space-y-1"
    >
      <div className="px-2 uppercase text-sm font-semibold text-muted-foreground">
        {label}
      </div>

      <CollapsibleTrigger asChild className="border-b">
        <Button className="w-full max-h-8 flex items-center px-3 justify-between bg-transparent hover:bg-orange-50 text-black hover:text-orange-600 border-none">
          <h4 className="flex items-center gap-2 text-sm font-medium p-0 m-0">
            <Icon size={16} /> {actionText}
          </h4>
          <p>
            {isOpen ? <FaAngleLeft className="h-4 w-4" /> : <FaAngleRight />}
          </p>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="pl-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}
