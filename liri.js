require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

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
    
    var artist = process.argv.slice(3).join("+");

    // var artist = "";

    // //loop for more than 1 word
    // for (var i = 2; i < nodeArgs.length; i++) {

    //     if (i > 2 && i < nodeArgs.length) {
    //         artist = artist + "+" + nodeArgs[i];
    //     } else {
    //         artist += nodeArgs[i];
    //     }
    // }

    var queryURLconcert = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    console.log(queryURLconcert)
    axios.get(queryURLconcert).then(function(response) {
        console.log(response)

        // for (var i = 0; i < response.length; i++) {
            console.log(JSON.stringify(response[0], null, 2))    // response = undefined ?????
            // console.log(response.location)            how to display object?????
            // console.log(response.datetime.moment().format("MM/DD/YYYY"))      datetime is undefined?????
        // }
    })
    .catch(function(error) {
        console.log("error")
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log("---------------Data---------------");
        //   console.log(error.response.data);
        //   console.log("---------------Status---------------");
        //   console.log(error.response.status);
        //   console.log("---------------Status---------------");
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an object that comes back with details pertaining to the error that occurred.
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        // console.log(error.config);
      });
    
  
}   
// _____________________________________________________

function song() {

    var song = process.argv.slice(3).join(" ");

    // var queryURLspotify = "https://www.npmjs.com/package/node-spotify-api "         

    spotify                                   
        .search({query: song})
            .then(function(response) {
             console.log(response);
            })
            .catch(function(err) {
                 console.log(err);
             })
}       // Error: You must specify a type and query for your search. ?????????
// _____________________________________________________

function movie() {

    var movieName = process.argv.slice(3).join(" ");
    
    var queryURLmovie = "http://www.omdbapi.com/?apikey=trilogy&?t=" + movieName

    axios.get(queryURLmovie).then(function(response) {
        // for (var i = 0; i < response.length; i++) {
            console.log(JSON.stringify(response[0], null, 2))
        // }
    })
}  //  response = undefined ?????

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

    // 
// _____________________________________________________

function says() {
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