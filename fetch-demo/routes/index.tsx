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
  const [breeds, setBreeds] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const [sort, setSort] = useState("asc");

  let currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
      "proxy": "http://localhost:3000",
    },
    withCredentials: true,
    "Access-Control-Allow-Headers": true,
  };
  const params = {
    size: 100,
    breeds: search,
    sort: `breed:${sort}`
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

  useEffect(() => {
  },[search]);

  useEffect(() => {
  },[sort]);

  // //get dog ids
  useEffect(() => {
    console.log(search)
    axios.get(searchUrl, searchConfig).then((response) => {
      axios.post(dogsUrl, response.data.resultIds, config).then((res) => {
        console.log(res.data);
        setDogs(res.data);
      });
    });
  }, [search, sort]);

  //set pages for pagination
  useEffect(() => {
    if(currentPage >= nPages){
      setCurrentPage(1);
    }
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
      .then((response) => {breeds.push(...response.data); setBreeds(breeds)});
  }, []);

  

  return (
    <div>
      <Header />
      <select
        id="breeds"
        onChange={(e) => {
          if (e.target.value == "") {
            setSearch([null])
          }
          else{
            setSearch([e.target.value]);
          }
        }}
      >
        <option label="Search by breed"></option>
        {breeds.map((breed, i) => (
          <option key={i}>{breed}</option>
        ))}
      </select>
      <select 
        id="sort"
        onChange={(e) => {
          if(e.target.value == "Ascending"){
            setSort("asc");
          } else {
            setSort("desc");
          }
        }}>
          <option defaultValue={"Ascending"}>Ascending</option>
          <option>Descending</option>
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
