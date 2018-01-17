

// 1.  Connect to Twitter 
// 2.  Fetch Tweets
// 3.  Fetch other Twitter
// 4. Mesh Random Tweets
// 5.  Post Tweet
// 6.  Use Process.Env 
//==========================================

//=======================REQUIREMENTS====================================
//==================================

var Twitter = require('twitter');
var fs = require ('fs');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Tweet Options 
var all_tweets = [];
var historic_tweets = [];
var otherArray = [ 
    "Did anybody ever tell you, you have a very scary accent?",
    "One of my roommates told me that he was Joe Pesci's son, I believed him for three years.",
    "Are you mad that you died at the end of Die Hard?",
    " It's not my fault your grandpa is playing backgammon with Hitler.",
    "I took care of you when you were a baby, now have to do the same for me.",
    "So I'm guessing your friend is the fat version of you.",
    "I can give you my fax number and my e-mail.",
    "Is this where the blue avatar lives?",
    "WHY DON'T YOU JUST GO HOME?",
    "KNIBB HIGH FOOTBALL RULES!",
    "The cops zapped with a taser until he went bald",
    "The industrial revolution to me is just like a story I know called the Puppy Who Lost His Way",
    "That puppy was a dog.  But the industry, my friends, that was a revolution",
    "Mortal Kombat on Sega Genesis is the best game ever",
    "You Eat Pieces of S-T for Breakfast?",
    "Oh Really Fool?",
    "It's too damn hot for a penguin to be just walkin around here",
    "I kinda feel like an idiot sometimes. Although I am an idiot so it kinda works out.",
    "Suntan lotion is good for me",
    "What's in the bag? Chicken Wings? Booby tassels?",
    "I had a mother lined up for you but she's bangin' the Pepperidge Farm guy",
    "I Don't Want to go to Jail - I'm fragile",
    "Here are some aspirin. they make your head seem smaller",
    "It's hard to soar with the eagles, when you're surrounded by turkeys",
    "Now That's What I call High Quality H20!",
    "The hideousness of that foot will haunt my dreams forever",
    "If you don't like spaghetti and meatballs, why don't you get the hell out",
    "So two guys you were best friends with in law school fell in love with each other?",
    "This is bullshit! Should have same rules for everyone, no matter what age!",
    "You're My Closest Friend, And I don't even Like you",
    "Lately, your low self-esteem is just good common sense.",
    "Just do it or I'll light my hair on fire and start punching myself in the face!",
    "I got wicked bad frost bite when I was in the scouts",
    "You're wrong Colonel Sanders",
    "when did Ben Franklin invent electricity?",
    "You don't have what they call the social skills",
    "you said it was going to be a touchdown pass, you crazy asshole",
    "mama say that happiness is from magic rays of sunshine that come down when you feelin blue",
    "that's why you never have any friends, 'cept fo yo mama",
    "deh ever catch dat gorilla that busted outa zoo and punched you in da eye?",
    "gatorade not only quenches your thirst better, it tastes better too, idiot",
    "How did I get into these pajamas?",
    "Only you and my grandfather go every thirty seconds.",
    "He didn't invent shit. He made his money suing the Dodgers after he got hit by a foul ball.",
    "I'll be taking acting classes and become the next Miley Cyrus",
    "are you going to go to your Hooters reunion? And talk about who's ass sticks out the most while wearing your shorts?",
    "Koufax is a good egg, he was nice to that kid. But he fights like a girl.",              
    "Why don't I just go eat some hay, make things out of clay, lay by the bay?",
    "It's all in the hips. It's all in the hips. It's all in the hips",
    "He got me, but I tore one of the bastard's eyes out though",
    "You ain't cool unless you pee your pants",
    "Why don't you just go home, are you too good for your home?",
    "I don't know how to fight, I'm a comedian!",
    "You are the worst wedding singer in the world buddy",
    "Chlorophyll? More Like BORophyll!!",
    "the cops zapped him with a taser until he went bald!",
    "Donkey Kong Sucks!",
    "I gotta send him back to the South Pole",
    "Suntan lotion is good for me",
    "Chemistry is good when you make love with it. Chemistry is bad when you make crack with it",
    "Well, we're living in a material world, and I'm a material girl... or boy.",
    "Well I have a microphone and you don't so you will listen to every damn word I have to say",
    "YOU'RE GOING TO DIE, CLOWN!",
    "You ain't cool unless you pee your pants",
    "AHAHAHA SHUT UP!",
    "Once again that could have been brought to my attention YESTERDAY!",
    "OH all I wanna do is grow old with you",
    "Carry you around when your arthritis is bad",
    "Ta-Ta-Ta Today Junior!",
    "Will somebody get the kid A HAPPY MEAL!?",
    "YOU CAN DO IT!",
    "Golf requires goofy pants and a fat ass",
    "Alcohol equals puke equals smelly equals nobody likes you ",
    "Alligators are ornery 'cause of their Medula Oblongata"
    ]

//function to choose random array 
function chooseRandom(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];  
}

//random array
var phrase = chooseRandom(otherArray)

var tweetSandler = function () {
//====================QUERY =========================================
  var params = {q: '#MAGA', count: 50};
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);

      var all_tweets = new Array();
      for (var i = 0; i < tweets.statuses.length; i++) {
          all_tweets.push({
              "screen_name": tweets.statuses[i].user.screen_name,
              "location": tweets.statuses[i].user.location,
              "text": tweets.statuses[i].text
          })
      };


//================RANDOMIZED ===========================================
 
//create random element
  random_element = Math.floor(Math.random() * all_tweets.length) + 1;

 // choose a random tweet
  selected_tweet = all_tweets[random_element];

  if (!(selected_tweet in historic_tweets)) {
      //Push the selected tweet in historic tweets
      historic_tweets.push(selected_tweet);
      console.log("Yo " + selected_tweet.screen_name);
  }
      


  //============POST TWEET ===========================================
  //Test case for tweeting out 
  client.post('statuses/update', {status: "RT: YO @" + selected_tweet.screen_name + " " + selected_tweet.text + " " + phrase + " #TRUMP"}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
    }); 


//====================FS WRITE ==============================================
      fs.writeFile("contents.json", JSON.stringify(all_tweets, null, '\t'), (err) => {
          if(err) throw err;
          console.log('It\s saved!');
      })
    }
});
}

tweetSandler();
setInterval(tweetSandler, 1800000)
