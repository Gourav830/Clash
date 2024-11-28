import { createClash } from "@/lib/apiEndPoint";

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