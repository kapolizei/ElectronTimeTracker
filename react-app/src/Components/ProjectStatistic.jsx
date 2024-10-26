
const ProjectStatistic = () => {
    const data = [
        {
            date: "Sun, Sep 1, 2024",
            total: { time: "1:30:35", activity: "53%"},
            entries: [
                { member: "Ivan Kolesnicenko", project: "Timer", time: "1:30:35", activity: "53%"},
            ],
        },
        {
            date: "Mon, Sep 2, 2024",
            total: { time: "2:27:21", activity: "59%"},
            entries: [
                { member: "Ivan Kolesnicenko", project: "Timer", time: "1:30:35", activity: "53%"},
            ],
        },
    ];

    return (
        <div className="container mx-auto p-5">
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Project</th>
                    <th className="px-4 py-2 text-left">Member</th>
                    <th className="px-4 py-2 text-left">To-do</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Activity</th>
                    <th className="px-4 py-2 text-left">Notes</th>
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
                        <tr>
                            <td className="px-4 py-2 text-left">TOTAL</td>
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2">{day.total.time}</td>
                            <td className="px-4 py-2">{day.total.activity}</td>
                            <td className="px-4 py-2"></td>
                        </tr>
                        {day.entries.map((entry, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-4 py-2">{entry.project}</td>
                                <td className="px-4 py-2 flex items-center">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-2">
                                        P
                                    </div>
                                    {entry.member}
                                </td>
                                <td className="px-4 py-2">-</td>
                                <td className="px-4 py-2">{entry.time}</td>
                                <td className="px-4 py-2">{entry.activity}</td>
                                <td className="px-4 py-2">-</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectStatistic;
