const User = require("../models/userData");



exports.createUser = async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            Email,
            Address,
            County,
            Postcode,
            Phone,
            Notes,
        } = req.body;

        console.log("req.body : ", req.body);
        // console.log("req.body : ", req);

        if (!FirstName || !LastName || !Email || !Address || !Postcode || !Phone) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }

        const existingUser = await User.findOne({ Email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please Sing in to continue.",
            })
        }

        const user = await User.create({
            FirstName,
            LastName,
            Email,
            Address,
            Postcode,
            Phone,
            County,
            Notes,
        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered Successfully ",
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered. Please try again.",
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { Email } = req.body
        const user = await User.findOne( Email );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Present. Please Sing up to continue.",
            })
        }

        return res.status(200).json({
            success: true,
            user,
            message: "User Details Fetched Successfully ",
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Please try again.",
        })
    }
};