const user = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { use } = require('./userRoutes');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });
        res.status(201).json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await user.findOne({ email });
        if (userDoc) {
            const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password)
            if (isPasswordCorrect) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, process.env.jwtSecret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json('loggedIn successfully')
                })
            } else {
                res.status(422).json("incorrect password")
            }
        } else {
            res.json("user does not exist");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login };
