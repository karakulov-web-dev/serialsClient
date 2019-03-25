<?php
require_once('../../commonPhp/ReqTools.php');

class AllSerials {
    function __construct()
    {
        $this->reqTools = new ReqTools();
    }
    public function get() {
        $bodyReq = array(
            'key' => '033238e5',
            'command' => 'getSerialList'
        );
        $this->result = $this->reqTools->reqPostHttp('http://api.seasonvar.ru/', $bodyReq);
    }
    public function renameId() {
        foreach ($this->result as $item) {
            $item->id = $item->last_season_id;
        } 
    }
    public function getArray() {
        return $this->result;
    }
    private $reqTools;
    private $result;
}
?>