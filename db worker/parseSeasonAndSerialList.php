<?php
include 'Season.php';
include 'Serial.php';

function pushDb($value) {
    $serial = new Serial($value);
    $serial->sendDb();
    foreach ($value as $item) {
        $season = new Season($item);
        $season->sendDb();
    }
};

$all = file_get_contents('all.json');
$all = json_decode($all,true);

foreach ($all as $i) {
    
    //$a = json_encode($all[$i],JSON_UNESCAPED_UNICODE);
   // $last_season_id = $all[$i];
   // echo "{$a} \n\n\n\n";
    
    $postdata = http_build_query(
        array(
            'key' => '032a4972',
            'command' => 'getSeasonList',
            'id' => $i['last_season_id']
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
    $data = json_decode(file_get_contents('http://api.seasonvar.ru/', true, $context));
    pushDb($data);
}

?>

