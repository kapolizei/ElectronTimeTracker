import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from "./Components/MainPage";
import Test from "./Components/dev/Test";
import StatisticPage from "./Components/StatisticPage";
import SelectProject from "./Components/SelectProject";
import Registration from "./Components/Registration";
import Account from "./Components/dev/Account";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route path="/statistic" element={<StatisticPage />} />
                    <Route path="/screen" element={<Test />} />
                    <Route path="/api" element={<SelectProject />} />
                    <Route path="/reg" element={<Registration />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
