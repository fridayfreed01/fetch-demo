interface DogCardProps {
  setDogIds: any,
  dogIds:Array<any>,
  dog: any
}
export const DogCard = (props: DogCardProps) => {
  const handleImageSelect = () => {
      const newDogIds = props.dogIds;
      console.log(newDogIds)
      props.setDogIds([...props.dogIds, props.dog.id])
  };

  return (
    <div className="flex col-span-1 justify-center mb-4" key={props.dog.key}>
      <div className="w-3/4 flex flex-col flex-shrink-1 flex-wrap m-5 rounded-lg shadow-gray-300 shadow-lg hover:shadow-gray-400 overflow-hidden">
        <div className="">
          <img
            className="w-full h-72 object-cover object-center"
            src={props.dog.img}
            alt=""
          />
        </div>
        <div className="h-40 bg-white p-5 flex flex-col justify-between relative">
          <div className="w-3/4">
            <p className="text-xs md:text-sm font-medium text-orange-600">
              {props.dog.breed}
            </p>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {props.dog.name}
              </p>
              <p className="mt-3 text-base text-gray-500">
                Age: {props.dog.age}
              </p>
              <p className="mt-3 text-base text-gray-500">
                Zip-Code: {props.dog.zip_code}
              </p>
            </div>
          </div>
          <button
            className="absolute bottom-4 right-4 px-3 py-2 bg-orange-400 hover:bg-orange-500 rounded font-serif text-gray-100"
            onClick={handleImageSelect}
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};
