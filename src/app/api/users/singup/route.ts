import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connectDB();

export async function POST(request : NextRequest){

    try {
        
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //valodation
        console.log(reqBody)

        const user = await userModel.findOne({email});

        if(user){
            return NextResponse.json({error: "user alrady exit"}, {status:400})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashPassword
        })

        const saveUser = await newUser.save();
        console.log(saveUser);

        //send verification email

        await sendEmail({email, emailType:"VERIFY", userId:saveUser._id})

        return NextResponse.json({
            message: "user register sucess fully",
            success:true,
            saveUser
        })

    } catch (error: any) {
        return NextResponse.json(
            {Error : error.message}, 
            {status:500}
        )
    }

}