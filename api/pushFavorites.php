<?php
require_once('ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

if (gettype($body->serialId) == "integer") {
    $serialId = $body->serialId;
} else {
    $error = 'Req typeError';
}

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
    $sql = "SELECT COUNT(*) FROM `favorites` WHERE userMac='$userMac'";
    $result = $reqTools->reqDb($sql);
    $count = $result[0]['COUNT(*)'];
    if ($count > 4) {
        $dif = $count - 4;
    } else {
        $dif = 0;
    }

    if ($dif) {
        $sql = "DELETE FROM `favorites` WHERE userMac='$userMac' LIMIT $dif";
        $reqTools->reqDb($sql);
    }

    $sql = "INSERT INTO `favorites`(`userMac`, `serialId`) VALUES ('$userMac',$serialId)";
    $reqTools->reqDb($sql);
}

?>