import {useSelector} from "react-redux";
import {easyFormatTotalTime, FormatMin} from "../Functions/FormatTotalTime";



export default function StatActivity() {
    //Redux State
    const total_time = useSelector(state => state.total_time)

    const stats = [
        { name: 'Total Time', stat: total_time },
        { name: 'Avg. Open Rate', stat: '58.16%' },
        { name: 'Avg. Click Rate', stat: '24.57%' },
    ]

    return (
        <div className='p-3'>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
