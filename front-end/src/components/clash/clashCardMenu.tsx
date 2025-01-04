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
import DeleteClash from './deleteClash';
import { toast } from 'sonner';
 const EditClash = dynamic(() => import('./editClash'))
const ClashCardMenu = ({clash,token}:{clash:ClashType,token:string}) => {
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);

    const handleCopyLink = () => {  
        navigator.clipboard.writeText(`${window.location.origin}/clash/${clash.id}`)
      toast.success('Link copied to clipboard')
      }

    return (

        <>
       
    {open && (
              <Suspense fallback={<p>Loading....</p>} >
        <EditClash token={token} clash={clash} open={open} setOpen={setOpen}/>
        </Suspense>
    )}
    {delOpen && (
              <Suspense fallback={<p>Loading....</p>} >
        <DeleteClash token={token} id={clash?.id!} open={delOpen} setOpen={setDelOpen}/>
        </Suspense>
    )}

        <DropdownMenu>
  <DropdownMenuTrigger>

    <EllipsisVertical/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem onClick={()=>{setOpen(true)}}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={handleCopyLink} > Copy Link</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{setDelOpen(true)}}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</>
    )
}

export default ClashCardMenu;
