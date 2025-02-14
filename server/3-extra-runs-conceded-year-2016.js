const csvToJson = require("csvtojson");
const fs= require("fs");

const matchesFilePath ="../Data/matches.csv";
const deliveriesFilePath ="../Data/deliveries.csv";
//Extra runs conceded per team in the year 2016.
csvToJson()
  .fromFile(matchesFilePath)
  .then((matches) => {
    csvToJson()
      .fromFile(deliveriesFilePath)
      .then((deliveries) => {
        function extraRunsPerTeam2016() {
          let extraRunsConceded = {};

          for (const match of matches) {
            if (match.season == "2016") { 
              for (const delivery of deliveries) {
                if (match.id == delivery.match_id) {
                  const bowlingTeam = delivery.bowling_team;
                  const extraRuns = Number(delivery.extra_runs);

                  extraRunsConceded[bowlingTeam] = (extraRunsConceded[bowlingTeam] || 0) + extraRuns;
                }
              }
            }
          }
          fs.writeFileSync("../public/output/3-extra-runs-conceded-year-2016.json", JSON.stringify(extraRunsConceded,null,2));
          console.log("Extra runs conceded per team in 2016:", extraRunsConceded);
        }

        extraRunsPerTeam2016();
      });
  });



         
    
  



// let matchIds = matches.filter((match) => match.season === "2016").map((match) => match.id)


// const extraRunsPerTeam2016 = deliveries.reduce((acc, delivery) => {
//   const team = delivery.bowling_team;
//   const extraRuns = Number(delivery.extra_runs);
//   acc[team] = (acc[team] || 0) + extraRuns;
//   return acc;
// }, {});
// //console.log(matchIds);
// console.log(extraRunsPerTeam2016); 

