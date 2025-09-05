'use client';
import Image from 'next/image';

export default function AppHeader() {
  return (
    <div>
    <header className="header flex items-center gap-3">
      <Image
        src="/af-web-small-b.png"
        alt="AgilityFeat / WebRTC.ventures"
        width={250}
        height={40}
        priority
      />
      <div className="flex-1 text-white text-2xl text-center font-black opacity-60 hidden md:block">
        dba WebRTC.ventures Coding Challenge
      </div>
      
    </header>
    <hr />
    <div className='p-6'>
        <h1 className="text-xl font-semibold leading-tight text-center text-white">
          Mortgage Underwriting
        </h1>
        <p className="text-xs opacity-70 text-white text-center">DTI • LTV • FICO</p>
      </div>
      <hr />
    </div>
  );
}
