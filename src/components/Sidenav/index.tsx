import Link from 'next/link';
import NavLinks from '@/components/NavLinks';
import Logo from '@/components/Logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full md:justify-center md:items-center ">
      <div className='md:m-3 md:rounded-lg bg-white h-5/6 flex flex-col pb-5 px-3'>
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md p-6 md:h-40"
          href="/"
        >
          <div className="w-32 md:w-40">
            <Logo />
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md md:block"></div>
          <form>
            <a href='/api/auth/logout' className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-800 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
