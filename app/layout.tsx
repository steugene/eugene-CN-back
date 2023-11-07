'use client'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import React from 'react';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  )
}
