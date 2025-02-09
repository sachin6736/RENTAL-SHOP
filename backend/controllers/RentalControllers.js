import User from '../models/user.js';
import Rental from '../models/rent.js';

export const createrental = async(req,res,next)=>{
  console.log("create rental working")
  try {
    const { name, phone, tools, time, amount } = req.body;
    let user = await User.findOne({ phone });
    if (!user) {
      // If user does not exist, create a new one
      user = new User({ name, phone, adress: "Unknown", aadhar: "000000000000", profession: "Unknown" });
      await user.save();
    }

    // Step 2: Create a new Rental
    const newRental = new Rental({
      user: user._id, 
      tools,
      time,
      amount,
      status: "rented",
    });

    await newRental.save();

    res.status(201).json("created rental");
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

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

// export const searchnumber = async(req,res,next)=>{
//     console.log("mob controller working")
//     const {phone}=req.query;
//     if(!phone) return res.status(400).json("mobile is required");
//     try {
//        const users = await User.find({phone: {$regex: `^${phone}`, $options:"i"  }})
//        if (users.length === 0) return res.status(404).json({ message: "No users found" });
  
//       res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// }  