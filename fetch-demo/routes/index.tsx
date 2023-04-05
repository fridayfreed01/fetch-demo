import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import axios from "axios";
import { DogCard } from "../components/dogCard";
import Paginator from "../components/paginator";

export const Index = () => {
  const searchUrl = "https://frontend-take-home-service.fetch.com/dogs/search";
  const dogsUrl = "https://frontend-take-home-service.fetch.com/dogs";

  const [dogs, setDogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  let indexOfLastCard = currentPage * cardsPerPage;
  let indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const [nPages, setnPages] = useState(Math.ceil(dogs.length / cardsPerPage));
  const [breeds, setBreeds] = useState([]);
  const [search, setSearch] = useState("");

  let currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    "Access-Control-Allow-Headers": true,
  };
  const params = {
    size: 100,
    from: dogs.length - 1,
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

  //get dog ids
  useEffect(() => {
    axios.get(searchUrl, searchConfig).then((response) => {
      axios.post(dogsUrl, response.data.resultIds, config).then((res) => {
        setDogs(res.data);
      });
    });
  }, []);

  //set pages for pagination
  useEffect(() => {
    indexOfLastCard = currentPage * cardsPerPage;
    indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setnPages(Math.ceil(dogs.length / cardsPerPage));
    currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);
  }, [dogs, nPages]);

  //display dogs per page
  useEffect(() => {
    const getDogs = async () => {
      if (currentPage % 5 == 0) {
        const searchResponse = await axios.get(searchUrl, searchConfig);
        const resultIds = searchResponse.data.resultIds;
        const dogsResponse = await axios.post(dogsUrl, resultIds, config);
        dogs.push(...dogsResponse.data);
        setDogs(dogs);
        setnPages(Math.ceil(dogs.length / cardsPerPage));
      }
    };
    getDogs();
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/breeds", config)
      .then((response) => setBreeds(response.data));
  }, []);

  return (
    <div>
      <Header />
      <select
        id="breeds"
        onSelect={(e) => {
          //use e to filter the dogs that are available
        }}
      >
        {breeds.map((opts, i) => (
          <option key={i}>{opts}</option>
        ))}
      </select>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentCards?.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
      <Paginator
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
