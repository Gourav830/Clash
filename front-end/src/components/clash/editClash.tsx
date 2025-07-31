"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { createClash } from "@/lib/apiEndPoint";
import { Customuser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import { clearCache } from "@/actions/commonAction";
// import { clearCache } from "ejs";

const EditClash = ({
  token,
  clash,
  open,
  setOpen,
}: {
  token: string;
  clash: ClashType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  //   const [open, setOpen] = useState(false);
  const [clashData, setClashData] = useState({
    title: clash.title,
    description: clash.description,
  });
  const [date, setDate] = useState<Date | undefined>(
    new Date(clash.expires_at)
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    expire_at: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", clashData.title);
      formData.append("description", clashData.description);
      formData.append("expires_at", date ? date.toISOString() : "");
      if (image) formData.append("image", image);

      const { data } = await axios.put(`${createClash}/${clash.id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(data?.message || "Clash updated successfully!");
      clearCache("dashboard");
      setClashData({ title: "", description: "" });
      setDate(undefined);
      setImage(null);
      setOpen(false);
      setErrors({ title: "", description: "", image: "", expire_at: "" });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors || {});
        } else {
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Clash</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Clash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter Title"
              value={clashData.title}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
            {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Description Field */}
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter Description"
              value={clashData.description}
              onChange={(e) =>
                setClashData({ ...clashData, description: e.target.value })
              }
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image}</span>
            )}
          </div>

          {/* Date Picker */}
          <div className="mt-4">
            <Label htmlFor="expires_at">Expire At</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date!);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.expire_at && (
              <span className="text-red-500">{errors.expire_at}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Create Clash"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClash;
