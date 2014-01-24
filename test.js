// test.js
// makes sure the code in this repository is functioning correctly
// J. Hassler Thurston
// January 24, 2014

// CURRENT FILES AND FUNCTIONS TESTED:
//     fiddletune.js
//	   -- rhythmic_sequence(rhythm_lengths)


// general testing framework
// takes in a function to test, an ordered list of its inputs, and the expected result
var test_function = function(function_name, inputs, expected_result) {
	return function_name(inputs) === expected_result
}

