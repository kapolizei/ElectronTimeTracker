import '../App.css';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gray-600 p-4 shadow-lg sticky top-0 z-50 h-full w-full">
            <div className=" mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <a href="#">TimeTracker</a>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink className="text-white hover:text-gray-300" to={'/statistic'}>Statistic</NavLink>
                        </li>
                        <li>
                            <NavLink className="text-white hover:text-gray-300" to={'/screen'}>Test</NavLink>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">Services</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
