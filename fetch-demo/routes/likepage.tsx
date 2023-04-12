import axios from "axios";
import { DogCard } from "../components/dogCard";
import { Header } from "../components/header";
import { useEffect, useState } from "react";

export const LikePage = () => {
  const [age, setAge] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [name, setName] = useState<string>("");

  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  

  return (
    <div>
      <Header />
      {/* display liked dogs here */}
        
    </div>
  );
};
