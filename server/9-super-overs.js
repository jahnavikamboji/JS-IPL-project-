const csvToJson = require("csvtojson");
const fs= require("fs");

const deliveriesFilePath = "../Data/deliveries.csv";
//Find the bowler with the best economy in super overs.
function superOverDeliveries(){
    let bowlers = {};
    csvToJson()
    .fromFile(deliveriesFilePath).then((data) => {
        let res = data.reduce( (acc,ele) => {
            if(ele.is_super_over == 1){
                if(!acc[ele.bowler]){
                    acc[ele.bowler] = {
                        no_of_balls : ele.wide_runs > 0 || ele.noball_runs > 0 ? 0 : 1,
                        no_of_runs : parseInt(ele.wide_runs)+parseInt(ele.noball_runs) + parseInt(ele.batsman_runs)
                    } 
                }else{
                    let val = acc[ele.bowler]
                        val.no_of_balls += ele.wide_runs > 0 || ele.noball_runs > 0 ? 0 : 1,
                        val.no_of_runs += parseInt(ele.wide_runs)+parseInt(ele.noball_runs) + parseInt(ele.batsman_runs);
                        acc[ele.bowler] = val;
                }
            }
            return acc;
        },{})
    
        const super_economy = [];
        for(let ele in res){
            let val = ((res[ele].no_of_runs*6)/res[ele].no_of_balls).toFixed(2);
            super_economy.push( {[ele] : val});
        }
    
        super_economy.sort((a, b) => {
            let valA = Object.values(a)[0]; 
            let valB = Object.values(b)[0];
    
            return valA - valB;
        });
        let jsonData = JSON.stringify(super_economy[0]);
        fs.writeFileSync("../public/output/9-super-overs.json", jsonData);
    });
}

superOverDeliveries();

