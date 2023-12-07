const parserExam = require('./parserExam');
const fs = require("fs");
const readlineSync = require("readline-sync");

//================================recupeper le fichier=======================//

const isValid = function(file) {

    const list = parserExam(file);
    console.log(list.length);

    let bool = false;

    if(list.length >=15 && list.length <= 20){
        bool = true;
    }



//==============technique set=====================//
    /*const uniqueQuestions = new Set(list);
    const isUnique = uniqueQuestions.size === list.length;

    if (isUnique) {
        console.log("Le tableau ne contient que des questions uniques.");
    } else {
        console.log("Le tableau contient des doublons de questions.");
    }*/


    let isUnique = true;
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i].name === list[j].name && list[i].answer === list[j].answer && list[i].type === list[j].type) {
                isUnique = false;
                break;
            }
        }
        if (!isUnique) {
            break;
        }
    }

    if (!isUnique) {
        console.log("L'examen contient des doublons de questions.");
    }


    return bool && isUnique;

}


//console.log(isValid('SujetB_data/EM-U5-p36_37-Reading.gift'));
//console.log(isValid('./exam/exam2.gift'));
