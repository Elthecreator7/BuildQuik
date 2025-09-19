"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import React, { Suspense, useState } from 'react'
import { toast } from 'sonner';

const page =  () => {
 const [value, setValue] = useState("")
  const trpc = useTRPC();
 const invoke = useMutation(trpc.invoke.mutationOptions({
  onSuccess: ()=>{
    toast.success("background job started b")
  }
 }))


 return (
    <div className='p-4 max-w-7xl mx-auto'>
      <Input value={value} onChange={((e)=> setValue(e.target.value))}></Input>
      <Button disabled= {invoke.isPending} onClick={()=> invoke.mutate({value: value})}>Build</Button>
    </div>
  )
}

export default page