import express from 'express'
import {
  search,
  createrental,
  getRental,
  updateRental,
  partialReturn,
  
} from '../controllers/RentalControllers.js'

const router = express.Router()

router.post('/giverent', createrental) //giving rent
router.get('/search', search) //searching with username
router.get('/getrental', getRental) //fetch rent data
router.put('/update/:id', updateRental) //update rental data
router.put("/partialreturn",partialReturn)//partial ttols returning

export default router
