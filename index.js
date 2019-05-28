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
   var jwtToken = req.body.jwt;
       var secret = 
       'q4nNEJGT9Tto2978qbGRXXRR4oSTEoYFFYt4eBqT7eOxDyKdRlRKyK2sf8r38HTaQJnIEo7VM-rZmBZttqtUNdxiEIVIZTCCfKgPsWFoCJT9ybYHUW1h918LNBeJjSwjHUNEh6mjCGrZrsef1Su5bu7z9KXQAn6YCdbYAi-9kErwlLbLMZRCyhgTenb3UmkU5PTnOWTbifU9iet8eJVGElaozJRk19maxEWz7qqFQRw9S4SS5v7WQ4qbaDhdXQ2';
       var decode = jwt.decode(jwtToken,secret);
  
console.log("jwt"+util.inspect(req.body));
 response.send('Hello World!');
 });

app.post('/', bodyParser.urlencoded({ extended:    true     }),(req, res)=>{ 
  
  var jwtToken = req.body.jwt;
       var secret = 
       'q4nNEJGT9Tto2978qbGRXXRR4oSTEoYFFYt4eBqT7eOxDyKdRlRKyK2sf8r38HTaQJnIEo7VM-rZmBZttqtUNdxiEIVIZTCCfKgPsWFoCJT9ybYHUW1h918LNBeJjSwjHUNEh6mjCGrZrsef1Su5bu7z9KXQAn6YCdbYAi-9kErwlLbLMZRCyhgTenb3UmkU5PTnOWTbifU9iet8eJVGElaozJRk19maxEWz7qqFQRw9S4SS5v7WQ4qbaDhdXQ2';
       var decode = jwt.decode(jwtToken,secret);
  
console.log("jwt"+util.inspect(req.body.jwt));
});

/*app.post('/',(req, res)=>{
 console.log(JSON.stringify(req, null, 4)); 
 console.log(JSON.stringify(res, null, 4));
});**/

/*app.post('/login', (req, res) => {
     // var jwtToken = req.body.jwt;
 // console.log('reqjwt \n\n'+jwtToken);
 // console.log('resjwt \n\n'+res.body.jwt);
   parseString(req, function (err, result) {
    console.log('req \n\n'+result);
   });
   console.log('req \n\n'+req.body.jwt);
        var secret = 
       '_isl5hpwCTyLmZvqKoMeiaWqvkn5SeUVUnlEkXz7KbrW1Fzd3C19_vrC-koGDSCFXU74qX06raiDB3fFILsw5hkXDDKyEr8bB7oPEVbG9j7bfCPEb4CL6-Pufqm8jbz3Lxol2CwrBZzhUroLUUD8G2OJr3MQkRTHCKKZoSkn-qKOzo2K9zY6R-a_RPVjcFgklwjplVhTFpK3tbX7t6lmWvADoTncCG7sa0P8YvpzC_29gYrHvggNdaEqdPHuxQ2';
       var decode = jwt.decode(jwtToken,secret);
       var refreshToken = decode.request.rest.refreshToken;
       var authEndpoint = decode.request.rest.authEndpoint;
       var apiEndpointBase = decode.request.rest.apiEndpointBase; 
       console.log('jwt token \n'+jwtToken);
       console.log('refreshToken \n\n'+refreshToken);   
       console.log('authEndpoint \n\n'+authEndpoint);
       console.log('apiEndpointBase \n\n'+apiEndpointBase);
  
       axios.post(authEndpoint,{
            "clientSecret":"eeR20WggF5YBLaucVwQX0Ptb",
            "clientId":"pkann2kcekfi54jgps65mkxa",
            "refreshToken":refreshToken,
            "accessType": "offline"        
        }).then(response =>{
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
            console.log('accessToken \n'+accessToken);
            
//------------SOAP API------------------------------------------------------------------------------------------------------------
     
        if(accessToken){
         //-------------------------Create DataExtension---------------------------
             FinalXML = SoapPreHeader+accessToken+dataExtensionXML; 
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
                      parseString(response.data, function (err, result) {
                        if(result){
                           var b = result['soap:Envelope'];
                           console.log("API Call Status = ",b['soap:Body'][0].CreateResponse[0].Results[0].StatusCode[0]); 
                           if( b['soap:Body'][0].CreateResponse[0].Results[0].StatusCode[0] != 'Error'){
                              console.log(b['soap:Body'][0].CreateResponse[0].Results[0].StatusMessage[0]);
                               //-------------------------Create Query Activity------------------------------------ 
                                          FinalXML = SoapPreHeader+accessToken+queryXML;
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
                                              parseString(response.data, function (err, result) {
                                                      if(result){
                                                           let Envelope = result['soap:Envelope'];
                                                           console.log("API Call Status = ",Envelope['soap:Body'][0].CreateResponse[0].Results[0].StatusCode[0]);
                                                        
                                                          console.log("ObjectID==",Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].ObjectID[0]); 
                                                          console.log("CustomerKey==",Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].CustomerKey[0]);
                                                          console.log("Name==",Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].Name[0]);
                                                        
                                                          if( Envelope['soap:Body'][0].CreateResponse[0].Results[0].StatusCode[0] != 'Error'){
                                                               console.log(Envelope['soap:Body'][0].CreateResponse[0].Results[0].StatusMessage[0]);
                                                              //------------------------Create Automation ----------------------------------------------------------
                                                               let automationXML = `</fueloauth></soapenv:Header><soapenv:Body><CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI"><Options/><Objects xsi:type="Automation">
                                                                          <Client><ID>7291811</ID><!--ORG ID--></Client>
                                                                          <Name>AUT_ONEOFF2</Name>
                                                                          <CustomerKey>AUT_ONEOFF2</CustomerKey>
                                                                          <Description>AUT_ONEOFF2</Description>
                                                                          <!--<CategoryID>74052</CategoryID>-->
                                                                          <AutomationTasks>
                                                                             <AutomationTask>
                                                                                <PartnerKey xsi:nil="true"/>
                                                                                <ObjectID xsi:nil="true"/>
                                                                                <Name>Task 1</Name>
                                                                                <Activities>
                                                                                   <Activity>
                                                                                      <PartnerKey xsi:nil="true"/>
                                                                                      <ObjectID>`+Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].ObjectID[0]+`</ObjectID>
                                                                                      <!--ObjectID of Query-->
                                                                                      <Name>Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].Name[0]</Name>
                                                                                      <!--Name of Activity-->
                                                                                      <!--<Definition>
                                                                                         <PartnerKey xsi:nil="true"/>
                                                                                         <ObjectID xsi:nil="true"/>
                                                                                      </Definition>-->
                                                                                      <ActivityObject xsi:type="QueryDefinition">
                                                                                         <PartnerKey xsi:nil="true"/>
                                                                                         <ObjectID>`+Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].ObjectID[0]+`</ObjectID>
                                                                                         <!--ObjectID of Query-->
                                                                                         <CustomerKey>`+Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].CustomerKey[0]+`</CustomerKey>
                                                                                         <!--CustomerKey of Query-->
                                                                                         <Name>`+Envelope['soap:Body'][0].CreateResponse[0].Results[0].Object[0].Name[0]+`</Name>
                                                                                         <!--Name of Query-->
                                                                                      </ActivityObject>
                                                                                   </Activity>
                                                                                </Activities>
                                                                             </AutomationTask>
                                                                          </AutomationTasks>
                                                                          <AutomationType>scheduled</AutomationType>
                                                                       </Objects>
                                                                    </CreateRequest>
                                                                 </soapenv:Body>
                                                              </soapenv:Envelope>`;
                                                                  FinalXML = SoapPreHeader+accessToken+automationXML;
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
                                                                                        parseString(response.data, function (err, result) {
                                                                                        console.log(JSON.stringify(result));  
                                                                                        if(result){
                                                                                          let Envelope = result['soap:Envelope'];
                                                                                          console.log("\n Automation API Call Status = ",Envelope['soap:Body'][0].CreateResponse[0].Results[0].StatusCode[0]);
                                                                                          console.log("API Message=",Envelope['soap:Body'][0].CreateResponse[0].Results[0]);
                                                                                        }else{
                                                                                          console.log("Automation Parsing Error=",err);
                                                                                        } 
                                                                                       }); 
                                                                                }).catch((error) => {
                                                                                       console.log("Automation Creation Error=\n");
                                                                                       console.log(error);
                                                                                });                                                                                   
                                                           }else{
                                                               console.log(Envelope['soap:Body'][0].CreateResponse[0].Results[0].StatusMessage[0]);  
                                                           }
                                                      }else{
                                                         console.log("Query Activity Parsing Error"+err);
                                                      }
                                                    }); 

                                        }).catch((error) => {
                                               console.log("Query Activity Creation Error=\n");
                                               console.log(error);
                                        }); 

                           }else{
                               console.log(b['soap:Body'][0].CreateResponse[0].Results[0].StatusMessage[0]);  
                           }
                        }else{
                          console.log("DataExtention Parssing Error"+err);
                        }
                      }); 
              }).catch((error) => {
                     console.log("DataExtention Creation Error=\n");
                     console.log(error);
              });

       }else{
              console.log("Access Token not found");
       }    

            
        }).catch( error => {
        console.log("Get AccessToken ERROR");
        console.log(error);
        });
    
 
        res.sendFile(__dirname + '/index.html');
    
});*/
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
