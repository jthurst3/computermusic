# testFile.py
# Contains basic testing functionality for functions defined in this repository
# TODO: replace with unit tests
# J. Hassler Thurston
# 26 November 2013 (Adapted from Mathematica code written in 2010/2011)
# Python 2.7.6

# list manipulation functionality
import listFunctions

def testListFunctions():
	sampleLs = [2,1,2,3,2,-1,2]
	print listFunctions.cumulativeSum(sampleLs)
	print listFunctions.cumulativeSumZero(sampleLs)

# scales
import scales

def testScales():
	print scales.Major().pitches