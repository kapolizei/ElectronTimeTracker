import React, {useState} from "react";
import {easyFormatTotalTime, FormatMin, formatTotalTime} from "./FormatTotalTime";

export default function StatisticDataPage ({ fetchData, onProjectSelect }) {
    const [apiData, setApiData] = useState([]);
    const [showTasks, setShowTasks] = useState(false);
    const wod = String(fetchData?.total_time || '');
    const regExp = 'минут'
    const totalTime = wod.replace(regExp, '');
    const tasks = fetchData.projectData?.tasks || [];
    const easyFormattedTime = FormatMin(totalTime)
    const [activeIndex, setActiveIndex] = useState(null);
    const projectTitle = fetchData.project_title || 'No project title available'


    const data = [
        {
            date: apiData.length > 0 ? apiData[0].date : "",
            total: {time: "1:30:35", activity: "-"},
            entries: [
                {
                    member: "Ivan Kolesnicenko",
                    project: apiData.length > 0 ? apiData[0].description : "",
                    time: "1:30:35",
                    activity: "-"
                },
            ],
        },
    ];

    const hoursStatisticDate = fetchData.time_data
    console.log(hoursStatisticDate)
    const hoursStatistic = [
        {date: "Sep 01", value: 2},
        {date: "Sep 02", value: 4},
    ];

    const handleShowTasks = () => {
        setShowTasks(!showTasks);
    }

    return (
        <div className="rounded-md ">
            <h1 className="text-white text-2xl font-bold p-5">Activity reports</h1>
            <div className="text-blue-50 w-full h-1/3  rounded-lg p-2 flex items-stretch  min-w-max">
                <div className="w-1/3 flex justify-center items-center text-white bg-gray-700 shadow-2xl">
                    <h1>TIME: {easyFormattedTime}</h1><br/>
                </div>

                <div className="w-px  mx-2"/>

                <div className="w-1/3 flex justify-center items-center text-white bg-gray-700 shadow-2xl">
                    <h1>AVG ACTIVITY 55%</h1>
                </div>

                <div className=" bg-gray-300 mx-2"/>

                <div className="w-1/3 flex justify-center items-center text-white bg-gray-700 shadow-2xl">
                    <p>///</p>
                </div>
            </div>

            <div className="flex flex-col items-center p-5 w-full bg-gray-700">
                <h1 className="text-white text-2xl font-bold mb-5">Activity of the project '{projectTitle}'</h1>
                <div className="w-full overflow-x-auto">
                    <div
                        className="flex justify-between items-end border-b-2 border-gray-300 h-52"
                        style={{minWidth: "1000px"}}
                    >
                        {hoursStatistic.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center mx-2 text-white"
                                // Устанавливаем активный индекс при наведении
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {/* Подсказка */}
                                {activeIndex === index && (
                                    <div
                                        className="absolute bottom-full mb-1 px-2 py-1 bg-gray-700 text-white text-xs rounded-md">
                                        {item.value}
                                    </div>
                                )}

                                {/* Столбец графика */}
                                <div
                                    className="bg-blue-200 w-4 rounded-2xl hover:bg-blue-600 transition-all duration-200"
                                    style={{height: `${item.value * 10}px`}}
                                ></div>

                                {/* Подпись под столбцом */}
                                <span className="mt-1 text-xs">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-5 bg-gray-700 shadow-2xl">
                <table className="w-full table-auto border-collapse ">
                    <thead>
                    <tr className="text-white border-2 border-gray-600 ">
                        <th className="px-4 py-2 text-left">Project</th>
                        <th className="px-4 py-2 text-left">Member</th>
                        <th className="px-4 py-2 text-left">To-do</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Activity</th>
                        <th className="px-4 py-2 text-left">Tasks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((day, index) => (
                        <React.Fragment key={index}>
                            <tr className=" rounded-2xl">
                                <td colSpan="8" className="px-4 py-2 font-semibold">
                                    {day.date}
                                </td>
                            </tr>
                            <tr>{projectTitle ? (
                                <td className="px-4 py-2 text-left text-white">{projectTitle}</td>
                            ) : (
                                <td className="px-4 py-2 text-left text-white">No project title found.</td>
                            )}
                                <td className="px-4 py-2 text-white"></td>
                                <td className="px-4 py-2 text-white"></td>
                                <td className="px-4 py-2 text-white">{easyFormattedTime}</td>
                                <td className="px-4 py-2 text-white">{day.total.activity}</td>
                                <button onClick={handleShowTasks} className="bg-blue-400 px-4 py-2 my-2 rounded-xl">{showTasks ? 'Hide Tasks' : 'Show Tasks'}</button>

                                {showTasks && tasks.length > 0 ? (
                                    <ul>
                                        {tasks.map((task) => (
                                            <li className="text-white" key={task.id}>
                                                id: {task.id} | title: {task.title}
                                            </li>
                                        ))}
                                    </ul>
                                ) : showTasks && <p className="text-white">No tasks available.</p>}
                            </tr>

                            {day.entries.map((entry, i) => (
                                <tr key={i} className="border-t text-white">
                                    <td className="px-4 py-2 ">{entry.project}</td>
                                    <td className="px-4 py-2 flex items-center">
                                        <div
                                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-2">
                                            P
                                        </div>
                                        {entry.member}
                                    </td>
                                    <td className="px-4 py-2">-</td>
                                    <td className="px-4 py-2">{easyFormattedTime}</td>
                                    <td className="px-4 py-2">{entry.activity}</td>
                                    <td className="px-4 py-2">-</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}