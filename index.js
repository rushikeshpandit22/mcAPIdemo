const ET_Client = require('fuelsdk-node');
const client = new ET_Client('tzv6fcoi1oachkygw2hnvva9', 'l0sUcKPSJMZEHYxJE68eQG0v','s7');
//console.log(client);
/*const props = {
    Name: 'PandaTestDE5',
    Description: 'Campaign description',
    Fields : {
        Field : {
            Name: 'Name',
            FieldType: 'Text',
            IsPrimaryKey: true,
            MaxLength: 100,
            IsRequired: true
        }
    }
};
client.dataExtension({props}).post((err, response) => {
    console.log("response===="+JSON.stringify( response));
    console.log("err===="+JSON.stringify( err));
});*/


const props = ['Name']; 
client.dataExtensionRow({props, Name: 'PandaAPIDE3'}).get((err,response) => { 
  console.log('\n Main Repsonce = '+JSON.stringify(response) + '\n Error = ' + JSON.stringify(err));
  console.log("\nresponse *****************************************************\n"+JSON.stringify(response.body.Results[0].Properties.Property)); 
   var result = document.createElement("p");
    result.innerText = JSON.stringify(response.body.Results[0].Properties.Property);
})
