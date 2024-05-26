import wizard from '../assets/wizard.gif';
import odlaw from '../assets/odlaw.gif';
import waldo from '../assets/WaldoUp.png';
import whereIsWaldo from '../assets/whereswaldo.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stopwatch from '../components/Watch';

export default function WaldoPage() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [characters, setCharacters] = useState(['waldo', 'odlaw', 'wizard']);
    const [clickedCharacters, setClickedCharacters] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);

    const navigate = useNavigate();

    function handleNameChange(e) {
    setName(e.target.value)
    }

    function onClickImage(e) {
        const imageRect = e.currentTarget.getBoundingClientRect();
        const offsetX = ((e.clientX - imageRect.left) / imageRect.width) * 100;
        const offsetY = ((e.clientY - imageRect.top) / imageRect.height) * 100;

        setPosition({
            x: offsetX,
            y: offsetY,
        });
    }

    function onMouseLeave() {
        setTimeout(() => {
            setPosition({ x: 0, y: 0 });
        }, 400);
    }


    async function handleNameClick(e) {
        e.stopPropagation();
        const name = e.target.textContent.toLowerCase();

        const response = await fetch('http://localhost:3000/api/checkPosition', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, clickedPosition: position})
        })

        const data = await response.json();
        if (data.found) {
            setCharacters(characters.filter((characters) => name != characters))
            setClickedCharacters(prevClickedCharacters => [...prevClickedCharacters, { name, position: data.clickedPosition }]);
            if (clickedCharacters.length === 2) {
                setShowDialog(true)
                setIsRunning(false)
            }
        }


    }

    async function handleSubmitName() {
        const response = await fetch('http://localhost:3000/api/submitName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, duration: time})
        })
        const data = await response.json();

        if (data.valid) {
            navigate('/')
        }

        if (data.error) {
            setError(data.error)
        }

    }

    return (
        <section className="grid grid-cols-9 min-h-screen bg-red-200">
            <div className="col-span-1 flex flex-col items-center justify-center gap-6">
                <div>
                    <img src={wizard} width={80} alt="Wizard" />
                    <h1 className="text-center">Wizard</h1>
                </div>
                <div>
                    <img src={waldo} width={80} alt="Waldo" />
                    <h1 className="text-center">Waldo</h1>
                </div>
                <div>
                    <img src={odlaw} width={80} alt="Odlaw" />
                    <h1 className="text-center">Odlaw</h1>
                </div>
                <Stopwatch isRunning={isRunning} setIsRunning={setIsRunning} time={time} setTime={setTime} />
            </div>
            <section className="col-span-8 flex flex-col">
                <div className="flex flex-col items-center mt-5">
                    <h1 className="text-3xl text-red-600 font-black uppercase inter-font text-center tracking-wide">
                        Where is Waldo?
                    </h1>
                    <p className="font-bold text-sm inter-font">Find Waldo, Wizard, and Odlaw in the shortest time</p>
                    {
                        showDialog && (
                            <>
                            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                            <dialog open className=" font-montserrat fixed  inset-0 bg-slate-300 p-4 rounded-lg w-96 shadow-lg z-50 max-sm:w-72">
                                <h1 className="text-2xl font-bold ">Congratulations!</h1>
                                <p className="text-lg mb-4">You&apos;ve found all the characters.</p>

                                    <div className='flex flex-col mb-4'>
                                         <label>enter your name: </label>
                                         <input onChange={handleNameChange}  className='p-1' name='name' type='text'/>
                                        <p className='text-sm text-red-500'>{error}</p>
                                    </div>
                                <button
                                    onClick={handleSubmitName}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    submit
                                </button>
                            </dialog>
                        </>

                        )
                    }
                </div>
                
                <div
                    className="rounded-2xl overflow-hidden relative border-2 cursor-crosshair border-black mx-8 mt-4 mb-20"
                    onClick={onClickImage}
                >
                    <img src={whereIsWaldo} alt="Where is Waldo" className="max-w-full" />
                    {position.x !== 0 && position.y !== 0 && clickedCharacters.length < 3 && (
                        <div
                            onMouseLeave={onMouseLeave}
                            style={{ top: `calc(${position.y}% - 20px)`, left: `calc(${position.x}% - 20px)`, }}
                            className="absolute"
                        >
                            <div className="border-4 border-dashed border-black rounded-full w-12 h-12"></div>
                            <div className="cursor-pointer bg-[#191919] text-white  p-2 flex flex-col gap-1">
                                {
                                    characters.map((character) => (
                                        <h1 className='font-montserrat border-b pb-1 '  onClick={handleNameClick} key={character}>{character}</h1>
                                    ))
                                }

                               
                            </div>
                        </div>
                    )}
                    {
                        
                        clickedCharacters.map((character) => (
                            <div key={character.position.x}
                            className="absolute border-8 border-green-500 w-12 h-12 rounded-full"
                            style={{
                                top: `calc(${character.position.y}% - 25px)`,
                                left: `calc(${character.position.x}% - 25px)`,
                                pointerEvents: 'none',
                            }}
                        ></div>
                                    ))
                    }
                    
                </div>
            </section>
            
        </section>
    );
}
