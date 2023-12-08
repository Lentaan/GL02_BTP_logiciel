const fs = require("fs");
const colors = require("colors");
//const VpfParser = require('./VpfParser.js');
const parser = require("./parser");
const parserExam = require("./parserExam");
const listQuestion = parser();
const readline = require("readline");
const vg = require("vega");
const vegalite = require("vega-lite");
const search = require("./examSheet.js");
const listQuestionExam = require("./examSheet.js");

const cli = require("@caporal/core").default;

cli
  .version("vpf-parser-cli")
  .version("0.07")

  //lister les questions de la banque de question
  .command("question", "liste de toutes les questions de la banque de question")
  .action(({ args, options, logger }) => {
    let i = 0;
    for (question in listQuestion) {
      logger.info("Question n°" + i + ": " + listQuestion[i - 1]);
      i++;
    }
  })

  //search a particular question in the bank of question
  .command(
    "search",
    "recherche une question dans la banque de question et retourne son intitulé"
  )
  .argument(
    "question",
    "partie de la question recherchée ou la question entière"
  )
  .action(({ args, logger }) => {
    //utilisation de la méthode filter pour créer un nouveau tableau qui contient toutes les questions qui incluent la saisie de l'utilisateur
    let filteredQuestions = listQuestion.filter((q) =>
      q.name.includes(args.question)
    );

    // utilisation d'une instruction conditionnelle pour vérifier si le tableau filteredQuestions est vide ou non
    if (filteredQuestions.length === 0) {
      // si le tableau est vide, cela signifie que la question n'a pas été trouvée, donc on affiche un message d'erreur
      logger.info(`La saisie ${args.question} n'a pas été trouvée`);

      // si le tableau n'est pas vide, cela signifie que la question a été trouvée
    } else {
      // on affiche toutes les questions trouvées
      logger.info("Voici les questions trouvées : \n");
      filteredQuestions.forEach((q, index) => {
        logger.info(`${index + 1}. ${q.name}`);
      });
    }
  })

  //ajouter une question à un examen
  .command("add", "ajoute une question à un examen")
  .argument("<number>", "numéro de la question à ajouter")
  .argument("<file>", "l'examen auquel ajouter la question")
  .action(({ args, logger }) => {
    fs.appendFile(
      args.file,
      listQuestion[parseInt(args.number)].toString(),
      (err) => {
        if (err) {
          logger.info("fichier non existant ou chemin inacessible");
        }
        logger.info(`La question ${args.number} a été ajoutée`);
      }
    );
  })

  //génère un fichier vcf contenant l'id et le contact de l'utilisateur
  .command(
    "vcard",
    "generate a vcard file containing information of one teacher"
  )
  .argument("<id>", "id")
  .argument("<email>", "email")
  .action(({ args }) => {
    let vCard = "BEGIN:VCARD";
    vCard += "\nVERSION:4.0";
    vCard += `\nFN:${args.id}`;
    vCard += `\nEMAIL:${args.email}`;
    vCard += "\nEND:VCARD";

    // création du fichier vCard
    fs.writeFileSync(`${args.id}.vcf`, vCard);
  })

  //création d'une fiche d'examen
  .command(
    "create-exam-sheet",
    "Création d'une fiche d'examen sous format GIFT"
  )
  .argument("<exam>", "Nom de l'examen")
  .action((args, options, logger) => {
    // message de bienvenu rappelant le but de la fonctionnalité
    logger.info(
      "Bienvenu dans la création d'une fiche d'examen sous format GIFT \n"
    );
    // récupération de la liste des questions
    let questions = listQuestionExam();
    // création d'une chaine de caractères qui va contenir toutes les questions
    let giftContent = "";
    // ajout de chaque question à la chaine de caractères
    questions.forEach((q) => {
      giftContent += `${q}\n\n`;
    });
    // création du fichier gift
    fs.writeFileSync(`${args.exam}.gift`, giftContent);
  })



  //simulation2 de test
	.command('simulate','simulate a exam')
	.argument('<exam>','the exam that you want to simulate')
	.action(({args,logger,options}) => {

		let questionExam = parserExam(args.exam);
		//tableau des reponses utilisateurs
		let tabAnswer = new Array();
		logger.info("Vous allez passer le test de l'exam"+args.exam+"\n repondez aux questions en entrant juste une des reponses");
		//boucle sur les questions et recupere les reponses de l'utilisateur
		for (let i = 0; i < questionExam.length; i++) {
			logger.info(`${questionExam[i].name}: `)
			let answer = readlineSync.prompt();
			logger.info("Votre réponse est " + answer);
			tabAnswer.push(answer);
		}
		//------------------construction du fichier de compte rendu de l'examen------------------------
		//chaine de caractere ecrit dans le fichier de compte rendu
		let compteRendu ="";
		//on compare les entrees de l'etudiant et la reponse correcte à la question. si c'est vrai on met right sinon wrong
		let note = 0;
		for(let numero = 0; numero < questionExam.length; numero++){
			let appreciation ="wrong"
			if(tabAnswer[numero] === questionExam[numero].answer){
				note++;
				appreciation = "right";
			}
			compteRendu += `question ${numero}: ${appreciation}, correction: ${questionExam[numero].answer}\n`
		}
		note = (note/questionExam.length)*100;
		compteRendu += `vous avez ${note}% de bonne reponse à l'examen`;
		//on recupere le nom du fichier dans lequel l'utilisateur veut avoir son bilan
		logger.info("Entrer le nom du fichier dans lequel vous voulez lire le compte rendu de l'examen")
		let fileCompteRendu = readlineSync.prompt();
		fileCompteRendu =fileCompteRendu+'.txt'
		fs.writeFileSync(fileCompteRendu, compteRendu);
		logger.info(`vous avez ${note}% de bonne reponse à l'examen. Vous pourrez trouver le compte rendu dans le fichier ${fileCompteRendu}`);
				
	})

  //simulation de test
  .command(
    "compareAnswer",
    "Comparer les réponses d'un étudiant avec la correction d'un exam choisi et genere un fichier de compte rendu"
  )
  .argument("<answer>", "fichier contenant les réponses d'un étudiant")
  .argument("<exam>", "examen composé par l'etudiant")
  .action(({ args, logger }) => {
    //réponse de l'etudiant
    fs.readFile(args.answer, "utf-8", (err, data) => {
      if (err) {
        logger.info("Le fichier de reponse de l'etudiant est illisible");
      }
      answerStudent = data.split(",");
      //réponse aux questions de l'examen
      questionExam = parserExam(args.exam);
      //note à l'examen
      let note = 0;
      //chaine de caractere écrit dans le fichier de compte rendu
      let compteRendu = "";
      for (let numero = 0; numero < questionExam.length; numero++) {
        let appreciation = "faux";
        if (answerStudent[numero] === questionExam[numero].answer) {
          note++;
          appreciation = "vrai";
        }
        compteRendu += `question ${numero}: ${appreciation}, correction: ${questionExam[numero].answer}\n`;
      }
      note = (note / questionExam.length) * 100;
      compteRendu += `vous avez ${note}% de bonne reponse à l'examen`;
      fs.writeFileSync(`compteRendu.txt`, compteRendu);
      logger.info(
        `vous avez ${note}% de bonne réponse à l'examen. Vous pourrez trouver le compte rendu dans le fichier compte rendu`
      );
    });
  })

  //comparaison de deux examens
  .command(
    "compareExam",
    "compare deux examens et retourne le nombre de questions en commun"
  )
  .argument("<exam1>", "examen que l'on veut comparer")
  .argument("<exam2>", "examen qui sert de comparaison")
  .action(({ args, logger }) => {
    let questionExam1 = parserExam(args.exam1);
    let questionExam2 = parserExam(args.exam2);
    //on détermine le fichier contenant le plus de question car c'est par ce nombre qu'on va boucler pour comparer les examens
    let commonQuestion = new Array();
    for (let i = 0; i < questionExam1.length; i++) {
      for (let j = 0; j < questionExam2.length; j++) {
        if (questionExam1[i].name === questionExam2[j].name) {
          commonQuestion.push(questionExam1[i]);
        }
      }
    }
    logger.info(commonQuestion);
    if (commonQuestion.length > 0) {
      logger.info(
        `le fichier compte ${commonQuestion.length} de questions en commun`
      );
      logger.info(`il s'agit de ${commonQuestion}`);
    } else {
      logger.info(`il n'y a pas de questions en commun`);
    }
  })

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
//// fonction qui permet à un enseignant de visualiser le nombre de types de questions présentes dans un examen
	.command('VisualizeExam', 'Visualize by a graph types of questions of one exam')
  	.argument('<examen>', 'fichier d examen choisi pour voir le nombre de types de question')
  	.action( ({args,logger,options}) => {
  
    //demander à l'enseignant d'ecrire le nom de l'examen dont il veut voir les types de questions
        let chooseexamen = readlineSync.question('Entrez le nom de l examen :');

        //variable qui verifie si le nom de l'examen existe ou pas 
        let nomExamenExiste = false;

        // la boucle for permet de balayer l'ensemble des examens
         for (let i = 0; i<List_examen.length; i++){  

        // if verifie si l'examen existe 
            if(List_examen[i].name.includes(chooseexamen)) {
              nomExamenExiste = true;
            // Visualisation du nombre de types de questions de l'examen avec Vega-Lite
              var visualize = {
                "data" : {"url" : List_examen[i].dataUrl },
                "mark" : "bar",
                "encoding" : { x : {"field" : "type", "type" : "nominal",
                                              "axis" : { "title" : "Types de questions"}
                                            },
                              y : {"field" : "Nombre de questions","aggregate" : "count"}
                                          }           
                              }
                console.log(visualize);
            //Arreter la boucle 
                break;
            

            // si pas trouvé le dossier
            } if (!nomExamenExiste){
          console.log('Réessaye');
		  //retour au début
          return chooseexamen;
        }
          
    }})

cli.run(process.argv.slice(2));
