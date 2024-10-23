
import './App.css';
import {HashRouter, Routes, Route, NavLink} from "react-router-dom";
import MainPage from "./Components/MainPage";
import About from "./Components/About";
import Test from "./Components/Test";
import Statistic from "./Components/Statistic";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
          <Routes>
            <Route path="/" exact element={<MainPage/>}/>
            <Route path="/statistic" exact element={<Statistic/>}/>
            <Route path="/screen" exact element={<Test/>}/>
          </Routes>
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
