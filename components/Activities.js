"use client";

import React, {
  useState,
  useEffect,
} from "react";
import {
  IoIosArrowDropdown,
  IoIosArrowDropup,
} from "react-icons/io";

function Activities() {
  const [
    expandedActivityIndex,
    setExpandedActivityIndex,
  ] = useState(null);
  const [isLoading, setIsLoading] =
    useState(true);

  const htmlMonday = `
    <div class="bg-white text-center p-6 max-w-2xl mx-auto border border-gray-800">
      <h1 class="text-3xl font-bold text-brown-600">Derby Talks</h1>
      <p class="text-xl my-2">Monday 3/18<br>12pm - 3pm</p>

      <div class="text-left text-lg mt-4">
        <p>Come to Scholars Lane and grab a hat to give to a brother and strike up a conversation.</p>
        <p class="font-bold">Points per talk: 5,000</p>
      </div>

      <div class="text-left text-lg mt-6">
        <p class="font-bold">Bonus: Habit</p>
        <p>500 points for every dollar spent. Send your receipt to your coach to get your points.</p>
      </div>
    </div>
  `;

  const activities = [
    {
      Day: "Monday",
      Activity: "Philanthropy Event",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Tuesday",
      Activity: "Philanthropy Event",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Wednesday",
      Activity: "Philanthropy Event",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Thursday",
      Activity: "Philanthropy Event",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Friday",
      Activity: "Philanthropy Event",
      MoreInfo: htmlMonday,
    },
  ];

  useEffect(() => {
    const currentDay = new Date().toLocaleString(
      "en-us",
      { weekday: "long" },
    );
    const currentDayActivityIndex =
      activities.findIndex(
        (activity) => activity.Day === currentDay,
      );
    if (currentDayActivityIndex !== -1) {
      setExpandedActivityIndex(
        currentDayActivityIndex,
      );
    }
    setIsLoading(false);
  }, []); // Dependency array empty to run only on mount

  // Toggle visibility of activity details
  const toggleActivity = (index) => {
    setExpandedActivityIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">EVENTS</h2>
      {isLoading ? (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              onClick={() =>
                toggleActivity(index)
              }
              className="cursor-pointer rounded-lg border-2 border-white bg-gray-100 p-4 text-center shadow-md transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold">
                {activity.Day}
              </h3>
              <p className="text-lg font-semibold">
                {activity.Activity}
              </p>
              <div
                className={`transition-max-height overflow-hidden duration-500 ease-in-out ${expandedActivityIndex === index ? "max-h-screen" : "max-h-0"}`}
              >
                <div
                  className="mt-2 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: activity.MoreInfo,
                  }}
                ></div>
              </div>
              <div>
                <IoIosArrowDropdown className="mx-auto mt-2 text-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              onClick={() =>
                toggleActivity(index)
              }
              className="cursor-pointer rounded-lg border-2 border-white bg-gray-100 p-4 text-center shadow-md transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold">
                {activity.Day}
              </h3>
              <p className="text-lg font-semibold">
                {activity.Activity}
              </p>
              <div
                className={`transition-max-height overflow-hidden duration-500 ease-in-out ${expandedActivityIndex === index ? "max-h-screen" : "max-h-0"}`}
              >
                <div
                  className="mt-2 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: activity.MoreInfo,
                  }}
                ></div>
              </div>
              <div>
                {expandedActivityIndex ===
                index ? (
                  <IoIosArrowDropup className="mx-auto mt-2 text-2xl" />
                ) : (
                  <IoIosArrowDropdown className="mx-auto mt-2 text-2xl" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
