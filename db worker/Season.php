<?php

$mysqli = new mysqli("127.0.0.1", "seasonvar", "lolkarakul111", "seasonvar", 3306);
$mysqli->set_charset("utf8");

class Season
{
    function __construct($season)
    {
        $this->id = $season->id;
        $this->poster = $season->poster;
        $this->poster_small = $season->poster_small;
        if (isset($season->season_number)) {
            $this->season_number = $season->season_number;
        } else {
            $this->season_number = 1;
        }
        $this->name = $season->name;
        $this->year = $season->year;
        natsort($season->genre);
        $this->genreString = $season->genre;
        $this->genreString = implode(",",$this->genreString);
        $this->genreHash = md5($this->genreString);
        natsort($season->country);
        $this->countryString = $season->country;
        $this->countryString = implode(",",$this->countryString);
        $this->countryHash = md5($this->countryString);
        $this->description = $season->description;
        $this->imdb = $season->rating->imdb;
        $this->kinopoisk = $season->rating->kinopoisk;
    }
    public function sendDb() {
        $b = $this->checkForDuplicatesDb();
        if ($b) {
            return false;
        }
        global $mysqli;
        $sql = "INSERT INTO seasons".
        "(idSeasonvar,poster,poster_small,season_number,name,year,genreString,genreHash,countryHash,".
        "countryString,description,imdb,kinopoisk)".
        " VALUES ".
        "('$this->id','$this->poster','$this->poster_small','$this->season_number','$this->name','$this->year',".
        "'$this->genreString','$this->genreHash','$this->countryHash','$this->countryString','$this->description','$this->imdb','$this->kinopoisk')";
        $mysqli->query($sql);
    }
    private function checkForDuplicatesDb() {
        global $mysqli;
        $sql = "SELECT * FROM seasons WHERE idSeasonvar='$this->id'";
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