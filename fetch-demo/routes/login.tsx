import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
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
    },
    withCredentials: true,
  };
  // @ts-ignore
  const handleSubmit = (e) => {
    const data = {
      name: name,
      email: email,
    };
    e.preventDefault();
    axios
      .post(url, data, config)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error)),
      [];
    router.push("/");
  };

  return (
    <>
      <div className="justify-center flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto w-full">
          <div className="flex justify-center">
            <img src="fetchlogo.svg" />
          </div>
          <h2 className="m-4 text-2xl text-center tracking-tight font-serif font-bold text-gray-700">
            just a bone's throw from your best friend
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="flex w-full justify-center rounded-md border border-transparent bg-purple-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
