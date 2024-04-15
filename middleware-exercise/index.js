const express = require('express');

const app = express();

app.use(express.json());

app.post('/health-checkup', function(req,res){
    const kidneys = req.body.kidneys;
    if(!kidneys){
        res.json({
            msg: "wrong inputs"
        })
    }
});

app.listen(3000)