import { SignInView } from '@/modules/ui/views/sign-in-view';
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Login = async () => {

    const session = await caller.auth.session();
    if (session.user) redirect('/');

    return <SignInView />
}

export default Login