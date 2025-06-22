"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import GreenCoin from "./GreenCoin";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useCartCountStore } from "@/context/cartCountStore";

export default function Nav() {
  const updatedState = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const count = useCartCountStore((state) => state.count);
  const setCount = useCartCountStore((state) => state.setCount);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(cart.length);
  }, [])
  useEffect(() => {
    fetch("/api/products/searchtrie")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.tokens)) setTokens(data.tokens);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const lower = query.toLowerCase();
    const matches = tokens.filter((t) => t.startsWith(lower)).slice(0, 5);
    setSuggestions(matches);
  }, [query, tokens]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query || !query.trim()) {
      setQuery("eco");
    }
    setQuery(query.toLowerCase());


    router.push(`/search?q=${query}`);
    setPlaceholder(query);
    setQuery("");
    setSuggestions([]);
  };
  const [placeholder, setPlaceholder] = useState("Search Amazon.in");
  return (
    <>
      {/* Header - Pixel-perfect Amazon style */}
      <header className="w-full bg-[#131921] flex items-center px-4 py-3">
        {/* Logo and Location */}
        <div className="flex items-center min-w-[270px]">
          <Link href="/">
            <Image
              src="/logo-light.png"
              alt="logo"
              width={98}
              height={30}
              className="object-contain cursor-pointer"
            />
          </Link>
          <div className="ml-2 flex flex-col justify-center">
            <span className="flex items-center text-xs text-gray-200">
              <svg
                className="w-4 h-4 mr-1 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Delivering to Jaunpur 222001
            </span>
            <span className="text-xs text-white pl-5 font-bold leading-tight cursor-pointer hover:underline">
              Update location
            </span>
          </div>
        </div>
        {/* Search Bar */}
        <form className="flex flex-1 mx-4 w-full" onSubmit={handleSubmit}>
          <div className="flex w-full relative">
            <select className="rounded-l-md bg-gray-100 text-gray-700 text-sm px-2 border-r border-gray-300 focus:outline-none min-w-[60px]">
              <option>All</option>
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-[#febd69] rounded-r-md px-4 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg max-h-60 overflow-hidden z-10">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setQuery(s);
                      setPlaceholder(s);
                      setSuggestions([]);
                      router.push(`/search?q=${s}`);
                      setQuery("");
                      setSuggestions([]);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
        {/* Right Side: Language, Account, Orders, Cart */}
        <div className="flex items-center space-x-6 min-w-[420px] justify-end">
          {/* Language */}
          <div className="flex items-center cursor-pointer">
            <Image
              src="https://flagcdn.com/in.svg"
              alt="IN"
              width={20}
              height={14}
              className="mr-1 rounded-sm"
            />
            <span className="text-xs font-bold text-gray-300">EN</span>
            <svg
              className="w-3 h-3 ml-1 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Green Coins */}
          <Link href="/rewards">
            <div className="flex items-center cursor-pointer">
              <GreenCoin coins={1250} size="sm" />
            </div>
          </Link>
          {/* Account & Lists */}
          <div className="flex flex-col cursor-pointer text-gray-300">
            {updatedState?.userData?._id ? (
              <Link href="/dashboard">
                <span className="text-xs text-gray-300"> Hello, dear</span>
              </Link>
            ) : (
              <Link href="/ap/signin">
                <span className="text-xs text-gray-300">Hello, sign in</span>
              </Link>
            )}

            <span className="font-bold text-sm leading-tight">
              Account & Lists{" "}
              <svg
                className="inline w-3 h-3 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          {/* Orders */}
          <div className="flex flex-col cursor-pointer text-gray-300">
            <span className="text-xs">Returns</span>
            <span className="font-bold text-sm leading-tight">& Orders</span>
          </div>
          {/* Cart */}
          <Link href={"/myCart"}>
            <div className="flex items-center cursor-pointer relative" >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="1" />
                <circle cx="17" cy="21" r="1" />
              </svg>
              <span className="absolute left-5 top-0 bg-orange-400 text-xs font-bold rounded-full px-1 text-black">
                {count}
              </span>
              <span className="ml-1 text-xs font-bold text-gray-300">Cart</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="w-full bg-[#232f3e] text-white text-sm">
        <ul className="flex flex-wrap items-center px-6 py-2 space-x-4 overflow-x-auto">
          <li className="font-semibold">☰ All</li>
          <li>Sell</li>
          <li>Bestsellers</li>
          <li>Today's Deals</li>
          <li>Prime</li>
          <li>Customer Service</li>
          <li>New Releases</li>
          <li>Amazon Pay</li>
          <Link href="/green-store">
            <li className="text-green-400 font-semibold cursor-pointer hover:text-green-300">
              🌱 Green Store
            </li>
          </Link>
          <Link href="/dashboard">
            <li className="text-green-400 cursor-pointer hover:text-green-300">
              📊 Eco Dashboard
            </li>
          </Link>
          <Link href="/rewards">
            <li className="text-green-400 cursor-pointer hover:text-green-300">
              🪙 Rewards
            </li>
          </Link>
          <Link href="/group-buy">
            <li className="text-green-400 cursor-pointer hover:text-green-300">
              📦 Group Buy
            </li>
          </Link>
          <Link href="/info">
<<<<<<< HEAD
            <li className="text-green-400 cursor-pointer hover:text-green-300">
              📗 Know More
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}
