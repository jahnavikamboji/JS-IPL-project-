const csvToJson = require("csvtojson");
const fs= require("fs");
const path = require("path");
//Number of matches played per year for all the years in IPL.
csvToJson().fromFile("../Data/matches.csv").then((matches) => {
    function matchesPerYear(matches){
        let matchesData = {};

    for (let index = 0; index < matches.length; index++) {
        if (!matchesData[matches[index].season]) {
          matchesData[matches[index].season] = 1;
        }
        else {
          matchesData[matches[index].season] = matchesData[matches[index].season] + 1;
        }
      }
      
        fs.writeFileSync("../public1/output/1-matches-per-year.json", JSON.stringify(matchesData,null,2));
       return matchesData; 
    }  
    console.log(matchesPerYear(matches));  
});


