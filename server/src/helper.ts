import { ZodError, ZodIssue } from "zod"; 
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getParentKey } from "bullmq";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const formatEror = (error: ZodError):any => {
  let errors:any={}
    error.errors?.map((issue:ZodIssue)=>{
        errors[issue.path?.[0]]=issue.message
    })
  return errors;

    }

    export const renderEmailEjs = async (fileName:string,payload:any):Promise<string>=>{
        const html:string = await ejs.renderFile(
            path.resolve(__dirname, `views/emails/${fileName}.ejs`),
            {payload }
          );
          return html;
    }