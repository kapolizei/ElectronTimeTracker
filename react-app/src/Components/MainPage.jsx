import {useState} from "react";
import '../App.css';
import Header from "./Header";

export default function MainPage () {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const [actionShow, setIsActionShow] = useState(false)
    const [items, setItems] = useState([])


    // Функция для запуска таймера
    function handleClick () {
        if(!isRunning) {
            setIsRunning(true)
            setIsActionShow(true)
            const timerId = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1)
            }, 1000)
            setTimerId(timerId)
        }
    }
    // Функция для паузы
    function handleStop () {
        if(isRunning) {
            clearInterval(timerId);
            setIsRunning(false)
            setIsPaused(false)
            setElapsedTime(0);
        } else if(isPaused) {
            setElapsedTime(0);
            clearInterval(timerId);
        }
    }

    function handlePause () {
        if(isRunning) {
            setIsRunning(false)
            setIsPaused(true)
            clearInterval(timerId)

        }
    }

    const handleSave = () => {
        if(isRunning) {
            setItems([...items, formattedTime])
            setElapsedTime(0)
            clearInterval(timerId)
            setIsRunning(false)
        } else {
            return <p>Nothing to save</p>
            console.log('Nothing to save')
        }
    }


    //Рассчитываем часы
    const seconds = (elapsedTime % 60)
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const hours = Math.floor(elapsedTime / 3600);
    // Форматируем время
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;



    return (
        <>
            <Header/>
            <div className="h-screen w-screen bg-gray-300 flex flex-col items-center justify-center ">
                <h1 className='text-gray-900 font-bold text-4xl '>Time Tracker</h1>
                <p className='text-gray-900 text-3xl'>{actionShow ? formattedTime : "Start the timer"}</p>
                <div className='flex-row space-x-4 p-5'>
                    <button
                        className='bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'
                        onClick={isRunning ? handlePause : handleClick}>
                        {isRunning ? 'Pause' : (isPaused ? 'Resume' : 'Start')}
                    </button>
                    <button
                        className='bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'
                        onClick={handleStop}>Stop
                    </button>


                    <button onClick={handleSave}
                            className='group bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'>Save
                    </button>



                </div>
                <div className={`${items.length < 1 ? '' : 'shadow-xl bg-gray-400 h-fit w-fit p-2 flex flex-col items-center justify-center rounded'}`}>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )
}