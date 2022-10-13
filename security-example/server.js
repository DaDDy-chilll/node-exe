const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = 3000;

app.use(helmet());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/secret',(req,res)=>{
    res.send('Your secret is 42!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`);
})