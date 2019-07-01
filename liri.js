require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs")

var moment = require("moment")


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

    var queryURLconcert = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    console.log(queryURLconcert)
    axios.get(queryURLconcert).then(function(response) {
        // console.log(response.data[0])

        for (var i = 0; i < response.data.length; i++) {
            var concert = response.data[i];
            var format = moment.HTML5_FMT.DATETIME_LOCAL_SECONDS;
            var date = moment(concert.datetime).format("LL")

            // console.log(concert)
            console.log(concert.venue.name); 
            console.log(concert.venue.city + " " + concert.venue.region); 
            console.log(date)    
            console.log()
        }
    })
    .catch(function(error) {
          console.log("Error", error.message);
    });
}   
// _____________________________________________________

function song() {     

    var song = process.argv.slice(3).join(" ");
    
    if (process.argv[3] === undefined) {
        song = "The Sign"
    }

    // if (song = "") {
    //     spotify.search({type: "track", query: "The Sign"})
    //         .then(function(response){

    //         })
    // }
    
    // var queryURLspotify = "https://www.npmjs.com/package/node-spotify-api "         

    spotify                                   
        .search({
            type: "track",
            query: song})
            .then(function(response) {
                
                // console.log(response)
                for (var i = 0; i < response.tracks.items.length; i++) {
                    var info = response.tracks.items[i]
                    // console.log(info)
                    console.log(info.artists[0].name)      
                    console.log(info.name);  
                    console.log(info.preview_url);   
                    console.log(info.album.name);  
                    console.log();  
                }
            })
            .catch(function() {
                song = "The+Sign";
                console.log(song)
             })
}       

// _____________________________________________________

function movie() {      

    var movieName = process.argv.slice(3).join(" ");

    if (process.argv[3] === undefined) {
        movieName = "Mr. Nobody"
    }
    
    var queryURLmovie = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName

    axios.get(queryURLmovie).then(function(response) {

        var movie = response.data;

        console.log(movie.Title)    
        console.log("Year the movie came out: " + movie.Year)  
        console.log("IMDB Rating: " + movie.imdbRating)     
        console.log(movie.Ratings[1].Source + " Rating: " + movie.Ratings[1].Value)
        console.log("Produced in: " + movie.Country)  
        console.log("Languages of the movie: " + movie.Language) 
        console.log("The Plot: " + movie.Plot)     
        console.log("Actors: " + movie.Actors)  
        console.log();  
})
} 
// _____________________________________________________

function says() {       //not sure exactly what this is supposed to do

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