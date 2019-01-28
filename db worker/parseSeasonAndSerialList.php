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

$block = true;
foreach ($all as $i) {
    

   if ($i['name'] == 'Тайная история разведки. Соло для одиноких сов') {
 $block = false;
 continue;
}
if ($block) {
 continue;
}


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
    if ($data->error) {
        continue;
       }
    pushDb($data);
}

?>

