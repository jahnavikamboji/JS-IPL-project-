const path = require("path");
const fs = require("fs");
const matches = require("../Data/matches.json");
//Find the number of times each team won the toss and also won the match
function tossAndMatchWinner(){
    let tossMatchWins = {};
    for (let match of matches){
        if(match.toss_winner === match.winner){
          let team = match.winner;
          tossMatchWins[team] = (tossMatchWins[team] || 0) + 1; 
        }
    }
    console.log(tossMatchWins);
     function writeFile(data) {
        const writePath = path.join(__dirname,"../public/output/5-toss-and-match-winner.json");
        fs.writeFileSync(writePath, JSON.stringify(data, null, 2), "utf8");
      }
}
tossAndMatchWinner();