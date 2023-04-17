import axios from "axios";
import Link from "next/link";
import router from "next/router";
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
            <div className="px-4 py-2">Home</div>
          </button>
        </Link>
        <Link href="/likepage">
          <button>
            <div className="px-4 py-2">Favorites</div>
          </button>
        </Link>
        <Link href="/login" onClick={handleClick}>
          <button>
            <div className="px-4 py-2">Sign Out</div>
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
