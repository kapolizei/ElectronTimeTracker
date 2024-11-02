import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Test from "./Components/Test";
import Statistic from "./Components/Statistic";
import NameChange from "./Components/NameChange";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/statistic" element={<Statistic />} />
                    <Route path="/screen" element={<Test />} />
                </Routes>
            </HashRouter>

        </div>
    );
}

export default App;
