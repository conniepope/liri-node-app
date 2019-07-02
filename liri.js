require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs")

var moment = require("moment")

// _____________________________________________________

var type = process.argv[2]
console.log(type)

var inputParameter = process.argv.slice(3).join(" ");
console.log(inputParameter)

// _____________________________________________________

var switchType = function(type, inputParameter) {

   switch (type) {
        case "concert-this":
        concert(inputParameter);
        break;
        case "spotify-this-song":
        song(inputParameter);
        break;
        case "movie-this":
        movie(inputParameter);
        break;
        case "do-what-it-says":
        says();
        break;
    }
}    
switchType(type, inputParameter);

// _____________________________________________________

function concert() {      
    
    var artist = inputParameter;

    var queryURLconcert = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURLconcert).then(function(response) {

        for (var i = 0; i < 10; i++) {
            var concert = response.data[i];
            var format = moment.HTML5_FMT.DATETIME_LOCAL_SECONDS;
            var date = moment(concert.datetime).format("LL")

            console.log()
            console.log("Venue: " + concert.venue.name); 
            console.log("Location: " + concert.venue.city + " " + concert.venue.region); 
            console.log(date)    
        }
    })
    .catch(function(error) {
          console.log("Sorry, can not find any concerts for this person at this time.");
    });
}   
// _____________________________________________________

function song() {     

    var song = inputParameter;
    
    if (process.argv[3] === undefined && song !== "I want it that way") {
        song = "The Sign"
    }

    spotify                                   
        .search({
            type: "track",
            query: song})
        .then(function(response) {
            
            for (var i = 0; i < response.tracks.items.length; i++) {
                var info = response.tracks.items[i]

                console.log();  
                console.log("Artist: " + info.artists[0].name)      
                console.log("Song: " + info.name);  
                console.log("Preview Link: " + info.preview_url);   
                console.log("Album: " + info.album.name);  
            }
        })
}       
// _____________________________________________________

function movie() {      

    var movieName = inputParameter;

    if (process.argv[3] === undefined) {
        movieName = "Mr. Nobody"
    }
    
    var queryURLmovie = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName

    axios.get(queryURLmovie).then(function(response) {

        var movie = response.data;
        if (movie.Title === undefined) {
            console.log(error);
        } else {
        console.log();  
        console.log(movie.Title)    
        console.log("The Plot: " + movie.Plot) 
        console.log("Actors: " + movie.Actors)      
        console.log("Year the movie came out: " + movie.Year)  
        console.log("Produced in: " + movie.Country)  
        console.log("Languages of the movie: " + movie.Language) 
        console.log("IMDB Rating: " + movie.imdbRating) 
        console.log(movie.Ratings[1].Source + " Rating: " + movie.Ratings[1].Value)
        // console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movie))
        console.log();  
        }
    })

    .catch(function(error) {
        console.log("(An error occured while finding information about this movie.)");
     });

}
    // //function to get proper Rotten Tomatoes Rating
    // function getRottenTomatoesRating (data) {
    //     return movie.Ratings.find(function (item) {
    //     return item.Source === "Rotten Tomatoes";
    //     });
    // }
    
    // function getRottenTomatoesRatingValue (data) {
    //     return getRottenTomatoesRating(data).Value;
    // }

// _____________________________________________________

function says() {       

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
    
        else {
        var defaultInput = data.split(",")  

        console.log(defaultInput[0])
        console.log(defaultInput[1])

        type = defaultInput[0];
        inputParameter = defaultInput[1];
        switchType(type, inputParameter);

        }
    })
}