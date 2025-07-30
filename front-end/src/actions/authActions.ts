"use server";

import {
  check_credential,
  forgetPassword,
  REGISTER_URL,
} from "@/lib/apiEndPoint";
import axios, { AxiosError } from "axios";
import { resetPassword } from "../lib/apiEndPoint";
export async function registerAction(prevState: any, formdata: FormData) {
  try {
    const data = await axios.post(REGISTER_URL, {
      name: formdata.get("name"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirmpassword"),
    });
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
export async function forgetAction(prevState: any, formData: FormData) {
  try {
    const data = await axios.post(forgetPassword, {
      email: formData.get("email"),
    });
    return {
      status: 200,
      message: "Credentials matched loging you shortly!",
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
export async function loginAction(prevState: any, formData: FormData) {
  try {
    const data = await axios.post(check_credential, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return {
      status: 200,
      message: "Credentials matched loging you shortly!",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
          data: {},
        };
      }
    }

    return {
      status: 500,
      message: "something went wrong. Try again",
      errors: {},
      data: {},
    };
  }
}

export async function resetPasswordAction(prevState: any, formdata: FormData) {
  try {
    const data = await axios.post(resetPassword, {
      email: formdata.get("email"),
      password: formdata.get("password"),
      confirm_password: formdata.get("confirmpassword"),
      token: formdata.get("token"),
    });
    return {
      status: 200,
      message: "Reset password successful ",
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
