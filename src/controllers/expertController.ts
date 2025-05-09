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
            phone,
            experience,
            github,
            city,
            createpassword,
            confirmpassword
        } = req.body;

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

        const newExpert = new Expert({
            name,
            email,
            phone,
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

// fetching projects in expert dashboard
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

        const expert = await Expert.findOne({ email });

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
    } catch (err: any) {
        console.error("Error fetching expert profile:", err);
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
        const updatedExpert = await Expert.findOneAndUpdate(
            { email },
            {
                $set: {
                    name,
                    phone,
                    experience,
                    github,
                    city,
                },
            },
            { new: true, runValidators: true }
        );

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

    } catch (err: any) {
        console.error("Error updating expert profile:", err);
        return res.status(500).json({
            status: 2,
            message: "Internal server error",
            data: null,
            error: [err.message],
        });
    }
};

