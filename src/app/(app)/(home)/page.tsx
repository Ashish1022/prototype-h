"use client"

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const page = () => {

  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());

  return (
    <div>
      {JSON.stringify(categories.data)}
    </div>
  )
}

export default page