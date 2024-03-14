"use client";

import React, { useEffect } from 'react';
import Leaderboard from "../components/Leaderboard";
import Activities from "../components/Activities";
import Photos from "../components/Photos";

export default function Home() {
  useEffect(() => {
    console.log('%cKobey and Aidan were here.', 'color: #00A3E0; font-size:16px;');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <Leaderboard />
      <Photos />
      <Activities />
    </main>
  );
}
