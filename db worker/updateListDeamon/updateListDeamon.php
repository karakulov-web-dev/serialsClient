<?php
require_once('UpdateList.php');
require_once('UpdaterDb.php');

    class updateListDeamon {
        public static function main() {
            self::getUpdateList();
            self::updateListAddDb();
        }
        private static function getUpdateList() {
            $updateList = new UpdateList();
            self::$dataUpdateList = $updateList->getData();
            $updateList->deleteOldListDb();
            $updateList->sendDb();
        }
        private static function updateListAddDb() {
            $updaterDb = new UpdaterDb(self::$dataUpdateList);
            $updaterDb->update();
        }
        private static $dataUpdateList;

    }
    updateListDeamon:: main();
?>