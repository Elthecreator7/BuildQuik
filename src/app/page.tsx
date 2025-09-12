import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Client from './Client';
import React, { Suspense } from 'react'

const page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "Caleb PREFETCH" }))


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback = {<p>Loading...</p>}>
        <Client></Client>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page