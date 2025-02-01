import User from "../models/user.js";



///user controllers
export const createuser = async(req,res,next)=>{
    console.log("controller working")
    const {name,adress,phone,aadhar,profession} = req.body;
    if(!name || !adress|| !phone|| !aadhar|| !profession){
        res.status(401).json("all fields necessary")
    }else{
        console.log("user request",req.body);
        const newuser = new User({
        name:name,
        adress:adress,
        phone:phone,
        aadhar:aadhar,
        profession:profession
    });

    try {
        await newuser.save();
        res.status(201).json('user created')
    } catch (error) {
        console.log("eroor ocuured",error)
    }
    } 
}///creating user

export const getusers = async(req,res,next)=>{
  try {
    const allusers = await User.find();
    console.log("this is all users",allusers);
    res.status(200).json(allusers)
  } catch (error) {
    console.log(error)
  }
}


export const edituser = async(req,res,next)=>{
    console.log("controller working");
   try {
    const id = req.params.id;
    const {name,adress,phone,aadhar,profession} = req.body;
    const updated = await User.findByIdAndUpdate({_id:id},{name:name},{adress:adress},{phone:phone},{aadhar:aadhar},{profession:profession},{new:true,runValidators:true});
    if(updated){
        res.status(200).json("updated")
    }else{
        res.status(404).json('failed to update')
    }
   } catch (error) {
    console.log(error);
   }
}///editing user

export const deleteuser = async(req,res,next)=>{
    console.log("controller working")
    try {
        const id = req.params.id;
        const deleted = await User.findByIdAndDelete(id)
        if(deleted){
            res.status(200).json("user deleted succesfully")
        }else{
            res.status(404).json("failed to delete user")
        }
    } catch (error) {
        console.log("failed to delete user",error)
    }
}///deleting user




