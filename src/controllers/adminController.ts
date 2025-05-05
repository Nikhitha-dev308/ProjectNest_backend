import { Request, Response } from 'express';
import Admin from '../models/Admin';

// POST /admin/login
export const adminLogin = async (req: Request, res: Response) => {
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
        const adminData = await Admin.findOne({ adminEmail, password });

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
    } catch (err) {
        res.status(500).json({
            status: 3,
            message: "Login failed",
            error: "Server error",
            data: ""
        });
    }
};

// POST /admin/signup
export const adminSignup = async (req: Request, res: Response) => {
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
        const newAdmin = new Admin({ adminEmail, password });
        await newAdmin.save();

        res.status(200).json({
            status: 1,
            message: "Signup successful",
            error: [],
            data: newAdmin
        });
    } catch (err) {
        res.status(500).json({
            status: 3,
            message: "Signup failed",
            error: "Server error",
            data: ""
        });
    }
};
