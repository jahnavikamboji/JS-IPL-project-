const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");

const matchesFilePath = path.join("../Data/matches.csv");
//Find a player who has won the highest number of Player of the Match awards for each season.
function wonTheMatchAwards(){
    let playerAwards = {};
    csvToJson().fromFile(matchesFilePath).then((matches) => {
        matches.forEach((match) => {
            let season = match.season;
            let player = match.player_of_match;

            if (player) {
                if (!playerAwards[season]) {
                    playerAwards[season] = {}; 
                }
                playerAwards[season][player] = (playerAwards[season][player] || 0) + 1; 
            };
        });  
        let wonPlayerAwards = {};
        for (let season in playerAwards) {
            let maxPlayer = Object.entries(playerAwards[season]).reduce((max, player) =>
                player[1] > max[1] ? player : max
            );

            wonPlayerAwards[season] = maxPlayer[0];
        }
        console.log(wonPlayerAwards);
        fs.writeFileSync("../public/output/6-won-the-match-awards.json", JSON.stringify(wonPlayerAwards));
    });   
}
wonTheMatchAwards();