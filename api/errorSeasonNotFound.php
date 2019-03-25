<?php
require_once('../commonPhp/bdConfig.php');
$mysqli = new mysqli($bdConfig->host, $bdConfig->username, $bdConfig->password, $bdConfig->bdName, $bdConfig->port);
$mysqli->set_charset("utf8");
$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);
require_once('../commonPhp/ReqTools.php');

$reqTools = new ReqTools();

seasonPlayListUpdateDb($configReq['id']);
errorUrlNotFound($configReq['id']);

function errorUrlNotFound($id)
{
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
    echo json_encode($row, JSON_UNESCAPED_UNICODE);
}
function seasonPlayListUpdateDb($id)
{
    global $reqTools;
    $bodyReq = array(
        'key' => '033238e5',
        'command' => 'getSeason',
        'season_id' => $id
    );
    $result = $reqTools->reqPostHttp('http://api.seasonvar.ru/', $bodyReq);


    $playlist = json_encode($result->playlist, JSON_UNESCAPED_UNICODE);
    $idSeasonvar = $id;

    $sql = "DELETE FROM `playList` WHERE idSeasonvar={$id}";
    $reqTools->reqDb($sql);


    $part1 = "INSERT INTO `playList` ";
    $part2 = "(`idSeasonvar`,`playlist`) ";
    $part3 = 'VALUES ';
    $part4 = " ('{$idSeasonvar}','{$playlist}')";
    $sql = $part1 . $part2 . $part3 . $part4;
    $reqTools->reqDb($sql);
}
 