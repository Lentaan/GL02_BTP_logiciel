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
  });

cli.run(process.argv.slice(2));
