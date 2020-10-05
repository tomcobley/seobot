const http = require('http');
const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
app.use(express.json());
// app.use(express.static("frontend/public"));
app.use("/assets", express.static(path.join(__dirname, "frontend/public")));
app.use("/clipboard", express.static(path.join(__dirname, "node_modules/clipboard")));


// check if key for BigCommerce GraphQL API exists
const bcKeyPath = './.bigcommerce-graphql-api-key.txt';
var bcKey;
if (fs.existsSync(bcKeyPath)) {
    fs.readFile(bcKeyPath, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + bcKeyPath, data);
        bcKey = data;
    });
}

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/frontend/views');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    extname      : 'hbs',
    layoutsDir   : __dirname + '/frontend/views/layouts',
    partialsDir  : __dirname + '/frontend/views/partials',
    defaultLayout: 'main'
    // helpers      : 'path/to/helpers/directory',
}));

app.use(express.static('public'));
app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {
        layout : 'index',
        bcKey  : bcKey
    });
});

// default URL for website
// app.use('/', function(req,res){
//     res.sendFile(path.join(__dirname+'/express/index.html'));
// });

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);



// new ClipboardJS('.btn');
