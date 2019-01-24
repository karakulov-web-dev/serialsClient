import { Promise_simple, Promise } from "./Polyfill/Promise_simple";


export function get_Serials (config:any):Promise {
  let filters = window.model.serialList.filtersReq.get();
  let genre;
  if (typeof window.model.serialList.filtersReq.get().genre !== 'undefined') {
    genre = window.model.serialList.filtersReq.get().genre
  } else {
    genre = false;
  }

  if (genre) {
    config.join = 'genre'
    config.on = 'serials.genreHash=genre.genreHash'
    config.where = 'ужасы=1'
  }
  return getSerials(config)
};


export function getSerials (config:any):Promise {
  return new Promise_simple(function(resolve) {
    if (typeof config.limit === 'undefined') {
      config.limit = 10;
    }
    if (typeof config.offset === 'undefined') {
      config.offset = 0;
    }
    let data = config;
    data.type = "getData";
    data.from = "serials";
    data.orderBy = "kinopoisk DESC"
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/seasonvar.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
};

export function getSeasons(idArr):Promise {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({
      "type": "getData",
      "from": "seasons",
      "where": `${"idSeasonvar = " + idArr.join(" OR idSeasonvar = ")}`
    });
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/seasonvar.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

export function getSeason(id):Promise {
  return new Promise_simple(function(resolve) {
    var data = JSON.stringify({"season": id});
    var xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "http://212.77.128.177/karakulov/seasonvar/api/getSeason.php",
      true
    );
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      }
    };
  });
}

