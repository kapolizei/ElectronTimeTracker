import '../App.css';
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ActionButton from "./ActionButton";
import ProjectCombobox from "./ProjectCombobox";
import {FormatMin} from "./FormatTotalTime";


export default function MainPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [actionShow, setIsActionShow] = useState(false);
    const [totalSavedTime, setTotalSavedTime] = useState(0); // Состояние для общего времени

    const [endTime, setEndTime] = useState("")
    const [startTime, setStartTime] = useState("")
    const [fetchData, setFetchData] = useState([])
    const totalTime = fetchData["total_time"] || 0;
    const projectTitle = fetchData['project_title'];

    //LocalStorage Project
    const [selectedProject, setSelectedProject] = useState(() => {
        return localStorage.getItem('selectedProject') || null;
    });

    const handleProjectSelect = (projectId) => {
        setSelectedProject(projectId);
        localStorage.setItem("selectedProject", projectId)
        console.log("selected", selectedProject, projectId)
    };

    const LazyLoad = () => {
            const [isVisible, setIsVisible] = useState(false);
            useEffect(() => {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 1000);
                return () => clearTimeout(timer);
            }, []);
            return (
                <div>
                    {isVisible ? <span>{FormatMin(totalTime)}</span> : <span>Loading...</span>}
                    <div className="justify-center items-center">Project Name: {projectTitle}</div>
                </div>
            );
        };


    useEffect(() => {
        if (selectedProject !== null) {
            localStorage.setItem('selectedProject', selectedProject);
        } else {
            localStorage.removeItem('selectedProject');
        }
    }, [selectedProject]);

    useEffect(() => {
        if (selectedProject) {
            const fetchStatistics = async () => {
                try {
                    const response = await fetch(`https://localhost:8000/api/time/project/${selectedProject}`);
                    const data = await response.json();
                    setFetchData(data);
                    console.log("data:",data)
                } catch (error) {
                    console.error('Ошибка загрузки данных:', error);
                }
            };
            fetchStatistics();
        }
    }, [selectedProject]);


        function handleClick() {
            setIsRunning(true);
            setIsActionShow(true);
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
            if (isRunning) {
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

    const handleDelete = async (numberToSave) => {
        setTotalSavedTime(0)
        setElapsedTime(0)
    };

    //Для отрисовки счетчика при запуске//
        const seconds = (elapsedTime % 60);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const hours = Math.floor(elapsedTime / 3600);
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    //

        return (
            <div className="bg-gray-400 h-screen w-screen">
                <Header/>
                <div className="flex flex-col w-screen h-1/2 p-5">
                    <div className="flex flex-col w-screen h-1/2 p-5">
                        {selectedProject === null ? (
                            <div>
                                <h3>Choose a project</h3>
                                <ProjectCombobox onProjectSelect={handleProjectSelect}/>
                            </div>


                        ) : (
                            <>
                            <div className=" flex flex-col items-center justify-center ">
                                <p className='text-gray-900 text-3xl'>{selectedProject ? formattedTime : "Start the timer"}</p>
                                <div className='flex-row space-x-4 p-5'>
                                    <button
                                        className='bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'
                                        onClick={isRunning ? handlePause : handleClick}>
                                        {isRunning ? 'Pause' : (isPaused ? 'Resume' : 'Start')}
                                    </button>

                                    <button onClick={handleSave}
                                            className='group bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'>Save
                                    </button>
                                    <ActionButton/>
                                </div>
                                <div
                                    className='shadow-xl bg-gray-300 h-fit w-fit p-2 flex flex-col items-center justify-center rounded'>
                                    <p className='text-gray-900'>
                                        <LazyLoad/>
                                    </p>
                                    <button
                                        className='group bg-blue-300 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none'
                                        onClick={handleDelete}>Delete
                                    </button>
                                </div>
                            </div>
                            </>
                            )}
                    </div>
                </div>
            </div>
                );
                }

