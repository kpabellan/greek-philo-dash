"use client";
import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard?type=social');
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
      <h2 className="text-2xl">LEADERBOARD</h2>
      <div className="grid grid-cols-1 gap-3 mt-4">
        {sortedLeaders.map((leader, index) => (
          <div key={index} className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black">#{index + 1}</h3>
              <div className="w-10 h-10 rounded-full bg-gray-200 ml-2">
                <img src={`/images/logos/${leader.organization}.png`} alt={leader.organization} className="w-full h-full rounded-full ring ring-white" />
              </div>
              <h3 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pl-2 text-black text-left">{leader.organization}</h3>
            </div>
            <p className="max-w-5xl sm:text-sm md:text-base lg:text-lg xl:text-xl text-black font-semibold">{leader.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
