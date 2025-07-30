"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// import Link from "next/link";
import { forgetAction, loginAction } from "@/actions/authActions";
// import SubmitBtn from "../common/submitBtn";
import SubmitBtn from "@/components/common/SubmitBtn";
// import { signIn } from "next-auth/react";
export default function ForgetPass() {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useActionState(forgetAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Type your email" name="email" />
        <span className="text-red-400">{state.errors?.email}</span>
      </div>

      <div className="mt-4">
        <SubmitBtn />
      </div>
    </form>
  );
}
