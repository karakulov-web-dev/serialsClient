<?php

$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
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

        if (array_key_exists('rating',$season)) {
           $this->imdb = $season->rating->imdb->ratio;
           $this->kinopoisk = $season->rating->kinopoisk->ratio;
        }
    }
    public function sendDb() {
        $b = $this->checkForDuplicatesDb();
        if ($b) {
            return false;
        }
        global $mysqli;
        $sql = "INSERT INTO seasonsAll".
        "(idSeasonvar,poster,poster_small,season_number,name,year,genreString,genreHash,countryHash,".
        "countryString,description,imdb,kinopoisk)".
        " VALUES ".
        "('$this->id','$this->poster','$this->poster_small','$this->season_number','$this->name','$this->year',".
        "'$this->genreString','$this->genreHash','$this->countryHash','$this->countryString','$this->description','$this->imdb','$this->kinopoisk')";
        $mysqli->query($sql);
    }
    private function checkForDuplicatesDb() {
        global $mysqli;
        $sql = "SELECT * FROM seasonsAll WHERE idSeasonvar='$this->id'";
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