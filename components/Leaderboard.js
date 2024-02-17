"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Leaderboard() {
  // const [leaders, setLeaders] = useState(null);

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const res = await fetch('/api/leaderboard');
  //       const data = await res.json();

  //       if (Array.isArray(data.leaders)) {
  //         setLeaders(data.leaders);
  //       }
  //     } catch (err) {
  //       console.log("Erorr: failed fetch of google sheets data")
  //     }
  //   };

  //   fetchLeaderboard();
  // }, []);

  let leaders = [{ organization: 'Delta Delta Delta', score: 1000 }, 
  { organization: 'Delta Gamma', score: 900 }, 
  { organization: 'Kappa Kappa Gamma', score: 700 },
  { organization: 'Phi Mu', score: 500}]

  if (leaders === null) {
    return <div>Loading...</div>;
  }

  const sortedLeaders = [...leaders].sort((a, b) => b.score - a.score);


  const data = sortedLeaders.map((leader, index) => ({
    name: leader.organization,
    score: Number(leader.score),
    rank: index + 1,
  }));

  const CustomTick = (props) => {
    const { x, y, payload} = props;
  
    const imgUrl = `/images/logos/${payload.value}.png`;
  
    return (
      <g transform={`translate(${x},${y})`}>
          <image href={imgUrl} width={50} height={50} x={-50} y={-25} textAnchor="middle" />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
          <p style={{ color: "#000" }}>{`${data.name}`}</p>
          <p style={{ color: "#000" }}>{`${data.score} points`}</p>
        </div>
      );
    }
  
    return null;
  };

  const CustomBarLabel = (props) => {
    const { x, y, width, value } = props;

    const scoreThreshold = 10; // Adjust this value as needed
  
    // Only render the label if the score is above the threshold and the bar is wide enough
    if (value > scoreThreshold) {
      return (
        <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      );
    }
  
    return null;
  };
  
  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">LEADERBOARD</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical" // Use "vertical" layout for bars to grow rightward
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" tick={false} axisLine={false}/>
          <YAxis type="category" dataKey="name" tick={<CustomTick />} width={80} /> {/* Adjust width as needed */}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" fill="#fec141"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Leaderboard;
