"use client";

import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { motion } from 'framer-motion';

function Events() {
  const [
    expandedActivityIndex,
    setExpandedActivityIndex,
  ] = useState(null);

  const htmlMonday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">12pm - 3pm</p>

      <div class="text-center text-sm md:text-lg">
        <p class="mb-3"> Come to Scholars Lane to Grab a Hat and strike up a conversation with a brother. Remember to buy a Derby Horse for <b>$15</b> and <b>10,000</b> points to get more points later in the week .</p>
        <p class="text-scyellow text-lg font-bold">5,000 points per talk</p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Bonus: Habit</h1>
        <p class="my-2 text-lg md:text-xl">2pm - 9pm</p>
        <p class="mb-3 text-sm md:text-lg">
          Go to the <a href="https://www.google.com/maps/place/The+Habit+Burger+Grill/@37.3340604,-120.4733384,17z/data=!3m1!4b1!4m6!3m5!1s0x8091430f14f15761:0xb81718f333cdde86!8m2!3d37.3340605!4d-120.4684675!16s%2Fg%2F11szdc5p30?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Habit</a> to support Huntsmen. Send your receipt to your coach to get your points.
        </p>
        <p class="text-scyellow text-lg font-bold">500 points per dollar spent</p>
      </div>
    </div>
  `;

  const htmlTuesday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">12pm - 3pm</p>
      <div class="text-center text-sm md:text-lg">
        <p class = "mb-3">Come to Scholars Lane to wax a brother of Sigma Chi to support the Huntsman Cancer Foundation.</p>
        <p></p>
        <p class="text-scyellow text-lg font-bold mb-3">$5 for two Wax Strips and 5,000 Points</p>
        <p class="text-scyellow text-lg font-bold">6,500 Points with Derby Horse</p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Bonus: Bingo Stories</h1>
        <p class="my-2 text-lg md:text-xl">3pm - 9pm</p>
        <p class="mb-3 text-sm md:text-lg">
          Make a donation dedicated to a brother who has a bingo card up on their Instagram or Snapchat story. When you make the donation specify the squares you would like to be filled out.
        </p>
        <p class="text-scyellow text-lg font-bold mb-3">1,000 points per dollar donated</p>
        <p class="text-scyellow text-lg font-bold">10,000 points for making a bingo</p>
      </div>
    </div>
  `;

  const htmlWednesday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">12pm - 3pm</p>

      <div class="text-center text-sm md:text-lg">
        <p class="mb-3">Come to Scholars Lane to splash a brother of Sigma Chi with an ice cold water balloon.</p>
        <p></p>
        <p class="text-scyellow text-lg font-bold mb-3">$5 for two Water Balloons and 5,000 Points</p>
        <p class="text-scyellow text-lg font-bold">6,500 Points with Derby Horse</p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Bonus: Spot a Brother</h1>
        <p class="my-2 text-lg md:text-xl">8am - 11am & 4pm - 7pm</p>
        <p class="mb-3 text-sm md:text-lg">
          If you find a brother on campus take a picture with him and send it to your coach to get points for your organization!
        </p>
        <p class="text-scyellow text-lg font-bold mb-3">5,000 points per picture</p>
        <p class="text-scyellow text-lg font-bold">6,500 points if you have your derby horse in frame</p>
      </div>
    </div>
  `;

  const htmlThursday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">12pm - 3pm</p>

      <div class="text-center text-sm md:text-lg">
        <p class="mb-3">Come to Scholars Lane to decorate a derby hat. Submit your best hat of your organization to win points! </p>
        <p></p>
        <p class="text-scyellow text-lg font-bold mb-3">1st hat FREE and $5 per subsequent hat</p>
        <p class="text-scyellow text-lg font-bold">5,000 points per decorated hat</p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Bonus: Emtea & Asip</h1>
        <p class="my-2 text-lg md:text-xl">12am - 11pm</p>
        <p class="mb-3 text-sm md:text-lg">
          Go to the <a href="https://www.google.com/maps/place/Em-Tea/@37.3313887,-120.469259,17z/data=!3m1!4b1!4m6!3m5!1s0x809143c6378118dd:0x30aed305f7cd855c!8m2!3d37.3313887!4d-120.4666841!16s%2Fg%2F11bv_dg428?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Emtea & Asip</a> to support Huntsmen. Send your receipt to your coach to get your points.
        </p>
        <p class="text-scyellow text-lg font-bold">500 points per dollar spent</p>
      </div>
    </div>
  `;

  const htmlFriday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">9pm - 10pm</p>

      <div class="text-center text-sm md:text-lg">
        <p class="mb-3"> Come to ACS 120 for the Derby Days Finale. Participating organizations bid on volunteering brothers to have their head shaved. The points go to the highest bidder! </p>
        <p class="text-scyellow text-lg font-bold mb-3"> 1,000 points for every dollar bid going to the winning bid </p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Bonus: Competitions</h1>
        <p class="mb-3 text-sm md:text-lg">Each of the competitions are among each participating organization's category (Social, Professional, or Multicultural).</p>
        
        <div class="flex justify-center">
          <div class="flex flex-col items-start">
            
            <div class="flex items-center text-sm md:text-lg">
              <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              <div>Best Decorated Hat:</div>
              <div class="text-scyellow font-bold ml-1">100,000 points</div>
            </div>
            
            <div class="flex items-center text-sm md:text-lg">
              <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              <div>Most Shirts Bought:</div>
              <div class="text-scyellow font-bold ml-1">100,000 points</div>
            </div>
            
            <div class="flex items-center text-sm md:text-lg">
              <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              <div>Most Donations:</div>
              <div class="text-scyellow font-bold ml-1">100,000 points</div>
            </div>

            <div class="flex items-center text-sm md:text-lg">
              <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              <div>Most Horses Bought:</div>
              <div class="text-scyellow font-bold ml-1">100,000 points</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  const htmlSaturday = `
    <div class="bg-scblue text-center max-w-2xl mx-auto">
      <p class="my-2 text-lg md:text-xl">6pm - 8pm</p>

      <div class="text-center text-sm md:text-lg">
        <p class="mb-3">
          All are welcome to come to <a href="https://www.google.com/maps/place/Joystiq/@37.3007488,-120.483688,17z/data=!3m1!4b1!4m6!3m5!1s0x809143cdcec0e8f3:0xe0ebbb922160c7ac!8m2!3d37.3007488!4d-120.4811131!16s%2Fg%2F11t7skw_6q?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Joystiq</a> to celebrate all the hard work put in by all participating organizations for the noble cause of Huntsman Cancer Foundation.  
        </p>
      </div>

      <div class="text-center text-lg mt-5">
        <h1 class="text-scyellow font-bold text-2xl md:text-3xl">Derby Darling</h1>
        <p class="text-sm md:text-lg">
          There will be one Derby Darling submitted by each participating organization, and only one Derby Darling will be chosen across all participating organizations. The Derby Darling is someone who was able to exemplarily demonstrate their commitment to supporting the Huntsman Cancer Foundation. As such, the Derby Darling will be decided via an equal weighting of the points earned by their organization and vote of the brothers of Sigma Chi.
        </p>
      </div>
    </div>
  `;

  const activities = [
    {
      Day: "Monday",
      Activity: "Derby Talks",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Tuesday",
      Activity: "Wax a Sig",
      MoreInfo: htmlTuesday,
    },
    {
      Day: "Wednesday",
      Activity: "Splash a Sig",
      MoreInfo: htmlWednesday,
    },
    {
      Day: "Thursday",
      Activity: "Decoration Derby",
      MoreInfo: htmlThursday,
    },
    {
      Day: "Friday",
      Activity: "Shave a Sig",
      MoreInfo: htmlFriday,
    },
    {
      Day: "Saturday",
      Activity: "Black and White",
      MoreInfo: htmlSaturday,
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
  }, []); // Dependency array empty to run only on mount

  // Toggle visibility of activity details
  const toggleActivity = (index) => {
    setExpandedActivityIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
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
              <h1 className="text-scyellow font-bold text-2xl md:text-3xl">{activity.Activity}</h1>
              <div className={`transition-max-height overflow-hidden duration-300 ease-in-out ${expandedActivityIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                <div
                  className="mt-2 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: activity.MoreInfo,
                  }}
                >
                </div>
              </div>
              <div>
                {expandedActivityIndex ===
                  index ? (
                  <IoIosArrowDropup className="mx-auto mt-2 text-2xl" />
                ) : (
                  <IoIosArrowDropdown className="mx-auto mt-2 text-2xl" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;