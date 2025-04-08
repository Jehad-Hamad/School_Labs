// Just the header file for my edge
#ifndef EDGE_H_
#define EDGE_H_

#include <iostream>
using namespace std;

// Name: Jehad M Hamad
// Date: Apr/21/25
// Desc: Just making a class for my Edge data type
class Edge
{
    // Data members
private:
    // Source, Destination, Weight
    int source;
    int destination;
    int weight;

public:
    // Constructor
    /** Constructor an edge.
      @param s The source vertex
      @param d The destination vertex
      @param w The weight of the edge
    */
    Edge(int s, int d, int w) : source(s), destination(d), weight(w) {};

    /** Constructor for an edge with no weight.
      @param s The source vertex
      @param d The destination vertex
    */
    Edge(int s, int d) : source(s), destination(d), weight(0) {};

    // My getter methods
    const int get_source() const;
    const int get_destination() const;
    const int get_weight() const;

    // Overloading the == operator
    bool operator==(const Edge &other) const
    {
        return source == other.source && destination == other.destination;
    }

    /**  Static function to compare edges
      @param edge1 The first edge
      @param edge2 The second edge
    */
    static bool compare(const Edge &edge1, const Edge &edge2);
};

#endif // EDGE_H_