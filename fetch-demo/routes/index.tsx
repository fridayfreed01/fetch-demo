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
import { GenerateSection } from "../components/generateSection";
import Lottie from "react-lottie";
import * as animationData from "../lotties/dog.json";

export const Index = () => {
  // initialize state and variables
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

  // lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // get the dog cards for the current page
  let currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

  // config for axios requests
  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // params for dog search request
  const params = {
    size: 100,
    breeds: search,
    ageMin: ageMin,
    ageMax: ageMax,
    zipCodes: zips,
    sort: `breed:${sort}`,
    from: currentPage - 1,
  };

  // config for search axios request
  const searchConfig = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  };

  // location data for axios request
  const locationData = {
    states: state,
    city: city,
    size: 10000,
  };

  useEffect(() => {}, [search]);
  useEffect(() => {}, [sort]);

  // update dog ids if changed on likes page
  useEffect(() => {
    const tempIds = JSON.parse(window.localStorage.getItem("dogIds") || "{}");
    if (tempIds.length > 0) {
      setDogIds(tempIds);
    } else {
      setDogIds([]);
    }
  }, []);

  // get locations
  useEffect(() => {
    const stateZips: any = [];
    setZips([null]);
    axios
      .post(
        "https://frontend-take-home-service.fetch.com/locations/search",
        locationData,
        config
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

  // get dogs
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

  // set pages for pagination
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
      {currentCards.length <= 0 && (
        <>
          <div className="-ml-14 md:pr-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={defaultOptions}
              height={200}
              width={300}
            />
          </div>
          <div className="flex justify-center py-4 text-xl text-center p-2 text-#1f081e">
            Oops! Looks like no dogs match this description.
          </div>
        </>
      )}

      <Paginator
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <GenerateSection
        dogIds={dogIds}
        handleGenerateMatch={handleGenerateMatch}
      />
      <Footer />
    </div>
  );
};
