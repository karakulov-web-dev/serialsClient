<?php
$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
$mysqli->set_charset("utf8");

$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);
get_Season($configReq['season']);
function get_Season($id) {
    global $mysqli;
    $sql = "SELECT * FROM `seasonAll` WHERE idSeasonvar={$id}";
    $res = $mysqli->query($sql);
    $row = $res->fetch_assoc();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
}
?>