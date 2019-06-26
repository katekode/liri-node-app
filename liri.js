let axios = require("axios");
let Spotify = require("node-spotify-api");
let dotenv = require("dotenv").config();
let moment = require('moment');
let fs = require("fs");

//let keys = require('keys.js');
//let spotify2 = new spotify(keys.Spotify);

moment().format();

let command = process.argv[2];
let input = process.argv[3];
let spotify = new Spotify({
    id: 'd040b9380a7048c781cf174737ddb021',
    secret: '058bcccd79994407b276b2705239b6f9'
});

switch (command) {
    case 'concert-this':
        let concertURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        axios.get(concertURL).then(function(response) {
                let data = response.data[0];

                let concertData = [
                    "-----------------------------",
                    "Artist: " + input,
                    "\nVenue: " + data.venue.name,
                    "\nLocation: " + data.venue.city + ", " + data.venue.region,
                    "\nDate: " + moment(data.datetime).format("MM/DD/YYYY"),
                    "------------------------------",
                ].join("\n");

                console.log(concertData);
            })
            .catch(function(error) {
                console.log(error);
            })



        break;
        ///////////////////////////////////////////////////////////////////////
    case 'spotify-this-song':
        spotify.search({ type: 'track', query: input })
            .then(function(response) {
                let data = response.tracks.items[0].album;
                let songData = [
                    "------------------------------",
                    "Artist: " + data.artists[0].name,
                    "\nSong; " + input,
                    "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                    "\nAlbum; " + data.name,
                    "-----------------------------"
                ].join("\n\n");

                console.log(songData);
            })
            .catch(function(err) {
                console.log(err);
            });



        break;
        ///////////////////////////////////////////////////////////////////////
    case 'movie-this':
        console.log("MOVIE INFO BELOW");

        axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
            .then(function(response) {
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.Rated);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);

            })


        break;

    case 'do-what-it-says':
        fs.readFile("random.txt", "UTF-8", function(error, data) {
            if (error) {
                console.log("Error; " + error);

            } else {
                let choice = data.split(",");

                console.log(choice[1]);
                spotify.search({ type: 'track', query: choice[1] })
                    .then(function(response) {
                        let data = response.tracks.items[0].album;
                        let songData = [
                            "------------------------------",
                            "Artist: " + data.artists[0].name,
                            "\nSong; " + choice[0],
                            "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                            "\nAlbum; " + data.name,
                            "-----------------------------"
                        ].join("\n\n");

                        console.log(songData);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });

            }
        })

        console.log("filesystem command test");

        break;

    default:
        console.log("Invalid Command");
}