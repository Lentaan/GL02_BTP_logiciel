const fs = require('fs');

// Fonction pour extraire les questions d'un fichier GIFT
function extractQuestions(giftContent) {
    const questions = giftContent.split('::'); // Diviser les questions
    const formattedQuestions = questions.map(question => {
        // Ici, vous pouvez analyser chaque question pour extraire les informations nécessaires
        // Par exemple, séparer la question, les options de réponse, etc.
        return question.trim(); // À adapter selon la structure du fichier GIFT
    });
    return formattedQuestions.filter(question => question !== ''); // Filtrer les éléments vides
}

// Fonction pour comparer les questions de deux examens
function compareExams(exam1Questions, exam2Questions) {
    // Comparaison basique : vérification des questions identiques
    const commonQuestions = exam1Questions.filter(question =>
        exam2Questions.includes(question)
    );
    return commonQuestions;
}

// Lire le fichier GIFT
fs.readFile('chemin/vers/votre/fichier.gift', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur de lecture du fichier :', err);
        return;
    }

    // Extraire les questions du premier examen
    const exam1Questions = extractQuestions(data);

    // Charger un autre fichier GIFT (pour simuler un second examen)
    fs.readFile('chemin/vers/autre/fichier.gift', 'utf8', (err, data2) => {
        if (err) {
            console.error('Erreur de lecture du second fichier :', err);
            return;
        }

        // Extraire les questions du second examen
        const exam2Questions = extractQuestions(data2);

        // Comparer les questions des deux examens
        const commonQuestions = compareExams(exam1Questions, exam2Questions);

        // Afficher les questions communes
        console.log('Questions communes entre les deux examens :');
        commonQuestions.forEach((question, index) => {
            console.log(`${index + 1}. ${question}`);
        });
    });
});
