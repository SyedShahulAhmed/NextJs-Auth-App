import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error); // avoid toast here, this is a server route
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
