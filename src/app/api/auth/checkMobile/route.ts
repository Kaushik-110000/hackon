import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { mobile }: { mobile: number } = await req.json();
    const user = await User.findOne({ mobile: mobile });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          status: 204,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "User have Phone Number",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while getting searching phone no of user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
