function Activities() {
  const activities = [
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
  ];

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">EVENTS</h2>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-lg border-2 border-white bg-gray-100 p-4 text-center shadow-md transition-all duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold">
              {activity.Day}
            </h3>
            <p className="text-lg font-semibold">
              {activity.Activity}
            </p>
            <div className="transition-max-height max-h-0 overflow-hidden delay-100 duration-500 ease-in-out group-hover:max-h-40">
              <p className="mt-2 text-sm">
                {activity.MoreInfo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
