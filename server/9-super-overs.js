const path = require("path");
const fs = require("fs");
const deliveries = require("../Data/deliveries.json");
//Find the bowler with the best economy in super overs.
function superOverDeliveries() {
  let bowlers = {};
  let result = deliveries.reduce((acc, element) => {
    if (element.is_super_over == 1) {
      if (!acc[element.bowler]) {
        acc[element.bowler] = {
          no_of_balls: element.wide_runs > 0 || element.noball_runs > 0 ? 0 : 1,
          no_of_runs:
            parseInt(element.wide_runs) +
            parseInt(element.noball_runs) +
            parseInt(element.batsman_runs),
        };
      } else {
        let val = acc[element.bowler];
        (val.no_of_balls += element.wide_runs > 0 || element.noball_runs > 0 ? 0 : 1),
          (val.no_of_runs +=
            parseInt(element.wide_runs) +
            parseInt(element.noball_runs) +
            parseInt(element.batsman_runs));
        acc[element.bowler] = val;
      }
    }
    return acc;
  }, {});

  const super_economy = [];
  for (let element in result) {
    let val = ((result[element].no_of_runs * 6) / result[element].no_of_balls).toFixed(2);
    super_economy.push({ [element]: val });
  }

  super_economy.sort((a, b) => {
    let valA = Object.values(a)[0];
    let valB = Object.values(b)[0];

    return valA - valB;
  });
  let jsonData = JSON.stringify(super_economy[0]);
  function writeFile(data) {
    const writePath = path.join(__dirname,"../public/output/9-super-overs.json");
    fs.writeFileSync(writePath, JSON.stringify(data, null, 2), "utf8");
  }
}
superOverDeliveries();
