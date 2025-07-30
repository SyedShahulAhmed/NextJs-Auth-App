// app/api/users/[id]/route.js
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connect(); // Ensure DB is connected before query
  const userId = context.params.id;

  try {
    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert Mongoose document to plain object
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
