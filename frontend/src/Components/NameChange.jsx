import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("https://localhost:8000/api/user/1"); // замените на ваш URL
            setUser(response.data.user); // Сохраните пользователя в состояние
            setLoading(false); // Установите loading в false после загрузки данных
        };

        fetchUser();
    }, []);

    // Обработка состояния загрузки
    if (loading) return <div>Loading...</div>;

    // Если данные пользователя еще не загружены
    if (!user) return null;

    // Отображение данных пользователя
    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.id}</p> {/* Отображаем ID пользователя */}
            <p><strong>Login:</strong> {user.login}</p> {/* Отображаем логин */}
            <p><strong>Email:</strong> {user.email}</p> {/* Отображаем email */}
        </div>
    );
}
