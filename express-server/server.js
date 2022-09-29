const express = require('express');
const path = require('path')
const homeRouter = require('./routes/home.router');
const freindsRouter = require('./routes/friends.router');
const messagesRouter  = require('./routes/message.router');
const app = express();
const PORT = 3000;


app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const detal = Date.now() - start;
    console.log(`${req.method} & ${req.baseUrl} & ${req.url} & ${req.ip} & = ${detal}ms`);
})

app.use(express.json());
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use('/site',express.static(path.join(__dirname,'public')))
app.use('/',homeRouter);
app.use('/friends',freindsRouter);
app.use('/messages',messagesRouter);

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`));