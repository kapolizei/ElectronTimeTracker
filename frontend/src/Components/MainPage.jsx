import React, { useEffect, useState } from "react";
import '../App.css';
import Header from "./Header";
import axios from 'axios';
import ActionButton from "./ActionButton";
import ProjectCombobox from "./ProjectCombobox";
import {easyFormatTotalTime, formatTotalTime} from "./FormatTotalTime";


export default function MainPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [actionShow, setIsActionShow] = useState(false);
    const [totalSavedTime, setTotalSavedTime] = useState(0); // Состояние для общего времени

    const [items, setItems] = useState([]);

    const [endTime, setEndTime] = useState("")
    const [startTime, setStartTime] = useState("")
    const [selectedProject, setSelectedProject] = useState(null)
    const [fetchData, setFetchData] = useState([])
    const totalTime = fetchData["TotalTime"] || 0;

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
                    {isVisible ? <p>{formatTotalTime(totalTime)}</p> : <p>Loading...</p>}
                </div>
            );
        };

    const handleProjectSelect = (projectId) => {
        setSelectedProject(projectId);
        console.log("selected", selectedProject)
    };


    useEffect(() => {
        if (selectedProject) {
            const fetchStatistics = async () => {
                try {
                    const response = await fetch(`https://localhost:8000/api/project/${selectedProject}/statistic`);
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

        /*useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log("Fetching data");
                    const response = await axios.get('http://localhost:8000/gettime.php');
                    console.log("Response:", response.data);

                    if (response.data) {
                        const fetchedItems = response.data.savedItems || [];
                        const fetchedTotalTime = Number(response.data[0].hours_worked) || 0;


                        console.log("Fetched Total Time:", fetchedTotalTime); // Для отладки
                        setApiData(response.data);
                        setItems(fetchedItems);
                        setTotalSavedTime(fetchedTotalTime);
                    } else {
                        console.error('No data found in response');
                        setItems([]);
                    }
                } catch (error) {
                    console.error('Error fetching data from server:', error);
                    setItems([]);
                }
            };

            fetchData();
        }, []);*/


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
                console.log('Timer End At:',now)

                const startedAt = startTime.toISOString().slice(0, 19).replace('T', ' ');
                const endAt = now.toISOString().slice(0, 19).replace('T', ' ');
                saveToDatabase(startedAt, endAt, elapsedTime);

                setStartTime(null)
                setEndTime(null)
                setElapsedTime(0)
                setTimerId(null)
            }
        }

    const saveToDatabase = (startedAt, endAt, elapsedSeconds) => {
        console.log("Сохраняем в БД:", { startedAt, endAt, elapsedSeconds });


        fetch('/api/save_time_entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                started_at: startedAt,
                end_at: endAt,
/*
                elapsed_seconds: elapsedSeconds,
*/
                user_id: 1,
/*
                task_id: 1,
*/
/*
                project_id: {projectId}
*/
            })
        })
            .then(response => response.json())
            .then(data => console.log("Ответ сервера:", data))
            .catch(error => console.error("Ошибка сохранения:", error));
    };

        /*const handleSave = async () => {
            if (isRunning || isPaused) {
                const savedTimeInSeconds = elapsedTime;
                const newTotalSavedTime = totalSavedTime + savedTimeInSeconds;
                setTotalSavedTime(newTotalSavedTime);

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
                setElapsedTime(0);
                clearInterval(timerId);
                setIsRunning(false);

                const numberToSave = formattedTime;

                try {
                    // Отправляем данные на сервер с использованием axios
                    const response = await axios.post("http://localhost:8000/settotaltime.php", {
                        number: numberToSave
                    });
                    if (response.data && response.data.message) {
                        console.log(response.data.message); // Успешное сообщение
                    }
                    setItems(prevItems => [...prevItems, formattedTime]);
                } catch (error) {
                    console.error("Ошибка при сохранении данных:", error);
                }
            }
        };*/


    const handleDelete = async (numberToSave) => {
        setTotalSavedTime(0)
        setElapsedTime(0)
    };

    // Функция для форматирования общего времени
    /*const formatTotalTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours} hours ${minutes} minutes ${seconds} seconds`;
    };*/



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

