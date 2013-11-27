# notes.py
# Initializes the Note class
# J. Hassler Thurston
# 27 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

# Inspired by https://github.com/cuthbertLab/music21/blob/master/music21/note.py

all_keywords = [
	'type', # note or rest
	'pitch', # the note value
	'rhythm', # Rhythm value of the note. For example, "quarter note" would be 1/4
	'duration', # Amount of time the note is played
	'start_time', # Start time of the note
	'end_time', # End time of the note. Note (no pun intended): some keyword values can be deduced
				# from others, but we include them here so we can specify properties of the note in different ways.
	'dynamic', # dynamic marking for the note (represented as a number). Eg. Fortissimo --> 2
	'volume', # how loud the note should be, represented as a number between 0 and 1. If rest, volume = 0
	'articulations', # list of articulations for the note
	'comments', # commentary for the note
]
class Note:
	global all_keywords
	def __init__(self, **args):
		if 'type' in args:
			self.type = args['type']
		if 'pitch' in args:
			self.pitch = args['pitch']
		if 'rhythm' in args:
			self.rhythm = args['rhythm']
		if 'duration' in args:
			self.duration = args['duration']
		if 'start_time' in args:
			self.start_time = args['start_time']
		if 'end_time' in args:
			self.end_time = args['end_time']
		if 'dynamic' in args:
			self.dynamic = args['dynamic']
		if 'volume' in args:
			self.volume = args['volume']
		if 'articulations' in args:
			self.articulations = args['articulations']
		if 'comments' in args:
			self.comments = args['comments']