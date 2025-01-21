import Tools from "../models/tools.js";

export const createtool = async(req,res,next)=>{
    const {name,count}= req.body;
    console.log('controller working',req.body);
    if(!name || !count){
        res.status(401).json("all fields necessary")
    }else{
        const newtools = new Tools({
            name:name,
            count:count
        });
        try {
            await newtools.save();
            res.status(201).json("tools succesfully added")
        } catch (error) {
            console.log('error occured',error)
        }
    }
}