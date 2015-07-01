var fs = require('fs');

var config = require('./config.js');

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var stream = config.stream('statuses/filter', { locations: uk })

stream.on('tweet', processTweet);

var log = fs.createWriteStream('tweets.log');

function processTweet(tweet) {
    var regexp = /[Cc]oding/g;
    if (regexp.test(tweet.text)){
        console.log(tweet.text);
        var strTweet = JSON.stringify(tweet);
        log.write(strTweet);
    }
};
