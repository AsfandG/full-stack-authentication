import { connect } from "@/db-config/config";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // check if user already exist.
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exist!", status: 400 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const savedUser = newUser.save();
    return NextResponse.json({
      message: "User created Successfully!",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
