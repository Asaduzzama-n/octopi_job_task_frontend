"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, ChartNoAxesGantt, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardSheet() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify className="text-primary" />
        </SheetTrigger>
        <SheetContent side="left">
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
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
