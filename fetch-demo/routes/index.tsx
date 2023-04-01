import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import axios from "axios";
import { DogCard } from "../components/dogCard";

export const Index = () => {
  const url = "https://frontend-take-home-service.fetch.com/auth/login/";
  const searchUrl = "https://frontend-take-home-service.fetch.com/dogs/search";
  const dogsUrl = "https://frontend-take-home-service.fetch.com/dogs";

  const router = useRouter();
  const [dogIds, setDogIds] = useState([]);
  const [dogs, setDogs] = useState<any[]>([]);
  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const params = {
    size: 100,
  };
  const searchConfig = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  };

  const data = {
    name: "Seth",
    email: "s.freitag2001@gmail.com",
  };

  //authentification
  useEffect(() => {
    axios
      .post(url, data, config)
      .then((response) => {})
      .catch((error) => console.log(error));
  }, []);

  //get dog ids
  useEffect(() => {
    axios.get(searchUrl, searchConfig).then((response) => {
      axios.post(dogsUrl, response.data.resultIds, config).then((res) => {
        setDogs(res.data);
      });
    });
  }, []);

  //get dogs by id
  useEffect(() => {
  }, [dogs]);

  const handleFetchData = async () => {};

  return (
    <div>
      <Header />
      <button onClick={() => handleFetchData()}>Find Dogs</button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dogs?.map((dog) => (
        <DogCard key={dog.id} dog={dog}/>
      ))}
      </div>
    </div>
  );
};
