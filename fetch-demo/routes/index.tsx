import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import axios from "axios";
import { DogCard } from "../components/dogCard";
import Paginator from "../components/paginator";
import { stateAbbreviations } from "../components/stateAbbrev";
import { Footer } from "../components/footer";

export const Index = () => {
  const searchUrl = "https://frontend-take-home-service.fetch.com/dogs/search";
  const dogsUrl = "https://frontend-take-home-service.fetch.com/dogs";
  const [dogs, setDogs] = useState<any[]>([]);
  const [dogIds, setDogIds] = useState<String[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  let indexOfLastCard = currentPage * cardsPerPage;
  let indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const [nPages, setnPages] = useState(Math.ceil(dogs.length / cardsPerPage));
  const [breeds, setBreeds] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const [sort, setSort] = useState("asc");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [zips, setZips] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState<any[]>([]);
  const [match, setMatch] = useState("");

  const router = useRouter();

  let currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

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
    breeds: search,
    ageMin: ageMin,
    ageMax: ageMax,
    zipCodes: zips,
    sort: `breed:${sort}`,
    from: currentPage - 1,
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

  const locationConfig = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const locationData = {
    states: state,
    city: city,
    size: 10000,
  };

  useEffect(() => {}, [search]);

  useEffect(() => {}, [sort]);

  useEffect(() => {}, [dogIds]);

  useEffect(() => {
    const tempIds = JSON.parse(window.localStorage.getItem("dogIds") || "{}");
    if (tempIds.length > 0) {
      console.log(tempIds);
      setDogIds(tempIds);
    } else {
      setDogIds([]);
    }
  }, []);

  //get locations
  useEffect(() => {
    try {
      const stateZips: any = [];
      setZips([null]);
      axios
        .post(
          "https://frontend-take-home-service.fetch.com/locations/search",
          locationData,
          locationConfig
        )
        .then((response) => {
          const locs = response.data.results;
          locs.map((loc: any) => {
            stateZips.push(loc.zip_code);
          });
          // error on backend if zipcodes is greater than 100 in length
          if (stateZips.length > 0) {
            setZips(stateZips.slice(0, 99));
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, [state, city]);

  //get dogs
  useEffect(() => {
    try {
      axios.get(searchUrl, searchConfig).then((response) => {
        axios.post(dogsUrl, response.data.resultIds, config).then((res) => {
          setDogs(res.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, [search, sort, ageMin, ageMax, zips]);

  //set pages for pagination
  useEffect(() => {
    if (currentPage >= nPages) {
      setCurrentPage(1);
    }
    indexOfLastCard = currentPage * cardsPerPage;
    indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setnPages(Math.ceil(dogs.length / cardsPerPage));
    currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);
  }, [dogs, nPages]);

  //display dogs per page
  useEffect(() => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  useEffect(() => {
    try {
      axios
        .get("https://frontend-take-home-service.fetch.com/dogs/breeds", config)
        .then((response) => {
          setBreeds(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  //onclick generate match from array of liked dogs & push to likes page
  const handleGenerateMatch = () => {
    try {
      if (dogIds.length > 0) {
        axios
          .post(
            "https://frontend-take-home-service.fetch.com/dogs/match",
            dogIds,
            config
          )
          .then((response) => {
            window.localStorage.setItem("match", response.data.match);
            router.push({
              pathname: "/match",
            });
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //fetch the list of dogs in the "liked" dogIds array
  const handleLikePage = () => {
    router.push("/likepage");
    window.localStorage.setItem("dogIds", JSON.stringify(dogIds));
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="bg-[#e86d57c5] border-b-2 border-double border-gray-600">
        <Header />
        <div className="pt-2 px-3 flex justify-end">
          <button
            className="px-10 py-3 bg-[#551653] hover:bg-[#7d1f70] text-gray-50 rounded font-serif"
            onClick={handleLikePage}
          >
            View Likes
          </button>
        </div>
        <div className="flex justify-center text-xl pb-4">
          <div>Customize your search for the perfect match!</div>
        </div>
        <div className="align-items-center justify-items-center grid md:grid-cols-2 xl:grid-cols-6 gap-2 justify-center pb-[8vh] px-6 max-w-full">
          <div className="px-2">
            <select
              className="bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="breeds"
              onChange={(e) => {
                if (e.target.value == "") {
                  setSearch([null]);
                } else {
                  setSearch([e.target.value]);
                }
              }}
            >
              <option label="Search by breed"></option>
              {breeds.map((breed, i) => (
                <option key={i}>{breed}</option>
              ))}
            </select>
          </div>

          {/* age */}
          <div className="px-2">
            <input
              className="block bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="ageMin"
              placeholder="Age Minimum"
              onChange={(e) => {
                setAgeMin(e.target.value);
              }}
            ></input>
            <input
              className="block bg-white border mt-2 px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="ageMax"
              placeholder="Age Maximum"
              onChange={(e) => {
                setAgeMax(e.target.value);
              }}
            ></input>
          </div>

          {/* city */}
          <div className="px-2">
            <input
              className="bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="city"
              placeholder="City"
              onChange={(e) => {
                if (e.target.value == "") {
                  setCity("");
                } else {
                  setCity(e.target.value);
                }
              }}
            />
          </div>
          {/* state */}
          <div className="px-2">
            <select
              className="bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="state"
              onChange={(e) => {
                if (e.target.value == "") {
                  setState([]);
                } else {
                  setState([e.target.value]);
                }
              }}
            >
              <option label="State"></option>
              {stateAbbreviations.map((state, i) => (
                <option key={i}>{state}</option>
              ))}
            </select>
          </div>
          {/* zip code */}
          <div className="px-2">
            <input
              className="bg-white border px-2 border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="zip"
              placeholder="Zip Code"
              onChange={(e) => {
                if (e.target.value == "") {
                  setZips([null]);
                } else {
                  setZips([e.target.value]);
                }
              }}
            />
          </div>
          {/* sort */}
          <div className="px-2">
            <select
              className="bg-white border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:shadow-outline"
              id="sort"
              onChange={(e) => {
                if (e.target.value == "Ascending") {
                  setSort("asc");
                } else {
                  setSort("desc");
                }
              }}
            >
              <option defaultValue={"Ascending"}>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {currentCards?.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            dogIds={dogIds}
            setDogIds={setDogIds}
          />
        ))}
      </div>

      <Paginator
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="bg-[url('/jumpingdogbg.jpg')] bg-cover bg-blend-multiply pt-[80vh] mt-8 border-b-2 border-double border-gray-600">
        <button
          className="px-10 py-3 bg-[#551653] hover:bg-[#7d1f70] rounded font-serif text-gray-100"
          onClick={handleGenerateMatch}
          disabled={dogIds.length <= 0}
        >
          Generate Match!
        </button>
      </div>
      <Footer />
    </div>
  );
};
