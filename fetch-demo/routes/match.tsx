import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useRouter, NextRouter, withRouter } from "next/router";
import axios from "axios";
import { MatchCard } from "../components/matchCard";

export const MatchPage = () => {
  const router = useRouter();
  const [age, setAge] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [match, setMatch] = useState<any>();

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
      <div className="flex justify-center text-3xl py-6">Match found!</div>
      <div className="flex justify-center text-2xl">Meet {name}!</div>
      <MatchCard name={name} breed={breed} age={age} zip_code={zip} img={img} />
    </div>
  );
};
