"use strict";


function setEggTimer(incrementMinutes, incrementSeconds) {
    let minutesInterval;
    let secondsInterval;

    console.log(document.querySelector("span#minutes").textContent);
    let initialMinutes = parseInt(document.querySelector("span#minutes").textContent);
    let initialSeconds = parseInt(document.querySelector("span#seconds").textContent);
    
    if(incrementMinutes !== undefined) {
        if(incrementMinutes !== 0) {
            let totalMinutes = initialMinutes + incrementMinutes;
            //let initialMinutes = totalMinutes - incrementMinutes;
            //document.getElementById("timer").innerHTML = initialMinutes + "m " + addedSeconds + "s ";
            let i = initialMinutes + 1;
            minutesInterval = setInterval(function() {
                document.querySelector("span#minutes").textContent = `0${i}`;
                if(i === totalMinutes) {
                    clearInterval(minutesInterval);
                }
                i++;
                
            }, 100);    
        } else {
            document.querySelector("span#minutes").textContent = `0${initialMinutes}`;
        }
    } 

    if(incrementSeconds !== undefined) {
        let totalSeconds = initialSeconds + incrementSeconds;
        let i = initialSeconds + 1;

        secondsInterval = setInterval(function() {
            if(JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }

            if(i === totalSeconds) {
                clearInterval(secondsInterval);
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
<div>Size?</div>
<div id="size">S</div><div id="size">M</div><div id="size">L</div>
<div>How do you want your eggs?</div>
<div id="howDone">Soft</div><div id="howDone">Medium</div><div id="howDone">Hard</div>
`;

let howDone = document.querySelectorAll("div#howDone");

for(let i = 0; i < howDone.length; i++) {
    howDone[i].addEventListener("click", howBoiled);
}

let eggSize = document.querySelectorAll("div#size");

for(let i = 0; i < eggSize.length; i++) {
    eggSize[i].addEventListener("click", decideEggSize);
}

console.log(chosenOptions);
function howBoiled(event) {
    console.log(chosenOptions);

    let incrementMinutes;
    if(chosenOptions.firstChosen === "") {
        //Add default times for howDone. Same thing as howBoiled
        chosenOptions.firstChosen = "howDone";
    }

    if(chosenOptions.firstChosen === "howDone") {
        if(chosenOptions.howDone === "") {
            if(event.originalTarget.textContent === "Soft") {
                incrementMinutes = 3;
                chosenOptions.howDone = "Soft";
            } else if(event.originalTarget.textContent === "Medium") {
                incrementMinutes = 4;
                chosenOptions.howDone = "Medium";
            } else {
                incrementMinutes = 8;
                chosenOptions.howDone = "Hard";
            }
        
           setEggTimer(incrementMinutes);
        } else if(chosenOptions.howDone === event.originalTarget.textContent) {
            chosenOptions.previousHowDone = chosenOptions.howDone;
            chosenOptions.howDone = "";
            //chosenOptions.firstChosen = "";
            let minutesToRemove;
            if(event.originalTarget.textContent === "Soft") {
                minutesToRemove = 3;
            } else if(event.originalTarget.textContent === "Medium") {
                minutesToRemove = 4;
            } else {
                minutesToRemove = 8;
            }
            removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
        }   else if(chosenOptions.howDone !== event.originalTarget.textContent) {
            let previousIncrease;
            let currentIncrease;
            if(chosenOptions.howDone === "Soft") {
                previousIncrease = 3;
            } else if(chosenOptions.howDone === "Medium") {
                previousIncrease = 4;
            } else {
                previousIncrease = 8;
            }

            chosenOptions.previousHowDone = chosenOptions.howDone;
            if(event.originalTarget.textContent === "Soft") {
                currentIncrease = 3;
                chosenOptions.howDone = "Soft";
            } else if(event.originalTarget.textContent === "Medium") {
                currentIncrease = 4;
                chosenOptions.howDone = "Medium";
            } else {
                currentIncrease = 8;
                chosenOptions.howDone = "Hard";
            }
        
            adjustTheDifference(previousIncrease, currentIncrease);
           //setEggTimer(incrementMinutes);
           //Gör en annan funktion??
        } 
    } else if(chosenOptions.firstChosen === "size") {
        if(chosenOptions.howDone === "") {
            if(chosenOptions.size === "S" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 40;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, undefined);
            }  else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            }   else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 30;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            }
           
        } else if(chosenOptions.howDone === event.originalTarget.textContent) {
            chosenOptions.howDone = "";
            let minutesToRemove;
            let secondsToRemove;
            if(chosenOptions.size === "S" && event.originalTarget.textContent === "Soft") {
                let secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Soft") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Soft") {
                secondsToRemove = 10;
                console.log("hi");
                console.log(chosenOptions);
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Medium") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Hard") {
                minutesToRemove = 5;
                removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
            }  else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Hard") {
                minutesToRemove = 5;
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            }   else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Hard") {
                minutesToRemove = 5;
                secondsToRemove = 30;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if(chosenOptions.size === "" ) {
                chosenOptions.howDone = "";
                let minutesToRemove;
                let secondsToRemove;
                if(chosenOptions.previousSize === "S" && event.originalTarget.textContent === "Soft") {
                    let secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
    
                } else if(chosenOptions.previousSize === "M" && event.originalTarget.textContent === "Soft") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
    
                } else if(chosenOptions.previousSize === "L" && event.originalTarget.textContent === "Soft") {
                    secondsToRemove = 10;
                    console.log("hi");
                    console.log(chosenOptions);
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if(chosenOptions.previousSize === "S" && event.originalTarget.textContent === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if(chosenOptions.previousSize === "M" && event.originalTarget.textContent === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if(chosenOptions.previousSize === "L" && event.originalTarget.textContent === "Medium") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                } else if(chosenOptions.previousSize === "S" && event.originalTarget.textContent === "Hard") {
                    minutesToRemove = 5;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
                }  else if(chosenOptions.previousSize === "M" && event.originalTarget.textContent === "Hard") {
                    minutesToRemove = 5;
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }   else if(chosenOptions.previousSize === "L" && event.originalTarget.textContent === "Hard") {
                    minutesToRemove = 5;
                    secondsToRemove = 30;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }
            }
        } else if(chosenOptions.howDone !== event.originalTarget.textContent) {
            if(chosenOptions.size === "S" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 40;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Soft") {
                let incrementSeconds = 10;
                chosenOptions.howDone = "Soft";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Medium") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.howDone = "Medium";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.size === "S" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, undefined);
            }  else if(chosenOptions.size === "M" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 40;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            }   else if(chosenOptions.size === "L" && event.originalTarget.textContent === "Hard") {
                incrementMinutes = 5;
                let incrementSeconds = 30;
                chosenOptions.howDone = "Hard";
                setEggTimer(incrementMinutes, incrementSeconds);
            }
        } 
    } 
}

function adjustTheDifference(previousMinutesIncrease, currentMinutesIncrease, previousSecondsIncrease, currentSecondsIncrease) {
    let intervalForMinutes;
    if(previousMinutesIncrease !== undefined) {
        if(previousMinutesIncrease > currentMinutesIncrease) {
            let difference = previousMinutesIncrease - currentMinutesIncrease;
            let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);

            let i = activeMinutes - 1;
            let counter = 0;
            console.log(i);
            intervalForMinutes = setInterval(function() {
                document.querySelector("span#minutes").textContent = `0${i}`;
                let minutes = document.querySelector("span#minutes").textContent;
                let seconds = document.querySelector("span#seconds").textContent;

                if(minutes === "00" && seconds === "00") {
                    chosenOptions.firstChosen = "";
                }

                counter++;
                if(counter === difference) {
                    clearInterval(intervalForMinutes);
                }
                i--;
                
            }, 70);
        } else if(previousMinutesIncrease < currentMinutesIncrease) {
            let difference = currentMinutesIncrease - previousMinutesIncrease;
            let activeMinutes = parseInt(document.querySelector("span#minutes").textContent);
            let i = activeMinutes + 1;
            let counter = 0;
            console.log(i);
            intervalForMinutes = setInterval(function() {
                document.querySelector("span#minutes").textContent = `0${i}`;
                let minutes = document.querySelector("span#minutes").textContent;
                let seconds = document.querySelector("span#seconds").textContent;

                if(minutes === "00" && seconds === "00") {
                    chosenOptions.firstChosen = "";
                }

                counter++;
                if(counter === difference) {
                    clearInterval(intervalForMinutes);
                }
                i++;
                
            }, 70);
        } else if(previousMinutesIncrease === currentMinutesIncrease) {
            return;
        }
    }
}

function removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove) {
    let intervalForMinutes;
    let intervalForSeconds;
    if(minutesToRemove !== undefined) {
        let initialMinutes = parseInt(document.querySelector("span#minutes").textContent);
        console.log(initialMinutes);
        let i = initialMinutes - 1;
        console.log(i);
        let goalMinutes = initialMinutes - minutesToRemove;
        console.log(goalMinutes);
        intervalForMinutes = setInterval(function() {
            document.querySelector("span#minutes").textContent = `0${i}`;
            let minutes = document.querySelector("span#minutes").textContent;
            let seconds = document.querySelector("span#seconds").textContent;

            if(minutes === "00" && seconds === "00") {
                chosenOptions.firstChosen = "";
            }
            if(i === goalMinutes) {
                console.log("hi");
                clearInterval(intervalForMinutes);
            }
            i--;
            
        }, 100);
    }

    if(secondsToRemove !== undefined) {
        let initialSeconds = parseInt(document.querySelector("span#seconds").textContent);
        let i = initialSeconds - 1;
    
        let goalSeconds = initialSeconds - secondsToRemove;
        console.log(goalSeconds);
        intervalForSeconds = setInterval(function() {
            if(JSON.stringify(i).length === 2) {
                document.querySelector("span#seconds").textContent = `${i}`;
            } else {
                document.querySelector("span#seconds").textContent = `0${i}`;
            }
            let minutes = document.querySelector("span#minutes").textContent;
            let seconds = document.querySelector("span#seconds").textContent;

            if(minutes === "00" && seconds === "00") {
                chosenOptions.firstChosen = "";
            }
            if(i === goalSeconds) {
                clearInterval(intervalForSeconds);
            }
            i--;
            
        }, 70);
    }

    
   
}

function decideEggSize(event) {
    let incrementMinutes;
    if(chosenOptions.firstChosen === "") {
        //Add default times for size. 
        chosenOptions.firstChosen = "size";
    }

    if(chosenOptions.firstChosen === "size") {
        if(chosenOptions.size === "") {
            if(event.originalTarget.textContent === "S") {
                incrementMinutes = 3;
                chosenOptions.size = "S";
            } else if(event.originalTarget.textContent === "M") {
                incrementMinutes = 3;
                chosenOptions.size = "M";
            } else {
                incrementMinutes = 4;
                chosenOptions.size = "L";
            }
        
           setEggTimer(incrementMinutes);
        } else if(chosenOptions.size === event.originalTarget.textContent) {
            chosenOptions.size = "";
           //chosenOptions.firstChosen = "";
           chosenOptions.previousSize = event.originalTarget.textContent;
            let minutesToRemove;
            if(event.originalTarget.textContent === "S") {
                minutesToRemove = 3;
            } else if(event.originalTarget.textContent === "M") {
                minutesToRemove = 3;
            } else {
                minutesToRemove = 4;
            }
            removeTimeFromHowBoiledAndSize(minutesToRemove, undefined);
        }   else if(chosenOptions.size !== event.originalTarget.textContent) {
            console.log(chosenOptions);
            let previousIncrease;
            let currentIncrease;
            if(chosenOptions.size === "S") {
                previousIncrease = 3;
            } else if(chosenOptions.size === "M") {
                previousIncrease = 3;
            } else if(chosenOptions.size === "L") {
                previousIncrease = 4;
            }

            chosenOptions.previousSize = chosenOptions.size;

            if(event.originalTarget.textContent === "S") {
                currentIncrease = 3;
                chosenOptions.size = "S";
            } else if(event.originalTarget.textContent === "M") {
                currentIncrease = 3;
                chosenOptions.size = "M";
            } else {
                currentIncrease = 4;
                chosenOptions.size = "L";
            }

            adjustTheDifference(previousIncrease, currentIncrease);
        } 
    } else if(chosenOptions.firstChosen === "howDone") {
        if(chosenOptions.size === "") {
            if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "S") {
                let incrementSeconds = 10;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "S") {
                let incrementSeconds = 10;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "S") {
                let incrementMinutes = 0;
                chosenOptions.size = "S";
                setEggTimer(incrementMinutes, undefined);
            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "M") {
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }  else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }   else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "L") {
                incrementMinutes = 1;
                let incrementSeconds = 30;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }
           
        } else if(chosenOptions.size === event.originalTarget.textContent) {
            console.log(chosenOptions);
            chosenOptions.previousSize = chosenOptions.size;
            chosenOptions.size = "";
            let minutesToRemove;
            let secondsToRemove;
            if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "S") {
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "S") {
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);

            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "S") {
                return;

            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "M") {
                secondsToRemove = 40;
                removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "L") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            }  else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "L") {
                minutesToRemove = 1;
                secondsToRemove = 10;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            }   else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "L") {
                minutesToRemove = 1;
                secondsToRemove = 30;
                removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
            } else if(chosenOptions.howDone === "") {
                if(chosenOptions.previousHowDone === "Soft" && event.originalTarget.textContent === "S") {
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
    
                } else if(chosenOptions.previousHowDone === "Medium" && event.originalTarget.textContent === "S") {
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
    
                } else if(chosenOptions.previousHowDone === "Hard" && event.originalTarget.textContent === "S") {
                    return;
    
                } else if(chosenOptions.previousHowDone === "Soft" && event.originalTarget.textContent === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if(chosenOptions.previousHowDone === "Medium" && event.originalTarget.textContent === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if(chosenOptions.previousHowDone === "Hard" && event.originalTarget.textContent === "M") {
                    secondsToRemove = 40;
                    removeTimeFromHowBoiledAndSize(undefined, secondsToRemove);
                } else if(chosenOptions.previousHowDone === "Soft" && event.originalTarget.textContent === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }  else if(chosenOptions.previousHowDone === "Medium" && event.originalTarget.textContent === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 10;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }   else if(chosenOptions.previousHowDone === "Hard" && event.originalTarget.textContent === "L") {
                    minutesToRemove = 1;
                    secondsToRemove = 30;
                    removeTimeFromHowBoiledAndSize(minutesToRemove, secondsToRemove);
                }
            }
        } else if(chosenOptions.size !== event.originalTarget.textContent) {

            let previousIncreaseMinutes;
            let previousIncreaseSeconds;
            let currentIncreaseMinutes;
            let currentIncreaseSeconds;
           /* if(chosenOptions.size === "S") {
                previousIncrease = 3;
            } else if(chosenOptions.size === "M") {
                previousIncrease = 3;
            } else if(chosenOptions.size === "L") {
                previousIncrease = 4;
            }

            chosenOptions.previousSize = chosenOptions.size;

            if(event.originalTarget.textContent === "S") {
                currentIncrease = 3;
                chosenOptions.size = "S";
            } else if(event.originalTarget.textContent === "M") {
                currentIncrease = 3;
                chosenOptions.size = "M";
            } else {
                currentIncrease = 4;
                chosenOptions.size = "L";
            }

            adjustTheDifference(previousIncrease, currentIncrease);*/

            if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "S") {
                if(chosenOptions.size === "M") {
                    previousIncreaseSeconds = 40;
                    chosenOptions.previousSize = "M";
                } else if(chosenOptions.size === "L") {
                    previousIncreaseMinutes = 1;
                    previousIncreaseSeconds = 10;
                    chosenOptions.previousSize = "L";
                }
                currentIncreaseMinutes = 0;
                currentIncreaseSeconds = 10;
                chosenOptions.size = "S";
                adjustTheDifference(previousIncreaseMinutes, currentIncreaseMinutes, previousIncreaseSeconds, currentIncreaseSeconds);
            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "S") {
                let incrementSeconds = 40;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "S") {
                let incrementSeconds = 10;
                chosenOptions.size = "S";
                setEggTimer(undefined, incrementSeconds);
            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "M") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "M";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "M") {
                incrementMinutes = 1;
                let incrementSeconds = 40;
                chosenOptions.size = "M";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "M") {
                incrementMinutes = 1;
                let incrementSeconds = 10;
                chosenOptions.size = "M";
                setEggTimer(incrementMinutes, incrementSeconds);
            } else if(chosenOptions.howDone === "Soft" && event.originalTarget.textContent === "L") {
                incrementMinutes = 5;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, undefined);
            }  else if(chosenOptions.howDone === "Medium" && event.originalTarget.textContent === "L") {
                incrementMinutes = 5;
                let incrementSeconds = 40;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }   else if(chosenOptions.howDone === "Hard" && event.originalTarget.textContent === "L") {
                incrementMinutes = 5;
                let incrementSeconds = 30;
                chosenOptions.size = "L";
                setEggTimer(incrementMinutes, incrementSeconds);
            }
            //Fixa denna ovan
        }
    }

}
