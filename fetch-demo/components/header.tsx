import axios from "axios";
import { log } from "console";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const Header = (props: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name = props.name;
  const email = props.email;
  const router = useRouter();
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
  const navigation = [
    { name: "Home", href: "#" },
    { name: "Likes", href: "#" },
  ];

  // @ts-ignore
  const handleClick = (e) => {
    axios.post(logoutUrl, data, config).then((response) => response);
  };
  return (
    <div className="bg-white border-b-2 border-double border-gray-600">
      <div className="bg-gradient-to-r from-[#7d1f70] via-[#551653] to-[#1f081e] flex justify-end mb-2">
        <button>
        <Link href="/login">
          <div
            onClick={handleClick}
            className="inline-flex m-2 justify-center rounded-md px-4 py-2 text-sm font-medium text-[#ffa900] shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Sign Out
          </div>
        </Link>
        </button>
      </div>

      <main className="flex justify-center mx-auto max-w-7xl px-4 sm:mt-10">
        <button>
        <Link href="/">
          <img src="./fetchlogo.svg" />
        </Link>
        </button>
      </main>
      <div className="flex justify-center">
        <div className="text-[#1f081e]">find your best friend</div>
      </div>
    </div>
  );
};
