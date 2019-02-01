<?php
require_once('ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

$newIdArr = array();
if (gettype($body->idArr) == 'array') {
    foreach ($body->idArr as $item) {
        $item = (int)$item;
        if (gettype($item) == 'integer') {
            $newIdArr[] = $item;
        }
    }
}
$idString = implode(' OR idSeasonvar = ',$newIdArr);

$reqTools = new ReqTools();
$sql = "SELECT * FROM `seasons` WHERE idSeasonvar = {$idString}";
$result = $reqTools->reqDb($sql);

echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>