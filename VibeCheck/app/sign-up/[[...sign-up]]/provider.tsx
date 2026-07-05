"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/db/context/UserDetailContext';

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    const [userDetail, setUserDetail] = useState<any>();

    useEffect(() => {
        if (user) {
            CreateNewUser();
        }
    }, [user]);
    
    const CreateNewUser = async () => {
        const result = await axios.post('/api/users', {});
        console.log("Result", result);
        setUserDetail(result.data?.user);
    }
    
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider