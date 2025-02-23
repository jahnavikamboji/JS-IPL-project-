const path = require("path");
const fs = require("fs");
const matches = require("../Data/matches.json");
//Find a player who has won the highest number of Player of the Match awards for each season.
function wonTheMatchAwards() {
  let playerAwards = {};
  matches.forEach((match) => {
    let season = match.season;
    let player = match.player_of_match;

    if (player) {
      if (!playerAwards[season]) {
        playerAwards[season] = {};
      }
      playerAwards[season][player] = (playerAwards[season][player] || 0) + 1;
    }
  });
  let wonPlayerAwards = {};
  for (let season in playerAwards) {
    let maxPlayer = Object.entries(playerAwards[season]).reduce((max, player) =>
      player[1] > max[1] ? player : max
    );

    wonPlayerAwards[season] = maxPlayer[0];
  }
  console.log(wonPlayerAwards);
  function writeFile(data) {
    const writePath = path.join(__dirname,"../public/output/6-won-the-match-awards.json");
    fs.writeFileSync(writePath, JSON.stringify(data, null, 2), "utf8");
  }
}
wonTheMatchAwards();
