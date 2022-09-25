const express = require('express');
const app = express();
const PORT = 3000;
const friends = [
    {
        id:0,
        name:'Google',
    },
    {
        id:1,
        name:'Mircrosoft',
    },
    {
        id:2,
        name:'Cisco',
    }
];

app.use((req,res,next)=>{
    const start = Date.now();
    next();
    const detal = Date.now() - start;
    console.log(`${req.method} & ${req.url} = ${detal}ms`);
})

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.get('/friends',(req,res)=>{
    res.send(friends);
});

app.get('/friends/:friendId',(req,res)=>{
    const friendId = Number(req.params.friendId);
    const friend = friends[friendId];
    if (friend) {
        res.status(200).json(friend)
    }else{
        res.json({
            error:'friend does not exist!'
        });
    }

});

app.post('/friends',(req,res)=>{
    if(!req.body.name){
        return res.status(400).json({
            error:'Missing friend name...'
        })
    }
        const newFriend = {
            name:req.body.name,
            id:friends.length,
        };
        friends.push(newFriend);
        res.json(newFriend);
    
    // console.log('hello'); above return keyword is main
})

app.get('/message',(req,res)=>{
    res.send('<ul><li>Hello DaDDy!///</li></ul>');
});
app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`));