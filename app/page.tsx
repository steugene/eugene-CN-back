'use client'
import RootLayout from '@/app/layout';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function Home() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user) router.push("/admin")
    }, [user])

  return (
        <RootLayout>
            <button className="dos-button" onClick={() => router.push("/signin")}>
                get in
            </button>
            <span className="cursor"></span>
        </RootLayout>
)
}