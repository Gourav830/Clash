'use client'
import React, { Suspense, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import dynamic from 'next/dynamic';  
 const EditClash = dynamic(() => import('./editClash'))
const ClashCardMenu = ({clash,token}:{clash:ClashType,token:string}) => {
    const [open, setOpen] = useState(false);
    return (

        <>
       
    {open && (
              <Suspense fallback={<p>Loading....</p>} >
        <EditClash token={token} clash={clash} open={open} setOpen={setOpen}/>
        </Suspense>
    )}

        <DropdownMenu>
  <DropdownMenuTrigger>

    <EllipsisVertical/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem onClick={()=>{setOpen(true)}}>Edit</DropdownMenuItem>
    <DropdownMenuItem>Copy Link</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</>
    )
}

export default ClashCardMenu;
