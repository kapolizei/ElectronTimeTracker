import '../App.css';
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ActionButton from "./ActionButton";
import SelectProject from "./SelectProject";
import {useDispatch} from "react-redux";
import {setData} from "../state/store";
import {LazyLoad} from "./LazyLoad";

export default function MainPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [endTime, setEndTime] = useState("")
    const [startTime, setStartTime] = useState("")
    const [fetchData, setFetchData] = useState([])

    const dispatch = useDispatch();

    //LocalStorage Project
    const [selectedProject, setSelectedProject] = useState(() => {
        return localStorage.getItem('selectedProject') || null;
    });

    //LocalStorage ElapsedTime
    const [elapsedTime, setElapsedTime] = useState(() => {
        const savedTime = localStorage.getItem('elapsedTime');
        return savedTime ? parseInt(savedTime, 10) || 0 : 0;
    });

    const handleProjectSelect = (projectId) => {
        setSelectedProject(projectId);
        localStorage.setItem("selectedProject", projectId)
        console.log("selected", selectedProject, projectId)
    };

///Project select useEffect
    useEffect(() => {
        if (selectedProject !== null) {
            localStorage.setItem('selectedProject', selectedProject);
        } else {
            localStorage.removeItem('selectedProject');
        }
    }, [selectedProject]);
    useEffect(() => {
        localStorage.setItem('elapsedTime', elapsedTime);
    }, [elapsedTime]);

    useEffect(() => {
        if (selectedProject) {
            const fetchStatistics = async () => {
                try {
                    const response = await fetch(`https://localhost:8000/api/time/project/${selectedProject}`);
                    const apiData = await response.json();
                    dispatch(setData(apiData));
                    setFetchData(apiData);
                    console.log("data:",apiData)
                } catch (error) {
                    console.error('Ошибка загрузки данных:', error);
                }
            };
            fetchStatistics();
        }
    }, [selectedProject, dispatch]);


    function handleClick() {
        setIsRunning(true);
        const now = new Date();
        setStartTime(now);
        console.log('Timer Started At :', now);

        const timerId = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);
        setTimerId(timerId);
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    function handlePause() {
        if (isRunning) {
            setIsRunning(false);
            setIsPaused(true);
            clearInterval(timerId);
        }
    }

    const handleSave = () => {
        if (isRunning || isPaused) {
            clearInterval(timerId)
            setIsRunning(false)
            const now = new Date();
            setEndTime(now)
            const startedAt = formatDate(startTime);
            const endAt = formatDate(now)
            const task_id = 1;
            console.log(startedAt,'end at:', endAt)
            saveToDatabase(startedAt, endAt, elapsedTime, task_id,selectedProject);

            setStartTime(null)
            setEndTime(null)
            setElapsedTime(0)
            localStorage.setItem('elapsedTime', 0);
            setTimerId(null)
        }
    }

    const saveToDatabase = (startedAt, endAt, elapsedSeconds, task_id,selectedProject) => {
        console.log("Перед сохранением:", { startedAt, endAt, elapsedSeconds });
        fetch('https://localhost:8000/api/save_time_entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                started_at: startedAt,
                end_at: endAt,
                user_id: 1,
                project_id: selectedProject,
                task_id: task_id,
            })
        })
            .then(response => response.json())
            .then(data => console.log("Ответ сервера:", data))
            .catch(error => console.error("Ошибка сохранения:", error));
    };

    //Для отрисовки счетчика при запуске//
    const seconds = (elapsedTime % 60);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const hours = Math.floor(elapsedTime / 3600);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center pt-20">
            <header className="fixed top-0 left-0 w-full shadow-lg py-4 z-10 text-center text-white">
                <Header/>
            </header>
            <div className=" shadow-2xl rounded-xl max-w-2xl p-8 mt-20">
                <div className="text-white mb-8 text-center">
                    {selectedProject === null ? (
                        <div>
                            <h3 className="text-2xl font-semibold">Choose a Project</h3>
                            <SelectProject onProjectSelect={handleProjectSelect}/>
                        </div>
                    ) : (
                        <>
                            <div className="text-center space-y-4 flex-col ">
                                <p className="text-gray-300 text-4xl font-semibold">
                                    {selectedProject ? formattedTime : "Start the Timer"}
                                </p>
                                <div className="flex items-center justify-center space-x-4">
                                    <button
                                        className={`py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-300 ease-in-out 
                                    ${isRunning ? "bg-red-500 hover:bg-red-400" : "bg-blue-500 hover:bg-blue-400"}`}
                                        onClick={isRunning ? handlePause : handleClick}
                                    >
                                        {isRunning ? 'Pause' : (isPaused ? 'Resume' : 'Start')}
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="py-3 px-6 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-400 transition-colors duration-300 ease-in-out"
                                    >
                                        Save
                                    </button>

                                    <ActionButton/>
                                </div>
                                <div className="flex flex-col items-center justify-center mt-6 bg-gray-700 shadow-lg rounded-lg p-4 w-full max-w-md text-center">
                                    <p className="text-gray-300 font-medium mb-2">
                                        <LazyLoad/>
                                    </p>

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>


    );
}

