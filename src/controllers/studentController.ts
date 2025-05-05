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
export const signup = (req: any, res: any): void => {
    const { Fullname, email, Phonenumber, College, Branch, Year, Password } = req.body;

    if (!Fullname || !email || !Phonenumber || !College || !Branch || !Year || !Password) {
        res.status(400).send({
            status: 3,
            message: "Signup failed",
            error: "All fields are required",
            data: ""
        });
        return;
    };

    new Student({ Fullname, email, Phonenumber, College, Branch, Year, Password }).save();
    const data = Student.find();
    console.log("data_______", data)
    const SignupData = `
-------------------------
Name: ${Fullname}
Email: ${email}
Phone Number: ${Phonenumber}
College: ${College}
Branch: ${Branch}
Year: ${Year}
Password: ${Password}
-------------------------
`;
    fs.mkdirSync('document', { recursive: true });
    fs.appendFile('./document/studentSignup.pdf', SignupData, (error) => {
        if (error) {
            console.error("File write error:", error);
        } else {
            console.log("Signup data saved to studentSignup.pdf");
        }
    });
    res.send({
        status: 1,
        message: "Signup data received",
        error: [],
        data: []
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
    fs.mkdirSync('document', { recursive: true });
    fs.appendFile('./document/Ideas.pdf', SubmitIdea, (error) => {
        if (error) {
            console.error("File write error:", error);
        } else {
            console.log("Idea is submitted in Ideas.pdf");
        }
    });
    res.send({
        status: 1,
        message: "Idea received",
        error: [],
        data: []
    });
};
