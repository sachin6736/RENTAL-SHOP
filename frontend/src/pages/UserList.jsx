import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalImage from 'react-modal-image'

export default function UserList () {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/user/getusers') // Replace with your endpoint
        const result = await res.json()
        console.log(result)

        setUsers(result)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async userId => {
    try {
      const res = await fetch(
        `http://localhost:3000/user/deleteuser/${userId}`,
        {
          method: 'DELETE'
        }
      )
      if (res.status === 200) {
        setUsers(users.filter(item => item._id !== userId))
      } else {
        alert('failed to delete user')
      }
    } catch (error) {
      console.log('error occured during deletion', error)
    }
  }

  const handleEdit = userId => {
    navigate(`/edituser/${userId}`)
  }

  return (
    <div className='w-full h-full p-4 flex flex-col items-center bg-gradient-to-r from-blue-200 via-white to-blue-200'>
      {/* User List Section */}
      <div className='mt-8 p-4 bg-white shadow-lg rounded-md border border-gray-300 max-w-4xl w-full'>
        <h2 className='text-xl font-semibold text-blue-800 mb-4 text-center'>
          User List
        </h2>
        <div className='w-full max-h-[430px] overflow-y-auto'>
          {loading ? (
            <div className='text-center text-gray-500'>Loading users...</div>
          ) : users.length > 0 ? (
            <table className='w-full border-collapse border border-gray-300 text-left'>
              <thead>
                <tr className='bg-blue-100 text-blue-800'>
                  <th className='border border-gray-300 p-2'>AadharCard</th>
                  <th className='border border-gray-300 p-2'>Name</th>
                  <th className='border border-gray-300 p-2'>Address</th>
                  <th className='border border-gray-300 p-2'>Phone</th>
                  <th className='border border-gray-300 p-2'>Aadhar</th>
                  <th className='border border-gray-300 p-2'>Profession</th>
                  <th className='border border-gray-300 p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className='border border-gray-300 p-2'>
                      {/* <img
                        src={`http://localhost:3000/${user.aadharFile}`}
                        alt='aadharFile'
                      /> */}

                      {/* implemented modal for showing image */}
                      <ModalImage
                        small={`http://localhost:3000/${user.aadharFile}`}
                        large={`http://localhost:3000/${user.aadharFile}`}
                      />
                    </td>
                    <td className='border border-gray-300 p-2'>{user.name}</td>
                    <td className='border border-gray-300 p-2'>
                      {user.adress}
                    </td>
                    <td className='border border-gray-300 p-2'>{user.phone}</td>
                    <td className='border border-gray-300 p-2'>
                      {user.aadhar}
                    </td>
                    <td className='border border-gray-300 p-2'>
                      {user.profession}
                    </td>
                    <td className='border border-gray-300 p-2 flex justify-around'>
                      <button
                        className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-center text-gray-500'>No users found.</div>
          )}
        </div>
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
