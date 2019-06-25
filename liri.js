require("dotenv").config();

var keys = require("./keys.js");

// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys);

var axios = require("axios");

var fs = require("fs")

var type = process.argv[2]

switch (type) {
    case "concert-this":
    concert();
    break;
    case "spotify-this-song":
    song();
    break;
    case "movie-this":
    movie();
    break;
    case "do-what-it-says":
    says();
    break;
}
// _____________________________________________________
function concert() {

    var nodeArgs = process.argv;

    var artist = "";

    //loop for for than 1 word
    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        } else {
            artist += nodeArgs[i];
        }
    }

    var queryURLconcert = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURLconcert).then(function(response) {
        for (var i = 0; i < response.length; i++) {
            console.log(response.venue)
            // console.log(response.location)            how to display object?????
            // console.log(response.datetime.moment().format("MM/DD/YYYY"))      datetime is undefined?????
        }
    })
}
// _____________________________________________________

// function song() {

    // var nodeArgs = process.argv;

    // var song = "";

    // //loop for for than 1 word
    // for (var i = 2; i < nodeArgs.length; i++) {

    //     if (i > 2 && i < nodeArgs.length) {
    //         song = song + "+" + nodeArgs[i];
    //     } else {
    //         song += nodeArgs[i];
    //     }
    // }

//     var queryURLspotify = ""                   URL ????????

//     spotify                                   use this?????????
//         .search({query: song})
//             .then(function(response) {
//              console.log(response);
//             })
//             .catch(function(err) {
//                  console.log(err);
//              })
// _____________________________________________________

function movie() {

    var nodeArgs = process.argv;

    var movieName = "";

    //loop for for than 1 word
    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    
    var queryURLmovie = "http://www.omdbapi.com/?apikey=trilogy&?t=" + movieName

    axios.get(queryURLmovie).then(function(response) {
        for (var i = 0; i < response.length; i++) {
            console.log(response)
        }
    })
}                            // when run, terminal says "this is loaded" and prints out nothing ??????

    // Output the following:
    //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.

    if (movieName = "") {
        movieName = "Mr. Nobody"
    }
// _____________________________________________________

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
          }
          else {
              console.log(data)
          }
        type = "spotify-this-song"
    })

}