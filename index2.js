
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

        updateTimerDisplay(remaningMinutes, remaningSeconds);

    }

    intervalId = setInterval(update, 1000);

}

var callback = function () {
    console.log('callback');
};

document.getElementById("startButton").addEventListener("click", function () {
    let minutes = parseInt(document.querySelector("span#minutes").textContent);
    let seconds = parseInt(document.querySelector("span#seconds").textContent);
    timer(minutes, seconds, callback); //Adjust the initial time here

});

document.getElementById("infoButton").addEventListener("click", function () {
    document.getElementById("content").innerHTML = `
    <h1>How to boil egg</h1>

    <ol>
    <li>Check the size of your egg by looking at the bottom of the eggcarton</li>
    <li>Select how you would like your egg</li>
    <li>Boil water in a medium sized pot</li>
    <li>Put egg in water using a spoon as to not crack the egg/eggs</li>
    <li>Start timer</li>
    <li>couple minutes later...</li>
    <li>Boom done!</li>
    </ol>

    <button id="goBackButton">Go Back</button>
    `;

    document.getElementById("goBackButton").addEventListener("click", function () {
        document.getElementById("content").innerHTML = "";
    });
})