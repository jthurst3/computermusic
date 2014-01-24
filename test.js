// test.js
// makes sure the code in this repository is functioning correctly
// J. Hassler Thurston
// January 24, 2014

// CURRENT FILES AND FUNCTIONS TESTED:
//     fiddletune.js
//	   -- rhythmic_sequence(rhythm_lengths)


// general testing framework
// takes in a function to test, an ordered list of its inputs, and the expected result
var test_function = function(function_name, fun, inputs, expected_result) {
	var result = fun(inputs); // compute the result on the given input
	console.log("---Testing function",function_name,"on input", inputs,"---"); // intro output to console
	console.log("\tResult:", result, "-- Expected result:", expected_result); // computation output to console
	var success = (result == expected_result); // see if the result matches what's expected
	if(success)
		success_text = "succeeded";
	else success_text = "failed";
	console.log("\tTest", success_text, "."); // success/failure output to console
	return success; // return whether or not the test succeeded
}

// tests the fiddletune.js code
var test_fiddletune = function() {
	console.log("---Testing file fiddletune.js---");
	var test1 = test_function("rhythmic_sequence", rhythmic_sequence, ([.25,.25,.5]),[[0,.25],[.25,.5],[.5,1]]);
	var overall_result = test1;
	if(overall_result)
		success_text = "succeeded";
	else success_text = "failed";
	console.log("Code in fiddletune.js", success_text, ".");
}

test_fiddletune();