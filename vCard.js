const readlineSync = require("readline-sync");
const fs = require("fs");

//===============fonction qui crée un fichier vCard contant l'id et le contact de l'utilisateur================
const createVCard = function () {
  // récupération de l'id de l'utilisateur
  let id = readlineSync.question("Entrez votre id : ");

  // récupération du contact de l'utilisateur
  let contact = readlineSync.question("Entrez votre contact : ");

  // création d'une variable qui contient le contenu du fichier vCard
  let vCard = "BEGIN:VCARD";
  vCard += "\nVERSION:4.0";
  vCard += `\nFN:${id}`;
  vCard += `\nEMAIL:${contact}`;
  vCard += "\nEND:VCARD";

  // création du fichier vCard
  fs.writeFileSync(`${id}.vcf`, vCard);
};

// appel de la fonction createVCard
createVCard();
