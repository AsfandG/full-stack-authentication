import { connect } from "@/db-config/config";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exist.
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User does not exist!",
        status: 400,
      });
    }

    // check if password is correct.
    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        message: "Invalid credentials",
        success: false,
        status: 400,
      });
    }

    // token data
    const tokenDate = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenDate, process.env.jwt_secret!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login Successfull!",
      success: true,
      user,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
      status: 500,
    });
  }
}
