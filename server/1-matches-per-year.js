const path = require('path');
const fs = require('fs');
const matches = require("../Data/matches.json");

// Number of matches played per year for all the years in IPL.
function matchesPerYear(matches) {
  return matches.reduce((acc, match) => {
    acc[match.season] = (acc[match.season] || 0) + 1;
    return acc;
  }, {});
}

function writeFile(data) {
  const writePath = path.join(__dirname, '../public/output/1-matches-per-year.json');
  fs.writeFileSync(writePath, JSON.stringify(data, null, 2), 'utf8');
}

const matchesPerYearResult = matchesPerYear(matches);
console.log(matchesPerYearResult);
writeFile(matchesPerYearResult);
