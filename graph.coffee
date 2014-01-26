# graph.coffee
# Library for graph theory functions
# J. Hassler Thurston
# Adapted from Mathematica code written in 2010-2011
# January 24, 2014



# graphs:
# represented by an object, which has vertex and edge attributes
# the vertices are represented by an array of vertex names
# the edges are represented by a ragged array, where the ith array contains other vertices connected to the ith vertex
# e.g. the graph with edges 1->2, 0->3, 4->1, 1->0 would be represented by the object 
# {
# 	vertices: [1,2,0,3,4],
# 	edges: [[2,0],[],[3],[],[1]]
# }

# creates a graph with the given edges
class Graph
	constructor: (@edges) ->
		vertices = (edge[0] for edge in edges if edge[0] not in vertices)





