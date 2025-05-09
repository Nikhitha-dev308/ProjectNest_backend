import fs from 'fs';
import Student from '../models/Student';
import StudentIdeaSubmission from "../models/StudentIdeaSubmission"; // adjust path if needed


// GET /student/dashboard
export const getDashboard = (req: any, res: any): void => {
    res.json({ message: 'Student Dashboard Data' });
};

// POST /student/createproject
export const createProject = (req: any, res: any): void => {
    const { projectName } = req.body;
    res.json({ message: `Project ${projectName} created successfully!` });
};


// POST /student/login
export const Login = async (req: any, res: any) => {
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
    const userData = await Student.findOne({ email: email, Password: password });
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
    } else {
        res.status(400);
        res.json({
            status: 3,
            message: "Not a User",
            error: [],
            data: []
        });
    }

};



// POST /student/signup
export const signup = async (req: any, res: any) => {
    const { name, email, phone, college, branch, year, Password } = req.body;

    if (!name || !email || !phone || !college || !branch || !year || !Password) {
        res.status(400).send({
            status: 3,
            message: "Signup failed",
            error: "All fields are required",
            data: ""
        });
        return;
    };

    new Student({ name, email, phone, college, branch, year, Password }).save();
    const data = await Student.find();
    console.log("data_______", data)
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
};



// POST /student/submitIdea
export const submitIdea = (req: any, res: any): void => {
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

    new StudentIdeaSubmission({ title, description }).save();

    const SubmitIdea = `Title : ${title}\nDescription : ${description}\n\n`;
    res.send({
        status: 1,
        message: "Idea received",
        error: [],
        data: []
    });
};


// profile data 
export const profileData = async (req: any, res: any) => {
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

        const student = await Student.findOne({ email });

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
            }
            ,
            error: [],
        });
    } catch (err: any) {
        console.error("Error fetching student profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
};



// saving data in the profile
export const updateProfile = async (req: any, res: any) => {
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
        const updatedStudent = await Student.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    email,
                    phone,
                    college,
                    branch,
                    year
                },
            },
            { new: true, runValidators: true }
        );

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

    } catch (err: any) {
        console.error("Error updating student profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
};