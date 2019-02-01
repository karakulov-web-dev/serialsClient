<?php
$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
$mysqli->set_charset("utf8");
$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);

get_Season($configReq['id']);

function get_Season($id) {

    if (gettype($id) != 'integer') {
        return false;
    }

    global $mysqli;
    $sql = "SELECT *
    FROM `seasons`
    JOIN `playList` ON `seasons`.idSeasonvar = `playList`.idSeasonvar
    WHERE `seasons`.idSeasonvar = {$id}
    LIMIT 1";
    $res = $mysqli->query($sql);
    $row = $res->fetch_assoc();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
}
?>