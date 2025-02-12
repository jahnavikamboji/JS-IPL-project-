const csvToJson = require("csvtojson");
const fs = require("fs");

// Find the strike rate of a batsman for each season
function strikeRateOfBatsman() {
    csvToJson().fromFile("../Data/matches.csv").then((matches) => {
        let matchSeasonMap = matches.reduce((acc, match) => {
            if (!acc[match.season]) {
                acc[match.season] = [];
            }
            acc[match.season].push(match.id);
            return acc;
        }, {});

        csvToJson().fromFile("../Data/deliveries.csv").then((deliveries) => {
            let result = {};

            for (let year in matchSeasonMap) {
                result[year] = {};

                deliveries.forEach((delivery) => {
                    if (matchSeasonMap[year].includes(delivery.match_id)) {
                        let batsman = delivery.batsman;
                        let runs = Number(delivery.batsman_runs);
                        let balls = delivery.wide_runs > 0 || delivery.noball_runs > 0 ? 0 : 1;

                        if (!result[year][batsman]) {
                            result[year][batsman] = { runs: 0, balls: 0 };
                        }

                        result[year][batsman].runs += runs;
                        result[year][batsman].balls += balls;
                    }
                });

                for (let batsman in result[year]) {
                    let player = result[year][batsman];
                    let strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : "0.00";

                    result[year][batsman] = strikeRate;
                }
            }

            let jsonData = JSON.stringify(result, null, 2);
            fs.writeFileSync("../public/output/7-strike-rate-of-batsman.json", jsonData);
        });
    });
}

strikeRateOfBatsman();
