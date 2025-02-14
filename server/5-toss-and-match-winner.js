const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");

const matchesFilePath = path.join("../Data/matches.csv");

//Find the number of times each team won the toss and also won the match
function tossAndMatchWinner(){
csvToJson()
  .fromFile(matchesFilePath).then((matches) => {
    let tossMatchWins = matches.reduce((acc, match) => {
      if (match.toss_winner === match.winner) {
        acc[match.winner] = (acc[match.winner] || 0) + 1;
      }
      return acc;
    }, {});
  
    console.log(tossMatchWins);
     fs.writeFileSync("../public/output/5-toss-and-match-winner.json", JSON.stringify(tossMatchWins));
  });
}
tossAndMatchWinner();

