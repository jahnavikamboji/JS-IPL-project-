const csvToJson = require("csvtojson");
const fs= require("fs");

const matchesFilePath = "../Data/matches.csv";
// Compute average match score per season
csvToJson().fromFile(matchesFilePath).then((matches) => {
const seasonStats = matches.reduce((acc, match) => {
    const season = match.season;
    const totalScore = (match.win_by_runs) +(match.win_by_wickets);

    if (!acc[season]) {
        acc[season] = { totalScore: 0, matchCount: 0 };
    }

    acc[season].totalScore += totalScore;
    acc[season].matchCount += 1;

    return acc;
}, {});

//  highest average score season
const highestSeason = Object.entries(seasonStats)
    .map(([season, data]) => ({ season, avgScore: data.totalScore / data.matchCount }))
    .reduce((max, curr) => (curr.avgScore > max.avgScore ? curr : max));

console.log(`Season with highest average match score: ${highestSeason.season} with ${highestSeason.avgScore.toFixed(2)} average score`);
});