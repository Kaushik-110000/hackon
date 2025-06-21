import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("logtok")?.value;
    if (!token) { 
      return NextResponse.json(
        {
          message: "Login token missing, no user",
          data: { userName: "Please login" },
          status: 210,
        },
        { status: 210 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      const resp = NextResponse.json(
        { error: "Login token error", status: 401 },
        { status: 401 }
      );
      resp.cookies.delete("logtok");
      return resp;
    }

    const user = await User.findOne({ mobile: decoded.mobile }).select(
      "-OTP -__v -createdAt -updatedAt"
    );
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Current user fetched",
        data: user,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while getting current user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
