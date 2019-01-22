<?php
include 'Season.php';

$data = file_get_contents('part4.json');
$data = json_decode($data);

foreach ($data as $value) {
    foreach ($value as $item) {
        $season = new Season($item);
        $season->sendDb();
    }
}
?>
