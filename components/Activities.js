"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { motion } from 'framer-motion';

function Activities() {
  const [expandedActivityIndex, setExpandedActivityIndex] = useState(null);

  const activities = useMemo(() => [
    {
      Day: "Monday",
      Activity: "Philanthropy Event",
      MoreInfo:
        "Lorem ipsum dolor sit amet, id usu corpora consulatu conclusionemque, ius ad tollit integre quaeque. Has assum aliquip reprimique an, eam velit efficiantur cu. Cum id tollit nominavi sadipscing, vide dolorum mandamus vim an. Cum te nobis homero omnium, te duo scaevola probatus iracundia. Usu discere constituam eloquentiam ei.",
    },
    {
      Day: "Tuesday",
      Activity: "Philanthropy Event",
      MoreInfo:
        "Lorem ipsum dolor sit amet, id usu corpora consulatu conclusionemque, ius ad tollit integre quaeque. Has assum aliquip reprimique an, eam velit efficiantur cu. Cum id tollit nominavi sadipscing, vide dolorum mandamus vim an. Cum te nobis homero omnium, te duo scaevola probatus iracundia. Usu discere constituam eloquentiam ei.",
    },
    {
      Day: "Wednesday",
      Activity: "Philanthropy Event",
      MoreInfo:
        "Lorem ipsum dolor sit amet, id usu corpora consulatu conclusionemque, ius ad tollit integre quaeque. Has assum aliquip reprimique an, eam velit efficiantur cu. Cum id tollit nominavi sadipscing, vide dolorum mandamus vim an. Cum te nobis homero omnium, te duo scaevola probatus iracundia. Usu discere constituam eloquentiam ei.",
    },
    {
      Day: "Thursday",
      Activity: "Philanthropy Event",
      MoreInfo:
        "Lorem ipsum dolor sit amet, id usu corpora consulatu conclusionemque, ius ad tollit integre quaeque. Has assum aliquip reprimique an, eam velit efficiantur cu. Cum id tollit nominavi sadipscing, vide dolorum mandamus vim an. Cum te nobis homero omnium, te duo scaevola probatus iracundia. Usu discere constituam eloquentiam ei.",
    },
    {
      Day: "Friday",
      Activity: "Philanthropy Event",
      MoreInfo:
        "Lorem ipsum dolor sit amet, id usu corpora consulatu conclusionemque, ius ad tollit integre quaeque. Has assum aliquip reprimique an, eam velit efficiantur cu. Cum id tollit nominavi sadipscing, vide dolorum mandamus vim an. Cum te nobis homero omnium, te duo scaevola probatus iracundia. Usu discere constituam eloquentiam ei.",
    },
  ], []);

  useEffect(() => {
    const currentDay = new Date().toLocaleString('en-us', { weekday: 'long' });
    const currentDayActivityIndex = activities.findIndex(activity => activity.Day === currentDay);
    if (currentDayActivityIndex !== -1) {
      setExpandedActivityIndex(currentDayActivityIndex);
    }
  }, [activities]);

  // Toggle visibility of activity details
  const toggleActivity = index => {
    setExpandedActivityIndex(prevIndex => prevIndex === index ? null : index);
  };

  const fadeIn = (index) => ({
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5 + index * 0.05,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  });

  return (
    <div className="w-10/12 pb-10">
      <h2 className="text-2xl">EVENTS</h2>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {activities.map((activity, index) => {
          return (
            <motion.div
              className="cursor-pointer rounded-lg border-2 border-white bg-gray-100 p-4 text-center shadow-md"
              key={index}
              onClick={() => toggleActivity(index)}
              variants={fadeIn(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-xl font-semibold">{activity.Day}</h3>
              <p className="text-lg font-semibold">{activity.Activity}</p>
              <div className={`transition-max-height overflow-hidden duration-300 ease-in-out ${expandedActivityIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                <p className="mt-2 text-sm">{activity.MoreInfo}</p>
              </div>
              <div>
                {expandedActivityIndex === index ? <IoIosArrowDropup className="text-2xl mt-2 mx-auto" /> : <IoIosArrowDropdown className="text-2xl mt-2 mx-auto" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Activities;