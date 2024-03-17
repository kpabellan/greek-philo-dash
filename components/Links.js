function Links() {
  return (
    <div className="w-10/12 pb-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl flex-grow">LINKS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img src="https://res.cloudinary.com/diibozwlr/image/upload/v1710654602/derbydaysshirt.png"
            alt="Derby Days Shirts"
            className="w-full h-48 object-contain"
            style={{ backgroundColor: '#F2E7DC' }}
          />
          <div className="p-5">
            <h3 className="text-white text-lg font-semibold mb-2">Derby Days Shirts</h3>
            <p className="text-white text-opacity-80 mb-4">Support our event by purchasing official Derby Days shirts. A portion of the proceeds will go towards our charitable cause.</p>
            <a href="https://app.greekhouse.org/store/Derby-Days-2024-120910"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-semibold rounded">
              Shop Now
            </a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img src="https://res.cloudinary.com/diibozwlr/image/upload/v1710654515/huntsmanlogo.png"
            alt="Huntsman Cancer Institute Donation"
            className="w-full h-48 object-contain bg-huntsmancolor"
            style={{ backgroundColor: '#F2E7DC' }}
          />
          <div className="p-5">
            <h3 className="text-white text-lg font-semibold mb-2">Huntsman Cancer Institute Donation</h3>
            <p className="text-white text-opacity-80 mb-4">Make a difference today by donating to the Huntsman Cancer Institute. Every contribution helps us get one step closer to our goal.</p>
            <a href="https://hope.huntsmancancer.org/gentoend/lambda-delta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-semibold rounded">
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;