//const giftData3 = fs.readFileSync('./sujetB_data/EM-U4-p32_33-Review.gift', 'utf-8');
//const giftData4 = fs.readFileSync('./sujetB_data/EM-U5-p34-Voc.gift', 'utf-8');

const parser = function(){
    const fs = require('fs');
    const QUESTION = require('./QUESTION');
    //const giftData = fs.readFileSync('./sujetB_data/EM-U4-p32_33-Review.gift', 'utf-8');
    const gift = fs.readFileSync('./sujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift', 'utf-8');
    //================etape de tokenisation==================
    // Un fichier gift est sous la forme gift = *element\n
    //je recupere donc chaque element
    let elements = gift.split(/\n+/);
    let objetQuestion = new Array();
    //let objetQuestion =[];//variable pour contenir les objets questions

    //==============il s'agit ici de l'ABNF d'un fichier GIFT==========
    //console.log(elements);
    //element = question / group / comment/ feedback
    //comment = //*CHAR
    //group = $*CHAR
    //question =::*CHAR
    
    //=================je recupere les groupes et les commentaires Ils seront peut etre utilisés dans un avenir ===================
    //recupere les groupes
    let group = elements.filter(element => element.startsWith('$'));
    //console.log(group);
    //recupere les comment
    let comment = elements.filter(element => element.slice(0,2)==='//');
    //console.log(comment);


    //=================je recupere les questions. Chaque question commençant par un ::
    let questions = elements.filter(element => element.slice(0,2)==='::');
    //console.log(questions);
    //recupere les questions valides. Une question valide etant une question à choix multiple c'est à dire contenat "{}"
    let parsedQuestion = questions.filter(question => question.match(/(.*{.*}.*)/));
    
    //pour chaque question je construis l'objet question constitué de l'intitulé de la question et de sa réponse
    parsedQuestion.forEach(question => {
        //let matched = question.match(/~=.*~/);
        let matched =question.match(/~=([^~]+)~/);
        //console.log(matched);
        if(matched){
            let answer = matched[1];
            let q = new QUESTION(question,answer);
            objetQuestion.push(q);
        }
        
    });
    return objetQuestion;
}

module.exports = parser;