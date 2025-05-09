"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.profileData = exports.fetchProjects = exports.expertSignup = exports.expertLogin = void 0;
const Expert_1 = __importDefault(require("../models/Expert"));
const StudentIdeaSubmission_1 = __importDefault(require("../models/StudentIdeaSubmission"));
// POST /expert/login
const expertLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { expertEmail, password } = req.body;
    if (!expertEmail || !password) {
        res.status(400).send({
            status: 3,
            message: "Login failed",
            error: "Email or password missing",
            data: ""
        });
        return;
    }
    const expertData = yield Expert_1.default.findOne({ email: expertEmail, password });
    if (expertData) {
        res.status(200);
        res.send({
            status: 1,
            message: "Login successful",
            error: [],
            data: expertData
        });
    }
    else {
        res.status(400);
        res.json({
            status: 3,
            message: "Login failed",
            error: "Invalid credentials",
            data: ""
        });
    }
});
exports.expertLogin = expertLogin;
// POST /expert/signup
const expertSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, experience, github, city, createpassword, confirmpassword } = req.body;
        if (!name || !email || !phone || !experience || !github || !city || !createpassword || !confirmpassword) {
            return res.status(400).send({
                status: 3,
                message: "Signup failed",
                error: "All fields are required",
                data: ""
            });
        }
        if (createpassword !== confirmpassword) {
            return res.status(400).send({
                status: 3,
                message: "Signup failed",
                error: "Passwords do not match",
                data: ""
            });
        }
        const newExpert = new Expert_1.default({
            name,
            email,
            phone,
            experience,
            github,
            city,
            password: confirmpassword // Only one password field is saved
        });
        yield newExpert.save();
        res.status(200).send({
            status: 1,
            message: "Signup successful",
            error: [],
            data: newExpert
        });
    }
    catch (error) {
        console.error('Error in /expert/signup:', error);
        res.status(500).send({
            status: 3,
            message: "Server error",
            error: error.message,
            data: ""
        });
    }
});
exports.expertSignup = expertSignup;
// fetching projects in expert dashboard
const fetchProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield StudentIdeaSubmission_1.default.find({});
    console.log("data___________", data);
    res.status(200);
    res.json({
        status: 3,
        message: "success",
        data: data,
        error: []
    });
});
exports.fetchProjects = fetchProjects;
// profile data 
const profileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({
                status: 0,
                message: "Email is required",
                data: null,
                error: ["Email query param missing"],
            });
        }
        const expert = yield Expert_1.default.findOne({ email });
        if (!expert) {
            return res.status(404).json({
                status: 1,
                message: "Expert not found",
                data: null,
                error: ["No expert with this email"],
            });
        }
        return res.status(200).json({
            status: 3,
            message: "Success",
            data: expert,
            error: [],
        });
    }
    catch (err) {
        console.error("Error fetching expert profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
});
exports.profileData = profileData;
// saving data in the profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, experience, github, city } = req.body;
        if (!email) {
            return res.status(400).json({
                status: 3,
                message: "Email is required to update profile",
                data: null,
                error: ["Missing 'email' in request body"],
            });
        }
        // Update the expert in the database
        const updatedExpert = yield Expert_1.default.findOneAndUpdate({ email }, {
            $set: {
                name,
                phone,
                experience,
                github,
                city,
            },
        }, { new: true, runValidators: true });
        if (!updatedExpert) {
            return res.status(404).json({
                status: 2,
                message: 'Expert not found',
                data: null,
                error: ["No expert found with the provided email"],
            });
        }
        return res.status(200).json({
            status: 1,
            message: "Profile updated successfully",
            data: updatedExpert,
            error: [],
        });
    }
    catch (err) {
        console.error("Error updating expert profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
});
exports.updateProfile = updateProfile;
