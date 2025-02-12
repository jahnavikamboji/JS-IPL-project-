//Number of matches won per team per year in IPL.
const csvToJson = require("csvtojson");
const fs= require("fs");

csvToJson().fromFile("../Data/matches.csv").then(source => {
    function wonTeamMatchesPerYear(source){
        const matchesWonData = source.reduce((acc, match) => {
            if (match.winner) {
                acc[match.season] = acc[match.season] || {};
                acc[match.season][match.winner] = (acc[match.season][match.winner] || 0) + 1;
            }
            return acc;
        }, {});
        
        console.log(matchesWonData);
         fs.writeFileSync("../public/output/2-matches-won-per-team-per-year.json", JSON.stringify(matchesWonData,null,2));
    }
    wonTeamMatchesPerYear(source);
   
});



