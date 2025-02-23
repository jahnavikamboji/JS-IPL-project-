const path = require("path");
const fs = require("fs");
const matches = require("../Data/matches.json");
const deliveries = require("../Data/deliveries.json");
//Extra runs conceded per team in the year 2016.
function extraRunsConceded() {
  let matchIds = matches
    .filter((match) => match.season === "2016")
    .map((match) => match.id);
  const extraRunsPerTeam2016 = deliveries.reduce((acc, delivery) => {
    const team = delivery.bowling_team;
    const extraRuns = Number(delivery.extra_runs);
    acc[team] = (acc[team] || 0) + extraRuns;
    return acc;
  }, {});
  //console.log(matchIds);
  console.log(extraRunsPerTeam2016);

  function writeFile(data) {
    const writePath = path.join(__dirname, "../public/output/3-extra-runs-conceded-per-team.json");
    fs.writeFileSync(writePath, JSON.stringify(data, null, 2), "utf8");
  }
}
extraRunsConceded();
