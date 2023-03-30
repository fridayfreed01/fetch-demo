import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Index = () => {
  const url = "https://frontend-take-home-service.fetch.com/auth/login/";
  const router = useRouter();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: "Seth",
        email: "s.freitag2001@gmail.com",
      }),
    }).then((response) => console.log(response));
  }, []);

  const handleFetchData = () => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      method: "GET",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDogs(data);
      });
  };

  return (
    <div>
      <button onClick={() => handleFetchData()}>Find Dogs</button>
      {dogs.map((dog) => (
        <div key={dog}>
          <p>Breed: {dog}</p>
        </div>
      ))}
    </div>
  );
};
