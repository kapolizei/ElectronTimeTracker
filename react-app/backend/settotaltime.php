<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "timetracker";
$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

if ($conn) {
    echo "Connected successfully";

} else {
    echo "Connection failed";
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);
$number = $data['number'];

if (isset($data['number'])) {
    $sql = "SELECT hours_worked FROM time_tracking LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $currentValue = isset($row['hours_worked']) ? (int)$row['hours_worked'] : 0;

        $newValue = $currentValue + (int)$number; // Приводим к целому типу

        $updateSql = "UPDATE time_tracking SET hours_worked = '$newValue'";
        try {
            mysqli_query($conn, $updateSql);
            echo "Record updated successfully with new value = $newValue";
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    } else {
        echo "Error fetching current value: " . mysqli_error($conn);
    }
}


