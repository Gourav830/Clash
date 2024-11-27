"use client";
import React, { useState } from "react";

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
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios, { AxiosError } from "axios";
import { createClash } from "@/lib/apiEndPoint";
import { Customuser } from "@/app/api/auth/[...nextauth]/options";
import { metadata } from '../../app/layout';
import { set } from "date-fns";
import { toast } from "sonner";

 

const AddClash =  ({user}:{user:Customuser}) => {
  const [open, setOpen] = useState(false);
  const [clashData, setClashData] = useState<ClashFormType>({});
  const [date, setDate] = React.useState<Date>()
  const [image,setImage] = useState<File|null>(null)
  const [loading,setloading] = useState(false)  
  const [errors,setErrors] = useState<ClashFormTypeError>({})
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
          setImage(e.target.files[0]);
        }
    }
    const handleSubmit =async (event:React.FormEvent)=>{
        event.preventDefault()
        try {
        setloading(true)
        console.log(clashData)
        console.log(date)
        console.log(image)
        const formData = new FormData()
        formData.append("title",clashData?.title ?? "")
        formData.append("description",clashData?.description ?? "")
        formData.append("expire_at",date?.toISOString() ?? "")
        if(image) formData.append("image",image)
            const {data} = await axios.post(createClash,formData,{
        headers:{
            Authorization:user.token
        }
     
    })

    setloading(false)
    if(data?.message){
        setClashData({})
        setDate(undefined)
        setImage(null)
        toast.success("Clash added Successfully!")
        setOpen(false)
    }
    
        }catch(error){
            console.log(error);
            setloading(false)
        if(error instanceof AxiosError){
            if(error.response?.status === 422){
                setErrors(error.response?.data?.errors)
                console.log(error.response.data.errors)
            }
        }else{
            toast.error("Something went wrong. Please try again later") 
        }
        }

    
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Clash</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create a Clash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter Title .."
              value={clashData?.title ?? " "}
              onChange={(e) => {
                setClashData({ ...clashData, title: e.target.value });
              }}
            />
          </div>{" "}
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description .."
              value={clashData?.description ?? " "}
              onChange={(e) => {
                setClashData({ ...clashData, description: e.target.value });
              }}
            />
          </div>
            <div className="mt-4">
              <Label htmlFor="image">Image</Label>
              <Input
                id="title"
                type="file"
                placeholder="Upload image .."
                onChange = {handleImageChange}
              />
            </div>

            <div className="mt-4">
            <Label htmlFor="expire_at" className="block">Expire At</Label>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full mt-2 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toDateString() : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
          </div>

            <div className="mt-4 ">
                <Button type="submit" className="w-full" disabled={loading}>{loading?"Processing":"Create Clash"}</Button>

            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClash;
