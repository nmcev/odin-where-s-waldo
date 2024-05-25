import { useNavigate } from 'react-router-dom'
import waldo from '../assets/waldo.png'
export default function HomePage() {
    const navigate = useNavigate();

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
    </section>
  )
}
