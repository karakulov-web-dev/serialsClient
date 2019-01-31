<?php
require_once('AllSerials.php');
require_once('UpdaterDb.php');
    class main {
        static public function parseSeasonvar() {
            $allSerials = new AllSerials();
            $allSerials->get();
            $allSerials->renameId();
            $serials = $allSerials->getArray();
            $updaterDb = new UpdaterDb($serials);
            $updaterDb->update();
        }
    }
    main::parseSeasonvar();
?>