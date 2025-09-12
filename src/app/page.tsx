"use client";
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { toast } from 'sonner';

const page =  () => {
 const trpc = useTRPC();
 const invoke = useMutation(trpc.invoke.mutationOptions({
  onSuccess: ()=>{
    toast.success("background job started b")
  }
 }))


 return (
    <div className='p-4 max-w-7xl mx-auto'>
      <Button disabled= {invoke.isPending} onClick={()=> invoke.mutate({text: "Sup bitches"})}>Invoke Background Component</Button>
    </div>
  )
}

export default page