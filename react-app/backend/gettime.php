<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "timetracker";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL-запрос для получения последнего значения
$sql = "SELECT * FROM time_tracking";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Преобразуем результат в массив
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Возвращаем результат в формате JSON
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No data found']);
}

$conn->close();
