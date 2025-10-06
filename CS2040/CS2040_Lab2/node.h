
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
    // My nodes will have char key which will be the key which is just the letter
    // String pattern which is just the morse code pattern for that letter
    // Two pointers of type node that will point to the left and right
    char key;
    string pattern;
    Node *left;
    Node *right;

    // Constructor for my node;
    Node(char key, string pattern);

    // Method used to insert nodes.
    Node *insertNode(Node *root, char key, string pattern);
};

// Prints my tree using perorder traversal;
void preorder(Node *curr);

// Create my morse code tree in the correct order
void createMorseTree(Node *root, string fileName);

// function that returns string that is my messgae encoded.
string messageToMorse(Node *root, string line);

// function that is used by messageToMorse method to find and return the morse code for that char given
string charToMorse(Node *root, char key);

// function that returns a string that is the decoded version of my morse encoded message
string morseToMessage(Node *root, string morseCode);

// function that is used by my morseToMessage method to find and return the char for the given morse code 
char morseToChar(Node *root, string pattern);


#endif
