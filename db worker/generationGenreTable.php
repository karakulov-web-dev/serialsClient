<?php
include 'Genre.php';

for ($i = 1; $i <= 5001; $i++) {
    $genre = new Genre($i);
    $genre->sendDb();
}
?>
