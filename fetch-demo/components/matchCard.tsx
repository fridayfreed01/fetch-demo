import { useState } from "react";

interface MatchCardProps {
  breed: string;
  name: string;
  age: string;
  zip_code: string;
  img: any;
}
export const MatchCard = (props: MatchCardProps) => {
  return (
    <div className="flex justify-center mb-4 pb-4">
      <div className="w-1/4 flex flex-col flex-shrink-1 flex-wrap m-5 rounded-lg shadow-gray-300 shadow-lg hover:shadow-gray-400 overflow-hidden">
        <div className="">
          <img
            className="w-full h-80 object-cover object-center"
            src={props.img}
            alt=""
          />
        </div>
        <div className="h-40 bg-white p-5 flex flex-col justify-between relative">
          <div className="w-3/4">
            <p className="text-xs md:text-sm font-medium text-orange-600">
              {props.breed}
            </p>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {props.name}
              </p>
              <p className="mt-3 text-base text-gray-500">Age: {props.age}</p>
              <p className="mt-3 text-base text-gray-500">
                Zip-Code: {props.zip_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
