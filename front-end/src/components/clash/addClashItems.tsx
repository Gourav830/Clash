"use client";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

const AddClashItems = ({
  token,
  clashId,
}: {
  token: string;
  clashId: number;
}) => {
  const [items, setItems] = useState<Array<ClashItemsForm>>([
    { image: null },
    { image: null },
]);
const imgRef = useRef<HTMLInputElement|null>(null);
const imgRef2 = useRef<HTMLInputElement|null>(null);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
            <input type="file" hidden ref={imgRef}/>
          <div className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
            
            <h1 className="flex items-center space-x-2 text-xl" onClick={()=>{imgRef?.current?.click()}}>
              <Upload></Upload>
              <span>Upload File</span>
            </h1>
          </div>
        </div>

        <div className="w-full flex lg:w-auto justify-center items-center">
          <div className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            vs
          </div>
        </div>

        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
        <input type="file" hidden ref={imgRef2}/>
          <div className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
            <h1 className="flex items-center space-x-2 text-xl" onClick={()=>{imgRef?.current?.click()}}>
              <Upload></Upload>
              <span>Upload File</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button className="w-52">Submit</Button>
      </div>
    </div>
  );
};

export default AddClashItems;
