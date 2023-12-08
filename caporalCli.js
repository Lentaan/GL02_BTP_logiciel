// importation des modules nécessaires
const fs = require("fs");
const readlineSync = require("readline-sync");
const cli = require("@caporal/core").default;

// importation des fonctions nécessaires
const parser = require("./parser");
const parserExam = require("./parserExam");
const search = require("./examSheet.js");
const listQuestionExam = require("./examSheet.js");

// récupération de la liste des questions
const listQuestion = parser();

cli
  .version("vpf-parser-cli")
  .version("0.07")

  // lister les questions de la banque de question
  .command("question", "liste de toutes les questions de la banque de question")
  .action(({ logger }) => {
    let i = 0;
    for (question in listQuestion) {
      logger.info("Question n°" + i + ": " + listQuestion[i - 1]);
      i++;
    }
  })

  // recherche une question dans la banque de question et retourne son intitulé
  .command(
    "search",
    "recherche une question dans la banque de question et retourne son intitulé"
  )
  .argument(
    "question",
    "partie de la question recherchée ou la question entière"
  )
  .action(({ args, logger }) => {
    // utilisation de la méthode filter pour créer un nouveau tableau qui contient toutes les questions qui incluent la saisie de l'utilisateur
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

  // ajouter une question à un examen
  .command("add", "ajoute une question à un examen")
  .argument("<number>", "numéro de la question à ajouter")
  .argument("<file>", "l'examen auquel ajouter la question")
  .action(({ args, logger }) => {
    // utilisation de la méthode appendFile pour ajouter la question à l'examen
    fs.appendFile(
      args.file,
      // utilisation de la méthode toString pour convertir la question en chaine de caractères
      listQuestion[parseInt(args.number)].toString(),
      (err) => {
        // utilisation d'une instruction conditionnelle pour vérifier si le fichier existe ou non
        if (err) {
          logger.info("fichier non existant ou chemin inacessible");
        }
        logger.info(`La question ${args.number} a été ajoutée`);
      }
    );
  })

  // génère un fichier vcf contenant l'id et le contact de l'utilisateur
  .command(
    "vcard",
    "génère un fichier vcf contenant l'id et le contact de l'utilisateur"
  )
  .argument("<id>", "id")
  .argument("<email>", "email")
  .action(({ args }) => {
    // création d'une chaine de caractères qui va contenir les informations de l'utilisateur
    let vCard = "BEGIN:VCARD";
    vCard += "\nVERSION:4.0";
    vCard += `\nFN:${args.id}`;
    vCard += `\nEMAIL:${args.email}`;
    vCard += "\nEND:VCARD";

    // création du fichier vCard
    fs.writeFileSync(`${args.id}.vcf`, vCard);
  })

  // création d'une fiche d'examen
  .command(
    "create-exam-sheet",
    "création d'une fiche d'examen sous format GIFT"
  )
  .argument("<exam>", "nom de l'examen")
  .action((args, logger) => {
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

  // simulation de test dans laquelle l'utilisateur répond aux questions de l'examen
  .command("simulate", "simuler un examen")
  .argument("<exam>", "l'examen à simuler")
  .argument(
    "<nomCompteRendu>",
    "nom du fichier dans lequel on veut avoir le compte rendu"
  )
  .action(({ args, logger }) => {
    let questionExam = parserExam(args.exam);
    //tableau des reponses utilisateurs
    let tabAnswer = new Array();
    logger.info(
      "Vous allez passer le test de l'exam" +
        args.exam +
        "\n repondez aux questions en entrant juste une des reponses"
    );
    //boucle sur les questions et recupere les reponses de l'utilisateur
    for (let i = 0; i < questionExam.length; i++) {
      logger.info(`${questionExam[i].name}: `);
      let answer = readlineSync.prompt();
      logger.info("Votre réponse est " + answer);
      tabAnswer.push(answer);
    }
    // construction du fichier de compte rendu de l'examen
    // la chaine de caractere est écrite dans le fichier de compte rendu
    let compteRendu = "";
    // on compare les entrées de l'etudiant et la reponse correcte à la question. si c'est vrai on met 'vrai' sinon 'faux'
    let note = 0;
    for (let numero = 0; numero < questionExam.length; numero++) {
      let appreciation = "vrai";
      if (tabAnswer[numero] === questionExam[numero].answer) {
        note++;
        appreciation = "faux";
      }
      compteRendu += `question ${numero}: ${appreciation}, correction: ${questionExam[numero].answer}\n`;
    }
    note = (note / questionExam.length) * 100;
    // on écrit la chaine de caractere dans le fichier de compte rendu
    compteRendu += `vous avez ${note}% de bonne reponse à l'examen`;
    fs.writeFileSync(`compteRendu.txt`, compteRendu);
    logger.info(
      `vous avez ${note}% de bonne réponse à l'examen. Vous pourrez trouver le compte rendu dans le fichier compte rendu`
    );
  })

  // simulation de test avec un fichier contenant les réponses d'un étudiant
  .command(
    "compareAnswer",
    "compare les réponses d'un étudiant avec la correction d'un exam choisi et génère un fichier de compte rendu"
  )
  .argument("<answer>", "fichier contenant les réponses d'un étudiant")
  .argument("<exam>", "examen composé par l'etudiant")
  .argument(
    "<nomCompteRendu>",
    "nom du fichier dans lequel on veut avoir le compte rendu"
  )
  .action(({ args, logger }) => {
    // réponse de l'etudiant
    fs.readFile(args.answer, "utf-8", (err, data) => {
      if (err) {
        logger.info("Le fichier de reponse de l'etudiant est illisible");
      }
      answerStudent = data.split(",");
      // réponse aux questions de l'examen
      let questionExam = parserExam(args.exam);
      // note à l'examen
      let note = 0;
      // chaine de caractere écrit dans le fichier de compte rendu
      let compteRendu = "";
      // on compare les entrées de l'etudiant et la reponse correcte à la question. si c'est vrai on met 'vrai' sinon 'faux'
      for (let numero = 0; numero < questionExam.length; numero++) {
        let appreciation = "faux";
        if (answerStudent[numero] === questionExam[numero].answer) {
          note++;
          appreciation = "vrai";
        }
        compteRendu += `question ${numero}: ${appreciation}, correction: ${questionExam[numero].answer}\n`;
      }
      note = (note / questionExam.length) * 100;
      // on écrit la chaine de caractere dans le fichier de compte rendu
      compteRendu += `vous avez ${note}% de bonne reponse à l'examen`;
      fs.writeFileSync(`compteRendu.txt`, compteRendu);
      logger.info(
        `vous avez ${note}% de bonne réponse à l'examen. Vous pourrez trouver le compte rendu dans le fichier compte rendu`
      );
    });
  })

  // comparaison de deux examens
  .command(
    "compareExam",
    "compare deux examens et retourne le nombre de questions en commun"
  )
  .argument("<exam1>", "examen que l'on veut comparer")
  .argument("<exam2>", "examen qui sert de comparaison")
  .action(({ args, logger }) => {
    let questionExam1 = parserExam(args.exam1);
    let questionExam2 = parserExam(args.exam2);
    // on détermine le fichier contenant le plus de question car c'est par ce nombre qu'on va boucler pour comparer les examens
    let commonQuestion = new Array();
    // on compare les questions des deux fichiers
    for (let i = 0; i < questionExam1.length; i++) {
      for (let j = 0; j < questionExam2.length; j++) {
        if (questionExam1[i].name === questionExam2[j].name) {
          commonQuestion.push(questionExam1[i]);
        }
      }
    }
    // on affiche le nombre de questions en commun et les questions en commun
    logger.info(commonQuestion);
    // utilisation d'une instruction conditionnelle pour vérifier si le tableau commonQuestion est vide ou non
    if (commonQuestion.length > 0) {
      logger.info(
        `le fichier compte ${commonQuestion.length} de questions en commun`
      );
      logger.info(`il s'agit de ${commonQuestion}`);
      // si le tableau est vide, cela signifie que la question n'a pas été trouvée
    } else {
      logger.info(`il n'y a pas de questions en commun`);
    }
  })

  // visualisation des données de tous les fichiers examen sous forme d'histogramme
  .command("visualizeAllData", "visualisation de toutes les données")
  .argument("<SujetB_data>", "tous les fichiers de données")
  .argument("<nomFichierHtml>", "nom du fichier html")
  .action(({ args }) => {
    // récupération des chemins des fichiers de données
    const filePaths = args.SujetB_data;

    // fonction pour lire les données d'un fichier
    const readDataFromFile = (filePath) => {
      // lecture du fichier et conversion du contenu en objet js
      const data = JSON.parse(fs.readFileSync(filePath, "UTF-8"));
      return data;
    };

    // chargement des données de chaque fichier
    const datasets = filePaths.map((filePath) => readDataFromFile(filePath));

    // combinaison des jeux de données
    const combinedData = datasets.reduce(
      (acc, dataset) => acc.concat(dataset),
      []
    );

    // création de la spécification vega-lite pour la visualisation
    var visualize = {
      data: { values: combinedData },
      mark: "bar",
      encoding: {
        x: {
          field: "type",
          type: "nominal",
          axis: { title: "Types de questions" },
        },
        y: { field: "Nombre de questions", aggregate: "count" },
      },
    };

    // génére du code html pour vega-embed
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
      </head>
      <body>
        <div id="vis"></div>
        <script type="text/javascript">
          var spec = ${JSON.stringify(visualize)};
          vegaEmbed('#vis', spec);
        </script>
      </body>
      </html>
    `;

    // écriture du code html dans un fichier
    fs.writeFileSync(`${args.nomFichierHtml}.html`, html);
  })

  // visualisation des données d'un fichier examen sous forme d'histogramme
  .command(
    "VisualizeExam",
    "Visualize by a graph types of questions of one exam"
  )
  .argument(
    "<examen>",
    "fichier d examen choisi pour voir le nombre de types de question"
  )
  .argument("<nomFichierHtml>", "nom du fichier html")
  .action(({ args, logger, options }) => {
    // demande à l'utilisateur d'entrer le nom de l'examen
    let chooseexamen = readlineSync.question("Entrez le nom de l examen :");
    let nomExamenExiste = false;

    // parcourt la liste des examens
    for (let i = 0; i < List_examen.length; i++) {
      // vérifie si le nom de l'examen correspond à l'entrée de l'utilisateur
      if (List_examen[i].name.includes(chooseexamen)) {
        nomExamenExiste = true;
        // crée la spécification vega-lite pour le graphique
        var visualize = {
          data: { url: List_examen[i].dataUrl },
          mark: "bar",
          encoding: {
            x: {
              field: "type",
              type: "nominal",
              axis: { title: "Types de questions" },
            },
            y: { field: "Nombre de questions", aggregate: "count" },
          },
        };
        // génère du code html pour vega-embed
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
          <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
          <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
        </head>
        <body>
          <div id="vis"></div>
          <script type="text/javascript">
            // insère la spécification vega-lite dans le code HTML
            var spec = ${JSON.stringify(visualize)};
            vegaEmbed('#vis', spec);
          </script>
        </body>
        </html>
      `;

        // écrit le code html dans un fichier
        fs.writeFileSync(`${args.nomFichierHtml}.html`, html);
        break;
      }
    }

    // si aucun examen ne correspond à l'entrée de l'utilisateur, on lui demande de réessayer
    if (!nomExamenExiste) {
      console.log("réessaye");
      return chooseexamen;
    }
  });

// exécution de la commande avec les arguments passés dans le terminal
cli.run(process.argv.slice(2));
