'use client'

import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Pablo B. - Full-Stack Developer Portfolio</title>
        <meta name="description" content="Full-stack developer specializing in React, Next.js, and modern web technologies. Explore my projects and experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}