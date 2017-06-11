// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)         
var config = {
    apiKey: "AIzaSyAvzwmVREQXk00OnQ4Ev_L46Dk9yrfGD-E",
    authDomain: "train-scheduler-56d11.firebaseapp.com",
    databaseURL: "https://train-scheduler-56d11.firebaseio.com",
    projectId: "train-scheduler-56d11",
    storageBucket: "train-scheduler-56d11.appspot.com",
    messagingSenderId: "314549010878"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


// Initial Values
var train = "";
var destination = "";
var time = 0;
var frequency = 0;

// Capture button click

$("#addTrain").on("click", function(event) {
    event.preventDefault();

    train = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    time = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,


    });

});

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    

    //Append results
    
             $(".table").append("<tr>" +
            "<td>" + childSnapshot.val().train + "</td>" +
            "<td>" + childSnapshot.val().destination + "</td>" +
            "<td>" + childSnapshot.val().frequency + "</td>" +
            "<td>" + childSnapshot.val().nextTrain + "</td>" +
            "<td>" + childSnapshot.val().minutesAway + "</td>" +
            "<tr>")
    
    // Handle errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });

    database.ref().on("child_added", function(snapshot){
    $("#trainDisplay").html(snapshot.val().train);
    $("#destinationDisplay").html(snapshot.val().destination);
    $("#frequencyDisplay").html(snapshot.val().frequency);


});
