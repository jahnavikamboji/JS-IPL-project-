//Number of matches won per team per year in IPL.
const path = require("path");
const fs = require("fs");
const matches = require("../Data/matches.json");

function wonTeamMatchesPerYear(matches) {
  const matchesWonData = matches.reduce((acc, match) => {
    if (match.winner) {
      acc[match.season] = acc[match.season] || {};
      acc[match.season][match.winner] =
        (acc[match.season][match.winner] || 0) + 1;
    }
    return acc;
  }, {});

  console.log(matchesWonData);
  function writeFile(data) {
    const writePath = path.join(__dirname, '../public/output/2-matches-won-per-team-per-year.json');
    fs.writeFileSync(writePath, JSON.stringify(data, null, 2), 'utf8');
  }
}
wonTeamMatchesPerYear(matches);
