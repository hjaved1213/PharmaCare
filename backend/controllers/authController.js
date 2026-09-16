import User from '../models/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Database mein email dhondo
        const user = await User.findOne({ email });

        // Agar user na mile ya password match na kare
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Agar sab theek hai toh user ka data bhej do
        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic || `https://ui-avatars.com/api/?name=${user.name}`
        });

    } catch (error) {
        res.status(500).json({ error: "Server error during login" });
    }
};