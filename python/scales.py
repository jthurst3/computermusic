# scales.py
# Contains data on diatonic scales
# J. Hassler Thurston
# 26 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

# General scale class definitions work as follows:
# class Scale:
# 	"""Scale = [scale]""" # simple documentation
# 	def __init__(self):
# 		self.name = "[scale]" # the name of the scale
# 		self.intervals = [list of intervals] # list of intervals between pitches in the scale
# 		self.pitches = getPitches(intervals) # list of pitches in the scale, assuming we start at middle-C

from listFunctions import cumulativeSumZero

def getPitches(intervals):
	return cumulativeSumZero(intervals)

class Major:
	"""Scale = major"""
	def __init__(self):
		self.name = "major"
		self.intervals = [2,2,1,2,2,2]
		self.pitches = getPitches(self.intervals)
class Dorian:
	"""Scale = dorian"""
	def __init__(self):
		self.name = "dorian"
		self.intervals = [2,1,2,2,2,1]
		self.pitches = getPitches(self.intervals)
class Phrygian:
	"""Scale = phrygian"""
	def __init__(self):
		self.name = "phrygian"
		self.intervals = [1,2,2,2,1,2]
		self.pitches = getPitches(self.intervals)
class Lydian:
	"""Scale = lydian"""
	def __init__(self):
		self.name = "lydian"
		self.intervals = [2,2,2,1,2,2]
		self.pitches = getPitches(self.intervals)
class Mixolydian:
	"""Scale = mixolydian"""
	def __init__(self):
		self.name = "mixolydian"
		self.intervals = [2,2,1,2,2,1]
		self.pitches = getPitches(self.intervals)
class Minor:
	"""Scale = minor"""
	def __init__(self):
		self.name = "minor"
		self.intervals = [2,1,2,2,1,2]
		self.pitches = getPitches(self.intervals)
class NaturalMinor:
	"""Scale = natural minor"""
	def __init__(self):
		self.name = "natural minor"
		self.intervals = [2,1,2,2,1,2]
		self.pitches = getPitches(self.intervals)
class HarmonicMinor:
	"""Scale = harmonic minor"""
	def __init__(self):
		self.name = "harmonic minor"
		self.intervals = [2,1,2,2,1,3]
		self.pitches = getPitches(self.intervals)
class MelodicMinorAsc:
	"""Scale = melodic minor ascending"""
	def __init__(self):
		self.name = "melodic minor ascending"
		self.intervals = [2,1,2,2,2,2]
		self.pitches = getPitches(self.intervals)
class MelodicMinorDesc: # pitches are still defined in the standard order,
						# even though this scale is only used when the pitches descend
	"""Scale = melodic minor descending"""
	def __init__(self):
		self.name = "melodic minor descending"
		self.intervals = [2,1,2,2,1,2]
		self.pitches = getPitches(self.intervals)
class Locrian:
	"""Scale = locrian"""
	def __init__(self):
		self.name = "locrian"
		self.intervals = [1,2,2,1,2,2]
		self.pitches = getPitches(self.intervals)










