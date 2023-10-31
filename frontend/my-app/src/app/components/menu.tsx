"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <div
        className="w-14 h-14 rounded-xl ml-4 mt-4 flex flex-col justify-center items-center border-2 border-primary-500 fixed z-10 md:w-20 md:h-20 md:ml-8 md:mt-8 xl:hidden"
        onClick={handleClick}
      >
        <div>
          <div
            className={`bg-black/50 w-8 h-1 rounded-sm my-2 transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-3" : "-translate-y-0.5"
            }`}
          ></div>
          <div
            className={`bg-black/50 w-8 h-1 rounded-sm my-2 transition-all duration-300 ease-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`bg-black/50 w-8 h-1 rounded-sm my-2 transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-3" : "translate-y-0.5"
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`bg-white h-screen max-h-screen w-4/5 rounded-lg flex flex-col transition-all duration-300 ease-in fixed ${
          isOpen ? "w-0 xl:w-4/12" : "-translate-x-full xl:-translate-x-0"
        } lg:w-1/3`}
      >
        <div
          className={`flex flex-col mx-auto mt-4 -mb-20 text-center md:mt-14 ${
            pathname == "/profile" ? "hidden" : ""
          }`}
        ></div>
        <div className="flex flex-col h-1/3 w-3/4 text-center justify-between m-auto text-primary-500 md:text-3xl">
          <Link
            href={"/profile"}
            className={`h-10 pt-2 ${
              pathname == "/profile"
                ? "bg-primary-color-500 rounded-xl text-white"
                : "bg-transparent"
            } md:h-20 md:pt-5`}
          >
            <h1>Meu Perfil</h1>
          </Link>
          <Link
            href={"/product"}
            className={`h-10 pt-2 ${
              pathname == "/deposit"
                ? "bg-primary-color-500 rounded-xl text-white"
                : "bg-transparent"
            } md:h-20 md:pt-5`}
          >
            <h1>Depositar</h1>
          </Link>
          <Link
            href={"/points"}
            className={`h-10 pt-2 ${
              pathname == "/order"
                ? "bg-primary-color-500 rounded-xl text-white"
                : "bg-transparent"
            } md:h-20 md:pt-5`}
          >
            <h1>Trocar Pontos</h1>
          </Link>
        </div>
      </div>
    </main>
  );
}
