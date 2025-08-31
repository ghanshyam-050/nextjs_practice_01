import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()

        const { token } = reqBody;
        console.log(token)
        if (!token) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        const user = await userModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "user login success fully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ Error: error.message }, { status: 500 })
    }
}