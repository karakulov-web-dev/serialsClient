<?php
require_once('ReqTools.php');

$content = trim(file_get_contents("php://input"));
$body = json_decode($content);

$offset = 0;
if ($body->offset) {
    if (gettype($body->offset) == "integer") {
        $offset = $body->offset;
    }
} 

$genreArr = array();
if (gettype($body->genre) == 'array') {
    foreach ($body->genre as $item) {
        $genreArr[] = $mysqli->real_escape_string($item);
    }
}
$genre = implode(" AND ",$genreArr);

if ($genre) {
    $where = "WHERE $genre";
} else {
    $where = "";
}

$reqTools = new ReqTools();
$sql = "SELECT * FROM `serials` JOIN `genre` ON `serials`.genreHash = `genre`.genreHash $where ORDER BY kinopoisk DESC LIMIT 50 OFFSET $offset";
$result = $reqTools->reqDb($sql);

echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>