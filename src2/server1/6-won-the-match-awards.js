const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");

const matchesFilePath = path.join("../Data/matches.csv");
//Find a player who has won the highest number of Player of the Match awards for each season.
function wonTheMatchAwards(){
    let playerAwards = {};
    csvToJson().fromFile(matchesFilePath).then((matches) => {
        for (const match of matches) {
            const season = match.season;
            const player = match.player_of_match;

            if (!playerAwards[season]) {
                playerAwards[season] = { [player]: 1 };
            } else {
                playerAwards[season][player] = (playerAwards[season][player] || 0) + 1;
            }
        }

        let playerOfMatch = {};
        for (const season in playerAwards) {
            let maxAwards = 0;
            let bestPlayer = "";

            for (const player in playerAwards[season]) {
                if (playerAwards[season][player] > maxAwards) {
                    maxAwards = playerAwards[season][player];
                    bestPlayer = player;
                }
            }
            playerOfMatch[season] = { [bestPlayer]: maxAwards };
        }
        console.log(playerOfMatch);
        fs.writeFileSync("../public1/output/6-won-the-match-awards.json", JSON.stringify(playerAwards));  


    });   
}   
wonTheMatchAwards();