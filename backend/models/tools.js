import mongoose from 'mongoose';

const toolsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    count:{
        type:Number,
        required:true,
        unique:false
    }
})

const Tools = mongoose.model('Tools',toolsSchema);
export default Tools;
