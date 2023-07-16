import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



// /* UPDATE */
export const changeFirstName = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
   

    user.firstName='John'
    await user.save();
    await friend.save();

    
    const formattedFriends = newSave

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

