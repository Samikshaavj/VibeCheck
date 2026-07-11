"use client";
import React, { useEffect, useState } from 'react';

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
        const response = await fetch('/api/users', { method: 'POST', body: JSON.stringify({}) });
        const result = await response.json();
        console.log("Result", result);
        setUserDetail(result?.user);
    }
    
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider