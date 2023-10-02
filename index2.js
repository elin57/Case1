
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
            alert("Time´s up!");
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
    timer(1, 30, callback); //Adjust the initial time here

});
