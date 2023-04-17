import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const url = "https://frontend-take-home-service.fetch.com/auth/login";

  const router = useRouter();

  const config = {
    headers: {
      "fetch-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      proxy: "http://localhost:3000",
    },
    withCredentials: true,
  };
  // @ts-ignore
  const handleSubmit = (e) => {
    try {
      const data = {
        name: name,
        email: email,
      };
      e.preventDefault();
      axios
        .post(url, data, config)
        .then((response) => router.push("/"))
        .catch((error) => console.log(error)),
        [];
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[url('/corgi.jpg')] bg-cover h-screen bg-[bottom] flex justify-end items-center">
      <div className="bg-[#ffffffa9] py-8 px-4 shadow sm:rounded-lg sm:px-10 w-3/4 md:w-1/3 h-1/2 mr-[10vw]">
        <div className="flex justify-center">
          <img src="fetchlogo.svg" />
        </div>
        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                // @ts-ignore
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                // @ts-ignore
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#7d1f70] to-[#551653] hover:bg-gradient-to-r hover:from-[#60195e] hover:to-[#441242] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
