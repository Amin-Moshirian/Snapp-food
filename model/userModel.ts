import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, },
    password: { type: String, },
    mobile: { type: String, },
    token: { type: String },
    Role: { type: String, default: "User" },
    avatar: { type: String, default: "http://localhost:5000/default/profileDefault.png" },
    OTP: { value: { type: String }, expireIn: { type: Number } }
}, { timestamps: true });


const userModel: any = model("user", userSchema);
export default userModel;