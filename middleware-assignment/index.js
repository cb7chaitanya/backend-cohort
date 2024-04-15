const express = require('express');

const app = express();

const requestTimes = [];

app.use((req,res,next)=>{
    const start = Date.now();
    res.on('finish',()=>{
        const end = Date.now();
        const elapsed = end - start;
        requestTimes.push(elapsed);
    });
    next();
})

function calculateAverageTime() {
    const averageTime = requestTimes.length > 0 ? requestTimes.reduce((acc, curr) => acc + curr, 0) / requestTimes.length : 0;
    return averageTime;
}

function calculateRequestCount() { 
    const requestCount = requestTimes.length;
    return requestCount;
}

app.get('/request-count', (req, res) => {
    const requestCount = calculateRequestCount();
    res.send(`Request count: ${requestCount}`);
});

app.get('/average-time', (req, res) => {
    const averageTime = calculateAverageTime();
    res.send(`Average time: ${averageTime}ms`);
});

app.listen(3001)