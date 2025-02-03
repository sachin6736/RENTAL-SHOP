import Tools from "../models/tools.js";

export const createtool = async(req,res,next)=>{
    const {name,count,price}= req.body;
    console.log('controller working',req.body);
    if(!name || !count){
        res.status(401).json("all fields necessary")
    }else{
        const newtools = new Tools({
            name:name,
            count:count,
            price:price
        });
        try {
            await newtools.save();
            res.status(201).json("tools succesfully added")
        } catch (error) {
            console.log('error occured',error)
        }
    }
}///adding tool

// In your tools controller
export const gettools = async (req, res) => {
    try {
      const tools = await Tools.find(); // Fetch all tools from the database
      res.status(200).json(tools);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error while fetching tools.");
    }
};//gettingtools
  

export const deletetool = async(req,res,next)=>{
    console.log("controller working")
    try {
        const id = req.params.id;
        const deleted = await Tools.findByIdAndDelete(id);
        if(deleted){
            res.status(200).send("tool deleted")
        }else{
            res.status(404).send("failed to delete user")
        }
    } catch (error) {
        console.log(error, "error occured during deleton")
    }

}