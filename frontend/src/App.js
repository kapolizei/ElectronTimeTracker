import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Test from "./Components/Test";
import StatisticPage from "./Components/StatisticPage";
import NameChange from "./Components/dev/NameChange";
import SelectProject from "./Components/SelectProject";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/statistic" element={<StatisticPage />} />
                    <Route path="/screen" element={<Test />} />
                    <Route path="/api" element={<SelectProject />} />
                </Routes>
            </HashRouter>

        </div>
    );
}

export default App;
