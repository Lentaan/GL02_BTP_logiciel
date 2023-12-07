const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const parser = require('./parser.js');
const parserExam = require('./parserExam.js');
const programme = require('@caporal/core').default;
const fetch = require('fetch');


programme
    .command('VisualizeAllData','Visualize by a graph all data')
    .argument('<./SujetB_data>', "All files use to make the graph")
    .action( ({args,logger,options}) => {
    // si choix des types de questions de toutes les données alors il faut les afficher avec vega
        const urls = ['EM-U5-p34-Gra-Expressions_of_quantity.gift', 'EM-U5-p34-Voc.gift','EM-U5-p35-Gra-Subject_verb_agreement.gift',''];
        
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
        combinedData.extract(type);

        var visualize ={
            "data" : {"values": combinedData}, 
            "mark" : "bar",
            "encoding" : { x : { "field" : "type", "type" : "nominal", 
                                "axis": {"title": "Types de questions ' type."}
                                },
                        y : {"field" : "Nombre de questions","aggregate" : "count"}
                            }
                            }
        console.log(visualize);
                        
                        })
    })
 //exportation de la fonction VisualizeAllData
programme.run(process.argv.slice(2));

