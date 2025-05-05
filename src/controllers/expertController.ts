import Expert from '../models/Expert';
import StudentIdeaSubmission from '../models/StudentIdeaSubmission';

// POST /expert/login
export const expertLogin = async (req: any, res: any) => {
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

    const expertData = await Expert.findOne({ email: expertEmail, password });

    if (expertData) {
        res.status(200);
        res.send({
            status: 1,
            message: "Login successful",
            error: [],
            data: expertData
        });
    } else {
        res.status(400);
        res.json({
            status: 3,
            message: "Login failed",
            error: "Invalid credentials",
            data: ""
        });
    }
};

// POST /expert/signup
export const expertSignup = async (req: any, res: any): Promise<void> => {
    try {
        const {
            name,
            email,
            number,
            experience,
            github,
            city,
            createpassword,
            confirmpassword
        } = req.body;

        if (!name || !email || !number || !experience || !github || !city || !createpassword || !confirmpassword) {
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

        const newExpert = new Expert({
            name,
            email,
            number,
            experience,
            github,
            city,
            password: confirmpassword  // Only one password field is saved
        });

        await newExpert.save();

        res.status(200).send({
            status: 1,
            message: "Signup successful",
            error: [],
            data: newExpert
        });

    } catch (error: any) {
        console.error('Error in /expert/signup:', error);
        res.status(500).send({
            status: 3,
            message: "Server error",
            error: error.message,
            data: ""
        });
    }
};


export const fetchProjects = async (req: any, res: any) => {
    const data = await StudentIdeaSubmission.find({});
    console.log("data___________", data);
    res.status(200);
    res.json({
        status: 3,
        message: "success",
        data: data,
        error: []

    })
}
