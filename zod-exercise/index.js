const express = require ('express');
const zod = require('zod');
const app = express();

app.use(express.json());

const schema = zod.array(zod.number());
 
// {
//     email: string => email
//     password: atleast 8 letters
//     country: "IN", "US"
// }

const schema1 = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US"))
}) 

app.post('/health-checkup', function(req,res){
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    if(!response.success){
        res.status(411).json({
            msg: "input invalid"
        })
    }
    res.send({
        response
    })
});

app.post('/sign-in', function(req,res){
    const data = req.body;
    const response = schema1.safeParse(data)
    if(!response.success){
        res.status(411).json({
            msg: "input invalid"
        })
    }
    res.send({
        response
    })
})

app.listen(3000);