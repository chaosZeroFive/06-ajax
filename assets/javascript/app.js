// JavaScript Document
var animState = false; //default is false (animated)

//switch that generates still gifs when selected "true"
$('#animSwitch').on('change', function(){
	animState = $(this).prop('checked'); //checked is true
	console.log(animState); //log for testing
});


//added a global var to hold number of returns
var rtnLimit = 10;  //default is 10
//fires when user changes the rtn input
$('#rtn').on('change', function(){
	rtnLimit = $(this).val();
});

//button on nav-bar that takes the text from the add animal input and places it in the button.text & button.data-animal attr
$('#btn-add').on('click', function(){
	var addStr = $('#add-str').val();
	console.log(addStr);
	//var for new button
	var btnNew = $('<button>');
	btnNew.addClass('btn btn-primary mr-sm-2 btn-animal');
	btnNew.attr('data-animal', addStr);
	btnNew.text(addStr);
	$('#div-btn').prepend(btnNew);
});


// Adding click event listener to all buttons under the div-btn element
$('#div-btn').on('click', function () {
	// Grabbing and storing the data-animal property value from the button
	var animal = $('.btn-animal').attr('data-animal');
	console.log('data-animal: ' + animal);
	
	// Construct queryURL using the animal name & number to return
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=funny+' +
		animal + '&api_key=LC3ygSPHGjMF54zVYGTs7E3lFidCfmdd&limit=' + rtnLimit;
	// Performing an AJAX request with the queryURL
	$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.then(function (response) {
			console.log('queryURL: ' + queryURL);
			console.log('response: ' + response);
			// var to hold data object
			var results = response.data;
			console.log('results: ' + results);
		
			// Looping through each item of data
			for (var i = 0; i < results.length; i++) {
				// Create a div for each item in data
				var animalDiv = $('<div>');
				
				// Create an image with bs class
				var animalImage = $('<img class="rounded m-sm-2 float-left">');
				//condition to select if img is still or animated based on the boolean value of the switch
				if (!animState){  //if animState = true
					animalImage.attr('src', results[i].images.downsized.url);
				}
				else if (animState){ //if animState = false (default)
					animalImage.attr('src', results[i].images.downsized_still.url);
				}
				
				animalDiv.append(animalImage);
				
				// adds images to the front of the div-gif element
				$('#div-gif').prepend(animalDiv);
			}
		});
});