const QUESTION = require('./QUESTION.js');
const fs = require('fs');

const newParser = function(cheminFichier) {
    const gift = fs.readFileSync(cheminFichier, 'utf-8');

    let elements = gift.split(/\n+/);
    let objetQuestion = [];

    let currentQuestion = '';
    let currentAnswers = [];

    elements.forEach(element => {
        if (element.startsWith('::')) {
            if (currentQuestion !== '') {
                let q = new QUESTION(currentQuestion.trim(), currentAnswers);
                objetQuestion.push(q);
                currentAnswers = [];
            }
            currentQuestion = element;
        } else if (element.startsWith('{=')) {
            currentAnswers.push(...element.slice(3, -1).split('=').map(ans => ans.trim()));
        }
    });

    if (currentQuestion !== '') {
        let q = new QUESTION(currentQuestion.trim(), currentAnswers);
        objetQuestion.push(q);
    }

    return objetQuestion;
}

module.exports = newParser;
