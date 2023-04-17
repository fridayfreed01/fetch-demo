export const AgeSort = (props: any) => {
  return (
    <>
      {/* age */}
      <div className="w-full my-2 flex lg:justify-center">
        <div className="flex flex-col w-1/2">
          <input
            className="bg-white border mt-2 px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
            id="ageMin"
            placeholder="Age Min"
            onChange={(e) => {
              props.setAgeMin(e.target.value);
            }}
          ></input>
          <input
            className=" bg-white border mt-2 px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
            id="ageMax"
            placeholder="Age Max"
            onChange={(e) => {
              props.setAgeMax(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </>
  );
};
