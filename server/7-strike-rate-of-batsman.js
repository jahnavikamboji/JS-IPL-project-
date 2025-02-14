const csvToJson = require("csvtojson");
const fs = require("fs");

// Find the strike rate of a batsman for each season
function strikeRateOfBatsman() {
    csvToJson().fromFile("../Data/matches.csv").then((matches) => {
        let matchSeason ={};
        for (let match of matches) {
            if (!matchSeason[match.season]) {
                matchSeason[match.season] = [];
            }
            matchSeason[match.season].push(match.id);
        }
        csvToJson().fromFile("../Data/deliveries.csv").then((deliveries) => {
            let result = {};
            for (let year in matchSeason) {
                result[year] = {};

                for (let delivery of deliveries) {
                    if (matchSeason[year].includes(delivery.match_id)) {
                        let batsman = delivery.batsman;
                        let runs = Number(delivery.batsman_runs);
                        let balls = delivery.wide_runs > 0 || delivery.noball_runs > 0 ? 0 : 1;
        
                        if (!result[year][batsman]) {
                            result[year][batsman] = { runs: 0, balls: 0 };
                        }
        
                        result[year][batsman].runs += runs;
                        result[year][batsman].balls += balls;
                    }
                }

                for (let batsman in result[year]) {
                    let player = result[year][batsman];
                    let strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : "0.00";

                    result[year][batsman] = strikeRate;
                }
            }
            
            //fs.writeFileSync("../public1/output/7-strike-rate-of-batsman.json", JSON.stringify(result,null,2)); 
        let jsonData = JSON.stringify(result, null, 2);
        fs.writeFileSync("../public/output/7-strike-rate-of-batsman.json", jsonData);
        });
    });
   
}
strikeRateOfBatsman();
