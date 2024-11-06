import React, {useEffect, useState} from "react";
import {easyFormatTotalTime, formatTotalTime} from "./FormatTotalTime";

export default function StatisticDataPage ({ fetchData }) {
    const [dataHours, setDataHours] = useState(0)
    const [apiData, setApiData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const formattedTime = formatTotalTime(dataHours)
    const [showTasks, setShowTasks] = useState(false);

    if (!fetchData || Object.keys(fetchData).length === 0) {
        return <p>Loading...</p>;
    }

    const projectKey = Object.keys(fetchData)[1];
    const projectInfo = fetchData[projectKey] || {};
    const projectTitle = projectInfo["project title"] || "No project title available";

    const totalTime = fetchData["TotalTime"] || 0;
    const tasks = projectInfo["tasks"] || [];
    const easyFormattedTime = easyFormatTotalTime(totalTime)



    /*useEffect(() => {
        const getOldTime = async () => {
            try {
                console.log('Getting time data');
                const response = await axios.get('http://localhost:8000/gettime.php');
                console.log("Response:", response.data);
                if (response.data) {
                    const totalTime = response.data[0].hours_worked;
                    setDataHours(totalTime);
                    setApiData(response.data)
                } else {
                    console.error('No data found in response');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getOldTime();
    }, []);
*/

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

    const hourstatistic = [
        {date: "Sep 01", value: 2},
        {date: "Sep 02", value: 4},
    ];

    const handleShowTasks = () => {
        setShowTasks(!showTasks);
    }

    return (
        <div>

            <h1 className="text-2xl font-bold p-5">Activity reports</h1>
            <div className="text-blue-50 w-full h-1/3  rounded-lg p-2 flex items-stretch border-2 min-w-max">
                {/* Левый элемент */}
                <div className="w-1/3 flex justify-center items-center text-green-500 ">
                    <h1>TIME: {easyFormattedTime}</h1><br/>
                </div>

                {/* Разделяющая линия */}
                <div className="w-px bg-gray-300 mx-2"/>

                {/* Центральный элемент */}
                <div className="w-1/3 flex justify-center items-center text-green-500">
                    <h1>AVG ACTIVITY 55%</h1>
                </div>

                {/* Разделяющая линия */}
                <div className="w-px bg-gray-300 mx-2"/>

                {/* Правый элемент */}
                <div className="w-1/3 flex justify-center items-center text-green-500">
                    <p>///</p>
                </div>
            </div>

            <div className="flex flex-col items-center p-5 w-full">
                <h1 className="text-2xl font-bold mb-5">Activity of the project '{projectTitle}'</h1>
                <div className="w-full overflow-x-auto">
                    <div
                        className="flex justify-between items-end border-b-2 border-gray-300 h-52"
                        style={{minWidth: "1000px"}}
                    >
                        {hourstatistic.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center mx-2"
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
                                    className="bg-blue-500 w-4 rounded-2xl hover:bg-blue-600 transition-all duration-200"
                                    style={{height: `${item.value * 10}px`}}
                                ></div>

                                {/* Подпись под столбцом */}
                                <span className="mt-1 text-xs">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-5">
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
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
                            <tr className="bg-gray-100 rounded-2xl">
                                <td colSpan="8" className="px-4 py-2 font-semibold">
                                    {day.date}
                                </td>
                            </tr>
                            <tr>{projectTitle ? (
                                <td className="px-4 py-2 text-left">{projectTitle}</td>
                            ) : (
                                <td className="px-4 py-2 text-left">No project title found.</td>
                            )}
                                <td className="px-4 py-2"></td>
                                <td className="px-4 py-2"></td>
                                <td className="px-4 py-2">{easyFormattedTime}</td>
                                <td className="px-4 py-2">{day.total.activity}</td>
                                <button onClick={handleShowTasks} className="bg-blue-400 px-4 py-2">{showTasks ? 'Hide Tasks' : 'Show Tasks'}</button>

                                {showTasks && (
                                    <ul>
                                        {tasks.map((task) => (
                                            <li key={task.id}>id:{task.id} | title:{task.title}</li>
                                        ))}
                                    </ul>
                                )}
                            </tr>
                            {day.entries.map((entry, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{entry.project}</td>
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