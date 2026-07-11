import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import WorkspaceHeader from '@/components/ui/custom/WorkspaceHeader';


export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  // Await the auth object and check if a user is logged in
  const { userId } = await auth();

  // If no user is logged in, redirect them to the sign-in page
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div>
      <WorkspaceHeader />
      {children}
    </div>
  );
}
