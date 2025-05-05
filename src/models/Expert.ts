import mongoose from 'mongoose';

const ExpertSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    experience: { type: Number, required: true },
    github: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model('Expert', ExpertSchema);
