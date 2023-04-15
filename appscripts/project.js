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
var betrayalRateRound = 0;
//character-specific variables
var characterName;
var characterDescription;
var characterNeutral;
var characterCooperate;
var characterBetray;
var characterChoice;

// the following objects establish the characters and the different outcomes for each character 
// each character has a number of object properties, including their name, image sources, "choice", and their character description
var Gerald = {
    // the good one - he always cooperates
    characterName: "Gerald",
    characterNeutral: "resources/geraldNeutral.png",
    characterCooperate: "resources/geraldCooperate.png",
    choice: function () {
        characterChoice = 1;
        return characterChoice
    },
    characterDescription: "He's the office good boy. Will always help you get coffee if you ask for it. Tries to sit with Emily at lunch sometimes, but he hasn't succeeded once."
};
var Emily = {
    // the bad one - she always betrays
    characterName: "Emily",
    characterNeutral: "resources/emilyNeutral.png",
    characterBetray: "resources/emilyBetray.png",
    choice: function () {
        characterChoice = 0;
        return characterChoice
    },    
    characterDescription: "Hates small talk. Sits alone at lunch. You'd be lucky to get a nod back if you said hi. She's also crazy good at her job."
};
var Nellie = {
    // her odds are 50/50
    characterName: "Nellie",
    characterNeutral: "resources/nellieNeutral.png",
    characterCooperate: "resources/nellieCooperate.png",
    characterBetray: "resources/nellieBetray.png",
    choice: function () {
        characterChoice = Math.floor(Math.random()*2);
        return characterChoice
    },
    characterDescription: "She's the new intern, and she's kind of a wild card. We know nothing about her except she talks to Gerald sometimes. But everyone's friends with Gerald, so."
};
var Paul = {
    //he cooperates 70% of the time
    characterName: "Paul",
    characterNeutral: "resources/paulNeutral.png",
    characterCooperate: "resources/paulCooperate.png",
    characterBetray: "resources/paulBetray.png",    
    choice: function() {
        let x = Math.random();
        if (x < 0.7) {
            characterChoice = 1
        } else {
            characterChoice = 0
        }
        return characterChoice;
        },
    characterDescription: "Oldest employee - Paul has been at the company for 10 years. Everyone is slightly intimidated by him, and he's good friends with the boss."
};
var Tiffany = {
    //will betray 70% of the time
    characterName: "Tiffany",
    characterNeutral: "resources/tiffanyNeutral.png",
    characterCooperate: "resources/tiffanyCooperate.png",
    characterBetray: "resources/tiffanyBetray.png",    
    choice: function() {
        let x = Math.random();
        if (x < 0.3) {
            characterChoice = 1
        } else {
            characterChoice = 0
        }
        return characterChoice;
        },
    characterDescription: "Always smiling somehow (even at 8 a.m.). She's beloved by almost everyone, but honestly you find the constant smiling a bit creepy. Oh and: Seth definitely has a crush on her."
};
var Seth = {
    // 50/50
    characterName: "Seth",
    characterNeutral: "resources/sethNeutral.png",
    characterCooperate: "resources/sethCooperate.png",
    characterBetray: "resources/sethBetray.png",    
    choice: function () {
        characterChoice = Math.floor(Math.random()*2);
        return characterChoice
    },    
    characterDescription: "Needs to be caffeinated 24/7 and has a new hair colour every month. Sometimes you wonder if he's okay."
};

// randomly selecting a character to spawn - this includes making sure that the characters that were played do not spawn again
var characters = [Gerald, Emily, Nellie, Paul, Tiffany, Seth];
var previousCharacters = [];
var selectCharacter = function(characters) {
    //if all the characters (6) have already been played, the first 2 are removed from the array so that the next character is not one of the previous 4 characters played
    if (previousCharacters.length>=6) {
        previousCharacters.splice(0,2);
    };
    let num = Math.floor(Math.random() * characterNumber);
    //if the character generated is in the previousCharacters array, the function reruns to generate a new character
    if (previousCharacters.includes(characters[num].characterName)) {
        return selectCharacter(characters);
    } else {
    //if not, then the character is added to the previousCharacters array then generated for the user to play against
        previousCharacters.push(characters[num].characterName)
        return characters[num];
    }
};

// these next two functions are what happens when you press the cooperate/betray buttons 
let cooperate = function() {
    //sets the player's choice to cooperate and adds to their cooperate count
    playerChoice = "cooperate";
    cooperateCount++;
    //displays player's choice on the page
    document.getElementById("playerChoice").innerHTML="You have chosen to cooperate with " + currentCharacter.characterName +".";
    //executes the game based on the current character, then ends the round
    gameOutcome ("cooperate", currentCharacter.choice());
    roundEnd();
};
//largely same as above ^
let betray = function() {  
    playerChoice = "betray";
    betrayCount++;
    document.getElementById("playerChoice").innerHTML="You have chosen to betray " + currentCharacter.characterName + ".";
    gameOutcome ("betray", currentCharacter.choice());
    roundEnd();
};

// this function determines the outcome of the game depending on the player and character's choice
// characterChoice == 1 corresponds to the character cooperating, and characterChoice == 0 corresponds to the character betraying
function gameOutcome(playerChoice, characterChoice) {
    if (playerChoice == "cooperate" && characterChoice == 1) {
        playerMoney = playerMoney + 500;
        document.getElementById("overallChoice").innerHTML= currentCharacter.characterName + " also cooperated - you win $500!";
    } else if (playerChoice == "cooperate" && characterChoice == 0) {
        playerMoney = playerMoney - 500;
        document.getElementById("overallChoice").innerHTML= currentCharacter.characterName + " betrayed you - you lose $500!";
    } else if (playerChoice == "betray" && characterChoice == 1) {
        playerMoney = playerMoney + 1000;
        document.getElementById("overallChoice").innerHTML= currentCharacter.characterName+ " cooperated - you win $1000!";
    } else if (playerChoice == "betray" && characterChoice == 0) {
        playerMoney = playerMoney - 1000;
        document.getElementById("overallChoice").innerHTML= currentCharacter.characterName + " also betrayed you - you lose $1000!";
    }
};

// what happens during each round when the "start round" button is pressed
function round() {
    //initialisation steps: loading the previous cooperate/betray counts, removing animation, resetting player's choice and the characters
    loadSessionStorage();
    document.getElementById("playerMoney").classList.remove("textanimate");
    playerChoice = "";    
    document.getElementById("character").innerHTML="";
    document.getElementById("characterDescription").innerHTML="";
    //shows the cooperate and betray buttons, selects the character, then starts the animation to introduce that character
    displayGameButtons();
    currentCharacter = selectCharacter(characters);
    neutralAnimate();
    //calculating betrayal rate
    betrayalRate = (betrayCount*100) / (betrayCount + cooperateCount);
    betrayalRateRound = Math.round(betrayalRate*100) / 100;
    //displaying the character, description, and betrayal rate for the player
    document.getElementById("character").innerHTML="The current character you are playing against is: " + currentCharacter.characterName;
    document.getElementById("characterDescription").innerHTML = currentCharacter.characterDescription
    if (betrayalRate >=0 ) {
        document.getElementById("betrayalRate").innerHTML = "Your betrayal rate: " + betrayalRateRound + "%"
    } else {
        document.getElementById("betrayalRate").innerHTML = "Your betrayal rate: __%"
    }
};

// this function hides the "start game/next round" button and shows the game buttons and text - runs after game/round is started
// hides/shows a lot of other stuff too:
function displayGameButtons() {
    //showing the game buttons, popup instructions button, player's money status, 
    document.getElementById("cooperate").removeAttribute("hidden");
    document.getElementById("betray").removeAttribute("hidden");
    document.getElementById("popupButton").removeAttribute("hidden")
    document.getElementById("playerMoney").innerHTML = "You have $" + playerMoney;
    //hides start game button, next round button, instructions, and the overall outcome of the game (to be revealed after the round)
    document.getElementById("game").setAttribute("hidden", "hidden");
    document.getElementById("round").setAttribute("hidden", "hidden");
    document.getElementById("instructions").setAttribute("hidden", "hidden");
    document.getElementById("playerChoice").setAttribute("hidden", "hidden");
    document.getElementById("overallChoice").setAttribute("hidden", "hidden");
};

// this function shows the "next round" button and hides game buttons and text - runs if the player does not game over
// also hides the player's money status
function displayRoundButton() {
    document.getElementById("cooperate").setAttribute("hidden", "hidden");
    document.getElementById("betray").setAttribute("hidden", "hidden");
    document.getElementById("playerMoney").setAttribute("hidden", "hidden");
};

// checking the player's money status (if it's over $5000 or below $0) to determine the outcome of the round
function checkPlayerCondition() {
    if (playerMoney >= winningCondition) {
        document.getElementById("gameEnd").innerHTML="YOU WIN!";
        return "end";
    } else if (playerMoney <= losingCondition) {
        document.getElementById("gameEnd").innerHTML="YOU LOSE.";
        return "end";
    }
};

//function that executes at the end of the round, also checks if the player has game over-ed yet 
function roundEnd() {
    //starting the text animation for the player's choice, updates player's money status, and hides the game buttons + money status
    addTextAnimation();
    document.getElementById("playerMoney").innerHTML= "You now have $" + playerMoney;
    displayRoundButton();
    //checking if game over - if game has ended, hides most of the surrounding elements of the game. if not, 
    checkPlayerCondition();
    if (checkPlayerCondition() == "end") {
        document.getElementById("cooperate").setAttribute("hidden", "hidden");
        document.getElementById("betray").setAttribute("hidden", "hidden");
        document.getElementById("character").setAttribute("hidden", "hidden");
        document.getElementById("characterDescription").setAttribute("hidden", "hidden");
        document.getElementById("playerMoney").setAttribute("hidden", "hidden");
    } 
    //saves the current cooperate and betray counts
    saveSessionStorage();
};

//these two functions serve to store and load the cooperate and betray counts within the sessionStorage so that they don't reset even after one game when the page is loaded - only resets if the window is closed.
function saveSessionStorage() {
    sessionStorage.setItem("cooperateCount", cooperateCount);
    sessionStorage.setItem("betrayCount", betrayCount);
}
function loadSessionStorage() {
    cooperateCount = sessionStorage.getItem("cooperateCount");
    betrayCount = sessionStorage.getItem("betrayCount");
    //this is set in place for the very first round - when sessionStorage is restored there would be nothing inside and return null, so i had to set the values to 0 so that betrayal rate can be calculated
    if (cooperateCount == null || betrayCount == null) {
        cooperateCount = 0;
        betrayCount = 0;
    } else {
        //sessionStorage stores values as strings, so had to change them back to a number before calculating betrayal rate
        cooperateCount = parseInt(sessionStorage.getItem("cooperateCount"));
        betrayCount = parseInt(sessionStorage.getItem("betrayCount"));
    }
};

//setup for animation of characters
var box = document.getElementById("box");
const ctx = box.getContext("2d");
box.width = 1200;
box.height = 1200;
var movingx = -200;
var animationImage;

//neutral character animation function that introduces character
function neutralAnimate() {
    //creates new image, then sets the source to be the intro image of the current character
    let neutralImage = new Image();
    neutralImage.src = currentCharacter.characterNeutral;
    //resets canvas
    ctx.clearRect(0,0,1200,1200);
    //ctx.drawImage(image source, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(neutralImage, 0, 0, 1200, 1200, movingx, 0, 600, 1200);
    //if the x position of the image is less than 300, it moves until it reaches 300. if not, it is reset to -200 for the next character
    if (movingx <= 300) {
        movingx = movingx + 8;
    } else {
        movingx = -200;
        return;
    }
    //function calls itself for the animation to run
    requestAnimationFrame(neutralAnimate);
};
//outcome character animation function that runs based on what the character "chooses" 
//works largely the same as above^
function outcomeAnimate() {
    let outcomeImage = new Image();
    //depending on whether the character cooperates or betrays, the corresponding image is retrieved and set as the source
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
}

//popup functions to enable/disable the popup for instructions - involves changing the visibility, position, and size of the popup
var popup = document.getElementById("popup");
function openPopup() {
    popup.style.visibility = "visible";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
};
function closePopup() {
    popup.style.visibility = "hidden";
    popup.style.top = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.1)";
};

//this function adds the typewriter animation for the player's choice
function addTextAnimation() {
    document.getElementById("playerChoice").removeAttribute("hidden");
    document.getElementById("playerChoice").classList.add("textanimate");
}
// once animation for playerChoice is done running, animation is added for overallChoice and the outcome image after 1.5s delay
document.getElementById("playerChoice").addEventListener("animationend", function () {
    setTimeout(function() {
    //overallChoice animation
    document.getElementById("overallChoice").classList.add("textanimate");
    document.getElementById("overallChoice").removeAttribute("hidden");
    //outcome image animation
    outcomeAnimate();
    //removes animation from playerChoice so that the cursor stops blinking
    document.getElementById("playerChoice").classList.remove("textanimate");
    }, 1500);
    // once overallChoice and outcome image animation is done, animation is now added for either playerMoney or the game over text after 0.5s delay
    document.getElementById("overallChoice").addEventListener("animationend", function onAnimationEnd() {
        setTimeout(function() {
        //removes animation from overallChoice so that the cursor stops blinking
        document.getElementById("overallChoice").classList.remove("textanimate");
            //if the game has not ended, animation is added for playerMoney and the next round button is displayed
            if (checkPlayerCondition() !== "end") {
            document.getElementById("playerMoney").classList.add("textanimate");
            document.getElementById("playerMoney").removeAttribute("hidden");
            document.getElementById("round").removeAttribute("hidden");
            } else { 
            //if the game has ended, animation is added for the game over text and the restart button is displayed
            document.getElementById("gameEnd").classList.add("textanimate");
            document.getElementById("gameEnd").removeAttribute("hidden");
            document.getElementById("restart").removeAttribute("hidden");
            };
        }, 500)
    }); 
});

