// test.js
// makes sure the code in this repository is functioning correctly
// J. Hassler Thurston
// January 24, 2014

// CURRENT FILES AND FUNCTIONS TESTED:
//     fiddletune.js
//	   -- rhythmic_sequence(rhythm_lengths)


// general testing framework
// takes in a function to test, an ordered list of its inputs, and the expected result
var test_function = function(function_name, fun, inputs, equality_test, expected_result) {
	var result = fun(inputs); // compute the result on the given input
	console.log("---Testing function",function_name,"on input", inputs,"---"); // intro output to console
	console.log("\tResult:", result, "-- Expected result:", expected_result); // computation output to console
	var success = equality_test(result,expected_result); // see if the result matches what's expected
	if(success)
		success_text = "succeeded";
	else success_text = "failed";
	console.log("\tTest", success_text, "."); // success/failure output to console
	return success; // return whether or not the test succeeded
}

// checks if two arrays are equal (or two elements of arrays)
// modified from http://stackoverflow.com/questions/3115982/how-to-check-javascript-array-equals
var array_equals = function(array1, array2) {
	if(array1 === array2) return true;
	if(array1 == null || array2 == null) return false;
	if(array1.length != array2.length) return false;

	for(var i = 0; i < array1.length; i++) {
		if(!array_equals(array1[i], array2[i]))
			return false;
	}
	return true;
}

// returns true if all the elements in the array are true
// used to see if a list of test cases have all passed
var logical_and = function(array) {
	for(var i = 0; i < array.length; i++) {
		if(!array[i]) return false;
	}
	return true;
}

// tests the fiddletune.js code
var test_fiddletune = function() {
	console.log("---Testing file fiddletune.js---");
	var tests = [];
	tests.push(test_function("rhythmic_sequence", rhythmic_sequence, [.25,.25,.5], array_equals, [[0,.25],[.25,.5],[.5,1]]));
	tests.push(test_function("rhythmic_sequence", rhythmic_sequence, [], array_equals, []));
	tests.push(test_function("create_scale", create_scale, [-5,27,0], array_equals, 
		[-5, -3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26]));
	var overall_result = logical_and(tests);
	if(overall_result)
		success_text = "succeeded";
	else success_text = "failed";
	console.log("Code in fiddletune.js", success_text, ".");
}

test_fiddletune();





