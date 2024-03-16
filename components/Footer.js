import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <hr className="text-gray-400" />
      <div className="flex items-center justify-center py-5">
        <Image src="/images/expectmore.png" alt="Expect More" width={150} height={150} className="w-auto" priority />
      </div>
    </>
  );
}
