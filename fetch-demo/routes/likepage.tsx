import axios from "axios";
import { DogCard } from "../components/dogCard";
import { Header } from "../components/header";
import { useEffect, useState } from "react";

export const LikePage = () => {
  const [likedDogs, setLikedDogs] = useState<any>([]);
  const [dogIds, setDogIds] = useState<any>([]);
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
      .post("https://frontend-take-home-service.fetch.com/dogs", dogIds, config)
      .then((response) => {
        setLikedDogs(response.data);
      });
  }, [dogIds]);

  useEffect(() => {}, [likedDogs]);

  useEffect(() => {
    const tempIds = JSON.parse(window.localStorage.getItem("dogIds") || "{}");
    setDogIds(tempIds);
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/dogs",
        tempIds,
        config
      )
      .then((response) => setLikedDogs(response.data));
  }, []);

  return (
    <div>
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {likedDogs?.map((dog: any) => (
          <DogCard
            key={dog.id}
            dog={dog}
            dogIds={dogIds}
            setDogIds={setDogIds}
          />
        ))}
      </div>
    </div>
  );
};
