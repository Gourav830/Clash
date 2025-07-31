'use client'

import React from "react";
// import { Button } from "../ui/button";
import {Button} from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
    const { pending } = useFormStatus()
  return (

      <div className="mt-4">
        <Button className="w-full" disabled={pending}>
          {pending ? "Processing" : "Submit"}
        </Button>
      </div>
   
  );
};

export default SubmitBtn;
