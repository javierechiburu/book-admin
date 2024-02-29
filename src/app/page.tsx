"use client";
import Logo from '@/components/Logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import {loginWithGoogle} from '@/firebase/client';
import { useRouter } from 'next/navigation';
import  useUser  from '@/hooks/useUser'
import { Button } from '@/components/Buttons';

export default function Page() {
  useUser();
  const router = useRouter();

  const handleLogin = () => {
    loginWithGoogle().then(() => router.replace('/admin')).catch((error) => {
      console.log({error})
    })
  }


  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-800 p-4 md:h-52">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Macoña.</strong> This is the BEST website{' '}
            in the WORLD!
          </p>
          <Button
              onClick={handleLogin}
              className="self-start"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/hero-desktop.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshots of the dashboard project showing mobile version"
            />
        </div>
      </div>
    </main>
  );
}
