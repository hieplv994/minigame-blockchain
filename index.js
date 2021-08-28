var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/scripts', express.static(__dirname+"/node_modules/web3.js-browser/build/"));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Mini Game App listening at http://localhost:${5000}`)
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

//Mongo DB Conect
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://minigame:akQNcBihm5RZsEl5@cluster0.yerfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if(err){
            console.log('Mongo DB Conect Error: ', err)
        }else{
            console.log('Mongo DB Conect Success')
        }
    }
);

//minigame akQNcBihm5RZsEl5

require('./controllers/game')(app);