"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const types = [
  { organizationType: 'All' },
  { organizationType: 'Social' },
  { organizationType: 'Multicultural' },
  { organizationType: 'Professional' },
];

const LeaderboardPlaceholder = () => (
  <div className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center animate-pulse">
    <div className="flex items-center">
      <div className="bg-gray-300 h-8 w-8 rounded-md"></div>
      <div className="ml-2 w-32 bg-gray-300 h-6 rounded-md"></div>
    </div>
    <div className="w-16 bg-gray-300 h-6 rounded-md"></div>
  </div>
);

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [selectedOrganizationType, setSelectedOrganizationType] = useState(types[0]);
  const [showAll, setShowAll] = useState(false); // State to toggle visibility
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/leaderboard?organizationType=${encodeURIComponent(selectedOrganizationType.organizationType)}`);
        const data = await res.json();

        if (Array.isArray(data.leaders)) {
          setLeaders(data.leaders.sort((a, b) => b.score - a.score));
        } else {
          setLeaders([]);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedOrganizationType]);

  const initialLeaders = leaders.slice(0, 5);
  const additionalLeaders = showAll ? leaders.slice(5) : [];

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
                  <span className="block truncate">{type.organizationType}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {Array.from({ length: showAll ? 10 : 5 }).map((_, index) => (
              <LeaderboardPlaceholder key={index} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <div className="py-2 px-4">‎ </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 mt-4">

            {initialLeaders.map((leader, index) => (
              <div
                key={index}
                className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center"
              >
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

            {additionalLeaders.map((leader, index) => (
              <motion.div
                key={`additional-${index}`}
                className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex items-center">
                  <h3 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black">#{index + 1 + initialLeaders.length}</h3>
                  <div className="w-10 h-10 rounded-full bg-gray-200 ml-2">
                    <img src={`/images/logos/${leader.organization}.png`} alt={leader.organization} className="w-full h-full rounded-full ring ring-white" />
                  </div>
                  <h3 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pl-2 text-black text-left">{leader.organization}</h3>
                </div>
                <p className="max-w-5xl sm:text-sm md:text-base lg:text-lg xl:text-xl text-black font-semibold">{leader.score}</p>
              </motion.div>
            ))}

          </div>
          {leaders.length > 5 && (
            <div className="mt-4 flex justify-center">
              <button onClick={() => setShowAll(!showAll)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                {showAll ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Leaderboard;
