const csvToJson = require("csvtojson");
const fs= require("fs");

const matchesFilePath = "../Data/matches.csv";
//Find the number of times each team won the toss and also won the match
function tossAndMatchWinner(){
csvToJson()
  .fromFile(matchesFilePath).then((matches) => {
    let tossMatchWins = {};
    for (let match of matches){
        if(match.toss_winner === match.winner){
          let team = match.winner;
          tossMatchWins[team] = (tossMatchWins[team] || 0) + 1; 
        }
    }
    console.log(tossMatchWins);
     fs.writeFileSync("../public/output/5-toss-and-match-winner.json", JSON.stringify(tossMatchWins));
  });
}
tossAndMatchWinner();