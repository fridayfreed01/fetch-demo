import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const Header = (props: any) => {
  const username = props.username;
  const router = useRouter();

  const handleClick = () => {
    if (!username) {
      router.push("/login");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-white border-b-2 border-double border-gray-600">
      <div className="bg-gradient-to-r from-[#7d1f70] via-[#551653] to-[#1f081e] flex justify-end mb-2">
        <Link href="/login">
          <div className="inline-flex m-2 justify-center rounded-md px-4 py-2 text-sm font-medium text-[#ffa900] shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            Sign Out
          </div>
        </Link>
      </div>

      <main className="flex justify-center mx-auto max-w-7xl px-4 sm:mt-10">
        <div className="text-center">
          <img src="./fetchlogo.svg" />
          <div className="space-x-10 pt-6 justify-center">
            <div className="text-[#1f081e]">find your new best friend</div>
          </div>
        </div>
      </main>
    </div>
  );
};
