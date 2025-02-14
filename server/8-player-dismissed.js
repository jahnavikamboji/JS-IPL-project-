const csvToJson = require("csvtojson");
const fs= require("fs");

const deliveriesFilePath = "../Data/deliveries.csv";
//Find the highest number of times one player has been dismissed by another player.
function playerDismissed(){
    let dismissed = {};
    csvToJson()
    .fromFile(deliveriesFilePath).then((deliveries) => {
        deliveries.forEach(({ player_dismissed, bowler }) => {
            if (player_dismissed) {  
                dismissed[player_dismissed] = dismissed[player_dismissed] || {};
                dismissed[player_dismissed][bowler] = (dismissed[player_dismissed][bowler] || 0) + 1;
            }
        });

        let mostDismissed = 0,
        topBowler = null,
        topBatter = null;

        for (let batter in dismissed) {
            for (let bowler in dismissed[batter]) {
                if (dismissed[batter][bowler] > mostDismissed) {
                    mostDismissed = dismissed[batter][bowler];
                    topBowler = bowler;
                    topBatter = batter;
                }
            }
        }
        let result = { [topBatter]: { [topBowler]: mostDismissed } };
        console.log(result);
        fs.writeFileSync("../public/output/8-player-dismissed.json", JSON.stringify(result));
    });
}
playerDismissed();
