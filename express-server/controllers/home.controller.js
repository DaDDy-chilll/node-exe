function getHome(req,res){
    // res.send('Hello World!');
    res.render('index',{
        title:'Home'
    })
}

module.exports=getHome;