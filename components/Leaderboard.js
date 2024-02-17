"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const types = [
  { organizationType: 'All' },
  { organizationType: 'Social' },
  { organizationType: 'Multicultural' },
  { organizationType: 'Professional' },
];

function Leaderboard() {
  const [leaders, setLeaders] = useState(null);
  const [selectedOrganizationType, setSelectedOrganizationType] = useState(types[0]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/leaderboard?organizationType=${encodeURIComponent(selectedOrganizationType.organizationType)}`);
        const data = await res.json();

        if (Array.isArray(data.leaders)) {
          setLeaders(data.leaders);
        }
      } catch (err) {
        // Handle error
      }
    };

    fetchLeaderboard();
  }, [selectedOrganizationType]);


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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl flex-grow">LEADERBOARD</h2>

        <div className="relative w-28">
          <Listbox value={selectedOrganizationType} onChange={setSelectedOrganizationType}>
            <Listbox.Button className="relative w-full py-2 pl-2 pr-2 bg-white text-black text-left rounded-md cursor-default text-sm">
              {selectedOrganizationType.organizationType}
              <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute w-full py-1 mt-1 bg-white text-black overflow-auto rounded-md shadow-lg max-h-60 text-sm z-10">
              {types.map((type, typeIdx) => (
                <Listbox.Option
                  key={typeIdx}
                  className={`relative cursor-default select-none py-2 pl-2 pr-2 text-left flex items-center ${selectedOrganizationType === type ? 'font-bold' : 'font-normal'}`}
                  value={type}>
                  <div className="relative w-full flex items-center">
                    <span className={`block truncate`}>
                      {type.organizationType}
                    </span>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      
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
