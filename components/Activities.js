function Activities() {
  
  const Activity = [
    { Day: "Monday", Activity: "Philanthropy Event" },
    { Day: "Tuesday", Activity: "Philanthropy Event" },
    { Day: "Wednesday", Activity: "Philanthropy Event" },
    { Day: "Thursday", Activity: "Philanthropy Event" },
    { Day: "Friday", Activity: "Philanthropy Event" },
  ];

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">ACTIVITIES</h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {Activity.map((activity, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md outline text-center">
              <h3 className="text-xl font-semibold">{activity.Day}</h3>
              <p className="text-lg blur-sm">{activity.Activity}</p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Activities;
