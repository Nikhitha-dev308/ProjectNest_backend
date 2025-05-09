import mongoose, { Schema } from "mongoose";

const studentSchema: any = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    Password: { type: String, required: true },
},
    { timestamps: true }

);

export default mongoose.model('Student', studentSchema);