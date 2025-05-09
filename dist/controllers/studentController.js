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
exports.updateProfile = exports.profileData = exports.submitIdea = exports.signup = exports.Login = exports.createProject = exports.getDashboard = void 0;
const Student_1 = __importDefault(require("../models/Student"));
const StudentIdeaSubmission_1 = __importDefault(require("../models/StudentIdeaSubmission")); // adjust path if needed
// GET /student/dashboard
const getDashboard = (req, res) => {
    res.json({ message: 'Student Dashboard Data' });
};
exports.getDashboard = getDashboard;
// POST /student/createproject
const createProject = (req, res) => {
    const { projectName } = req.body;
    res.json({ message: `Project ${projectName} created successfully!` });
};
exports.createProject = createProject;
// POST /student/login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            status: 3,
            message: "Login failed",
            error: "Email or password missing",
            data: ""
        });
        return;
    }
    const userData = yield Student_1.default.findOne({ email: email, Password: password });
    // await Student.updateOne({password:password, name},{email:email});
    // await Student.deleteOne({email:email});
    // console.log("userData____", userData);
    if (userData) {
        res.status(200);
        res.json({
            status: 1,
            message: "success",
            error: [],
            data: userData
        });
    }
    else {
        res.status(400);
        res.json({
            status: 3,
            message: "Not a User",
            error: [],
            data: []
        });
    }
});
exports.Login = Login;
// POST /student/signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, college, branch, year, Password } = req.body;
    if (!name || !email || !phone || !college || !branch || !year || !Password) {
        res.status(400).send({
            status: 3,
            message: "Signup failed",
            error: "All fields are required",
            data: ""
        });
        return;
    }
    ;
    new Student_1.default({ name, email, phone, college, branch, year, Password }).save();
    const data = yield Student_1.default.find();
    console.log("data_______", data);
    const SignupData = `
-------------------------
Name: ${name}
Email: ${email}
Phone Number: ${phone}
College: ${college}
Branch: ${branch}
Year: ${year}
Password: ${Password}
-------------------------
`;
    res.send({
        status: 1,
        message: "Signup data received",
        error: [],
        data: data
    });
});
exports.signup = signup;
// POST /student/submitIdea
const submitIdea = (req, res) => {
    const { title, description } = req.body;
    if (!description) {
        res.status(400).send({
            status: 3,
            message: "Idea submission failed",
            error: "description is required",
            data: ""
        });
        return;
    }
    new StudentIdeaSubmission_1.default({ title, description }).save();
    const SubmitIdea = `Title : ${title}\nDescription : ${description}\n\n`;
    res.send({
        status: 1,
        message: "Idea received",
        error: [],
        data: []
    });
};
exports.submitIdea = submitIdea;
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
        const student = yield Student_1.default.findOne({ email });
        if (!student) {
            return res.status(404).json({
                status: 1,
                message: "student not found",
                data: null,
                error: ["No student with this email"],
            });
        }
        return res.status(200).json({
            status: 3,
            message: "Success",
            data: {
                name: student.name,
                email: student.email,
                phone: student.phone,
                college: student.college,
                branch: student.branch,
                year: student.year
            },
            error: [],
        });
    }
    catch (err) {
        console.error("Error fetching student profile:", err);
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
        const { name, email, phone, college, branch, year } = req.body;
        if (!email) {
            return res.status(400).json({
                status: 3,
                message: "Email is required to update profile",
                data: null,
                error: ["Missing 'email' in request body"],
            });
        }
        // Update the expert in the database
        const updatedStudent = yield Student_1.default.findOneAndUpdate({ email }, {
            $set: {
                name,
                email,
                phone,
                college,
                branch,
                year
            },
        }, { new: true, runValidators: true });
        if (!updatedStudent) {
            return res.status(404).json({
                status: 2,
                message: 'student not found',
                data: null,
                error: ["No student found with the provided email"],
            });
        }
        return res.status(200).json({
            status: 1,
            message: "Profile updated successfully",
            data: updatedStudent,
            error: [],
        });
    }
    catch (err) {
        console.error("Error updating student profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
});
exports.updateProfile = updateProfile;
