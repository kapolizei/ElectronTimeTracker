import Header from "./Header";

export default function Statistic() {
    return (
        <>
            <Header/>
            <div className="flex w-screen h-screen bg-gray-300 p-5 flex">

                <div className='w-1/3 h-1/3 bg-gray-400 shadow-xl rounded-lg p-2'>

                    <p className='text-center'>Total Activity</p>

                    <div className="text-blue-50 w-full h-1/3 bg-gray-500 shadow-xl rounded-lg p-2 flex items-stretch">
                        {/* Левый элемент */}
                        <div className="w-1/3 flex justify-center items-center">
                            <h1>TIME</h1><br />
                            <h2>55:02:10</h2>
                        </div>

                        {/* Разделяющая линия */}
                        <div className="w-px bg-gray-300 mx-2"/>

                        {/* Центральный элемент */}
                        <div className="w-1/3 flex justify-center items-center">
                            <h1>AVG ACTIVITY</h1>
                            <h2>50%</h2>
                        </div>

                        {/* Разделяющая линия */}
                        <div className="w-px bg-gray-300 mx-2"/>

                        {/* Правый элемент */}
                        <div className="w-1/3 flex justify-center items-center">
                            <p>ХЗ ЧЕ ТУТ</p>
                        </div>
                    </div>


                </div>
                <p>Statistic</p>
            </div>
        </>

    )
}