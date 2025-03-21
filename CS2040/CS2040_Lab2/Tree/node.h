#ifndef NODE_H
#define NODE_H

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

class Node {
public:
    char data;
    Node* left;
    Node* right;

    Node(char d);

    Node* insertNode(Node* root, char d, string pattern);
};

void preorder(Node * curr);


#endif
