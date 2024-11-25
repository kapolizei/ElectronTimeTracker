import React, {useEffect, useState} from "react";
import {format} from "./Functions/FormatTotalTime";
import LoadingOverlay from "./LoadingOverlay";
import {useSelector} from "react-redux";

 export const LazyLoad = () => {
    const data = useSelector((state)=> state)
    const totalTime = data?.total_time || 0;
    const projectTitle = data?.project_title || "Loading...";
    const projectUser = data?.user || "Loading...";
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className=''>
            {isVisible ? <span>{format(totalTime)}</span> :<LoadingOverlay/>}
            <div className="justify-center items-center">Project Name: {projectTitle}</div>
            <div className="justify-center items-center">{projectUser}</div>
        </div>
    );
};
