// defining everything
const characterNumber = 4;
const winningCondition = 5000;
const losingCondition = 0;
var playerMoney = 2000;
var playerChoice = "";
var currentCharacter;
var characterName;
var characterDescription;
var characterNeutral;
var characterCooperate;
var characterBetray;
var characterChoice;
var cooperateCount = 0;
var betrayCount = 0;
var betrayalRate = 0;
var betrayalRateRound=0;



//what happens when you press the buttons
let cooperate = function() {
    playerChoice = "cooperate";
    cooperateCount++;
    document.getElementById("playerChoice").innerHTML="You have chosen to cooperate.";
    currentCharacter.game(playerChoice);
    outcomeAnimate();
    checkPlayerCondition();
    roundEnd();
}
let betray = function() {  
    playerChoice = "betray";
    betrayCount++;
    document.getElementById("playerChoice").innerHTML="You have chosen to betray.";
    currentCharacter.game(playerChoice);
    outcomeAnimate();
    checkPlayerCondition();
    roundEnd();
}
// establishing the characters and the different outcomes for each character 
//each character currently is an object containing their name, description, image, and how the game will operate if they are spawned.

var Gerald = {
    characterName: "Gerald",
    characterNeutral: "resources/geraldNeutral.jpg",
    characterCooperate: "resources/geraldCooperate.jpg",
    game: function(playerChoice) {
        characterChoice = 1;
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
var Emily = {
    characterName: "Emily",
    characterNeutral: "resources/emilyNeutral.jpg",
    characterBetray: "resources/emilyBetray.jpg",
    game: function(playerChoice) {
        characterChoice = 0;
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
var Nellie = {
    characterName: "Nellie",
    characterNeutral: "resources/nellieNeutral.jpg",
    characterCooperate: "resources/nellieCooperate.jpg",
    characterBetray: "resources/nellieBetray.jpg",
    game: function(playerChoice) {
    let characterChoice = Math.floor(Math.random()*2)
    if (playerChoice == "cooperate" && characterChoice == 1) {
        playerMoney = playerMoney + 500;
        document.getElementById("overallChoice").innerHTML="Nellie also cooperated - you win $500!";
    } else if (playerChoice == "cooperate" && characterChoice == 0) {
        playerMoney = playerMoney - 500;
        document.getElementById("overallChoice").innerHTML="Nellie betrayed you - you lose $500!";
    } else if (playerChoice == "betray" && characterChoice == 1) {
        playerMoney = playerMoney + 1000;
        document.getElementById("overallChoice").innerHTML="Nellie cooperated - you win $1000!";
    } else if (playerChoice == "betray" && characterChoice == 0) {
        playerMoney = playerMoney - 1000;
        document.getElementById("overallChoice").innerHTML="Nellie also betrayed you - you lose $1000!";
    }
    document.getElementById("playerMoney").innerHTML="You now have $" + playerMoney;
    },
    characterDescription: "She's the new intern, and she's kind of a wild card. We know nothing about her except she talks to Gerald sometimes. But everyone's friends with Gerald, so."
}
var Paul = {
    characterName: "Paul",
    characterNeutral: "resources/paulNeutral.jpg",
    characterCooperate: "resources/paulCooperate.jpg",
    characterBetray: "resources/paulBetray.jpg",    
    game: function(playerChoice) {
        let x = Math.random();
        if (x < 0.7) {
            characterChoice = 1
        } else {
            characterChoice = 0
        }
        if (playerChoice == "cooperate" && characterChoice == 1) {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Paul also cooperated - you win $500!";
        } else if (playerChoice == "cooperate" && characterChoice == 0) {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Paul betrayed you - you lose $500!";
        } else if (playerChoice == "betray" && characterChoice == 1) {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Paul cooperated - you win $1000!";
        } else if (playerChoice == "betray" && characterChoice == 0) {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Paul also betrayed you - you lose $1000!";
        }
        document.getElementById("playerMoney").innerHTML="You now have $" + playerMoney;
        },
        characterDescription: "Oldest employee - Paul has been at the company for 10 years. Everyone is slightly intimidated by him, and he's good friends with the boss."
    };

// randomly selecting a character to "spawn"
var characters = [Gerald, Emily, Nellie, Paul];
var lastPlayedCharacter = "";
var selectCharacter = function(characters) {
    let num = Math.floor(Math.random() * characterNumber);
    if (characters[num].characterName == lastPlayedCharacter) {
        return selectCharacter(characters);
    } else {
        lastPlayedCharacter = characters[num].characterName;
        return characters[num];
    }
}

// what happens during each round
let round = function() {
    loadSessionStorage();
    ctx.clearRect(0,0,400,400);
    document.getElementById("choose").innerHTML=""
    //reset the variables at the start of a round
    playerChoice = "";
    currentCharacter = selectCharacter(characters);
    document.getElementById("character").innerHTML="The current character you are playing against is: " + currentCharacter.characterName;
    document.getElementById("characterDescription").innerHTML = currentCharacter.characterDescription
    neutralAnimate();
    displayGameButtons();
}
// show start round button and hide game buttons and text
var displayStartRoundButton = function() {
    document.getElementById("round").removeAttribute("hidden");
    document.getElementById("cooperate").setAttribute("hidden", "hidden");
    document.getElementById("betray").setAttribute("hidden", "hidden");
    document.getElementById("character").innerHTML="";
    document.getElementById("characterDescription").innerHTML="";
}
// hide start round button and show game buttons
var displayGameButtons = function() {
    document.getElementById("cooperate").removeAttribute("hidden");
    document.getElementById("betray").removeAttribute("hidden");
    document.getElementById("box").removeAttribute("hidden")
    document.getElementById("round").setAttribute("hidden", "hidden");
    document.getElementById("playerChoice").innerHTML="";
    document.getElementById("overallChoice").innerHTML="";
    document.getElementById("playerMoney").innerHTML = "You have $" + playerMoney;
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
    betrayalRate = (betrayCount*100) / (betrayCount + cooperateCount);
    betrayalRateRound = Math.round(betrayalRate*100) / 100;
    document.getElementById("betrayalRate").innerHTML = "Your betrayal rate: " + betrayalRateRound + "%"
    if (checkPlayerCondition() == "end") {
        document.getElementById("cooperate").setAttribute("hidden", "hidden");
        document.getElementById("betray").setAttribute("hidden", "hidden");
        document.getElementById("restart").removeAttribute("hidden");
    } else {
        displayStartRoundButton();
    }
    saveSessionStorage();
}

function saveSessionStorage() {
    sessionStorage.setItem("cooperateCount", cooperateCount);
    sessionStorage.setItem("betrayCount", betrayCount);
}
function loadSessionStorage() {
    cooperateCount = sessionStorage.getItem("cooperateCount");
    betrayCount = sessionStorage.getItem("betrayCount");
    if (cooperateCount == null || betrayCount == null) {
        cooperateCount = 0;
        betrayCount = 0;
    } else {
        cooperateCount = parseInt(sessionStorage.getItem("cooperateCount"));
        betrayCount = parseInt(sessionStorage.getItem("betrayCount"));
    }
    }

//setup for animation of characters
let box = document.getElementById("box");
const ctx = box.getContext("2d");
box.width = 400;
box.height = 400;
let movingx=-200
var animationImage;

//neutral character animation function 
function neutralAnimate() {
    let neutralImage = new Image();
    neutralImage.src = currentCharacter.characterNeutral;
    //ctx.drawImage(image source, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(neutralImage, 0, 0, 510, 510, movingx, 0, 200, 400);
    if (movingx <= 100) {
        movingx = movingx + 4;
    } else {
        movingx = -200;
        return;
    }
    requestAnimationFrame(neutralAnimate);
};

//outcome character animation function
function outcomeAnimate() {
    let outcomeImage = new Image();
    if (characterChoice = 1) {
        outcomeImage.src = currentCharacter.characterCooperate;
    } else {
        outcomeImage.src = currentCharacter.characterBetray;
    }
    ctx.clearRect(0,0,400,400);
    console.log(outcomeImage.src);
    ctx.drawImage(outcomeImage, 0, 0, 510, 510, movingx, 0, 200, 400);
    if (movingx <= 100) {
        movingx = movingx + 4;
    } else {
        movingx = -200;
        return;
    }
    requestAnimationFrame(neutralAnimate);
}


