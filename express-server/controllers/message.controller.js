const path = require('path');

function getMessages (req,res){
    // res.sendFile(path.join(__dirname,'..','public','img','skimountain.jpg'));
    res.sendFile(path.join(__dirname,'..','public','index.html'))
    // res.send('<ul><li>Hello DaDDy!///</li></ul>');
}
module.exports = getMessages