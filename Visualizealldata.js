const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const readlineSync = ('readline-sync');
const parserExam = ('./parserExamen.js');



// si choix des types de questions de toutes les données alors il faut les afficher avec vega

 const VisualizeAllData = function() {
    const urls = ['EM-U4-p32_33-Review.gitf', 'EM-U5-p34-Gra-Expressions_of_quantity.gift', 'EM-U5-p34-Voc.gift','EM-U5-p35-Gra-Subject_verb_agreement.gift'];

    // Fonction pour charger les données depuis une URL
         const fetchData = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
                };

    // Charger les données depuis chaque URL
        const dataPromises = urls.map(url => fetchData(url));

    // Attendre que toutes les promesses soient résolues
        Promise.all(dataPromises)
        .then(datasets => {
    // Combinez les jeux de données si nécessaire
        const combinedData = datasets.reduce((acc, dataset) => acc.concat(dataset), []);

        var visualizeTypesQuestions ={
        "data" : {"values": combinedData}, 
        "mark" : "bar",
        "encoding" : { x : { "field" : "name", "type" : "nominal", 
                            "axis": {"title": "Types de questions ' name."}
                             },
                    y : {"field" : "Nombre de questions","type" : "quantitative"}
                           }
                         }
           

   })
 }
 //exportation de la fonction VisualizeAllData
module.exports = VisualizeAllData; 
