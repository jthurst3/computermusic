# chords.py
# General data for musical chords
# J. Hassler Thurston
# 27 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

# General chord class definitions work as follows:
# class Chord:
# 	"""Chord = [chord]""" # simple documentation
#	def __init__(self):
#	 	self.name = "[chord]" # the name of the chord
# 		self.intervals = [list of intervals] # list of intervals between pitches in the chord
# 		self.pitches = getPitches(intervals) # list of pitches in the chord, assuming we start at middle-C

from listFunctions import cumulativeSumZero

def getPitches(intervals):
	return cumulativeSumZero(intervals)

class Major:
	"""Chord = major"""
	def __init__(self):
		self.name = "major"
		self.intervals = [4,3]
		self.pitches = getPitches(self.intervals)
class Minor:
	"""Chord = minor"""
	def __init__(self):
		self.name = "minor"
		self.intervals = [3,4]
		self.pitches = getPitches(self.intervals)
class Augmented:
	"""Chord = augmented"""
	def __init__(self):
		self.name = "augmented"
		self.intervals = [4,4]
		self.pitches = getPitches(self.intervals)
class Diminished:
	"""Chord = diminished"""
	def __init__(self):
		self.name = "diminished"
		self.intervals = [3,3]
		self.pitches = getPitches(self.intervals)
class Major7:
	"""Chord = major seven"""
	def __init__(self):
		self.name = "major seven"
		self.intervals = [4,3,4]
		self.pitches = getPitches(self.intervals)
class Minor7:
	"""Chord = minor seven"""
	def __init__(self):
		self.name = "minor seven"
		self.intervals = [3,4,3]
		self.pitches = getPitches(self.intervals)
class Diminished7:
	"""Chord = diminished seven"""
	def __init__(self):
		self.name = "diminished seven"
		self.intervals = [3,3,3]
		self.pitches = getPitches(self.intervals)
class HalfDiminished7:
	"""Chord = half-diminished seven"""
	def __init__(self):
		self.name = "half-diminished seven"
		self.intervals = [3,3,4]
		self.pitches = getPitches(self.intervals)
class Dominant7:
	"""Chord = dominant seven"""
	def __init__(self):
		self.name = "dominant seven"
		self.intervals = [4,3,3]
		self.pitches = getPitches(self.intervals)




