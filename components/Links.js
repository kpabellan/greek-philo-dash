import Image from 'next/image';

function Links() {
  return (
    <div className="w-10/12 pb-10 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl flex-grow">LINKS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <Image src="https://res.cloudinary.com/diibozwlr/image/upload/v1710654602/derbydaysshirt.png"
            alt="Derby Days Shirts"
            width={1920}
            height={1080}
            className="w-full h-48 object-contain"
            style={{ backgroundColor: '#F2E7DC' }}
          />
          <div className="p-5">
            <h3 className="text-white text-lg font-semibold mb-2">Derby Days Shirts</h3>
            <p className="text-white text-opacity-80 mb-4">Support our event by purchasing official Derby Days shirts. Remember to send you coach a recipt of your order.</p>
            <p className="text-scyellow font-bold">30,000 points before wednesday</p>
            <p className="text-scyellow font-bold mb-4">25,000 points otherwise</p>
            <a href="https://app.greekhouse.org/store/Derby-Days-2024-120910"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-semibold rounded">
              Shop Now
            </a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <Image src="https://res.cloudinary.com/diibozwlr/image/upload/v1710654515/huntsmanlogo.png"
            alt="Huntsman Cancer Institute Donation"
            width={1920}
            height={1080}
            className="w-full h-48 object-contain bg-huntsmancolor"
            style={{ backgroundColor: '#F2E7DC' }}
          />
          <div className="p-5">
            <h3 className="text-white text-lg font-semibold mb-2">Huntsman Cancer Foundation Donation</h3>
            <p className="text-white text-opacity-80 mb-4">Make a difference today by donating to the Huntsman Cancer Foundation directly. Every contribution helps us get one step closer to our goal.</p>
            <p className="text-scyellow font-bold mb-4">2,000 points for every dollar donated</p>
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