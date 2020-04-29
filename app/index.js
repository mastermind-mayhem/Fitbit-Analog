import clock from "clock";
import document from "document";
import { today, goals } from "user-activity"
import { HeartRateSensor } from "heart-rate";

// Update the clock every second
clock.granularity = "seconds";
const txtsteps = document.getElementById("txtsteps")
const txtbpm = document.getElementById("txtbpm")
const txttime = document.getElementById("txttime")
let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

function updateSensors() {
// Update Steps taken
sensorSteps.text = today.adjusted.steps || 0;

// Update Heart Rate
hrm.start();
}
//Creating HRM
var hrm = new HeartRateSensor();

hrm.onreading = function() {
// Peek the current sensor values
txtbpm.text = hrm.heartRate || 1;
// Stop monitoring the sensor

}

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}


    
// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

txttime.text = `${hours}:${mins}`
  
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}
const fieldMap = {
 steps: {name: "STEPS", unit: "" },

};
["local", "adjusted"].forEach(scope => {
 console.log(`Activity(${scope}):`)
 let activity = (today)[scope]
 for (let field in fieldMap) {
 if ((activity)[field] !== undefined) {
 txtsteps.text= ` ${fieldMap[field].name} = ${activity[field]} ${fieldMap[field].unit}`
 }
 }
})



// Update the clock every tick event
clock.ontick = () => updateClock();
hrm.start();
