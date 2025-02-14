const csvToJson = require("csvtojson");
const fs= require("fs");

const matchesFilePath = "../Data/matches.csv";
const deliveriesFilePath ="../Data/deliveries.csv";
//Top 10 economical bowlers in the year 2015.
function top10EconomicalBowler(){
    let bowlersData = {};
csvToJson()
  .fromFile(matchesFilePath).then((matches) => {
    let matchIds2015 = matches
    .filter((match) => match.season === "2015").map((match) => match.id);

    csvToJson()
    .fromFile(deliveriesFilePath).then((deliveries) => {
             
    for (let delivery of deliveries) {
        if (!matchIds2015.includes(delivery.match_id));

        let bowler = delivery.bowler;
        let runs = Number(delivery.total_runs);
        let isDelivery = delivery.wide_runs == 0 && delivery.noball_runs == 0;

        if (!bowlersData[bowler]) {
            bowlersData[bowler] = { runs: 0, balls: 0 };
        }
    
        bowlersData[bowler].runs += runs;
        if (isDelivery) bowlersData[bowler].balls +=1;
    }
    
    let bowlersEconomy = Object.entries(bowlersData)
        .map(([bowler, data]) => [bowler, (data.runs * 6) / data.balls])
        .sort((a, b) => b[1] - a[1]) 
    
    
    let economicBowlers = Object.fromEntries(bowlersEconomy.slice(0, 10));
    console.log(economicBowlers);
     fs.writeFileSync("../public/output/4-top-10-economical-bowlers-2015.json", JSON.stringify(economicBowlers));
    
     });

    });
    //console.log(top10EconomicalBowler);
}
top10EconomicalBowler();
