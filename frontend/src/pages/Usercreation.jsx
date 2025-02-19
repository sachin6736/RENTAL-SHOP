import React, { useState } from 'react'

export default function Usercreation () {
  const [buttonText, setButtonText] = useState('Proceed')
  const [formData, setFormData] = useState({
    name: '',
    adress: '',
    phone: '',
    aadhar: '',
    profession: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Processing...');
  
    try {
      const res = await fetch('http://localhost:3000/user/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();  // Parse JSON response
  
      console.log('Server Response:', res.status, result);
  
      if (res.status === 401) {
        setButtonText('All fields are necessary');
        alert(result.message || 'All fields are required.');
      } else if (res.status === 409) {
        setButtonText('User Already Exists');
        alert(result.message || 'User already exists! Try using a different phone or Aadhar.');
      } else if (res.status === 201) {
        setButtonText('User Created');
        alert(result.message || 'User successfully created!');
      } else {
        setButtonText('Error Occurred');
        alert(`Error: ${result.message || 'Something went wrong!'}`);
      }
  
    } catch (error) {
      console.error('Error:', error);
      setButtonText('Error Occurred');
      alert('Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <div className='w-screen h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200'>
      <header className='bg-blue-800 w-full py-4 text-center shadow-md'>
        <h1 className='text-2xl font-bold text-white uppercase tracking-wider'>
          Tools Rental Shop
        </h1>
        <p className='text-sm text-blue-200'>
          Efficient and affordable tool rentals
        </p>
      </header>
      <div className='flex flex-col justify-center items-center mt-8 p-4 bg-white shadow-lg rounded-md border border-gray-300 max-w-md w-full'>
        <h2 className='text-xl font-semibold text-blue-800 mb-4'>
          User Creation
        </h2>
        <form
          className='flex flex-col w-full space-y-4'
          onSubmit={handleSubmit}
        >
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='name'
            placeholder='Enter Name'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='adress'
            placeholder='Enter Address'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='phone'
            placeholder='Enter Phone Number'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='aadhar'
            placeholder='Enter Aadhar Number'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='profession'
            placeholder='Enter Profession'
            onChange={handleChange}
          />
          <button
            className='bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all'
            type='submit'
          >
            {buttonText}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className='mt-8 text-center'>
        <p className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} Tools Rental Shop. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}
