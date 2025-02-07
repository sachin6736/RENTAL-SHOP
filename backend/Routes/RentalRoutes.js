import express from 'express';
import { search,createrental } from '../controllers/RentalControllers.js';
const router = express.Router();


router.post('/giverent',createrental)//giving rent
router.get('/search',search);//searching with username

export default router;




