import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,

    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
   
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'err.message 000000'  });
  }
};



export const replace = async (req, res) => {
  try {
    const { id, firstName } = req.body; // Extract the firstName field from req.body
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
    user.firstName = firstName; // Update the firstName field
    
    console.log(user);
    await user.save();
    
    res.status(200).json('successful');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const savewrestlers = async (req, res) => {
  try {
    const { id, savegame } = req.body; // Extract the firstName field from req.body
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
    user.savegame = savegame; // Update the firstName field
    
    console.log(user);
    await user.save();
    
    res.status(200).json('successful');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'err.message KKKK '});
  }
};