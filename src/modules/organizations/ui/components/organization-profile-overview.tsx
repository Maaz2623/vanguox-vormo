import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { organizations } from "@/db/schema";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";

export const OrganizationProfileOverview = async ({
  organization,
}: {
  organization: typeof organizations.$inferSelect;
}) => {
  const session = await auth();

  return (
    <div className="border border-yellow-500 items-center py-6 px-6 md:px-20 flex gap-x-6 md:gap-x-20">
      <div className="bg-neutral-200 shrink-0 size-24 transition-all duration-300 sm:size-28 md:size-40 rounded-full"></div>
      <div className="border-pink-500 border w-full">
        <div className="flex flex-row gap-x-4 items-center">
          <h2 className="md:text-xl sm:text-lg text-base font-semibold">
            {organization.name}
          </h2>
          {organization.ownerEmail === session?.user?.email ? (
            <Button
              variant={`secondary`}
              className="h-7 flex-1 md:max-w-40 text-sm"
              disabled
            >
              Leave
            </Button>
          ) : (
            <Button className="h-7 flex-1 md:max-w-40">Join</Button>
          )}
          {session?.user?.email === organization.ownerEmail && (
            <Button
              className="size-7 shrink-0"
              variant={`outline`}
              size={`icon`}
              asChild
            >
              <Link
                href={`/dashboard/organizations/${organization.slug}/settings`}
              >
                <SettingsIcon className="" />
              </Link>
            </Button>
          )}
        </div>

        <div className="border border-blue-500  mt-5 flex items-center justify-start">
          <div className="text-sm mr-12 text-center">
            <span>45</span>
            <p className="font-medium">Events</p>
          </div>{" "}
          <div className="text-sm text-center">
            <span>678</span>
            <p className="font-medium">Members</p>
          </div>
        </div>

        <div className="border-green-500 border mt-5 flex items-center justify-start text-[14px]">
          {organization.description}
        </div>
      </div>
    </div>
  );
};
