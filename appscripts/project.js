// defining everything
const characterNumber = 2;
const winningCondition = 5000;
const losingCondition = 0;
var playerMoney = 2000;
var playerChoice = "";
var currentCharacter;
var characterName;

//what happens when you press the buttons
let cooperate = function() {
    playerChoice = "cooperate";
    document.getElementById("playerChoice").innerHTML="You have chosen to cooperate.";
    currentCharacter.game(playerChoice);
    displayStartRoundButton();
}
let betray = function() {  
    playerChoice = "betray";
    document.getElementById("playerChoice").innerHTML="You have chosen to betray.";
    currentCharacter.game(playerChoice);
    displayStartRoundButton();
}

// establishing the characters and the different outcomes for each character - still need to add visuals for each character. only 2 so far but a third with 50/50 probability will be added.
//each character currently is an object containing their name and how the game will operate if they are spawned.
var goodGuy = {
    characterName: "Good Gerald",
    game: function(playerChoice) {
        characterName = "Good Gina";
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Gerald also cooperated - you win $500!";
        } else {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Gerald cooperated - you win $1000!";
        }
        document.getElementById("playerMoney").innerHTML= "You now have $" + playerMoney;
    }
}
var badGuy = {
    characterName: "Evil Emily",
    game: function(playerChoice) {
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Emily betrayed you - you lose $500!";
        } else {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Emily also betrayed you - you lose $1000!";
        }
        document.getElementById("playerMoney").innerHTML="You now have $" + playerMoney;
    }
}

// randomly selecting a character to "spawn"
var characters = [goodGuy, badGuy];
var selectCharacter = function(characters) {
    let num = Math.floor(Math.random() * characterNumber);
    return characters[num];
}

// what happens during each round
let round = function() {
    document.getElementById("choose").innerHTML=""
    //reset the variables at the start of a round
    playerChoice = "";
    currentCharacter = selectCharacter(characters);
    document.getElementById("character").innerHTML="The current character you are playing against is: " + currentCharacter.characterName;
    displayGameButtons();
}

// hide start round button and show game buttons
var displayStartRoundButton = function() {
    document.getElementById("round").removeAttribute("hidden");
    document.getElementById("cooperate").setAttribute("hidden", "hidden");
    document.getElementById("betray").setAttribute("hidden", "hidden");
    document.getElementById("character").innerHTML="";
}
// show start round button and hide game buttons and text
var displayGameButtons = function() {
    document.getElementById("cooperate").removeAttribute("hidden");
    document.getElementById("betray").removeAttribute("hidden");
    document.getElementById("round").setAttribute("hidden", "hidden");
    document.getElementById("playerChoice").innerHTML="";
    document.getElementById("overallChoice").innerHTML="";
}

// checking the player's condition - i'm still trying to figure this part out: how to end the game and then restart
function checkPlayerCondition() {
    if (playerMoney >= winningCondition) {
        document.getElementById("gameEnd").innerHTML="YOU WIN!";
        return "gameEnd";
    } else if (playerMoney <= losingCondition) {
        document.getElementById("gameEnd").innerHTML="YOU LOSE.";
        return "gameEnd";
    }
}

//additional things to be added that have not been added yet:
//1. animations for characters + money being given/taken away
//2. more characters
//3. ending the game