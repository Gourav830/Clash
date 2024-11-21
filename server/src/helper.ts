import { ZodError, ZodIssue } from "zod"; 
export const formatEror = (error: ZodError):any => {
  let errors:any={}
    error.errors?.map((issue:ZodIssue)=>{
        errors[issue.path?.[0]]=issue.message
    })
  return errors;

    }