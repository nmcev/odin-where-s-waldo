import { useNavigate } from 'react-router-dom'
import waldo from '../assets/waldo.png'
import { useEffect, useState } from 'react';
export default function HomePage() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3000/users', {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                  },
            });

            if (response.ok) {
                const data = await response.json()
                setUsers(data.users)
            }

        }

        fetchUsers()
    }, [])

  return (
      <section className='flex flex-col items-center justify-center min-h-screen bg-red-200'>
          {/* image section */}
          <div className="w-full flex flex-col items-center justify-center">
              <img className='max-sm:ml-16' width={400} src={waldo} alt="Waldo image" />
              <h1 className='text-5xl text-red-600 font-black uppercase inter-font text-center tracking-wide'>Where is Waldo?</h1>
              <p className='font-bold text-sm inter-font'>Find Waldo, Wizard, and Odlaw in a shortest time</p>
          </div>

          {/* content section */}
          <div className='flex mt-6'>
              <button onClick={() => navigate('/where-is-waldo')} className='bg-orange-400 px-5 py-2 rounded-md font-montserrat'>
                  Find Waldo!
            </button>
      </div>
      



      <div className="relative overflow-x-auto min-w-[32rem]  mt-3">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
            </tr>
        </thead>
        <tbody>
            {
                users && (
                    users.map((user) => (
                        <tr key={user.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.name}
                        </th>
                        <td className="px-6 py-4">
                            {user.duration / 100}s
                        </td>
        
                    </tr>
                    ))
                )
            }
      
        </tbody>
          </table>
          </div>

    </section>
  )
}
