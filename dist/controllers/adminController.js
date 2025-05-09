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
exports.adminSignup = exports.adminLogin = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
// POST /admin/login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminEmail, password } = req.body;
    if (!adminEmail || !password) {
        return res.status(400).json({
            status: 3,
            message: "Login failed",
            error: "Email or password missing",
            data: ""
        });
    }
    try {
        const adminData = yield Admin_1.default.findOne({ adminEmail, password });
        if (!adminData) {
            return res.status(400).json({
                status: 3,
                message: "Login failed",
                error: "Invalid credentials",
                data: ""
            });
        }
        res.status(200).json({
            status: 1,
            message: "Login successful",
            error: [],
            data: adminData
        });
    }
    catch (err) {
        res.status(500).json({
            status: 3,
            message: "Login failed",
            error: "Server error",
            data: ""
        });
    }
});
exports.adminLogin = adminLogin;
// POST /admin/signup
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminEmail, password } = req.body;
    if (!adminEmail || !password) {
        return res.status(400).json({
            status: 3,
            message: "Signup failed",
            error: "Email or password missing",
            data: ""
        });
    }
    try {
        const newAdmin = new Admin_1.default({ adminEmail, password });
        yield newAdmin.save();
        res.status(200).json({
            status: 1,
            message: "Signup successful",
            error: [],
            data: newAdmin
        });
    }
    catch (err) {
        res.status(500).json({
            status: 3,
            message: "Signup failed",
            error: "Server error",
            data: ""
        });
    }
});
exports.adminSignup = adminSignup;
