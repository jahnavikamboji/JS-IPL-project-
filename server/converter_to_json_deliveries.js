const CSVtoJSON = require('csvtojson')
const path = require('path');
const fs = require('fs')

const filePath = path.join(__dirname, "../Data/deliveries.csv")
const outputFilePath = path.join(__dirname, "../Data/deliveries.json")

async function csvToJsonConversion(){
    let convertedData = await CSVtoJSON().fromFile(filePath)
    return convertedData
}
async function jsonWriteFile(deliveriesPromise) {
    let deliveries = await deliveriesPromise
    fs.writeFileSync(outputFilePath, JSON.stringify(deliveries,null,2), "utf-8")
}

const deliveriesPromise = csvToJsonConversion()
jsonWriteFile(deliveriesPromise)