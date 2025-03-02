import User from '../models/user.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const userName = req.body.name.replace(/\s+/g, '-').toLowerCase() // Remove spaces and convert to lowercase
    cb(null, `${userName}-${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

//creating user
export const createuser = async (req, res, next) => {
  console.log('Controller working')
  const { name, adress, phone, aadhar, profession } = req.body
  const aadharFile = req.file ? req.file.path : ''

  if (!name || !phone) {
    return res
      .status(401)
      .json({ message: 'Phone number and name are mandatory' })
  }

  try {
    // Check if a user already exists with the same phone or aadhar (only if aadhar is provided)
    const query = aadhar ? { $or: [{ phone }, { aadhar }] } : { phone }
    const existingUser = await User.findOne(query)

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already exists with this phone or Aadhar' })
    }

    console.log('User request:', req.body)
    const newuser = new User({
      name,
      adress,
      phone,
      aadhar,
      profession,
      aadharFile
    })

    await newuser.save()
    return res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.log('Error occurred:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

//get user
export const getusers = async (req, res, next) => {
  console.log('Getallusers working')
  try {
    const allusers = await User.find()
    console.log('this is all users', allusers)
    res.status(200).json(allusers)
  } catch (error) {
    console.log(error)
  }
}

export const getusertoupdate = async (req, res, next) => {
  try {
    console.log('Fetching user ID:', req.params.id)
    const updateuser = await User.findById(req.params.id)

    if (updateuser) {
      res.status(200).json({
        ...updateuser._doc,
        aadharFile: updateuser.aadharFile
          ? `http://localhost:3000/${updateuser.aadharFile}` // Assuming your server is running on port 5000
          : ''
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

//edit user
export const edituser = async (req, res, next) => {
  console.log('Editusercontroller working')
  try {
    const id = req.params.id
    console.log('Userid', id)

    const { name, adress, phone, aadhar, profession } = req.body
    const aadharFile = req.file ? req.file.path : null

    if (!aadharFile) {
      console.log('No aadhar')
    }

    const updateData = { name, adress, phone, aadhar, profession }
    if (aadharFile) {
      updateData.aadharFile = aadharFile
    }

    const updated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    if (updated) {
      res.status(200).json({ message: 'User updated', user: updated })
    } else {
      res.status(404).json({ message: 'Failed to update user' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

//delete user
export const deleteuser = async (req, res, next) => {
  console.log('controller working')
  try {
    const id = req.params.id
    const deleted = await User.findByIdAndDelete(id)
    if (deleted) {
      res.status(200).json('user deleted succesfully')
    } else {
      res.status(404).json('failed to delete user')
    }
  } catch (error) {
    console.log('failed to delete user', error)
  }
}
