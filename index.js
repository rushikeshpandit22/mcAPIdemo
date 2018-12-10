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
var accessToken = "",dataExtentionXML, queryXML, automationXML, SoapPreHeader, FinalXML = "";

SoapPreHeader = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
              <soapenv:Header>
              <fueloauth>`;

dataExtentionXML = `</fueloauth></soapenv:Header><soapenv:Body><CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI"><Options/><Objects xsi:type="DataExtension">
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

queryXML = `</fueloauth><a:Action s:mustUnderstand="1">Create</a:Action><a:To s:mustUnderstand="1">https://webservice.s7.exacttarget.com/Service.asmx</a:To></soapenv:Header>
   <soapenv:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
         <Options></Options>
         <Objects xsi:type="QueryDefinition">
            <PartnerKey xsi:nil="true"></PartnerKey>
            <ObjectID xsi:nil="true"></ObjectID>
            <CustomerKey>API QUERY ACTIVITY</CustomerKey>
            <Name>API QUERY ACTIVITY</Name>
            <Description>API QUERY ACTIVITY</Description>
            <QueryText>Select EmailAddress as EMAIL from [_Subscribers]</QueryText>
            <TargetType>DE</TargetType>
            <DataExtensionTarget>
               <PartnerKey xsi:nil="true"></PartnerKey>
               <ObjectID xsi:nil="true"></ObjectID>
               <CustomerKey>DemoAPi</CustomerKey>
               <Name>Demo</Name>
            </DataExtensionTarget>
            <TargetUpdateType>Overwrite</TargetUpdateType>
         </Objects></CreateRequest></soapenv:Body></soapenv:Envelope>`;

app.post('/', (req, res) => {
       var jwtToken = req.body.jwt;
       var secret = 
       'aPwkRdSokdV9CsilYuZN3StLLeaKPUbFZRmptaoDcpFiEa2pUMSPNfbniKG3p06IlFak9TKz9CW0tTnlt1xuSybQkV3kCjGWN8cCsxyAGfHcb_050k-XplzYQyAJLwuYHBzBuU8w0FUbMRij64HjYljIwniEwlry348T3PDBIbPpq5qLGbWgdnOaTiG5SBW4qigC5ALKgSIArrPYvZgPBZS1TKGpm5cs4K-OQ3v7j_q1-qDawDQzSKN9Fdtj5g2';
       var decode = jwt.decode(jwtToken,secret);
       var refreshToken = decode.request.rest.refreshToken;
       var authEndpoint = decode.request.rest.authEndpoint;
       var apiEndpointBase = decode.request.rest.apiEndpointBase; 
  
       axios.post(authEndpoint,{
            "clientSecret":"emdG17BLX14drPPNQ6QGmxMt",
            "clientId":"e91wco2s002d3dfz70r3m9f0",
            "refreshToken":refreshToken,
            "accessType": "offline"        
        }).then(response =>{
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
            console.log(accessToken);
//------------SOAP API------------------------------------------------------------------------------------------------------------
     
       if(accessToken){
             FinalXML = SoapPreHeader+accessToken+dataExtentionXML; 
              axios({
                     method: 'post',
                     url: 'https://webservice.s7.exacttarget.com/Service.asmx',
                     headers: {
                     "Content-Type":"text/xml;charset=UTF-8" ,
                     "Accept-Encoding":"gzip,deflate",
                     "SOAPAction":"Create"
                     },
                     data: FinalXML,
              }).then((response) => {
                     consol.log("#####################################\nDataExtention Created\n");
                     console.log(response.data);
              }).catch((error) => {
                     console.log("DataExtention Creation Error=\n");
                     console.log(error);
              });
       }else{
              console.log("Access Token not found");
       }     
             
//-----------------------Rest_API------------------------------------------------------------------------------------------------- 
            //apiEndpointBase+'/hub/v1/campaigns'
            //'https://mcs53v5db9s0nn0nrb3kgsl9qly1.rest.marketingcloudapis.com/hub/v1/campaigns'
             //axios.get(apiEndpointBase+'/hub/v1/campaigns',{
          /*   axios.get(apiEndpointBase+'data/v1/customobjectdata/key/AMPScript/rowset/',{
                headers: {
                "content-type": 'application/json',
                "authorization": "Bearer "+ accessToken
                }}).then(response => {
                    console.log("================================");
                    console.log(JSON.stringify(response.data.items));
                    const query = { 
                            text: 'insert into sfmctest.demo ("Name", "Email") select keys, values from jsonb_to_recordset(\'' + JSON.stringify(response.data.items) + '\') r(keys character varying , values character varying)'
                    }
                     client.query(query,(err, res) => {
                            if (err) {
                                   console.log(err.stack)
                            } else {
                                   console.log("Data inserted");  
                                   console.log(res.rowCount);
                            }
                     });
                    
                }).catch( error => {
                    console.log("Get Campaigns ERROR");
                    console.log(error);
                });*/
            
        }).catch( error => {
        console.log("Get AccessToken ERROR");
        console.log(error);
        });
    
 
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
