import Image from 'next/image';

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/derbydays.svg" alt="Sigma Chi Logo" className="h-20" />

        </div>
        <p className="ml-auto">ΣX Derby Days &apos;24</p>
        <hr className="text-white" />
      </header>
      <hr />
    </>
  );
}
