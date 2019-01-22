<?php
include 'Serial.php';

$data = file_get_contents('part4.json');
$data = json_decode($data);

foreach ($data as $value) {
    $serial = new Serial($value);
    $serial->sendDb();
}
?>
