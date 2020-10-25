var readlineSync = require("readline-sync");
const fs = require("fs");
const filePath = "./animalFarm.json";

//To read data from file
const loadData = (path) => {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch (err) {
    console.error(err);
    return false;
  }
};

//To write data to the JSON file
const writeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

let animalFarm = JSON.parse(JSON.parse(loadData(filePath)));
console.log(animalFarm);

console.log("Computer: Think of an animal");

function doYouWantToPlayAgain() {
  let wantToPlayAgain = readlineSync.question(
    "Computer: Do you want to play again?: "
  );
  if (wantToPlayAgain.toLowerCase() == "yes") {
    console.log(animalFarm);
    doTheRound(animalFarm);
  } else {
    console.log("Have a Good Day!");
  }
}

function guessTheAnimal(direction, animalFarmObj) {
  if (animalFarmObj[direction].question) {
    doTheRound(animalFarmObj[direction]);
  } else {
    let newReply = readlineSync.question(
      `Computer: is it a ${animalFarmObj[direction].value}? \nHuman: `
    );
    if (newReply.toLowerCase() == "yes") {
      console.log(
        `Computer: Yay! I got it. It is ${animalFarmObj[direction].value}`
      );
      writeData(JSON.stringify(animalFarm), filePath);
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
      if (newQuestionsAnswer.toLocaleLowerCase() == "yes") {
        animalFarmObj[direction].left = { value: newAnimal };
        animalFarmObj[direction].right = {
          value: animalFarmObj[direction].value,
        };
        delete animalFarmObj[direction].value;
      } else {
        animalFarmObj[direction].right = { value: newAnimal };
        animalFarmObj[direction].left = {
          value: animalFarmObj[direction].value,
        };
        delete animalFarmObj[direction].value;
      }
      writeData(JSON.stringify(animalFarm), filePath);
      doYouWantToPlayAgain();
    }
  }
}
function doTheRound(animalFarmObj) {
  console.log(`Computer: ${animalFarmObj["question"]}`);

  let reply = readlineSync.question("Human: ");
  if (reply.toLowerCase() == "yes") {
    guessTheAnimal("left", animalFarmObj);
  } else if (reply.toLowerCase() == "no") {
    guessTheAnimal("right", animalFarmObj);
  }
}
console.log("AnimalFarm is:", animalFarm);
doTheRound(animalFarm);
