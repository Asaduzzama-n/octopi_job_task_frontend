"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";
import {
  FileHeart,
  House,
  LayoutDashboard,
  LayoutList,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

// Tooltip data array
const tooltipItems = (role: string, isLoggedIn: boolean, onLogout: any) => {
  const items = [
    { href: "/", icon: <House className="text-primary" />, tooltip: "Home" },
    {
      href: "/cart",
      icon: <ShoppingCart className="text-primary" />,
      tooltip: "Cart",
    },
    {
      href: "/favorites",
      icon: <FileHeart className="text-primary" />,
      tooltip: "Favorites",
    },
    {
      href: "/profile",
      icon: <UserRoundPen className="text-primary" />,
      tooltip: "Profile",
    },
    {
      href: "/setting",
      icon: <Settings className="text-primary" />,
      tooltip: "Account Settings",
    },
  ];

  // Add the Dashboard link if the user is a seller
  if (role === "SELLER") {
    items.push({
      href: "/dashboard",
      icon: <LayoutDashboard className="text-primary" />,
      tooltip: "Dashboard",
    });
  }

  // Add login/logout options based on user authentication status
  if (isLoggedIn) {
    items.push({
      href: "#",
      icon: <LogOut className="text-primary" />,
      tooltip: "Logout",
      onClick: onLogout,
    });
  } else {
    items.push({
      href: "/login",
      icon: <LogIn className="text-primary" />,
      tooltip: "Login",
    });
  }

  return items;
};

const HomeNav = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="flex justify-around items-center md:flex-col">
      <div>
        {user?.email && user.avatar && (
          <img
            src={user.avatar}
            className="rounded-full"
            width={50}
            height={50}
            alt="avatar"
          />
        )}
      </div>
      {tooltipItems(user?.role, !!user, handleLogout).map((item, index) => (
        <div className="my-5 hover:bg-primary/20 rounded-md p-1" key={index}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Render as link or button based on whether it's a logout action */}
                {item.onClick ? (
                  <button onClick={item.onClick} className="flex items-center">
                    {item.icon}
                  </button>
                ) : (
                  <Link href={item.href}>{item.icon}</Link>
                )}
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="hidden sm:block p-1 text-primary">
                  {item.tooltip}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
};

export default HomeNav;
