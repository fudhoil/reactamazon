import React from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex items-center rounded-md flex-grow cursor-pointer h-10 bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            name=""
            id=""
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={session ? signOut : signIn} className="link">
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">list</p>
          </div>
          <div className="link">
            <p>ret</p>
            <p className="font-extrabold md:text-sm">order</p>
          </div>
          <div
            className="relative link flex items-center"
            onClick={() => router.push("/checkout")}>
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.map((item) => item.qty).reduce((a, b) => a + b, 0)}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">prime video</p>
        <p className="link">prime sdasd</p>
        <p className="link">primeaasd</p>
        <p className="link hidden lg:inline-flex">ddas</p>
        <p className="link hidden lg:inline-flex">sdasdv</p>
        <p className="link hidden lg:inline-flex">ddsasdas</p>
        <p className="link hidden lg:inline-flex">ddvadsaas</p>
        <p className="link hidden lg:inline-flex">ddcaas</p>
        <p className="link hidden lg:inline-flex">dasddas</p>
      </div>
    </header>
  );
};

export default Header;
