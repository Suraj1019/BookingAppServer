const user = require('./userModel')

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await user.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register };
