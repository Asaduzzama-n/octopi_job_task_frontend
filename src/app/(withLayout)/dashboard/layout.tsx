import React from "react";
import "../../globals.css";
import Link from "next/link";
import { ChartNoAxesGantt, Kanban, Plus } from "lucide-react";
import { DashboardSheet } from "@/components/dashboard-sheet";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full lg:flex p-2">
      <div className="w-60 hidden md:block bg-primary/10 p-4 rounded-md h-screen">
        <Link
          href="/dashboard/create "
          className="text-sm font-medium flex justify-center items-center border-b border-b-primary py-2 my-5 hover:bg-primary/20 duration-200"
        >
          Product
          <Plus className="text-primary ml-2 w-5 h-5"></Plus>
        </Link>
        <Link
          href="/dashboard/manage"
          className="text-sm font-medium flex justify-center items-center border-b border-b-primary py-2 my-5 hover:bg-primary/20 duration-200"
        >
          Manage
          <ChartNoAxesGantt className="text-primary ml-2 w-5 h-5"></ChartNoAxesGantt>
        </Link>
      </div>
      <div className="block md:hidden mb-2">
        <DashboardSheet></DashboardSheet>
      </div>
      <div className="w-full lg:w-full bg-primary/10 p-4 rounded-md md:mx-4 ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
