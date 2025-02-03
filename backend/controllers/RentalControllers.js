import User from '../models/user.js';

export const search = async (req, res) => {
    console.log("search controller working")
    const { name } = req.query;
    if (!name) return res.status(400).json( "Name is required" );
  
    try {
      const users = await User.find({ name: { $regex: `^${name}`, $options: "i" } })
  
      if (users.length === 0) return res.status(404).json({ message: "No users found" });
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

export const searchnumber = async(req,res,next)=>{
    console.log("mob controller working")
    const {phone}=req.query;
    if(!phone) return res.status(400).json("mobile is required");
    try {
       const users = await User.find({phone: {$regex: `^${phone}`, $options:"i"  }})
       if (users.length === 0) return res.status(404).json({ message: "No users found" });
  
      res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}  