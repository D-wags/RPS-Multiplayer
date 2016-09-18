// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBf2rzs29BfTHJJko8vHj74ykYZtWTUV9o",
    authDomain: "drew-c1204.firebaseapp.com",
    databaseURL: "https://drew-c1204.firebaseio.com",
    storageBucket: "drew-c1204.appspot.com"
	};

	firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// get data from db
database.ref().on('child_added', function(snapshot) {
	console.log(snapshot.val());
	var childData = snapshot.val();
	var $table = $('#trains');
	var timeHold = childData.time.slice(0,2) + childData.freq;

	// display train data
	var trainRow = '<tr>';
	trainRow += '<td>'+childData.name+'</td>';
	trainRow += '<td>'+childData.dest+'</td>';
	trainRow += '<td>'+childData.freq+'</td>';
	trainRow += '<td>'+childData.time+'</td>';
	trainRow += '<td>'+childData.freq+'</td></tr>';
	$("#trainTable").append(trainRow);
	


});

// on-click for train info input
$(".btn-primary").on('click', function() {

	var trainName = $(".trainName").val().trim();
	var destination = $(".destination").val().trim();
	var trainTime = $(".trainTime").val().trim();
	var frequency = $(".frequency").val().trim();

	var now = moment().format("DD/MM/YY HH:mm A");
	console.log(now);
	
	if (trainName && destination && trainTime && frequency) 
		{
		var newTrain = {
 			name: trainName,
			dest: destination,
			time: trainTime,
			freq: frequency
 		}

 }
 	// push new train to db
	database.ref().push(newTrain);
	$(".trainName").val('');
	$(".destination").val('');
	$(".trainTime").val('');
	$(".frequency").val('');

});

