'use client'

import SideNav from '@/components/Sidenav';
import useUser from '@/hooks/useUser';


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = useUser();
    return (
      (user && <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-200">
        
      <div className="w-full flex-none md:w-64 z-10">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 z-10">{children}</div>
      <div className='absolute bg-yellow-300 w-full h-32 rounded-b-lg'></div>
    </div>)
    );
  }