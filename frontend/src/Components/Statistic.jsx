import React, {useEffect, useState} from 'react'
import Header from "./Header";
import axios from 'axios';
import {formatTotalTime, easyFormatTotalTime} from "./FormatTotalTime";
import ProjectCombobox from "./ProjectCombobox";
import StatisticDataPage from "./StatisticDataPage";

export default function Statistic() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [fetchData, setFetchData] = useState([])
    const handleProjectSelect = (projectId) => {
        setSelectedProject(projectId);
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




    return (
        <>
            <Header/>

            <div className="flex flex-col w-screen h-1/2 p-5">
                {selectedProject === null ? (
                    <div>
                        <h3>Choose a project</h3>
                        <ProjectCombobox onProjectSelect={handleProjectSelect}/>
                    </div>
                ) : (
                    <>
                        {fetchData ? (
                            <StatisticDataPage fetchData={fetchData} />
                        ) : (
                            <p>Loading project data...</p>
                        )}                    </>
                )}
            </div>
        </>
    );
}