<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "timetracker";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
var_dump($_POST);
echo "as";
$json = file_get_contents('php://input');
$data = json_decode($json, true);
var_dump($data);


$time = $data['hours_worked'];
$sql = "UPDATE time_tracking SET hours_worked = $time";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}


$conn->close();