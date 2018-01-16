

// 1.  Connect to Twitter 
// 2.  Fetch Tweets
// 3.  Fetch other Twitter
// 4. Mesh Random Tweets
// 5.  Post Tweet
// 6.  Use Process.Env 
//==========================================

//API KEYS

//Access Token	902634864226295811-R2UUOtt3EUL5F9niptEOIRcMUxDVwPf
//Access Token Secret	OJpR9djXjIrUiSAv8XUVz7S8GjMCKJHf8nMR3A2PVH7FG
//Consumer Key (API Key)	m48lhXxhDKqilWNBSyLR25JQM
//Consumer Secret (API Secret)	JGg7vm0bTILOlacxo7KVmOoPhyNKpIHaYWi8VuMEVHc4RhsLpl

//=======================REQUIREMENTS====================================
//==================================

var Twitter = require('twitter');
var fs = require ('fs');

//======================API KEYS=======================================
var client = new Twitter({
 consumer_key: 'm48lhXxhDKqilWNBSyLR25JQM',
 consumer_secret: 'JGg7vm0bTILOlacxo7KVmOoPhyNKpIHaYWi8VuMEVHc4RhsLpl',
 access_token_key: '902634864226295811-R2UUOtt3EUL5F9niptEOIRcMUxDVwPf',
 access_token_secret: 'OJpR9djXjIrUiSAv8XUVz7S8GjMCKJHf8nMR3A2PVH7FG'
});

// Tweet Options 
// var all_tweets = [];
var historic_tweets = [];
var alltweets = [];
var othertweets = [];

var TweetTrump = function () {
//====================USER 1 =============================================
// params
var params = {screen_name: 'kylegriffin1', count: 250, include_rts: false, exclude_replies: false};
//client get
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
//    console.log(tweets);

   var all_tweets = new Array();
   for (var i = 0; i < tweets.length; i++) {
        all_tweets.push({
            "text": tweets[i].text,
            "screen_name": tweets[i].user.screen_name,
        })
   };
//---------------USER ONE FS WRITE TO FILE ------------------------------------
    fs.writeFile("contents.json", JSON.stringify(all_tweets, null, '\t'), (err) => {
    if(err) throw err;
    console.log('It\'s saved!');   
  });
  
   //save twitter feed to a text file
   fs.writeFile("tweets.json", JSON.stringify(tweets, null, '\t'), (err) => {
    if(err) throw err;
    console.log('It\'s saved!');   
  });
 }
//============Randomized Tweets ===================================
   //Random Selection of Tweet
   random_element = Math.floor(Math.random() * all_tweets.length) + 1;
   // Choose a random tweet 
   selected_tweet = all_tweets[random_element];
   // if (!(selected_tweet in historic_tweets)){
   // //Push the selected tweet to historic tweets
   // historic_tweets.push(selected_tweet);
   console.log("THIS IS THE RANDOM TWEET: " + selected_tweet.text);

   alltweets.push(selected_tweet.text); 

//=======================USER NUMBER 2 =========================================
//===============================================================================
var newparams = {screen_name: 'realDonaldTrump', count: 250, include_rts: false}

//client get
client.get('statuses/user_timeline', newparams, function(error, tweets, response) {
    if (!error) {
   //    console.log(tweets);
   
      var other_tweets = new Array();
      for (var i = 0; i < tweets.length; i++) {
           other_tweets.push({
               "text": tweets[i].text,
               "screen_name": tweets[i].user.screen_name,
           })
      };
    //save twitter objects in JSON
    fs.writeFile("other.json", JSON.stringify(other_tweets, null, '\t'), (err) => {
        if(err) throw err;
        console.log('It\'s saved!');   
      }); 

    }
   //============Randomized Tweets ===================================
   //Random Selection of Tweet
   random_element = Math.floor(Math.random() * other_tweets.length) + 1;
   // Choose a random tweet 
   selected_tweeter = other_tweets[random_element];
   if (!(selected_tweeter in historic_tweets)){
   //Push the selected tweet to historic tweets
   historic_tweets.push(selected_tweeter);
   console.log("THIS IS THE RANDOM TWEET: " + selected_tweeter.text);

  //============POST TWEET ===========================================
  //Test case for tweeting out 
  client.post('statuses/update', {status: selected_tweeter.text + " " + selected_tweet.text }, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
    }); 
   }
});
});
}

TweetTrump()
setInterval(TweetTrump, 1200000)

// client.post('statuses/update', {status: alltweets.selected_tweet.text + "#HATORADE"}, function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }
//   });
