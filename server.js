const express = require('express');
const homeRouter = require('./express-server/routes/home.router');
const freindsRouter = require('./express-server/routes/friends.router');
const messagesRouter  = require('./express-server/routes/message.router');
const app = express();
const PORT = 3000;


app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const detal = Date.now() - start;
    console.log(`${req.method} & ${req.baseUrl} & ${req.url} & ${req.ip} & = ${detal}ms`);
})

app.use(express.json());
app.use(express.static('express-server/public'))
app.use('/',homeRouter);
app.use('/friends',freindsRouter);
app.use('/messages',messagesRouter);

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`));