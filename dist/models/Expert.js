"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExpertSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: Number, required: true },
    github: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Expert', ExpertSchema);
