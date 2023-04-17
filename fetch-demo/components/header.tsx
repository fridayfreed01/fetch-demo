import axios from "axios";
import Link from "next/link";
import router from "next/router";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";

export const Header = (props: any) => {
  const name = props.name;
  const email = props.email;
  const logoutUrl = "https://frontend-take-home-service.fetch.com/auth/logout";
  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
    },
    withCredentials: true,
  };
  const data = {
    name: name,
    email: email,
  };

  // @ts-ignore
  const handleClick = (e) => {
    try {
      axios.post(logoutUrl, data, config).then((response) => response);
      window.localStorage.clear();
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <div className="bg-[url('/dogtreatbg.jpg')] bg-cover bg-blend-multiply border-b-2 border-double border-gray-600">
      <div className="bg-gradient-to-r from-[#7d1f70] via-[#551653] to-[#1f081e] flex justify-end mb-[10vh] text-[#ffa900] text-xl py-2">
        <Link href="/">
          <button>
            <HomeIcon className="w-8 h-8 m-4 text-orange-500" />
          </button>
        </Link>
        <Link href="/likepage">
          <button>
            <HeartIcon className="w-8 h-8 m-4 text-orange-500" />
          </button>
        </Link>
        <Link href="/login">
          <button onClick={handleClick}>
            <ArrowRightOnRectangleIcon className="w-8 h-8 m-4 text-orange-500" />
          </button>
        </Link>
      </div>
      <div className="flex justify-center mb-[10vh]">
        <button className="bg-orange-400 rounded shadow shadow-orange-800 flex flex-col p-8">
          <Link href="/">
            <img src="./fetchlogo.svg" />
          </Link>
          <div className="text-[#1f081e] pt-2 w-full font-serif">
            find your best friend
          </div>
        </button>
      </div>
    </div>
  );
};
