import { useEffect, useState } from "react";
import { Header } from "../components/header";
import axios from "axios";
import { MatchCard } from "../components/matchCard";
import * as animationData from "../lotties/matchdog.json";
import Lottie from "react-lottie";
import { Footer } from "../components/footer";

export const MatchPage = () => {
  const [age, setAge] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [name, setName] = useState<string>("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  useEffect(() => {
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/dogs",
        [window.localStorage.getItem("match")],
        config
      )
      .then((response) => {
        console.log(response.data[0].name);
        setName(response.data[0].name);
        setAge(response.data[0].age);
        setImg(response.data[0].img);
        setBreed(response.data[0].breed);
        setZip(response.data[0].zip_code);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="bg-[url('/confettibg.jpg')] bg-contain bg-blend-multiply bg-pink-50 w-full flex justify-center">
        <div className="flex flex-col justify-center md:flex-row w-3/4 m-8 p-4 bg-[#ffffffef] rounded-lg shadow">
          <div className="flex flex-col justify-center">
            <div className="text-2xl font-semibold font-serif py-2">
              Match found!
            </div>
            <div className="text-4xl md:text-6xl font-bold font-serif pb-6 text-[#551653]">
              Meet {name}!
            </div>
            <div className="">
              <Lottie
                isClickToPauseDisabled={true}
                options={defaultOptions}
                height={200}
                width={200}
              />
            </div>
          </div>
          <MatchCard
            name={name}
            breed={breed}
            age={age}
            zip_code={zip}
            img={img}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
