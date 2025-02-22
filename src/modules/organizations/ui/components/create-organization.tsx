"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";

const CreateOrganization = () => {
  const utils = trpc.useUtils();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const create = trpc.organizations.create.useMutation({
    onSuccess: () => {
      utils.organizations.getMany.invalidate();
      toast.success("Organization created successfully!");
      setOpen(false);
      setName("");
      setSlug("");
      setLoading(false);
    },
    onError: () => {
      toast.error("Failed to create organization.");
      setLoading(false);
      setName("");
      setSlug("");
    },
  });

  const handleCreate = async () => {
    if (!name.trim() || !slug.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    setLoading(true);

    create.mutate({ name, slug });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedSlug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "") // Remove non-alphanumeric characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    setSlug(formattedSlug);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size={`default`} onClick={() => setOpen(!open)}>
        Create organization
      </Button>

      <DialogContent className=" w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Organization</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-1">
              Organization name
            </Label>
            <Input
              placeholder="The Student Forum"
              className="focus-visible:ring-2 text-sm h-8"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              value={name}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1">
              Organization Slug
            </Label>
            <Input
              placeholder="e.g. the-student-forum"
              className="focus-visible:ring-2 text-sm h-8"
              onChange={handleSlugChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
              value={slug}
            />
          </div>
        </div>
        <Button disabled={loading} onClick={handleCreate}>
          {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganization;
