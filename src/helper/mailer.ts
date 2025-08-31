import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {



    try {

        const hashedValue = await bcrypt.hash(userId.toString(), 10)

        if (emailType == "VERIFY") {
            await userModel.findOneAndUpdate(userId, {
                $set: {
                    verifyToken: hashedValue,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType == "RESET") {
            await userModel.findOneAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedValue,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "789babfe26ad81",
                pass: "c6f0508a2de0ea"
            }
        });

        const mailOptions = {
            from: 'ghanshyam@ghanshyam.com',
            to: email,
            subject: emailType == "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedValue}">Hear</a> to ${emailType == "VERIFY" ? "Verify your email " : "reset your password"} or copy and past your in browser
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedValue}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }

}