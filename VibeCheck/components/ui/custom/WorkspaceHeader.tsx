import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

function WorkspaceHeader() {
    return (
        <div className='flex items-center justify-between p-4 shadow-sm'>
            {/*logo*/}
            <Image src={'/logo.svg'} alt="logo" width={100} height={40} className="object-contain" />
            
            {/*menu options*/}
            <ul className='flex items-center gap-8 font-medium'>
                <li className='cursor-pointer hover:text-blue-500'>Workspace</li>
                <li className='cursor-pointer hover:text-blue-500'>Pricing</li>
                <li className='cursor-pointer hover:text-blue-500'>Support</li>
            </ul>
            
            {/*user button*/}
            <UserButton />
        </div>
    );
}

export default WorkspaceHeader;