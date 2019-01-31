<?php

$mysqli = new mysqli("127.0.0.1", "seasonvar", "jnfKLBY7ZfJq6WZG", "seasonvar", 3306);
$mysqli->set_charset("utf8");

class Serial
{
    function __construct($seasonArr)
    { 
        $this->id = $seasonArr[0]->id;
        $this->poster = $seasonArr[0]->poster;
        $this->poster_small = $seasonArr[0]->poster_small;
        $this->seasons_number = count($seasonArr);
        $this->name = $seasonArr[0]->name;
        $this->year = $seasonArr[0]->year;
        natsort($seasonArr[0]->genre);
        $this->genreString = $seasonArr[0]->genre;
        $this->genreString = implode(",",$this->genreString);
        $this->genreHash = md5($this->genreString);
        natsort($seasonArr[0]->country);
        $this->countryString = $seasonArr[0]->country;
        $this->countryString = implode(",",$this->countryString);
        $this->countryHash = md5($this->countryString);
        $this->description = $seasonArr[0]->description;
        $vvvv = array_key_exists('rating',$seasonArr[0]);
        if (array_key_exists('rating',$seasonArr[0])) {

            if (array_key_exists('imdb',$seasonArr[0]->rating)) {
                $this->imdb = $seasonArr[0]->rating->imdb->ratio;
            } else {
                $this->imdb = 0;
            }
            if (array_key_exists('kinopoisk',$seasonArr[0]->rating)) {
                $this->kinopoisk = $seasonArr[0]->rating->kinopoisk->ratio;
            } else {
                $this->kinopoisk = 0;
            }
        } else {
            $this->kinopoisk = 0;
            $this->imdb = 0;
        }
        $this->seasonListIdJson = $this->seasonListIdJson($seasonArr);
        $this->seasonListIdJson = json_encode($this->seasonListIdJson);
    }
    private function seasonListIdJson($seasonArr) {
        $arr = array();
        foreach ($seasonArr as $value) {
            $arr[] = $value->id;
        }
        return $arr;
    }
    public function sendDb() {
        global $mysqli;

        $sql = "DELETE FROM `serials` WHERE id={$this->id}";
        $mysqli->query($sql);

        $sql = "INSERT INTO serials".
        "(id,poster,poster_small,seasons_number,name,".
        "year,genreString,genreHash,countryString,countryHash,description,".
        "imdb,kinopoisk,seasonListIdJson)".
        " VALUES ".
        "('$this->id','$this->poster','$this->poster_small','$this->seasons_number','$this->name',".
        "'$this->year','$this->genreString','$this->genreHash','$this->countryString','$this->countryHash',".
        "'$this->description','$this->imdb','$this->kinopoisk','$this->seasonListIdJson')";
        $mysqli->query($sql);
    }
}
?>