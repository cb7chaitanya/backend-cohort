const express = require('express')
const app = express()

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json()) 
app.get("/", function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i=0; i<johnKidneys.length; i++){
        if (johnKidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post('/', function(req,res){
    console.log(req.body)
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put('/', function(req,res){
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete("/", function(req,res){
    if(isThereAnyUnhealthyKidneys()){
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy: false
            })
        }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})
    } else {
        res.status(411).json({msg: "error"})
    }
})

function isThereAnyUnhealthyKidneys(){
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            return true;
        }
    }
    return false;
}
app.listen(3000)