
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFo3fmHl9HTtf5SWQfF7xrpd1PEgRM4mM",
    authDomain: "test-project-fd227.firebaseapp.com",
    databaseURL: "https://test-project-fd227.firebaseio.com",
    projectId: "test-project-fd227",
    storageBucket: "test-project-fd227.appspot.com",
    messagingSenderId: "147788436967"
  };
  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();

//add train button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

//employee input
  var name = $("#train-name-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var time = $("#time-input").val().trim();
  var freq = $("#freq-input").val().trim();


 // Creates local "temporary" object for holding train data
  var train = {
    name: name,
    dest: dest,
    time: time,
    freq: freq
  };

//push input to database
database.ref().push(train);

console.log(train.name);
console.log(train.dest);
console.log(train.time);
console.log(train.freq);


// Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){


var name = childSnapshot.val().name;
var dest = childSnapshot.val().dest;
var time = childSnapshot.val().time;
var freq = childSnapshot.val().freq;


console.log(childSnapshot.val().name);
console.log(childSnapshot.val().dest);
console.log(childSnapshot.val().time);
console.log(childSnapshot.val().freq);

//moment js

var firstTime = moment(time, "hh:mm").subtract(1, "years");
console.log(firstTime);
 
var currentTime = moment();
console.log(currentTime);

var diffTime = moment().diff(moment(firstTime), "minutes");
console.log(diffTime);

var tRemainder = diffTime % freq;
console.log(tRemainder);

var minTillTrain = freq - tRemainder;
console.log(minTillTrain);

var nextTrain = moment().add(minTillTrain, "minutes");
console.log(nextTrain);

var nextTrainFormat = moment(nextTrain).format("hh:mm");
console.log(nextTrainFormat);


 $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextTrainFormat + "</td><td>" + minTillTrain + "</td></tr>");

});





