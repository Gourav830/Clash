"use client";
import React, { useActionState, useEffect } from "react";

import {  resetPasswordAction } from "@/actions/authActions";
import SubmitBtn from "@/components/common/submitBtn";
import { Input } from "@/components/ui/input";
// import { useFormState } from 'react-dom';
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
const ResetPass = () => {
  const initalState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(resetPasswordAction, initalState);
  const sParams = useSearchParams();
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 422) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
      <input type="hidden"  name="token" value={sParams.get("token") ?? ""} />
        <div className="mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter Your Email"
            type="email"
            readOnly
            value={sParams.get("email") ?? " "}
          />
          <span className="text-red-500">{state.errors?.email}</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="Password">Password</Label>
          <Input
            id="Password"
            name="password"
            placeholder="Enter Your Password"
            type="password"
          />
          <span className="text-red-500">{state.errors?.password}</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="ConfirmPassword">ConfirmPassword</Label>
          <Input
            id="ConfirmPassword"
            name="confirmpassword"
            placeholder="Confirm  Your Password"
            type="password"
          />
          <span className="text-red-500">{state.errors?.confirm_password}</span>
        </div>

        <div className="mt-4">
          <SubmitBtn />
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
