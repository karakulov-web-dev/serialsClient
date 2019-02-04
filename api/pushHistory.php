<?php
require_once('ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

if (gettype($body->time) == "double") {
    $time = $body->time;
} else {
    $error = 'Req typeError';
}

if (gettype($body->seriesName) == "string") {
    $seriesName = $mysqli->real_escape_string($body->seriesName);
} else {
    $error = 'Req typeError';
}

if (gettype($body->seasonId) == "integer") {
    $seasonId = $body->seasonId;
} else {
    $error = 'Req typeError';
}

if (gettype($body->userMac) == 'string') {
    $userMac = $mysqli->real_escape_string($body->userMac);
} else {
    $error = 'Req typeError';
}

if ($error) {
    echo "{error:$error}";
}

if (!$error) {
    $reqTools = new ReqTools();
    $sql = "SELECT COUNT(*) FROM `history` WHERE userMac='$userMac'";
    $result = $reqTools->reqDb($sql);
    $count = $result[0]['COUNT(*)'];
    if ($count > 4) {
        $dif = $count - 4;
    } else {
        $dif = 0;
    }

    if ($dif) {
        $sql = "DELETE FROM `history` WHERE userMac='$userMac' ORDER BY time ASC LIMIT $dif";
        $reqTools->reqDb($sql);
    }
    $sql = "INSERT INTO `history`(`userMac`, `time`, `seriesName`, `seasonId`) VALUES ('$userMac',$time,'$seriesName',$seasonId)";
    $reqTools->reqDb($sql);
    
   // echo json_encode($result,JSON_UNESCAPED_UNICODE);
}

?>