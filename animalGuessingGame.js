var readlineSync = require("readline-sync");

let animalFarm = {
  question: "Can it fly?",
  right: { value: "Dog" },
  left: { value: "Duck" },
};
console.log("Computer: Think of an animal");

function doYouWantToPlayAgain(){
  let wantToPlayAgain = readlineSync.question(
    "Computer: Do you want to play again?: "
  );
  if (wantToPlayAgain == "Yes") {
    console.log(animalFarm);
    doTheRound(animalFarm);
  } else {
    console.log("Have a Good Day!");
  }
}

function guessTheAnimal(direction,animalFarmObj){
  if (animalFarmObj[direction].question) {
    doTheRound(animalFarmObj[direction]);
  } else {
    let newReply = readlineSync.question(
      `Computer: is it a ${animalFarmObj[direction].value}? \nHuman: `
    );
    if (newReply == "Yes") {
      console.log(`Computer: Yay! I got it. It is ${animalFarmObj[direction].value}`);
      doYouWantToPlayAgain();
    } else {
      let newAnimal = readlineSync.question(
        `Computer: What is the animal?: \nHuman: `
      );
      animalFarmObj[direction]["question"] = readlineSync.question(
        `Computer: What question would distinguish between ${newAnimal} and ${animalFarmObj[direction].value} \nHuman: `
      );
      let newQuestionsAnswer = readlineSync.question(
        `Computer: For the ${newAnimal} is the Answer Yes or No \nHuman: `
      );
      if (newQuestionsAnswer == "Yes") {
        animalFarmObj[direction].left = { value: newAnimal };
        animalFarmObj[direction].right = { value: animalFarmObj[direction].value };
        delete animalFarmObj[direction].value;
      } else {
        animalFarmObj[direction].right = { value: newAnimal};
        animalFarmObj[direction].left = { value: animalFarmObj[direction].value };
        delete animalFarmObj[direction].value;
      }
      doYouWantToPlayAgain();
    }
}
}
function doTheRound(animalFarmObj) {
  console.log(`Computer: ${animalFarmObj["question"]}`);

  let reply = readlineSync.question("Human: ");
  if (reply == "Yes") {
    guessTheAnimal("left",animalFarmObj);
  } else if (reply == "No") {
      guessTheAnimal("right",animalFarmObj);
  }
}
doTheRound(animalFarm);
