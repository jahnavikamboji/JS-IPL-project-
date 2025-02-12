const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");

const matchesFilePath = path.join("../Data/matches.csv");
const deliveriesFilePath = path.join("../Data/deliveries.csv");
//Extra runs conceded per team in the year 2016.
function extraRunsConceded(){
csvToJson()
  .fromFile(matchesFilePath)
  .then((matches) => {
   
    let matchIds = matches.filter((match) => match.season === "2016").map((match) => match.id);

    csvToJson()
      .fromFile(deliveriesFilePath)
      .then((deliveries) => {
        const extraRunsPerTeam2016 = deliveries.reduce((acc, delivery) => {
            const team = delivery.bowling_team;
            const extraRuns = Number(delivery.extra_runs);
            acc[team] = (acc[team] || 0) + extraRuns;
            return acc;
         }, {});
         //console.log(matchIds);
         console.log(extraRunsPerTeam2016); 
        fs.writeFileSync("../public/output/3-extra-runs-conceded-per-team.json", JSON.stringify(extraRunsPerTeam2016,null,2));
         
      });
   });
}
extraRunsConceded()







