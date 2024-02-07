"use client";
import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        
        if (Array.isArray(data.leaders)) {
          setLeaders(data.leaders);
        }
      } catch (err) {
        // Handle error
      }
    };
  
    fetchLeaderboard();
  }, []);

  if (leaders === null) {
    return <div>Loading...</div>;
  }

  const sortedLeaders = [...leaders].sort((a, b) => b.score - a.score);

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl underline">LEADERBOARD</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {sortedLeaders.map((leader, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md outline text-center flex justify-between items-center">
            <h3 className="text-3xl font-semibold">#{index + 1}</h3>
            <div className="flex-grow flex flex-col items-center">
              <h3 className="text-xl font-semibold">{leader.organization}</h3>
              <p className="text-lg">Score: {leader.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
