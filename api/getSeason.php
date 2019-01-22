<?php
$content = trim(file_get_contents("php://input"));
$configReq = json_decode($content, true);
getSeason($configReq['season']);
function getSeason($id) {
    $postdata = http_build_query(
        array(
            'key' => '032a4972',
            'command' => 'getSeason',
            'season_id' => $id
        )
    );
    $opts = array(
        'http' =>
            array(
                'method'  => 'POST',
                'content' => $postdata
            )
    );
    $context  = stream_context_create($opts);
    $data = json_decode(file_get_contents('http://api.seasonvar.ru/', false, $context));
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
?>