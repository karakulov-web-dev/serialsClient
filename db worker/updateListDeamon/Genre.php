<?php
require_once('../commonPhp/bdConfig.php');
require_once('../commonPhp/apiSeasonvarConf.php');
$mysqli = new mysqli($bdConfig->host, $bdConfig->username, $bdConfig->password, $bdConfig->bdName, $bdConfig->port);
$mysqli->set_charset("utf8");

class Genre {
    function __construct($id)
    {   
        $this->id = $id;
        $this->serial = $this->getSerial();
    }
    private function getSerial() {
        global $mysqli;
        $sql = "SELECT * FROM `serials` WHERE id=$this->id";
        $res = $mysqli->query($sql);
        $row = $res->fetch_assoc();
        $this->genreHash = $row['genreHash'];
        $this->genreArr = explode(",",$row['genreString']);
    }
    public function sendDb() {
        $b = $this->checkForDuplicatesDb();
        if ($b) {
            return false;
        }
        global $mysqli;

        $keys = array();
        $values = array();

        foreach ($this->genreArr as $item) {
            if ($item == "Discovery&BBC") {
                $item = "DiscoveryBBC";
            }
            $keys[] = $item;
            $values[] = 1;
        }

        $keys = implode(',',$keys);
        $values = implode(',',$values);

        $sql = "INSERT INTO genre".
        "(genreHash,{$keys})".
        " VALUES ".
        "('$this->genreHash',{$values})";
        $mysqli->query($sql);
    }
    private function checkForDuplicatesDb() {
        global $mysqli;
        $sql = "SELECT * FROM genre WHERE genreHash='$this->genreHash'";
        $res = $mysqli->query($sql);
        if ($res) {
            $row = $res->fetch_assoc();
        } else {
            return false;
        }
        if ($row) {
            return true;
        } else {
            return false;
        }
    }
}
?>