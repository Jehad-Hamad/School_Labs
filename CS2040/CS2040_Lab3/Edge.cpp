#include "Edge.h"
// Just included the header file for my Edge file

// Name:  Jehad M Hamad
// Date:  Apr/07/25
// Desc:  Getting the source for my edge
// Input: Nothing
// Output: The source value for my edge
const int Edge::get_source() const
{
    return this->source;
}

// Name:  Jehad M Hamad
// Date:  Apr/07/25
// Desc:  Getting the destination for my edge
// Input: Nothing
// Output: The destination value for my edge
const int Edge::get_destination() const
{
    return this->destination;
}

// Name:  Jehad M Hamad
// Date:  Apr/07/25
// Desc:  Getting the weight for my edge
// Input: Nothing
// Output: The weight value for my edge
const int Edge::get_weight() const
{
    return this->weight;
}

// Name:  Jehad M Hamad
// Date:  Apr/07/25
// Desc:  Static function to compare edges by weight
// Input: You need to pass two edges to compare weight
// Output: True if the first edge's weight is greater than the second edge's weight
bool Edge::compare(const Edge &edge1, const Edge &edge2)
{
    return edge1.get_weight() > edge2.get_weight();
}