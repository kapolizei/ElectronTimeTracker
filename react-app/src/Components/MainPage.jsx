import { useEffect, useState } from "react";
import '../App.css';
import Header from "./Header";

export default function MainPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [actionShow, setIsActionShow] = useState(false);
    const [items, setItems] = useState([]);
    const [totalSavedTime, setTotalSavedTime] = useState(0); // Состояние для общего времени

    useEffect(() => {
        const savedItems = localStorage.getItem('savedItems');
        const savedTotalTime = localStorage.getItem('totalSavedTime');

        if (savedItems) {
            try {
                setItems([savedItems]);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                setItems([]);
            }
        } else {
            setItems([]);
        }

        if (savedTotalTime) {
            setTotalSavedTime(parseInt(savedTotalTime, 10));
        }
    }, []);

    function handleClick() {
        if (!isRunning) {
            setIsRunning(true);
            setIsActionShow(true);
            const timerId = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            setTimerId(timerId);
        }
    }

    function handlePause() {
        if (isRunning) {
            setIsRunning(false);
            setIsPaused(true);
            clearInterval(timerId);
        }
    }

    function handleStop() {
        clearInterval(timerId);
        setIsRunning(false);
        setIsPaused(false);
        setElapsedTime(0);
    }

    const handleSave = () => {
        if (isRunning) {
            const savedTimeInSeconds = elapsedTime;
            const newTotalSavedTime = totalSavedTime + savedTimeInSeconds;
            setTotalSavedTime(newTotalSavedTime);
            localStorage.setItem('totalSavedTime', newTotalSavedTime);

            let formattedTime;
            if (savedTimeInSeconds < 60) {
                formattedTime = `${savedTimeInSeconds} seconds`;
            } else if (savedTimeInSeconds < 3600) {
                const minutes = Math.floor(savedTimeInSeconds / 60);
                const seconds = savedTimeInSeconds % 60;
                formattedTime = `${minutes} minutes ${seconds} seconds`;
            } else {
                const hours = Math.floor(savedTimeInSeconds / 3600);
                const minutes = Math.floor((savedTimeInSeconds % 3600) / 60);
                const seconds = savedTimeInSeconds % 60;
                formattedTime = `${hours} hours ${minutes} minutes ${seconds} seconds`;
            }

            setItems(prevItems => [...prevItems, formattedTime]);
            setElapsedTime(0);
            clearInterval(timerId);
            setIsRunning(false);
        }
    };

    const handleDelete = () => {
        localStorage.removeItem('savedItems');
        localStorage.removeItem('totalSavedTime');
        setItems([]);
        setTotalSavedTime(0);
    }

    // Функция для форматирования общего времени
    const formatTotalTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours} hours ${minutes} minutes ${seconds} seconds`;
    };

    const seconds = (elapsedTime % 60);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const hours = Math.floor(elapsedTime / 3600);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <>
            <Header />
            <div className="h-screen w-screen bg-gray-300 flex flex-col items-center justify-center ">
                <h1 className='text-gray-900 font-bold text-4xl '>Time Tracker</h1>
                <p className='text-gray-900 text-3xl'>{actionShow ? formattedTime : "Start the timer"}</p>
                <div className='flex-row space-x-4 p-5'>
                    <button
                        className='bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'
                        onClick={isRunning ? handlePause : handleClick}>
                        {isRunning ? 'Pause' : (isPaused ? 'Resume' : 'Start')}
                    </button>

                    <button onClick={handleSave}
                            className='group bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'>Save
                    </button>
                </div>

                <div className={`${items.length < 1 ? '' : 'shadow-xl bg-gray-300 h-fit w-fit p-2 flex flex-col items-center justify-center rounded'}`}>
                    <p className={`${totalSavedTime <= 0 ? 'hidden' : 'text-gray-900'}`}>
                        {formatTotalTime(totalSavedTime)}
                    </p>
                    <button
                        className={`${items.length < 1 ? 'hidden' : 'group bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'}`} onClick={handleDelete}>Delete</button>
                </div>


            </div>
        </>
    );
}
