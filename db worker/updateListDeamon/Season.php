<?php
require_once('../commonPhp/bdConfig.php');
$mysqli = new mysqli($bdConfig->host, $bdConfig->username, $bdConfig->password, $bdConfig->bdName, $bdConfig->port3306);
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
            if (array_key_exists('imdb',$season->rating)) {
                $this->imdb = $season->rating->imdb->ratio;
            } else {
                $this->imdb = 0;
            }
            if (array_key_exists('kinopoisk',$season->rating)) {
                $this->kinopoisk = $season->rating->kinopoisk->ratio;
            } else {
                $this->kinopoisk = 0;
            }
        } else {
            $this->imdb = 0;
            $this->kinopoisk = 0;
        }

    }
    public function sendDb() {
        global $mysqli;

        $sql = "DELETE FROM `seasons` WHERE idSeasonvar={$this->id}";
        $mysqli->query($sql);

        $sql = "INSERT INTO seasons".
        "(idSeasonvar,poster,poster_small,season_number,name,year,genreString,genreHash,countryHash,".
        "countryString,description,imdb,kinopoisk)".
        " VALUES ".
        "('$this->id','$this->poster','$this->poster_small','$this->season_number','$this->name','$this->year',".
        "'$this->genreString','$this->genreHash','$this->countryHash','$this->countryString','$this->description','$this->imdb','$this->kinopoisk')";
        $mysqli->query($sql);
    }
}
?>