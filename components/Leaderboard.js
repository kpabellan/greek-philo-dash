"use client";
import React, {
  useState,
  useEffect,
} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const types = [
  { organizationType: "All" },
  { organizationType: "Social" },
  { organizationType: "Multicultural" },
  { organizationType: "Professional" },
];

function Leaderboard() {
  const [leaders, setLeaders] = useState(null);
  const [
    selectedOrganizationType,
    setSelectedOrganizationType,
  ] = useState(types[0]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(
          `/api/leaderboard?organizationType=${encodeURIComponent(selectedOrganizationType.organizationType)}`,
        );
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

  const [expanded, setExpanded] = useState(false);

  const [displayData, setDisplayData] = useState(
    [],
  );

  const [containerHeight, setContainerHeight] =
    useState(300); // Default height

  useEffect(() => {
    if (leaders != null) {
      const sortedLeaders = [...leaders].sort(
        (a, b) => b.score - a.score,
      );
      const limitedLeaders = expanded
        ? sortedLeaders
        : sortedLeaders.slice(0, 5);
      const mappedData = limitedLeaders.map(
        (leader, index) => ({
          name: leader.organization,
          score: Number(leader.score),
          rank: index + 1,
        }),
      );
      setDisplayData(mappedData);
    }
  }, [leaders, expanded]);

  const BAR_HEIGHT = 60;
  const MAX_BARS_SHOWN = 5;

  useEffect(() => {
    let numItemsDisplayed = expanded
      ? leaders?.length ?? 0
      : Math.min(
          leaders?.length ?? 0,
          MAX_BARS_SHOWN,
        );

    setContainerHeight(
      BAR_HEIGHT * numItemsDisplayed,
    );
  }, [leaders, expanded]);

  // Event handler for the toggle button
  const handleToggleClick = () => {
    setExpanded(!expanded);
  };

  if (displayData.length === 0) {
    return <div>Loading...</div>;
  }

  const CustomTick = (props) => {
    const { x, y, payload } = props;

    const imgUrl = `/images/logos/${payload.value}.png`;

    const rank = payload.index + 1; // Assuming the first tick has a rank of 1

    return (
      <g transform={`translate(${x},${y})`}>
        <image
          href={imgUrl}
          width={50}
          height={50}
          x={-75}
          y={-25}
          textAnchor="middle"
        />
        <text
          x={-12} // Centered horizontally at the tick's x position
          y={7} // Position below the image
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={"20px"}
        >
          {"#" + rank}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p
            style={{ color: "#000" }}
          >{`${data.name}`}</p>
          <p
            style={{ color: "#000" }}
          >{`${data.score} points`}</p>
        </div>
      );
    }

    return null;
  };

  const CustomBarLabel = (props) => {
    const { x, y, width, height, value } = props;
    const fontSize = Math.min(
      Math.max(height * 0.6, 10),
      22,
    );

    if (width > 50) {
      return (
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill="#000"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize + "px"}
        >
          {value}
        </text>
      );
    }

    return null;
  };

  return (
    <div className="w-3/4 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="flex-grow text-2xl">
          LEADERBOARD
        </h2>

        <div className="relative w-28">
          <Listbox
            value={selectedOrganizationType}
            onChange={setSelectedOrganizationType}
          >
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-2 pr-2 text-left text-sm text-black">
              {
                selectedOrganizationType.organizationType
              }
              <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm text-black shadow-lg">
              {types.map((type, typeIdx) => (
                <Listbox.Option
                  key={typeIdx}
                  className={`relative flex cursor-default select-none items-center py-2 pl-2 pr-2 text-left ${selectedOrganizationType === type ? "font-bold" : "font-normal"}`}
                  value={type}
                >
                  <div className="relative flex w-full items-center">
                    <span
                      className={`block truncate`}
                    >
                      {type.organizationType}
                    </span>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={containerHeight}
      >
        <BarChart
          layout="vertical"
          data={displayData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <XAxis
            type="number"
            tick={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={<CustomTick />}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="score"
            fill="#fec141"
            animationDuration={800}
            animationEasing="ease-in-out"
            label={<CustomBarLabel />}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center">
        <button
          onClick={handleToggleClick}
          className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
