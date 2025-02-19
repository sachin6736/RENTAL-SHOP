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
const router = express.Router()

//userroutes
router.get('/getusers', getusers)
router.get('/getuser/:id',getusertoupdate)
router.post('/createuser', createuser) ///creating user
router.put('/edituser/:id', edituser) ///editing user
router.delete('/deleteuser/:id', deleteuser)
//tools router
router.post('/createtools', createtool) //creating tool
router.delete('/deletetool/:id', deletetool) //deleting tool
router.get('/gettools', gettools)

export default router
