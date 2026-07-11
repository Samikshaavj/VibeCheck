import { UserButton } from '@clerk/nextjs';
import React from 'react';
import WorkspaceBody from '@/components/ui/custom/workspaceBody';

export default function Home() {
  return (
    <div>
      <UserButton />
      <div className='mx-auto max-w-4xl p-10'>
        <WorkspaceBody />
      </div>
    </div>
  );
}
