"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EarthIcon, EarthLockIcon, Loader2Icon } from "lucide-react";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { EventType } from "@/constants";
import EventsSection from "@/modules/events/ui/sections/events-section";

const OrganizationEventsTab = ({ slug }: { slug: string }) => {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<EventType>(EventType.PUBLIC);
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();

  const create = trpc.events.create.useMutation({
    onSuccess: () => {
      utils.events.invalidate();
      toast.success("Event Created");
      setName("");
      setEventType(EventType.PUBLIC);
      setLoading(false);
    },
    onError: () => {
      toast.error("Failed to create event");
      setName("");
      setEventType(EventType.PRIVATE);
      setLoading(false);
    },
  });

  const isInvalidInput = name === "" || eventType === undefined;

  const handleCreate = () => {
    if (isInvalidInput) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    console.log({
      name,
      slug,
      eventType,
    });
    create.mutate({
      name: name,
      type: eventType.toUpperCase() as "PUBLIC" | "PRIVATE",
      organizationSlug: slug,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div>
      <div className="border flex justify-between px-4 items-center w-full border-yellow-500 h-14">
        <div></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={`sm`}>Create Event</Button>
          </DialogTrigger>
          <DialogContent className="md:w-full w-[90%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription>
                This is going to be the best part of your organization 🔥
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between items-center gap-x-3">
              <div className="w-full">
                <Label className="text-sm font-medium">Event name</Label>
                <Input
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 focus-visible:ring-2"
                  placeholder="e.g. Movie night"
                />
              </div>{" "}
              <div className="w-full">
                <Label className="text-sm font-medium">Event type</Label>
                <Select
                  disabled={loading}
                  onValueChange={(e) => setEventType(e as EventType)}
                  value={eventType}
                >
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      onKeyDown={handleKeyDown}
                      value="PUBLIC"
                      className=""
                    >
                      <div className="flex">
                        <EarthIcon className="mr-2 size-5" />
                        <p>Public</p>
                      </div>
                    </SelectItem>
                    <SelectItem onKeyDown={handleKeyDown} value="PRIVATE">
                      <div className="flex">
                        <EarthLockIcon className="mr-2 size-5" />
                        <p>Private</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreate}
                disabled={loading || isInvalidInput}
                className="w-28"
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <EventsSection organizationSlug={slug} />
    </div>
  );
};

export default OrganizationEventsTab;
