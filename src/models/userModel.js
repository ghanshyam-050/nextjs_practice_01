import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type:String,
            required: [true, "please provide user name"],
            unique: true
        },
        email: {
            type:String,
            required: [true, "please provide email"],
            unique: true
        },
        password: {
            type:String,
            required: [true, "please provide password"]
        },
        isVerified: {
            type:Boolean,
            default:false
        },
        isAdmin: {
            type:Boolean,
            default:false
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,

        verifyToken: String,
        verifyTokenExpiry: Date,

    }
)

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;