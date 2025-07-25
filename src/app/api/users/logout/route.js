import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json(
            {
                message : "You have successfully logged out.",
                success : true, 
            }
        )
        response.cookies.set("token", "", {
            httpOnly : true,
            expires : new Date(0), // Set the cookie to expire immediately
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}