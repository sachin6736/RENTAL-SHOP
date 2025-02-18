import express from 'express'
import {
  search,
  createrental,
  getRental
} from '../controllers/RentalControllers.js'

const router = express.Router()

router.post('/giverent', createrental) //giving rent
router.get('/search', search) //searching with username
router.get('/getrental', getRental) //fetch rent data

export default router
