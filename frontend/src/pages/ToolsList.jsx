import React from 'react'
import Drilling from '../assets/drilling.jpg'
import Hammer from '../assets/hammer.jpg'
import Sawmachine from '../assets/sawmachine.webp'
import Wrenchset from '../assets/wrenchset.webp'

const tools = [
    {
      id: 1,
      name: "Electric Drill",
      price: "$120",
      image: Drilling,
      count:4,
    },
    {
      id: 2,
      name: "Hammer",
      price: "$25",
      image: Hammer,
      count:3,
    },
    {
      id: 3,
      name: "Saw Machine",
      price: "$75",
      image: Sawmachine,
      count:2,
    },
    {
      id: 4,
      name: "Wrench Set",
      price: "$50",
      image: Wrenchset,
      count:10,
    },
  ];

const ToolCard = ({ tool }) => {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition-transform">
        <img src={tool.image} alt={tool.name} className="w-full h-40 object-cover rounded-xl" />
        <h2 className="mt-2 text-lg font-semibold">{tool.name}</h2>
        <div className='flex items-center justify-center space-x-44'>
        <p className="text-gray-600">{tool.price}</p>
        <p className="text-red-600">{tool.count} left</p>
        </div>
      </div>
    );
};

const ToolsList = () => {
  return (
    <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  </div>
  )
}

export default ToolsList
