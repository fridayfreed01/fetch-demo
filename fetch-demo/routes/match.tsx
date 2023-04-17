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
      <div className="grid grid-cols-3 justify-center">
      <div className="flex flex-col col-span-1 justify-center">
      <div className="text-3xl py-6 flex justify-end">Match found!</div>
      <div className="text-2xl flex justify-end">Meet {name}!</div>
      <Lottie options={defaultOptions} height={200} width={300} />
      </div>
      <MatchCard name={name} breed={breed} age={age} zip_code={zip} img={img} />
      </div>
      <Footer/>
    </div>
  );
};
