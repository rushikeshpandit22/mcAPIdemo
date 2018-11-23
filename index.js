const ET_Client = require('fuelsdk-node');
const client = new ET_Client('tzv6fcoi1oachkygw2hnvva9', 'l0sUcKPSJMZEHYxJE68eQG0v', 's7');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
var pug = require('pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine','pug');
var port = process.env.PORT || 3000;

app.post('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("request:- **********************************************************************\n"+ json.stringify(req)+"\n\n");
    console.log("responce:- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n"+ json.stringify(res)+"\n\n");
});
const props = ['Name'];
app.post('/getTableData', (req, res) => {
console.log(req.body);
    if (req.body.username == 'sfmc' && req.body.pwd == '1234') {
        client.dataExtensionRow({ props, Name: 'PandaAPIDE3' }).get((err, response) => {
        res.render('DisplayTableData', {data : response.body.Results});
        })
    }
    else {
        return res.redirect('/');
    }

});

app.listen(port, () => console.log('Gator app listening on port '+port+''));
