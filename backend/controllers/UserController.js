import User from '../models/user.js'

//creating user
export const createuser = async (req, res, next) => {
  console.log('Controller working');
  const { name, adress, phone, aadhar, profession } = req.body;

  if (!name || !phone) {
    return res.status(401).json({ message: 'Phone number and name are mandatory' });
  }

  try {
    // Check if a user already exists with the same phone or aadhar (only if aadhar is provided)
    const query = aadhar ? { $or: [{ phone }, { aadhar }] } : { phone };
    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this phone or Aadhar' });
    }

    console.log('User request:', req.body);
    const newuser = new User({ name, adress, phone, aadhar, profession });

    await newuser.save();
    return res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.log('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



//get user
export const getusers = async (req, res, next) => {
  try {
    const allusers = await User.find()
    console.log('this is all users', allusers)
    res.status(200).json(allusers)
  } catch (error) {
    console.log(error)
  }
}

//edit user
export const edituser = async (req, res, next) => {
  console.log('controller working')
  try {
    const id = req.params.id
    const { name, adress, phone, aadhar, profession } = req.body
    const updated = await User.findByIdAndUpdate(
      { _id: id },
      { name: name },
      { adress: adress },
      { phone: phone },
      { aadhar: aadhar },
      { profession: profession },
      { new: true, runValidators: true }
    )
    if (updated) {
      res.status(200).json('updated')
    } else {
      res.status(404).json('failed to update')
    }
  } catch (error) {
    console.log(error)
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
