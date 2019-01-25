<?php

$postdata = http_build_query(
    array(
        'key' => '032a4972',
        'command' => 'getSeasonList',
        'id' => ''
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
$data = json_encode($data);
echo $data;
?>