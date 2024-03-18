"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const types = [
  { organizationType: 'All' },
  { organizationType: 'Social' },
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

function toGreekLetters(organization) {
  const greekMap = {
    Alpha: 'A', Beta: 'B', Gamma: 'Γ', Delta: 'Δ', Epsilon: 'E',
    Zeta: 'Z', Eta: 'H', Theta: 'Θ', Iota: 'I', Kappa: 'K',
    Lambda: 'Λ', Mu: 'M', Nu: 'N', Xi: 'Ξ', Omicron: 'O',
    Pi: 'Π', Rho: 'P', Sigma: 'Σ', Tau: 'T', Upsilon: 'Y',
    Phi: 'Φ', Chi: 'X', Psi: 'Ψ', Omega: 'Ω'
  };

  return organization.split(/\s+/).map(word => greekMap[word] || '').join('');
}

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [selectedOrganizationType, setSelectedOrganizationType] = useState(types[0]);
  const [showAll, setShowAll] = useState(false); // State to toggle visibility
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [windowWidth, setWindowWidth] = useState(undefined); // State to track window width

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      updateWidth();
      window.addEventListener('resize', updateWidth);

      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

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
        setShowAll(false);
        setIsLoading(false);
      } catch (err) {
        setShowAll(false);
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedOrganizationType]);

  const initialLeaders = leaders.slice(0, 5);
  const additionalLeaders = showAll ? leaders.slice(5) : [];
  const isDesktop = windowWidth >= 1024;

  const itemVariantFadeIn = {
    hidden: { opacity: 0.5, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariantSlideUp = (index) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
        delay: index * 0.1,
      },
    },
  });

  const DesktopLayout = ({ leader, index }) => (
    <>
      <div className="flex items-center">
        <h3 className="text-3xl text-black">#{index + 1}</h3>
        <div className="flex justify-center items-center w-10 h-10 bg-scblue rounded-full ring ring-white ml-4">
          <span className="text-sm text-white font-semibold">{toGreekLetters(leader.organization)}</span>
        </div>
        <h3 className="text-3xl pl-2 text-black text-left">{leader.organization}</h3>
      </div>
      <p className="text-3xl text-black">{leader.score.toLocaleString()}</p>
    </>
  );

  const MobileLayout = ({ leader, index }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <h3 className="text-xl text-black">#{index + 1}</h3>
        <div className="flex justify-center items-center w-10 h-10 bg-scblue rounded-full ring ring-white ml-4">
          <span className="text-sm text-white font-semibold">{toGreekLetters(leader.organization)}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <h3 className="text-3xl text-black text-center">{leader.score.toLocaleString()}</h3>
      </div>
    </div>
  );

  return (
    <div className="w-10/12 pb-10">
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
            <div className="py-2 px-4">‎</div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 mt-4">

            {initialLeaders.map((leader, index) => (
              <motion.div
                key={index}
                className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center"
                variants={itemVariantSlideUp(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {isDesktop ? <DesktopLayout leader={leader} index={index} /> : <MobileLayout leader={leader} index={index} />}
              </motion.div>
            ))}

            {additionalLeaders.map((leader, index) => (
              <motion.div
                key={`additional-${index}`}
                className="bg-scyellow h-20 p-4 rounded-md shadow-md ring ring-3 ring-white flex justify-between items-center"
                variants={itemVariantSlideUp(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {isDesktop ? <DesktopLayout leader={leader} index={index + initialLeaders.length} /> : <MobileLayout leader={leader} index={index + initialLeaders.length} />}
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
