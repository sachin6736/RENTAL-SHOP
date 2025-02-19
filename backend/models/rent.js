import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    tools: [
      {
        toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
        count: { type: Number, required: true },
      },
    ],
    time: { type: String, required: true }, 
    amount: { type: Number, required: true }, // Total amount for the rental
    status: {
      type: String,
      enum: ["rented", "returned", "missing"],
      default: "rented",
    },
    rentedAt: { type: Date, default: Date.now }, // Timestamp of when the rent happened
    returnedAt: { type: Date }, // Set when the tool is returned
  });
  
  const Rental = mongoose.model("Rental", rentalSchema);
  export default Rental;
