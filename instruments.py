# instruments.py
# Contains instrumentation data
# J. Hassler Thurston
# 26 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

# General instrument class definitions work as follows:
# class Instrument:
# 	"""Instrument = [instrument]""" # simple documentation
#	def __init__(self):
#	 	self.name = "[instrument]" # the name of the instrument
#	 	self.range = range(lowerbound, upperbound) # list of pitches an instrument can play, with 0 being middle-C
#	 	self.tessitura = range(lowerbound, upperbound) # list of pitches the instrument usually plays

class Soprano:
	"""Instrument = soprano"""
	def __init__(self):
		self.name = "soprano"
		self.range = range(0,25) # ranges and tessituras from "Harmony" by Walter Piston?
		self.tessitura = range(9,20)
class Alto:
	"""Instrument = alto"""
	def __init__(self):
		self.name = "alto"
		self.range = range(-7,18)
		self.tessitura = range(2,13)
class Tenor:
	"""Instrument = tenor"""
	def __init__(self):
		self.name = "tenor"
		self.range = range(-12,13)
		self.tessitura = range(-3,6)
class Bass:
	"""Instrument = bass"""
	def __init__(self):
		self.name = "bass"
		self.range = range(-24,5)
		self.tessitura = range(-21,1)