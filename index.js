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
var util = require('util');
var parseString = require('xml2js').parseString;

/*var conString = "postgres://fpqxmoywayesyg:ae337dd3d3a2dd3f8c529e90091b04821f27530d21b2968bf580fee74dfcdc25@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d8rb6oab555lft";
pg.defaults.ssl = true;
pg.defaults.poolSize = 20;
var client = new pg.Client(conString);
client.connect();*/
var accessToken = "",dataExtensionXML, queryXML, automationXML, SoapPreHeader, FinalXML = "";

SoapPreHeader = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
              <soapenv:Header>
              <fueloauth>`;

dataExtensionXML = `</fueloauth></soapenv:Header><soapenv:Body><CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI"><Options/><Objects xsi:type="DataExtension">
                     <Client>
                     <ID>7291811</ID>
                     </Client>
                     <Name>SFMC_App_Demo_DE</Name>
                     <CustomerKey>SFMC_App_Demo_DE_API</CustomerKey>
                     <Description>A place to track of what triggers are purposefully in an inactive state</Description>
                     <IsSendable>false</IsSendable>
                     <Fields>
                     <Field>
                     <Name>CustomerEmail</Name>
                     <MaxLength>50</MaxLength>
                     <IsRequired>true</IsRequired>
                     <Ordinal>1</Ordinal>
                     <IsPrimaryKey>true</IsPrimaryKey>
                     <FieldType>EmailAddress</FieldType>
                     </Field></Fields></Objects></CreateRequest></soapenv:Body></soapenv:Envelope>`;

queryXML = `</fueloauth></soapenv:Header>
   <soapenv:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
         <Options></Options>
         <Objects xsi:type="QueryDefinition">
            <PartnerKey xsi:nil="true"></PartnerKey>
            <ObjectID xsi:nil="true"></ObjectID>
            <CustomerKey>API QUERY ACTIVITY</CustomerKey>
            <Name>API QUERY ACTIVITY</Name>
            <Description>API QUERY ACTIVITY</Description>
            <QueryText>Select EmailAddress as CustomerEmail from [_Subscribers]</QueryText>
            <TargetType>DE</TargetType>
            <DataExtensionTarget>
               <PartnerKey xsi:nil="true"></PartnerKey>
               <ObjectID xsi:nil="true"></ObjectID>
               <CustomerKey>SFMC_App_Demo_DE_API</CustomerKey>
               <Name>SFMC_App_Demo_DE</Name>
            </DataExtensionTarget>
            <TargetUpdateType>Overwrite</TargetUpdateType>
         </Objects></CreateRequest></soapenv:Body></soapenv:Envelope>`;

app.get('/', function(request, response) {
   
 //response.send('Hello World!');
  response.redirect('/home');
 });

app.post('/home',(req, res)=>{ 
  var jwtToken = req.body.jwt;
       var secret = 
       'q4nNEJGT9Tto2978qbGRXXRR4oSTEoYFFYt4eBqT7eOxDyKdRlRKyK2sf8r38HTaQJnIEo7VM-rZmBZttqtUNdxiEIVIZTCCfKgPsWFoCJT9ybYHUW1h918LNBeJjSwjHUNEh6mjCGrZrsef1Su5bu7z9KXQAn6YCdbYAi-9kErwlLbLMZRCyhgTenb3UmkU5PTnOWTbifU9iet8eJVGElaozJRk19maxEWz7qqFQRw9S4SS5v7WQ4qbaDhdXQ2';
       var decode = jwt.decode(jwtToken,secret);
  
console.log("jwt"+util.inspect(req.body));
});


const props = ['Name'];
app.post('/getTableData', (req, res) => {
console.log(req.body);
    if (req.body.username == 'sfmc' && req.body.pwd == '1234') {
      //  client.dataExtensionRow({ props, Name: 'PandaAPIDE3' }).get((err, response) => {
        res.render('DisplayTableData', {data : response.body.Results});
      //  })
    }
    else {
        return res.redirect('/');
    }

});
app.get('/logout',(req, res)=>{
   var html = '<p>Logout.....!</p>';

    res.end(html, 'utf-8');
});
app.listen(port, () => console.log('Gator app listening on port '+port+''));
