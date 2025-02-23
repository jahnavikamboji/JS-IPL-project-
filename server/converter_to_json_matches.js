const CSVtoJSON = require("csvtojson");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../Data/matches.csv");
const outputFilePath = path.join(__dirname, "../Data/matches.json");


async function csvToJsonConverter() {
    const convertedData = await CSVtoJSON().fromFile(filePath)
    console.log(convertedData);

    return convertedData
}
async function jsonWriteFile(matchesPromise) {
    let matches = await matchesPromise
    fs.writeFileSync(outputFilePath, JSON.stringify(matches, null,2), "utf-8")  ;
}

let matchesPromise = csvToJsonConverter()
jsonWriteFile(matchesPromise)