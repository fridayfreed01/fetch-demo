export const Footer = () => {
  return (
    <div className="bg-[#1a0e2ef5] bg-[url('/furbg.jpg')] bg-cover bg-blend-multiply border-b-2 border-double border-gray-900 pl-10 py-[8vh] text-gray-100 text-lg">
      <div>Seth Freitag, Fetch Frontend Take-Home, 2023</div>
      <div className=" py-4 flex flex-row items-center">
        <a href="https://github.com/fridayfreed01/fetch-demo">
          <img className="w-8 h-8" src="/github-mark-white.png" />
        </a>
        <a href="https://github.com/fridayfreed01/fetch-demo">
          <div className="pl-4">fridayfreed01</div>
        </a>
      </div>
    </div>
  );
};
