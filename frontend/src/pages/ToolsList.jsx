import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ToolsList = () => {
  const [tools, setTools] = useState([])
  useEffect(() => {
    const fetchtool = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/gettools')
        const toolsData = await response.json()
        console.log('tooldata', toolsData)
        setTools(toolsData)
      } catch (error) {
        console.log('Error fetching tools', error)
      }
    }
    fetchtool()
  }, [])
  // console.log('Updated tools', tools)

  const navigate = useNavigate()
  const handleClick = () => navigate('/AddTool')

  const handleDelete=  async(toolId)=>{
        try{
          const res=await fetch(`http://localhost:3000/user/deletetool/${toolId}`,
            {
              method:"DELETE",
            });
            console.log(res);
            if(res.status===200){
              setTools(tools.filter((item)=>item._id!==toolId))
            }else{
              alert("failed to delete tool")
            }
      }catch(error){
            console.log("Error during delete tool",error);
      }
  }
  console.log(tools);
  return (
    <div className='w-full h-[85vh] flex flex-col items-center '>
      <div className='w-full flex items-center justify-center p-4'>
        <button
          className='w-[150px] h-[40px] bg-blue-500 rounded-md text-white font-bold'
          onClick={handleClick}
        >
          Add Tool
        </button>
      </div>

      <div className='w-full h-[80vh] flex-1 p-4 overflow-y-auto scrollbar-none'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  '>
          {tools.map(tool => (
            <div key={tool._id} className='flex justify-center'>
              <div className='w-[250px] h-[300px] bg-white rounded-md shadow-lg flex flex-col items-center overflow-hidden'>
                <img
                  src={`http://localhost:3000/${tool.image}`}
                  alt='tool-image'
                  className='w-full h-40 object-cover rounded-t-md'
                />
                <div className='p-4 w-full flex flex-col items-center'>
                  <h2 className='text-lg font-semibold'>{tool.name}</h2>
                  <div className='w-full mt-2 flex justify-between text-sm text-gray-600'>
                    <p>{tool.price}</p>
                    <p className='text-red-600'>{tool.count} left</p>
                  </div>
                </div>
                <div className='w-16 h-6 flex items-center justify-center'>
                  <button onClick={()=>handleDelete(tool._id)} className='bg-[#ff3f56] rounded-xl text-xs w-full h-full text-white'>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToolsList
