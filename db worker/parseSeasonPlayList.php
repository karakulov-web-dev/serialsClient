<?php
//include 'SeasonPlayList.php';

$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
$mysqli->set_charset("utf8");




function pushDb($value) {
    //$seasonPlayList = new SeasonPlayList($value);
    //$seasonPlayList->sendDb();

    global $mysqli;

    print_r($value);

    $idSeasonvar = $value->id;
    $country = json_encode($value->country,JSON_UNESCAPED_UNICODE);
    $genre = json_encode($value->genre,JSON_UNESCAPED_UNICODE);
    $playlist = json_encode($value->playlist,JSON_UNESCAPED_UNICODE);

    $part1 = "INSERT INTO `seasonAll` ";
    $part2 = "(`idSeasonvar`, `country`, `description`, `name`, `playlist`, `poster`, `poster_small`, `season_number`, `year`) ";
    $part3 = 'VALUES ';
    $part4 = " ('{$idSeasonvar}','{$country}','{$value->description}','{$value->name}','{$playlist}','{$value->poster}','{$value->poster_small}','{$value->season_number}','{$value->year}')";
    $sql = $part1 . $part2 . $part3 . $part4;
    $mysqli->query($sql);
    echo $sql;
};


for($i=0;$i<17999;$i++) {
    

$sql = 'SELECT * FROM `seasonsAll` LIMIT 1 OFFSET ' . $i;
$res = $mysqli->query($sql);
if ($res) {
    $row = $res->fetch_assoc();
} else {
    continue;
}

$idSeasonvar = $row['idSeasonvar'];

    $postdata = http_build_query(
        array(
            'key' => '032a4972',
            'command' => 'getSeason',
            'season_id' => $idSeasonvar
        )
    );
    
    $opts = array(
        'http' =>
            array(
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n", 
                "Content-Length: ".strlen($postdata)."\r\n".
                "User-Agent:MyAgent/1.0\r\n",
                'method' => 'POST',
                'content' => $postdata
            )
    );
    
    $context  = stream_context_create($opts);
    $data = json_decode(file_get_contents('http://api.seasonvar.ru/', false, $context));
    pushDb($data);

}

?>

