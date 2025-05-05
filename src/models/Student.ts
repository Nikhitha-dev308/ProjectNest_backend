import mongoose, { Schema } from "mongoose";

const studentSchema: any = new Schema({
    Fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Phonenumber: { type: String, required: true },
    College: { type: String, required: true },
    Branch: { type: String, required: true },
    Year: { type: String, required: true },
    Password: { type: String, required: true },
},
    { timestamps: true }

);

export default mongoose.model('Student', studentSchema);