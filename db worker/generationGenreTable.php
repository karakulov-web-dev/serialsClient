<?php
include 'Genre.php';

for ($i = 1; $i <= 11934; $i++) {
    $genre = new Genre($i);
    $genre->sendDb();
}
?>
