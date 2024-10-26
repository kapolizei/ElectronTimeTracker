import {useState} from 'react'
import Header from "./Header";
import ProjectStatistic from "./ProjectStatistic";

export default function Statistic() {

    const hourstatistic = [
        { date: "Sep 01", value: 2 },
        { date: "Sep 02", value: 4 },
        { date: "Sep 03", value: 6 },
        { date: "Sep 04", value: 8 },
        { date: "Sep 05", value: 10 },
        { date: "Sep 06", value: 1 },
        { date: "Sep 07", value: 5 },
        { date: "Sep 08", value: 7 },
        { date: "Sep 09", value: 9 },
        { date: "Sep 10", value: 10 },
        { date: "Sep 11", value: 4 },
        { date: "Sep 12", value: 3 },
        { date: "Sep 13", value: 6 },
        { date: "Sep 14", value: 8 },
    ];

    const [activeIndex, setActiveIndex] = useState(null);


    return (
        <>
            <Header/>
            <div className="flex flex-col w-screen h-1/2 p-5">
                <h1 className="text-2xl font-bold p-5">Activity reports</h1>
                <div className="text-blue-50 w-full h-1/3  rounded-lg p-2 flex items-stretch border-2 min-w-max">
                    {/* Левый элемент */}
                    <div className="w-1/3 flex justify-center items-center text-green-500 ">
                        <h1>TIME</h1><br/>
                        <h2>///</h2>
                    </div>

                    {/* Разделяющая линия */}
                    <div className="w-px bg-gray-300 mx-2"/>

                    {/* Центральный элемент */}
                    <div className="w-1/3 flex justify-center items-center text-green-500">
                        <h1>AVG ACTIVITY</h1>
                        <h2>///</h2>
                    </div>

                    {/* Разделяющая линия */}
                    <div className="w-px bg-gray-300 mx-2"/>

                    {/* Правый элемент */}
                    <div className="w-1/3 flex justify-center items-center text-green-500">
                        <p>///</p>
                    </div>
                </div>

                <div className="flex flex-col items-center p-5 w-full">
                    <h1 className="text-2xl font-bold mb-5">Activity</h1>
                    <div className="w-full overflow-x-auto">
                        <div
                            className="flex justify-between items-end border-b-2 border-gray-300 h-52"
                            style={{ minWidth: "1000px" }}
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
                                        <div className="absolute bottom-full mb-1 px-2 py-1 bg-gray-700 text-white text-xs rounded-md">
                                            {item.value}
                                        </div>
                                    )}

                                    {/* Столбец графика */}
                                    <div
                                        className="bg-blue-500 w-4 rounded-2xl hover:bg-blue-600 transition-all duration-200"
                                        style={{ height: `${item.value * 10}px` }}
                                    ></div>

                                    {/* Подпись под столбцом */}
                                    <span className="mt-1 text-xs">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <ProjectStatistic/  >

                </div>
            </>

            )
            }