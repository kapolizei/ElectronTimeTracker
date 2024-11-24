import '../App.css';
import {NavLink} from "react-router-dom";
/*
import AccountButton from "./AccountButton";
*/

export default function Header() {
    return (
        <header className="bg-opacity-25 backdrop-blur p-4 sticky top-0 z-50 ">
            <div className=" mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <a href="/">TimeTracker</a>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink className="text-white hover:text-blue-500 transition-all"
                                     to={'/statistic'}>Statistic</NavLink>
                        </li>

                        <li>
                            <NavLink className="text-white hover:text-blue-500 transition-all" to={'/screen'}>Screenshot
                                test</NavLink>
                        </li>

                        <li>
                            <NavLink className="text-white hover:text-blue-500 transition-all"
                                     to={'/reg'}>Registration</NavLink>
                        </li>

                        <li>
                            <NavLink className="text-white hover:text-blue-500 transition-all"
                                     to={'/account'}>
{/*
                                <AccountButton/>
*/}
                            </NavLink>
                        </li>
                        <li>
                            <a href="#" className="text-gray-600 transition-all disabled pointer-events-none">Services</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-600 disabled pointer-events-none">Contact</a>
                        </li>
                    </ul>


                </nav>
            </div>
        </header>
    );
}
