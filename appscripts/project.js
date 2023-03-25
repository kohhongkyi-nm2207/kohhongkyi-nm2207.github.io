// defining everything
const characterNumber = 3;
const winningCondition = 5000;
const losingCondition = 0;
var playerMoney = 2000;
var playerChoice = "";
var currentCharacter;
var characterName;
var characterDescription

//what happens when you press the buttons
let cooperate = function() {
    playerChoice = "cooperate";
    document.getElementById("playerChoice").innerHTML="You have chosen to cooperate.";
    currentCharacter.game(playerChoice);
    checkPlayerCondition();
    roundEnd();
}
let betray = function() {  
    playerChoice = "betray";
    document.getElementById("playerChoice").innerHTML="You have chosen to betray.";
    currentCharacter.game(playerChoice);
    checkPlayerCondition();
    roundEnd();
}

// establishing the characters and the different outcomes for each character - still need to add visuals for each character. only 2 so far but a third with 50/50 probability will be added.
//each character currently is an object containing their name, description, and how the game will operate if they are spawned.
var goodGuy = {
    characterName: "Gerald",
    game: function(playerChoice) {
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Gerald also cooperated - you win $500!";
        } else {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Gerald cooperated - you win $1000!";
        }
        document.getElementById("playerMoney").innerHTML= "You now have $" + playerMoney;
    },
    characterDescription: "He's the office good boy. Will always help you get coffee if you ask for it. Tries to sit with Emily at lunch sometimes."
}
var badGuy = {
    characterName: "Emily",
    game: function(playerChoice) {
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Emily betrayed you - you lose $500!";
        } else {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Emily also betrayed you - you lose $1000!";
        }
        document.getElementById("playerMoney").innerHTML="You now have $" + playerMoney;
    },
    characterDescription: "Hates small talk. Sits alone at lunch. You'd be lucky to get a nod back if you said hi."
}
var normalGuy = {
    characterName: "Nellie",
    game: function(playerChoice) {
    let charChoice = Math.floor(Math.random()*2)
    if (playerChoice == "cooperate" && charChoice == 1) {
        playerMoney = playerMoney + 500;
        document.getElementById("overallChoice").innerHTML="Nellie also cooperated - you win $500!";
    } else if (playerChoice == "cooperate" && charChoice == 0) {
        playerMoney = playerMoney - 500;
        document.getElementById("overallChoice").innerHTML="Nellie betrayed you - you lose $500!";
    } else if (playerChoice == "betray" && charChoice == 1) {
        playerMoney = playerMoney + 1000;
        document.getElementById("overallChoice").innerHTML="Nellie cooperated - you win $1000!";
    } else if (playerChoice == "betray" && charChoice == 0) {
        playerMoney = playerMoney - 1000;
        document.getElementById("overallChoice").innerHTML="Nellie also betrayed you - you lose $1000!";
    }
    document.getElementById("playerMoney").innerHTML="You now have $" + playerMoney;
    },
    characterDescription: "Kind of a wild card. We know nothing about her except she talks to Gerald sometimes. But everyone's friends with Gerald, so."
}

// randomly selecting a character to "spawn"
var characters = [goodGuy, badGuy, normalGuy];
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
    document.getElementById("characterDescription").innerHTML = currentCharacter.characterDescription
    displayGameButtons();
}

// hide start round button and show game buttons
var displayStartRoundButton = function() {
    document.getElementById("round").removeAttribute("hidden");
    document.getElementById("cooperate").setAttribute("hidden", "hidden");
    document.getElementById("betray").setAttribute("hidden", "hidden");
    document.getElementById("character").innerHTML="";
    document.getElementById("characterDescription").innerHTML="";
}
// show start round button and hide game buttons and text
var displayGameButtons = function() {
    document.getElementById("cooperate").removeAttribute("hidden");
    document.getElementById("betray").removeAttribute("hidden");
    document.getElementById("round").setAttribute("hidden", "hidden");
    document.getElementById("playerChoice").innerHTML="";
    document.getElementById("overallChoice").innerHTML="";
    
}

// checking the player's condition
function checkPlayerCondition() {
    if (playerMoney >= winningCondition) {
        document.getElementById("gameEnd").innerHTML="YOU WIN!";
        return "end";
    } else if (playerMoney <= losingCondition) {
        document.getElementById("gameEnd").innerHTML="YOU LOSE.";
        return "end";
    }
}

//function to decide what to do at the end of the round
function roundEnd() {
    if (checkPlayerCondition() == "end") {
        document.getElementById("cooperate").setAttribute("hidden", "hidden");
        document.getElementById("betray").setAttribute("hidden", "hidden");
        document.getElementById("restart").removeAttribute("hidden");
    } else {
        displayStartRoundButton();
    }
}


//additional things to be added that have not been added yet:
//1. beautifying + adding animations basically
