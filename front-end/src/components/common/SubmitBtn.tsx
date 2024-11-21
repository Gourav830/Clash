'use client'

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";


  
const SubmitBtn = () => {
    const { pending } = useFormStatus()
  return (
    <div>
      <div className="mt-4">
        <Button className="w-full" disabled={pending}>
          {pending ? "Processing" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitBtn;
