import React, {useEffect, useState} from 'react'
import Header from "./Header";
import SelectProject from "./SelectProject";
import StatisticDataPage from "./StatisticDataPage";

export default function StatisticPage() {
    const [fetchData, setFetchData] = useState([])

    //LocalStorage Project
    const [selectedProject, setSelectedProject] = useState(() => {
        return localStorage.getItem('selectedProject') || null;
    });
    const handleProjectSelect = (projectId) => {
        setSelectedProject(projectId);
        localStorage.setItem("selectedProject", projectId)
        console.log("selected", selectedProject, projectId)
    };

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

    return (
        <>
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center pt-20">
                <header className="fixed top-0 left-0 w-full shadow-lg py-4 z-10 text-center text-white">
                    <Header/>
                </header>

                <div className="flex flex-col w-screen h-screen p-5">
                    {selectedProject === null ? (
                        <div>
                            <h3>Choose a project</h3>
                            <SelectProject onProjectSelect={handleProjectSelect}/>
                        </div>
                    ) : (
                        <>
                            {fetchData ? (
                                <StatisticDataPage fetchData={fetchData}/>
                            ) : (
                                <p>Loading project data...</p>
                            )}                    </>
                    )}
                </div>
            </div>
            </>
            );
            }