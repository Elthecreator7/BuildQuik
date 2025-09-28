"use client";
import { ProjectForm } from '@/modules/home/ui/components/ProjectForm';
import { ProjectsList } from '@/modules/home/ui/components/ProjectsList';
import Image from 'next/image';
import React from 'react'

const page = () => {

  return (
    <div className='flex flex-col max-w-5xl mx-auto w-full'>
      <section className='space-y-6 py-[16vh] 2xl:py-48'>
        <div className='flex flex-col items-center'>
          <Image
            src="/logo4.png"
            alt='brix'
            width={120}
            height={120}
            className='hidden md:block rounded-full'
          ></Image>
        </div>
        <h1 className='text-2xl md:text-5xl font-bold text-center bg-gradient-to-b from-purple-600 to-red-600 text-transparent bg-clip-text'>
          Build with Brix
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground text-center'>Create apps and websites from a single prompt</p>

        <div className='max-w-3xl mx-auto w-full'>
          <ProjectForm></ProjectForm>
        </div>
      </section>

      <ProjectsList></ProjectsList>
    </div>
  )
}

export default page