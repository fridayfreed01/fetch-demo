import { useEffect, useState } from "react";

interface DogCardProps {
  setDogIds: any;
  dogIds: Array<any>;
  dog: any;
}
export const DogCard = (props: DogCardProps) => {
  const [buttonText, setButtonText] = useState("Like");

  // Logic for changing liked dog
  const handleSelect = () => {
    if (buttonText == "Like") {
      props.setDogIds([...props.dogIds, props.dog.id]);
      setButtonText("Unlike");
    } else if (buttonText == "Unlike") {
      setButtonText("Like");
      props.setDogIds(props.dogIds.filter((id) => id != props.dog.id));
    }
    window.localStorage.setItem("dogIds", JSON.stringify(props.dogIds));
  };

  //save the liked state through page change
  useEffect(() => {
    if (props.dogIds.includes(props.dog.id)) {
      setButtonText("Unlike");
    } else {
      setButtonText("Like");
    }
  }, []);


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
            <p className="text-xs md:text-sm font-medium text-#1f081e">
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
            className="absolute bottom-4 right-4 px-3 py-2 bg-orange-400 hover:bg-orange-500 rounded font-serif text-gray-800"
            onClick={handleSelect}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
