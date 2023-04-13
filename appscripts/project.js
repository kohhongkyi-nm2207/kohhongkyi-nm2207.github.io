// defining some of the global variables at the top just so it's easier to find
//game variables
const characterNumber = 6;
const winningCondition = 5000;
const losingCondition = 0;
var playerMoney = 2000;
var playerChoice = "";
var currentCharacter;
var cooperateCount = 0;
var betrayCount = 0;
var betrayalRate = 0;
var betrayalRateRound=0;
//character-specific variables
var characterName;
var characterDescription;
var characterNeutral;
var characterCooperate;
var characterBetray;
var characterChoice;

//these next two functions are  what happens when you press the cooperate/betray buttons 
let cooperate = function() {
    playerChoice = "cooperate";
    cooperateCount++;
    document.getElementById("playerChoice").innerHTML="You have chosen to cooperate with " + currentCharacter.characterName +".";
    currentCharacter.game(playerChoice);
    roundEnd();
}
let betray = function() {  
    playerChoice = "betray";
    betrayCount++;
    document.getElementById("playerChoice").innerHTML="You have chosen to betray " + currentCharacter.characterName + ".";
    currentCharacter.game(playerChoice);
    roundEnd();
}

// the following objects establish the characters and the different outcomes for each character 
// each character has a number of object properties, including their name, image sources, gameplay, and character description
var Gerald = {
    // the good one - he always cooperates
    characterName: "Gerald",
    characterNeutral: "resources/geraldNeutral.png",
    characterCooperate: "resources/geraldCooperate.png",
    game: function(playerChoice) {
        characterChoice = 1;
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Gerald also cooperated - you win $500!";
        } else {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Gerald cooperated - you win $1000!";
        }
    },
    characterDescription: "He's the office good boy. Will always help you get coffee if you ask for it."
};
var Emily = {
    // the bad one - she always betrays
    characterName: "Emily",
    characterNeutral: "resources/emilyNeutral.png",
    characterBetray: "resources/emilyBetray.png",
    game: function(playerChoice) {
        characterChoice = 0;
        if (playerChoice == "cooperate") {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Emily betrayed you - you lose $500!";
        } else {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Emily also betrayed you - you lose $1000!";
        }
    },
    characterDescription: "Hates small talk. Sits alone at lunch. You'd be lucky to get a nod back if you said hi."
};
var Nellie = {
    // her odds are 50/50
    characterName: "Nellie",
    characterNeutral: "resources/nellieNeutral.png",
    characterCooperate: "resources/nellieCooperate.png",
    characterBetray: "resources/nellieBetray.png",
    game: function(playerChoice) {
    characterChoice = Math.floor(Math.random()*2)
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
    },
    characterDescription: "She's the new intern, and she's kind of a wild card. We know nothing about her except she talks to Gerald sometimes. But everyone's friends with Gerald, so."
};
var Paul = {
    //he cooperates 70% of the time
    characterName: "Paul",
    characterNeutral: "resources/paulNeutral.png",
    characterCooperate: "resources/paulCooperate.png",
    characterBetray: "resources/paulBetray.png",    
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
        },
    characterDescription: "Oldest employee - Paul has been at the company for 10 years. Everyone is slightly intimidated by him, and he's good friends with the boss."
};

var Tiffany = {
    //will betray 70% of the time
    characterName: "Tiffany",
    characterNeutral: "resources/tiffanyNeutral.png",
    characterCooperate: "resources/tiffanyCooperate.png",
    characterBetray: "resources/tiffanyBetray.png",    
    game: function(playerChoice) {
        let x = Math.random();
        if (x < 0.3) {
            characterChoice = 1
        } else {
            characterChoice = 0
        }
        if (playerChoice == "cooperate" && characterChoice == 1) {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Tiffany also cooperated - you win $500!";
        } else if (playerChoice == "cooperate" && characterChoice == 0) {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Tiffany betrayed you - you lose $500!";
        } else if (playerChoice == "betray" && characterChoice == 1) {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Tiffany cooperated - you win $1000!";
        } else if (playerChoice == "betray" && characterChoice == 0) {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Tiffany also betrayed you - you lose $1000!";
        }
        },
    characterDescription: "The office's #1 girl crush! She's always cheery, and she's beloved by everyone."
};

var Seth = {
    // 50/50
    characterName: "Seth",
    characterNeutral: "resources/sethNeutral.png",
    characterCooperate: "resources/sethCooperate.png",
    characterBetray: "resources/sethBetray.png",    
    game: function(playerChoice) {
        characterChoice = Math.floor(Math.random()*2)
        if (playerChoice == "cooperate" && characterChoice == 1) {
            playerMoney = playerMoney + 500;
            document.getElementById("overallChoice").innerHTML="Seth also cooperated - you win $500!";
        } else if (playerChoice == "cooperate" && characterChoice == 0) {
            playerMoney = playerMoney - 500;
            document.getElementById("overallChoice").innerHTML="Seth betrayed you - you lose $500!";
        } else if (playerChoice == "betray" && characterChoice == 1) {
            playerMoney = playerMoney + 1000;
            document.getElementById("overallChoice").innerHTML="Seth cooperated - you win $1000!";
        } else if (playerChoice == "betray" && characterChoice == 0) {
            playerMoney = playerMoney - 1000;
            document.getElementById("overallChoice").innerHTML="Seth also betrayed you - you lose $1000!";
        }
        },
    characterDescription: "Needs to be caffeinated 24/7 and has a new hair colour every month. Sometimes you wonder if he's okay."
};



// randomly selecting a character to spawn - this includes making sure that the last 2 characters that were played do not spawn again
var characters = [Gerald, Emily, Nellie, Paul, Tiffany, Seth];
var previousCharacters = [];
var selectCharacter = function(characters) {
    if (previousCharacters.length>=6) {
        previousCharacters.length = 0;
    };
    let num = Math.floor(Math.random() * characterNumber);
    if (previousCharacters.includes(characters[num].characterName)) {
        return selectCharacter(characters);
    } else {
        previousCharacters.push(characters[num].characterName)
        return characters[num];
    }
}


// what happens during each round when the "start round" button is pressed
let round = function() {
    loadSessionStorage();
    ctx.clearRect(0,0,400,400);
    document.getElementById("choose").innerHTML=""
    playerChoice = "";
    currentCharacter = selectCharacter(characters);
    document.getElementById("character").innerHTML="The current character you are playing against is: " + currentCharacter.characterName;
    document.getElementById("characterDescription").innerHTML = currentCharacter.characterDescription
    neutralAnimate();
    displayGameButtons();
}
// this function hides the "start round" button and shows the game buttons and text - runs after "start round" is pressed
var displayGameButtons = function() {
    document.getElementById("cooperate").removeAttribute("hidden");
    document.getElementById("betray").removeAttribute("hidden");
    document.getElementById("box").removeAttribute("hidden")
    document.getElementById("popupButton").removeAttribute("hidden")
    document.getElementById("round").setAttribute("hidden", "hidden");
    document.getElementById("instructions").setAttribute("hidden", "hidden");
    document.getElementById("playerChoice").innerHTML="";
    document.getElementById("overallChoice").innerHTML="";
    document.getElementById("playerMoney").innerHTML = "You have $" + playerMoney;
}
// this function shows the "start round" button and hides game buttons and text - runs if the player does not game over
var displayStartRoundButton = function() {
    document.getElementById("round").removeAttribute("hidden");
    document.getElementById("cooperate").setAttribute("hidden", "hidden");
    document.getElementById("betray").setAttribute("hidden", "hidden");
    document.getElementById("character").innerHTML="";
    document.getElementById("characterDescription").innerHTML="";
}

// checking the player's money to determine the outcome of the round
function checkPlayerCondition() {
    if (playerMoney >= winningCondition) {
        document.getElementById("gameEnd").innerHTML="YOU WIN!";
        return "end";
    } else if (playerMoney <= losingCondition) {
        document.getElementById("gameEnd").innerHTML="YOU LOSE.";
        return "end";
    }
}

//function that executes at the end of the round, also checks if the player has game overed yet 
function roundEnd() {
    outcomeAnimate();
    checkPlayerCondition();
    betrayalRate = (betrayCount*100) / (betrayCount + cooperateCount);
    betrayalRateRound = Math.round(betrayalRate*100) / 100;
    document.getElementById("betrayalRate").innerHTML = "Your betrayal rate: " + betrayalRateRound + "%"
    document.getElementById("playerMoney").innerHTML= "You now have $" + playerMoney;
    if (checkPlayerCondition() == "end") {
        document.getElementById("cooperate").setAttribute("hidden", "hidden");
        document.getElementById("betray").setAttribute("hidden", "hidden");
        document.getElementById("character").setAttribute("hidden", "hidden");
        document.getElementById("playerChoice").setAttribute("hidden", "hidden");
        document.getElementById("overallChoice").setAttribute("hidden", "hidden");
        document.getElementById("characterDescription").setAttribute("hidden", "hidden");
        document.getElementById("playerMoney").setAttribute("hidden", "hidden");
        document.getElementById("betrayalRate").setAttribute("hidden", "hidden");
        document.getElementById("popupButton").setAttribute("hidden", "hidden");
        document.getElementById("restart").removeAttribute("hidden");
    } else {
        displayStartRoundButton();
    }
    saveSessionStorage();
}

//these two functions serve to store and load the cooperate and betray counts within the sessionStorage so that they don't reset even after one game
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
box.width = 1200;
box.height = 1200;
let movingx=-200
var animationImage;

//neutral character animation function that introduces character
function neutralAnimate() {
    let neutralImage = new Image();
    neutralImage.src = currentCharacter.characterNeutral;
    ctx.clearRect(0,0,1200,1200);
    //ctx.drawImage(image source, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(neutralImage, 0, 0, 1200, 1200, movingx, 0, 600, 1200);
    if (movingx <= 300) {
        movingx = movingx + 8;
    } else {
        movingx = -200;
        return;
    }
    requestAnimationFrame(neutralAnimate);
};

//outcome character animation function that runs based on what the character "chooses"
function outcomeAnimate() {
    let outcomeImage = new Image();
    if (characterChoice == 1) {
        outcomeImage.src = currentCharacter.characterCooperate;
    } else {
        outcomeImage.src = currentCharacter.characterBetray;
    }
    ctx.clearRect(0,0,1200,1200);
    ctx.drawImage(outcomeImage, 0, 0, 1200, 1200, movingx, 0, 600, 1200);
    if (movingx <= 300) {
        movingx = movingx + 8;
    } else {
        movingx = -200;
        return;
    }
    requestAnimationFrame(outcomeAnimate);
    console.log(outcomeImage)
}

//popup functions
var popup = document.getElementById("popup");
function openPopup() {
    // document.getElementById("popup").classList.add("openPopup");
    popup.style.visibility = "visible";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
};

function closePopup() {
    popup.style.visibility = "hidden";
    popup.style.top = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.1)";
};


