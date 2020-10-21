var readlineSync = require("readline-sync");

// Wait for user's response.

let animalFarm = {
  question: "Can it fly?",
  left: {},
  right: { value: "Duck" },
};

function doTheRound() {
  console.log("Computer: Think of an animal");
  console.log(`Computer: ${animalFarm["question"]}`);

  let reply = readlineSync.question("Human: ");

  if (reply == "Yes") {
    console.log(`Yay! I got it. It is ${animalFarm.right.value}`);
    let wantToPlayAgain = readlineSync.question(
      "Computer: Do you want to play again?: "
    );
    if (wantToPlayAgain == "Yes") {
      doTheRound();
    } else {
      console.log("Have a Good Day!");
    }
  } else {
    console.log("Computer: Oops - looks like I need to improve.");
    let newAnimal = readlineSync.question(
      `Computer: What is the animal?: \nHuman: `
    );
    animalFarm["left"]["question"] = readlineSync.question(
      `Computer: What question would distinguish between ${newAnimal} and ${animalFarm.right.value} \nHuman:  `
    );
    let newQuestionsAnswer = readlineSync.question(
      `Computer: For the ${newAnimal} is the Answer Yes or No \nHuman: `
    );
    console.log("Computer: Thanks for helping me to improve!");
    let wantToPlayAgain = readlineSync.question(
      "Computer: Do you want to play again?: "
    );
    if (wantToPlayAgain == "Yes") {
      doTheRound();
    } else {
      console.log("Have a Good Day!");
    }
    console.log(animalFarm);
  }
}
doTheRound();
