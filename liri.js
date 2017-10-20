// Import the Keys file
var keys = require("./keys.js");

// Import the Twitter NPM package.
var Twitter = require("twitter");

// Import the Spotify npm package.
var spotify = require("spotify");

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

var type = process.argv[2];

//if statements to determine which function to run
switch (type) {
	case "movie-this":
		movies();
		break;
	case "my-tweets":
		twitter(); 
		break;
	case "spotify-this-song": 
		songs();
		break;
	default:
		console.log("none of the functions ran, you failed");
};		


//NOT ACCESSIBLE ANYMORE, NEED API NEED TO PAY, BUT WORKING	
//function to run movies npm
function movies() {
	emptyArray = [];
	ArraytoString = '';
	urlLink = '';
//if nothing is inputed after argv[2], will auto fill "Mr. Nobody"	
	if (process.argv[3] === undefined) {
		ArraytoString = "Mr. Nobody";
	} else if (process.argv.length > 2) { 
		for (i = 3; i < process.argv.length; i++ ) {
		emptyArray.push(process.argv[i]);
		// console.log(emptyArray.toString());
		}
		ArraytoString = emptyArray.toString();
		urlLink = ArraytoString.replace(/,/g, "_");
		console.log('string:' + ArraytoString);
		console.log('urllink:' + urlLink);

	} else {
		ArraytoString = process.argv[3].toString();
	}

//request for movie info
//api is now private does not show info undefined	
		request("http://www.omdbapi.com/?t=" + ArraytoString, function(error, response, body) {
    	console.log("\nYou searched for: " + 
    		JSON.parse(body).Title +"\nYear: " + 
    		JSON.parse(body).Year + '\nRating: ' + 
    		JSON.parse(body).imdbRating + '\nCountry: ' + 
    		JSON.parse(body).Country + '\nLanguage: ' + 
    		JSON.parse(body).Language + '\nPlot: ' + 
    		JSON.parse(body).Plot + '\nActors: ' + 
    		JSON.parse(body).Actors + '\nRottenTomatoesRating: ' + 
    		JSON.parse(body).Ratings + '\nRottenTomatoesURL: www.rottentomatoes.com/m/' + 
    		urlLink
    	);
	});
}

//function to run twitter npm
function twitter() {	
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: 'Ian_aromin'};
//grabbing the exports api info from other .js and running a get	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
});
}

//DOES NOT WORK NEEDS TOKEN ALSO FOR API ACCESS
//Found out by using JSON.stringify(data) in console.log to found out.
//function to run spotify npm
function songs() {
	empty = '';
	fs.readFile("random.txt", "utf8", function(error, transferedData) {
    	console.log('transferedData: ' + transferedData);
    });
//if nothing is inputed after argv[2], will auto fill "The Sign"	
	if (process.argv[3] === undefined) {
		empty = "The Sign by Ace of Base";
		console.log(empty);
	}
	spotify.search({ type: 'track', query: empty }, function(err, data) {
   	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
     	} else {
  	   	console.log("\nYou searched for (First Result): " + data.tracks.items[0].name + 
			"\nArtist: " + data.tracks.items[0].artists[0].name + 
			"\nPreview Link: " + data.tracks.items[0].preview_url + 
			"\nAlbum: " + data.tracks.items[0].album.name
			);
  	  	}
	});
}
