const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const parser = require('./parser.js');
const parserExam = require('./parserExam.js');
const programme = require('@caporal/core').default;
const SujetB_data = require ('SujetB_data');

function visualizealldata(){
    //on recupere les repertoires de travail
    const filePaths = SujetB_data;
    //on lit chaque fichier present dans le repertoire
        const readDataFromFile = (filePath) => {
            const data = JSON.parse(fs.readFileSync(filePath, 'UTF-8'));
            return data;
        }
        //on recupere les donnees des fichiers
        const datasets = filePaths.map(filePath => readDataFromFile(filePath));
        //on combine les donnees des fichiers dans un unique
        const combinedData = datasets.reduce((acc, dataset) => acc.concat(dataset), []);
        //on visualise les donnees
        const visualize = {
            "data": { "values": combinedData },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "type",  // Utiliser le bon nom d'attribut
                    "type": "nominal",
                    "axis": { "title": "Types de questions" }
                },
                "y": {
                    "field": "type",  // Utiliser le bon nom d'attribut ou un autre attribut existant
                    "aggregate": "count"
                }
            }
        }

        console.log(visualize);

}
module.exports = visualizealldata;
