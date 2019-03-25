<?php
$mysqli = new mysqli("127.0.0.1", "seasonvar", "33nrai3tgv", "serials", 3306);
$mysqli->set_charset("utf8");
class ReqTools {
    function reqDb ($sql) {
        global $mysqli;
        $res = $mysqli->query($sql);
        $result = array();
        if (gettype($res) == 'object') {
            while ($row = $res->fetch_assoc()) {
                $result[] = $row;
            }
        }
        return $result;
    }
    function reqPostHttp($url,$body) {
        $postdata = http_build_query($body);
        $opts = array(
            'http' =>
                array(
                    'header' => "Content-Type: application/x-www-form-urlencoded\r\n".
                    "Content-Length: ".strlen($postdata)."\r\n",     
                    'method'  => 'POST',
                    'content' => $postdata
                )
        );
        $context  = stream_context_create($opts);
        $data = json_decode(file_get_contents($url, false, $context));
        return $data;
    }
}
?>