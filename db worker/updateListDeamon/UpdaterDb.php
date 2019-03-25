<?php
require_once('../../commonPhp');
require_once('Season.php');
require_once('Serial.php');
require_once('Genre.php');

class UpdaterDb {
    function __construct($updateList)
    {
        $this->reqTools = new ReqTools();
        $this->updateList = $updateList;
        $this->serialIdArr = array();
    }
    public function update() {
        foreach ( $this->updateList as $item) {
            $this->updateItemInDb($item);
        }
        foreach ( $this->serialIdArr as $serialId ) {
            $this->genreCreate($serialId);
        }
    }
    private function updateItemInDb($item) {
        $bodyReq = array(
            'key' => '033238e5',
            'command' => 'getSeasonList',
            'id' => $item->id
        );
        $result = $this->reqTools->reqPostHttp('http://api.seasonvar.ru/', $bodyReq);
        $this->serialUpdateDb($result);
        if ($result[0]) {
            $this->serialIdArr[] = $result[0]->id;
        }
        foreach ($result as $value) {
            $this->seasonPlayListUpdateDb($value);
            $this->seasonUpdateDb($value);
        }
    }
    private function seasonPlayListUpdateDb($item) {
        $bodyReq = array(
            'key' => '033238e5',
            'command' => 'getSeason',
            'season_id' => $item->id
        );
        $result = $this->reqTools->reqPostHttp('http://api.seasonvar.ru/', $bodyReq);

        $playlist = json_encode($result->playlist, JSON_UNESCAPED_UNICODE);
        $idSeasonvar = $item->id;

        $sql = "DELETE FROM `playList` WHERE idSeasonvar={$item->id}";
        $this->reqTools->reqDb($sql);

        $part1 = "INSERT INTO `playList` ";
        $part2 = "(`idSeasonvar`,`playlist`) ";
        $part3 = 'VALUES ';
        $part4 = " ('{$idSeasonvar}','{$playlist}')";
        $sql = $part1 . $part2 . $part3 . $part4;
        $this->reqTools->reqDb($sql);
    }
    private function seasonUpdateDb($value) {
        $season = new Season($value);
        $season->sendDb();
    }
    private function serialUpdateDb($value) {
        $serial = new Serial($value);
        $serial->sendDb();
    }
    private function genreCreate($id) {
        $genre = new Genre($id);
        $genre->sendDb();
    }
    private $reqTools;
    private $updateList;
    private $seasonList;
    private $serialIdArr;
}
?>