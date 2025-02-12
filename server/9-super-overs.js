const csvToJson = require("csvtojson");
const fs = require("fs");
const path = require("path");

const deliveriesFilePath = path.join("../Data/deliveries.csv");

// Find the bowler with the best economy in super overs.
function superOverDeliveries() {
    csvToJson().fromFile(deliveriesFilePath).then((data) => {
        let bowlers = data.reduce((acc, curr) => {
            if (curr.is_super_over == 1) {  
                let bowler = curr.bowler;
                let wideRuns = +curr.wide_runs;
                let noBallRuns = +curr.noball_runs;
                let batsmanRuns = +curr.batsman_runs;
                
                if (!acc[bowler]) {
                    acc[bowler] = {
                        no_of_balls: wideRuns > 0 || noBallRuns > 0 ? 0 : 1,
                        no_of_runs: wideRuns + noBallRuns + batsmanRuns
                    };
                } else {
                    acc[bowler].no_of_balls += wideRuns > 0 || noBallRuns > 0 ? 0 : 1;
                    acc[bowler].no_of_runs += wideRuns + noBallRuns + batsmanRuns;
                }
            }
            return acc;
        }, {});

        let superEconomy = Object.entries(bowlers)
            .map(([bowler, stats]) => ({
                bowler: bowler,
                economy: ((stats.no_of_runs * 6) / stats.no_of_balls).toFixed(2)
            }))
            .sort((a, b) => a.economy - b.economy);
     
        let bestBowler = superEconomy[0] || {};
        fs.writeFileSync("../public/output/9-super-overs.json", JSON.stringify(bestBowler, null, 2));

        console.log(bestBowler);
    });
}

superOverDeliveries();
