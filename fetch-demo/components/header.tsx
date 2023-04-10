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
        <Link href="/login">
          <div
            onClick={handleClick}
            className="inline-flex m-2 justify-center rounded-md px-4 py-2 text-sm font-medium text-[#ffa900] shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Sign Out
          </div>
        </Link>
      </div>

      <main className="flex justify-center mx-auto max-w-7xl px-4 sm:mt-10">
        <Link href="/">
          <img src="./fetchlogo.svg" />
        </Link>
        <div className="space-x-10 pt-6 justify-center">
          <div className="text-[#1f081e]">Welcome!</div>
        </div>
      </main>
    </div>
  );
  // return (
  //   <header className="bg-white">
  //     <nav
  //       className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
  //       aria-label="Global"
  //     >
  //       <div className="flex lg:flex-1">
  //         <a href="#" className="-m-1.5 p-1.5">
  //           <span className="sr-only">Fetch</span>
  //           <img className="h-8 w-auto" src="./fetchlogo.svg" alt="" />
  //         </a>
  //       </div>
  //       <div className="flex lg:hidden">
  //         <button
  //           type="button"
  //           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
  //           onClick={() => setMobileMenuOpen(true)}
  //         >
  //           <span className="sr-only">Open main menu</span>
  //           <Bars3Icon className="h-6 w-6" aria-hidden="true" />
  //         </button>
  //       </div>
  //       <div className="hidden lg:flex lg:gap-x-12">
  //         {navigation.map((item) => (
  //           <a
  //             key={item.name}
  //             href={item.href}
  //             className="text-sm font-semibold leading-6 text-gray-900"
  //           >
  //             {item.name}
  //           </a>
  //         ))}
  //       </div>
  //       <div className="hidden lg:flex lg:flex-1 lg:justify-end">
  //         <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
  //           Log in <span aria-hidden="true">&rarr;</span>
  //         </a>
  //       </div>
  //     </nav>
  //     <Dialog
  //       as="div"
  //       className="lg:hidden"
  //       open={mobileMenuOpen}
  //       onClose={setMobileMenuOpen}
  //     >
  //       <div className="fixed inset-0 z-10" />
  //       <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
  //         <div className="flex items-center justify-between">
  //           <a href="#" className="-m-1.5 p-1.5">
  //             <span className="sr-only">Your Company</span>
  //             <img
  //               className="h-8 w-auto"
  //               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
  //               alt=""
  //             />
  //           </a>
  //           <button
  //             type="button"
  //             className="-m-2.5 rounded-md p-2.5 text-gray-700"
  //             onClick={() => setMobileMenuOpen(false)}
  //           >
  //             <span className="sr-only">Close menu</span>
  //             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
  //           </button>
  //         </div>
  //         <div className="mt-6 flow-root">
  //           <div className="-my-6 divide-y divide-gray-500/10">
  //             <div className="space-y-2 py-6">
  //               {navigation.map((item) => (
  //                 <a
  //                   key={item.name}
  //                   href={item.href}
  //                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  //                 >
  //                   {item.name}
  //                 </a>
  //               ))}
  //             </div>
  //             <div className="py-6">
  //               <a
  //                 href="#"
  //                 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  //               >
  //                 Log in
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </Dialog.Panel>
  //     </Dialog>
  //   </header>
  // );
};
