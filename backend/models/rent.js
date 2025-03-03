import mongoose from 'mongoose'
import Tools from './tools.js'

const rentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tools: [
    {
      toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tools',
        required: true
      },
      count: { type: Number, required: true },  // Total rented tools
      returnedCount: { type: Number, default: 0 }, // Count of returned tools
      returnedAt: [{ type: Date }] // Array of return timestamps
    }
  ],
  time: { type: Number, required: true }, // E.g., "3 days"
  amount: { type: Number, required: true }, // Total amount for the rental
  status: {
    type: String,
    enum: ['rented', 'partially returned', 'returned', 'missing'],
    default: 'rented'
  },
  rentedAt: { type: Date, default: Date.now }, // When rented
  note: { type: String }
})


const Rental = mongoose.model('Rental',rentalSchema)
export default Rental
