'use client'

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvtar = () => {
    return (

            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>GS</AvatarFallback>
</Avatar>

    );
}

export default UserAvtar;
