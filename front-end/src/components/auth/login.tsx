
"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { loginAction } from "@/actions/authActions";
import SubmitBtn from "../common/submitBtn";
import {signIn} from "next-auth/react";
export default function Login() {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
    data: {},
  };
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    // console.log(state.issues);
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard"
      });
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
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="password"
        />
        <div className="text-right font-bold">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <span className="text-red-400">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <SubmitBtn />
      </div>
    </form>
  );
}
