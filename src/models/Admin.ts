import mongoose, { Schema } from "mongoose";


const admin: any = new Schema({
    adminEmail: { type: String, required: true },
    password: { type: String, required: true }
},
    { timestamps: true }
);

export default mongoose.model('Admin', admin)