require("dotenv").config();

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
        case "movie-this":
        movie(inputParameter);
        break;
        default: 
        console.log("Invalid input. Please type one of the following options: \n  'concert-this' or 'movie-this'")
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
        console.log();  
        fs.appendFileSync("log.txt", "\n")
        }
    })

    .catch(function(error) {
        console.log("(An error occured while finding information about this movie.)");
     });

}

