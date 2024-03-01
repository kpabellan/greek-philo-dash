export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center pb-2">
          <img
            src="/images/huntsman.jpg"
            alt="Sigma Chi Logo"
            className="h-20"
          />
        </div>
        <p className="ml-auto">ΣX Derby Days '24</p>
        <hr className="text-white" />
      </header>
      <hr />
    </>
  );
}
