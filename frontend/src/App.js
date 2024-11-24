import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Test from "./Components/dev/Test";
import StatChooseProject from "./Components/Statistic/StatChooseProject";
import SelectProject from "./Components/SelectProject";
import Registration from "./Components/Registration";
import Account from "./Components/dev/Account";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './state/store.jsx';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<MainPage />} />
                        <Route path="/statistic" element={<StatChooseProject />} />
                        <Route path="/screen" element={<Test />} />
                        <Route path="/api" element={<SelectProject />} />
                        <Route path="/reg" element={<Registration />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
