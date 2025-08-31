import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromJwt } from "@/helper/getUserData";

connectDB();

export async function GET(request: NextRequest) {

    try {

        const id = await getDataFromJwt(request)

        const user = await userModel.findOne({ _id: id }).select("-password");

        return NextResponse.json({
            message: "user profile success fully",
            data: user
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}