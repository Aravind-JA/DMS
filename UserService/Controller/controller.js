const { User } = require('../Model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = 'UserSecretKey28736492739462186548793';

async function GetUser(req, res) {
    const users = await User.find();
    res.status(200).json(users);
}

async function GetOneUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
}

async function Register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }

        const existingUser = await User.findOne({ $or: [{ email }] });

        if (existingUser) {
            return res.status(409).json({ message: "User with the same username or email already exists." });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, password: hash });
        res.status(200).json(newUser);
    } catch (error) {
        res.send(400).status(error);
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed. Password is incorrect." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, key);

        res.status(200).json({token});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function EditUser(req, res) {
    try {
        const id = req.params.id;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }

        const hash = bcrypt.hash(password, 10);

        const editedUser = await User.findByIdAndUpdate(id, { email, password: hash }, { new: true });

        if (!editedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User updated successfully", user: editedUser });

    } catch (error) {
        res.send(400).status(error);
    }
}

async function DeleteUser(req, res) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        res.send(400).status(error);
    }
}

module.exports = { GetUser, GetOneUser, Register, Login, EditUser, DeleteUser };