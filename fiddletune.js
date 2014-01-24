// fiddletune.js
// Produces short fiddle tunes
// J. Hassler Thurston
// Adapted from Mathematica code written in 2010-2011
// January 24, 2014

var fiddletune = function(key) {
	var rhythm_list = []
}

// converts an array of rhythm lengths to an array of rhythms with start and end times
// e.g. rhythmic_sequence([.25,.25,.5]) => [[0,0.25],[0.25,0.5],[0.5,1]]
var rhythmic_sequence = function(rhythm_lengths) {
	var rhythms = [];
	var current_time = 0; // keep track of the "current rhythm time"
	for(var i = 0; i < rhythm_lengths.length; i++) {
		// for each rhythm length, make an ordered pair whose first element is
		// the current rhythm time, and whose second element is the current rhythm time
		// plus the rhythm lenght
		rhythms.push([current_time, current_time+rhythm_lengths[i]]);
		// then update the current rhythm time
		current_time += rhythm_lengths[i];
	}
	// finally, return the list of start and end times
	return rhythms;
}






