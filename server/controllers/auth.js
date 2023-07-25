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



// export const replace = async (req, res) => {
//   try {
//     const { id, firstName, traits } = req.body; // Extract the firstName and traits fields from req.body
//     const user = await User.findById(id);
//     if (!user) return res.status(400).json({ msg: "User does not exist." });

//     user.firstName = firstName; // Update the firstName field

//     // Update the traits
//     if (traits) {
//       const { charisma, wealth, popularity, allignment } = traits;
//       if (charisma) user.charisma = charisma;
//       if (wealth) user.wealth = wealth;
//       if (popularity) user.popularity = popularity;
//       if (allignment) user.allignment = allignment;
//     }

//     await user.save();

//     res.status(200).json('Successful');
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Assuming you have the necessary imports and setup for your backend

export const replaceUser = async (req, res) => {
  try {
    const { id, firstName, lastName, email, alignment, popularity, wealth, friends, savegame, charisma, isChampion, pastFeuds, inRingSkill, currentPotentialFeud, activeFeud, currentChampionshipHeld, titleReigns, tags, currentCompany, location, viewedProfile, impressions } = req.body;

    // Validate if the user with the provided ID exists in the database
    const user = await User.findById(id);
    console.log(user);
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Update the user properties if they are provided in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (alignment) user.alignment = alignment;
    if (popularity) user.popularity = popularity;
    if (wealth) user.wealth = wealth;
    if (friends) user.friends = friends;
    if (savegame) user.savegame = savegame;
    if (charisma) user.charisma = charisma;
    if (isChampion) user.isChampion = isChampion;
    if (pastFeuds) user.pastFeuds = pastFeuds;
    if (inRingSkill) user.inRingSkill = inRingSkill;
    if (currentPotentialFeud) user.currentPotentialFeud = currentPotentialFeud;
    if (activeFeud) user.activeFeud = activeFeud;
    if (currentChampionshipHeld) user.currentChampionshipHeld = currentChampionshipHeld;
    if (titleReigns) user.titleReigns = titleReigns;
    if (tags) user.tags = tags;
    if (currentCompany) user.currentCompany = currentCompany;
    if (location) user.location = location;
    if (viewedProfile) user.viewedProfile = viewedProfile;
    if (impressions) user.impressions = impressions;


    console.log(user);
    // Save the updated user data to the database
    await user.save();

    // Respond with a success message
    res.status(200).json({ msg: "User data updated successfully." });
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