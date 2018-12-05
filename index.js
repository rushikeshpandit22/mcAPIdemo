const ET_Client = require('fuelsdk-node');
//const client = new ET_Client('tzv6fcoi1oachkygw2hnvva9', 'l0sUcKPSJMZEHYxJE68eQG0v', 's7');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
var pug = require('pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine','pug');
var port = process.env.PORT || 3000;
var jwt = require('jwt-simple');
var axios = require('axios');

var pg = require('pg');
var conString = "postgres://fpqxmoywayesyg:ae337dd3d3a2dd3f8c529e90091b04821f27530d21b2968bf580fee74dfcdc25@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d8rb6oab555lft";
pg.defaults.ssl = true;
pg.defaults.poolSize = 20;
var client = new pg.Client(conString);
client.connect();


app.post('/', (req, res) => {
       console.log(client);
   
      /*  var jwtToken = req.body.jwt;
        var secret = 
        'aPwkRdSokdV9CsilYuZN3StLLeaKPUbFZRmptaoDcpFiEa2pUMSPNfbniKG3p06IlFak9TKz9CW0tTnlt1xuSybQkV3kCjGWN8cCsxyAGfHcb_050k-XplzYQyAJLwuYHBzBuU8w0FUbMRij64HjYljIwniEwlry348T3PDBIbPpq5qLGbWgdnOaTiG5SBW4qigC5ALKgSIArrPYvZgPBZS1TKGpm5cs4K-OQ3v7j_q1-qDawDQzSKN9Fdtj5g2';
        var decode = jwt.decode(jwtToken,secret);
       var refreshToken = decode.request.rest.refreshToken;
       var authEndpoint = decode.request.rest.authEndpoint;
       var apiEndpointBase = decode.request.rest.apiEndpointBase; 
   // const client = new ET_Client('e91wco2s002d3dfz70r3m9f0', 'emdG17BLX14drPPNQ6QGmxMt', 's7');   
      axios.post(authEndpoint,{
            "clientSecret":"emdG17BLX14drPPNQ6QGmxMt",
            "clientId":"e91wco2s002d3dfz70r3m9f0",
            "refreshToken":refreshToken,
            "accessType": "offline"        
        }).then(response =>{
            var accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
            console.log(accessToken);
            //apiEndpointBase+'/hub/v1/campaigns'
            //'https://mcs53v5db9s0nn0nrb3kgsl9qly1.rest.marketingcloudapis.com/hub/v1/campaigns'
             axios.get(apiEndpointBase+'/hub/v1/campaigns',{
                headers: {
                "content-type": 'application/json',
                "authorization": "Bearer "+ accessToken
                }}).then(response => {
                    console.log("Campaigns Data================================");
                    console.log(response.data);
                }).catch( error => {
                    console.log("Get Campaigns ERROR");
                    console.log(error);
                });
            
        }).catch( error => {
        console.log("Get AccessToken ERROR");
        console.log(error);
        });*/
    
    
    
    
   /* const props = { 
        Name:'happyPanda', 
        Description:'happyPanda', 
        CustomerKey:'happyPandaXoXo', 
        Fields : { 
            Field : { 
                Name: 'Name', 
                FieldType: 'Text', 
                IsPrimaryKey: true, 
                MaxLength: 100, 
                IsRequired: true 
            } 
            } 
    }; 
    client.dataExtension({props}).post((err,response) => { 
        console.log(JSON.stringify(response)); 
        console.log("\n"+JSON.stringify(err)); 
    });*/

        res.sendFile(__dirname + '/index.html');
    
});
/*const props = ['Name'];
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

});*/

app.listen(port, () => console.log('Gator app listening on port '+port+''));
