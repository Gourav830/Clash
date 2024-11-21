"use server"

import { REGISTER_URL } from "@/lib/apiEndPoint";
import axios from "axios";
export async function registerAction(prevState:any,formdata:FormData){
    console.log("the form data is ",formdata);
    return {
        status : 200,
        message:"done",
        errors:{}
    
    }
    try {
        await axios.post(REGISTER_URL,{
            name:formdata.get('name'),
            email:formdata.get('email'),
            password:formdata.get('password'),
            confirm_password:formdata.get('confirm_password')
        });
    } catch (error) {
        
    }
}