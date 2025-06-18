import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { mobile, OTP } = await req.json();

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({ mobile, OTP });

      const payload = {
        userID: user._id,
        mobile: user.mobile,
        userName: user.userName,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "60d",
      });

      const res = NextResponse.json(
        { message: "User created and logged in", status: 200 },
        { status: 200 }
      );

      res.cookies.set("logtok", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 24 * 60 * 60,
      });

      return res;
    }

    // console.log(OTP);
    // console.log(user.OTP);

    if (user.OTP != OTP) {
      return NextResponse.json(
        { error: "Invalid OTP", status: 400 },
        { status: 400 }
      );
    }

    const payload = {
      userID: user._id,
      mobile: user.mobile,
      userName: user.userName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "60d",
    });

    const res = NextResponse.json(
      { message: "Logged in successfully", status: 200 },
      { status: 200 }
    );

    res.cookies.set("logtok", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 24 * 60 * 60,
    });

    return res;
    
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
