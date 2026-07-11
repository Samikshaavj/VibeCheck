import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmptyWorkspace() {
    return (
        <div className='flex flex-col mt-10 items-center border p-10 rounded-lg bg-white'>
            <img src={'/folder.png'} alt='folder' width={70} height={50} />
            <h2 className='text-2xl font-medium mt-5 mb-4'>No Repository Connected </h2>
            <p className='text-center mx-10'>Connect your Github and add repository</p>

            <Button className='mt-5'><Link href="#">Connect Repo </Link></Button>

        </div>
    )
}