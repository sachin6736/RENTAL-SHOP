import express from 'express'
import {
  createuser,
  getusers,
  edituser,
  deleteuser,
  getusertoupdate
} from '../controllers/UserController.js'
import {
  createtool,
  deletetool,
  gettools
} from '../controllers/ToolsController.js'

import multer from 'multer'

const upload = multer({ dest: "uploads/" });

const router = express.Router()

//userroutes
router.get('/getusers', getusers)
router.get('/getuser/:id',getusertoupdate)
router.post('/createuser',upload.single("aadharFile"), createuser); 
router.put('/edituser/:id', upload.single("aadharFile"),edituser); 
router.delete('/deleteuser/:id', deleteuser)
//tools router
router.post('/createtools',upload.single("image"), createtool) //creating tool
router.delete('/deletetool/:id', deletetool) //deleting tool
router.get('/gettools', gettools)

export default router
