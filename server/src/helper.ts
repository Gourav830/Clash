import { date, ZodError, ZodIssue } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs'
import { getParentKey } from "bullmq";
import moment from "moment";
import { mineTypes } from "./config/fileSystem.js";
import { UploadedFile } from 'express-fileupload';
import { v4 as uuid4 } from 'uuid';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const formatEror = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue: ZodIssue) => {
    errors[issue.path?.[0]] = issue.message;
  });
  return errors;
};

export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const html: string = await ejs.renderFile(
    path.resolve(__dirname, `views/emails/${fileName}.ejs`),
    { payload }
  );
  return html;
};


export const checkDateHourDifference = ( date: Date): number => {

  const now = moment()
  const tokenSendAt = moment(date)
const differece = moment.duration( now.diff(tokenSendAt))
  return differece.asHours();
}

export const imageValidator = (size:number,mine:string):string|null =>{
  if(bytesToMb(size) > 2){
    return 'Image size should be less than 2MB'
  }else if(!mineTypes.includes(mine)){
    return 'Invalid file type'

  }
  return null;
  
}
export const bytesToMb = (bytes:number):number => {
  return bytes / 1024 / 1024;
}
export const uploadedFile =async (image:UploadedFile)=>{
  const imageExt = image?.name.split('.')

  const imageName =uuid4() + '.' + imageExt[imageExt.length - 1]
const uploadPath = process.cwd() + '/public/uploads/' + imageName
image.mv(uploadPath,(err)=>{
  if(err) throw err
})
return imageName

}
export const deleteImage = (fileName:string)=>{
const path = process.cwd() + '/public/uploads/' + fileName
if(fs.existsSync(path)){
  fs.unlinkSync(path)
}
}