const csvToJson = require("csvtojson");
const fs= require("fs");

//Number of matches played per year for all the years in IPL.
csvToJson().fromFile("../Data/matches.csv").then(matches => {
    function matchesPerYear(matches){
        // console.log(source);
        const matchesData = matches.reduce((acc, match) => {
            acc[match.season] = (acc[match.season] || 0) + 1;
            return acc;
        },{});    
        console.log(matchesData);
        fs.writeFileSync("../public/output/1-matches-per-year.json", JSON.stringify(matchesData,null,2));
        
    }  
    matchesPerYear(matches);  
});


















  


