"use client"
import { UserDetailContext } from '@/db/context/UserDetailContext'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EmptyWorkspace from './EmptyWorkspace';
import { useRouter } from 'next/navigation';

function WorkspaceBody() {

    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter()
    const [token, setToken] = useState('');
    useEffect(() => {
        GetGithubUserToken();
    }, [])
    const GetGithubUserToken = async () => {
        const result = await fetch('/api/github/token');
        const data = await result.json();
        console.log(data.token)
        setToken(data.token);
    }
    const OnAddRepo = async () => {
        router.push('/api/github');
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-medium'>Workspace</h2>
                <h2 className='text-blue-800 bg-blue-100 p-2 '>Remaining Credits: {userDetail?.byteCredits}</h2>
            </div>

            <Card className="mt-5 flex justify-between border p-4 rounded-lg bg-white">
                <div className='flex items-center gap-5'>
                    <img src={'/github.png'} alt='github' width={40} height={40} />
                    <h2 className='text-lg text-black'>Connect Github & Add Repository</h2>
                </div>
                <div>
                    <Button onClick={OnAddRepo} className="bg-primary text-primary-foreground hover:bg-primary/90">+ Add Repo</Button>
                </div>
            </Card>

            <EmptyWorkspace />
        </div>
    )
}
export default WorkspaceBody