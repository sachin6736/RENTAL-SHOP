import express from 'express';
import { search,searchnumber } from '../controllers/RentalControllers.js';
const router = express.Router();

router.get('/search',search);//searching with username
router.get('/searchnumber',searchnumber)

export default router;




