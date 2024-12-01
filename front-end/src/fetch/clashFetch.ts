import { createClash } from "@/lib/apiEndPoint";
import { create } from "domain";

export async function fetchClases(token:string) {
    const res = await fetch(createClash, {
        headers:{
            Authorization: token
        },
        next:{
            revalidate:60*60,
            tags:['dashboard'],
            
        }
    })
    if(!res.ok)  {
        throw new Error('Something went wrong')
    }

    const response = await res.json()
    if(response?.data){
        return response?.data
    }else{
    return null
    }

    // return res.json()

}
export async function fetchClase(id:number) {
    const res = await fetch( `${createClash}/${id}`, {
        cache:'no-cache'
    })
    if(!res.ok)  {
        throw new Error('Something went wrong')
    }

    const response = await res.json()
    if(response?.data){
        return response?.data
    }else{
    return null
    }

    // return res.json()

}