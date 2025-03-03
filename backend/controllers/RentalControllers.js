<<<<<<< HEAD
import User from '../models/user.js'
import Rental from '../models/rent.js'
import Tools from '../models/tools.js'
import mongoose from 'mongoose';
// const mongoose = require('mongoose');


=======
  import User from '../models/user.js'
  import Rental from '../models/rent.js'
  import Tools from '../models/tools.js'
>>>>>>> 6f1de726ecf1bfcca30466ac987be33e454fbea5

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
        .populate('user', 'name phone')
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
<<<<<<< HEAD

    const formattedTools = tools.map(tool => {
      if (!mongoose.Types.ObjectId.isValid(tool.toolId)) {
        throw new Error(`Invalid tool ID: ${tool.toolId}`);
      }
      return {
        toolId: new mongoose.Types.ObjectId(tool.toolId),
        count: tool.count
      };
    });
    
    const newRental = new Rental({
      user: user._id,
      tools: formattedTools,
      time,
      amount,
      status: 'rented'
    })

    await newRental.save()

    res.status(201).json('created rental')
  } catch (error) {
    console.error('Error creating rental:', error)
    res.status(500).json({ message: 'Internal Server Error' })
=======
>>>>>>> 6f1de726ecf1bfcca30466ac987be33e454fbea5
  }

  //updating rental when full tools are returned
  export const updateRental = async (req, res) => {
    const { status, discount, amount, note } = req.body;
    const rentalId = req.params.id;
  
    try {
      const rental = await Rental.findById(rentalId);
      if (!rental) {
        return res.status(404).json({ message: "Rental not found" });
      }
  
      // Only process the tools that have NOT been fully returned before
      for (const tool of rental.tools) {
        const remainingToReturn = tool.count - tool.returnedCount; // Only return the remaining tools
        if (remainingToReturn > 0) {
          const toolData = await Tools.findById(tool.toolId);
          if (toolData) {
            toolData.count += remainingToReturn; // Add only the remaining tools back to stock
            await toolData.save();
          }
        }
        tool.returnedCount = tool.count; // Mark all as returned
        tool.returnedAt.push(new Date());
      }
  
      rental.status = "returned";
      rental.discount = discount;
      rental.amount = amount;
      rental.note = note;
      
      await rental.save();
  
      res.json({ message: "Full return processed successfully", rental });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error processing full return" });
    }
  };
  

///partialreturns
export const partialReturn = async (req, res) => {
  const { rentalId, returnedTools } = req.body;
  console.log("Request Data:", req.body);

  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    let allReturned = true; // Flag to check if all tools are returned
    let totalDeduction = 0; // Total amount to be deducted based on returned tools

    for (const returnedTool of returnedTools) {
      const toolIndex = rental.tools.findIndex(tool => tool.toolId.toString() === returnedTool.toolId);
      
      if (toolIndex !== -1) {
        // Update returned count and returnedAt date
        rental.tools[toolIndex].returnedCount += returnedTool.returnedCount;
        rental.tools[toolIndex].returnedAt.push(new Date());

        // If any tool is not fully returned, mark rental as partially returned
        if (rental.tools[toolIndex].returnedCount < rental.tools[toolIndex].count) {
          allReturned = false;
        }
      }

      // Fetch tool details to update inventory and calculate amount deduction
      const tool = await Tools.findById(returnedTool.toolId);
      if (tool) {
        tool.count += returnedTool.returnedCount; // Update inventory count
        await tool.save();

        // Calculate total amount deduction
        totalDeduction += returnedTool.returnedCount * tool.price; 
      }
    }

    // Update the total amount after deduction
    rental.amount -= totalDeduction;

    // Update status based on full or partial return
    rental.status = allReturned ? "returned" : "partially returned";

    await rental.save();

    res.json({ 
      message: "Partial return processed successfully", 
      rental, 
      totalDeduction // Send deducted amount to frontend
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error processing partial return" });
  }
};