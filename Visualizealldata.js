const vegalite = require ('vega-lite');
const vega = require ('vega');
const QUESTION = require('./QUESTION');
const parser = require('./parser.js');
const parserExam = require('./parserExam.js');
const programme = require('@caporal/core').default;
const SujetB_data = require ('SujetB_data');



programme
    .command('VisualizeAllData','Visualize by a graph all data')
    .argument('<SujetB_data>', "All files use to make the graph")
    .action( ({args,logger,options}) => {
    // 
        const filePaths = args.SujetB_data;
        
        // Fonction pour lire les données d'un fichier
        const readDataFromFile = (filePath) => {
            const data = JSON.parse(fs.readFileSync(filePath,'UTF-8'));
            return data;
        }
        // Charger les données de chaque fichier
        const datasets = filePaths.map(filePath => readDataFromFile(filePath));

        // Combinez les jeux de données si nécessaire
        const combinedData = datasets.reduce((acc, dataset) => acc.concat(dataset), []);
        
        // variable pour la visualisation Vega-Lite
        var visualize ={
            "data" : {"values": combinedData}, 
            "mark" : "bar",
            "encoding" : { x : { "field" : "type", "type" : "nominal", 
                                "axis": {"title": "Types de questions"}
                                },
                        y : {"field" : "Nombre de questions","aggregate" : "count"}
                            }
                            }
        //Afficher le graphique
        console.log(visualize);
                        
                        })
    
 //exportation de la fonction VisualizeAllData
programme.run(process.argv.slice(2));

