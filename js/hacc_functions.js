// randomly picks a value from a list, with weights on each choice
// if weights is null, pick a choice with equal probability for each choice
// NOTE: Does not check whether weights and choices have the same length!
// TODO: make this sub-linear time
var random_choice = function(weights, choices) {
	if (weights === null) {
		return choices[Math.floor(Math.random() * choices.length)];
	}
	// compute the sum of unnormalized probabilities
	var total = sum(weights);
	// generate the random number
	var rand = Math.random() * total;
	var count = 0;
	// see which choice to take depending on the random number
	for (var i = 0; i < choices.length; i++) {
		count += weights[i];
		if (rand < count) {
			return choices[i];
		}
	}
	console.log("Cound not pick a random number...");
	return -1;
};


var melody = [[0, 4, 7, 12, 7, 4, 0],
	[[0.0, 0.375], [0.375, 0.5], [0.5, 0.75], [0.75, 1.25], [1.25, 1.5], [1.5, 1.75], [1.75, 2.0]]];
var mnotes = melody[0];
var mrhythms = melody[1];

// converts rhythms in "start-end" form to "durational" form
var to_duration = function(start_end) {
	return start_end.map(function(r) {
		return r[1] - r[0];
	});
};
// converts rhythms in "durational" form to "start-end" form, with starting offset specified by offset
var to_startend = function(durations, offset) {
	if (!offset) {
		offset = 0;
	}
	// keeps track of current time
	current = offset;
	return durations.map(function(d) {
		start = current;
		current += d;
		return [start, current];
	});
};
// offsets the melody by n half steps
var melody_offset = function(n) {
	return mnotes.map(function(note) { return note + n; });
};



// last iteration of the genetic algorithm from April 2011 (TODO: create other iterations)
var notelistfitness = [
	[[[9, null, 2, 0, 7, 2, 7, 2], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
	[[[2, 11, 9, 0, 12, 4, 11, 2], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[11, 4, 7, null, 9, 9, 9, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[0, 9, 5, 11, 2, 4, 9], [0.125, 0.125, 0.125, 0.125, 0.25, 0.125, 0.125]]],
    [[[7, 11, 4, 2, 2, 0, 9, 12], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[12, 11, 11, 2, 4, 4], [0.125, 0.125, 0.125, 0.25, 0.25, 0.125]]],
    [[[2, 5, 0, 0, 12, 7, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.25, 0.125]]],
    [[[2, 7, 0, 12, 2, 2, null, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[9, 12, 4, null, 5, 5, 5, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[4, 12, null, 2, 4, 5], [0.125, 0.125, 0.125, 0.25, 0.25, 0.125]]],
    [[[11, null, 0, 11, 0, 12, 5], [0.125, 0.25, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[2, 9, 12, 5, 12, 2, 12, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[5, 9, 12, 11, 4, 4, 2, 11], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[9, 5, 4, 11, 12, 12, 12, 0], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[11, 5, 12, 9, 9, null, 11, 5], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[5, 12, 5, 11, 4, 5, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.25, 0.125]]],
    [[[9, 11, 9, 0, 12, 4, 11, 2], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[2, null, 2, 0, 7, 2, 7, 2], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[11, 9, 5, 11, 2, 4, 9], [0.125, 0.125, 0.125, 0.125, 0.25, 0.125, 0.125]]],
    [[[0, 4, 7, null, 9, 9, 9, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[7, 11, 11, 2, 4, 4], [0.125, 0.125, 0.125, 0.25, 0.25, 0.125]]],
    [[[12, 11, 4, 2, 2, 0, 9, 12], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[2, 7, 0, 12, 2, 2, null, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[2, 5, 0, 0, 12, 7, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.25, 0.125]]],
    [[[9, 12, null, 2, 4, 5], [0.125, 0.125, 0.125, 0.25, 0.25, 0.125]]],
    [[[4, 12, 4, null, 5, 5, 5, 7], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[11, 9, 12, 5, 12, 2, 12, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[2, null, 0, 11, 0, 12, 5], [0.125, 0.25, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[5, 5, 4, 11, 12, 12, 12, 0], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[9, 9, 12, 11, 4, 4, 2, 11], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]],
    [[[11, 12, 5, 11, 4, 5, 9], [0.125, 0.125, 0.125, 0.125, 0.125, 0.25, 0.125]]],
    [[[5, 5, 12, 9, 9, null, 11, 5], [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125]]]];

// computes the "tonic ending melodies"
var tonic_ending_melodies = function() {
	var arr = [];
	for (var i = 0; i < notelistfitness.length; i++) {
		if (notelistfitness[i][0][0][notelistfitness[i][0][0].length-1] % 12 === 0) {
			arr.push(notelistfitness[i]);
		}
	}
	return arr;
}();
// creates a "cadential melody" (i.e. one that can be played at a cadence)
var cadential_melody = function() {
	// pick a random melody that ends on the tonic note
	return random_choice(null, tonic_ending_melodies);
};

// picks a chromosome that "best resembles" the melody
// NOTE: for the 2011 version, this function reduced to picking a chromosome randomly.
// TODO: intelligently determine chromosome selection.
var pick = function() {
	return random_choice(null, notelistfitness)[0];
}();


/********* FOUR-MEASURE TEMPLATES *********/
// cadential measures: each voice plays the theme and then a C-major chord
var cadential_measures = function() {
	var violin11 = melody;
	var violin21 = melody;
	var viola1 = mminus(12);
	var cello1 = mminus(24);
};





for (var i = 0; i < 10; i++) {
	console.log(pick);
}
console.log(to_startend(to_duration(melody[1])));
console.log(to_startend(to_duration(melody[1]), 5));
