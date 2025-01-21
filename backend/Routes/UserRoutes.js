import express from 'express';
import { createuser,getusers,edituser,deleteuser } from '../controllers/UserController.js';
import { createtool } from '../controllers/ToolsController.js';
const router = express.Router();

//userroutes
router.get('/getusers',getusers)
router.post('/createuser',createuser);///creating user
router.post('/edituser/:id',edituser);///editing user
router.delete('/deleteuser/:id',deleteuser)
//tools router
router.post('/createtools',createtool);


export default router;
