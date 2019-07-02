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
        default: 
        console.log("Invalid input. Please type one of the following options: \n  concert-this \n  spotify-this-song \n  movie-this \n  do-what-it-says")
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
            var date = moment(concert.datetime).format("LLL")

            console.log("------------ EVENT --------------");
            fs.appendFileSync("log.txt", "------------ EVENT --------------\n");
            console.log("Venue: " + concert.venue.name); 
            fs.appendFileSync("log.txt", "Venue: " + concert.venue.name + "\n");
            console.log("Location: " + concert.venue.city + " " + concert.venue.region); 
            fs.appendFileSync("log.txt", "Location: " + concert.venue.city + " " + concert.venue.region + "\n");
            console.log(date);
            fs.appendFileSync("log.txt", date + "\n");
            console.log();
            fs.appendFileSync("log.txt", "\n")

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
                console.log("------------ SONGS --------------");
                fs.appendFileSync("log.txt", "------------ SONGS --------------\n");
                console.log("Artist: " + info.artists[0].name);
                fs.appendFileSync("log.txt", "Artist: " + info.artists[0].name + "\n");
                console.log("Song: " + info.name);
                fs.appendFileSync("log.txt", "Song: " + info.name + "\n");
                console.log("Preview Link: " + info.preview_url); 
                fs.appendFileSync("log.txt", "Preview Link: " + info.preview_url + "\n");  
                console.log("Album: " + info.album.name); 
                fs.appendFileSync("log.txt", "Album: " + info.album.name + "\n") 
                console.log();  
                fs.appendFileSync("log.txt", "\n")
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
        console.log("------------ MOVIE --------------");  
        fs.appendFileSync("log.txt", "------------ MOVIE --------------\n");
        console.log(movie.Title); 
        fs.appendFileSync("log.txt", movie.Title + "\n");  
        console.log("The Plot: " + movie.Plot); 
        fs.appendFileSync("log.txt", "The Plot: " + movie.Plot + "\n");
        console.log("Actors: " + movie.Actors);  
        fs.appendFileSync("log.txt", "Actors: " + movie.Actors + "\n");     
        console.log("Year the movie came out: " + movie.Year);
        fs.appendFileSync("log.txt", "Year the movie came out: " + movie.Year + "\n"); 
        console.log("Produced in: " + movie.Country);  
        fs.appendFileSync("log.txt", "Produced in: " + movie.Country + "\n");
        console.log("Languages of the movie: " + movie.Language); 
        fs.appendFileSync("log.txt", "Languages of the movie: " + movie.Language + "\n");
        console.log("IMDB Rating: " + movie.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movie.imdbRating + "\n");
        console.log(movie.Ratings[1].Source + " Rating: " + movie.Ratings[1].Value);
        fs.appendFileSync("log.txt", movie.Ratings[1].Source + " Rating: " + movie.Ratings[1].Value + "\n");
        // console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movie))
        console.log();  
        fs.appendFileSync("log.txt", "\n")
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