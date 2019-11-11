var friends = require("../data/friends");

//this will get all the friends that I have in friends.js as JSON.
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

// this receives details from the user and parseInt's the scores
    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        var user = req.body;

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

    // the first friend they find is the default but the minimum difference in the scores will be the person they are actually matched with.
        var friendIndex = 0;
        var minDifference = 30;


    // you begin with a difference of zero and the user score and friend are compared. The difference is added to the total difference.
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var d = 0; d < friends[i].scores.length; d++) {
                var difference = Math.abs(user.scores[d] - friends[i].scores[d]);
                totalDifference += difference;
            }
    // if new minimum score occurs, I change the index of friends and establish a new minimum score for the next time comparisons are made.
            if (totalDifference < minDifference) {
                friendIndex = i;
                minDifference = totalDifference;
            }
        }

    // when a match is made the user is added to the array of friends.
        friends.push(user);


    // this sends the best match back to the browser.
        res.json(friends[friendIndex]);
    });
};
