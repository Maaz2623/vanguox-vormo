"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  SettingsIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const OrganizationTableActions = ({
  organizationSlug,
  isOwner,
}: {
  organizationSlug: string;
  isOwner: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={`outline`}
          size={`icon`}
          className="size-7"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="flex justify-start items-center">
          <Link href={`/dashboard/organizations/${organizationSlug}`}>
            <SquareArrowOutUpRight />
            <p className="mr-2">Go to</p>
          </Link>
        </DropdownMenuItem>
        {isOwner && (
          <DropdownMenuItem asChild className="flex justify-start items-center">
            <Link
              href={`/dashboard/organizations/${organizationSlug}/settings`}
            >
              <SettingsIcon />
              <p className="mr-2">Settings</p>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
