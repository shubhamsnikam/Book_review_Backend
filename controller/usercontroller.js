
const User = require('../model/usermodel');
const Book = require('../model/bookmodel');

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


//Register a user

async function adduser(req, res) {
    newName = req.body.name;
    try {
        userExists = await User.findOne({ name: newName });

        if (userExists) {
            res.status(200).send({ message: "User already exists" });
        } else {
            const user = new User(req.body);
            await user.save();
            res.status(201).send({ message: "Registration Successful", task: user });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//Login an existing user

async function loginUser(req, res) {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            res.status(400).send({ message: "Invalid login credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid Login Credentials" });
        }
        const token = jwt.sign({ id: user._id }, "sprouts", { expiresIn: "1d" });
        const result = {
            message: "Login successful",
            success: true,
            token: token,
            id: user._id,
            userName: user.username,
        };
        res.status(200).send(result);
    } catch (error) {
        console.error("Error Occured:", error);
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message || error,
        });
    }
}

async function getusers(req, res) {
    console.log("**------**")
    try {
        result = await User.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete user
async function deleteusers(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(400).send({ message: "User Not Found" });
        }
        res.send({ task: user, message: "User Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updateuser(req, res) {
    console.log("updateuser req.params.id=", req.params.id);
    console.log("updateuser req.body", req.body);


    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) {
            res.status(400).send({ message: "Application no found" });
        }
        res.status(200).send({ message: "Application updated", task: user });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports ={
        adduser,
        loginUser,
        getusers,
        deleteusers,
        updateuser,
    }