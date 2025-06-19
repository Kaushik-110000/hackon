"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function Page() {
  const params = useParams<{ encoded: string }>();
  const encoded = params.encoded;
  const router = useRouter();
  const { setUserData } = useContext(UserContext);
  // decode number once
  let decodedNumber: number | null = null;
  try {
    decodedNumber = Number(atob(encoded));
  } catch {
    console.error("Invalid encoded string");
  }

  // state to know if user exists
  const [checkExist, setCheckExist] = useState(false);

  // OTP digits in an array
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpNew, setOtpNew] = useState([0, 0, 0, 0]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // check if mobile exists on mount
  useEffect(() => {
    async function checkNumber() {
      if (decodedNumber === null) return;
      // console.log(decodedNumber);
      const res = await axios.post("/api/auth/checkMobile", {
        mobile: decodedNumber,
      });
      setCheckExist(res.data.status === 200);
    }
    checkNumber();
  }, [decodedNumber]);

  // when a digit changes, update state and auto‑focus next
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // only digits, max length 1
    const newOtp = [...otp];
    newOtp[index] = value;
    otpNew[index] = Number(value);
    setOtp(newOtp);
    setOtpNew(otpNew);
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // stub for final submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalOTP = 0;
    for (let i = 0; i < otp.length; i++) {
      finalOTP = finalOTP * 10 + Number(otp[i]);
    }
    try {
      await axios.post("/api/auth/signin", {
        mobile: decodedNumber,
        OTP: finalOTP,
      });
      const response = await axios.get("/api/auth/getUser");
      if (response.data.status === 200) {
        setUserData(response.data.data);
      }
      router.push("/");
    } catch (error) {
      alert("An error occured");
      console.log(error);
    }
    // TODO: your submit logic here
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Logo" width={120} height={40} />
      </div>
      <div className="w-80 md:w-100 bg-white p-6 border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-medium mb-6">
          {!checkExist ? "Set Authentication" : "Authentication required"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="otp" className="text-sm mb-2 font-bold">
            {!checkExist
              ? "Set up a four digit password"
              : "Enter your four digit password"}
          </label>

          <div id="otp" className="flex space-x-2 mb-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="h-10 bg-yellow-400 border border-yellow-500 rounded text-base font-medium hover:bg-yellow-500 w-full"
          >
            Continue
          </button>
        </form>

        <p className="text-sm mt-4">
          By continuing, you agree to our{" "}
          <a href="/" className="text-blue-600 underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="/" className="text-blue-600 underline">
            Privacy Notice
          </a>
          .
        </p>
      </div>
    </div>
  );
}
