//  modules

let express = require('express')
let app = express()

//  body parser
let bodyParser = require('body-parser')

//  http
var server  = require('http').createServer(app);
//  socket io
var io      = require('socket.io').listen(server);

//  port
let port = process.env.PORT || 5000

var salons = [];

// Template engine
app.set('view engine', 'ejs')

//  Our MiddleWare
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//  Our Routes

//  get index
app.get('/', (request,response) => {
    response.render('pages/index')
})

//  get offline
app.get('/offline', (request,response) => {
    response.render('pages/offline')
})

//  get connexion
app.get('/connexion', (request,response) => {
    response.render('pages/connexion')
})

//  post testConnexion
app.post('/connexion', (request,response) => {

    let sn = request.body.salonName;
    indexS=indexOfSalon(sn);

    //  pas de salon existant , creer nouveau salon
    if( indexS == -1 ) {
        //  add salon
        salons.push({"name":sn,"nb":0})
        //  add namespace
        var nsp = io.of('/salon/'+sn);
        nsp.on('connection', function(socket){
            addClient(sn)
            socket.on('disconnect', function (noteId) {
               removeClient(sn)
            });
            socket.on('emitNote', function (noteId) {
               socket.broadcast.emit('emitNote',noteId)
            });
        })
    }
    //  redirect to salon
    response.redirect('/salon/'+sn);
})

//  get salon
app.get('/salon/*', (request,response) => {
    let url = request.url;
    let sn =  url.substr(7, url.length)
    indexS=indexOfSalon(sn);

    //  salon non existant
    if(indexS==-1) {
        response.render('pages/404', {nomSalon: sn})
    }
    else {
        response.render('pages/salon', {nomSalon: sn})
    }
})
server.listen(port , function () {
    console.log("server running ...")
})



//  Fonction aide
function indexOfSalon(nomS) {
    for(i in salons) {
        if(salons[i].name == nomS) {
            return(i)
        }
    }
    return(-1)
}
function addClient(nomS) {
    for(i in salons) {
        if(salons[i].name == nomS) {
            salons[i].nb++
        }
    }
}
function removeClient(nomS) {
    for(i in salons) {
        if(salons[i].name == nomS) {
            salons[i].nb--
            if(salons[i].nb==0) {
                salons.splice(i,1)
            }
        }
    }
}
