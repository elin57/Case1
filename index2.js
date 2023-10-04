"use strict";

function updateTimerDisplay(minutes, seconds) {
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}


function timer(minutes, seconds, cb) {
    var remaningMinutes = minutes;
    var remaningSeconds = seconds;
    var intervalId

    function update() {
        cb();
        updateTimerDisplay(remaningMinutes, remaningSeconds);

        if (remaningMinutes === 0 && remaningSeconds === 0) {
            clearInterval(intervalId);
            console.log("Times up");
            // alert("Time´s up!");
        } else {
            if (remaningSeconds === 0) {
                remaningMinutes--;
                remaningSeconds = 59;
            } else {
                remaningSeconds--;
            }
        }

    }

    intervalId = setInterval(update, 1000);

}

var callback = function () {
    console.log('callback');
};

document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("timer").style.display = "block";
    document.getElementById("readyIn").style.display = "block";
    document.getElementById("infoButton").style.display = "none";

    // const timerName = document.getElementById("timer");
    // timerName.setAttribute("class", "eggTimer");

    timer(1, 30, callback); //Adjust time here
});

document.getElementById("infoButton").addEventListener("click", function () {
    document.getElementById("timer").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("infoButton").style.display = "none";


    document.getElementById("content").innerHTML = `
    <h1>How to boil egg</h1>

    <ol>
    <li>Check the size of your egg by looking at the bottom of the eggcarton</li>
    <li>Select how you would like your egg</li>
    <li>Boil water in a medium sized pot</li>
    <li>Put egg in water using a spoon as to not crack the egg/eggs</li>
    <li>Start timer</li>
    <li>A couple minutes later...</li>
    <li>Boom done!</li>
    </ol>

    <button id="goBackButton">Go Back</button>
    `;

    document.getElementById("goBackButton").addEventListener("click", function () {

        //restore
        document.getElementById("timer").style.display = "block";
        document.getElementById("startButton").style.display = "block";
        document.getElementById("infoButton").style.display = "block";

        document.getElementById("content").innerHTML = "";
    });
})