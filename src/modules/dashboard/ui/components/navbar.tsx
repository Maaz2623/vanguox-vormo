"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import React from "react";

const Navbar = () => {
  const { toggleSidebar, open } = useSidebar();


  return (
    <div className="border-b h-12 fixed bg-white top-0 shadow-sm left-0 w-full z-50 p-1 flex justify-between items-center px-1">
      <div className="text-lg font-bold gap-x-2 flex justify-center items-center">
        <Button
          className=""
          variant={`secondary`}
          size={`icon`}
          onClick={toggleSidebar}
        >
          <MenuIcon
            className={cn(
              "size-4  transition-all duration-300",
              open && "rotate-90"
            )}
          />
        </Button>
        Vormo
      </div>

      <div>
      </div>
    </div>
  );
};

export default Navbar;
