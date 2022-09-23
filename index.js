const http = require('http');
const PORT =3000;
const server = http.createServer();
const friends = [
    {
        id:0,
        name:'DaDDy Chill',
    },
    {
        id:1,
        name:'Tesla',
    },{
        id:2,
        name:'Google',
    },{
        id:3,
        name:'Microsoft',
    },{
        id:4,
        name:'Cisco',
    }
]
server.on('request',(req,res)=>{
    // res.writeHead(200,{
    //     'Content-type':'application/json'
    // })
    const items = req.url.split('/');
    if(req.method === 'POST' && items[1] === 'friends'){
        req.on('data',(data)=>{
            const firend = data.toString();
            console.log('Request',firend);
            friends.push(JSON.parse(firend));
        });
        req.pipe(res);
    }else if(req.method === 'GET' && items[1] === 'friends'){
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        if(items.length === 3 ){
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        }else{
            res.end(JSON.stringify(friends))
        }
    }else if(req.method === 'GET' && items[1] === 'message'){
        res.statusCode=200;
        res.setHeader('Content-type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello World</li>');
        res.write('<li>Welcome to my New World!</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }else if(req.method === 'GET' && items[1] === ''){
        res.statusCode=200;
        res.setHeader('Content-type','text/plain');
        res.end('This is Home Page!');
    }else{
        res.statusCode=404;
        res.setHeader('content-type','text/html');
        res.write('<h1>Your request is not defined</h1>');
        res.end('Please request friends and message');
    }
   
})

server.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`))