import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  adress: {
    type: String,
    required: false,
    unique: false
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  aadhar: {
    type: String,
    required: false,
    unique: true
  },
  profession: {
    type: String,
    required: false,
    unique: false
  },
  aadharFile:{
    type:String
  }
})

const User = mongoose.model('User', userSchema)
export default User
