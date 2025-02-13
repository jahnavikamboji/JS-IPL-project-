const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");

const matchesFilePath = path.join ("../Data/matches.csv");
const deliveriesFilePath = path.join("../Data/deliveries.csv");
//Top 10 economical bowlers in the year 2015.
function top10EconomicalBowler(){
    let bowlersData = {};
csvToJson()
  .fromFile(matchesFilePath).then((matches) => {
    let matchIds2015 = [];
    for (const match of matches) {
        if (match.season === "2015") {
            matchIds2015.push(match.id);
        }
    }    
    csvToJson()
    .fromFile(deliveriesFilePath).then((deliveries) => {
        for (const delivery of deliveries) {
            if (!matchIds2015.includes(delivery.match_id)) {
                continue;
            }
            let bowler = delivery.bowler;
            let runs = Number(delivery.total_runs);
            let isDelivery = delivery.wide_runs == 0 && delivery.noball_runs == 0;
            if (!bowlersData[bowler]) {
                bowlersData[bowler] = { runs: 0, balls: 0 };
            }
            bowlersData[bowler].runs += runs;
            if (isDelivery) {
                bowlersData[bowler].balls += 1;
            }
        }
        let bowlersEconomy = [];

        for (const [bowler, data] of Object.entries(bowlersData)) {
            let economy = (data.runs * 6) / data.balls;
            bowlersEconomy.push([bowler, economy]);
        }

        for (let i = 0; i < bowlersEconomy.length - 1; i++) {
            for (let j = i + 1; j < bowlersEconomy.length; j++) {
                if (bowlersEconomy[i][1] > bowlersEconomy[j][1]) {
                    [bowlersEconomy[i], bowlersEconomy[j]] = [bowlersEconomy[j], bowlersEconomy[i]];
                }
            }
        }
        let top10Bowlers = {};
        let count = 0;
        for (const [bowler, economy] of bowlersEconomy) {
            if (count < 10) {
                top10Bowlers[bowler] = economy;
                count++;
            } else {
                break;
            }
        }
        console.log(top10Bowlers);
        fs.writeFileSync("../public1/output/4-top-10-economical-bowlers-2015.json", JSON.stringify(bowlersData));
    //console.log(top10EconomicalBowler);
        
    });
});
}
top10EconomicalBowler();
