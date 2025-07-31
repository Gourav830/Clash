"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { createClash } from "@/lib/apiEndPoint";
import { clearCache } from "@/actions/commonAction";
import axios from "axios";
const DeleteClash =  ({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  id: number;
  token: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
       await axios.delete(`${createClash}/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
          clearCache("dashboard");
        toast.success("Clash deleted successfully!");
        setLoading(false);
      })

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your clash from db permantly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Processing" : "Yes Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClash;
