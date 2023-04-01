import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const url = "https://frontend-take-home-service.fetch.com";

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "fetch-api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).catch((error) => {
      console.error("Fetch error: ", error);
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-5xl text-center tracking-tight font-serif font-bold text-gray-800">
            <Link href="/">fetch</Link>
          </h1>
          <h2 className="p-2 text-3xl text-center tracking-tight font-serif font-bold text-gray-700">
            just a bone's throw from your best friend
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                <Link href="/">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-purple-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
// };
