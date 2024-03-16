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
    <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
      <h1 class="text-scyellow text-3xl font-bold">Derby Talks</h1>
      <p class="text-xl my-2">12pm - 3pm</p>

      <div class="text-center text-lg  mt-4">
        <p class="mb-3"> Come to Scholars Lane to Grab a Hat and strike up a conversation with a brother. Remember to buy a Derby Horse for <b>$15</b> and <b>10,000</b> points to get more points later in the week .</p>
        <p class = "text-scyellow text-xl font-bold"> 5,000 points per talk</p>
      </div>

      <div class="text-center text-lg mt-10">
        <h1 class="text-scyellow text-2xl font-bold">Bonus: Habit</h1>
        <p class="text-xl my-2">2pm - 9pm</p>
        <p class = "mb-3">
          Go to the <a href="https://www.google.com/maps/place/The+Habit+Burger+Grill/@37.3340604,-120.4733384,17z/data=!3m1!4b1!4m6!3m5!1s0x8091430f14f15761:0xb81718f333cdde86!8m2!3d37.3340605!4d-120.4684675!16s%2Fg%2F11szdc5p30?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Habit</a> to support Huntsmen. Send your receipt to your coach to get your points.
        </p>
        <p class = "text-scyellow text-xl font-bold"> 500 points per dollar spent</p>
      </div>
    </div>
  `;

  const htmlTuesday = `
    <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
      <h1 class="text-scyellow text-3xl font-bold ">Wax a Sig</h1>
      <p class="text-xl my-2">12pm - 3pm</p>

      <div class="text-center text-lg  mt-4">
        <p class = "mb-3">Come to Scholars Lane to wax a brother of Sigma Chi to support the Huntman Cancer Foundation.</p>
        <p></p>
        <p class="text-scyellow text-xl font-bold mb-3">$5 for two Wax Strips and 5,000 Points</p>
        <p class="text-scyellow text-xl font-bold">6,500 Points with Derby Hoarse</p>
      </div>

      <div class="text-center text-lg mt-10">
        <h1 class="text-scyellow text-2xl font-bold ">Bonus: Bingo Stories</h1>
        <p class="text-xl my-2">3pm - 9pm</p>
        <p class = "mb-3">
          Make a donation dedicated to a brother who has a bingo card up on thier instagram or snapchat story. When you make the donation specify the squares you would like to be filled out.
        </p>
        <p class="text-scyellow text-xl font-bold mb-3">1,000 points per dollar donated</p>
        <p class="text-scyellow text-xl font-bold">10,000 points for making a bingo</p>
      </div>
    </div>
  `;

  const htmlWednsday = `
      <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
        <h1 class="text-scyellow text-3xl font-bold ">Splash a Sig</h1>
        <p class="text-xl my-2">12pm - 3pm</p>

        <div class="text-center text-lg  mt-4">
          <p class = "mb-3">Come to Scholars Lane to splash a brother of Sigma Chi with an ice cold water ballon.</p>
          <p></p>
          <p class="text-scyellow text-xl font-bold mb-3">$5 for two Water Balloons and 5,000 Points</p>
          <p class="text-scyellow text-xl font-bold">6,500 Points with Derby Hoarse</p>
        </div>

        <div class="text-center text-lg mt-10">
          <h1 class="text-scyellow text-2xl font-bold ">Bonus: Spot a Brother</h1>
          <p class="text-xl my-2">8am - 11am & 4pm - 7pm</p>
          <p class = "mb-3">
           If you find a brother on campus take a picture with him and send it to your coach to get points for your organization!
          </p>
          <p class="text-scyellow text-xl font-bold mb-3">5,000 points per picture</p>
          <p class="text-scyellow text-xl font-bold">6,500 points if you have your derby hoarse in frame</p>
        </div>
      </div>
    `;

  const htmlThursday = `
      <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
        <h1 class="text-scyellow text-3xl font-bold ">Decoration Derby</h1>
        <p class="text-xl my-2">12pm - 3pm</p>

        <div class="text-center text-lg  mt-4">
          <p class = "mb-3">Come to Scholars Lane to decorate a derby hat. Submit your best hat of your orginization to win points! </p>
          <p></p>
          <p class="text-scyellow text-xl font-bold mb-3">1st hat FREE and $5 per subsequent hat</p>
          <p class="text-scyellow text-xl font-bold">5,000 points per decorated hat</p>
        </div>

        <div class="text-center text-lg mt-10">
          <h1 class="text-scyellow text-2xl font-bold ">Bonus: Emtea & Asip</h1>
          <p class="text-xl my-2">12am - 11pm</p>
          <p class = "mb-3">
            Go to the <a href="https://www.google.com/maps/place/Em-Tea/@37.3313887,-120.469259,17z/data=!3m1!4b1!4m6!3m5!1s0x809143c6378118dd:0x30aed305f7cd855c!8m2!3d37.3313887!4d-120.4666841!16s%2Fg%2F11bv_dg428?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Emtea & Asip</a> to support Huntsmen. Send your receipt to your coach to get your points.
          </p>
          <p class="text-scyellow text-xl font-bold mb-3">500 points per dollar spent</p>
        </div>
      </div>
    `;

  const htmlFriday = `
      <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
        <h1 class="text-scyellow text-3xl font-bold ">Shave a Sig</h1>
        <p class="text-xl my-2">9pm - 10pm</p>

        <div class="text-center text-lg  mt-4">
          <p class = "mb-3"> Come to ACS 120 for the Derby Days Finale. Participating orginizations bid on volantering brothers to have thier head shaved. The points go to the highest bidder! </p>
          <p class="text-scyellow text-xl font-bold mb-3"> 1,000 points for every dollar bid going to the winning bid </p>
        </div>

        <div class="text-center text-lg mt-10">
          <h1 class="text-scyellow text-2xl font-bold">Bonus: Competitions</h1>
          <p class="mb-3">Each of the competitions are among each participating organization's category (Social, Professional, or Multicultural).</p>
          
          <!-- Wrapper div for centering the list -->
          <div class="flex justify-center">
            <!-- List items container with left alignment -->
            <div class="flex flex-col items-start">
              
              <!-- Individual list item -->
              <div class="flex items-center">
                <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
                <div>Best Decorated Hat:</div>
                <div class="text-scyellow font-bold ml-1">100,000 points</div>
              </div>
              
              <!-- Repeat for other items... -->
              <div class="flex items-center">
                <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
                <div>Most Shirts Bought:</div>
                <div class="text-scyellow font-bold ml-1">100,000 points</div>
              </div>
              
              <div class="flex items-center">
                <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
                <div>Most Donations:</div>
                <div class="text-scyellow font-bold ml-1">100,000 points</div>
              </div>

              <div class="flex items-center">
                <svg class="h-2 w-2 text-white mr-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
                <div>Most Derby Hoarses Bought:</div>
                <div class="text-scyellow font-bold ml-1">100,000 points</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;

  const htmlSaturday = `
      <div class="bg-scblue text-center p-6 max-w-2xl mx-auto">
        <h1 class="text-scyellow text-3xl font-bold ">Black and White</h1>
        <p class="text-xl my-2">6pm - 8pm</p>

        <div class="text-center text-lg  mt-4">
          <p class = "mb-3">
            All are welcome too come to <a href="https://www.google.com/maps/place/Joystiq/@37.3007488,-120.483688,17z/data=!3m1!4b1!4m6!3m5!1s0x809143cdcec0e8f3:0xe0ebbb922160c7ac!8m2!3d37.3007488!4d-120.4811131!16s%2Fg%2F11t7skw_6q?entry=ttu" target="_blank" rel="noopener noreferrer" class="font-bold underline">Joystiq</a> to celebrate all the hard work put in by all participating orginizations for the noble cause of Huntman Cancer Foundation.  
          </p>
        </div>

        <div class="text-center text-lg mt-10">
          <h1 class="text-scyellow text-2xl font-bold ">Derby Darling</h1>
          <p class = "mb-3">
            There will be one Derby Darling submitted by each participating orginization, and only one Derby Darling will be chosen across all participating orginizations. The Derby Darling is someone who was able to exemplary demonstrate thier commitment to supporting the Huntman Cancer Foundation. As such, the Derby Darling will be decided via an equal wighting of the points earned by thier orginization and vote of the brothers of Sigma Chi.
          </p>
        </div>
      </div>
    `;


  const activities = useMemo(() => [
    {
      Day: "Monday",
      MoreInfo: htmlMonday,
    },
    {
      Day: "Tuesday",
      MoreInfo: htmlTuesday,
    },
    {
      Day: "Wednesday",
      MoreInfo: htmlWednsday,
    },
    {
      Day: "Thursday",
      MoreInfo: htmlThursday,
    },
    {
      Day: "Friday",
      MoreInfo: htmlFriday,
    },
    {
      Day: "Saturday",
      MoreInfo: htmlSaturday,
    },
  ], []);

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
  }, [activities]);

  // Toggle visibility of activity details
  const toggleActivity = (index) => {
    setExpandedActivityIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  return (
    <div className="w-10/12 pb-10">
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
              <h3 className="text-3xl font-semibold">
                {activity.Day}
              </h3>
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
              <h3 className="text-3xl font-semibold">
                {activity.Day}
              </h3>
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
        </div>)
      }</div>
  );
}

export default Activities;
