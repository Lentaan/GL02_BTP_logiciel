const fs = require("fs");
const readlineSync = require("readline-sync");
const SujetB_data = require("SujetB_data");

//============fonction qui permet de visualiser les données de tous les examens================
const visualizeAllData = function () {
  // récupération des chemins des fichiers de données
  const filePaths = SujetB_data;

  // demande à l'utilisateur d'entrer le nom du fichier html
  const nomFichierHtml = readlineSync.question(
    "Veuillez entrer le nom du fichier HTML : "
  );

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

  // écrire le code html dans un fichier
  fs.writeFileSync(`${nomFichierHtml}.html`, html);
};

//=============fonction qui permet de visualiser les données d'un examen================
const visualizeExam = function () {
  // demande à l'utilisateur d'entrer le nom de l'examen
  let chooseExamen = readlineSync.question("Entrez le nom de l examen :");
  let nomExamenExiste = false;

  // création de la liste des examens
  let listExamen = SujetB_data;

  // parcourt la liste des examens
  for (let i = 0; i < listExamen.length; i++) {
    // vérifie si le nom de l'examen correspond à l'entrée de l'utilisateur
    if (listExamen[i].name.includes(chooseExamen)) {
      nomExamenExiste = true;
      // crée la spécification vega-lite pour le graphique
      var visualize = {
        data: { url: listExamen[i].dataUrl },
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

      // demande à l'utilisateur d'entrer le nom du fichier html
      const nomFichierHtml = readlineSync.question(
        "Veuillez entrer le nom du fichier HTML : "
      );

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

      // écrire le code html dans un fichier
      fs.writeFileSync(`${nomFichierHtml}.html`, html);
    }
  }

  if (!nomExamenExiste) {
    console.log("Le nom de l'examen que vous avez entré n'existe pas.");
  }
};

// appel de la fonction visualizeAllData
visualizeAllData();
// appel de la fonction visualizeExam
visualizeExam();
