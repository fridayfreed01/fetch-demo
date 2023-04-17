import axios from "axios";
import { DogCard } from "../components/dogCard";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../lotties/dog.json";
import { Footer } from "../components/footer";
import { useRouter } from "next/router";

export const LikePage = () => {
  const router = useRouter();
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

  // lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // get the liked dogs if a dogid changes
  useEffect(() => {
    axios
      .post("https://frontend-take-home-service.fetch.com/dogs", dogIds, config)
      .then((response) => {
        setLikedDogs(response.data);
      })
      .catch((e) => router.push("/login"));
  }, [dogIds]);

  useEffect(() => {}, [likedDogs]);

  // get the liked dogs
  useEffect(() => {
    const tempIds = JSON.parse(window.localStorage.getItem("dogIds") || "{}");
    setDogIds(tempIds);
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/dogs",
        tempIds,
        config
      )
      .then((response) => setLikedDogs(response.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="bg-gray-100 h-screen w-full">
      <Header />
      {likedDogs.length == 0 && (
        <>
          <div className="flex justify-center py-4 text-xl text-center text-#1f081e">
            Oops! Looks like you haven't liked any dogs yet. Go back and like
            some to see them here!
          </div>
          <div className="-ml-14 md:pr-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={defaultOptions}
              height={200}
              width={300}
            />
          </div>
        </>
      )}
      <div className="bg-gray-100 py-[10vh] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {likedDogs?.map((dog: any) => (
          <DogCard
            key={dog.id}
            dog={dog}
            dogIds={dogIds}
            setDogIds={setDogIds}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
