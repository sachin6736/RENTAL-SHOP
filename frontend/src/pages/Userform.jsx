import React, { useState } from 'react'

const Form = () => {
   const[formData,setFormData]=useState({
    phone:"",
    name:"",
    tool:"",
    count:1
  });

  
  const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({...formData,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Submitted Data",formData);
  }

  const handleNewUser=()=>{
    setFormData({phone:"",name:"",tool:"",count:1});
    console.log("NewuserData",formData);
  }


  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-200 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='p-6 bg-white shadow-md rounded-lg w-96 space-y-4 border-gray-300'>
        <h2 className="text-xl font-semibold text-blue-800 mb-5 text-center">
          User Creation
        </h2>
            <div>
                <label htmlFor="phone" className='block text-gray-600 mb-1'>Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter Phonenumber' className='w-4/5 border  border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300' required/>
            </div>
            <div>
              <label htmlFor="name" className='block text-slate-600 mb-1'>Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className='w-4/5 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300' required/>
            </div>
            <div>
              <label htmlFor="tool" className='block text-slate-600 mb-1'>Tools</label>
              <select name="tool" id="tool" value={formData.tool} onChange={handleChange} className='w-4/5 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300'>
                <option value="" disabled>Select a tool</option>
                <option value="Hammer">Hammer</option>
                <option value="ScrewDriver">ScrewDriver</option>
                <option value="Wrench">Wrench</option>
              </select>
            </div>
            <div>
              <label htmlFor="count" className='block text-slate-600 mb-1'>Count</label>
              <input type="number" id="count" name="count" value={formData.count} onChange={handleChange} min="1" className='w-4/5 border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300'  required/>
            </div>
            <div className='flex items-center space-x-3 mt-3'>
              <button type='button' onClick={handleNewUser} className='w-1/3 h-10 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-green-700 text-sm'>
              New User
              </button>
              <button type='Submit' className='w-1/3 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-blue-600'>
               Save
              </button>
            </div>
       </form>
       </div>
  )  
}

export default Form
