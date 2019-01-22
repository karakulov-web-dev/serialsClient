<?php
include 'Req.php';

$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);

$req = new Req($configReq);
$req->send();

echo json_encode($req->result,JSON_UNESCAPED_UNICODE);
?>