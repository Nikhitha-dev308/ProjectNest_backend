import mongoose, { Schema } from "mongoose";

const studentSubmission: any = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
},
    { timestamps: true }
);

export default mongoose.model('StudentIdeaSubmission', studentSubmission)