export const GenerateSection = (props: any) => {
  return (
    <div className="bg-[url('/jumpingdogbg.jpg')] bg-[center_1rem] bg-no-repeat bg-cover bg-start md:bg-center bg-blend-multiply mt-8 border-b-2 border-double border-gray-600 flex flex-row items-center justify-center md:justify-end">
      <div className="bg-[#ffffff7e] rounded md:w-1/2 xl:w-1/3 my-[20vh] py-14 m-2 md:mr-6 flex flex-col justify-items-center text-center shadow-[#b3b3b394] shadow-lg">
        <div className="text-2xl font-semibold font-serif py-2">find your</div>
        <div className="text-6xl font-bold font-serif pb-6 text-[#551653]">
          furry friend!
        </div>
        <button
          className="px-10 py-4 mx-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 rounded font-serif text-gray-100 text-2xl shadow-orange-700 shadow"
          onClick={props.handleGenerateMatch}
          disabled={props.dogIds.length <= 0}
        >
          generate match!
        </button>
      </div>
    </div>
  );
};
