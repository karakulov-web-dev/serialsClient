<?php
require_once('../../commonPhp/ReqTools.phpReqTools.php');

class UpdateList {
    function __construct()
    {
        $this->reqTools = new ReqTools();
    }
    public function getData() {
        $bodyReq = array(
            'key' => '033238e5',
            'command' => 'getUpdateList',
        );
        $this->result = $this->reqTools->reqPostHttp('http://api.seasonvar.ru/', $bodyReq);
        if (gettype($this->result) == 'object') {
            if ($this->result->error) {
                throw new Exception("\n***** ERROR: {$this->result->error} *****\n");
            }
        }
        return $this->result;
    }
    public function sendDb() {
        foreach ($this->result as $item) {
            $this->itemSendDb($item);
        }
    }
    public function deleteOldListDb() {
       $sql = "DELETE FROM `updateList` ";
       $this->reqTools->reqDb($sql);
    }
    private $reqTools;
    private $result;
    private function itemSendDb($item) {
        $sql = "INSERT INTO `updateList`".
        "(`poster`, `poster_small`, `name`, `message`, `create_time`, `idSeasonvar`)".
        " VALUES ".
        "('{$item->poster}','{$item->poster_small}','{$item->name}','{$item->message}',{$item->create_time},{$item->id})";
        $this->reqTools->reqDb($sql);
    }
}
?>