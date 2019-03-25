<?php
require_once('../commonPhp/ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

if (gettype($body->userMac) == 'string') {
    $userMac = $mysqli->real_escape_string($body->userMac);
} else {
    $error = 'Req typeError';
}

if ($error) {
    echo "{\"error\":\"{$error}\"}";
}

if (!$error) {
    $reqTools = new ReqTools();
    $sql = "SELECT * 
    FROM  `history` 
    JOIN  `seasons` ON  `history`.seasonId =  `seasons`.idSeasonvar
    WHERE userMac =  '$userMac' ORDER BY time DESC ";
    $result = $reqTools->reqDb($sql);
    echo json_encode($result,JSON_UNESCAPED_UNICODE);
}

?>