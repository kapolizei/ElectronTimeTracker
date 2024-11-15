// src/Components/ScreenshotButton.jsx
import React, { useEffect, useState } from 'react';
import Header from "./Header";

const Test = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Проверяем, доступен ли window.electron
        if (typeof window.electron === 'undefined') {
            console.error("window.electron is not defined");
            setMessage("Ошибка: window.electron не доступен.");
            return;
        }

        // Обработчик успешного скриншота
        window.electron.onScreenshotSuccess((path) => {
            setMessage(`Скриншот сохранен в: ${path}`);
        });

        // Обработчик ошибки
        window.electron.onScreenshotError((error) => {
            setMessage(`Ошибка: ${error}`);
        });

        // Чистим обработчики при размонтировании компонента
        return () => {
            window.electron.onScreenshotSuccess(() => {});
            window.electron.onScreenshotError(() => {});
        };
    }, []);

    const handleTakeScreenshot = () => {
        if (window.electron) {
            setMessage("Создание скриншота...");
            window.electron.takeScreenshot();
        } else {
            console.error("window.electron не доступен");
            setMessage("Ошибка: window.electron не доступен.");
        }
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-lg py-4 z-10 text-center text-white">
                <Header/>
            </header>
            <div className='pt-28'>

                <button onClick={handleTakeScreenshot}>Сделать скриншот</button>
                <div>{message}</div>
            </div>
        </>

    )
        ;
};

export default Test;
