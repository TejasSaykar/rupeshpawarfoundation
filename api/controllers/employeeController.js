const userModel = require("../models/employeeModel.js")
const idCardModel = require("../models/idcardModel.js");
const employeeModel = require("../models/employeeModel.js");

exports.registerUser = async (req, res) => {
    try {
        const { fullName, address, aadharNumber, panCardNumber, whatsappNumber, emailId, password } = req.body;

        switch (true) {
            case !fullName: return res.status(401).json({ message: "Fullname is required!" });
            case !address: return res.status(401).json({ message: "Address is required!" });
            case !aadharNumber: return res.status(401).json({ message: "Aadhar number is required!" });
            case !panCardNumber: return res.status(401).json({ message: "Pancard number is required!" });
            case !whatsappNumber: return res.status(401).json({ message: "Whatsapp number is required!" });
            case !emailId: return res.status(401).json({ message: "Emailid is required!" });
            case !password: return res.status(401).json({ message: "Password is required!" });
        }

        const chemail = await userModel.findOne({ emailId });
        if (chemail) {
            return res.status(401).json({
                success: false,
                message: "Email already exists please login"
            })
        }

        const newUser = await new userModel({
            fullName, address, aadharNumber, panCardNumber, whatsappNumber, emailId, password
        }).save();

        return res.status(201).json({
            success: true,
            message: "Register successfully",
            newUser
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while registration",
            error
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ emailId: emailId });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Wrong Credentials"
            })
        }
        if (!user.isApprove) {
            return res.status(401).json({
                success: false,
                message: "You are not Approve"
            })
        }

        

        return res.status(200).json({
            success: false,
            message: "Login Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while login",
            error
        })
    }
}


exports.isApprove = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await employeeModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                isApprove: true
            }
        }, { new: true });

        if (user) {
            user.isApprove = true;
        }

        return res.status(200).json({
            message: "Approved"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while Approving",
            error
        });
    }
}

exports.generateIdCard = async (req, res) => {
    try {
        const { userId, fullName, bloodGroup, DOB, contactNumber1, contactNumber2, photo } = req.body;
        switch (true) {
            case !userId: return res.status(401).json({ message: "Userid is required!" });
            case !fullName: return res.status(401).json({ message: "Fullname is required!" });
            case !bloodGroup: return res.status(401).json({ message: "Blood group is required!" });
            case !DOB: return res.status(401).json({ message: "DOB is required!" });
            case !contactNumber1: return res.status(401).json({ message: "Contact number1 is required!" });
            case !contactNumber2: return res.status(401).json({ message: "Contact number2 is required!" });
            case !photo: return res.status(401).json({ message: "Photo is required!" });

        }
        const userIdCard = await new idCardModel({ userId, fullName, bloodGroup, DOB, contactNumber1, contactNumber2, photo }).save();

        return res.status(200).json({
            success: true,
            message: "Id card is generated",
            userIdCard
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while generating the id card",
            error
        })
    }
}


exports.getIdCard = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await idCardModel.findById({_id: id});
        return res.status(200).json({
            success: true,
            message: "Id card is getting",
            employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the idCard",
            error
        })
    }
}