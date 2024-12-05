"use client";

import React, { Fragment, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { clashItems } from "../../lib/apiEndPoint";
import CountUp from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import socket from "@/lib/socket";
const Clashing = ({ clash }: { clash: ClashType }) => {
  const [clashComments, setClashComments] = useState(clash.ClashComments);
  const [clashItems, setClashItems] = useState(clash.ClashItems);
  const [comment, setComment] = useState("");
  const [hideVote, setHideVote] = useState(false);
  const handleVote = (id:number)=>{
    if(clashItems && clashItems.length > 0){
      setHideVote(true)
        updateCounter(id)

        socket.emit(`clashing=${clash.id}`,{clashId:clash.id,clashItemId:id})
    }
  }
  const updateCounter = (id:number)=>{
const items = [...clashItems]
const findIndex = clashItems.findIndex((item)=>item.id === id)
if(findIndex !== -1){
    items[findIndex].count += 1
}
setClashItems(items)
  }
  useEffect(()=>{
    socket.on(`clashing=${clash.id}`,(data)=>{
      updateCounter(data?.clashItemId)
    })
  })
  return (
    <div className="mt-10">
      {/* Clash Items */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems &&
          clashItems.length > 0 &&
          clashItems.map((item: ClashItem, index: number) => (
            <Fragment key={index}>
              <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                <div className="w-full flex justify-center items-center rounded-md p-2 h-[300px]">
                  <Image
                    src={getImageUrl(item.image)}
                    width={500}
                    height={500}
                    alt={`preview-${index + 1}`}
                    className="w-full h-[300px] object-contain"
                  />
                </div>
                {hideVote ? (
                
                <CountUp
                  start={0}
                  end={item.count}
                  duration={1}
                  className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                />
            ): (   
                <Button onClick={()=>{handleVote(item.id)}}>

                    <span className="mr-2 text-lg ">Vote</span>
                    <ThumbsUp />
                </Button>
            )}
              </div>

              {/* VS Block */}
              {index % 2 === 0 && (
                <div className="flex w-full lg:w-auto justify-center items-center">
                  <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                    VS
                  </h1>
                </div>
              )}
            </Fragment>
          ))}
      </div>

      <form className="mt-4 w-full">
        <Textarea
          placeholder="Type Your Suggession"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button className="w-full mt-2">Enter Comment</Button>
      </form>

      {/* Clash Comments */}
      <div className="mt-4">
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, index) => (
            <div
              className="w-full md:w-[600px] rounded-lg bg-muted p-4 mb-4"
              key={index}
            >
              <p className="font-bold">{item.comment}</p>
              <p className="text-sm text-gray-600">
                {new Date(item.created_at).toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clashing;