"use strict";

// Set the date we're counting down to
let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
let daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


console.log(months[new Date().getMonth() + 1]);
let month = months[new Date().getMonth()];
let date = new Date().getDate();
let year = new Date().getFullYear();
let hour = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();

let addedSeconds = 20;
let addedMinutes = 4;
console.log(minutes);
console.log(seconds);

addSeconds();
addMinutes();
setEggTimer();

console.log(addedMinutes);
console.log(minutes);
console.log(seconds);


function addSeconds() {
    seconds = seconds + addedSeconds;
    console.log(seconds);
    if(seconds > 59) {
        addedMinutes += 1;
        let extraSeconds = seconds - 59;
        seconds = extraSeconds;
        console.log(addedMinutes);
    }
}

function addMinutes() {
    console.log(minutes);
    for(let i = 0; i < addedMinutes; i++) {
        minutes = minutes + 1;
        if(minutes > 59) {
            minutes = 0;
            hour = hour + 1;
            if(hour > 23) {
                hour = 0;
                date = date + 1
                let daysInMonth = daysInEachMonth[new Date().getMonth()];
                if(date > daysInMonth) {
                    date = 1;
                    if(month === "Dec") {
                        month = "Jan";
                    } else {
                        month = months[new Date().getMonth() + 1];
                        year = year + 1;
                    }
                }
            }
        }
    }
    console.log(minutes);
}

var countDownDate;
function setEggTimer() {
    countDownDate = new Date(`${month} ${date}, ${year} ${hour}:${minutes}:${seconds}`).getTime();
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
}

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);