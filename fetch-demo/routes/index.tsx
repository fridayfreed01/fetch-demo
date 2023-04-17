import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import axios from "axios";
import { DogCard } from "../components/dogCard";
import Paginator from "../components/paginator";
import { Footer } from "../components/footer";
import { BreedSort } from "../components/breedSort";
import { AgeSort } from "../components/ageSort";
import { LocationSort } from "../components/locationSort";

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

  useEffect(() => {
    const tempIds = JSON.parse(window.localStorage.getItem("dogIds") || "{}");
    if (tempIds.length > 0) {
      setDogIds(tempIds);
    } else {
      setDogIds([]);
    }
  }, []);

  //get locations
  useEffect(() => {
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
      })
      .catch((response) => router.push("/login"));
  }, [state, city]);

  //get dogs
  useEffect(() => {
    axios
      .get(searchUrl, searchConfig)
      .then((response) => {
        axios
          .post(dogsUrl, response.data.resultIds, config)
          .then((res) => {
            setDogs(res.data);
          })
          .catch((response) => router.push("/login"));
      })
      .catch((response) => router.push("/login"));
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
    const getDogs = async () => {
      try {
        if (currentPage % 5 == 0) {
          const searchResponse = await axios.get(searchUrl, searchConfig);
          const resultIds = searchResponse.data.resultIds;
          const dogsResponse = await axios.post(dogsUrl, resultIds, config);
          dogs.push(...dogsResponse.data);
          setDogs(dogs);
          setnPages(Math.ceil(dogs.length / cardsPerPage));
        }
      } catch (e) {
        router.push("/login");
      }
    };
    getDogs();
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/breeds", config)
      .then((response) => {
        setBreeds(response.data);
      })
      .catch((response) => router.push("/login"));
  }, []);

  //onclick generate match from array of liked dogs & push to likes page
  const handleGenerateMatch = () => {
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
        })
        .catch((response) => router.push("/login"));
    }
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="bg-[url('/orangebg.jpg')] bg-center bg-cover border-b-2 border-double border-gray-600">
        <Header />
        <div className="flex justify-center text-xl text-center pb-4 pt-4">
          <div>Customize your search for the perfect match!</div>
        </div>
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-3 gap-2 items-center justify-between pb-[8vh] px-6 max-w-full lg:w-3/4">
            {/* Search by breed and ascending/descending */}
            <BreedSort
              setSearch={setSearch}
              breeds={breeds}
              setSort={setSort}
            />

            {/* Search by min/max age */}
            <AgeSort setAgeMax={setAgeMax} setAgeMin={setAgeMin} />

            {/* Search by location */}
            <LocationSort
              setCity={setCity}
              setState={setState}
              setZips={setZips}
            />
          </div>
        </div>
      </div>
      <div className="grid mt-4 md:grid-cols-2 xl:grid-cols-4">
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
      <div className="bg-[url('/jumpingdogbg.jpg')] bg-[center_1rem] bg-no-repeat bg-cover bg-start md:bg-center bg-blend-multiply mt-8 border-b-2 border-double border-gray-600 flex flex-row items-center justify-center md:justify-end">
        <div className="bg-[#ffffff7e] rounded md:w-1/2 xl:w-1/3 my-[20vh] py-14 m-2 md:mr-6 flex flex-col justify-items-center text-center shadow-[#b3b3b394] shadow-lg">
          <div className="text-2xl font-semibold font-serif py-2">
            find your
          </div>
          <div className="text-6xl font-bold font-serif pb-6 text-[#551653]">
            furry friend!
          </div>
          <button
            className="px-10 py-4 mx-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 rounded font-serif text-gray-100 text-2xl shadow-orange-700 shadow"
            onClick={handleGenerateMatch}
            disabled={dogIds.length <= 0}
          >
            generate match!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
