
// Just the header file for my node
#ifndef NODE_H
#define NODE_H

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Name: Jehad M Hamad
// Date: Mar/21/25
// Desc: Just making a class for my node data type
class Node
{
public:
    // My nodes will have a data which will be the key
    // String pattern which is just the morse code pattern
    // Two pointers of type node that will point to the left and right
    char data;
    string pattern;
    Node *left;
    Node *right;

    //Constructor for my node;
    Node(char d, string pattern);

    //Method used to insert nodes.
    Node *insertNode(Node *root, char d, string pattern);
};

//prints my tree using perorder traversal;
void preorder(Node *curr);

#endif
