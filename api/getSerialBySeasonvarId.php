<?php
require_once('../commonPhp/bdConfig.php');
$mysqli = new mysqli($bdConfig->host, $bdConfig->username, $bdConfig->password, $bdConfig->bdName, $bdConfig->port);
$mysqli->set_charset("utf8");
$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);

get_Season($configReq['id']);

function get_Season($id) {

    if (gettype($id) != 'integer') {
        return false;
    }

    global $mysqli;
    $idString = "$id";
    $sql = "SELECT * FROM `serials` WHERE `seasonListIdJson` LIKE '%$idString%' ";
    
    $res = $mysqli->query($sql);
    $row = $res->fetch_assoc();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
}
?>