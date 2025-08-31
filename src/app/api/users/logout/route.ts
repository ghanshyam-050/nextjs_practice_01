import { connectDB } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(request: NextRequest) {

    try {
        const response = NextResponse.json({
            message: "user logout successfully",
            success: true
        })

        response.cookies.set(
            "token", "", { httpOnly: true, secure: true }
        )

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}