"use strict";

let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
let daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


let x;
let month;
let year;
let date;
let hour;
let minutes;
let seconds;
let addedSeconds = 0;
let addedMinutes = 0;
let countDownDate;


setEggTimer();

function addSeconds(seconds) {
    seconds = seconds + addedSeconds;
    console.log(seconds);

    if (seconds > 59) {
        addedMinutes += 1;
        let extraSeconds = seconds - 59;
        seconds = extraSeconds;
        console.log(extraSeconds);
        console.log(seconds);
    } else {
        seconds = seconds + 1;
    }
    return seconds;
}

function addMinutes(minutes, hour) {
    console.log(minutes);
    for (let i = 0; i < addedMinutes; i++) {
        minutes = minutes + 1;
        if (minutes > 59) {
            minutes = 0;
            hour = hour + 1;
            if (hour > 23) {
                hour = 0;
                date = date + 1
                let daysInMonth = daysInEachMonth[new Date().getMonth()];
                if (date > daysInMonth) {
                    date = 1;
                    if (month === "Dec") {
                        month = "Jan";
                    } else {
                        month = months[new Date().getMonth() + 1];
                        year = year + 1;
                    }
                }
            }
        }
    }
    let values = {
        minutes: minutes,
        hour: hour
    }
    return values;
}

function setEggTimer(incrementMinutes) {
    let interval;
    if (incrementMinutes !== undefined) {
        let stay = true;
        let totalMinutes = addedMinutes + incrementMinutes;
        let initialMinutes = totalMinutes - incrementMinutes;
        //document.getElementById("timer").innerHTML = initialMinutes + "m " + addedSeconds + "s ";
        console.log(addedMinutes);
        console.log(totalMinutes);
        let i = addedMinutes + 1;
        interval = setInterval(function () {
            document.getElementById("timer").innerHTML = i + "m " + addedSeconds + "s ";
            if (i === totalMinutes) {
                clearInterval(interval);
            }
            i++;

        }, 300);

        console.log(interval);
        addedMinutes += incrementMinutes;
    } else {
        document.getElementById("timer").innerHTML = addedMinutes + "m " + addedSeconds + "s ";
    }
}

// Update the count down every 1 second
let countDown = () => {
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}

document.getElementById("startTimer").addEventListener("click", function () {
    month = months[new Date().getMonth()];
    date = new Date().getDate();
    year = new Date().getFullYear();
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();

    let values = addMinutes(minutes, hour);
    minutes = values.minutes;
    hour = values.hour;
    seconds = addSeconds(seconds);
    console.log(hour);

    console.log(seconds);
    console.log(minutes);
    console.log(hour);
    countDownDate = new Date(`${month} ${date}, ${year} ${hour}:${minutes}:${seconds}`).getTime();
    countDown();
    x = setInterval(countDown, 1000);

});

let div = document.createElement("div");
document.querySelector("body").appendChild(div);
div.setAttribute("id", "questionContainer");
div.innerHTML =
    `
<div>How do you want your eggs?</div>
<div id=howDone>Soft</div><div id="howDone">Medium</div><div id="howDone">Hard</div>
`;

let howDone = document.querySelectorAll("div#howDone");

for (let i = 0; i < howDone.length; i++) {
    howDone[i].addEventListener("click", howBoiled);
}

function howBoiled(event) {
    let incrementMinutes;
    if (event.originalTarget.textContent === "Soft") {
        incrementMinutes = 2;
    } else if (event.originalTarget.textContent === "Medium") {
        incrementMinutes = 3;
    } else {
        incrementMinutes = 4;
    }

    setEggTimer(incrementMinutes);
}
