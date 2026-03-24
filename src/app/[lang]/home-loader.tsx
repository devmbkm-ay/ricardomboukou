'use client';

import dynamic from 'next/dynamic';

// This Client Component's only job is to dynamically load the main component with SSR disabled.
const HomeClient = dynamic(() => import('./home-client'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-zinc-950" /> 
});

export default HomeClient;
