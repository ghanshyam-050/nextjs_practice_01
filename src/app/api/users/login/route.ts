import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()

        const {email, password} = reqBody;

        const user = await userModel.findOne({email});
        if(!user){
            return NextResponse.json({error: "token inValid"}, {status:400})
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Password inValid"}, {status:400})
        }

        const jwtData = {
            id : user._id,
            email : user.email,
            username: user.username
        }

        const token = await jwt.sign(jwtData, process.env.TOKEN_SECRET!, {expiresIn : '1d'});

        const response = NextResponse.json({
            message: "user login success fully",
            success:true
        })

        response.cookies.set("token", token, {httpOnly:true, secure:true})

        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }

}