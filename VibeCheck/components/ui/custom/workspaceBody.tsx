"use client"
import { UserDetailContext } from '@/db/context/UserDetailContext'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EmptyWorkspace from './EmptyWorkspace';
import RepoDialog from './RepoDialog';
import { useRouter } from 'next/navigation';
import { refresh } from 'next/cache';

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

            <Card className='mt-5 flex justify-between items-center p-4 border rounded-lg'>
                <div className='flex items-center gap-5'>
                    <Image src={'/github.png'} alt='github' width={40} height={40} />
                    <h2 className='text-lg' >Connect Github & Add Repository</h2>
                </div>
                <div>
                    {!token ? <Button onClick={OnAddRepo}>Setup</Button>
                        : <RepoDialog setRefreshPage={(refresh: boolean) => console.log} />}
                </div>
            </Card>

            <Card className='mt-10'>
                <CardContent>
                    <EmptyWorkspace />
                </CardContent>
            </Card>
        </div>
    )
}
export default WorkspaceBody