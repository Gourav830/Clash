"use server";

import { REGISTER_URL } from "@/lib/apiEndPoint";
import axios, { AxiosError } from "axios";
export async function registerAction(prevState: any, formdata:FormData

) {
  console.log("the form data is ", formdata);
  try {
   const data =  await axios.post(REGISTER_URL, {name:formdata.get("name"),
   email: formdata.get("email"),
   password : formdata.get("password"),
   confirm_password : formdata.get("confirmpassword")});
    return {
      status: 200,
      message:
        "You have been registered successfully ,check email to verify your account",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
    }

    return {
      status: 500,
      message: "something went wrong. Try again",
      errors: {},
    };
  }
}
