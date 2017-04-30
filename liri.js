var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");

var type = process.argv[2];
var empty = "";
//used for the movie rottentomatoesURL, would not push
var emptyArray = [];
// console.log("Process.argv array length: " + process.argv.length);

//set up for multi word process.argv
for (i=3; i<process.argv.length; i++) {
	if (i>3) {
		var test = process.argv[i];
		empty +=  "+" + test;
		// emptyArray.push(test);
		// emptyArray.join("_"); 
	}	
//else just run single word	
	else { empty = process.argv[3];
		emptyArray = process.argv[3];}
}
// console.log("empty string check: " + empty);

//if statements to determine which function to run
switch (type) {
	case "move-this":
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
		



//function to run movies npm
function movies() {
//if nothing is inputed after argv[2], will auto fill "Mr. Nobody"	
	if (process.argv[3] === undefined) {
		var empty = "Mr. Nobody";
		emptyArray = "Mr._Nobody"; }
//request for movie info		
		request("http://www.omdbapi.com/?t=" + empty, function(error, response, body) {
    	console.log("\nYou searched for: " + JSON.parse(body).Title +"\nYear: " + JSON.parse(body).Year + '\nRating: ' + JSON.parse(body).imdbRating
    		+ '\nCountry: ' + JSON.parse(body).Country + '\nLanguage: ' + JSON.parse(body).Language + '\nPlot: ' + JSON.parse(body).Plot
    		+ '\nActors: ' + JSON.parse(body).Actors + '\nRottenTomatoesRating: ' + JSON.parse(body).Ratings + '\nRottenTomatoesURL: www.rottentomatoes.com/m/' + emptyArray);
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


//function to run spotify npm
function songs() {
//if nothing is inputed after argv[2], will auto fill "The Sign"	
	if (process.argv[3] === undefined) {
		var empty = "The Sign by Ace of Base";
	}
	spotify.search({ type: 'track', query: empty }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;}
//request for song info	        
	else {console.log("\nYou searched for (First Result): " + data.tracks.items[0].name + "\nArtist: " + data.tracks.items[0].artists[0].name
			+ "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);}
});
}
