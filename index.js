const fileSequence = require('./fileSequence.json').fileSequence.filter((Sbol) => {
    return Sbol.name.indexOf('') != -1
});

const bioParsers = require('bio-parsers')
const fs = require('fs')
const path = require('path')

const jsonToFasta = bioParsers.jsonToFasta;
const jsonToGenbank = bioParsers.jsonToGenbank;
const sbolXmlToJson = bioParsers.sbolXmlToJson;

const options = {
    fileName: "example.gb",
    isProtein: false,
    acceptParts: true
}

fileSequence.forEach((sbol) => {

    const xmlSbol = fs.readFileSync(sbol.name, "utf8");

    sbolXmlToJson(xmlSbol,options).then((data) => {
        console.log(`\n ${sbol.name} \n`)
        console.log(data)
        console.log(jsonToFasta(data))
        console.log(jsonToGenbank(data))
    });


})
