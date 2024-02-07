import { connect } from "@/db-config/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
