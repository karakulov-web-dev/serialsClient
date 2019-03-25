<?php
require_once('../commonPhp/ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

$offset = 0;
if ($body->offset) {
    if (gettype($body->offset) == "integer") {
        $offset = $body->offset;
    }
} 

$reqTools = new ReqTools();
$sql = "SELECT * FROM `updateList` JOIN `seasons` ON `updateList`.idSeasonvar = `seasons`.idSeasonvar LIMIT 50 OFFSET $offset";
$result = $reqTools->reqDb($sql);

echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>