// fiddletune.js
// Produces short fiddle tunes
// J. Hassler Thurston
// Adapted from Mathematica code written in 2010-2011
// January 24, 2014

// a list of durations
var rhythm_durations = [[1],[.5,.25,.25],[.25,.25,.125,.125,.25],[.25,.25,.25,.25],[.5,.5],[.25,.25,.5]];
// the violin can't go below open G, and we'll limit the violin so it can't go above the E
// one octave above open E
var range_of_violin = range(-5, 27);
// assuming C major, the basic notes in each type of chord
var base_notes = {
	"major": [0, 4, 7],
	"minor": [0, 3, 7],
	"augmented": [0, 4, 8],
	"diminished": [0, 3, 6]
};

// function that creates the fiddle tune (reel)
// generates the rhythms, then the notes.
// returns an array, where the first element is the list of notes,
// and the second element is the list of rhythms in [start, end] form
var fiddletune = function(key) {
	key = positive_mod(key, 12);
	// generate the rhythms (in duration form)
	var A = generate_rhythms_for_part(true);
	var B = generate_rhythms_for_part(false);
	var rhythms = flatten_lists(A, B);
	// generate the notes
	var notes = generate_notes(key, A, B);
	// combine them together
	return [notes, rhythmic_sequence(rhythms)];
};

// generates the rhythms of an A or B part of a reel
// returns the rhythms in duration form (e.g. 0.5 instead of [3.5, 4])
// simple algorithm, adapted from Mathematica code written in late 2011
// first is true if we are generating rhythms for the A part, and false otherwise.
var generate_rhythms_for_part = function(first) {
	// convention (possibly silly): ri denotes the ith rhythm in
	// rhythm_durations, starting from 1 (given that Mathematica indices start at 1)
	// define shorthand variables as in Mathematica code
	var r1 = rhythm_durations[0];
	var r2 = rhythm_durations[1];
	var r3 = rhythm_durations[2];
	var r4 = rhythm_durations[3];
	var r5 = rhythm_durations[4];
	var r6 = rhythm_durations[5];
	// the first rhythmic sequence will either be r3 or r4
	var choice1 = random_choice(null, [r3, r4]);
	// the second rhythmic sequence will be a weighted
	// random choice depending on our pick for the first sequence
	var choice2 = function() {
		if(choice1 === r3) {
			return random_choice([75,5,10,10], [r4,r6,r5,r2]);
		} else {
			return random_choice([70,10,10,10], [r4,r6,r5,r2]);			
		}
	}();
	// the third rhythmic sequence will again be a weighted
	// random choice depending on the values for the
	// first and second sequences
	var choice3 = function() {
		if(choice1 === r3) {
			switch(choice2) {
				case r4: return random_choice(null, [r4,r2]); break;
				case r6: return random_choice(null, [r4,r6]); break;
				case r5: return random_choice(null, [r4,r5]); break;
				case r2: return r4; break;
			}
		} else {
			switch(choice2) {
				case r4: return random_choice(null, [r4,r2]); break;
				case r6: return r6; break;
				case r5: return r5; break;
				case r2: return r2; break;
			}			
		}
	}();
	// the fourth choice will be between r2, r4, r5, and r6
	var choice4 = random_choice(null, [r2, r4, r5, r6]);
	// finally, the fifth choice will be between r4 and r5
	// as long as we're generating rhythms for the B part
	var choice5 = function() {
		if (first) {
			return r5;
		} else {
			return random_choice(null, [r4,r5]);
		}
	}();
	// now, there will be 16 rhythmic sequences in the A part and the B part.
	// They will follow a very specific, templated pattern outlined below.
	return [
		choice1, choice2, choice3, choice3,
		choice1, choice2, choice3, choice3,
		choice1, choice2, choice3, choice3,
		choice4, choice4, choice5, r1
	];
};

// flattens two lists of depth 2
var flatten_lists = function(A, B) {
	var flattened = [];
	for (var i = 0; i < A.length; i++) {
		A[i].map(function(r) {
			flattened.push(r);
		});
	};
	for (var i = 0; i < B.length; i++) {
		B[i].map(function(r) {
			flattened.push(r);
		});
	};
	return flattened;
};

// generates notes for the fiddle tune
// takes in the root note of the key signature,
// and the rhythms for the A and B parts
var generate_notes = function(key, A, B) {
	// determine the chord structure for each part of the piece
	// Right now, the A part and the B part will have the same chord structure
	var chords = determine_chords(key);
	// determine the distribution of the notes in each chord
	var notes_in_chords = function() {
		notes = [];
		for (var i = 0; i < chord.length; i++) {
			notes.push(determine_notes_from_chord(chords[i]));
		};
		return notes;
	}();
	// pick the first note of the A and the B part at random (according to a normal distribution)
	var first_A = pick_first_note(notes_in_chords[0], true);
	var first_B = pick_first_note(notes_in_chords[0], false);
	// pick the first notes of every other rhythmic sequence according to a random walk
	var second_A = list_random_walk(first_A, notes_in_chords, 0.5, 0.5);
	var second_B = list_random_walk(first_B, notes_in_chords, 0.5, 0.5);
	// pick all the notes for the A and the B part by alternating between "scalar random walks"
	// and "chord random walks"
	var notes_A = pick_notes(second_A, A);
	var notes_B = pick_notes(second_B, B);
	// return a flattened list of the notes
	return flatten_lists(notes_A, notes_B);
};

// determines the chords of each part of the fiddle tune
var determine_chords = function(key) {
	// chords are represented in the form [root, type]
	// where "root" represents the note that's the root of the chord
	// and "type" represents the type of chord
	// e.g. [0, "major"] would represent a C major chord (middle-C is 0),
	// which comprises the notes C, E, and G (0, 4, and 7)

	// the first 5 chords will be I, vi, IV, V, I
	var c1 = [key, "major"];
	var c2 = [positive_mod((key+9), 12), "minor"];
	var c3 = [positive_mod((key+5), 12), "major"];
	var c4 = [positive_mod((key+7), 12), "major"];
	var c5 = [key, "major"];
	// the middle two chords will be randomly selected
	var c6 = random_choice(null, [[positive_mod((key+2), 12), "minor"], [positive_mod((key+7), 12), "major"]]);
	var c7 = random_choice([2/3, 1/3], [[positive_mod((key+7), 12), "major"], [positive_mod((key+11), 12), "diminished"]]);
	// the last chord will be I
	var c8 = [key, "major"];
	return [c1, c2, c3, c4, c5, c6, c7, c8];
};

// determines the notes (playable on a violin) that are part of a given chord
var determine_notes_from_chord = function(chord) {
	// determine the notes in the chord, in the range 0 to 11
	var notes_in_chord = base_notes[chord[1]].map(function(n) {
		return positive_mod(n+chord[0], 12);
	});
	// sort these notes (this does an in-place sort)
	notes_in_chord.sort();
	// go through the notes playable on the violin, and figure out
	// whether each note falls in the chord
	var notes = [];
	for (var i = 0; i < range_of_violin.length; i++) {
		if (notes_in_chord.indexOf(positive_mod(range_of_violin[i], 12)) != -1) {
			notes.push(range_of_violin[i]);
		};
	};
	// finally, return the list of notes (should be in sorted order)
	return notes;
};






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

// creates the notes of the scale between a specified range and in a specific key
var create_scale = function(lowest_note, highest_note, key) {
	var all_scale_notes = [];
	for(var i = lowest_note; i <= highest_note; i++) {
		if(inscale_test([0,2,4,5,7,9,11].map(function(elem) {return (elem+key)%12}), i)) {
			all_scale_notes.push(i);
		}
	}
	return all_scale_notes;
}

// creates the rhythm sequences allowed for the reel
var create_rhythmic_sequences = function() {
	var rhythm_durations = [[1],[.5,.5],[.5,.25,.25],[.25,.25,.125,.125,.25],[.25,.25,.25,.25],[.25,.25,.5]]; // a list of durations
	var sequences = rhythm_durations.map(function(sequence) {
		return rhythmic_sequence(sequence);
	}); // maps the durations to start and end times
	return sequences; // return the array of arrays of start and end times
}

// tests if a specific note is in the scale
var inscale_test = function(scale_notes, note) {
	return scale_notes.indexOf(((note%12)+12)%12) != -1;
}


// randomly picks a value from a list, with weights on each choice
// if weights is null, pick a choice with equal probability for each choice
// NOTE: Does not check whether weights and choices have the same length!
// TODO: make this sub-linear time
var random_choice = function(weights, choices) {
	if (weights === null) {
		return choices[Math.floor(Math.random() * choices.length)];
	};
	// compute the sum of unnormalized probabilities
	var total = 0;
	for (var i = 0; i < weights.length; i++) {
		total += weights[i];
	};
	// generate the random number
	var rand = Math.random() * total;
	var count = 0;
	// see which choice to take depending on the random number
	for (var i = 0; i < choices.length; i++) {
		count += weights[i];
		if (rand < count) {
			return choices[i];
		}
	};
	console.log("Cound not pick a random number...");
};

// range function
// produces an array that starts at the start point and ends at the end point (exclusive)
var range = function(start, end) {
	var arr = [];
	for (var i = start; i < end; i++) {
		arr.push(i);
	};
	return arr;
};

// positive_mod function
// returns a % b, but between 0 and b-1
// that is, if a is negative, it still returns a number
// between 0 and b-1
var positive_mod = function(a, b) {
	var mod = a%b;
	if(mod < 0) mod = mod + b;
	return mod;
};

console.log(fiddletune(3));



