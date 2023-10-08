"use strict";

function updateTimerDisplay(minutes, seconds) {
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function timer(minutes, seconds, cb) {
    let remaningMinutes = minutes;
    let remaningSeconds = seconds;
    let intervalId

    function update() {
        cb();

        if (remaningMinutes === 0 && remaningSeconds === 0) {
            clearInterval(intervalId);
            document.getElementById("readyIn").textContent = "Boom done!";
            document.getElementById("homeButton").style.display = "block";
            document.getElementById("homeButton").addEventListener("click", function () {
                document.getElementById("eggParent").classList.remove("active");
                document.getElementById("startButton").style.display = "block";
                document.getElementById("infoButton").style.display = "block";
                document.getElementById("questionContainer").style.display = "block";
                document.getElementById("readyIn").style.display = "none";
                document.getElementById("homeButton").style.display = "none";
                document.getElementById("content").innerHTML = "";

                for(let i = 0; i < howDone.length; i++) {
                    howDone[i].classList.remove("selectedButton");
                    howDone[i].style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
                }

                for(let i = 0; i < eggSize.length; i++) {
                    eggSize[i].classList.remove("selectedButton");
                    eggSize[i].style.backgroundColor = "#E1F2F4";
                    eggSize[i].style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
                }

                chosenOptions.firstChosen = "";
                chosenOptions.size = "";
                chosenOptions.howDone = "";
                document.querySelector("span#minutes").textContent = `00`;
                document.querySelector("span#seconds").textContent = `00`; 
            });
        } else {
            if (remaningSeconds === 0) {
                remaningMinutes--;
                remaningSeconds = 59;
            } else {
                remaningSeconds--;
            }
        }
        updateTimerDisplay(remaningMinutes, remaningSeconds);
    }

    intervalId = setInterval(update, 1000);

}

let callback = function () {
    console.log('callback');
};

document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("readyIn").textContent = "Ready in...";
    let minutes = parseInt(document.querySelector("span#minutes").textContent);
    let seconds = parseInt(document.querySelector("span#seconds").textContent);
    timer(minutes, seconds, callback);

    document.getElementById("startButton").style.display = "none";
    document.getElementById("timer").style.display = "block";
    document.getElementById("readyIn").style.display = "block";
    document.getElementById("infoButton").style.display = "none";
    document.getElementById("questionContainer").style.display = "none";

    document.getElementById("eggParent").classList.toggle("active");

});

document.getElementById("infoButton").addEventListener("click", function () {
    document.getElementById("timer").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("infoButton").style.display = "none";
    document.getElementById("questionContainer").style.display = "none";


    document.getElementById("content").innerHTML = `
    <h1>How to boil an egg</h1>

    <ol>
    <li>Check the size of your egg by looking at the bottom of the egg carton</li>
    <li>Select how you would like your egg</li>
    <li>Boil water in a medium sized pot</li>
    <li>Lay egg in water using a spoon</li>
    <li>Start timer</li>
    <li>A couple of minutes later...</li>
    <li>Boom done!</li>
    </ol>

    <button id="goBackButton">Go Back</button>
    `;

    document.getElementById("goBackButton").addEventListener("click", function () {
        document.getElementById("timer").style.display = "block";
        document.getElementById("startButton").style.display = "block";
        document.getElementById("infoButton").style.display = "block";
        document.getElementById("questionContainer").style.display = "block";
        document.getElementById("content").innerHTML = "";
    });
})


function setEggTimer(incrementMinutes, incrementSeconds) {
    let minutesInterval;
    let secondsInterval;

    let initialMinutes = parseInt(document.querySelector("span#minutes").textContent);
    let initialSeconds = parseInt(document.querySelector("span#seconds").textContent);

    let notDone = {
        minutes: "",
        seconds: ""
    };

    if (incrementMinutes !== undefined) {
        notDone.minutes = "notDone";
        if (incrementMinutes !== 0) {
            let totalMinutes = initialMinutes + incrementMinutes;
            let i = initialMinutes + 1;
            minutesInterval = setInterval(function () {
                document.querySelector("span#minutes").textContent = `0${i}`;
                if (i === totalMinutes) {
                    clearInterval(minutesInterval);
                    notDone.minutes = "done";
                    if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                        turnEventListenersOn();
                    }
                }
                i++;

            }, 100);
        } else {
            document.querySelector("span#minutes").textContent = `0${initialMinutes}`;
        }
    }

    if (incrementSeconds !== undefined) {
        notDone.seconds = "notDone";
        let totalSeconds = initialSeconds + incrementSeconds;
        let i = initialSeconds + 1;

        secondsInterval = setInterval(function () {
            if (JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }

            if (i === totalSeconds) {
                clearInterval(secondsInterval);
                notDone.seconds = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i++;
        }, 70);

    }

}

let chosenOptions = {
    howDone: "",
    size: "",
    firstChosen: "",
    previousSize: "",
    previousHowDone: ""
};

let div = document.createElement("div");
document.querySelector("body").appendChild(div);
div.setAttribute("id", "questionContainer");
div.innerHTML =
`
    <div id="title">Size</div>
    <div class="buttonRow">
        <div class="size" id="S">S</div>
        <div class="size" id="M">M</div>
        <div class="size" id="L">L</div>
    </div>
    <div id="title">How do you want your eggs</div>
    <div class="buttonRow-2">
    <div class="howDoneOption">
        <div class="howDone" id="Soft"></div>
        <div id="howDoneTitle">Soft</div>
        </div>
        <div class="howDoneOption">
        <div class="howDone" id="Medium"></div>
        <div id="howDoneTitle">Medium</div>
        </div>
        <div class="howDoneOption">
        <div class ="howDone" id="Hard"></div>
        <div id="howDoneTitle">Hard</div>
        </div>
    </div>
    </div>
`;

let howDone = document.querySelectorAll("div.howDone");

for (let i = 0; i < howDone.length; i++) {
    howDone[i].addEventListener("click", howBoiled);
    howDone[i].addEventListener("click", toggleBoxShadow);
}

function toggleBoxShadow(event) {

    for(let i = 0; i < howDone.length; i++) {
        if(event.target.id === howDone[i].getAttribute("id")) {
            continue;
        }
        howDone[i].classList.remove("selectedButton");
        howDone[i].style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
    }

    if(event.target.classList.contains("selectedButton")) {
        event.target.classList.remove("selectedButton");
        event.target.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
    } else {
        event.target.classList.add("selectedButton")
        event.target.style.boxShadow = "none";
    }

    for (let i = 0; i < howDone.length; i++) {
        howDone[i].style.pointerEvents = "none";
    }
    for (let i = 0; i < eggSize.length; i++) {
        eggSize[i].style.pointerEvents = "none";
    }
}


let eggSize = document.querySelectorAll("div.size");

function toggleButtonColor(event) {
     if(event.target.id === "S") {
         if(document.querySelector("div#M").classList.contains("selectedButton")) {
            document.querySelector("div#M").classList.remove("selectedButton");
            document.querySelector("div#M").style.backgroundColor = "#E1F2F4";
            document.querySelector("div#M").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        } else if(document.querySelector("div#L").classList.contains("selectedButton")) {
            document.querySelector("div#L").classList.remove("selectedButton");
            document.querySelector("div#L").style.backgroundColor = "#E1F2F4";
            document.querySelector("div#L").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        } 

       if(event.target.classList.contains("selectedButton")) {
            event.target.classList.remove("selectedButton");
            event.target.style.backgroundColor = "#E1F2F4";
            event.target.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        } else {
            event.target.classList.add("selectedButton")
            event.target.style.backgroundColor = "#9ED0D6";
            event.target.style.boxShadow = "none";
        }
        
     } else if(event.target.id === "M") {
       if(document.querySelector("div#S").classList.contains("selectedButton")) {
           document.querySelector("div#S").classList.remove("selectedButton");
           document.querySelector("div#S").style.backgroundColor = "#E1F2F4";
           document.querySelector("div#S").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        } else if(document.querySelector("div#L").classList.contains("selectedButton")) {
            document.querySelector("div#L").classList.remove("selectedButton");
            document.querySelector("div#L").style.backgroundColor = "#E1F2F4";
            document.querySelector("div#L").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
         }

         if(event.target.classList.contains("selectedButton")) {
            event.target.classList.remove("selectedButton");
            event.target.style.backgroundColor = "#E1F2F4";
            event.target.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
         } else {
            event.target.classList.add("selectedButton")
            event.target.style.backgroundColor = "#9ED0D6";
            event.target.style.boxShadow = "none";
         }
   
     } else if(event.target.id === "L") {
         if(document.querySelector("div#S").classList.contains("selectedButton")) {
            document.querySelector("div#S").classList.remove("selectedButton");
            document.querySelector("div#S").style.backgroundColor = "#E1F2F4";
            document.querySelector("div#S").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
         } else if(document.querySelector("div#M").classList.contains("selectedButton")) {
            document.querySelector("div#M").classList.remove("selectedButton");
            document.querySelector("div#M").style.backgroundColor = "#E1F2F4";
            document.querySelector("div#M").style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
         } 
         
         if(event.target.classList.contains("selectedButton")) {
            event.target.classList.remove("selectedButton");
            event.target.style.backgroundColor = "#E1F2F4";
            event.target.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
         } else {
            event.target.classList.add("selectedButton")
            event.target.style.backgroundColor = "#9ED0D6";
            event.target.style.boxShadow = "none";
         }
     }

    for (let i = 0; i < eggSize.length; i++) {
        eggSize[i].style.pointerEvents = "none";
    }

    for (let i = 0; i < howDone.length; i++) {
        howDone[i].style.pointerEvents = "none";
    }
    
}
for (let i = 0; i < eggSize.length; i++) {
    eggSize[i].addEventListener("click", decideEggSize);
    eggSize[i].addEventListener("click", toggleButtonColor);

}

function howBoiled(event) {
  
    let incrementMinutes;

    if(chosenOptions.howDone !== "" && chosenOptions.size !== "" && event.target.id !== chosenOptions.howDone) {
        chosenOptions.firstChosen = "";
        chosenOptions.size = "";
        chosenOptions.howDone = "";
        document.querySelector("span#minutes").textContent = `00`;
        document.querySelector("span#seconds").textContent = `00`; 
        eggSize.forEach(button => {
            button.classList.remove("selectedButton");
            button.style.backgroundColor = "#E1F2F4";
            button.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
        });
    } else if(chosenOptions.howDone === "" && chosenOptions.size === "") {
        chosenOptions.firstChosen = "";
    }

    if (chosenOptions.firstChosen === "") {
        //Add default times for howDone
        chosenOptions.firstChosen = "howDone";
    }

    if (chosenOptions.firstChosen === "howDone") {
        if (chosenOptions.howDone === "") {
            if (event.originalTarget.id === "Soft") {
                incrementMinutes = 3;
                chosenOptions.howDone = "Soft";
            } else if (event.originalTarget.id === "Medium") {
                incrementMinutes = 4;
                chosenOptions.howDone = "Medium";
            } else {
                incrementMinutes = 8;
                chosenOptions.howDone = "Hard";
            }

            setEggTimer(incrementMinutes);
        } else if (chosenOptions.howDone === event.originalTarget.id) {
            chosenOptions.previousHowDone = chosenOptions.howDone;
            chosenOptions.howDone = "";
            let minutesToRemove;
            if (event.originalTarget.id === "Soft") {
                minutesToRemove = 3;
            } else if (event.originalTarget.id === "Medium") {
                minutesToRemove = 4;
            } else {
                minutesToRemove = 8;
            }
            removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
        } else if (chosenOptions.howDone !== event.originalTarget.id && chosenOptions.size === "") {
            let previousIncrease;
            let currentIncrease;
            if (chosenOptions.howDone === "Soft") {
                previousIncrease = 3;
            } else if (chosenOptions.howDone === "Medium") {
                previousIncrease = 4;
            } else {
                previousIncrease = 8;
            }

            chosenOptions.previousHowDone = chosenOptions.howDone;
            if (event.originalTarget.id === "Soft") {
                currentIncrease = 3;
                chosenOptions.howDone = "Soft";
            } else if (event.originalTarget.id === "Medium") {
                currentIncrease = 4;
                chosenOptions.howDone = "Medium";
            } else {
                currentIncrease = 8;
                chosenOptions.howDone = "Hard";
            }

            adjustTheDifference(previousIncrease, currentIncrease);
        } 
    } else if (chosenOptions.firstChosen === "size") {
        if (chosenOptions.howDone === "") {
            if (chosenOptions.size === "S" && event.originalTarget.id === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Soft") {
                let incrementSeconds = 40;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.size === "S" && event.originalTarget.id === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.size === "S" && event.originalTarget.id === "Hard") {
                incrementMinutes = 5;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, undefined);
            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 30;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            }

        } else if (chosenOptions.howDone === event.originalTarget.id) {
            chosenOptions.howDone = "";
            let minutesToRemove;
            let secondsToRemove;
            if (chosenOptions.size === "S" && event.originalTarget.id === "Soft") {
                let secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Soft") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Soft") {
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if (chosenOptions.size === "S" && event.originalTarget.id === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.size === "S" && event.originalTarget.id === "Hard") {
                minutesToRemove = 5;
                removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
            } else if (chosenOptions.size === "M" && event.originalTarget.id === "Hard") {
                minutesToRemove = 5;
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.size === "L" && event.originalTarget.id === "Hard") {
                minutesToRemove = 5;
                secondsToRemove = 30;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.size === "") {
                chosenOptions.howDone = "";
                let minutesToRemove;
                let secondsToRemove;
                if (chosenOptions.previousSize === "S" && event.originalTarget.id === "Soft") {
                    let secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

                } else if (chosenOptions.previousSize === "M" && event.originalTarget.id === "Soft") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

                } else if (chosenOptions.previousSize === "L" && event.originalTarget.id === "Soft") {
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if (chosenOptions.previousSize === "S" && event.originalTarget.id === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousSize === "M" && event.originalTarget.id === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousSize === "L" && event.originalTarget.id === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousSize === "S" && event.originalTarget.id === "Hard") {
                    minutesToRemove = 5;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
                } else if (chosenOptions.previousSize === "M" && event.originalTarget.id === "Hard") {
                    minutesToRemove = 5;
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousSize === "L" && event.originalTarget.id === "Hard") {
                    minutesToRemove = 5;
                    secondsToRemove = 30;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }
            }
        } else if (chosenOptions.howDone !== event.originalTarget.id) {
            chosenOptions.size = "";
            chosenOptions.howDone = "";
            chosenOptions.firstChosen = "howDone";
            document.querySelector("span#minutes").textContent = `00`;
            document.querySelector("span#seconds").textContent = `00`;
            if (event.originalTarget.id === "Soft") {
                incrementMinutes = 3;
                chosenOptions.howDone = "Soft";
            } else if (event.originalTarget.id === "Medium") {
                incrementMinutes = 4;
                chosenOptions.howDone = "Medium";
            } else {
                incrementMinutes = 8;
                chosenOptions.howDone = "Hard";
            }

            setEggTimer(incrementMinutes);
        }
    }
}

function adjustTheDifference(previousMinutesIncrease, currentMinutesIncrease, previousSecondsIncrease, currentSecondsIncrease) {
    let intervalForMinutes;

    let notDone = {
        minutes: "",
        seconds: ""
    };

    if (currentMinutesIncrease === 0) {
        let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);
        let display = activeMinutes - previousMinutesIncrease;
        document.querySelector("span#minutes").textContent = `0${display}`;

    } else if (previousMinutesIncrease === 0) {
        let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);
        let display = activeMinutes + currentMinutesIncrease;
        document.querySelector("span#minutes").textContent = `0${display}`;

    } else if (previousMinutesIncrease > currentMinutesIncrease) {
        notDone.minutes = "notDone";
        let difference = previousMinutesIncrease - currentMinutesIncrease;
        let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);

        let i = activeMinutes - 1;
        let counter = 0;
        intervalForMinutes = setInterval(function () {
            document.querySelector("span#minutes").textContent = `0${i}`;

            counter++;
            if (counter === difference) {
                clearInterval(intervalForMinutes);
                notDone.minutes = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i--;

        }, 70);
    } else if (previousMinutesIncrease < currentMinutesIncrease) {
        notDone.minutes = "notDone";

        let difference = currentMinutesIncrease - previousMinutesIncrease;
        let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);
        let i = activeMinutes + 1;
        let counter = 0;
        intervalForMinutes = setInterval(function () {
            document.querySelector("span#minutes").textContent = `0${i}`;

            counter++;
            if (counter === difference) {
                clearInterval(intervalForMinutes);
                notDone.minutes = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i++;

        }, 70);
    }

    let intervalForSeconds;
    if(previousSecondsIncrease === undefined || currentSecondsIncrease === undefined) {
        return;
    }

    if (previousSecondsIncrease > currentSecondsIncrease) {
        if (currentSecondsIncrease === 0) {
            let activeSeconds = parseInt(document.querySelector("span#seconds").textContent);
            let display = activeSeconds - previousSecondsIncrease;

            if (JSON.stringify(display).length === 2) {
                document.querySelector("span#seconds").textContent = `${display}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${display}`;
            }
            return;
        }

        notDone.seconds = "notDone";
        let difference = previousSecondsIncrease - currentSecondsIncrease;
        let activeSeconds = parseInt(document.querySelector("span#seconds").textContent);

        let i = activeSeconds - 1;
        let counter = 0;
        intervalForSeconds = setInterval(function () {
            if (JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }

            counter++;
            if (counter === difference) {
                clearInterval(intervalForSeconds);
                notDone.seconds = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i--;

        }, 70);

    } else if (previousSecondsIncrease < currentSecondsIncrease) {

        if(previousSecondsIncrease === 0) {
            let activeSeconds = parseInt(document.querySelector("span#seconds").textContent);
            let display = activeSeconds + currentSecondsIncrease;
            if (JSON.stringify(display).length === 2) {
                document.querySelector("span#seconds").textContent = `${display}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${display}`;
            }
            return;
        }

        notDone.seconds = "notDone";
        let difference = currentSecondsIncrease - previousSecondsIncrease;
        let activeSeconds = parseInt(document.querySelector("span#seconds").textContent);
        let i = activeSeconds + 1;
        let counter = 0;
        intervalForSeconds = setInterval(function () {
            if(i > 59) {
                let activeMinutes = document.querySelector("span#minutes").textContent;
                document.querySelector("span#minutes").textContent = `0${activeMinutes + 1}`;
                i = 0;
            }
            if(JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }

            counter++;
            if(counter === difference) {
                clearInterval(intervalForSeconds);
                notDone.seconds = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i++;

        }, 70);
    }
}

function removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove) {
    let intervalForMinutes;
    let intervalForSeconds;

    let notDone = {
        minutes: "",
        seconds: ""
    };

    if(minutesToRemove !== undefined) {
        notDone.minutes = "notDone";
        let initialMinutes = parseInt(document.querySelector("span#minutes").textContent);
        let i = initialMinutes - 1;
        let goalMinutes = initialMinutes - minutesToRemove;
        intervalForMinutes = setInterval(function () {
            document.querySelector("span#minutes").textContent = `0${i}`;

            if(i === goalMinutes) {
                clearInterval(intervalForMinutes);
                notDone.minutes = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i--;

        }, 100);
    }

    if(secondsToRemove !== undefined) {
        notDone.seconds = "notDone";
        let initialSeconds = parseInt(document.querySelector("span#seconds").textContent);
        let i = initialSeconds - 1;

        let goalSeconds = initialSeconds - secondsToRemove;
        intervalForSeconds = setInterval(function () {
            if(JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }
           
            if(i === goalSeconds) {
                clearInterval(intervalForSeconds);
                notDone.seconds = "done";
                if(!(notDone.minutes === "notDone") && !(notDone.seconds === "notDone")) {
                    turnEventListenersOn();
                }
            }
            i--;

        }, 70);
    }

}

function decideEggSize(event) {
    if(chosenOptions.howDone !== "" && chosenOptions.size !==  "" && chosenOptions.size !== event.target.id) {
        chosenOptions.firstChosen = "";
        chosenOptions.size = "";
        chosenOptions.howDone = "";
        document.querySelector("span#minutes").textContent = `00`;
        document.querySelector("span#seconds").textContent = `00`;

        howDone.forEach(button=> {
            button.classList.remove("selectedButton");
            button.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
    
        });
    } else if(chosenOptions.howDone === "" && chosenOptions.size === "") {
        chosenOptions.firstChosen = "";
    }

    let incrementMinutes;
    if(chosenOptions.firstChosen === "") {
        //Add default times for size
        chosenOptions.firstChosen = "size";
    }

    if (chosenOptions.firstChosen === "size") {
        if(chosenOptions.size === "") {
            if(event.originalTarget.id === "S") {
                incrementMinutes = 3;
                chosenOptions.size = "S";
            } else if(event.originalTarget.id === "M") {
                incrementMinutes = 3;
                chosenOptions.size = "M";
            } else {
                incrementMinutes = 4;
                chosenOptions.size = "L";
            }

            setEggTimer(incrementMinutes);
        } else if (chosenOptions.size === event.originalTarget.id) {
            chosenOptions.size = "";
            chosenOptions.previousSize = event.originalTarget.id;
            let minutesToRemove;
            if (event.originalTarget.id === "S") {
                minutesToRemove = 3;
            } else if (event.originalTarget.id === "M") {
                minutesToRemove = 3;
            } else {
                minutesToRemove = 4;
            }
            removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
        } else if (chosenOptions.size !== event.originalTarget.id) {
            let previousIncrease;
            let currentIncrease;
            if (chosenOptions.size === "S") {
                previousIncrease = 3;
            } else if (chosenOptions.size === "M") {
                previousIncrease = 3;
            } else if (chosenOptions.size === "L") {
                previousIncrease = 4;
            }

            chosenOptions.previousSize = chosenOptions.size;

            if (event.originalTarget.id === "S") {
                currentIncrease = 3;
                chosenOptions.size = "S";
            } else if (event.originalTarget.id === "M") {
                currentIncrease = 3;
                chosenOptions.size = "M";
            } else {
                currentIncrease = 4;
                chosenOptions.size = "L";
            }
            adjustTheDifference(previousIncrease, currentIncrease);
        }

    } else if (chosenOptions.firstChosen === "howDone") {
        if (chosenOptions.size === "") {
            if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "S") {
                let incrementSeconds = 10;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "S") {
                let incrementSeconds = 10;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "S") {
                let incrementMinutes = 0;
                chosenOptions.size = "S";
                setEggTimer(incrementMinutes, undefined);
            } else if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 30;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }

        } else if (chosenOptions.size === event.originalTarget.id) {
            chosenOptions.previousSize = chosenOptions.size;
            chosenOptions.size = "";
            let minutesToRemove;
            let secondsToRemove;
            if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "S") {
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "S") {
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "S") {
                return;

            } else if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if (chosenOptions.howDone === "Soft" && event.originalTarget.id === "L") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.howDone === "Medium" && event.originalTarget.id === "L") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.howDone === "Hard" && event.originalTarget.id === "L") {
                minutesToRemove = 1;
                secondsToRemove = 30;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if (chosenOptions.howDone === "") {
                if (chosenOptions.previousHowDone === "Soft" && event.originalTarget.id === "S") {
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

                } else if (chosenOptions.previousHowDone === "Medium" && event.originalTarget.id === "S") {
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

                } else if (chosenOptions.previousHowDone === "Hard" && event.originalTarget.id === "S") {
                    return;

                } else if (chosenOptions.previousHowDone === "Soft" && event.originalTarget.id === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if (chosenOptions.previousHowDone === "Medium" && event.originalTarget.id === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if (chosenOptions.previousHowDone === "Hard" && event.originalTarget.id === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if (chosenOptions.previousHowDone === "Soft" && event.originalTarget.id === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousHowDone === "Medium" && event.originalTarget.id === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if (chosenOptions.previousHowDone === "Hard" && event.originalTarget.id === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 30;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }
            }
        } else if (chosenOptions.size !== event.originalTarget.id) {
            chosenOptions.size = "";
            chosenOptions.howDone = "";
            chosenOptions.firstChosen = "size";
            document.querySelector("span#minutes").textContent = `00`;
            document.querySelector("span#seconds").textContent = `00`;
            
            if (event.originalTarget.id === "S") {
                incrementMinutes = 3;
                chosenOptions.size = "S";
            } else if (event.originalTarget.id === "M") {
                incrementMinutes = 3;
                chosenOptions.size = "M";
            } else {
                incrementMinutes = 4;
                chosenOptions.size = "L";
            }

            setEggTimer(incrementMinutes);
        }
    }
}

function turnEventListenersOn() {
    for(let i = 0; i < howDone.length; i++) {
        howDone[i].style.pointerEvents = "auto";
    }
    for(let i = 0; i < eggSize.length; i++) {
        eggSize[i].style.pointerEvents = "auto";
    
    }
}