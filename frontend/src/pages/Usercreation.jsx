import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UserCreation () {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [buttonText, setButtonText] = useState('Proceed')
  const [formData, setFormData] = useState({
    name: '',
    adress: '',
    phone: '',
    aadhar: '',
    profession: ''
  })
  const [aadharFile, setAadharFile] = useState(null)
  const [aadharImageUrl, setAadharImageUrl] = useState('') // Store URL of existing Aadhaar image

  useEffect(() => {
    const fetchUser = async () => {
      // if (!id) return // Skip fetching if no user ID is present
      try {
        const res = await fetch(`http://localhost:3000/user/getuser/${id}`)
        const result = await res.json()

        setUser(result)
        setFormData({
          name: result.name || '',
          adress: result.adress || '',
          phone: result.phone || '',
          aadhar: result.aadhar || '',
          profession: result.profession || ''
        })

        if (result.aadharFile) {
          setAadharImageUrl(result.aadharFile) // Store URL of existing Aadhaar file
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <p>Loading...</p>;
  if (!user && !loading) return <p>User not found. Please check the ID.</p>;
  

  const handleChange = e => {
    if (e.target.type === 'file') {
      const file = e.target.files[0]
      setAadharFile(file) // Store the newly selected file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('adress', formData.adress)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('aadhar', formData.aadhar)
    formDataToSend.append('profession', formData.profession)

    if (aadharFile && aadharFile instanceof File) {
      formDataToSend.append('aadharFile', aadharFile)
    }

    const url = id
      ? `http://localhost:3000/user/edituser/${id}`
      : 'http://localhost:3000/user/createuser'

    try {
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        body: formDataToSend
      })

      if (res.ok) {
        setButtonText(id ? 'User Updated' : 'User Created')
        setTimeout(() => navigate('/'), 1500)
      } else {
        setButtonText('Error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

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
          {id ? 'Edit User' : 'User Creation'}
        </h2>
        <form
          className='flex flex-col w-full space-y-4'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='name'
            value={formData.name}
            placeholder='Enter Name'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='adress'
            value={formData.adress}
            placeholder='Enter Address'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='phone'
            value={formData.phone}
            placeholder='Enter Phone Number'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='aadhar'
            value={formData.aadhar}
            placeholder='Enter Aadhar Number'
            onChange={handleChange}
          />
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='profession'
            value={formData.profession}
            placeholder='Enter Profession'
            onChange={handleChange}
          />

          {/* Show Existing Aadhaar Image (Only for Edit Mode)
          // {aadharImageUrl && (
          //   <div className='flex flex-col items-center'>
          //     <p className='text-gray-600'>Current Aadhaar Image:</p>
          //     <img
          //       src={aadharImageUrl}
          //       // src={`http://localhost:3000/${result.aadharFile}`}
          //       alt='Aadhar'
          //       className='w-24 h-24 object-cover border rounded mt-2'
          //     />
          //   </div>
          // )} */}

          {/* File Upload Input */}
          <input
            className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='file'
            name='aadharFile'
            accept='.jpg,.jpeg,.png,.pdf'
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
          &copy; {new Date().getFullYear()} Tools Rental Shop. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  )
}
