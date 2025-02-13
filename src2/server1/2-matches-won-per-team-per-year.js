const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");
//Number of matches won per team per year in IPL.
csvToJson().fromFile("../Data/matches.csv").then((matches) => {
    function wonTeamMatchesPerYear(matches){
        let matchesWonTeams = {};
        for(let matche of  matches){
            if(!matchesWonTeams[matche.season]){
                matchesWonTeams[matche.season] = {};
                matchesWonTeams[matche.season][matche.winner] = 1;
            }else{
                if (!matchesWonTeams[matche.season][matche.winner]) {
                    matchesWonTeams[matche.season][matche.winner] = 1;
            } else {
                    matchesWonTeams[matche.season][matche.winner] += 1;
               }
            }
        }
        fs.writeFileSync("../public1/output/2-matches-won-per-team-per-year.json", JSON.stringify(matchesWonTeams,null,2));
        return matchesWonTeams;
    }
    wonTeamMatchesPerYear(matches);   
});


