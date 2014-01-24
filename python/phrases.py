# phrases.py
# Initializes the Phrase class (a phrase is defined as a list of notes)
# J. Hassler Thurston
# 27 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

import notes

class Phrase:
	def __init__(self, note_list, **args):
		if self.all_notes(note_list):
			self.note_list = note_list
		else: raise Exception("Phrase must be a list of notes.")

	# checks to see if every element in ls is a Note
	def all_notes(self, ls):
		for element in ls:
			if not notes.isNote(element):
				return False
		return True

	# adds a note to the phrase at the specified position
	def add_note(self, position, note):
		if not notes.isNote(note):
			raise Exception("add_note must take a Note object as its third argument.")
		else: self.note_list.insert(position, note)

# creates a phrase with pitches of each note specified in pitch_list
def create_phrase(pitch_list):
	note_list = []
	for note in pitch_list:
		note_list.append(notes.Note(pitch=note))
	return Phrase(note_list)














