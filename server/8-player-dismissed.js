const csvToJson = require("csvtojson");
const fs= require("fs");

const deliveriesFilePath = "../Data/deliveries.csv";
//Find the highest number of times one player has been dismissed by another player.
function playerDismissed(){
    let dismissed = {};
    csvToJson()
    .fromFile(deliveriesFilePath).then((deliveries) => {
        for (let delivery of deliveries) {
            const { player_dismissed, bowler } = delivery;
            if (player_dismissed) {
                dismissed[player_dismissed] = dismissed[player_dismissed] || {};
                dismissed[player_dismissed][bowler] = (dismissed[player_dismissed][bowler] || 0) + 1;
            }
        }
        let result = Object.entries(dismissed).reduce((acc, [batter, bowlers]) => {
            Object.entries(bowlers).forEach(([bowler, dismissals]) => {
                if (dismissals > acc.mostDismissed) {
                    acc.mostDismissed = dismissals;
                    acc.topBowler = bowler;
                    acc.topBatter = batter;
                }
            });
            return acc;
        }, { mostDismissed: 0, topBowler: null, topBatter: null });
        
        let finalResult = { [result.topBatter]: { [result.topBowler]: result.mostDismissed } };
        console.log(finalResult);
        fs.writeFileSync("../public/output/8-player-dismissed.json", JSON.stringify(result,null,2));
    });
}
playerDismissed();
