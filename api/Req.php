<?php
$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
$mysqli->set_charset("utf8");

class Req {
    function __construct($config) {
        $this->config = $config;
        if ($config['type'] == 'getData') {
            $this->createSelectSql();
        } else if (!$config->type) {
            $this->result = "error creating sql";
            $this->error = true;
        }
    }
    function send() {
        if ($this->error) {
            return false;
        }
        global $mysqli;
        $this->res = $mysqli->query($this->sql);
        $this->result = array();
        while ($this->row = $this->res->fetch_assoc()) {
            $this->result[] = $this->row;
        }
    }
    function createSelectSql() {
        $select = "SELECT * ";
        $from = $this->createFromSql();
        $join = $this->createJoinSql();
        $on = $this->createOnSql();
        $where = $this->createWhereSql();
        $orderBy = $this->createOrderBySql();
        $limit =  $this->createLimitSql();
        $offset = $this->createOffsetSql();
        $this->sql = $select . $from .$join . $on . $where . $orderBy . $limit . $offset;
    }
    function createFromSql() {
        if ($this->config['from']) {
            return "FROM {$this->config['from']} ";
        } else {
            return "";
        }
    }
    function createJoinSql() {
        if ($this->config['join']) {
            return "INNER JOIN {$this->config['join']} ";
        } else {
            return "";
        }
    }
    function createOnSql() {
        if ($this->config['on']) {
            return "ON {$this->config['on']} ";
        } else {
            return "";
        }
    }
    function createWhereSql() {
        if ($this->config['where']) {
            return "WHERE {$this->config['where']} ";
        } else {
            return "";
        }
    }
    function createOrderBySql() {
        if ($this->config['orderBy']) {
            return "ORDER BY {$this->config['orderBy']} ";
        } else {
            return "";
        }
    }
    function createLimitSql() {
        if ($this->config['limit']) {
            return "LIMIT {$this->config['limit']} ";
        } else {
            return "";
        }
    }
    function createOffsetSql() {
        if ($this->config['offset']) {
            return "OFFSET {$this->config['offset']} ";
        } else {
            return "";
        }
    }
}
?>