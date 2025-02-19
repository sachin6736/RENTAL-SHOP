import User from '../models/user.js'
import Rental from '../models/rent.js'
import Tools from '../models/tools.js'

export const createrental = async (req, res, next) => {
  console.log('create rental working')
  try {
    const { name, phone, tools, time, amount } = req.body
    let user = await User.findOne({ phone })
    if (!user) {
      user = new User({
        name,
        phone,
        address: 'ask later',
        aadhar: Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString(),
        profession: 'Unknown'
      })
      await user.save()
    }
    for (const rentedTool of tools) {
      const tool = await Tools.findById(rentedTool.toolId)
      if (!tool || tool.count < rentedTool.count) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${rentedTool.toolId}` })
      }
      tool.count -= rentedTool.count // Reduce tool count
      await tool.save()
    }
    const newRental = new Rental({
      user: user._id,
      tools,
      time,
      amount,
      status: 'rented'
    })

    await newRental.save()

    res.status(201).json('created rental')
  } catch (error) {
    console.error('Error creating rental:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const search = async (req, res) => {
  console.log('search controller working')
  const { name } = req.query
  if (!name) return res.status(400).json('Name is required')

  try {
    const users = await User.find({
      name: { $regex: `^${name}`, $options: 'i' }
    })

    if (users.length === 0)
      return res.status(404).json({ message: 'No users found' })

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

//controller to fetch rental data
export const getRental = async (req, res) => {
  try {
    console.log('Fetching rental data...')
    const rentals = await Rental.find()
      .populate('user' , 'name phone')
      .populate('tools.toolId', 'name')

    if (!rentals.length) {
      console.log('No rental data found')
      return res.status(404).json({ message: 'No rentals found' })
    }

    res.json(rentals)
  } catch (error) {
    console.error('Error fetching rentals:', error)
    res.status(500).json({ message: 'Internal server error' })
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
